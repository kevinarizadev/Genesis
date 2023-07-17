<?php

require_once('../../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="TIPO_017.txt"');

$consulta = oci_parse($c,"SELECT * FROM n_circular_017");

oci_execute($consulta);	

$row = array();
echo 'CUOV_TERCERO'.'|'.
'TERC_NOMBRE'.'|'.
'CUEC_NOMBRE'.'|'.
'CUON_EMPRESA'.'|'.
'CUOC_DOCUMENTO'.'|'.
'CUON_NUMERO'.'|'.
'CUON_UBICACION'.'|'.
'CUON_CUOTA'.'|'.
'CUOF_VENCIMIENTO'.'|'.
'CUOF_FECHA'.'|'.
'CUOC_FACTURA'.'|'.
'CUOC_NATURALEZA'.'|'.
'CUOV_SALDO'.'|'.
'CUOV_CUENTA'.'|'.
'MOVC_DOCUMENTO'.'|'.
'TERN_ZONA'.'|'.
'BRUTO'.'|'.
'RETEFUENTE'.'|'.
'RETEICA'.'|'.
'RETEIVA'.'|'.
'TIMBRE'.'|'.
'FECHA_CAUSACION'.'|'.
'FECHA_RADICADO'.'|'.
'FECHA_PRESTACION'.'|'.
'MODALIDAD'.'|'.
'UBICACION_AFI'.'|'.
'CNTC_CONCEPTO';
echo "\n";
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo  $rows['CUOV_TERCERO']. '|' .
$rows['TERC_NOMBRE']. '|' .
$rows['CUEC_NOMBRE']. '|' .
$rows['CUON_EMPRESA']. '|' .
$rows['CUOC_DOCUMENTO']. '|' .
$rows['CUON_NUMERO']. '|' .
$rows['CUON_UBICACION']. '|' .
$rows['CUON_CUOTA']. '|' .
$rows['CUOF_VENCIMIENTO']. '|' .
$rows['CUOF_FECHA']. '|' .
$rows['CUOC_FACTURA']. '|' .
$rows['CUOC_NATURALEZA']. '|' .
$rows['CUOV_SALDO']. '|' .
$rows['CUOV_CUENTA']. '|' .
$rows['MOVC_DOCUMENTO']. '|' .
$rows['TERN_ZONA']. '|' .
$rows['BRUTO']. '|' .
$rows['RETEFUENTE']. '|' .
$rows['RETEICA']. '|' .
$rows['RETEIVA']. '|' .
$rows['TIMBRE']. '|' .
$rows['FECHA_CAUSACION']. '|' .
$rows['FECHA_RADICADO']. '|' .
$rows['FECHA_PRESTACION']. '|' .
$rows['MODALIDAD']. '|' .
$rows['UBICACION_AFI']. '|' .
$rows['CNTC_CONCEPTO'] . "\n";
 }
oci_close($c);

?>