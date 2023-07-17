<?php

require_once('../../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="SUF16.txt"');
$fecha_inicio = $_GET['fecha_inicio'];
$fecha_final = $_GET['fecha_final'];
$seccional = $_GET['seccional'];
$regimen = $_GET['regimen'];
$consulta = oci_parse($c,"SELECT * FROM nview_contratacion_report
								where F_INICIAL <= :fecha_inicio
								and F_FINAL >= :fecha_final       
								and SECCIONAL_CONTRATO = :seccional
								and cntc_documento = :regimen");
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);
oci_bind_by_name($consulta,':seccional',$seccional);
oci_bind_by_name($consulta,':regimen',$regimen);
oci_execute($consulta);	

$row = array();
echo 'NIT PRESTADOR'.'|'.
		'DIGITO DE VERIFICACIÓN'.'|'.
		'CODIGO DE HABILITACION'.'|'.
		'RAZON SOCIAL'.'|'.
		'PUBLICO'.'|'.
		'CODIGO MUNICIPIO PRESTADOR'.'|'.
		'DEPARTAMENTO PRESTADOR'.'|'.
		'MUNICIPIO PRESTADOR'.'|'.
		'RELACION'.'|'.
		'CODIGO DEPARTAMENTO COBERTURA'.'|'.
		'DEPARTAMENTO COBERTURA'.'|'.
		'MUNICIPIO COBERTURA'.'|'.
		'NUMERO CONTRATO'.'|'.
		'FECHA INICIAL'.'|'.
		'FECHA FINAL'.'|'.
		'TIPO CONTRATO'.'|'.
		'CANT AFILIADOS'.'|'.
		'VALOR'.'|'.
		'CODIGO SERVICIO'.'|'.
		'NOMBRE SERVICIO'.'|'.
		'MODALIDAD'.'|'.
		'NIVEL'.'|'.
		'SECCIONAL CONTRATO'.'|'.
		'UBICACIÓN CONTRATO'.'|'.
		'DOCUMENTO CONTRATO';
;
echo "\n";
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo  $rows['TERV_CODIGO']. '|' .
			 $rows['TERN_CHEQUEO']. '|' .
			 $rows['CODIGO_HABILITACION']. '|'.
			 $rows['TERC_NOMBRE']. '|' .
			 $rows['PUBLICO']. '|' .
			 $rows['MUN_PSS']. '|' .
			 $rows['NOMBRE_DPTO_PSS']. '|' .
			 $rows['NOMBRE_MUN_PSS']. '|' .
			 $rows['RELACION']. '|' .
			 $rows['DPTO_COBERTURA']. '|' .
			 $rows['DPTO2']. '|' .
			 $rows['MUNICIPO_COBERTURA']. '|' .
			 $rows['NUMERO_CONTRATO']. '|' .
			 $rows['F_INICIAL']. '|' .
			 $rows['F_FINAL']. '|' .
			 $rows['TIPOCONTRATO']. '|' .
			 $rows['N_AFILIADOS']. '|' .
			 $rows['VALOR']. '|' .
			 $rows['COD_SERVICIO']. '|' .
			 $rows['NOMBRE_SERVICIO']. '|' .
			 $rows['MODALIDAD']. '|' .
			 $rows['NIVEL']. '|' .
			 $rows['SECCIONAL_CONTRATO']. '|' .
			 $rows['CNTN_UBICACION']. '|' .
			 $rows['CNTC_DOCUMENTO'] . "\n";
 }
oci_close($c);

?>