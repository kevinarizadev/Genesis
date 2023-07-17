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
    $sheet->setCellValue('B1','FPrescripción');
    $sheet->setCellValue('C1','EstPres');
    $sheet->setCellValue('D1','Medicamentos');
    $sheet->setCellValue('E1','Procedimientos');
    $sheet->setCellValue('F1','Dispositivos');
    $sheet->setCellValue('G1','ProductosNutricionales');
    $sheet->setCellValue('H1','ServiciosComplementarios');
    $sheet->setCellValue('I1','CodDane');
    $sheet->setCellValue('J1','Ips');
    $sheet->setCellValue('K1','Ambiente');
    $sheet->setCellValue('L1','AmbienteDesc');
    $sheet->setCellValue('M1','TipDoc');
    $sheet->setCellValue('N1','NumDoc');
    $sheet->setCellValue('O1','PNPaciente');
    $sheet->setCellValue('P1','SNPaciente');
    $sheet->setCellValue('Q1','PAPaciente');
    $sheet->setCellValue('R1','SAPaciente');
    $sheet->setCellValue('S1','CodEPS');
    $sheet->setCellValue('T1','CodEPSNom');
    $sheet->setCellValue('U1','HPrescripcion');
    $sheet->setCellValue('V1','CodHabIPS');
    $sheet->setCellValue('W1','TipoIDIPS');
    $sheet->setCellValue('X1','NroIDIPS');
    $sheet->setCellValue('Y1','DirSedeIPS');
    $sheet->setCellValue('Z1','TelSedeIPS');
    $sheet->setCellValue('AA1','TipoIDProf');
    $sheet->setCellValue('AB1','NumIDProf');
    $sheet->setCellValue('AC1','PNProfS');
    $sheet->setCellValue('AD1','SNProfS');
    $sheet->setCellValue('AE1','PAProfS');
    $sheet->setCellValue('AF1','SAProfS');
    $sheet->setCellValue('AG1','RegProfS');
    $sheet->setCellValue('AH1','RefAmbAte');
    $sheet->setCellValue('AI1','EnfHuerfana');
    $sheet->setCellValue('AJ1','CodEnfHuerfana');
    $sheet->setCellValue('AK1','EnfHuerfanaDX');
    $sheet->setCellValue('AL1','CodDxPpal');
    $sheet->setCellValue('AM1','CodDxPpalNom');
    $sheet->setCellValue('AN1','CodDxRel1');
    $sheet->setCellValue('AO1','CodDxRel1Nom');
    $sheet->setCellValue('AP1','CodDxRel2');
    $sheet->setCellValue('AQ1','CodDxRel2Nom');
    $sheet->setCellValue('AR1','SopNutricional');
    $sheet->setCellValue('AS1','TipoIDMadrePaciente');
    $sheet->setCellValue('AT1','NroIDMadrePaciente');
    $sheet->setCellValue('AU1','TipoTransc');
    $sheet->setCellValue('AV1','TipoTranscNom');
    $sheet->setCellValue('AW1','TipoIDDonanteVivo');
    $sheet->setCellValue('AX1','NroIDDonanteVivo');
    $sheet->setCellValue('AY1','NoPrescripcion');

    $json = json_decode(file_get_contents('php://input'), true)['datos'];
    // var_dump ($json);
    foreach ($json as $row) {

         switch ($row['prescripcion']['CodAmbAte']) {
                case 12:
                     $palabra =  "Ambulatorio – No Priorizado";
                break;
               case 11:
                    $palabra =  "Ambulatorio – Priorizado";
                break;
                   case 21:
                 $palabra =  "Hospitalario – Domiciliario";
                break;
                   case 22:
                 $palabra =  "Hospitalario - Internacion";
                break;
                   case 30:
                $palabra = "Urgencias";
                break;
              

        };

        $NoPrescripcion = $row['NoPrescripcion'];
        $FPrescripción = $row['FPrescripcion'];
        $EstPres = $row['EstPres'];
        $Medicamentos = count($row['medicamentos']);
        $Procedimientos =  count($row['procedimientos']);
        $Dispositivos =  count($row['dispositivos']);
        $ProductosNutricionales =  count($row['productosnutricionales']);
        $ServiciosComplementarios =  count($row['serviciosComplementarios']);
        $CodDane = $row['CodDANEMunIPS'];
        $Ips = $row['NroIDIPS'];
        $Ambiente = $row['CodAmbAte'];
        $AmbienteDesc = $palabra;
        //$row['AmbienteDesc'];
        $TipDoc = $row['TipoIDPaciente'];
        $NumDoc = $row['NroIDPaciente'];
        $PNPaciente = $row['PNPaciente'];
        $SNPaciente = $row['SNPaciente'];
        $PAPaciente = $row['PAPaciente'];
        $SAPaciente = $row['SAPaciente'];
        $CodEPS = $row['CodEPS'];
        $CodEPSNom = "CAJA DE COMPENSACION FAMILIAR  CAJACOPI ATLANTICO"; 
        $HPrescripcion = $row['HPrescripcion'];
        $CodHabIPS = $row['CodHabIPS'];
        $TipoIDIPS = $row['TipoIDIPS'];
        $NroIDIPS = $row['NroIDIPS'];
        $DirSedeIPS = $row['DirSedeIPS'];
        $TelSedeIPS = $row['TelSedeIPS'];
        $TipoIDProf = $row['TipoIDProf'];
        $NumIDProf = $row['NumIDProf'];
        $PNProfS = $row['PNProfS'];
        $SNProfS = $row['SNProfS'];
        $PAProfS = $row['PAProfS'];
        $SAProfS = $row['SAProfS'];
        $RegProfS = $row['RegProfS'];
        $RefAmbAte = $row['RefAmbAte'];
        $EnfHuerfana = $row['EnfHuerfana'];
        $CodEnfHuerfana = $row['CodEnfHuerfana'];
        $EnfHuerfanaDX = $row['EnfHuerfanaDX'];
        $CodDxPpal = $row['CodDxPpal'];
        $CodDxPpalNom = $row['CodDxPpalNom'];
        $CodDxRel1 = $row['CodDxRel1'];
        $CodDxRel1Nom = $row['CodDxRel1Nom'];
        $CodDxRel2 = $row['CodDxRel2'];
        $CodDxRel2Nom = $row['CodDxRel2Nom'];
        $SopNutricional = $row['SopNutricional'];
        $TipoIDMadrePaciente = $row['TipoIDMadrePaciente'];
        $NroIDMadrePaciente = $row['NroIDMadrePaciente'];
        $TipoTransc = $row['TipoTransc'];
        $TipoTranscNom = $row['TipoTranscNom'];
        $TipoIDDonanteVivo = $row['TipoIDDonanteVivo'];
        $NroIDDonanteVivo = $row['NroIDDonanteVivo'];
        $NoPrescripcion = $row['NoPrescripcion'];

            //$sheet->setCellValue('A'.$indice,$indice);
         $sheet->setCellValue('A'.$indice,$NoPrescripcion);
$sheet->setCellValue('B'.$indice,$FPrescripción);
$sheet->setCellValue('C'.$indice,$EstPres);
$sheet->setCellValue('D'.$indice,$Medicamentos);
$sheet->setCellValue('E'.$indice,$Procedimientos);
$sheet->setCellValue('F'.$indice,$Dispositivos);
$sheet->setCellValue('G'.$indice,$ProductosNutricionales);
$sheet->setCellValue('H'.$indice,$ServiciosComplementarios);
$sheet->setCellValue('I'.$indice,$CodDane);
$sheet->setCellValue('J'.$indice,$Ips);
$sheet->setCellValue('K'.$indice,$Ambiente);
$sheet->setCellValue('L'.$indice,$AmbienteDesc);
$sheet->setCellValue('M'.$indice,$TipDoc);
$sheet->setCellValue('N'.$indice,$NumDoc);
$sheet->setCellValue('O'.$indice,$PNPaciente);
$sheet->setCellValue('P'.$indice,$SNPaciente);
$sheet->setCellValue('Q'.$indice,$PAPaciente);
$sheet->setCellValue('R'.$indice,$SAPaciente);
$sheet->setCellValue('S'.$indice,$CodEPS);
$sheet->setCellValue('T'.$indice,$CodEPSNom);
$sheet->setCellValue('U'.$indice,$HPrescripcion);
$sheet->setCellValue('V'.$indice,$CodHabIPS);
$sheet->setCellValue('W'.$indice,$TipoIDIPS);
$sheet->setCellValue('X'.$indice,$NroIDIPS);
$sheet->setCellValue('Y'.$indice,$DirSedeIPS);
$sheet->setCellValue('Z'.$indice,$TelSedeIPS);
$sheet->setCellValue('AA'.$indice,$TipoIDProf);
$sheet->setCellValue('AB'.$indice,$NumIDProf);
$sheet->setCellValue('AC'.$indice,$PNProfS);
$sheet->setCellValue('AD'.$indice,$SNProfS);
$sheet->setCellValue('AE'.$indice,$PAProfS);
$sheet->setCellValue('AF'.$indice,$SAProfS);
$sheet->setCellValue('AG'.$indice,$RegProfS);
$sheet->setCellValue('AH'.$indice,$RefAmbAte);
$sheet->setCellValue('AI'.$indice,$EnfHuerfana);
$sheet->setCellValue('AJ'.$indice,$CodEnfHuerfana);
$sheet->setCellValue('AK'.$indice,$EnfHuerfanaDX);
$sheet->setCellValue('AL'.$indice,$CodDxPpal);
$sheet->setCellValue('AM'.$indice,$CodDxPpalNom);
$sheet->setCellValue('AN'.$indice,$CodDxRel1);
$sheet->setCellValue('AO'.$indice,$CodDxRel1Nom);
$sheet->setCellValue('AP'.$indice,$CodDxRel2);
$sheet->setCellValue('AQ'.$indice,$CodDxRel2Nom);
$sheet->setCellValue('AR'.$indice,$SopNutricional);
$sheet->setCellValue('AS'.$indice,$TipoIDMadrePaciente);
$sheet->setCellValue('AT'.$indice,$NroIDMadrePaciente);
$sheet->setCellValue('AU'.$indice,$TipoTransc);
$sheet->setCellValue('AV'.$indice,$TipoTranscNom);
$sheet->setCellValue('AW'.$indice,$TipoIDDonanteVivo);
$sheet->setCellValue('AX'.$indice,$NroIDDonanteVivo);
$sheet->setCellValue('AY'.$indice,$NoPrescripcion);


            $indice++;
                  
                  

    }

    $writer = new Xlsx($spreadsheet);

    file_put_contents(realpath( __DIR__ ).'/consolidado_pres2.xlsx', '');
        

    $writer->save(realpath( __DIR__ ).'/consolidado_pres2.xlsx');



}


