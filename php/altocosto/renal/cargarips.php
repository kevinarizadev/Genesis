<?php
	require_once('../../config/dbcon_prod.php');
	$tipo = $_GET['tipo'];
	$consulta = oci_parse($c,'begin PQ_GENESIS_CAC.P_OBTENER_IPS(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo',$tipo);
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
