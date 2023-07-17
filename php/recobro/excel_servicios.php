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
$sheet->setCellValue('L1','CausaS2');
$sheet->setCellValue('M1','CausaS3');
$sheet->setCellValue('N1','CausaS4');
$sheet->setCellValue('O1','DescCausaS4');
$sheet->setCellValue('P1','CausaS5');
$sheet->setCellValue('Q1','CodSerComp');
$sheet->setCellValue('R1','DescSerComp');
$sheet->setCellValue('S1','CanForm');
$sheet->setCellValue('T1','CadaFreUso');
$sheet->setCellValue('U1','CodFreUso');
$sheet->setCellValue('V1','Cant');
$sheet->setCellValue('W1','CantTotal');
$sheet->setCellValue('X1','CodPerDurTrat');
$sheet->setCellValue('Y1','TipoTrans');
$sheet->setCellValue('Z1','ReqAcom');
$sheet->setCellValue('AA1','TipoIDAcomAlb');
$sheet->setCellValue('AB1','NroIDAcomAlb');
$sheet->setCellValue('AC1','ParentAcomAlb');
$sheet->setCellValue('AD1','CodMunOriAlb');
$sheet->setCellValue('AE1','CodMunDesAlb');
$sheet->setCellValue('AF1','JustNoPBS');
$sheet->setCellValue('AG1','IndRec');
$sheet->setCellValue('AH1','EstJM');
$sheet->setCellValue('AI1','CodDane');
$sheet->setCellValue('AJ1','Ambiente');
$sheet->setCellValue('AK1','AmbienteDesc');
$sheet->setCellValue('AL1','CodDxPpal');
$sheet->setCellValue('AM1','CodDxRel1');
$sheet->setCellValue('AN1','CodDxRel2');

    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['serviciosComplementarios'][0]) > 0) {
                    $TipoTec = 'S';
                    $serviciosComplementarios = $row['serviciosComplementarios'][0];
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
$ConOrden = $row['serviciosComplementarios'][0]['ConOrden'];
$TipoPrest = $row['serviciosComplementarios'][0]['TipoPrest'];
$CausaS1 = $row['serviciosComplementarios'][0]['CausaS1'];
$CausaS2 = $row['serviciosComplementarios'][0]['CausaS2'];
$CausaS3 = $row['serviciosComplementarios'][0]['CausaS3'];
$CausaS4 = $row['serviciosComplementarios'][0]['CausaS4'];
$DescCausaS4 = $row['serviciosComplementarios'][0]['DescCausaS4'];
$CausaS5 = $row['serviciosComplementarios'][0]['CausaS5'];
$CodSerComp = $row['serviciosComplementarios'][0]['CodSerComp'];
$DescSerComp = $row['serviciosComplementarios'][0]['DescSerComp'];
$CanForm = $row['serviciosComplementarios'][0]['CanForm'];
$CadaFreUso = $row['serviciosComplementarios'][0]['CadaFreUso'];
$CodFreUso = $row['serviciosComplementarios'][0]['CodFreUso'];
$Cant = $row['serviciosComplementarios'][0]['Cant'];
$CantTotal = $row['serviciosComplementarios'][0]['CantTotal'];
$CodPerDurTrat = $row['serviciosComplementarios'][0]['CodPerDurTrat'];
$TipoTrans = $row['serviciosComplementarios'][0]['TipoTrans'];
$ReqAcom = $row['serviciosComplementarios'][0]['ReqAcom'];
$TipoIDAcomAlb = $row['serviciosComplementarios'][0]['TipoIDAcomAlb'];
$NroIDAcomAlb = $row['serviciosComplementarios'][0]['NroIDAcomAlb'];
$ParentAcomAlb = $row['serviciosComplementarios'][0]['ParentAcomAlb'];
$CodMunOriAlb = $row['serviciosComplementarios'][0]['CodMunOriAlb'];
$CodMunDesAlb = $row['serviciosComplementarios'][0]['CodMunDesAlb'];
$JustNoPBS = $row['serviciosComplementarios'][0]['JustNoPBS'];
$IndRec = $row['serviciosComplementarios'][0]['IndRec'];
$EstJM = $row['serviciosComplementarios'][0]['EstJM'];


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
$sheet->setCellValue('L'.$indice,$CausaS2);
$sheet->setCellValue('M'.$indice,$CausaS3);
$sheet->setCellValue('N'.$indice,$CausaS4);
$sheet->setCellValue('O'.$indice,$DescCausaS4);
$sheet->setCellValue('P'.$indice,$CausaS5);
$sheet->setCellValue('Q'.$indice,$CodSerComp);
$sheet->setCellValue('R'.$indice,$DescSerComp);
$sheet->setCellValue('S'.$indice,$CanForm);
$sheet->setCellValue('T'.$indice,$CadaFreUso);
$sheet->setCellValue('U'.$indice,$CodFreUso);
$sheet->setCellValue('V'.$indice,$Cant);
$sheet->setCellValue('W'.$indice,$CantTotal);
$sheet->setCellValue('X'.$indice,$CodPerDurTrat);
$sheet->setCellValue('Y'.$indice,$TipoTrans);
$sheet->setCellValue('Z'.$indice,$ReqAcom);
$sheet->setCellValue('AA'.$indice,$TipoIDAcomAlb);
$sheet->setCellValue('AB'.$indice,$NroIDAcomAlb);
$sheet->setCellValue('AC'.$indice,$ParentAcomAlb);
$sheet->setCellValue('AD'.$indice,$CodMunOriAlb);
$sheet->setCellValue('AE'.$indice,$CodMunDesAlb);
$sheet->setCellValue('AF'.$indice,$JustNoPBS);
$sheet->setCellValue('AG'.$indice,$IndRec);
$sheet->setCellValue('AH'.$indice,$EstJM);
$sheet->setCellValue('AI'.$indice,$CodDane);
$sheet->setCellValue('AJ'.$indice,$Ambiente);
$sheet->setCellValue('AK'.$indice,$AmbienteDesc);
$sheet->setCellValue('AL'.$indice,$CodDxPpal);
$sheet->setCellValue('AM'.$indice,$CodDxRel1);
$sheet->setCellValue('AN'.$indice,$CodDxRel2);




            $indice++;
        }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


