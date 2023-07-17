<?php
	require_once('../config/dbcon_prod.php');

  $documento = $_GET['documento'];
  $area = $_GET['area'];
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_OBTENER_ESTATUS_LISTAS(:v_pdocumento,:v_parea,:v_json_row); end;');

  oci_bind_by_name($consulta,':v_pdocumento',$documento);
  oci_bind_by_name($consulta,':v_parea',$area);

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
