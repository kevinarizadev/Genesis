<?php

require_once('../config/dbcon.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="REPORTE_CAJA.txt"');
$consulta = oci_parse($c,"SELECT * from vw_sgdo_reporte_carpeta");
oci_execute($consulta);	

$row = array();
echo 'UBICACIONCAJA'.'|'.
'NOMBRECAJA'.'|'.
'DESCRIPCIONCAJA'.'|'.
'AREA'.'|'.
'CODIGOCAJA'.'|'.
'FECHACREACIONCAJA'.'|'.
'CODIGOCARPETA'.'|'.
'NOMBRECARPETA'.'|'.
'DESCRIPCIONCARPETA';
echo "\n";
while( $rows = oci_fetch_assoc($consulta)) 
{
echo $rows['UBICACIONCAJA']. '|' .
$rows['NOMBRECAJA']. '|' .
$rows['DESCRIPCIONCAJA']. '|' .
$rows['AREA']. '|' .
$rows['CODIGOCAJA']. '|' .
$rows['FECHACREACIONCAJA']. '|' .
$rows['CODIGOCARPETA']. '|' .
$rows['NOMBRECARPETA']. '|' .
$rows['DESCRIPCIONCARPETA']. "\n";
 }
oci_close($c);
?>