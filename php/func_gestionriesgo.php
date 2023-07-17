<?php
require '../vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PhpOffice\PhpSpreadsheet\IOFactory;

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function procesarArchivoSivigila()
{
    global $request;
    if (!isset($request->file)) {
        header('Content-Type: application/json');
        http_response_code(422);
        echo json_encode([
            "error" => [
                "message" => "Debe subir el reporte que desea cargar"
            ],
            "code" => 422
        ]);
        return;
    }

    $file = tempnam(sys_get_temp_dir(), 'sivigila_file');
    $fileHandler = fopen($file, 'wb');
    fwrite($fileHandler, base64_decode(explode(',', $request->file)[1]));
    fclose($fileHandler);

    ini_set('memory_limit', '2048M');
    set_time_limit(-1);

    $spreadsheet = IOFactory::load($file);
    $worksheet = $spreadsheet->getActiveSheet();

    $highestColumn = $worksheet->getHighestColumn();
    $highestRow = $worksheet->getHighestRow();
    $headers = $worksheet->rangeToArray('A1:' . $highestColumn . '1', null, true, true, false)[0];
    $first = true;

    require_once('config/dbcon_prod.php');
$rows = [];
    foreach ($worksheet->getRowIterator() as $row) {
        
        if ($first === true) {
            $first = false;
        } else {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false);
            $cells = [];
            $index = 0;
            foreach ($cellIterator as $cell) {
               
                switch ($headers[$index]) {
                case "AFIC_TIPO_DOCUMENTO":
                    $key = "TIPO_DOCUMENTO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_DOCUMENTO":
                    $key = "DOCUMENTO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_PRIMER_NOMBRE":
                    $key = "PRIMER_NOMBRE";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_PRIMER_APELLIDO":
                    $key = "PRIMER_APELLIDO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_TELEFONO":
                    $key = "TELEFONO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_CELULAR":
                    $key = "CELULAR";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "AFIC_CELULAR2":
                    $key = "CELULAR_2";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "Estado":
                    $key = "ESTADO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "Resultado":
                    $key = "RESULTADO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "Callid":
                    $key = "CALL_ID";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "RECFile":
                    $key = "REC_FILE";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "RESPUESTAS":
                    $respuestas = explode(':', (string) $cell->getFormattedValue());
                    if (count($respuestas) < 7) {
                        continue;
                    }
                    $cells["RESPUESTA_1"] = $respuestas[0];
                    $cells["RESPUESTA_2"] = $respuestas[1];
                    $cells["RESPUESTA_3"] = $respuestas[2];
                    $cells["RESPUESTA_4"] = $respuestas[3];
                    $cells["RESPUESTA_5"] = $respuestas[4];
                    $cells["RESPUESTA_6"] = $respuestas[5];
                    $cells["OPCION"] = $respuestas[6];
                    break;
                case "Intentos":
                    $key = "INTENTOS";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "HoraInicio":
                    $key = "HORA_INICIO";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                case "HoraFin":
                    $key = "HORA_FIN";
                    $cells[$key] = (string) $cell->getFormattedValue();
                    break;
                }
                
                $index++;
            }
            $rows[] = $cells;
        }
    }

    echo json_encode($rows);
    exit;


    // try {
    //     $consulta = oci_parse(
    //         $c,
    //         'begin PQ_GENESIS_DECLARACION.P_UI_COVID(
    //               :v_pjson_row_in,
    //               :v_pcantidad,
    //               :v_pjson_row_out
    //           ); end;'
    //     );
    //     $row_json = json_encode($rows);
    //     oci_bind_by_name($consulta, ':v_pjson_row_in', $row_json);
    //     oci_bind_by_name($consulta, ':v_pcantidad', sizeof($rows));
    //     $clob = oci_new_descriptor($c, OCI_D_LOB);
          
    //     oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
    //     oci_execute($consulta, OCI_DEFAULT);

    //     oci_close($c);



    //     unlink($file);

    //     header('Content-Type: application/json');

    //     $json = $clob->read($clob->size());
    //     echo $json;
    //     exit;
    // } catch (Exception $e) {
    //     echo $e->getMessage();
    //     echo $e->getLine();
    // }
}