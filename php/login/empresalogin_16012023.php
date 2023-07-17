<?php
	require_once('../config/dbcon_login.php');

  	$nit = $_GET['nit'];
	$pass = $_GET['pass'];
	$consulta = oci_parse($c,'begin pq_genesis.p_login_empresas(:v_nit,:v_clave,:v_respuesta); end;');

  oci_bind_by_name($consulta,':v_nit',$nit);
	oci_bind_by_name($consulta,':v_clave',$pass);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	$noj = json_decode($json);
	$res = $noj->{'RES'};
	if ($res == "1") {
		echo "1";
		$_SESSION['nombre'] = $noj->{'NOMBRE'};
		$_SESSION['rol'] = 'EMPRESA';
		$_SESSION['nit'] = $nit;
		$_SESSION['correoempresa'] = $noj->{'correoempresa'};
		$_SESSION['tipoaportante'] =  $noj->{'tipo_aportante'};
		$_SESSION['rolcod'] = $noj->{'rolcod'};
		$_SESSION['usu'] = $noj->{'usu'};
		$_SESSION['acc'] = 'KHR]E24ZAg{OvR';
	}else{
		echo $res;
	}
	oci_close($c);
?>
