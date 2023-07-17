<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//Aprueba el jefe para la visalizacion a el area de administrativa
function listar_jef(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_APROBAR_ACAS_AL(:v_pjefe,:v_json_row); end;');
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
//Lista para obtener  las solicitudes solo los jefes
function jefe_solicitud(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_OBTENER_SOLICITUD_JEFALI(:v_pjefe,:v_json_row); end;');
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
//aprobarJefe
function aprobar(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_APROBAR_ACAS_AL(:v_pdocumento,
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
//rechazarJefe
function rechazar(){
	require_once('../../config/dbcon_prod.php');
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
//obtener MAL
function obtener_MAL(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.p_obtener_MAL(:v_json_row); end;');
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
//P_ACTUALIZAR_TICKET_AL
function ACTUALIZAR_TICKET_AL(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TRANS.P_ACTUALIZAR_TICKET_AL(:v_pvalor,
	:v_pubicacion,
	:v_pnumeroma,
	:v_json_row); end;');

	oci_bind_by_name($consulta,':v_pvalor',$request->valor);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
	oci_bind_by_name($consulta,':v_pnumeroma',$request->numeroma);

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
//obtener_tabs
function tabs(){
	require_once('../../config/dbcon_prod.php');
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
//fann_get_ca
?>
