<?php

require_once('../../vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$path = realpath( __DIR__ .'/../../temp/').'/consolidado_pres.xlsx';
$folder = realpath( __DIR__ .'/../../temp/');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;  

// use Symfony\Component\HttpFoundation\StreamedResponse;
// use Symfony\Component\HttpFoundation\Response;

// $streamedResponse = new StreamedResponse();
// $streamedResponse->setCallback(function ()  {
// });
 


$function();
}

function crear_excel(){
  global $path;
    $tipo = $_GET['tipo'] ?? '';
    $indice = 2;
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1','ID');
    $sheet->setCellValue('B1','IDReporteEntrega');
    $sheet->setCellValue('C1','NoPrescripcion');
    $sheet->setCellValue('D1','TipoTec');
    $sheet->setCellValue('E1','ConTec');
    $sheet->setCellValue('F1','TipoIDPaciente');
    $sheet->setCellValue('G1','NoIDPaciente');
    $sheet->setCellValue('H1','NoEntrega');
    $sheet->setCellValue('I1','EstadoEntrega');
    $sheet->setCellValue('J1','CausaNoEntrega');
    $sheet->setCellValue('K1','ValorEntregado');
    $sheet->setCellValue('L1','CodTecEntregado');
    $sheet->setCellValue('M1','CantTotEntregada');
    $sheet->setCellValue('N1','NoLote');
    $sheet->setCellValue('O1','FecEntrega');
    $sheet->setCellValue('P1','FecRepEntrega');
    $sheet->setCellValue('Q1','EstRepEntrega');
    $sheet->setCellValue('R1','FecAnulacion');

    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['medicamentos'][0]) > 0) {
                    $TipoTec = 'M';
                    $medicamentos = $row['medicamentos'][0];
                }
            $ID = $row['ID'];
            $IDReporteEntrega = $row['IDReporteEntrega'];
            $NoPrescripcion = $row['NoPrescripcion'];
            $TipoTec = $row['TipoTec'];
            $ConTec = $row['ConTec'];
            $TipoIDPaciente = $row['TipoIDPaciente'];
            $NoIDPaciente = $row['NoIDPaciente'];
            $NoEntrega = $row['NoEntrega'];
            $EstadoEntrega = $row['EstadoEntrega'];
            $CausaNoEntrega = $row['CausaNoEntrega'];
            $ValorEntregado = $row['ValorEntregado'];
            $CodTecEntregado = $row['CodTecEntregado'];
            $CantTotEntregada = $row['CantTotEntregada'];
            $NoLote = $row['NoLote'];
            $FecEntrega = $row['FecEntrega'];
            $FecRepEntrega = $row['FecRepEntrega'];
            $EstRepEntrega = $row['EstRepEntrega'];
            $FecAnulacion = $row['FecAnulacion'];
            $format_valor = str_replace(',', '.', strval($ValorEntregado));

            //$sheet->setCellValue('A'.$indice,$indice);
            $sheet->setCellValue('A'.$indice,$ID);
            $sheet->setCellValue('B'.$indice,$IDReporteEntrega);
            $sheet->setCellValue('C'.$indice,$NoPrescripcion);
            $sheet->setCellValue('D'.$indice,$TipoTec);
            $sheet->setCellValue('E'.$indice,$ConTec);
            $sheet->setCellValue('F'.$indice,$TipoIDPaciente);
            $sheet->setCellValue('G'.$indice,$NoIDPaciente);
            $sheet->setCellValue('H'.$indice,$NoEntrega);
            $sheet->setCellValue('I'.$indice,$EstadoEntrega);
            $sheet->setCellValue('J'.$indice,$CausaNoEntrega);
            $sheet->setCellValue('K'.$indice,str_replace(".","",  $format_valor));
            $sheet->setCellValue('L'.$indice,$CodTecEntregado);
            $sheet->setCellValue('M'.$indice,$CantTotEntregada);
            $sheet->setCellValue('N'.$indice,$NoLote);
            $sheet->setCellValue('O'.$indice,$FecEntrega);
            $sheet->setCellValue('P'.$indice,$FecRepEntrega);
            $sheet->setCellValue('Q'.$indice,$EstRepEntrega);
            $sheet->setCellValue('R'.$indice,$FecAnulacion);


            $indice++;
        }

    $writer = new Xlsx($spreadsheet);
    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');       
    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');
}


