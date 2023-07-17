<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function obtenerServicios(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $contrato = $request->contrato;
    $tipo  = $request->tipo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_SERVICIO(:v_pcontrato,:v_ptipo,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
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
  
  function obtenerContratos(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $nit = $request->nit;
    $regimen = $request->regimen;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_CONTRATO(:v_ptercero,:v_pregimen,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptercero',$nit);
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
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
  function obtenerDiagnostico(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo = $request->codigo;
    $sexo = $request->sexo;
    $edad = $request->edad;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcie10',$codigo);
    oci_bind_by_name($consulta,':v_psexo',$sexo);
    oci_bind_by_name($consulta,':v_pedad',$edad);
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
  function obtenerNombreIps(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $ips = $request->ips;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_IPS(:v_pips,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pips',$ips);
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
  function obtenerProducto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $regimen = $request->regimen;
    $contrato = $request->contrato;
    $producto = $request->producto;
    $clasificacion = $request->clasificacion;
    $tipo = $request->tipo;
    $ubicacion=$request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO(:v_pcodigo,:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_ptipo,:v_pubicacion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_pcodigo',$producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);
    oci_bind_by_name($consulta,':v_ptipo',$clasificacion);
    oci_bind_by_name($consulta,':v_pubicacion',$clasificacion);
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

  function insertarSolicitudaut(){
    require_once('../../config/dbcon.php');
    global $request;
    $data = json_decode($request->solicitud);
    $codigoMunicipio=1;
    $ubicacion = 1;

    if (isset($_SESSION['codmunicipio'])) {
     $ubicacion = $_SESSION['codmunicipio'];
    }else{
     $ubicacion = $data->ubicacion;
    }
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_UI_AUTPRO(:v_pubicacion,
                                                                  :v_pnumero,
																					                        :v_ptipo_documento_afiliado,
																					                        :v_pdocumento_afiliado,
																																	:v_pcorreo_afiliado,
																																	:v_pcelular_afiliado,
																					                        :v_pdiagnostico_ppal,
																					                        :v_pdiagnostico_sec,
																					                        :v_pcod_servicio,
																					                        :v_pfecha_orden,
																					                        :v_pjustificacion,
                                                                  :v_pnit,
                                                                  :v_paccion,
																					                        :v_pnit_solicitante,
																					                        :v_presponsable,
																																	:v_pcontrato,
																																	:v_pcontratodocumento,
                                                                  :v_pcontratoubicacion,
                                                                  :v_pfecha_programacion,
                                                                  :v_pdireccion,
                                                                  :v_porigen,
                                                                  :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$data->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_ptipo_documento_afiliado',$data->tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento_afiliado',$data->documento);
		oci_bind_by_name($consulta,':v_pcorreo_afiliado',$data->email);
		oci_bind_by_name($consulta,':v_pcelular_afiliado',$data->celular);
    oci_bind_by_name($consulta,':v_pdiagnostico_ppal',$data->diagcod1);
    oci_bind_by_name($consulta,':v_pdiagnostico_sec',$data->diagcod2);
    oci_bind_by_name($consulta,':v_pcod_servicio',$data->codservicio);
    oci_bind_by_name($consulta,':v_pfecha_orden',$data->fecsolicitudparseada);
    oci_bind_by_name($consulta,':v_pjustificacion',$data->justificacion);
    oci_bind_by_name($consulta,':v_pnit',$data->ipscodasignada);
    oci_bind_by_name($consulta,':v_paccion',$data->accion);
    oci_bind_by_name($consulta,':v_pnit_solicitante',$data->ipscodsolicitante);
    oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pcontrato',$data->contrato);
		oci_bind_by_name($consulta,':v_pcontratodocumento',$data->contratoDocumento);
    oci_bind_by_name($consulta,':v_pcontratoubicacion',$data->contratoUbicacion);
    oci_bind_by_name($consulta,':v_pfecha_programacion',$data->fecprogramacionparseada);
    oci_bind_by_name($consulta,':v_pdireccion',$data->direccion);
    oci_bind_by_name($consulta,':v_porigen',$data->origen);
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
	function insertarDetalle(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$productos = $request->productos;
		$cantidad = $request->cantidad;
		$numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $accion = $request->accion;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_INSERTAR_PRODUCTO(:v_pproductos,
																																	 				 :v_pcantidad,
																																	 				 :v_pnumero,
                                                                            :v_pubicacion,
                                                                            :v_paccion,
																																	 				 :v_pjson_row); end;');
		$jsonproductos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pproductos', $jsonproductos, -1, OCI_B_CLOB);
		$jsonproductos->writeTemporary($productos);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_paccion',$accion);    
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
    function ConsultarAfiliado(){
    require_once('../../config/dbcon.php');
    global $request;
    $tipo = $request->tipo;
    $numero = $request->numero;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_INFORMACION_BASICA_AFILIADO(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipo);
    oci_bind_by_name($consulta,':v_pdocumento',$numero);
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
  function obtener_techo (){
    require_once('../../config/dbcon.php');
		global $request;
    $anno = $request->anno;
    $periodo = $request->periodo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_TECHO(:v_panno,:v_pperiodo,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
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
  function actualizar_techo (){
    require_once('../../config/dbcon.php');
		global $request;
    $seccional = $request->seccional;
    $anno = $request->anno;
    $valor = $request->valor;
    $accion = $request->accion;
    $periodo = $request->periodo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_ACTUALIZA_TECHO(:v_pseccional,:v_panno,:v_pperiodo,:v_pvalor, :v_paccion,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
    oci_bind_by_name($consulta,':v_pvalor',$valor);
    oci_bind_by_name($consulta,':v_paccion',$accion);
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

  function obtener_detalle_techo (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->seccional;
    $anno = $request->anno;
    $periodo = $request->periodo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUD_TECHO(:v_pseccional,:v_panno,:v_pperiodo,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
    oci_bind_by_name($consulta,':v_panno',$anno);      
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
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

  
  

  function obtener_seccionales_aut_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MUN_AUTORIZACIONES_ACTIVAS_2(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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
  function obtener_aut_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_AUTORIZACIONES_ACTIVAS_2(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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
 

  function findproducto(){
		require_once('../../config/dbcon_prod.php');
    global $request;
    $word = $request->word;
    $nit = $request->nit;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO_NOM(:v_pcodigo,:v_pnit,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$word);
    oci_bind_by_name($consulta,':v_pnit', $nit);
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

  function obtenerDetalleAut(){
    require_once('../../config/dbcon.php');
    global $request;
    $producto = $request->producto;
    $ubicacion = $request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DETALLE_AUT(:v_pnumero,:v_pubicacion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$producto);
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


?>
