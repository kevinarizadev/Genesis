<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function cargapreguntas(){
		require_once('../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT * from gview_declaracion_salud");
		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}

	function cargarPreguntasPorDocumento() {
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$consulta = oci_parse($c,'begin PQ_GENESIS_DECLARACION.P_OBTENER_PREGUNTAS(
			:v_tipodocumento,
			:v_documento,
			:v_json_row
		); end;');
		//$consulta = oci_parse($c,'begin PQ_GENESIS_PRUEBAS.p_json_prueba(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_tipodocumento',$type);
		oci_bind_by_name($consulta,':v_documento',$id);
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

  function cargarPreguntasPorDocumento_impresion() {
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$consulta = oci_parse($c,'begin PQ_GENESIS_DECLARACION.P_OBTENER_PREGUNTA_IMPRESION(
			:v_tipodocumento,
			:v_documento,
			:v_json_row
		); end;');
		//$consulta = oci_parse($c,'begin PQ_GENESIS_PRUEBAS.p_json_prueba(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_tipodocumento',$type);
		oci_bind_by_name($consulta,':v_documento',$id);
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

	function carganucleo(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$consulta = oci_parse($c,'begin pq_genesis_declaracion.p_nucleo_declaracion(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		//$consulta = oci_parse($c,'begin PQ_GENESIS_PRUEBAS.p_json_prueba(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
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
	function enviarenglon(){
		global $request;
		require_once('../config/dbcon_prod.php');
		$tipo_doc = $request->tipo_doc;
		$documento = $request->documento;
		$fecha = date("d/m/Y");
		$renglon = $request->renglon;
		$respuesta = $request->respuesta;
		$responsable = $_SESSION['cedula'];
		$consulta = oci_parse($c,"INSERT into edec_declaracion_rs (edec_tipo_documento,edec_documento,edef_fecha,eden_renglon,edec_respuesta,eden_responsable)
											VALUES (:tipo_doc,:documento,:fecha,:renglon,:respuesta,:responsable)");
		oci_bind_by_name($consulta,':tipo_doc',$tipo_doc);
		oci_bind_by_name($consulta,':documento',$documento);
		oci_bind_by_name($consulta,':fecha',$fecha);
		oci_bind_by_name($consulta,':renglon',$renglon);
		oci_bind_by_name($consulta,':respuesta',$respuesta);
		oci_bind_by_name($consulta,':responsable',$responsable);
		$res = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $res;
		oci_close($c);
	}

	function registrarRepuesta(){
		global $request;
		require_once('../config/dbcon_prod.php');
		$tipo_doc = $request->tipo_doc;
    $documento = $request->documento;
    $firma = $request->firma;
		$responsable = $_SESSION['cedula'];

		$valid = true;

		foreach($request->data as $respuesta) {
			$consulta = oci_parse($c,"begin PQ_GENESIS_DECLARACION.P_REGISTRA_DECLARACION(
				:v_tipodocumento,
				:v_documento,
        :v_responsable,
        :v_firma,
				:v_pjson_row_in,
				:v_pjson_row_out
			);end;");
			$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
			oci_bind_by_name($consulta,':v_tipodocumento',$tipo_doc);
			oci_bind_by_name($consulta,':v_documento',$documento);
			oci_bind_by_name($consulta,':v_responsable',$responsable);
			oci_bind_by_name($consulta,':v_firma',$firma);
			oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
			$json_parametros->writeTemporary(json_encode([
				"codigo" => $respuesta->ITEM,
				"respuesta" => $respuesta->RESPUESTA
			]));
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
			oci_execute($consulta,OCI_DEFAULT);
			if (isset($clob)) {
				$valid &= true;
				$json = $clob->read($clob->size());

			}else{
				$valid &= false;
			}
		}

		echo $json;

		oci_close($c);
	}
?>
