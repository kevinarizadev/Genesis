<?php 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();




function listar_nov_pendiente(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_aseg.p_listar_pendiente_nov(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}


function procesarnovedades(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$concepto_nov = $request->concepto_nov;
	$fecha_nov = $request->fecha_nov;
	$consulta = oci_parse($c,'begin p_j_novedad_masiva_oficial(:vpconcepto_nov,:vpfecha_nov,:v_json_res); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':vpconcepto_nov',$concepto_nov);
	oci_bind_by_name($consulta,':vpfecha_nov',$fecha_nov);
	oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
}

?>