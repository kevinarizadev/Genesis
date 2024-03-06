<?php
	$postdata = file_get_contents("php://input");
	$param = json_decode($postdata);
	$function = $param->function;
	$function();
	function obtener_usuarios_contratacion(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_OBTENER_USUARIOS_CONTRATACION(:v_json_row); end;');
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
	function obtener_detalle_acas_contratacion(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$estado = $param->estado;
		$cedula = $param->cedula;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_OBTENER_DETALLE_ACAS_CONTRATACION(:v_estado,:v_cedula,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_estado',$estado);
		oci_bind_by_name($consulta,':v_cedula',$cedula);
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
	function obtener_detalle_ticket(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$keyword = $param->keyword;
		$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_OBTENER_DETALLE_TICKECT(:v_pkeyword,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pkeyword',$keyword);
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

function p_obtener_glosas_win()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pstatus = $request->v_pstatus;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_glosa.p_lista_glosa_win(:v_pstatus,
																		:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pstatus', $v_pstatus);
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

function listaDepartamentos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c,"SELECT DISTINCT SUBSTR(LPAD(b.ubgn_codigo,5,0),1,2) ubgn_codigo, b.ubgc_nombre 
								FROM bubg_ubicacion_geografica b
								INNER JOIN bubg_oficina bu ON b.ubgn_codigo = 
								CASE
									WHEN length(bu.ubgc_seccional) = 4 THEN substr(bu.ubgc_seccional,1,1) || '000'
									WHEN length(bu.ubgc_seccional) = 5 THEN substr(bu.ubgc_seccional,1,2) || '000'
								END
								ORDER BY b.ubgc_nombre");
	oci_execute($consulta);
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

///////////////////////////////CNVU/////////////////////////////
function p_lista_motivos(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pdocumento = $param->documento;//'KS';
	$v_pconcepto = $param->concepto;//'EV';
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_MOTIVOS(:v_pdocumento,
																			:v_pconcepto, 
																			:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pconcepto', $v_pconcepto);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function p_lista_asuntos(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pdocumento = $param->documento;//'KS';
	$v_pconcepto = $param->concepto;//'EV';
	$v_pmotivo = $param->v_pmotivo;
	// echo ("HOLA" . $param->v_pmotivo);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_ASUNTOS(:v_pdocumento,
																			:v_pconcepto,
																			:v_pmotivo,
																			:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pconcepto', $v_pconcepto);
	oci_bind_by_name($consulta, ':v_pmotivo', $v_pmotivo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function actualizar_asunto_motivos(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pnumero = $param->contrato;
	$v_pdocumento = $param->documento;
	$v_pubicacion = $param->ubicacion;
	$v_pmotivo = $param->v_pmotivo;
	$v_pasunto = $param->asunto;
	$v_paccion = $param->accion;
	//echo ($param->contrato . '-' . $param->documento . '-' . $param->ubicacion . '-' . $param->v_pmotivo . '-' . $param->asunto . '-' . $param->accion);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_U_ASUNTOS_MOTIVOS(:v_pnumero,
																				:v_pdocumento,
																				:v_pubicacion,
																				:v_pmotivo,
																				:v_pasunto,
																				:v_paccion,
																				:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_pmotivo', $v_pmotivo);
	oci_bind_by_name($consulta, ':v_pasunto', $v_pasunto);
	oci_bind_by_name($consulta, ':v_paccion', $v_paccion);
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

function ui_formas_pago(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pnumero = $param->contrato;
	$v_pdocumento = $param->documento;
	$v_pubicacion = $param->ubicacion;
	$v_pformas_pago = $param->forma_pago;
	$v_paccion = $param->accion;
	//echo ($param->contrato . '-' . $param->documento . '-' . $param->ubicacion . '-' . $param->v_pmotivo . '-' . $param->asunto . '-' . $param->accion);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_FORMAS_PAGO(:v_pnumero,
																			 :v_pdocumento,
																			 :v_pubicacion,
																			 :v_pformas_pago,
																			 :v_paccion,
																			 :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_pformas_pago', $v_pformas_pago);
	oci_bind_by_name($consulta, ':v_paccion', $v_paccion);
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

function P_CALCULA_VALOR_CONTRATO(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pnumero = $param->v_pnumero;
	$v_pdocumento = $param->v_pdocumento;
	$v_pubicacion = $param->v_pubicacion;
	$v_pconcepto = $param->v_pconcepto;
	$v_pcant_afiliado = $param->v_pcant_afiliado;
	$v_pval_afiliado = $param->v_pval_afiliado;
	$v_pfecha_modificacion = $param->v_pfecha_modificacion;
	$v_pfecha_final = $param->v_pfecha_final;
	$v_pval_contrato_otrosi_ev = $param->v_pval_contrato_otrosi_ev;
	//echo ($param->contrato . '-' . $param->documento . '-' . $param->ubicacion . '-' . $param->v_pmotivo . '-' . $param->asunto . '-' . $param->accion);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_CALCULA_VALOR_CONTRATO(:V_PNUMERO,
																			 		 :V_PDOCUMENTO,
																					 :V_PUBICACION,
																					 :V_PCONCEPTO,
																					 :V_PCANT_AFILIADO,
																					 :V_PVAL_AFILIADO,
																					 :V_PFECHA_MODIFICACION,
																					 :V_PFECHA_FINAL,
																					 :V_PVAL_CONTRATO_OTROSI_EV,
																					 :V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $v_pnumero);
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $v_pdocumento);
	oci_bind_by_name($consulta, ':V_PUBICACION', $v_pubicacion);
	oci_bind_by_name($consulta, ':V_PCONCEPTO', $v_pconcepto);
	oci_bind_by_name($consulta, ':V_PCANT_AFILIADO', $v_pcant_afiliado);
	oci_bind_by_name($consulta, ':V_PVAL_AFILIADO', $v_pval_afiliado);
	oci_bind_by_name($consulta, ':V_PFECHA_MODIFICACION', $v_pfecha_modificacion);
	oci_bind_by_name($consulta, ':V_PFECHA_FINAL', $v_pfecha_final);
	oci_bind_by_name($consulta, ':V_PVAL_CONTRATO_OTROSI_EV', $v_pval_contrato_otrosi_ev);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function UI_OTROSI(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pnumero = $param->v_pnumero;
	$v_pdocumento = $param->v_pdocumento;
	$v_pubicacion = $param->v_pubicacion;
	$v_pconcepto = $param->v_pconcepto;
	$v_pcant_afiliado = $param->v_pcant_afiliado;
	$v_pval_afiliado = $param->v_pval_afiliado;
	$v_pfecha_modificacion = $param->v_pfecha_modificacion;
	$v_pfecha_final = $param->v_pfecha_final;
	$v_pobservacion_otrosi = $param->v_pobservacion_otrosi;
	$v_pcontrato_valor = $param->v_pvalor_contrato;
	$accion = $param->accion;
	$v_pval_contrato_otrosi_ev = $param->v_pval_contrato_otrosi_ev;
	//echo ($param->contrato . '-' . $param->documento . '-' . $param->ubicacion . '-' . $param->v_pmotivo . '-' . $param->asunto . '-' . $param->accion);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_OTROSI(:V_PNUMERO,
																	    :V_PDOCUMENTO,
																		:V_PUBICACION,
																		:V_PCONCEPTO,
																		:V_PCANT_AFILIADO,
																		:V_PVAL_AFILIADO,
																		:V_PFECHA_MODIFICACION,
																		:V_PFECHA_FINAL,
																		:V_PCONTRATO_VALOR,
																		:V_PVAL_CONTRATO_OTROSI_EV,
																		:V_POBSERVACION_OTROSI,
																		:V_PACCION,
																		:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $v_pnumero);
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $v_pdocumento);
	oci_bind_by_name($consulta, ':V_PUBICACION', $v_pubicacion);
	oci_bind_by_name($consulta, ':V_PCONCEPTO', $v_pconcepto);
	oci_bind_by_name($consulta, ':V_PCANT_AFILIADO', $v_pcant_afiliado);
	oci_bind_by_name($consulta, ':V_PVAL_AFILIADO', $v_pval_afiliado);
	oci_bind_by_name($consulta, ':V_PFECHA_MODIFICACION', $v_pfecha_modificacion);
	oci_bind_by_name($consulta, ':V_PFECHA_FINAL', $v_pfecha_final);
	oci_bind_by_name($consulta, ':V_PCONTRATO_VALOR', $v_pcontrato_valor);
	oci_bind_by_name($consulta, ':V_PVAL_CONTRATO_OTROSI_EV', $v_pval_contrato_otrosi_ev);
	oci_bind_by_name($consulta, ':V_POBSERVACION_OTROSI', $v_pobservacion_otrosi);
	oci_bind_by_name($consulta, ':V_PACCION', $accion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function p_lista_servicios_os(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_SERVICIOS_CONTRATADOS (:V_PDOCUMENTO,
																						   :V_PNUMERO,
																						   :V_PUBICACION,
																						   :V_PACCION,
																						   :V_PPRESTADOR,
																						   :V_PJSON_OUT); end;');
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $param->documento);
	oci_bind_by_name($consulta, ':V_PNUMERO', $param->numero);
	oci_bind_by_name($consulta, ':V_PUBICACION', $param->ubicacion);
	oci_bind_by_name($consulta, ':V_PACCION', $param->accion);
	oci_bind_by_name($consulta, ':V_PPRESTADOR', $param->prestador);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

// function P_UI_SERVICIOS(){
// 	require_once('../config/dbcon_prod.php');
// 	global $param;
// 	$v_pnumero = $param->v_pnumero;
// 	$v_pdocumento = $param->v_pdocumento;
// 	$v_pubicacion = $param->v_pubicacion;
// 	$v_pconcepto = $param->v_pconcepto;
// 	$v_pcant_afiliado = $param->v_pcant_afiliado;
// 	$v_pval_afiliado = $param->v_pval_afiliado;
// 	$v_pfecha_modificacion = $param->v_pfecha_modificacion;
// 	$v_pfecha_final = $param->v_pfecha_final;
// 	$v_pobservacion_otrosi = $param->v_pobservacion_otrosi;
// 	$accion = $param->accion;
// 	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_SERVICIOS(:V_PDOCUMENTO,
// 																		   :V_PNUMERO,
// 																		   :V_PUBICACION,
// 																		   :V_PACCION,
// 																		   :V_SERVICIOS,
// 																		   :V_SERVICIOS_CANTIDAD,
// 																		   :V_PJSON_OUT); end;');
// 	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $param->v_pnumero);
// 	oci_bind_by_name($consulta, ':V_PNUMERO', $param->v_pnumero);
// 	oci_bind_by_name($consulta, ':V_PUBICACION', $v_pubicacion);
// 	oci_bind_by_name($consulta, ':V_PACCION', $v_pubicacion);
// 	oci_bind_by_name($consulta, ':V_SERVICIOS', $v_pconcepto);
// 	oci_bind_by_name($consulta, ':V_SERVICIOS_CANTIDAD', $v_pcant_afiliado);
// 	oci_bind_by_name($consulta, ':V_PVAL_AFILIADO', $v_pval_afiliado);
// 	oci_bind_by_name($consulta, ':V_PFECHA_MODIFICACION', $v_pfecha_modificacion);
// 	oci_bind_by_name($consulta, ':V_PFECHA_FINAL', $v_pfecha_final);
// 	oci_bind_by_name($consulta, ':V_PCONTRATO_VALOR', $v_pcontrato_valor);
// 	oci_bind_by_name($consulta, ':V_POBSERVACION_OTROSI', $v_pobservacion_otrosi);
// 	oci_bind_by_name($consulta, ':V_PACCION', $accion);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob,-1,OCI_B_CLOB);
// 	oci_execute($consulta,OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	}else{
// 		echo 0;
// 	}
// 	oci_close($c);
// }

// function P_UI_SERVICIOS(){
// 	require_once('../config/dbcon.php');
// 	global $request;
// 	// echo($request);
// 	$dataRegistroMedida = json_encode($request->servicios);
// 	// echo ($_SESSION['cedula']);
// 	// echo($dataRegistroMedida);
// 	var_dump($dataRegistroMedida);
// 	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_SERVICIOS(:V_PDOCUMENTO,
// 																		   :V_PNUMERO,
// 																		   :V_PUBICACION,
// 																		   :V_PACCION,
// 																		   :V_SERVICIOS,
// 																		   :V_SERVICIOS_CANTIDAD,
// 																		   :V_PJSON_OUT); end;');

// 	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $request->documento);
// 	oci_bind_by_name($consulta, ':V_PNUMERO', $request->numero);
// 	oci_bind_by_name($consulta, ':V_PUBICACION', $request->ubicacion);
// 	oci_bind_by_name($consulta, ':V_PACCION', $request->accion);
// 	$jsonservicios = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':V_SERVICIOS', $jsonservicios, -1, OCI_B_CLOB);
// 	$jsonservicios->writeTemporary($request->servicios);
// 	oci_bind_by_name($consulta, ':V_SERVICIOS_CANTIDAD', $request->cantidad_servicios);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta,':V_PJSON_OUT',$clob,-1,OCI_B_CLOB);
// 	oci_execute($consulta,OCI_DEFAULT);
// 	$respuesta = $clob->read($clob->size());
// 	echo $respuesta;
// 	oci_close($c);
// }

function P_UI_SERVICIOS(){
	require('../config/dbcon_prod.php');
	global $param;
	// $test = $param->servicios;
	// echo($test);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_SERVICIOS(:V_PDOCUMENTO,
																		   :V_PNUMERO,
																		   :V_PUBICACION,
																		   :V_PACCION,
																		   :V_SERVICIOS,
																		   :V_SERVICIOS_CANTIDAD,
																		   :V_PJSON_OUT); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $param->documento);
	oci_bind_by_name($consulta, ':V_PNUMERO', $param->numero);
	oci_bind_by_name($consulta, ':V_PUBICACION', $param->ubicacion);
	oci_bind_by_name($consulta, ':V_PACCION', $param->accion);
	oci_bind_by_name($consulta, ':V_SERVICIOS', $param->servicios);
	oci_bind_by_name($consulta, ':V_SERVICIOS_CANTIDAD', $param->cantidad_servicios);
	oci_bind_by_name($consulta,':V_PJSON_OUT',$clob,-1,OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo '[{"Codigo":1,"Nombre":"Error en la peticion"}]';
	}
	oci_close($c);
}

function listarlosmotivos(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.p_lista_motivos(:v_json_row); end;');
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

function UI_OTROSI_MOTIVO(){
	require_once('../config/dbcon_prod.php');
	global $param;
	$v_pnumero = $param->v_pnumero;
	$v_pdocumento = $param->v_pdocumento;
	$v_pubicacion = $param->v_pubicacion;
	$v_pconcepto = $param->v_pconcepto;
	$v_pcant_afiliado = $param->v_pcant_afiliado;
	$v_pval_afiliado = $param->v_pval_afiliado;
	$v_pfecha_modificacion = $param->v_pfecha_modificacion;
	$v_pfecha_final = $param->v_pfecha_final;
	$v_pobservacion_otrosi = $param->v_pobservacion_otrosi;
	$v_pcontrato_valor = $param->v_pvalor_contrato;
	$accion = $param->accion;
	$v_pval_contrato_otrosi_ev = $param->v_pval_contrato_otrosi_ev;
	$motivoseleccionado = $param->motivoseleccionado;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_UI_OTROSI_GENERALES(:V_PNUMERO,
																	    :V_PDOCUMENTO,
																		:V_PUBICACION,
																		:V_PCONCEPTO,
																		:V_PMOTIVO,
																		:V_PCANT_AFILIADO,
																		:V_PVAL_AFILIADO,
																		:V_PFECHA_MODIFICACION,
																		:V_PFECHA_FINAL,
																		:V_PCONTRATO_VALOR,
																		:V_PVAL_CONTRATO_OTROSI_EV,
																		:V_POBSERVACION_OTROSI,
																		:V_PACCION,
																		:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $v_pnumero);
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $v_pdocumento);
	oci_bind_by_name($consulta, ':V_PUBICACION', $v_pubicacion);
	oci_bind_by_name($consulta, ':V_PCONCEPTO', $v_pconcepto);
	oci_bind_by_name($consulta, ':V_PMOTIVO', $motivoseleccionado);
	oci_bind_by_name($consulta, ':V_PCANT_AFILIADO', $v_pcant_afiliado);
	oci_bind_by_name($consulta, ':V_PVAL_AFILIADO', $v_pval_afiliado);
	oci_bind_by_name($consulta, ':V_PFECHA_MODIFICACION', $v_pfecha_modificacion);
	oci_bind_by_name($consulta, ':V_PFECHA_FINAL', $v_pfecha_final);
	oci_bind_by_name($consulta, ':V_PCONTRATO_VALOR', $v_pcontrato_valor);
	oci_bind_by_name($consulta, ':V_PVAL_CONTRATO_OTROSI_EV', $v_pval_contrato_otrosi_ev);
	oci_bind_by_name($consulta, ':V_POBSERVACION_OTROSI', $v_pobservacion_otrosi);
	oci_bind_by_name($consulta, ':V_PACCION', $accion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob,-1,OCI_B_CLOB);
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