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
$sheet->setCellValue('I1','CodEPSNom');
$sheet->setCellValue('J1','ConOrden');
$sheet->setCellValue('K1','TipoPrest');
$sheet->setCellValue('L1','CausaS1TipoPrestNom');
$sheet->setCellValue('M1','CausaS2');
$sheet->setCellValue('N1','CausaS3');
$sheet->setCellValue('O1','CausaS4');
$sheet->setCellValue('P1','ProNutUtilizado');
$sheet->setCellValue('Q1','RznCausaS41');
$sheet->setCellValue('R1','DescRzn41');
$sheet->setCellValue('S1','RznCausaS42');
$sheet->setCellValue('T1','DescRzn42');
$sheet->setCellValue('U1','CausaS5');
$sheet->setCellValue('V1','ProNutDescartado');
$sheet->setCellValue('W1','RznCausaS51');
$sheet->setCellValue('X1','DescRzn51');
$sheet->setCellValue('Y1','RznCausaS52');
$sheet->setCellValue('Z1','DescRzn52');
$sheet->setCellValue('AA1','RznCausaS53');
$sheet->setCellValue('AB1','DescRzn53');
$sheet->setCellValue('AC1','RznCausaS54');
$sheet->setCellValue('AD1','DescRzn54');
$sheet->setCellValue('AE1','DXEnfHuer');
$sheet->setCellValue('AF1','DXVIH');
$sheet->setCellValue('AG1','DXCaPal');
$sheet->setCellValue('AH1','DXEnfRCEV');
$sheet->setCellValue('AI1','DXDesPro');
$sheet->setCellValue('AJ1','TippProNut');
$sheet->setCellValue('AK1','DescProdNutr');
$sheet->setCellValue('AL1','CodForma');
$sheet->setCellValue('AM1','CodViaAdmon');
$sheet->setCellValue('AN1','JustNoPBS');
$sheet->setCellValue('AO1','Dosis');
$sheet->setCellValue('AP1','DosisUM');
$sheet->setCellValue('AQ1','NoFAdmon');
$sheet->setCellValue('AR1','CodFreAdmon');
$sheet->setCellValue('AS1','IndEsp');
$sheet->setCellValue('AT1','CanTrat');
$sheet->setCellValue('AU1','DurTrat');
$sheet->setCellValue('AV1','CantTotalF');
$sheet->setCellValue('AW1','UFCantTotal');
$sheet->setCellValue('AX1','IndRec');
$sheet->setCellValue('AY1','NoPrescAso');
$sheet->setCellValue('AZ1','EstJM');
$sheet->setCellValue('BA1','CodDane');
$sheet->setCellValue('BB1','Ambiente');
$sheet->setCellValue('BC1','AmbienteDesc');
$sheet->setCellValue('BD1','CodDxPpal');
$sheet->setCellValue('BE1','CodDxRel1');
$sheet->setCellValue('BF1','CodDxRel2');

    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['productosnutricionales'][0]) > 0) {
                    $TipoTec = 'P';
                    $productosnutricionales = $row['productosnutricionales'][0];
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
    $ConOrden = $row['productosnutricionales'][0]['ConOrden'];
       $TipoPrest = $row['productosnutricionales'][0]['TipoPrest'];
    $CausaS1 = $row['productosnutricionales'][0]['CausaS1'];
    $CausaS2 = $row['productosnutricionales'][0]['CausaS2'];
    $CausaS3 = $row['productosnutricionales'][0]['CausaS3'];
    $CausaS4 = $row['productosnutricionales'][0]['CausaS4'];
    $ProNutUtilizado = $row['productosnutricionales'][0]['ProNutUtilizado'];
    $RznCausaS41 = $row['productosnutricionales'][0]['RznCausaS41'];
    $DescRzn41 = $row['productosnutricionales'][0]['DescRzn41'];
    $RznCausaS42 = $row['productosnutricionales'][0]['RznCausaS42'];
    $DescRzn42 = $row['productosnutricionales'][0]['DescRzn42'];
    $CausaS5 = $row['productosnutricionales'][0]['CausaS5'];
    $ProNutDescartado = $row['productosnutricionales'][0]['ProNutDescartado'];
    $RznCausaS51 = $row['productosnutricionales'][0]['RznCausaS51'];
    $DescRzn51 = $row['productosnutricionales'][0]['DescRzn51'];
    $RznCausaS52 = $row['productosnutricionales'][0]['RznCausaS52'];
    $DescRzn52 = $row['productosnutricionales'][0]['DescRzn52'];
    $RznCausaS53 = $row['productosnutricionales'][0]['RznCausaS53'];
    $DescRzn53 = $row['productosnutricionales'][0]['DescRzn53'];
    $RznCausaS54 = $row['productosnutricionales'][0]['RznCausaS54'];
    $DescRzn54 = $row['productosnutricionales'][0]['DescRzn54'];
    $DXEnfHuer = $row['productosnutricionales'][0]['DXEnfHuer'];
    // $DXEnfHuerNom = $row['productosnutricionales'][0]['DXEnfHuerNom'];
    $DXVIH = $row['productosnutricionales'][0]['DXVIH'];
    // $DXVIHNom = $row['productosnutricionales'][0]['DXVIHNom'];
    $DXCaPal = $row['productosnutricionales'][0]['DXCaPal'];
    // $DXCaPalNom = $row['productosnutricionales'][0]['DXCaPalNom'];
    $DXEnfRCEV = $row['productosnutricionales'][0]['DXEnfRCEV'];
    // $DXEnfRCEVNom = $row['productosnutricionales'][0]['DXEnfRCEVNom'];
    $DXDesPro = $row['productosnutricionales'][0]['DXDesPro'];
    // $DXDesProNom = $row['productosnutricionales'][0]['DXDesProNom'];
    $TippProNut = $row['productosnutricionales'][0]['TippProNut'];
    $DescProdNutr = $row['productosnutricionales'][0]['DescProdNutr'];
    // $DescProdNutrNom = $row['productosnutricionales'][0]['DescProdNutrNom'];
    $CodForma = $row['productosnutricionales'][0]['CodForma'];
    // $CodFormaNom = $row['productosnutricionales'][0]['CodFormaNom'];
    $CodViaAdmon = $row['productosnutricionales'][0]['CodViaAdmon'];
    // $CodViaAdmonNom = $row['productosnutricionales'][0]['CodViaAdmonNom'];
    $JustNoPBS = $row['productosnutricionales'][0]['JustNoPBS'];
    $Dosis = $row['productosnutricionales'][0]['Dosis'];
    $DosisUM = $row['productosnutricionales'][0]['DosisUM'];
    $NoFAdmon = $row['productosnutricionales'][0]['NoFAdmon'];
    $CodFreAdmon = $row['productosnutricionales'][0]['CodFreAdmon'];
    // $CodFreAdmonNom = $row['productosnutricionales'][0]['CodFreAdmonNom'];
    $IndEsp = $row['productosnutricionales'][0]['IndEsp'];
    // $IndEspNom = $row['productosnutricionales'][0]['IndEspNom'];
    $CanTrat = $row['productosnutricionales'][0]['CanTrat'];
    $DurTrat = $row['productosnutricionales'][0]['DurTrat'];
    // $DurTratNom = $row['productosnutricionales'][0]['DurTratNom'];
    $CantTotalF = $row['productosnutricionales'][0]['CantTotalF'];
    $UFCantTotal = $row['productosnutricionales'][0]['UFCantTotal'];
    $IndRec = $row['productosnutricionales'][0]['IndRec'];
    $NoPrescAso = $row['productosnutricionales'][0]['NoPrescAso'];
    $EstJM = $row['productosnutricionales'][0]['EstJM'];
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
$sheet->setCellValue('I'.$indice,$CodEPSNom);
$sheet->setCellValue('J'.$indice,$ConOrden);
$sheet->setCellValue('K'.$indice,$TipoPrest);
$sheet->setCellValue('L'.$indice,$CausaS1);
$sheet->setCellValue('M'.$indice,$CausaS2);
$sheet->setCellValue('N'.$indice,$CausaS3);
$sheet->setCellValue('O'.$indice,$CausaS4);
$sheet->setCellValue('P'.$indice,$ProNutUtilizado);
$sheet->setCellValue('Q'.$indice,$RznCausaS41);
$sheet->setCellValue('R'.$indice,$DescRzn41);
$sheet->setCellValue('S'.$indice,$RznCausaS42);
$sheet->setCellValue('T'.$indice,$DescRzn42);
$sheet->setCellValue('U'.$indice,$CausaS5);
$sheet->setCellValue('V'.$indice,$ProNutDescartado);
$sheet->setCellValue('W'.$indice,$RznCausaS51);
$sheet->setCellValue('X'.$indice,$DescRzn51);
$sheet->setCellValue('Y'.$indice,$RznCausaS52);
$sheet->setCellValue('Z'.$indice,$DescRzn52);
$sheet->setCellValue('AA'.$indice,$RznCausaS53);
$sheet->setCellValue('AB'.$indice,$DescRzn53);
$sheet->setCellValue('AC'.$indice,$RznCausaS54);
$sheet->setCellValue('AD'.$indice,$DescRzn54);
$sheet->setCellValue('AE'.$indice,$DXEnfHuer);
$sheet->setCellValue('AF'.$indice,$DXVIH);
$sheet->setCellValue('AG'.$indice,$DXCaPal);
$sheet->setCellValue('AH'.$indice,$DXEnfRCEV);
$sheet->setCellValue('AI'.$indice,$DXDesPro);
$sheet->setCellValue('AJ'.$indice,$TippProNut);
$sheet->setCellValue('AK'.$indice,$DescProdNutr);
$sheet->setCellValue('AL'.$indice,$CodForma);
$sheet->setCellValue('AM'.$indice,$CodViaAdmon);
$sheet->setCellValue('AN'.$indice,$JustNoPBS);
$sheet->setCellValue('AO'.$indice,$Dosis);
$sheet->setCellValue('AP'.$indice,$DosisUM);
$sheet->setCellValue('AQ'.$indice,$NoFAdmon);
$sheet->setCellValue('AR'.$indice,$CodFreAdmon);
$sheet->setCellValue('AS'.$indice,$IndEsp);
$sheet->setCellValue('AT'.$indice,$CanTrat);
$sheet->setCellValue('AU'.$indice,$DurTrat);
$sheet->setCellValue('AV'.$indice,$CantTotalF);
$sheet->setCellValue('AW'.$indice,$UFCantTotal);
$sheet->setCellValue('AX'.$indice,$IndRec);
$sheet->setCellValue('AY'.$indice,$NoPrescAso);
$sheet->setCellValue('AZ'.$indice,$EstJM);
$sheet->setCellValue('BA'.$indice,$CodDane);
$sheet->setCellValue('BB'.$indice,$Ambiente);
$sheet->setCellValue('BC'.$indice,$AmbienteDesc);
$sheet->setCellValue('BD'.$indice,$CodDxPpal);
$sheet->setCellValue('BE'.$indice,$CodDxRel1);
$sheet->setCellValue('BF'.$indice,$CodDxRel2);




            $indice++;
        }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


