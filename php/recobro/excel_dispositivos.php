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
$sheet->setCellValue('A1','NoPrescripcion');
$sheet->setCellValue('B1','TipDoc');
$sheet->setCellValue('C1','NumDoc');
$sheet->setCellValue('D1','PNPaciente');
$sheet->setCellValue('E1','SNPaciente');
$sheet->setCellValue('F1','PAPaciente');
$sheet->setCellValue('G1','SAPaciente');
$sheet->setCellValue('H1','CodEPS');
$sheet->setCellValue('I1','ConOrden');
$sheet->setCellValue('J1','TipoPrest');
$sheet->setCellValue('K1','CausaS1');
$sheet->setCellValue('L1','CodDisp');
$sheet->setCellValue('M1','CanForm');
$sheet->setCellValue('N1','CadaFreUso');
$sheet->setCellValue('O1','CodFreUso');
$sheet->setCellValue('P1','Cant');
$sheet->setCellValue('Q1','CodPerDurTrat');
$sheet->setCellValue('R1','CantTotal');
$sheet->setCellValue('S1','JustNoPBS');
$sheet->setCellValue('T1','IndRec');
$sheet->setCellValue('U1','EstJM');
$sheet->setCellValue('V1','CodDane');
$sheet->setCellValue('W1','Ambiente');
$sheet->setCellValue('X1','AmbienteDesc');
$sheet->setCellValue('Y1','CodDxPpal');
$sheet->setCellValue('Z1','CodDxRel1');
$sheet->setCellValue('AA1','CodDxRel2');


    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['dispositivos'][0]) > 0) {
                    $TipoTec = 'D';
                    $dispositivos = $row['dispositivos'][0];
                }
    $NoPrescripcion = $row['NoPrescripcion'];
    $TipDoc = $row['TipoIDPaciente'];
    $NumDoc = $row['NroIDPaciente'];
    $PNPaciente = $row['PNPaciente'];
    $SNPaciente = $row['SNPaciente'];
    $PAPaciente = $row['PAPaciente'];
    $SAPaciente = $row['SAPaciente'];
    $CodEPS = $row['CodEPS'];
    $CodEPSNom = 'CAJA DE COMPENSACION FAMILIAR  CAJACOPI ATLANTICO';
 $ConOrden = $row['dispositivos'][0]['ConOrden'];
$TipoPrest = $row['dispositivos'][0]['TipoPrest'];
$CausaS1 = $row['dispositivos'][0]['CausaS1'];
$CodDisp = $row['dispositivos'][0]['CodDisp'];
$CanForm = $row['dispositivos'][0]['CanForm'];
$CadaFreUso = $row['dispositivos'][0]['CadaFreUso'];
$CodFreUso = $row['dispositivos'][0]['CodFreUso'];
$Cant = $row['dispositivos'][0]['Cant'];
$CodPerDurTrat = $row['dispositivos'][0]['CodPerDurTrat'];
$CantTotal = $row['dispositivos'][0]['CantTotal'];
$JustNoPBS = $row['dispositivos'][0]['JustNoPBS'];
$IndRec = $row['dispositivos'][0]['IndRec'];
$EstJM = $row['dispositivos'][0]['EstJM'];
    // $EstJMNom = $row['productosnutricionales'][0]['EstJMNom'];
    $CodDane = $row['CodDANEMunIPS'];
    $Ambiente = $row['CodAmbAte'];
   switch ($Ambiente) {
                case 12:
                       $AmbienteDesc =   "Ambulatorio – No Priorizado";
                break;
               case 11:
                      $AmbienteDesc =   "Ambulatorio – Priorizado";
                break;
                   case 21:
                   $AmbienteDesc =   "Hospitalario – Domiciliario";
                break;
                   case 22:
                   $AmbienteDesc =   "Hospitalario - Internacion";
                break;
                   case 30:
                  $AmbienteDesc =  "Urgencias";
                default:
                $AmbienteDesc ="Undefined";
                break;

        };
    $CodDxPpal = $row['CodDxPpal'];
    // $CodDxPpalNom = $row['productosnutricionales'][0]['CodDxPpalNom'];
    $CodDxRel1 = $row['CodDxRel1'];
    // $CodDxRel1Nom = $row['productosnutricionales'][0]['CodDxRel1Nom'];
    $CodDxRel2 = $row['CodDxRel2'];
    // $CodDxRel2Nom = $row['productosnutricionales'][0]['CodDxRel2Nom'];

            //$sheet->setCellValue('A'.$indice,$indice);
 $sheet->setCellValue('A'.$indice,$NoPrescripcion);
$sheet->setCellValue('B'.$indice,$TipDoc);
$sheet->setCellValue('C'.$indice,$NumDoc);
$sheet->setCellValue('D'.$indice,$PNPaciente);
$sheet->setCellValue('E'.$indice,$SNPaciente);
$sheet->setCellValue('F'.$indice,$PAPaciente);
$sheet->setCellValue('G'.$indice,$SAPaciente);
$sheet->setCellValue('H'.$indice,$CodEPS);
$sheet->setCellValue('I'.$indice,$ConOrden);
$sheet->setCellValue('J'.$indice,$TipoPrest);
$sheet->setCellValue('K'.$indice,$CausaS1);
$sheet->setCellValue('L'.$indice,$CodDisp);
$sheet->setCellValue('M'.$indice,$CanForm);
$sheet->setCellValue('N'.$indice,$CadaFreUso);
$sheet->setCellValue('O'.$indice,$CodFreUso);
$sheet->setCellValue('P'.$indice,$Cant);
$sheet->setCellValue('Q'.$indice,$CodPerDurTrat);
$sheet->setCellValue('R'.$indice,$CantTotal);
$sheet->setCellValue('S'.$indice,$JustNoPBS);
$sheet->setCellValue('T'.$indice,$IndRec);
$sheet->setCellValue('U'.$indice,$EstJM);
$sheet->setCellValue('V'.$indice,$CodDane);
$sheet->setCellValue('W'.$indice,$Ambiente);
$sheet->setCellValue('X'.$indice,$AmbienteDesc);
$sheet->setCellValue('Y'.$indice,$CodDxPpal);
$sheet->setCellValue('Z'.$indice,$CodDxRel1);
$sheet->setCellValue('AA'.$indice,$CodDxRel2);



            $indice++;
        }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


