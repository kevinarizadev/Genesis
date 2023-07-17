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
    $sheet->setCellValue('J1','CanTrat');
    $sheet->setCellValue('K1','CantTotalF');
    $sheet->setCellValue('L1','CausaS1');
    $sheet->setCellValue('M1','CausaS2');
    $sheet->setCellValue('N1','CausaS3');
    $sheet->setCellValue('O1','CausaS4');
    $sheet->setCellValue('P1','CausaS5');
    $sheet->setCellValue('Q1','CausaS6');
    $sheet->setCellValue('R1','CodFF');
    $sheet->setCellValue('S1','CodFreAdmon');
    $sheet->setCellValue('T1','CodVA');
    $sheet->setCellValue('U1','ConOrden');
    $sheet->setCellValue('V1','DescMedPrinAct');
    $sheet->setCellValue('W1','DescRzn31');
    $sheet->setCellValue('X1','DescRzn32');
    $sheet->setCellValue('Y1','DescRzn41');
    $sheet->setCellValue('Z1','DescRzn42');
    $sheet->setCellValue('AA1','DescRzn43');
    $sheet->setCellValue('AB1','DescRzn44');
    $sheet->setCellValue('AC1','Dosis');
    $sheet->setCellValue('AD1','DosisUM');
    $sheet->setCellValue('AE1','DurTrat');
    $sheet->setCellValue('AF1','EstJM');
    $sheet->setCellValue('AG1','IndEsp');
    $sheet->setCellValue('AH1','IndRec');
    $sheet->setCellValue('AI1','IndicacionesUNIRS');
    $sheet->setCellValue('AJ1','JustNoPBS');
    $sheet->setCellValue('AK1','MedPBSDescartado');
    $sheet->setCellValue('AL1','MedPBSUtilizado');
    $sheet->setCellValue('AM1','NoFAdmon');
    $sheet->setCellValue('AN1','PrincipiosActivos');
    $sheet->setCellValue('AO1','RznCausaS5');
    $sheet->setCellValue('AP1','RznCausaS31');
    $sheet->setCellValue('AQ1','RznCausaS32');
    $sheet->setCellValue('AR1','RznCausaS41');
    $sheet->setCellValue('AS1','RznCausaS42');
    $sheet->setCellValue('AT1','RznCausaS43');
    $sheet->setCellValue('AU1','RznCausaS44');
    $sheet->setCellValue('AV1','TipoMed');
    $sheet->setCellValue('AW1','TipoPrest');
    $sheet->setCellValue('AX1','UFCantTotal');

    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

           if (count($row['medicamentos'][0]) > 0) {
                    $TipoTec = 'M';
                    $medicamentos = $row['medicamentos'][0];
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
            $CanTrat = $row['medicamentos'][0]['CanTrat'];
            $CantTotalF = $row['medicamentos'][0]['CantTotalF'];
            $CausaS1 = $row['medicamentos'][0]['CausaS1'];
            $CausaS2 = $row['medicamentos'][0]['CausaS2'];
            $CausaS3 = $row['medicamentos'][0]['CausaS3'];
            $CausaS4 = $row['medicamentos'][0]['CausaS4'];
            $CausaS5 = $row['medicamentos'][0]['CausaS5'];
            $CausaS6 = $row['medicamentos'][0]['CausaS6'];
            $CodFF = $row['medicamentos'][0]['CodFF'];
            $CodFreAdmon = $row['medicamentos'][0]['CodFreAdmon'];
            $CodVA = $row['medicamentos'][0]['CodVA'];
            $ConOrden = $row['medicamentos'][0]['ConOrden'];
            $DescMedPrinAct = $row['medicamentos'][0]['DescMedPrinAct'];
            $DescRzn31 = $row['medicamentos'][0]['DescRzn31'];
            $DescRzn32 = $row['medicamentos'][0]['DescRzn32'];
            $DescRzn41 = $row['medicamentos'][0]['DescRzn41'];
            $DescRzn42 = $row['medicamentos'][0]['DescRzn42'];
            $DescRzn43 = $row['medicamentos'][0]['DescRzn43'];
            $DescRzn44 = $row['medicamentos'][0]['DescRzn44'];
            $Dosis = $row['medicamentos'][0]['Dosis'];
            $DosisUM = $row['medicamentos'][0]['DosisUM'];
            $DurTrat = $row['medicamentos'][0]['DurTrat'];
            $EstJM = $row['medicamentos'][0]['EstJM'];
            $IndEsp = $row['medicamentos'][0]['IndEsp'];
            $IndRec = $row['medicamentos'][0]['IndRec'];
            $JustNoPBS = $row['medicamentos'][0]['JustNoPBS'];
            $MedPBSDescartado = $row['medicamentos'][0]['MedPBSDescartado'];
            $MedPBSUtilizado = $row['medicamentos'][0]['MedPBSUtilizado'];
            $NoFAdmon = $row['medicamentos'][0]['NoFAdmon'];
            $RznCausaS5 = $row['medicamentos'][0]['RznCausaS5'];
            $RznCausaS31 = $row['medicamentos'][0]['RznCausaS31'];
            $RznCausaS32 = $row['medicamentos'][0]['RznCausaS32'];
            $RznCausaS41 = $row['medicamentos'][0]['RznCausaS41'];
            $RznCausaS42 = $row['medicamentos'][0]['RznCausaS42'];
            $RznCausaS43 = $row['medicamentos'][0]['RznCausaS43'];
            $RznCausaS44 = $row['medicamentos'][0]['RznCausaS44'];
            $TipoMed = $row['medicamentos'][0]['TipoMed'];
            $TipoPrest = $row['medicamentos'][0]['TipoPrest'];
            $UFCantTotal = $row['medicamentos'][0]['UFCantTotal']; 

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
            $sheet->setCellValue('J'.$indice,$CanTrat);
            $sheet->setCellValue('K'.$indice,$CantTotalF);
            $sheet->setCellValue('L'.$indice,$CausaS1);
            $sheet->setCellValue('M'.$indice,$CausaS2);
            $sheet->setCellValue('N'.$indice,$CausaS3);
            $sheet->setCellValue('O'.$indice,$CausaS4);
            $sheet->setCellValue('P'.$indice,$CausaS5);
            $sheet->setCellValue('Q'.$indice,$CausaS6);
            $sheet->setCellValue('R'.$indice,$CodFF);
            $sheet->setCellValue('S'.$indice,$CodFreAdmon);
            $sheet->setCellValue('T'.$indice,$CodVA);
            $sheet->setCellValue('U'.$indice,$ConOrden);
            $sheet->setCellValue('V'.$indice,$DescMedPrinAct);
            $sheet->setCellValue('W'.$indice,$DescRzn31);
            $sheet->setCellValue('X'.$indice,$DescRzn32);
            $sheet->setCellValue('Y'.$indice,$DescRzn41);
            $sheet->setCellValue('Z'.$indice,$DescRzn42);
            $sheet->setCellValue('AA'.$indice,$DescRzn43);
            $sheet->setCellValue('AB'.$indice,$DescRzn44);
            $sheet->setCellValue('AC'.$indice,$Dosis);
            $sheet->setCellValue('AD'.$indice,$DosisUM);
            $sheet->setCellValue('AE'.$indice,$DurTrat);
            $sheet->setCellValue('AF'.$indice,$EstJM);
            $sheet->setCellValue('AG'.$indice,$IndEsp);
            $sheet->setCellValue('AH'.$indice,$IndRec);
            $sheet->setCellValue('AJ'.$indice,$JustNoPBS);
            $sheet->setCellValue('AK'.$indice,$MedPBSDescartado);
            $sheet->setCellValue('AL'.$indice,$MedPBSUtilizado);
            $sheet->setCellValue('AM'.$indice,$NoFAdmon);
            $sheet->setCellValue('AO'.$indice,$RznCausaS5);
            $sheet->setCellValue('AP'.$indice,$RznCausaS31);
            $sheet->setCellValue('AQ'.$indice,$RznCausaS32);
            $sheet->setCellValue('AR'.$indice,$RznCausaS41);
            $sheet->setCellValue('AS'.$indice,$RznCausaS42);
            $sheet->setCellValue('AT'.$indice,$RznCausaS43);
            $sheet->setCellValue('AU'.$indice,$RznCausaS44);
            $sheet->setCellValue('AV'.$indice,$TipoMed);
            $sheet->setCellValue('AW'.$indice,$TipoPrest);
            $sheet->setCellValue('AX'.$indice,$UFCantTotal);


            $indice++;
        }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


