<?php
	require_once('../config/dbcon_prod.php');
	$tipo = $_GET['tipo'];
	$numero = $_GET['numero'];
	$obse = $_GET['obse'];
	$consulta = oci_parse($c,'UPDATE r_traza_rips_20162_frecq set justificacion = :obse where trim(fcdc_tipo_doc_afiliado) = trim(:tipo) 
																							and trim(fcdc_afiliado) = trim(:numero)');
	oci_bind_by_name($consulta,':tipo',$tipo);
	oci_bind_by_name($consulta,':numero',$numero);
	oci_bind_by_name($consulta,':obse',$obse);
	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $result;
	oci_close($c);
?>