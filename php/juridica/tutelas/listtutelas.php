<?php
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_tut.p_busqueda_tutela(:v_municipio,:v_rol,:v_json_row); end;');
	// $consulta = oci_parse($c,'begin pq_genesis_tut.p_busqueda_tutela_2(:v_municipio,:v_rol,:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':v_rol',$_SESSION['rolcod']);
	oci_bind_by_name($consulta,':v_municipio',$_SESSION['codmunicipio']);


  // $cursor = oci_new_cursor($c);
  // oci_bind_by_name($consulta, ":v_json_row", $cursor, -1, OCI_B_CURSOR);
  // oci_execute($consulta);
  // oci_execute($cursor, OCI_DEFAULT);
  // $datos = [];
  // oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  // oci_free_statement($consulta);
  // oci_free_statement($cursor);
  // echo json_encode($datos);


	oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>
