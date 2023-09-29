<?php
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_demandas.p_lista_demandas(:v_respuesta); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>