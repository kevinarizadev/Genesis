<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenerautorizacion(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		//$prestador = $request->prestador;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_OBTENER_AUTORIZACION(:v_numero,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_numero',$numero);
		//oci_bind_by_name($consulta,':v_pprestador',$prestador);
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
	
	function obtenerautorizacion_web(){
		//require_once('../../config/dbcon_prod.php');
		require_once('../../config/dbcon_login.php');
		global $request;
		$numero = $request->numero;
		$ubicacion = $request->ubicacion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_OBTENER_AUTORIZACION_WEB(:v_pnumero, :v_pubicacion,:v_json_row); end;');
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

	function validarafialiado(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$tipodoc = $request->tipodoc;
		$documento = $request->documento;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_VALIDAR_AFILIADO(:v_ptipodoc,:v_pdocumento ,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_ptipodoc',$tipodoc);
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_prespuesta',$respuesta,20);
		 oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}

	function obtenerautorizaciones(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$tipodocumento = $request->tipodocumento;
		$documento = $request->documento;

			$consulta = oci_parse($c,"with tabla as (
																		SELECT AF.AFIC_NOMBRE Nombre,
																			   AUTN_NUMERO CODIGO,
																		       AUTN_AUTORIZACION_MANUAL Numero,
																		       AUTN_UBICACION,
																		       U.UBGC_NOMBRE Ubicacion,
																		       TO_DATE(TO_CHAR(AUTF_CONFIRMADO, 'DD/MM/YYYY'), 'DD/MM/YYYY') Fecha,
																		       replace(T.TERC_NOMBRE, '\"', '') Prestador,
																		       CLAC_NOMBRE Servicio,
																		       CASE WHEN AUTC_ESTADO = 'P' THEN 'Procesada' WHEN AUTC_ESTADO = 'A' THEN 'Activa' WHEN AUTC_ESTADO = 'X' THEN 'Anulada' END Estado,
																		       CASE WHEN AUTC_ALTO_COSTO = 'S' THEN 'check' ELSE 'clear' END Altocosto,
																		       CASE WHEN AUTC_TIPO = 'C' THEN 'CTC' WHEN AUTC_TIPO = 'T' THEN 'TUTELA' ELSE '' END Tipo,
																		       CASE WHEN AUTC_CLASE = 'P' THEN 'POS' ELSE 'NO POS' END Clase,
																			   CASE WHEN AUTC_ESTADO = 'P' AND AUTN_IMPRESION < 2 THEN  'cursor: pointer;' WHEN AUTC_ESTADO = 'P' AND autn_impresion >= 2 THEN 'cursor: not-allowed;' WHEN AUTC_ESTADO = 'A' THEN '' WHEN AUTC_ESTADO = 'X' THEN '' WHEN AUTN_IMPRESION IS NULL THEN 'cursor: pointer;' END STYLE,
                                         CASE WHEN AUTC_ESTADO = 'P' AND AUTN_IMPRESION < 2 THEN  'true' WHEN AUTC_ESTADO = 'P' AND AUTN_IMPRESION >= 2 THEN 'false' WHEN AUTC_ESTADO = 'A' THEN 'false' WHEN AUTC_ESTADO = 'X' THEN 'false' WHEN AUTN_IMPRESION IS NULL THEN 'true' END EVENTO,
                                         CASE WHEN AUTC_ESTADO = 'P' AND AUTN_IMPRESION < 2 THEN  'print' WHEN AUTC_ESTADO = 'P' AND autn_impresion >= 2 THEN 'lock_outline' WHEN AUTC_ESTADO = 'A' THEN '' WHEN AUTC_ESTADO = 'X' THEN '' WHEN AUTN_IMPRESION IS NULL THEN 'print' END PRINT,
																					 CASE WHEN AUTC_ESTADO = 'P' THEN  'status green' WHEN AUTC_ESTADO = 'A' THEN 'status orange darken-1' WHEN AUTC_ESTADO = 'X' THEN 'status red' END COLOR,
																					 CASE WHEN AUTC_ESTADO = 'P' THEN  'false' WHEN AUTC_ESTADO = 'A' THEN 'true' WHEN AUTC_ESTADO = 'X' THEN 'true' END VISIBLE
																		 FROM EAUT_AUTORIZACION
																		 INNER JOIN ECLA_CLASIFICACION ON AUTN_CLASIFICACION = CLAN_CODIGO
																		 INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = AUTV_PROVEEDOR
																		 INNER JOIN BUBG_UBICACION_GEOGRAFICA U ON U.UBGN_CODIGO = AUTN_UBICACION
																		 INNER JOIN EAFI_AFILIADO AF ON AF.AFIC_TIPO_DOCUMENTO = AUTC_TIPO_DOC_AFILIADO AND AF.AFIC_DOCUMENTO = AUTC_AFILIADO
																		 WHERE AUTC_TIPO_DOC_AFILIADO = :v_ptipodoc  And AUTC_AFILIADO = :v_pdocumento
																		 ORDER BY Fecha DESC
																		 )
																		 select rownum, t.* from tabla t
													 ");
		oci_bind_by_name($consulta,':v_ptipodoc',$tipodocumento);
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		 oci_execute($consulta,OCI_DEFAULT);
		$rows = array();	while($row = oci_fetch_assoc($consulta))	{		$rows[] = $row;	}	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}

	function getListaMotivosAnulacion ( ){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MOTIVOSANULACION(:v_json_row); end;');
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
	function getAutorizacionesXanular ( ){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		$ubicacion = $request->ubicacion;	
		$documento = $request->documento;	
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUTORIZACIONES_AN(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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

	function p_lista_motivosprocesamiento(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MOTIVOSPROCESAMIENTO(:v_json_row); end;');
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

    function p_imprimir_autorizacion_web(){
	require_once('../../config/dbcon.php');
	global $request;
  
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_IMPRIMIR_AUTORIZACION_WEB(:v_pautorizacion,
																		  :v_json_row); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
	$jsonin->writeTemporary($request->autorizacion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
	  $json = $clob->read($clob->size());
	  echo $json;
	}else{
	  echo $clob;
	}
	oci_close($c);
  }


?>
