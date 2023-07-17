<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtener_usuarios_escenarios(){
		require_once('../config/dbcon_prod.php');
		global $request;
		//var_dump($request);
		$numero_contrato = $request->numero_contrato;
        $ubicacion = $request->ubicacion;
        $escenario = $request->escenario;
        // $concepto: $request->concepto;
        // $estado_afiliado: $request->estado_afiliado;
		// $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_REPORTE_SECCIONAL_HOR(:v_pnumero_contrato, :v_pubicacion, :v_pescenario, :v_pconcepto, :v_pestado_afiliado, :v_pjson_row); end;');
		$consulta = oci_parse($c,"SELECT T.ACPC_TIPO_DOC_AFILIADO, T.ACPC_AFILIADO, O.CNTC_DOCUMENTO,
								CASE WHEN E.AFIC_ESTADO_AFILIADO = 'AC' THEN 'ACTIVO'
									WHEN E.AFIC_ESTADO_AFILIADO = 'PL' THEN 'PROTECCIÓN LABORAL'
									WHEN E.AFIC_ESTADO_AFILIADO = 'IN' THEN 'INACTIVO' 
									ELSE E.AFIC_ESTADO_AFILIADO END ESTADO_AFILIADO,
								CASE WHEN T.ACPC_CLASE = 'C' THEN 'CAPITADO'
									WHEN T.ACPC_CLASE = 'M' THEN 'MEDICAMENTOS'
									WHEN T.ACPC_CLASE = 'P' THEN 'P y P'
									WHEN T.ACPC_CLASE = 'T' THEN 'COMPLEMENTO CA'
									WHEN T.ACPC_CLASE = 'F' THEN 'FISIOTERAPIA'
									WHEN T.ACPC_CLASE = 'R' THEN 'RADIOLOGIA'
									WHEN T.ACPC_CLASE = 'O' THEN 'ODONTOLOGIA'
									ELSE T.ACPC_CLASE END CLASE
								FROM EACP_AFILIADO_CONTRATO_PRE T
								INNER JOIN EAFI_AFILIADO E ON E.AFIC_TIPO_DOCUMENTO = T.ACPC_TIPO_DOC_AFILIADO AND E.AFIC_DOCUMENTO = T.ACPC_AFILIADO
								INNER JOIN OCNT_CONTRATO O ON O.CNTN_NUMERO = T.ACPN_NUMERO AND O.CNTC_DOCUMENTO = T.ACPC_DOCUMENTO
								WHERE (T.ACPN_NUMERO = :V_PNUMERO_CONTRATO) AND
								(T.ACPN_UBICACION = :V_PUBICACION) AND
								--(T.ACPN_PAQUETE = :V_PESCENARIO) AND
								E.AFIC_ESTADO_AFILIADO IN ('AC', 'PL', 'IN')");
		// $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pnumero_contrato',$numero_contrato);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		//oci_bind_by_name($consulta,':v_pescenario',$escenario);
		// oci_bind_by_name($consulta,':v_pconcepto',$concepto);
		// oci_bind_by_name($consulta,':v_pestado_afiliado',$estado_afiliado);
		// oci_bind_by_name($consulta,':v_pjson_row', $clob,-1,OCI_B_CLOB);
		// oci_execute($consulta,OCI_DEFAULT);
		// if (isset($clob)) {
		// 	$json = $clob->read($clob->size());
		// 	echo $json;
		// }else{
		// 	echo 0;
		// }

		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}

?>
