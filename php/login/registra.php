<?php
	require_once('../config/dbcon_login.php');
	$type = $_GET['type'];
	$id = $_GET['id'];
	$acepta = $_GET['acepta'];
	$email = $_GET['email'];
	$expedicion = $_GET['expedicion'];
	$consulta = oci_parse($c,'begin pq_genesis.p_registra_afiliado(:v_ptipo_documento,:v_pdocumento,:v_acepta,:v_email,:v_fechaexpedicion,:v_res); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$id);
	oci_bind_by_name($consulta,':v_acepta',$acepta);
	oci_bind_by_name($consulta,':v_email',$email);
	oci_bind_by_name($consulta,':v_fechaexpedicion',$expedicion);
	oci_bind_by_name($consulta, ':v_res', $res,1);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $res;
	oci_close($c);
?>