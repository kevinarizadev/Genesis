<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


	function P_OBTENER_CARGUES_RADICADOS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_CARGUES_RADICADOS(:v_pnit,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }

	function P_OBTENER_FACTURAS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURAS(:v_pnit,:v_recibo,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    oci_bind_by_name($consulta,':v_recibo',$request->recibo);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }














	function obtenerDetalleCargue(){
	    require_once('../config/dbcon.php');
	    global $request;
			$codigo = $request->codigo;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_DETALLE_CARGUE(:v_pcodigo,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pcodigo',$codigo);
      $cursor = oci_new_cursor($c);
      oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
      oci_execute($consulta);
      oci_execute($cursor, OCI_DEFAULT);
      $datos = [];
      oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
      oci_free_statement($consulta);
      oci_free_statement($cursor);
      echo json_encode($datos);
  	}
  	function obtenerTipoContrato(){
	    require_once('../config/dbcon.php');
	    global $request;
			$nit = $request->nit;
			$regimen = $request->regimen;
			$contrato = $request->contrato;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_TIPOCONTRATO(:v_pnit,:v_pregimen,:v_pcontrato,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnit',$nit);
			oci_bind_by_name($consulta,':v_pregimen',$regimen);
			oci_bind_by_name($consulta,':v_pcontrato',$contrato);
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
	function obtenerModalidad(){
	    require_once('../config/dbcon.php');
	    global $request;
			$nit = $request->nit;
			$contrato = $request->contrato;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_MODALIDAD(:v_pnit,:v_pcontrato,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnit',$nit);
			oci_bind_by_name($consulta,':v_pcontrato',$contrato);
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
	function obtenerArchivos(){
	    require_once('../config/dbcon.php');
	    global $request;
	    $nit = $request->nit;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_ARCHIVOS(:v_pnit,:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pnit',$nit);
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
	function obtenerYear(){
		require_once('../config/dbcon.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_AÑO(:v_pnit,:v_pcontrato,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit', $request->nit);
		oci_bind_by_name($consulta,':v_pcontrato', $request->contrato);
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
	function obtenerPeriodo(){
	    require_once('../config/dbcon.php');
	    global $request;
			$year = $request->anno;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_PERIODO(:v_panno,:v_pnit,:v_pcontrato,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_panno',$year);
		oci_bind_by_name($consulta,':v_pnit', $request->nit);
		oci_bind_by_name($consulta,':v_pcontrato', $request->contrato);
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
	function obtenerIPS(){
	    require_once('../config/dbcon.php');
	    global $request;
			$info = $request->info;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_IPS(:v_pnit,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnit',$info);
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
	function obtenerIPS_Rad(){
	    require_once('../config/dbcon.php');
	    global $request;
			$info = $request->info;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_IPS_RAD_MANUAL(:v_pnit,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnit',$info);
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
	function actualizarMonto(){
	    require_once('../config/dbcon.php');
	    global $request;
			$nit = $request->nit;
			$monto = $request->monto;
			$tipo = $request->tipo;
			$responsable = $_SESSION['cedula'];
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_U_MONTO(:v_pnit,:v_tipo,:v_pmonto,:v_presponsable,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnit',$nit);
			oci_bind_by_name($consulta,':v_tipo',$tipo);
			oci_bind_by_name($consulta,':v_pmonto',$monto);
			oci_bind_by_name($consulta,':v_presponsable',$responsable);
	    $clob = oci_new_descriptor($c,OCI_D_LOB);
	    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	    if (isset($clob)) {
	      $json = $clob->read($clob->size());
	      echo $json;
	    }else{
	      echo 0;
	    }
	    oci_close($c);
	}

	function actualizarestado_nocontratada(){
	    require_once('../config/dbcon.php');
	    global $request;
			$nit = $request->nit;
			$responsable = $request->responsable;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_HABILITA_NO_CONTRATADA(:v_pnit,:v_presponsable,:v_json_out); end;');
			oci_bind_by_name($consulta,':v_pnit',$nit);
			oci_bind_by_name($consulta,':v_presponsable',$responsable);
	    $clob = oci_new_descriptor($c,OCI_D_LOB);
	    oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
	    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	    if (isset($clob)) {
	      $json = $clob->read($clob->size());
	      echo $json;
	    }else{
	      echo 0;
	    }
	    oci_close($c);
	}

	function ui_archivos(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$tipo = $request->tipo;
		$archivo = $request->archivo;
		$valor = $request->valor;
		$responsable = $_SESSION['cedula'];
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_UI_ARCHIVOS(:v_pnit,
																	   :v_ptipo,
																	   :v_parchivos,
																	   :v_pvalor,
																	   :v_presponsable,
																	   :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
		$jsonarchivos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_parchivos', $jsonarchivos, -1, OCI_B_CLOB);
		$jsonarchivos->writeTemporary($archivo);
		oci_bind_by_name($consulta,':v_pvalor',$valor);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function validarRad(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$anno = $request->anno;
		$mes = $request->mes;
		$recibo = $request->recibo;
		$contrato = $request->contrato;
		// $clase = 'C';
		$clase = $request->clase;
		$ubicacion = $request->ubicacion;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_VALIDA_RADICACION (:v_pnit,
																		    :v_panno,
																			:v_pmes,
																			:v_precibo,
																		    :v_pclasecontrato,
																		    :v_pcontrato,
																		    :v_pubicacion,
																		    :v_pjson_out); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pmes',$mes);
		oci_bind_by_name($consulta,':v_precibo',$recibo);
		oci_bind_by_name($consulta,':v_pclasecontrato',$clase);
		oci_bind_by_name($consulta,':v_pcontrato',$contrato);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function validarContrato(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$regimen = $request->regimen;
		$tipocontrato = $request->tipocontrato;
		$modalidad = $request->modalidad;
		$anno = $request->anno;
		$mes = $request->mes;
		$contrato = $request->contrato;
		$recibo = $request->recibo;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_VALIDAR_CONTRATO(:v_pnit,
																		    :v_pregimen,
																		    :v_pcontrato,
																		    :v_ptipocontrato,
																		    :v_pmodalidad,
																		    :v_panno,
																				:v_pmes,
																				:v_precibo,
																		    :v_pjson_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_pcontrato',$contrato);
		oci_bind_by_name($consulta,':v_ptipocontrato',$tipocontrato);
		oci_bind_by_name($consulta,':v_pmodalidad',$modalidad);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pmes',$mes);
		oci_bind_by_name($consulta,':v_precibo',$recibo);
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
	function subirAdjunto(){
		require_once('../config/dbcon.php');
		//require_once('../config/ftpcon.php');
		require_once('../config/sftp_con.php');
		include('../../upload_file/subir_adjunto_rips.php');
		global $request;
		// variables de parametros
		$archivos = json_decode($request->archivos);
		$nit = $request->nit;
		$recibo= $request->recibo;
		// otras variables
		$hoy = date('dmY');
		$mes = date('m');
		$ano = date('Y');
		$ruta = $ano.'/'.$mes.'/'.$nit.'/'.$recibo.'/Cargue/';
		$path = '/cargue_ftp/Digitalizacion/Genesis/Rips/'.$ruta;
		$estado = 0;
		for ($i=0; $i < count($archivos) ; $i++) {
			$name = $archivos[$i]->name.'_'.$nit;
			$subio = subirRipsFtp($archivos[$i]->src,$path,$name,'txt',$ruta);
			if ($subio != '0 - Error') {
				$rutas[$i]->ruta = $subio;
				$rutas[$i]->archivo = substr($archivos[$i]->name, 0, 2);
				// $rutas[$i](object) array('ruta' => $subio);
				// $rutas[$i](object) array('archivo' => $archivos[$i]->name));
			}else {
				$estado = $estado + 1;
			}
		}
		if($estado == 0){
			echo json_encode($rutas);
		}else{
			echo '0';
		}
	}
	function subirAdjuntoValidacion(){
		require_once('../config/dbcon.php');
		//require_once('../config/ftpcon.php');
		require_once('../config/sftp_con.php');
		include('../../upload_file/subir_adjunto_rips.php');
		include('validar_archivo.php');
		global $request;
		// variables de parametros
		$archivos = json_decode($request->archivos);
		$val_aut = $request->val_aut;
		$nit = $request->nit;
		$recibo = $request->recibo;
		if (isset($archivos) && $archivos != '' && count($archivos) > 0) {
			if (isset($nit) && $nit != '') {
				if (isset($recibo) && $recibo != '') {
					$validar = validar_archivos($archivos, $val_aut);
					//print_r($validar);
					//echo is_array($validar);
					//print_r(json_decode(json_encode($validar)));
					if (count($validar) == 0) {
						// otras variables
						$hoy = date('dmY');
						$mes = date('m');
						$ano = date('Y');
						$ruta = $ano.'/'.$mes.'/'.$nit.'/'.$recibo.'/Cargue/';
						$path = '/cargue_ftp/Digitalizacion/Genesis/Rips/'.$ruta;
						$estado = 0;
						$rutas = array();
						for ($i=0; $i < count($archivos) ; $i++) {
							$name = $archivos[$i]->name.'_'.$nit;
							$subio = subirRipsFtp($archivos[$i]->src,$path,$name,'txt',$ruta);
							if ($subio != '0 - Error') {
								$rutas[$i] = (object) [
									'ruta' => $subio,
									'archivo' => substr($archivos[$i]->name, 0, 2)
								];
								//$rutas[$i]->ruta = $subio;
								//$rutas[$i]->archivo = substr($archivos[$i]->name, 0, 2);
								// $rutas[$i](object) array('ruta' => $subio);
								// $rutas[$i](object) array('archivo' => $archivos[$i]->name));
							}else {
								$estado = $estado + 1;
							}
						}
						if ($estado == 0) {
							//echo json_encode($rutas);
							echo json_encode((object) [
								'codigo' => 0,
								'mensaje' => 'La validacion inicial y el cargue de los archivos se completo exitosamente.',
								//'rutas' => ($rutas)
								'rutas' => json_encode($rutas)
							]);
						} else {
							echo json_encode((object) [
								'codigo' => -4,
								'mensaje' => 'No se subieron correctamente los archivos al servidor.'
							]);
						}
						// echo json_encode((object) [
						// 	'codigo' => 0,
						// 	'mensaje' => 'La validacion inicial de los archivos se completo exitosamente.'
						// ]);
					} else {
						echo json_encode((object) [
							'codigo' => 1,
							'mensaje' => 'Los siguientes archivos presentan errores de estructura.',
							'archivos' => $validar
						]);
					}
				} else {
					echo json_encode((object) [
						'codigo' => -3,
						'mensaje' => 'Numero del recibo no puede estar vacio, intente de nuevo el proceso.'
					]);
				}
			} else {
				echo json_encode((object) [
					'codigo' => -2,
					'mensaje' => 'NIT no puede estar vacio, intente reiniciar la sesion del usuario.'
				]);
			}
		} else {
			echo json_encode((object) [
				'codigo' => -1,
				'mensaje' => 'No se recibieron los archivos, intente seleccionarlos nuevamente.'
			]);
		}
	}
	function subirRutas(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$tipo = $request->tipo;
		$archivo = $request->archivo;
		$valor = $request->valor;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_UI_ARCHIVOS(:v_pnit,
																																	 :v_ptipo,
																																	 :v_parchivos,
																																	 :v_pvalor,
																																	 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		$jsonarchivos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_parchivos', $jsonarchivos, -1, OCI_B_CLOB);
		$jsonarchivos->writeTemporary($archivo);
		oci_bind_by_name($consulta,':v_pvalor',$valor);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function guardarSolicitud(){
		require_once('../config/dbcon.php');
		global $request;
		$archivo = $request->archivos;
		$datos = json_decode($request->datos);
		$nit = $request->nit;
		$responsable = $request->responsable;
		$cantidad = $request->cantidad;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_INSERTA_ARCHIVOS(:v_pnit,
																			:v_parchivos,
																			:v_phabilitacion,
																			:v_pregimen,
																			:v_ptipocontrato,
																			:v_panno,
																			:v_pmes,
																			:v_pmodalidad,
																			:v_precibo,
																			:v_pcantidad,
																			:v_presponsable,
																			:v_pnumero_contrato,
																			:v_pclasecontrato,
																			:v_pubicacion,
																			:v_pnopbs,
																			:v_json_row); end;');

		oci_bind_by_name($consulta,':v_pnit',$nit);
		$jsonarchivos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_parchivos', $jsonarchivos, -1, OCI_B_CLOB);
		$jsonarchivos->writeTemporary($archivo);
		oci_bind_by_name($consulta,':v_phabilitacion',$datos->codigo_habilitacion);
		oci_bind_by_name($consulta,':v_pregimen',$datos->regimen);
		oci_bind_by_name($consulta,':v_ptipocontrato',$datos->tipocontrato);
		oci_bind_by_name($consulta,':v_panno',$datos->anno);
		oci_bind_by_name($consulta,':v_pmes',$datos->mes);
		oci_bind_by_name($consulta,':v_pmodalidad',$datos->modalidad);
		oci_bind_by_name($consulta,':v_precibo',$datos->recibo);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_pnumero_contrato',$datos->contrato);
		oci_bind_by_name($consulta,':v_pclasecontrato',$datos->clasecontrato);
		oci_bind_by_name($consulta,':v_pubicacion',$datos->ubicacion);
		oci_bind_by_name($consulta,':v_pnopbs',$datos->nopbs);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function buscarFacturas(){
	    require_once('../config/dbcon.php');
	    global $request;
	    $nit = $request->nit;
	    $recibo = $request->recibo;
	    $codigo = $request->codigo;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURAS(:v_pcodigo_proceso,:v_pnit,:v_precibo,:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pcodigo_proceso',$codigo);
	    oci_bind_by_name($consulta,':v_pnit',$nit);
	    oci_bind_by_name($consulta,':v_precibo',$recibo);
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

	function ObtenerInformeCapita(){
	    require_once('../config/dbcon.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_INFORME_CAPITA(:v_pcodigo,:v_datos,:v_json_out); end;');
	    oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
	    oci_bind_by_name($consulta,':v_datos',$datos, 4000);
	    oci_bind_by_name($consulta,':v_json_out',$recibo);
	    $clob = oci_new_descriptor($c,OCI_D_LOB);
	    oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
	    oci_execute($consulta,OCI_DEFAULT);
	    if (isset($clob)) {
	      $json = $clob->read($clob->size());
	      echo '{"datos":'.$datos.',"json":'.$json.'}';
	    }else{
	      echo 0;
		}
		// echo $datos;
	    oci_close($c);
	}



    function marcarFacturas(){
		require_once('../config/dbcon.php');
		global $request;
		$cantidad = $request->cantidad;
		$facturas = $request->facturas;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_MARCAR_FACTURAS(:v_json_row_in,
																	   	   :v_pcantidad,
																	   	   :v_json_row_out); end;');
		$jsonfacturas = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row_in', $jsonfacturas, -1, OCI_B_CLOB);
		$jsonfacturas->writeTemporary($facturas);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function obtenerInfoActa(){
		require_once('../config/dbcon.php');
		global $request;
		$codigo_proceso = $request->codigo;
		$codigo_verificacion = $request->verificacion;
		$prestador = $request->prestador;
		$recibo = $request->recibo;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_INFO_ACTA(:v_pproceso,
																			 :v_pcodigo,
																	   	     :v_pprestador,
																	   	     :v_precibo,
																	   	     :v_json_row_1); end;');

		oci_bind_by_name($consulta,':v_pproceso',$codigo_proceso);
		oci_bind_by_name($consulta,':v_pcodigo',$codigo_verificacion);
		oci_bind_by_name($consulta,':v_pprestador',$prestador);
		oci_bind_by_name($consulta,':v_precibo',$recibo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row_1', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function obtenerArchivosArrores(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_CONSOLIDADO_ARCHIVOS_ERROR(:v_pnit,
																	   	     				  :v_json_row); end;');

		oci_bind_by_name($consulta,':v_pnit',$nit);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function obtenerErroresDetalle(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$archivo = 'AF';
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_CONSOLIDADO_ARCHIVOS_ERROR_ESPECIFICO(:v_pnit,
																										 :v_parchivo,
																	   	     				  			 :v_json_row); end;');

		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_parchivo',$archivo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	// new
	function obtener_factura(){
		require_once('../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$habilitacion = $request->habilitacion;
		$recibo = $request->recibo;
		$proceso = $request->proceso;
		$consulta = oci_parse($c, 'begin PQ_GENESIS_RIPS_GA.p_lista_factura_rechazada(:v_pnit,
																					:v_pCCOD_HABILITACION,
																					:v_pVNUMERO_RECIBO,
																					:v_pVCODIGO_PROCESO,
																					:v_pjson_row); end;');

		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pCCOD_HABILITACION',$habilitacion);
		oci_bind_by_name($consulta,':v_pVNUMERO_RECIBO',$recibo);
		oci_bind_by_name($consulta,':v_pVCODIGO_PROCESO',$proceso);
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
	function descargar_archivos(){
		//require_once('../config/ftpcon.php');
		//require_once('../config/sftp_con.php');
		global $request;
		if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
	    	require_once('../config/ftpcon.php');
	  	}
		if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
			require_once('../config/sftp_con.php');
		}
		$file_list = ftp_nlist($con_id, $request->ruta);
		$archivos = array();
		foreach ($file_list as $file){
			// echo "<br>$file";
			$name = uniqid();
			$ext = pathinfo($file, PATHINFO_EXTENSION);
			$name = substr(pathinfo($file, PATHINFO_BASENAME), 0, strrpos(pathinfo($file, PATHINFO_BASENAME), ".")).'.'.$ext;
			$local_file = '../../../temp/'.$name;
			$handle = fopen($local_file, 'w');
			if (ftp_fget($con_id, $handle, $file, FTP_ASCII, 0)) {
				$archivos[] = $name;
			} else {
				$archivos[] = "Error";
			}
		}
		// echo json_encode($archivos);
		$file_names = $archivos;
		$recibo = $request->recibo;
		//Archive name
		$archive_file_name = 'Archivos Cargados '.$recibo.'.zip';

		//Download Files path
		$file_path = '../../../temp/';

		$zip_path = $file_path.$archive_file_name;
		$zip = new ZipArchive();
		if ($zip->open($zip_path, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE) !== TRUE) {
			die ("Se produjo un error al crear su archivo ZIP.");
		}
		foreach ($file_names as $path) {
			$filepath = $file_path . $path;
			if (file_exists($filepath)) {
				$zip->addFile($filepath, $path) or die ("ERROR: No se pudo agregar el archivo $archive_file_name");
			} else {
				die("Archivo $filepath no existe");
			}
		}
		$zip->close();
		echo $archive_file_name;
		ftp_close($con_id);
		// fclose($handle);
	}
	// function enviarMensajeAlMovil(){
	// 	global $request;
	// 	$movil = $request->movil;
	// 	$nombre = $request->nombre;
	// 	$codigo =
	// 	//url de la petición
	// 	$url = 'https://api.infobip.com/sms/1/text/single';
	// 	//inicializamos el objeto CUrl
	// 	$ch = curl_init($url);
	// 	//el json simulamos una petición de un login
	// 	$jsonData = array(
	// 	    'from' => 'CajacopiEPS',
	// 	    'to' => $movil,
	// 	    'text' => 'Sr(a). '.$nombre.' su codigo de desbloqueo es '.$codigo
	// 	);
	// 	$header = array(
	// 	    'Content-Type: application/json',
	// 	    'authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
	// 	    'accept: application/json'
	// 	);
	// 	//creamos el json a partir de nuestro arreglo
	// 	$jsonDataEncoded = json_encode($jsonData);

	// 	//Indicamos que nuestra petición sera Post
	// 	curl_setopt($ch, CURLOPT_POST, 1);

	// 	 //para que la peticion no imprima el resultado como un echo comun, y podamos manipularlo
	// 	 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	// 	//Adjuntamos el json a nuestra petición
	// 	curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

	// 	//Agregamos los encabezados del contenido
	// 	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	// 	//ignorar el certificado, servidor de desarrollo
	// 	//utilicen estas dos lineas si su petición es tipo https y estan en servidor de desarrollo
	// 	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	// 	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

	// 	//Ejecutamos la petición
	// 	$result = curl_exec($ch);
	// 	echo $result;
	// }
  function anular_rip(){
		require_once('../config/dbcon.php');
		global $request;
		$consulta = oci_parse($c, 'begin PQ_GENESIS_RIPS_GA.P_ANULA_RIPS(:v_pcodigo_proceso,
																					:v_pnit,
																					:v_pobservacion,
																					:v_usuario,
																					:v_pjson_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo_proceso',$request->codigo_proceso);
		oci_bind_by_name($consulta,':v_pnit',$request->nit);
		oci_bind_by_name($consulta,':v_pobservacion',$request->obs);
		oci_bind_by_name($consulta,':v_usuario',$request->usuario);
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
