<?php
	require_once('../config/dbcon_prod.php');
	$estado = $_GET['estado'];
	$documento = $_GET['documento'];
	$consulta = oci_parse($c,'UPDATE esdc_soporte_doc SET sdcc_estado=:estado WHERE sdcc_afiliado=:documento');
	oci_bind_by_name($consulta,':estado',$estado);
	oci_bind_by_name($consulta,':documento',$documento);
	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	oci_close($c);
?>