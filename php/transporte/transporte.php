<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

// mandar codigo valor
function registrar_ticket(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo_inicio = $request->codigo_inicio;
	$codigo_fin = $request->codigo_fin;
	$cedula = $request->cedula;
	$valor = $request->valor;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_insertar_ticket(:v_pcodigo_inicio,:v_pcodigo_fin,:v_presponsable,:v_pvalor,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo_inicio',$codigo_inicio);
	oci_bind_by_name($consulta,':v_pcodigo_fin',$codigo_fin);
	oci_bind_by_name($consulta,':v_presponsable',$cedula);
	oci_bind_by_name($consulta,':v_pvalor',$valor);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}






function listar_ticket(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_obtener_ticket(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function alterno(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_ACTUALIZAR_TICKET_ESTACION(:v_codigo_tiquet,
	:v_pubicacion,
	:v_pnumeroma,
	:v_pvalor,
	:v_json_row); end;');

	oci_bind_by_name($consulta,':v_codigo_tiquet',$request->codigo);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
	oci_bind_by_name($consulta,':v_pnumeroma',$request->numeroma);
	oci_bind_by_name($consulta,':v_pvalor',$request->valor);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function listar_resumen(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_PAQTICKET(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
//P_CONFIRMAR_ESTADO(v_pnumero in varchar2, v_pubicacion in varchar2,
function CONFIRMAR_ESTADO(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$numero = $request->numero;
	$ubicacion = $request->ubicacion;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_CONFIRMAR_ESTADO(:v_pnumero,
																																			:v_pubicacion,
																																			:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pnumero',$numero);
	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}


function obtener_acast(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_obtener_MAT(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtener_admint(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_obtener_solicitud_jef(:v_pjefe,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pjefe',$request->cedula);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtener_tabs(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_obtener_tabs(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pnumero',$request->cedula);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function cerrar(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_PROCESAR_ACAS(:v_pdocumento,
	:v_pnumero,
	:v_pubicacion,
	:v_json_row); end;');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
	oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function estacion(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_ESTACION(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
//P_OBTENER_ESTADO_HUELLA
function obtener_estado_huella(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_ESTADO_HUELLA(:v_pcodigo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo',$request->cedula);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function aprobar_admint(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_APROBAR_ACAS(:v_pdocumento,
	:v_pnumero,
	:v_pubicacion,
	:v_json_row); end;');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
	oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function rechazar_admint(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_PROCESAR_ACAS(:v_pdocumento,
	:v_pnumero,
	:v_pubicacion,
	:v_json_row); end;');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
	oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtenerticketshistorico(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_HITORICOTQ(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}


function consolidado_tickets(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_CANT_TICKET(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function detalle_acast(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_INFO_MAT(:v_pcodigo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo',$codigo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

//obtener_barrios
function obtener_barrios(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_BARRIOS3(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}


//P_OBTENER_DETALLE_TICKET
//detail_service
function detail_service(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$ubicacion = $request->ubicacion;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_DETALLE_TICKET(:v_pcodigo, :v_pubicacion, :v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo',$codigo);
	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtener_valor(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_VALOR(:v_pcodigo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo',$codigo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

//aprobar_tickets
function aprobar_tickets(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_ACTUALIZAR_TICKET(:v_pjson_valor,
	:v_pubicacion,
	:v_pnumeroma,
	:v_pcantidad,
	:v_json_row); end;');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_valor', $json, -1, OCI_B_CLOB);
	$json->writeTemporary($request->valor);
	// oci_bind_by_name($consulta,':v_pjson_valor',$request->valor);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
	oci_bind_by_name($consulta,':v_pnumeroma',$request->numeroma);
	oci_bind_by_name($consulta,':v_pcantidad',$request->cantidad);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
?>
