<?php
	require_once('../config/dbcon.php');
	$v_estado='AC';
	$consulta = oci_parse($c,	'begin pq_genesis_mov.p_lista_empleados (:v_nit,:v_estado,:v_json_res); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':v_nit',$_SESSION['nit']);
	oci_bind_by_name($consulta,':v_estado',$v_estado);
	oci_bind_by_name($consulta,':v_json_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>
