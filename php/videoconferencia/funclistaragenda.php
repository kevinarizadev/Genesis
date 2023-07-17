<?php
	header("Content-Type: text/html;charset=utf-8");

	require_once('../config/dbcon_prod.php');
	global $request;
	$motivo =$_GET['motivo'];//'2';//
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_VC.P_OBTENER_AGENDA(:v_pmotivo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>
