<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function crearEvento(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$dataEvento = json_decode($request->data);
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PC.P_INSERTAR_EVENTO(:v_pubicacion,
																																		 :v_pprogramacion,
																																		 :v_ptema,
																																		 :v_ptipoactividad,
																																		 :v_pobjetivoactividad,
																																		 :v_pobjetivoestrategico,
																																		 :v_pfechaprogramada,
																																		 :v_pareasolicita,
																																		 :v_phorasprogramadas,
																																		 :v_ptipofacilitador,
																																		 :v_pdocumentofacilitador,
																																		 :v_pfacilitador,
																																		 :v_ptipolugar,
																																		 :v_plugar,
																																		 :v_psede,
																																		 :v_pevento,
																																		 :v_presponsable,
																																	   :v_respuesta); end;');
		oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
		oci_bind_by_name($consulta,':v_pprogramacion',$dataEvento->programacion);
    oci_bind_by_name($consulta,':v_ptema', $dataEvento->tema);
    oci_bind_by_name($consulta,':v_ptipoactividad', $dataEvento->tipoactividad);
    oci_bind_by_name($consulta,':v_pobjetivoactividad',$dataEvento->objetivoactividad);
    oci_bind_by_name($consulta,':v_pobjetivoestrategico',$dataEvento->objetivoestrategico);
		oci_bind_by_name($consulta,':v_pfechaprogramada',$dataEvento->fechaprogramada);
		oci_bind_by_name($consulta,':v_pareasolicita', $dataEvento->areasolicita);
		oci_bind_by_name($consulta,':v_phorasprogramadas', $dataEvento->horasprogramadas);
		oci_bind_by_name($consulta,':v_ptipofacilitador',$dataEvento->tipofacilitador);
		oci_bind_by_name($consulta,':v_pdocumentofacilitador',$dataEvento->documentofacilitador);
		oci_bind_by_name($consulta,':v_pfacilitador',$dataEvento->facilitador);
		oci_bind_by_name($consulta,':v_ptipolugar',$dataEvento->tipolugar);
		oci_bind_by_name($consulta,':v_plugar', $dataEvento->lugar);
		oci_bind_by_name($consulta,':v_psede', $dataEvento->sedePrin);
	    oci_bind_by_name($consulta,':v_pevento', $dataEvento->evento);
		oci_bind_by_name($consulta,':v_presponsable', $_SESSION['cedula']);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function agendarAsistentes(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$asistentes = $request->asistentes;
		$cantidad = $request->cantidad;
		$sede = $request->sede;
		$numero = $request->numero;
		$ubicacion = $request->ubicacion;
		$opcion = $request->opcion;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PC.P_INSERTAR_ASISTENTE(:v_pasistentes,
																			                               		:v_psede,
																			                               		:v_pcantidad,
																			                               		:v_pnumero,
																			                               		:v_pubicacion,
																			                               		:v_popcion,
																			                               		:v_pjson_row); end;');
		$jsonasistentein = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pasistentes', $jsonasistentein, -1, OCI_B_CLOB);
		$jsonasistentein->writeTemporary($asistentes);
		oci_bind_by_name($consulta,':v_psede',$sede);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		oci_bind_by_name($consulta,':v_popcion',$opcion);
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
	function eliminarAsistentes(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$asistente = $request->cedula;
		$numero = $request->consecutivo;
		$ubicacion = $request->ubicacion;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PC.P_ELIMINAR_ASISTENTE(:v_pubicacion,
																																				:v_pconsecutivo,
																																				:v_pcedula,
																																				:v_respuesta); end;');
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		oci_bind_by_name($consulta,':v_pconsecutivo',$numero);
		oci_bind_by_name($consulta,':v_pcedula',$asistente);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
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
