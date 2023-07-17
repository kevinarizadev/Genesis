<?php

require_once('../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="REPORTE_CAJA.txt"');
$consulta = oci_parse($c,"SELECT * from vw_sgdo_reporte_caja");
oci_execute($consulta);	

$row = array();
echo 'UBICACIONCAJA'.'|'.
'NOMBRECAJA'.'|'.
'DESCRIPCIONCAJA'.'|'.
'AREA'.'|'.
'CODIGOCAJA'.'|'.
'FECHACREACION';
echo "\n";
while( $rows = oci_fetch_assoc($consulta)) 
{
echo $rows['UBICACIONCAJA']. '|' .
$rows['NOMBRECAJA']. '|' .
$rows['DESCRIPCIONCAJA']. '|' .
$rows['AREA']. '|' .
$rows['CODIGOCAJA']. '|' .
$rows['FECHACREACION']. "\n";
 }
oci_close($c);
?>