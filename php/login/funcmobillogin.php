<?php
	header("Content-Type: text/html;charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: text/xml');
	require_once('../config/dbcon_login.php');
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$user = $request->user;
	$pass = $request->pass;
	$nit =  $request->nit;
	$consulta = oci_parse($c,'begin pq_genesis_login.P_AUTORIZACION_FUNCIONARIOS(:v_pnit,:v_pusuario,:v_pclave,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pnit',$nit);
	oci_bind_by_name($consulta,':v_pusuario',$user);
	oci_bind_by_name($consulta,':v_pclave',$pass);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	$noj = json_decode($json);
	if ($noj->{'Codigo'} == "0") {
	   	echo $json;
	}else{
		echo $noj->{'Codigo'};
	}
	oci_close($c);
?>