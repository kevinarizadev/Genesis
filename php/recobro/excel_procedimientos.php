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
$sheet->setCellValue('I1','CodEPSNOM');
$sheet->setCellValue('J1','ConOrden');
$sheet->setCellValue('K1','TipoPrest');
$sheet->setCellValue('L1','CausaS11');
$sheet->setCellValue('M1','CausaS12');
$sheet->setCellValue('N1','CausaS2');
$sheet->setCellValue('O1','CausaS3');
$sheet->setCellValue('P1','CausaS4');
$sheet->setCellValue('Q1','ProPBSUtilizado');
$sheet->setCellValue('R1','CausaS5');
$sheet->setCellValue('S1','ProPBSDescartado');
$sheet->setCellValue('T1','RznCausaS51');
$sheet->setCellValue('U1','DescRzn51');
$sheet->setCellValue('V1','RznCausaS52');
$sheet->setCellValue('W1','DescRzn52');
$sheet->setCellValue('X1','CausaS6');
$sheet->setCellValue('Y1','CausaS7');
$sheet->setCellValue('Z1','CodCUPS');
$sheet->setCellValue('AA1','CanForm');
$sheet->setCellValue('AB1','CadaFreUso');
//$sheet->setCellValueAB1('','CodFreUso');
$sheet->setCellValue('AC1','Cant');
$sheet->setCellValue('AD1','CantTotal');
$sheet->setCellValue('AE1','CodPerDurTrat');
$sheet->setCellValue('AF1','JustNoPBS');
$sheet->setCellValue('AG1','IndRec');
$sheet->setCellValue('AH1','EstJM');
$sheet->setCellValue('AI1','CodDane');
$sheet->setCellValue('AJ1','Ambiente');
$sheet->setCellValue('AK1','AmbienteDesc');
$sheet->setCellValue('AL1','CodDxPpal');
$sheet->setCellValue('AM1','CodDxRel1');
$sheet->setCellValue('AN1','CodDxRel2');
$sheet->setCellValue('AO1','Ips');


    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['procedimientos'][0]) > 0) {
                    $TipoTec = 'P';
                    $productosnutricionales = $row['procedimientos'][0];
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
    $ConOrden = $row['procedimientos'][0]['ConOrden'];
    $TipoPrest = $row['procedimientos'][0]['TipoPrest'];
    $CausaS11 = $row['procedimientos'][0]['CausaS11'];
    $CausaS12 = $row['procedimientos'][0]['CausaS12'];
    $CausaS2 = $row['procedimientos'][0]['CausaS2'];
    $CausaS3 = $row['procedimientos'][0]['CausaS3'];
    $CausaS4 = $row['procedimientos'][0]['CausaS4'];
    $ProPBSUtilizado = $row['procedimientos'][0]['ProPBSUtilizado'];
    $CausaS5 = $row['procedimientos'][0]['CausaS5'];
    $ProPBSDescartado = $row['procedimientos'][0]['ProPBSDescartado'];
    $RznCausaS51 = $row['procedimientos'][0]['RznCausaS51'];
    $DescRzn51 = $row['procedimientos'][0]['DescRzn51'];
    $RznCausaS52 = $row['procedimientos'][0]['RznCausaS52'];
    $DescRzn52 = $row['procedimientos'][0]['DescRzn52'];
    $CausaS6 = $row['procedimientos'][0]['CausaS6'];
    $CausaS7 = $row['procedimientos'][0]['CausaS7'];
    $CodCUPS = $row['procedimientos'][0]['CodCUPS'];
    $CanForm = $row['procedimientos'][0]['CanForm'];
    $CadaFreUso = $row['procedimientos'][0]['CadaFreUso'];
    //$CodFreUso = $row['procedimientos'][0]['CodFreUso'];
    $Cant = $row['procedimientos'][0]['Cant'];
    $CantTotal = $row['procedimientos'][0]['CantTotal'];
    $CodPerDurTrat = $row['procedimientos'][0]['CodPerDurTrat'];
    $JustNoPBS = $row['procedimientos'][0]['JustNoPBS'];
    $IndRec = $row['procedimientos'][0]['IndRec'];
    $EstJM = $row['procedimientos'][0]['EstJM'];
    $CodDane = $row['CodDANEMunIPS'];
    $Ambiente = $row['CodAmbAte'];
    $Ips = $row['NroIDIPS'];
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
$sheet->setCellValue('I'.$indice,$CodEPSNom);
$sheet->setCellValue('J'.$indice,$ConOrden);
$sheet->setCellValue('K'.$indice,$TipoPrest);
$sheet->setCellValue('L'.$indice,$CausaS11);
$sheet->setCellValue('M'.$indice,$CausaS12);
$sheet->setCellValue('N'.$indice,$CausaS2);
$sheet->setCellValue('O'.$indice,$CausaS3);
$sheet->setCellValue('P'.$indice,$CausaS4);
$sheet->setCellValue('Q'.$indice,$ProPBSUtilizado);
$sheet->setCellValue('R'.$indice,$CausaS5);
$sheet->setCellValue('S'.$indice,$ProPBSDescartado);
$sheet->setCellValue('T'.$indice,$RznCausaS51);
$sheet->setCellValue('U'.$indice,$DescRzn51);
$sheet->setCellValue('V'.$indice,$RznCausaS52);
$sheet->setCellValue('W'.$indice,$DescRzn52);
$sheet->setCellValue('X'.$indice,$CausaS6);
$sheet->setCellValue('Y'.$indice,$CausaS7);
$sheet->setCellValue('Z'.$indice,$CodCUPS);
$sheet->setCellValue('AA'.$indice,$CanForm);
$sheet->setCellValue('AB'.$indice,$CadaFreUso);
//$sheet->setCellValue('AC'.$indice,$CodFreUso);
$sheet->setCellValue('AC'.$indice,$Cant);
$sheet->setCellValue('AD'.$indice,$CantTotal);
$sheet->setCellValue('AE'.$indice,$CodPerDurTrat);
$sheet->setCellValue('AF'.$indice,$JustNoPBS);
$sheet->setCellValue('AG'.$indice,$IndRec);
$sheet->setCellValue('AH'.$indice,$EstJM);
$sheet->setCellValue('AI'.$indice,$CodDane);
$sheet->setCellValue('AJ'.$indice,$Ambiente);
$sheet->setCellValue('AK'.$indice,$AmbienteDesc);
$sheet->setCellValue('AL'.$indice,$CodDxPpal);
$sheet->setCellValue('AM'.$indice,$CodDxRel1);
$sheet->setCellValue('AN'.$indice,$CodDxRel2);
$sheet->setCellValue('AO'.$indice,$Ips);





            $indice++;
        }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


