<?php
	header("Content-Type: text/html;charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: text/xml');
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$user = $request->user;
	$pass = $request->pass;
	$consulta = oci_parse($c,'begin pq_genesis.p_login_funcionario(:v_usuario,:v_password,:v_res); end;');
	oci_bind_by_name($consulta,':v_usuario',$user);
	oci_bind_by_name($consulta,':v_password',$pass);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	$noj = json_decode($json);
	if ($noj->{'error'} == "0") {
		$_SESSION['nombre'] = $noj->{'nombre'};
		$_SESSION['tipo'] = $noj->{'tipo'};
		$_SESSION['cedula'] = $noj->{'cedula'};
		$_SESSION['rol'] = 'Funcionario';
	   	$_SESSION['rolcod'] = $noj->{'rolcod'};
	   	$_SESSION['codmunicipio'] =  $noj->{'codmunicipio'};
	   	$_SESSION['usu'] = $user;
	   	$_SESSION['acc'] = $pass;
	   	$_SESSION['isdirect'] = $noj->{'tipocontrato'};
	   	$_SESSION['imagen'] = $noj->{'imagen'};
	   	echo $noj->{'error'};
	}else{
		echo $noj->{'error'};
	}
	oci_close($c);
?>