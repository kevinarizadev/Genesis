<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function mostrarfechadeCorte()
{
	// este sp se recibe json
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_GESTION_RIESGO_ERC.p_obtener_fecha_corte(:v_pfcorte);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pfcorte', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function actualizafechadeCorte()
{
	// este sp se recibe json
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_actualiza_fecha_corte(:v_pfecha,:v_pjson_out);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pfecha', $request->vpfecha);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
}
function consultareporteErc()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_mostar_cargue_afil(:v_ptipo_doc,:v_pdocumento,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->vptipoDoc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpDocumento);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_json_row', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function historicosdePrestadores()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_prestador_X_afiliado(:v_pjson_out,:v_Pdata);end;');
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function reporte_de_atencion()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_prestador_X_afiliado_detalle(:v_ptipo_doc,:v_pdocmento,:v_pjson_out,:v_Pdata);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->vptipodoc);
	oci_bind_by_name($consulta, ':v_pdocmento', $request->vpdocmento);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
//INICIO PUNTO 10
function histopacientesinasistentes3Meses()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_listar_pacientes3meses(:v_pjson_out,:v_Pdata);end;');
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		// echo '['.$json1.',{"cantidad":'.$cantidad.'}]';
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function histopacientesFallecidos()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_listar_pacientes_fallecidos(:v_pjson_out,:v_Pdata);end;');
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function histopacientesMismodocumento()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_listar_pacientes_mismo_documento(:v_pjson_out,:v_Pdata);end;');
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function listarpacientesdelaMalla()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_auditoria_soporte(:v_pdata);end;');
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function listarfiltrosdePatologia()
{
	// este sp se recibe json
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_listar_opciones(:v_pcaso,:v_pfinicio,:v_pfin,:v_pvalor_busqueda,:v_pchk18,:v_pchk20,:v_pchk38,:v_pjson_out,:v_pdata);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcaso', $request->vpcaso);
	oci_bind_by_name($consulta, ':v_pfinicio', $request->vpfinicio);
	oci_bind_by_name($consulta, ':v_pfin', $request->vpfin);
	oci_bind_by_name($consulta, ':v_pvalor_busqueda', $request->vpvalorbusqueda);
	oci_bind_by_name($consulta, ':v_pchk18', $request->vpchk18);
	oci_bind_by_name($consulta, ':v_pchk20', $request->vpchk20);
	oci_bind_by_name($consulta, ':v_pchk38', $request->vpchk38);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function obtenerlistaPrestador()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_listar_prestador(:v_pdata);end;');
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}