<?php
	require_once('../config/dbcon_empresa.php');
	$consulta = oci_parse($c,'begin pq_genesis_mov.p_solicitudes_pendientes(:v_usuario,:v_estado,:v_res); end;');
	oci_bind_by_name($consulta,':v_usuario',$_SESSION["cedula"]);
	oci_bind_by_name($consulta,':v_estado',$_GET["estado"]);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>