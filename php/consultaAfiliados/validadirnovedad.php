<?php
	require_once('../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_valida_enovdir(:v_ptipo_documento,:v_pdocumento,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,100);
	$res = oci_execute($consulta);
	echo $respuesta;
	oci_close($c);
?>