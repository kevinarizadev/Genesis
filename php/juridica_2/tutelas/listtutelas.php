<?php
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_tut.p_busqueda_tutela(:v_municipio,:v_rol,:v_json); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':v_rol',$_SESSION['rolcod']);
	oci_bind_by_name($consulta,':v_municipio',$_SESSION['codmunicipio']);
	oci_bind_by_name($consulta,':v_json', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>