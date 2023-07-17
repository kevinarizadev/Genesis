<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$source_file = $_FILES['soporte']['tmp_name'];
header('Content-Type: application/json');


if (isset($source_file)) {
    $path = 'vacunacion.csv';

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

          /*  if (strpos($linea, '|') > -1) {
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
            // echo count($cabeceras);*/
            $first = true;
        } else {
          /*  $datos = explode($separador, $linea);
            $datos_transformados = [];
            foreach ($datos as $campo) {
                $sin_espacios = preg_replace('/ {4,}/', '', $campo);
                $recortado = substr($sin_espacios, 0, 4000);
                $datos_transformados[] = $recortado;
            }

            if (count($datos_transformados) < 33) {                        
                continue;
            }
            if (count(explode(' ', $datos_transformados[7])) > 2) {                    
                continue;
            }

            if (count($datos_transformados) > 33) {
                $datos_transformados[29] = $datos_transformados[32];
                $datos_transformados[30] = $datos_transformados[33];
                $datos_transformados[31] = $datos_transformados[34];                        
                $datos_transformados = array_slice($datos_transformados, 0, 32);
            }

            if (count($datos_transformados[5]) > 30) {                        
                continue;
            }

            $nueva_linea = array_reduce($datos_transformados, function ($acumulado, $item) {
                $acumulado .= $item  . '|';
                return $acumulado;
            });
*/


            fwrite($file_handler_new, $linea );
        }

        $indice_linea++;
    }

    fclose($file_handler);
    fclose($file_handler_new);

    $nombre = 'vacunacion.csv';
    $path_of_storage = "/externos/base_covid/";


    require_once('../config/ftpdirect.php');
    $subio = ftp_put($con_id, $path_of_storage . $nombre, $path, FTP_BINARY);

    ftp_close($con_id);

    unlink($path);

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

} else {
    echo json_encode([
        'error' => [
            'message' => 'Debe de cargar un archivo',
            'code' => 400
        ]
    ]);
}
exit;
