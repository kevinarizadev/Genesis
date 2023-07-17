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

?>