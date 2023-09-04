<?php
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$resolucion = $request->resolucion;
	$jsoncac = $request->jsoncac;
	$consulta = oci_parse($c,'begin PQ_GENESIS_CAC.P_COMPARAR_EXCEL_CAC(:v_presolucion,:v_pjsoncac,:v_json_row); end;');

  oci_bind_by_name($consulta,':v_presolucion',$resolucion);

	$jsoncacin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjsoncac', $jsoncacin, -1, OCI_B_CLOB);
	$jsoncacin->writeTemporary($jsoncac);

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
