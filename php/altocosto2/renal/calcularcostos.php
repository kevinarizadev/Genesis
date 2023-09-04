<?php
	require_once('../../config/dbcon_prod.php');

	$tipo_documento = $_GET['tipo_documento'];
	$documento = $_GET['documento'];
	$resolucion = $_GET['resolucion'];
	$consulta = oci_parse($c,'begin PQ_GENESIS_CAC.P_OBTENER_COSTOS_AUDITORIAS(:v_tipodocumento,:v_documento,:v_presolucion,:v_json_row); end;');

	oci_bind_by_name($consulta,':v_tipodocumento',$tipo_documento);
	oci_bind_by_name($consulta,':v_documento',$documento);
	oci_bind_by_name($consulta,':v_presolucion',$resolucion);

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
