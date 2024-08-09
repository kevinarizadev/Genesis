<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatoanexosController.js"></script>
</head>

<body ng-controller="formatoanexosController">

<?php
session_start();
$titulo_anexo = $_SESSION['titulo_anexo'];

require './vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


// libxml_disable_entity_loader(false);
// $xml = simplexml_load_file('your_xml_file.xml');
// // Cargar el archivo de Excel
$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('anexo9.xlsx');



// Obtener la hoja activa
$sheet = $spreadsheet->getActiveSheet();
// session_reset();
// unset($_SESSION['titulo_anexo']);
sleep(1);
// Modificar un valor en la celda A1
$sheet->setCellValue('B1', 'ANEXO N° 9 '.$titulo_anexo );
var_dump($_SESSION);
// unset($_SESSION['titulo_anexo']);
echo '<br>';
echo '<br>';
echo '<br>';
var_dump($_SESSION);
// Guardar los cambios
// $uniq = uniqid();
$uniq = date('dmY_hmis');
// $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
// $writer->save('../../../temp/anexo9'.$uniq.'.xlsx');
// header('Location: ../../../temp/anexo9'.$uniq.'.xlsx');

?>
