<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function actualizarinformacion(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$responsable = $request->responsable;
	$gabinete = $request->gabinete;
	$patchcore = $request->patchcore;
	$regulador = $request->regulador;
	$polotierra = $request->polotierra;
	$ups = $request->ups;
	$switch = $request->switch;
	$lectora = $request->lectora;
	$cantidadlectora = $request->cantidadlectora;
	$configuracion = $request->configuracion;
	$pc = $request->pc;
	$cantidadpc = $request->cantidadpc;
	$impresora = $request->impresora;
	$cantidadimpresora = $request->cantidadimpresora;
	$crono = $request->crono;
	$comentario=$request->comentario;
	$estado=$request->estado;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ADMINTIC.P_ACTUALIZAR_ADMIN_TIC(:v_padmin_codigo,
																				:v_padmin_responsable,
																				:v_padmin_gabinete,
																				:v_padmin_pathcore,
																				:v_padmin_regulador,
																				:v_padmin_polotierra,
																				:v_padmin_ups,
																				:v_padmin_switch,
																				:v_padmin_lector,
																				:v_padmin_cantidad_lectora,
																				:v_padmin_configuracion,
																				:v_padmin_pc,
																				:v_padmin_cantidad_pc,
																				:v_padmin_impresora,
																				:v_padmin_cantidad_impresora,
																				:v_padmin_crono,
																				:v_padmin_comentario,
																				:v_padmin_estado,
																				:v_json_row); end;');
	oci_bind_by_name($consulta,':v_padmin_codigo',$codigo);
	oci_bind_by_name($consulta,':v_padmin_responsable',$responsable);
	oci_bind_by_name($consulta,':v_padmin_gabinete',$gabinete);
	oci_bind_by_name($consulta,':v_padmin_pathcore',$patchcore);
	oci_bind_by_name($consulta,':v_padmin_regulador',$regulador);
	oci_bind_by_name($consulta,':v_padmin_polotierra',$polotierra);
	oci_bind_by_name($consulta,':v_padmin_ups',$ups);
	oci_bind_by_name($consulta,':v_padmin_switch',$switch);
	oci_bind_by_name($consulta,':v_padmin_lector',$lectora);
	oci_bind_by_name($consulta,':v_padmin_cantidad_lectora',$cantidadlectora);
	oci_bind_by_name($consulta,':v_padmin_configuracion',$configuracion);
	oci_bind_by_name($consulta,':v_padmin_pc',$pc);
	oci_bind_by_name($consulta,':v_padmin_cantidad_pc',$cantidadpc);
	oci_bind_by_name($consulta,':v_padmin_impresora',$impresora);
	oci_bind_by_name($consulta,':v_padmin_cantidad_impresora',$cantidadimpresora);
	oci_bind_by_name($consulta,':v_padmin_crono',$crono);
	oci_bind_by_name($consulta,':v_padmin_comentario',$comentario);
	oci_bind_by_name($consulta,':v_padmin_estado',$estado);
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

function obtenerpadrinos(){
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_OBTENER_PADRINO_TIC(:v_json_row); end;');
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

function actualizarpadrinos(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$padrinos=$request->padrinos;
	$cantidad=$request->cantidad;
	$responsable=$request->responsable;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_UI_PADRINO_TIC(:v_ppadrinos,
																		 :v_pcantidad,
																		 :v_presponsable,
																		 :v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_ppadrinos',$padrinos);
	oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
	oci_bind_by_name($consulta,':v_presponsable',$responsable);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);

	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function infoune(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$cod_mun=$request->cod_mun;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_OBTENER_INFORMACION_UNE(:v_pcodigo_mun,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pcodigo_mun',$cod_mun);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function consultaXdia(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_CANTIDAD_FECHA_UNIFICACION(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
function consultaXUsurio(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_CANTIDAD_USUARIO_UNIFICACION(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
function consultarTotalXDia(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_CANTIDAD_DIA_TOTAL_UNIFICACION(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function consultaafiltotal(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_CANTIDAD_AFILIACION_TOTAL(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function consultaregtotal(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_CANTIDAD_REGISTRO_TOTAL(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
function consultaconcepto(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$fechainicial=$request->fechainicial;
	$fechafinal=$request->fechafinal;
	$consulta = oci_parse($c,'begin PQ_GENESIS_ADMINTIC.P_ESTADO_ACAS(:v_pinicial,:v_pfinal,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_pinicial',$fechainicial);
	oci_bind_by_name($consulta,':v_pfinal',$fechafinal);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}



?>
