<?php
	require_once('../config/dbcon_prod.php');
	$documento = $_GET['documento'];
	$confirmacion = $_GET['confirmacion'];
	$consulta = oci_parse($c,'begin PQ_PRUEBAS_PROD.p_ui_afiliados_carta(:v_pnumero_documento,:v_pconfirmacion_lectura,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pnumero_documento',$documento);
	oci_bind_by_name($consulta,':v_pconfirmacion_lectura',$confirmacion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
         echo json_decode($json);
	}else{
		echo 0;
	}
	oci_close($c);
?>