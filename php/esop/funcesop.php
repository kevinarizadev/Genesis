<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function cargadepartamentos(){
		require_once('../config/dbcon_login.php');
		$consulta = oci_parse($c,"SELECT UBGN_CODIGO CODIGO, UBGC_NOMBRE NOMBRE
										FROM BUBG_UBICACION_GEOGRAFICA 
										WHERE UBGN_NIVEL = 2
										ORDER BY UBGC_NOMBRE");
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cargamunicipios(){
		require_once('../config/dbcon_login.php');
		global $request;
		$depa = $request->depa;
		$consulta = oci_parse($c,"SELECT UBGN_CODIGO CODIGO, UBGC_NOMBRE NOMBRE
										FROM BUBG_UBICACION_GEOGRAFICA 
										WHERE  ubgn_padre || '000' = :depa
										ORDER BY UBGC_NOMBRE");
		oci_bind_by_name($consulta,':depa',$depa);
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cargaipsmunicipios(){
		require_once('../config/dbcon_login.php');
		global $request;
		$muni = $request->muni;
		$regimen = $request->regimen;
		if ($regimen == "C") {
			$consulta = oci_parse($c,"SELECT  PAQN_NUMERO CODIGO, TERC_NOMBRE NOMBRE
												FROM EPAQ_PAQUETE_CONTRATO P
												INNER JOIN EPAD_PAQUETE_DETALLE D ON P.PAQN_EMPRESA = D.PADN_EMPRESA
												                                  AND P.PAQC_DOCUMENTO = D.PADC_DOCUMENTO
												                                  AND P.PAQN_NUMERO = D.PADN_NUMERO
												                                  AND P.PAQN_UBICACION = D.PADN_UBICACION
												                                  AND D.PADC_PRIMARIO = 'S'
												                                  AND P.PAQC_ESTADO = 'P'
												                                  AND P.PAQN_UBICACION = :municipio
												INNER JOIN OCNT_CONTRATO C ON C.CNTN_EMPRESA = D.PADN_EMPRESA
												                           AND C.CNTC_DOCUMENTO = D.PADC_DOC_CONTRATO
												                           AND C.CNTN_NUMERO = D.PADN_NUM_CONTRATO
												                           AND C.CNTN_UBICACION = D.PADN_UBI_CONTRATO
												                           AND C.CNTC_DOCUMENTO = 'KC'
												INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = C.CNTV_TERCERO
												ORDER BY TERC_NOMBRE");
		}else{
			$consulta = oci_parse($c,"SELECT  PAQN_NUMERO CODIGO, TERC_NOMBRE NOMBRE
												FROM EPAQ_PAQUETE_CONTRATO P
												INNER JOIN EPAD_PAQUETE_DETALLE D ON P.PAQN_EMPRESA = D.PADN_EMPRESA
												                                  AND P.PAQC_DOCUMENTO = D.PADC_DOCUMENTO
												                                  AND P.PAQN_NUMERO = D.PADN_NUMERO
												                                  AND P.PAQN_UBICACION = D.PADN_UBICACION
												                                  AND D.PADC_PRIMARIO = 'S'
												                                  AND P.PAQC_ESTADO = 'P'
												                                  AND P.PAQN_UBICACION = :municipio
												INNER JOIN OCNT_CONTRATO C ON C.CNTN_EMPRESA = D.PADN_EMPRESA
												                           AND C.CNTC_DOCUMENTO = D.PADC_DOC_CONTRATO
												                           AND C.CNTN_NUMERO = D.PADN_NUM_CONTRATO
												                           AND C.CNTN_UBICACION = D.PADN_UBI_CONTRATO
												                           AND C.CNTC_CLASE = 'C'
												                           AND C.CNTC_DOCUMENTO = 'KS'
												INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = C.CNTV_TERCERO
												ORDER BY TERC_NOMBRE");
		}
		
		oci_bind_by_name($consulta,':municipio',$muni);
		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function guardasolicitud(){
		require_once('../config/dbcon_login.php');
		global $request;
		$ex = $request->ex;
		if ($ex = 'Y') {
			$type = $request->type;
			$id = $request->id;
		}else{
			$type = $_SESSION['tipo'];
			$id = $_SESSION['cedula'];
		}
		
		$correo = $request->correo;
		$municipio = $request->municipio;
		$direccion = $request->direccion;
		$telefono = $request->telefono;
		$tiempo = $request->tiempo;
		$escenario = $request->escenario;
		$descripcion = $request->descripcion;
		$consulta = oci_parse($c,"begin pq_genesis_po.p_guarda_solicitud(:v_ptipo_documento,:v_pdocumento,:v_correo,:v_municipio_recepcion,
																							  :v_direccion_recepcion,:v_telefono_recepcion,:v_tiempo_permanencia,
																							  :v_escenario,:v_descripcion,:v_res); end;");
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
		oci_bind_by_name($consulta,':v_correo',$correo);
		oci_bind_by_name($consulta,':v_municipio_recepcion',$municipio);
		oci_bind_by_name($consulta,':v_direccion_recepcion',$direccion);
		oci_bind_by_name($consulta,':v_telefono_recepcion',$telefono);
		oci_bind_by_name($consulta,':v_tiempo_permanencia',$tiempo);
		oci_bind_by_name($consulta,':v_escenario',$escenario);
		oci_bind_by_name($consulta,':v_descripcion',$descripcion);
		oci_bind_by_name($consulta,':v_res',$res,500);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $res;
	}
	function validaafilport(){
		require_once('../config/dbcon_login.php');
		global $request;
		$type = $_SESSION['tipo'];
		$id = $_SESSION['cedula'];
		$consulta = oci_parse($c,"begin pq_genesis_po.p_valida_portabilidad(:v_ptipo_documento,:v_pdocumento,:v_res); end;");
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
		oci_bind_by_name($consulta,':v_res',$res);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $res;
	}
	function exverafiliado(){
			require_once('../config/dbcon_login.php');
			global $request;
			$type = $request->type;
			$id = $request->id;
			$consulta = oci_parse($c,"begin pq_genesis_po.p_valida_portabilidad_ex(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;");
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
	function exconsultaafil(){
		require_once('../config/dbcon_login.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$consulta = oci_parse($c,"begin pq_genesis_po.p_consulta_afil_ex(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;");
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo '['.$json.']';
		}else{
			echo 0;
		}
		oci_close($c);
	}
?>