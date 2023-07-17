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


// if (file_exists($path)) {
//     if (!unlink($path)) {  
//         echo ("cannot be deleted due to an error");  
//     }  
//     else {  
//         crear_excel();
//     }  
// }else{
    
//     crear_excel();

// }
/*
function obtener_direccion($doc){
    require('../config/dbcon_prod.php');
    $consulta = oci_parse($c,'SELECT afic_direccion
                                from EAFI_AFILIADO af
                                where afic_documento = :v_doc');
    
    oci_bind_by_name($consulta,':v_doc',$doc);
    
    oci_execute($consulta);
  
    while($row = oci_fetch_assoc($consulta))
    {
        $direccion_afiliado = $row['AFIC_DIRECCION'];
    }
       
    oci_close($c);
    return $direccion_afiliado;
    
}*/




function exportado_excel() {
    global $request, $folder;

    $direccionamientos = json_decode(json_encode($request->datos), true);

    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('N1','CantTotAEntregar');
    $sheet->setCellValue('R1','CodEPS');
    $sheet->setCellValue('L1','CodMunEnt');
    $sheet->setCellValue('P1','CodSerTecAEntregar');
    $sheet->setCellValue('E1','ConTec');
    $sheet->setCellValue('O1','DirPaciente');
    $sheet->setCellValue('T1','EstDireccionamiento');
    $sheet->setCellValue('U1','FecAnulacion');
    $sheet->setCellValue('S1','FecDireccionamiento');
    $sheet->setCellValue('M1','FecMaxEnt');
    $sheet->setCellValue('A1','ID');
    $sheet->setCellValue('B1','IDDireccionamiento');
    $sheet->setCellValue('H1','NoEntrega');
    $sheet->setCellValue('Q1','NoIDEPS');
    $sheet->setCellValue('G1','NoIDPaciente');
    $sheet->setCellValue('K1','NoIDProv');
    $sheet->setCellValue('C1','NoPrescripcion');
    $sheet->setCellValue('I1','NoSubEntrega');
    $sheet->setCellValue('F1','TipoIDPaciente');
    $sheet->setCellValue('J1','TipoIDProv');
    $sheet->setCellValue('D1','TipoTec');

$indice = 2;
    foreach ($direccionamientos as $direccionamiento) {
    $sheet->setCellValue('N'.$indice,$direccionamiento['CantTotAEntregar']);
    $sheet->setCellValue('R'.$indice,$direccionamiento['CodEPS']);
    $sheet->setCellValue('L'.$indice,$direccionamiento['CodMunEnt']);
    $sheet->setCellValue('P'.$indice,$direccionamiento['CodSerTecAEntregar']);
    $sheet->setCellValue('E'.$indice,$direccionamiento['ConTec']);
    $sheet->setCellValue('O'.$indice,$direccionamiento['DirPaciente']);
    $sheet->setCellValue('T'.$indice,$direccionamiento['EstDireccionamiento']);
    $sheet->setCellValue('U'.$indice,$direccionamiento['FecAnulacion']);
    $sheet->setCellValue('S'.$indice,$direccionamiento['FecDireccionamiento']);
    $sheet->setCellValue('M'.$indice,$direccionamiento['FecMaxEnt']);
    $sheet->setCellValue('A'.$indice,$direccionamiento['ID']);
    $sheet->setCellValue('B'.$indice,$direccionamiento['IDDireccionamiento']);
    $sheet->setCellValue('H'.$indice,$direccionamiento['NoEntrega']);
    $sheet->setCellValue('Q'.$indice,$direccionamiento['NoIDEPS']);
    $sheet->setCellValue('G'.$indice,$direccionamiento['NoIDPaciente']);
    $sheet->setCellValue('K'.$indice,$direccionamiento['NoIDProv']);
    $sheet->setCellValue('C'.$indice,$direccionamiento['NoPrescripcion']);
    $sheet->setCellValue('I'.$indice,$direccionamiento['NoSubEntrega']);
    $sheet->setCellValue('F'.$indice,$direccionamiento['TipoIDPaciente']);
    $sheet->setCellValue('J'.$indice,$direccionamiento['TipoIDProv']);
    $sheet->setCellValue('D'.$indice,$direccionamiento['TipoTec']);
    $indice++;
    }


    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');
}
