<?php
	require_once('../../config/dbcon.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$campo = $_GET['campo'];
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_actualiza_telfijo(:v_ptipo_documento,
																						   :v_pdocumento,
																						   :v_campo); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	oci_bind_by_name($consulta,':v_campo',$campo);
	$res = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $res;
	oci_close($c);
?>