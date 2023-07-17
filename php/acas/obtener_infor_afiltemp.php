<?php 
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	require_once('../config/dbcon.php');
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.p_obtener_info_afiltemp(:v_acas_cod, :v_json); end;');
	oci_bind_by_name($consulta,':v_acas_cod',$request->acas_codigo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
?>