<?php
	require_once('../../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_encuesta(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	}else{
		echo 0;
	}
	oci_close($c);
?>