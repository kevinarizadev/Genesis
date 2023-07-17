<?php

 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
// error_reporting(0);

/* set_exception_handler(function($exception) {
  echo json_encode([
    'error' => [
        'message' => $exception->getMessage()]
  ]);
}); */


$source_file = $_FILES['soporte']['tmp_name'];
// header('Content-Type: application/json');

$tipo = $_GET['tipo'];
$cedula = $_GET['usuario'];
$fuente = $_GET['fuente'];

$documento_get = filter_input(INPUT_GET, "documento");

if (isset($source_file)) {
    if (isset($tipo)) {
        if ($tipo === 'ins') {
            $path = 'covid19.txt';

            $errores = [];

            $file_handler = fopen($source_file, 'r');
            file_put_contents($path, '');
            $file_handler_new = fopen($path, 'a');
            $first = false;
            $separador = '';
            $indice_linea = 0;

            $cabeceras = [];

            while (!feof($file_handler)) {
                $linea = fgets($file_handler);

                if ($first === false) {

                    if (strpos($linea, '|') > -1) {
                        $separador = '|';
                    } else if (strpos($linea, '\t') > -1) {
                        $separador = '\t';
                    } else {

                        echo json_encode([
                            'error' => [
                                'message' => 'Formato de archivo invalido',
                                'code' => 400
                            ]
                        ]);
                        exit;
                    }

                    $cabeceras = explode($separador, $linea);
                    // echo count($cabeceras);
                    $first = true;
                } else {
                    $datos = explode($separador, $linea);
                    $datos_transformados = [];
                    foreach ($datos as $campo) {
                        $datos_transformados[] = preg_replace('/ {4,}/', '', $campo);
                    }

                    if (count($datos_transformados) !== 33) {
                        $encodear_data = array_map(function ($item) {
                            return utf8_encode($item);
                        }, $datos_transformados);
                        $errores[] = [
                            'linea' => $indice_linea,
                            'detalle' => 'No tiene la cantidad de campos requeridos',
                            'registro' => iconv("ISO-8859-1", "UTF-8", $linea)
                        ];
                        // echo $indice_linea . '  ' . $linea . PHP_EOL;
                        continue;
                    } else {
                        if (count(explode(' ', $datos_transformados[7])) > 2) {
                            $encodear_data = array_map(function ($item) {
                                return utf8_encode($item);
                            }, $datos_transformados);
                            $errores[] = [
                                'linea' => $indice_linea,
                                'detalle' => 'No tiene la cantidad de campos requeridos',
                                'registro' => iconv("ISO-8859-1", "UTF-8", $linea)
                            ];
                            continue;
                        }
                    }

                    $nueva_linea = array_reduce($datos_transformados, function ($acumulado, $item) {
                        $acumulado .= $item  . '|';
                        return $acumulado;
                    });

                    fwrite($file_handler_new, substr($nueva_linea, 0, strlen($nueva_linea) - 1));
                }

                $indice_linea++;
            }

            fclose($file_handler);
            fclose($file_handler_new);

            $nombre = 'covid19.txt';
            $path_of_storage = "/externos/base_covid/";


            require_once('../config/ftpdirect.php');
            // $subio = ftp_put($con_id, $path_of_storage . $nombre, $path, FTP_BINARY);

            ftp_close($con_id);

            // unlink($path);

            if (count($errores) > 0) {
                echo json_encode([
                    'error' => [
                        'message' => 'Se han encontrado registros con formato inconsistente. Se procesaran aquellas que cumplan con los filtros de validación de formato',
                        'details' => $errores
                    ]
                ]);
            } else {
                echo json_encode([
                    'data' => [
                        'message' => 'El archivo se ha subido exitosamente',
                        'code' => 200
                    ]
                ]);
            }
        } else if ($tipo === 'sismuestras') {
            try {
                require_once('./utils.php');

                $ruta = "/cargue_ftp/Digitalizacion/Genesis/SaludPublica/SismuestraCovid/";
                $nombre = $_FILES['soporte']['name'];

                $token = explode('SisMuestras', $nombre);

                if ($documento_get !== null) {
                    $documento = $documento_get;
                } else {
                    if (strpos($nombre, 'SisMuestras') > -1) {
                        $documento = $token[0];        
                    } else {
                        $documento = explode('.pdf', $nombre)[0];
                    }
                }

                $nombreEnFTP = sha1($nombre) . '_' . time() . '.pdf';

                $resultado = subirArchivoFTP($source_file, $ruta . $documento . '/', $nombreEnFTP, true, false, 3);

                if ($resultado === false) {
                    echo json_encode([
                        'error' => [
                            'message' => 'No se pudo realizar el cargue del soporte al sistema'
                        ]
                    ]);
                    exit;
                }

                

                 require_once('../config/dbcon_prod.php');

                $ruta = json_encode([[
                    'documento' => $documento,
                    'ruta' => $ruta . $documento . '/' . $nombreEnFTP,
                    'tipo_soporte' => 75
                ]]);
                $consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_inserta_soportes(
                    :v_responsable,
                    :v_origen,
                    :v_rutas,
                    :v_cantidad,
                    :v_json_res
                ); end;');
                $fuente;
                $cantidad = 1;
                oci_bind_by_name($consulta, ':v_responsable', $_SESSION['cedula']);
                oci_bind_by_name($consulta, ':v_origen', $fuente);
                oci_bind_by_name($consulta, ':v_rutas', $ruta);
                oci_bind_by_name($consulta, ':v_cantidad', $cantidad);
                $clob = oci_new_descriptor($c, OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
                oci_execute($consulta, OCI_DEFAULT);
                oci_close($c);

                echo json_encode([
                    'data' => [
                        'message' => 'El archivo se ha subido exitosamente',
                        'code' => 200
                    ]
                ]);
            } catch (Exception $exception) {
                echo json_encode([
                    'error' => [
                        'message' => 'Ha ocurrido un error',
                        'exception' => $exception->getMessage(),
                        'code' => 400
                    ]
                ]);
            }
        } else if ($tipo === 'historia') {
            try {
                require_once('./utils.php');

                $ruta = "/cargue_ftp/Digitalizacion/Genesis/SaludPublica/HistoriaClinicaCovid/";
                $nombre = $_FILES['soporte']['name'];

                $token = explode('SisMuestras', $nombre);

                $documento = $token[0];

                $day = date("dmY");

                $nombreEnFTP = sha1($nombre) . '_' . time() . '.pdf';

                subirArchivoFTP($source_file, $ruta . $day . '/', $nombreEnFTP, true, false, 3);

                require_once('../config/dbcon_prod.php');

                $ruta = json_encode([[
                    'documento' => $documento,
                    'ruta' => $ruta . $documento . '/' . $nombreEnFTP,
                    'tipo_soporte' => 53
                ]]);
                $consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_inserta_soportes(
                    :v_responsable,
                    :v_origen,
                    :v_rutas,
                    :v_cantidad,
                    :v_json_res
                ); end;');
                $fuente = 'G';
                $cantidad = 1;
                oci_bind_by_name($consulta, ':v_responsable', $_SESSION['cedula']);
                oci_bind_by_name($consulta, ':v_origen', $fuente);
                oci_bind_by_name($consulta, ':v_rutas', $ruta);
                oci_bind_by_name($consulta, ':v_cantidad', $cantidad);
                $clob = oci_new_descriptor($c, OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
                oci_execute($consulta, OCI_DEFAULT);
                oci_close($c);

                echo json_encode([
                    'data' => [
                        'message' => 'El archivo se ha subido exitosamente',
                        'code' => 200
                    ]
                ]);
            } catch (Exception $exception) {
                echo json_encode([
                    'error' => [
                        'message' => 'Ha ocurrido un error',
                        'exception' => $exception->getMessage(),
                        'code' => 400
                    ]
                ]);
            }
        }
    } else {
        echo json_encode([
            'error' => [
                'message' => 'Debe especificar el tipo de archivo',
                'code' => 400
            ]
        ]);
    }
} else {
    echo json_encode([
        'error' => [
            'message' => 'Debe de cargar un archivo',
            'code' => 400
        ]
    ]);
}
exit;
