<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


//////////////////////// 	INICIO php de jeffer (//////////////////////////////)///////////////////////////////////////////////

function buscarcenso()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_censo_documento(:v_tipo_documento,:v_documento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $request->tipodocumento);
	oci_bind_by_name($consulta, ':v_documento', $request->documento);

	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}




function buscarcodigocenso()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_censo_numero(:v_numero, :v_response); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->numero);
	//		oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);


	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}
function buscarcodigocensoubi()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_censo_numero_dato(:v_numero,:v_ubicacion, :v_response); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->numero);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->ubicacion);


	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}



function actualizarfechas()
{
	require_once('../config/dbcon_prod.php');


	global $request;

	$numerof = $request->numerof;
	$ubicacionf = $request->ubicacionf;
	$fechaif = $request->fechaif;
	$fechaef = $request->fechaef;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_actualizar_fecha(:v_pnumero,
																						 :v_pubicacion,
																						 :v_pfecha_i,
																						 :v_pfecha_f,
																						 :v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $numerof);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacionf);
	oci_bind_by_name($consulta, ':v_pfecha_i', $fechaif);
	oci_bind_by_name($consulta, ':v_pfecha_f', $fechaef);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function actualizarprestador()
{
	require_once('../config/dbcon_prod.php');


	global $request;


	$consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_actualizar_prestador(:v_pnumero,
                                   :v_pubicacion,
                                   :v_pprestador,
                                   :v_pprestador_ant,
                                   :v_presposable,
                                   :v_json_row); end;');

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pprestador', $request->prestador);
	oci_bind_by_name($consulta, ':v_pprestador_ant', $request->prestador_ant);
	oci_bind_by_name($consulta, ':v_presposable', $request->resposable);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function buscaravanzada()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_censo_avanzado(:v_ubicacion,
																							   :v_nit,
																							   :v_responsable,
																							   :v_response); end;');
	oci_bind_by_name($consulta, ':v_ubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_nit', $request->nit);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);



	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}



function descargarcenso()
{

	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_descargar_censo(:v_fecha_inicio, :v_fecha_final , :v_response); end;');
	oci_bind_by_name($consulta, ':v_fecha_inicio', $request->fechainicio);
	oci_bind_by_name($consulta, ':v_fecha_final', $request->fechafinal);
	//
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}


function obtener_glosas()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_HIST_GLOSA(:v_pnumero,:v_pubicacion, :v_response); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	//
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function print_formato()
{
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_print_formato(:v_preglon,
		:v_pnocenso,
		:v_pubicacion,
		:v_response); end;');



	oci_bind_by_name($consulta, ':v_preglon', $request->v_preglon);
	oci_bind_by_name($consulta, ':v_pnocenso', $request->v_pnocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);

	//
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

// detallecenso
function detallecenso()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_detail_censo(:v_pnocenso , :v_pubicacion,:v_response); end;');
	oci_bind_by_name($consulta, ':v_pnocenso', $request->censo);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

//////////////////////// 	FIN php de jeffer (//////////////////////////////)////////////////////////////////////


function obtenerListaCenso()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_lista_censo(:v_pubicacion,:v_pdocumento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerPreguntasPsi()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_PREGUNTA_PSIQUIATRICA(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function inserta_encuesta_psi()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin  pq_genesis_ch.p_ui_psi(:v_numero,:v_ubicacion, :v_responsable, :v_pjson_row_in, :v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->numero);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);

	$row_json = json_encode($request->encuesta);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $row_json);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerTipoEstancia()
{
	require_once('../config/dbcon_prod.php');
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_ESTANCIA(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenercamposautorizacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_INFO_AUTORIZACION(:v_pautorizacion,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function listaIpsUbi()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$ubi = "1";
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CH.P_OBTENER_IPS(:v_pubicacion,:v_pcoincidencia,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubi);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenercampospordocumento()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_info_paciente(:v_ptipo_documento,
																	:v_pnumero_documento,
																	:v_response); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo);
	oci_bind_by_name($consulta, ':v_pnumero_documento', $request->documeno);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenercampospordocumentotemp()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_INFO_PACIENTE_TEMP(:v_ptipo_documento,:v_pnumero_documento,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo);
	oci_bind_by_name($consulta, ':v_pnumero_documento', $request->documeno);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obteneraut()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_AUT(:v_ptipodocumento,:v_pdocumento,:v_pfechaingreso,:v_pfechaegreso,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_pfechaingreso', $request->fechaingreso);
	oci_bind_by_name($consulta, ':v_pfechaegreso', $request->fechaegreso);

	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerautdeta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_AUT_DETA(:v_pnumeroaut,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumeroaut', $request->autorizacion);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function listaIps()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$ubi = "1";
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_IPS(:v_pubicacion,:v_pcoincidencia,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pubicacion', $ubi);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function listaMunicipio()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_municipio(:v_pcoincidencia, :v_response); end;');


	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);


	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);

	oci_close($c);
}

function obtenersolicitudesafiliacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_listar_estado_nacimiento(:v_pubicacion,
																								  :v_pdocumento,
																								  :v_response); end;');


	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);


	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);


	oci_close($c);
}

function obtenerHospitalizacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_HOSPITALIZACION(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerEventosadv()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVENTOSADV(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerMotivoglosa()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_MOTIVO_GLOSA(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerEventosadvdeta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$detalle = $request->detalle;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVENTOSADV_DETA(:v_pcodigo_adv,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pcodigo_adv', $detalle);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function listaDiagnosticos()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$nacido = 'N';

	// $cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin

  		pq_genesis_tut.p_obtener_diagnostico(:v_pcoincidencia, :v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
	// oci_bind_by_name($consulta,':v_psexo',$request->sexo);
	// oci_bind_by_name($consulta,':v_pedad',$request->edad);
	// oci_bind_by_name($consulta,':v_pnacido',$nacido);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerMotivoEgreso()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_MOTIVO_EGRESO(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerEvolucionPaciente()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_LISTA_EVOLUCION(:v_pubicacion,:v_pnumerocenso,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pnumerocenso', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function actualizahabilitacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin p_n_actua_habilitacion(:v_pempresa,:v_ptercero,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pempresa', $request->empresa);
	oci_bind_by_name($consulta, ':v_ptercero', $request->tercero);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerFichaPaciente()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_FICHA_PACIENTE(:v_pubicacion,:v_pnumerocenso,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pnumerocenso', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerEvolucionDetalleHospitalizacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVOLUCION_DETALLE(:v_pubicacion,:v_pnumerocenso,:v_prenglon,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pnumerocenso', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}
function CrearCenso()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin
  -- Call the procedure
  pq_genesis_censo_hospitalario.p_insertar_censo(:v_pubicacion,
                                                       :v_poficina,
                                                       :v_ptipodocumento,
                                                       :v_pnumerodocumento,
                                                       :v_pregimen,
                                                       :v_pdiagnostico,
                                                       :v_pdiagnostico1,
                                                       :v_pdiagnostico2,
                                                       :v_pprotocolo,
                                                       :v_pubicacionafi,
                                                       :v_pips,
                                                       :v_pconcepto,
                                                       :v_presponsable,
                                                       :v_pfechaingreso,
                                                       :v_phijo,
                                                       :v_phijonacvivo,
                                                       :v_phijonumero,
                                                       :v_prespuesta);
end;
');

	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_poficina', $request->oficina);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_doc);
	oci_bind_by_name($consulta, ':v_pnumerodocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_pregimen', $request->regimen);

	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->diagnostico);
	oci_bind_by_name($consulta, ':v_pdiagnostico1', $request->diagnosticoA);
	oci_bind_by_name($consulta, ':v_pdiagnostico2', $request->diagnosticoAd);
	oci_bind_by_name($consulta, ':v_pprotocolo', $request->protocolo);
	oci_bind_by_name($consulta, ':v_pubicacionafi', $request->municipio);
	oci_bind_by_name($consulta, ':v_pips', $request->ips);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->testancia);
	oci_bind_by_name($consulta, ':v_presponsable', $request->cedula);
	oci_bind_by_name($consulta, ':v_pfechaingreso', $request->fecha_ingreso);
	oci_bind_by_name($consulta, ':v_phijo', $request->eshijode);
	oci_bind_by_name($consulta, ':v_phijonacvivo', $request->esnacido);
	oci_bind_by_name($consulta, ':v_phijonumero', $request->cantidadhijo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function CargarSoportes()
{
	require_once('../config/dbcon.php');
	// require_once('../config/ftpcon.php');
	// require_once('../upload_file/subir_archivo.php');
	global $request;
	$archivos = json_decode($request->archivos);
	$tipodocumento = $request->tipodocumento;
	$documento = $request->numero;
	$hoy = date('dmY');
	// $path = '/cargue_ftp/Digitalizacion/Genesis/Censo/';
	$path = 'Censo/'.$hoy;
	// $estado = 0;
  $day = date("dmY_His");

	$name = $tipodocumento . '_' . $documento. '_' . $day . '.' . $archivos[0]->extension;
  include('../sftp_cloud/UploadFile.php');

  list(, $archivos[0]->base64) = explode(';', $archivos[0]->base64); // Proceso para traer el Base64
  list(, $archivos[0]->base64) = explode(',', $archivos[0]->base64); // Proceso para traer el Base64
  $base64 = base64_decode($archivos[0]->base64); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp

  $subio = UploadFile($path, $name);

	// $subio = subirDigitalizacionFTP($archivos[0]->base64, $path, $name, $archivos[0]->extension);
	echo $subio;
}

function notificacion_nacimiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin
					pq_genesis_censo_hospitalario.p_insertar_afiliado(:v_ptipodocumento,
											:v_pnumerodocumento,
											:v_pprimernombre,
											:v_psegundonombre,
											:v_pprimerapellido,
											:v_psegundoapellido,
											:v_pgenero,
											:v_pfechanacimiento,
											:v_presponsable,
											:v_regimen,
											:v_ptipodocumento_cabeza,
											:v_pnumerodocumento_cabeza,
											:v_ruta,
											:v_prespuesta)

										; end;');

	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipodocumento);
	oci_bind_by_name($consulta, ':v_pnumerodocumento', $request->numero);
	oci_bind_by_name($consulta, ':v_pprimernombre', $request->primer_nombre);
	oci_bind_by_name($consulta, ':v_psegundonombre', $request->segundo_nombre);
	oci_bind_by_name($consulta, ':v_pprimerapellido', $request->primer_apellido);
	oci_bind_by_name($consulta, ':v_psegundoapellido', $request->segundo_apellido);
	oci_bind_by_name($consulta, ':v_pgenero', $request->sexo);
	oci_bind_by_name($consulta, ':v_pfechanacimiento', $request->nacimiento);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_regimen', $request->regimen);
	oci_bind_by_name($consulta, ':v_ptipodocumento_cabeza', $request->tipodocumento_cabeza);
	oci_bind_by_name($consulta, ':v_pnumerodocumento_cabeza', $request->documento_cabeza);
	oci_bind_by_name($consulta, ':v_ruta', $request->ruta);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function regafiliado()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_INSERTAR_AFILIADO(:v_ptipodocumento,
																		  :v_pnumerodocumento ,
																		  :v_pprimernombre,
																		  :v_psegundonombre ,
																		  :v_pprimerapellido,
																		  :v_psegundoapellido ,
																		  :v_pgenero,
																		  :v_pubicacion,
																		  :v_pfechanacimiento,
																		  :v_ptelefono,
																		  :v_pcelular,
																		  :v_pcorreo ,
																		  :v_pdireccion,
																		  :v_presponsable,
																		  :v_pproceso,
																		  :v_ubicacionter,
																		  :v_pruta,
																		  :v_prespuesta); end;');

	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento);
	oci_bind_by_name($consulta, ':v_pnumerodocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_pprimernombre', $request->primer_nombre);
	oci_bind_by_name($consulta, ':v_psegundonombre', $request->segundo_nombre);
	oci_bind_by_name($consulta, ':v_pprimerapellido', $request->primero_apellido);
	oci_bind_by_name($consulta, ':v_psegundoapellido', $request->segundo_apellido);
	oci_bind_by_name($consulta, ':v_pgenero', $request->genero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->municipio);
	oci_bind_by_name($consulta, ':v_pfechanacimiento', $request->fecha_nacimiento);
	oci_bind_by_name($consulta, ':v_ptelefono', $request->telefono);
	oci_bind_by_name($consulta, ':v_pcelular', $request->celular);
	oci_bind_by_name($consulta, ':v_pcorreo', $request->correo);
	oci_bind_by_name($consulta, ':v_pdireccion', $request->direccion);
	oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
	oci_bind_by_name($consulta, ':v_ubicacionter', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function insertarChat()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_INSERTAR_CHAT(:v_pproceso,
																	  :v_pnumero,
																	  :v_pubicacion,
																	  :v_presponsable,
																	  :v_pmensaje,
																	  :v_response); end;');
	oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pmensaje', $request->respuesta);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerChat()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_COMENTARIOS(:v_pproceso,:v_pnumero,:v_pubicacion, :v_response); end;');
	oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function listaIpsNC()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);

	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_ips_noc(:v_pcoincidencia,:v_response); end;');

	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function obtenerChatNuevo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_CHAT_EXISTE(:v_pproceso,:v_pnumero,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_actualiza_prestador()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta = oci_parse($c, 'begin
				-- Call the procedure
				pq_genesis_censo_hospitalario.p_actualizar_prestador(:v_pnumero,
				                                                           :v_pubicacion,
				                                                           :v_pdata,
				                                                           :v_json_row);
				end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pdata', $request->v_pdata);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function obtenerChatdisponibles()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_CHAT_ABIERTO(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}


function insertarEvolucion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$remision = 'N';

	$consulta = oci_parse($c, 'begin
  -- Call the procedure
  pq_genesis_censo_hospitalario.p_insertar_evolucion(:v_pnumero,
                                                           :v_pubicacion,
                                                           :v_pclasificacion,
                                                           :v_pdiagnostico,
                                                           :v_pvalor,
                                                           :v_pobservacion,
                                                           :v_pesadverso,
                                                           :v_peventoadverso,
                                                           :v_pdetalleeventoadverso,
                                                           :v_presponsable,
                                                           :v_pglosa,
                                                           :v_pobsglosa,
                                                           :v_preversglosa,
                                                           :v_pmotivoglosa,
                                                           :v_pcierre,
                                                           :v_pfechacierre,
                                                           :v_pmotivoegreso,
                                                           :v_premision,
                                                           :v_prespuesta);
end;
');

	oci_bind_by_name($consulta, ':v_pnumero', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pclasificacion', $request->hospitalizacion);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->diagnostico);
	oci_bind_by_name($consulta, ':v_pvalor', $request->valobjecion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Descripcionevo);
	oci_bind_by_name($consulta, ':v_pesadverso', $request->valoradverso);
	oci_bind_by_name($consulta, ':v_peventoadverso', $request->eventoadv);
	oci_bind_by_name($consulta, ':v_pdetalleeventoadverso', $request->eventoadvdeta);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pglosa', $request->valorglosa);
	oci_bind_by_name($consulta, ':v_pobsglosa', $request->Descripcionobjecion);
	oci_bind_by_name($consulta, ':v_preversglosa', $request->valorrevglosa);
	oci_bind_by_name($consulta, ':v_pmotivoglosa', $request->motivoglosa);
	oci_bind_by_name($consulta, ':v_pcierre', $request->cierre);
	oci_bind_by_name($consulta, ':v_pfechacierre', $request->fechacierre);
	oci_bind_by_name($consulta, ':v_premision', $remision);
	oci_bind_by_name($consulta, ':v_pmotivoegreso', $request->motivo_egreso);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function reversarglosa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_REVERSAR_GLOSA(:v_pnumero,
																		:v_pubicacion,
																		:v_prenglon,
																		:v_pvalorglosa,
																		:v_pobsglosa,
																		:v_prespuesta); end;');

	oci_bind_by_name($consulta, ':v_pnumero', $request->numerocenso);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
	oci_bind_by_name($consulta, ':v_pvalorglosa', $request->valor);
	oci_bind_by_name($consulta, ':v_pobsglosa', $request->observacion);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_eventos_adversos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_eventos_adversos(:v_pfinicio,:c_pffinal,:v_pdata); end;');
	$cursor = oci_new_cursor($c);

	oci_bind_by_name($consulta, ':v_pfinicio', $request->fechaInicio);
	oci_bind_by_name($consulta, ':c_pffinal', $request->fechaFin);
	oci_bind_by_name($consulta, ':v_pdata', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function ConsultaCensoCerrado()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$tipo = $request->tipoDoc;
	$num = $request->numDoc;

	$consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_censo_cerrado(:v_ptipo_documento, :v_pdocumento, :v_pjson_out); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $num);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		//   $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function ActualizaFacturaCensoCerrado()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$ubi = $request->ubi;
	$censo = $request->censo;
	$fact = $request->fact;
	$valor = $request->valor;

	$consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.P_ui_factura_censo(:v_pnumero, :v_pubicacion, :v_pfactura, :v_pvalor, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $censo);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubi);
	oci_bind_by_name($consulta, ':v_pfactura', $fact);
	oci_bind_by_name($consulta, ':v_pvalor', $valor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		//   $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
