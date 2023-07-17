<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

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

set_time_limit(600);


$spreadsheet = IOFactory::load($file);
$worksheet = $spreadsheet->getActiveSheet();



$highestColumn = $worksheet->getHighestColumn();
$highestRow = $worksheet->getHighestRow();
$headers = $worksheet->rangeToArray('A1:' . $highestColumn . '1', null, true, true, false)[0];
$dataRow =1;
$currentRow = 0;

$data = [];

require_once('../config/dbcon.php');
// foreach ($worksheet->getRowIterator() as $row) {
//     $rows = [];
//     if ($currentRow < $dataRow) {
//         $currentRow++;
//     } else {
//         $cellIterator = $row->getCellIterator();
//         $cellIterator->setIterateOnlyExistingCells(false);
//         $cells = [];
//         $index = 0;

//         foreach ($cellIterator as $cell) {
//             $key = $headers[$index] === "año" ? "anno" : $headers[$index];
//             $cells[$key] = (string) $cell->getFormattedValue();
//             $index++;
//             echo $cell;
//         }
//         $rows[] = $cells;

//         $row_json = json_encode($rows);

//         $data []= $rows;
//     }

    
// }

foreach ($worksheet->getRowIterator() as $row) {
    if ($currentRow < $dataRow) {
        
    } else {
        $rows = [];
        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(false);
        $cells = [];
        $index = 0;


        foreach ($cellIterator as $cell) {
            $key = $headers[$index] === "año" ? "anno" : $headers[$index];
            $cells[$key] = (string) $cell->getFormattedValue();
            $index++;
        }
        $rows[] = $cells;
        // $consulta = oci_parse(
        //     $c,
        //     'begin PQ_GENESIS_DECLARACION.P_UI_SIVIGILA(
        //         :v_pjson_row_in,
        //         :v_pjson_row_out
        //     ); end;'
        // );
        $row_json = json_encode($rows);
        // oci_bind_by_name($consulta, ':v_pjson_row_in', $row_json);
        // $clob = oci_new_descriptor($c, OCI_D_LOB);
        // oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
        // oci_execute($consulta, OCI_DEFAULT);

        // echo $row_json;
        $data []= $rows;
    }
    $currentRow++;
}


// oci_close($c);

// unlink($file);
// header('Content-Type: application/json');
// $json = $clob->read($clob->size());
// echo $json;
echo json_encode($data);
exit;