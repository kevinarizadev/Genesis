<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;


$function();

function insertarDatosPqr() {
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;
	$jsonpqr = '['.$request->pqr.']';
	$json_data = json_decode($request->pqr);
	$type = $request->action;	
	$numero = $request->numero;
	$pqrFile = $request->pqrFile;
	$fileguia = $request->gcorrespFile;


	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_PQR(:v_pjson_row_in,:v_pnumero,:v_paccion,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($jsonpqr);
	oci_bind_by_name($consulta,':v_pnumero',$numero);	
	oci_bind_by_name($consulta,':v_paccion',$type);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->Codigo == 0) {
		echo $bd_response;
	}else{
		if ($json_bd_response->RequireFile == 1) {
			$file = $pqrFile;
			$ext = $json_data->ext;
			$subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
			if ($subir != 0 && $json_bd_response->Rutaguia==null) {
				echo $bd_response;
			}
			if ($json_bd_response->Rutaguia) {
				$fileg = $fileguia;
				$gext = $json_data->gext;
				$subirad = subirFTP3($fileg,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuia,$gext);
				if ($subirad != 0) {
					echo $bd_response;
				}
				//echo $bd_response;
			}
			echo $bd_response;
		}else{
			echo $bd_response;
		}
	}
	oci_close($c);
} 
function saveResponsableSeleccionables(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_agregar_responsable(:v_responsable,:v_pestado,:v_res); end;');
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	oci_bind_by_name($consulta,':v_pestado',$request->estado);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function insertSalud(){
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;
	$json_data = json_decode($request->pqr);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTAR_GESTION_SALUD(:v_pjson_row_in,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($request->pqr);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);

	if ($json_bd_response->Codigoftp == 0) {
		echo $bd_response;
	}else{
			if ($json_data->extension) {
				$file = $request->adjunto;
				$ext = $json_data->extension;
				$subir = subirFTP3($file,$json_bd_response->Ftp,$json_bd_response->Archivo,$ext);
			}else{
			 echo 'Extension vacia';
			}
			if ($subir != 0) {
				echo $bd_response;
			}
			echo $bd_response;
	}
	oci_close($c);
}
function reasignarResponsable(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_RESPONSABLE(:v_responsable,:v_pqr,:v_observacion,:v_responsable_accion,:v_res); end;');
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	oci_bind_by_name($consulta,':v_pqr',$request->pqr);
	oci_bind_by_name($consulta,':v_observacion',$request->observacion);
	oci_bind_by_name($consulta,':v_responsable_accion',$request->reponsable_accion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}





function insertarDatosPqrAseguramiento() {
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;


	$jsonpqras = '['.$request->aseguramiento.']';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTA_PQR_GESTION(:v_pjson_row_in,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($jsonpqras);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->Codigo == 0) {
		if ($request->adjunto &&  $request->extension) {
			$file = $request->adjunto;
			$ext = $request->extension;
			$subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
			if ($subir != 0) {
			//	echo $bd_response;
			}
			echo $bd_response;
		}else{
			echo $bd_response;
		}
	}
	oci_close($c);

	}

function insertViewNotification() {
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTA_PQR_NOTIFICACION(:v_ppqr,:v_pdocumento,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_ppqr',$request->pqr);
	oci_bind_by_name($consulta,':v_pdocumento',$_SESSION['cedula']);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	echo $bd_response;
	oci_close($c);
}

//============= Administracion ==================//
function updateResponsableMotivo(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_PARAMETROS_RES(:v_responsable_nuevo,:v_responsable_anterior,:v_responsable,:v_motivo,:v_parametro,:v_res); end;');
    oci_bind_by_name($consulta,':v_responsable_nuevo',$request->resnuevo);
    oci_bind_by_name($consulta,':v_responsable_anterior',$request->resanterior);
    oci_bind_by_name($consulta,':v_responsable',$_SESSION['cedula']);
    oci_bind_by_name($consulta,':v_motivo',$request->motivo);
    oci_bind_by_name($consulta,':v_parametro',$request->parametro);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}
function updateMotivosResponsable(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_MOTIVO_RESXMOT(:v_responsable_nuevo,:v_responsable_anterior,:v_responsable,:v_parametro,:v_res); end;');
    oci_bind_by_name($consulta,':v_responsable_nuevo',$request->resnuevo);
    oci_bind_by_name($consulta,':v_responsable_anterior',$request->resanterior);
    oci_bind_by_name($consulta,':v_responsable',$_SESSION['cedula']);
    oci_bind_by_name($consulta,':v_parametro',$request->parametro);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}
function updateResponsableSeccional(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_RESPONSABLE_SECC(:v_responsable_nuevo,:v_responsable_anterior,:v_responsable,:v_parametro,:v_res); end;');
    oci_bind_by_name($consulta,':v_responsable_nuevo',$request->resnuevo);
    oci_bind_by_name($consulta,':v_responsable_anterior',$request->resanterior);
    oci_bind_by_name($consulta,':v_responsable',$_SESSION['cedula']);
    oci_bind_by_name($consulta,':v_parametro',$request->parametro);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}
function cargeMasivoPqr() {
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;
	$jsonpqr = '['.$request->pqr.']';
	$consulta = oci_parse($c, 'BEGIN PQR_PRUEBA_EXCEL.P_UI_PQR_TEST(:v_pjson_row_in,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($jsonpqr);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
			echo $bd_response;

	oci_close($c);
}

function updatePQRSuperSalud() {
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQR_PRUEBA_EXCEL.P_ACTUALIZAR_PQR_EXCEL(:v_criterioobjetivo,:v_criteriosubjetivo,:v_critericomplementario,:v_sujetosproteccionespecial,:v_servicios,:v_medicamentos,:v_pqrfile,:v_codigosuper,:v_presponsable,:v_preporta,:v_res); end;');
	oci_bind_by_name($consulta,':v_criterioobjetivo',$request->criterioobjetivo);
	oci_bind_by_name($consulta,':v_criteriosubjetivo',$request->criteriosubjetivo);
	oci_bind_by_name($consulta,':v_critericomplementario',$request->critericomplementario);
	oci_bind_by_name($consulta,':v_sujetosproteccionespecial',$request->sujetosproteccionespecial);
	oci_bind_by_name($consulta,':v_servicios',$request->servicios);
	oci_bind_by_name($consulta,':v_medicamentos',$request->medicamentos);
	oci_bind_by_name($consulta,':v_pqrfile',$request->pqrfile);
	oci_bind_by_name($consulta,':v_codigosuper',$request->codigosuper);
	oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
	oci_bind_by_name($consulta,':v_preporta',$request->reporta);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->Codigo == 0) {
		echo $bd_response;
	}else{
		if ($json_bd_response->codres== 1) {
			$file = $request->adjunto;
			$ext =$request->extension;
			$subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
			if ($subir != 0) {
				echo $bd_response;
			}
			echo $bd_response;
		}else{
			echo $bd_response;
		}
	}
	oci_close($c);

	}




function p_actualizar_ruta_pq() {
	require_once('../../config/dbcon_prod.php');
	require_once('../../upload_file/subir_archivo.php');
	global $request;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_RUTA_PQ(:v_codigo,:v_extension,:v_responsable,:v_ftp,:v_res); end;');
	oci_bind_by_name($consulta,':v_codigo',$request->codigo);
	oci_bind_by_name($consulta,':v_extension',  $request->extension);
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	oci_bind_by_name($consulta,':v_ftp',$request->ftp);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->codigo == 1) {
		echo $bd_response;
	}else{
			if ($request->extension) {
				$file = $request->file;
				$ext = $request->extension;
				$subir = subirFTP3($file,$json_bd_response->ftp,$json_bd_response->archivo,$ext);
			}else{
			 echo 'Extension vacia';
			}
			if ($subir != 0) {
				echo $bd_response;
			}
			echo $bd_response;

	}
	oci_close($c);

	}

	function updateEstadoSolicitud() {
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CAMBIAR_ESTADO_SOLICITUD(:v_ppqr,:v_responsable,:v_pestado_nuevo,:v_pestado_anterior,:v_pmotivo_anulacion,:v_pmotivo_activacion,:v_ppqr_asociada,:v_pmodulo,:v_pobservacion,:v_res); end;');
		oci_bind_by_name($consulta,':v_ppqr',$request->pqr);
		oci_bind_by_name($consulta,':v_responsable',$request->responsable);
		oci_bind_by_name($consulta,':v_pestado_nuevo',$request->estado_nuevo);
		oci_bind_by_name($consulta,':v_pestado_anterior',$request->estado_anterior);
		oci_bind_by_name($consulta,':v_pmotivo_anulacion',$request->motivo_anulacion);
		oci_bind_by_name($consulta,':v_pmotivo_activacion',$request->motivo_activacion);
		oci_bind_by_name($consulta,':v_ppqr_asociada',$request->pqr_asociada);
		oci_bind_by_name($consulta,':v_pmodulo',$request->modulo);
		oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		$bd_response = $clob->read($clob->size());
			echo $bd_response;
		oci_close($c);
	}


			function p_inserta_tercero_pqr() {
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTA_TERCERO_PQR(:v_pjson_row_in,:v_pjson_row_out); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->tercero);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
						echo $bd_response;

				oci_close($c);
			}

			function p_inserta_operador_corresp() {
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTA_OPERADOR_CORRESP(:v_pjson_row_in,:v_pjson_row_out); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->operador);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
						echo $bd_response;

				oci_close($c);
			}

			function p_actualiza_courier() {
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_COURIER(:v_pjson_row_in,:v_pcantidad,:v_json_row); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->couriers);
				oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
						echo $bd_response;

				oci_close($c);
			}

			function p_actualiza_guia() {
				require_once('../../config/dbcon_prod.php');
				require_once('../../upload_file/subir_archivo.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_GUIA(:v_pjson_row_in,:v_pcantidad,:v_pnumguia,:v_json_row); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->guias);
				oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
				oci_bind_by_name($consulta, ':v_pnumguia', $request->numguia);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
				$json_bd_response = json_decode($bd_response);

				if ($json_bd_response->Codigo == 1) {
					echo $bd_response;
				}else{
					if ($json_bd_response->v_gradfile) {
						$file = $request->gradfile;
						$ext = $request->gradext;
						$subirgrad = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuiaRad,$ext);
						if ($subirgrad != 0) {
							echo $bd_response;
						}

					}

					echo $bd_response;
				}
				oci_close($c);

			}
			function p_actualiza_correspondencia() {
				require_once('../../config/dbcon_prod.php');
				require_once('../../upload_file/subir_archivo.php');

				global $request;
				$json_data = json_decode($request->correspondencia);
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_CORRESPONDENCIA(:v_pjson_row_in,:v_pcantidad,:v_json_row); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->correspondencia);
				oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
				$json_bd_response = json_decode($bd_response);

				if ($json_bd_response->Codigo == 1) {
					echo $bd_response;
				}else{
					if ($json_bd_response->v_pqrfile) {
						$file = $json_data->pqrFile;
						$ext = $json_data->ext;
						$subirpqr = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoPQR,$ext);
						if ($subirpqr != 0) {
						// 	echo $bd_response;
						}

					}
					if ($json_bd_response->v_gradfile) {
						$file = $json_data->gradfile;
						$ext = $json_data->gradext;
						$subirgrad = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuiaRad,$ext);
						if ($subirgrad != 0) {
						// 	echo $bd_response;
						}

					}
					if ($json_bd_response->v_ggesfile) {
						$file = $json_data->ggesfile;
						$ext = $json_data->ggesext;
						$subirges = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuiaGes,$ext);
						if ($subirges != 0) {
						// 	echo $bd_response;
						}
						//echo $bd_response;
					}
					echo $bd_response;
				}
				oci_close($c);
			}


			function p_actualiza_estado_pq(){
				require_once('../../config/dbcon.php');
				global $request;
				$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_ESTADO_PQ(:v_codigo,:v_json_row); end;');
				oci_bind_by_name($consulta,':v_codigo',$request->numero);
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

			  function p_transferir_correspondencia(){
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_TRANSFERIR_CORRESPONDENCIA(:v_area,:v_pqr,:v_responsable_accion,:v_res); end;');
				oci_bind_by_name($consulta,':v_area',$request->area);
				oci_bind_by_name($consulta,':v_pqr',$request->pqr);
				oci_bind_by_name($consulta,':v_responsable_accion',$request->reponsable_accion);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_DEFAULT);
				if (isset($clob)) {
				  $json = $clob->read($clob->size());
				  echo $json;
				}else{
				  echo 0;
				}
				oci_close($c);
			}

		    function p_cambiar_estado_devolucion(){
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CAMBIAR_ESTADO_DEVOLUCION(:v_pconsecutivo,:v_pmotivo,:v_pobservaciones,:v_responsable,:v_res); end;');
				oci_bind_by_name($consulta,':v_pconsecutivo',$request->consecutivo);
				oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);
				oci_bind_by_name($consulta,':v_pobservaciones',$request->observaciones);
				oci_bind_by_name($consulta,':v_responsable',$request->responsable);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_DEFAULT);
				if (isset($clob)) {
				  $json = $clob->read($clob->size());
				  echo $json;
				}else{
				  echo 0;
				}
				oci_close($c);
			}

    		function p_ui_responsasbles_correspondencia() {
				require_once('../../config/dbcon_prod.php');
				global $request;

				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_RESPONSASBLES_CORRESPONDENCIA(:v_pjson_row_in,:v_pjson_row_out); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->responsables);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
						echo $bd_response;

				oci_close($c);
			}

				function p_actualizar_pqr_solicitud() {
				require_once('../../config/dbcon_prod.php');
				global $request;

				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZAR_PQR_SOLICITUD(:v_pjson_row_in,:v_pjson_row_out); end;');
				$jsonin = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
				$jsonin->writeTemporary($request->pqr);
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
				$bd_response = $clob->read($clob->size());
						echo $bd_response;

				oci_close($c);
			}


			function descargaAdjunto(){
				require_once('../../config/sftp_con.php');
				global $request;
				$fileexists = false;
				//$fileexists = true;

				  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
				    require_once('../../config/ftpcon.php');
				    $fileexists = true;
				  }
				  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
				    require_once('../../config/sftp_con.php');
				    $fileexists = true;
				  }
				   if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE) {
				    require_once('../../config/sftp_con_2.php');
				    $fileexists = true;
				  }
				  if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE) {
				    require_once('../../config/sftp_con_2.php');
				    $fileexists = true;
				  }

				  if($fileexists) {

					$name = uniqid();
					$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
					$name = $name.'.'.$ext;
					$local_file = '../../../temp/'.$name;
					$handle = fopen($local_file, 'w');
					if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
						 echo $name;
					} else {
						 echo "Error";
					}
					ftp_close($con_id);
					fclose($handle);
				}
			}


			function actualizarfecharespuesta(){
				require_once('../../config/dbcon_prod.php');
				global $request;
				$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_PQR(:v_pnumero,:v_pfecha_entrega,:v_p_diashabiles,:v_json_row); end;');
				oci_bind_by_name($consulta,':v_pnumero',$request->numerodelradicado);
				oci_bind_by_name($consulta,':v_pfecha_entrega',$request->fechaactualizar);
				oci_bind_by_name($consulta,':v_p_diashabiles',$request->diashabiles);
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
