<?php
	require_once('../config/dbcon_prod.php');
	$user = $_GET['user'];
	$pass = $_GET['pass'];
	$consulta = oci_parse($c,'begin pq_genesis.p_login_afiliado(:v_usuario,:v_password,:v_res); end;');
	oci_bind_by_name($consulta,':v_usuario',$user);
	oci_bind_by_name($consulta,':v_password',$pass);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
		$noj = json_decode($json);
		$_SESSION['nombre'] = $noj->{'NOMBRE'};
		$_SESSION['tipo'] = $noj->{'TIPO'};
		$_SESSION['cedula'] = $user;
		$_SESSION['rol'] = 'AFILIADO';
	   	$_SESSION['rolcod'] = -1;
	   	$_SESSION['usu'] = 'usuweb';
	   	$_SESSION['acc'] = 'Cajacopi123';
	}else{
		echo 0;
	}
	oci_close($c);
?>