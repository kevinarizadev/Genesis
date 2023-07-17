<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_obtener_pqr_x_estado_actual() {
	require_once('../config/dbcon_prod.php');
	global $request;
	$fuente = 'G';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_X_ESTADO_ACTUAL(:v_tipo_documento,:v_pdocumento,:v_ppqrds,:v_pfuente,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento',$request->tipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta, ':v_ppqrds',$request->pqrds);
	oci_bind_by_name($consulta, ':v_pfuente',$fuente);		
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob -> read($clob -> size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_solicitar_resp() {
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_SOLICITAR_RESPUESTA_PQR(:v_tipo_documento,:v_pdocumento,:v_ppqrds,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento',$request->tipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta, ':v_ppqrds',$request->pqrds);		
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob -> read($clob -> size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obtener_Tipos_Documentos(){

	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis.p_obtener_tipo_documento(:v_tipo,:v_response); end;');
	oci_bind_by_name($consulta,':v_tipo',$request->Tipo);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}
?>