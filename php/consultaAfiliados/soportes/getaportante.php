<?php
	require_once('../../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_certificado_aportes(:v_tipo_doc_cotizante,:v_doc_cotizante,:v_aportante,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_tipo_doc_cotizante',$type);
	oci_bind_by_name($consulta,':v_doc_cotizante',$num);
	oci_bind_by_name($consulta,':v_aportante',$_GET['aport']);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>