<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
  function obtenerOrigenes(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_ORIGEN_ATEN(:v_json_row); end;');
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
  function obtenerUbicacionSolicitud(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_UBICACION_SOL(:v_json_row); end;');
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
  function obtenerTipoServicio(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_TIPO_SOL(:v_json_row); end;');
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
  function obtenerServicios(){
    require_once('../../config/dbcon_prod.php');
    global $request;
		$contrato = $request->contrato;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SERVICIO(:v_pcontrato,:v_json_row); end;');
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
  function obtenerContratos(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $nit = $request->nit;
    $regimen = $request->regimen;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_CONTRATO(:v_ptercero,:v_pregimen,:v_json_row); end;');
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
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
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
  function obtenerNombre(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $documento = $request->documento;
    $tipodocumento = $request->tipodocumento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_AFILIADO(:v_ptipo_doc,:v_pdocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
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
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_IPS(:v_pips,:v_json_row); end;');
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
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO(:v_pcodigo,:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_pcodigo',$producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);
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
  function obtenerResumen(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_RESUMEN(:v_pnumero,:v_pubicacion,:v_json_row); end;');
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
	function obtenersolicitudprint(){
		require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $prestador = $request->prestador;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_INFO_SOLICITUD(:v_pnumero,:v_pprestador,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pprestador',$prestador);
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
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO_NOM(:v_pcodigo,:v_pnit,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$word);
    oci_bind_by_name($consulta,':v_pnit',$_SESSION['nit']);
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
  function eliminarProducto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $renglon = $request->renglon;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_ELIMINA_DETALLE(:v_pnumero,:v_pubicacion,:v_prenglon,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_prenglon',$renglon);
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
	function obtenerAutorizaciones(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$codigo = $request->codigo;
    $estado = $request->estado;
    $nit = $request->nit;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SOLICITUD(:v_pcodigo,:v_pestado,:v_ptercero,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$codigo);
    oci_bind_by_name($consulta,':v_pestado',$estado);
    oci_bind_by_name($consulta,':v_ptercero',$nit);
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
  function insertarSoplicitud(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $data = json_decode($request->data);
    $v_pnumero = 0;
    $v_pubicacion = 0;
    $v_pfuente = 'W';
    $v_pestado = 'A';
    $v_pactividad = 'I';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_UI_ESOA(:v_pnumero,
                                                              :v_pubicacion,
                                                              :v_ptercero,
                                                              :v_ptipo_doc_afiliado,
                                                              :v_pafiliado,
                                                              :v_pingreso,
                                                              :v_porigen_atencion,
                                                              :v_ptipo_servicio,
                                                              :v_pprioridad_atencion,
                                                              :v_ptipo_ubicacion_pte,
                                                              :v_pcontrato,
                                                              :v_pcodigo_servicio,
                                                              :v_pnumero_cama,
                                                              :v_pdiagnostico_ppal,
                                                              :v_pdiagnostico_1,
                                                              :v_pjustificacion_clinica,
                                                              :v_pdocumento_solicitante,
                                                              :v_pfuente,
                                                              :v_pmedico,
                                                              :v_pcargo_medico,
                                                              :v_phijos_de,
                                                              :v_pestado,
                                                              :v_psolicitante,
                                                              :v_pactividad,
                                                              :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$v_pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$v_pubicacion);
    oci_bind_by_name($consulta,':v_ptercero',$data->nit);
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$data->tipodocumento);
    oci_bind_by_name($consulta,':v_pafiliado',$data->documento);
    oci_bind_by_name($consulta,':v_pingreso',$data->fecingreso);
    oci_bind_by_name($consulta,':v_porigen_atencion',$data->origen);
    oci_bind_by_name($consulta,':v_ptipo_servicio',$data->tiposervicio);
    oci_bind_by_name($consulta,':v_pprioridad_atencion',$data->prioridad);
    oci_bind_by_name($consulta,':v_ptipo_ubicacion_pte',$data->ubipaciente);
    oci_bind_by_name($consulta,':v_pcontrato',$data->contrato);
    oci_bind_by_name($consulta,':v_pcodigo_servicio',$data->servicio);
    oci_bind_by_name($consulta,':v_pnumero_cama',$data->cama);
    oci_bind_by_name($consulta,':v_pdiagnostico_ppal',$data->dxprincipal);
    oci_bind_by_name($consulta,':v_pdiagnostico_1',$data->dxsecundario);
    oci_bind_by_name($consulta,':v_pjustificacion_clinica',$data->justificacion);
    oci_bind_by_name($consulta,':v_pdocumento_solicitante',$_SESSION['cedula']);
    oci_bind_by_name($consulta,':v_pfuente',$v_pfuente);
    oci_bind_by_name($consulta,':v_pmedico',$data->medico);
    oci_bind_by_name($consulta,':v_pcargo_medico',$data->cargomedico);
    oci_bind_by_name($consulta,':v_phijos_de',$data->hijode);
    oci_bind_by_name($consulta,':v_pestado',$v_pestado);
    oci_bind_by_name($consulta,':v_psolicitante',$data->codips);
    oci_bind_by_name($consulta,':v_pactividad',$v_pactividad);
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
  function actualizarEncabezado(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $tipodocumento = $request->tipodocumento;
    $documento = $request->documento;
    $fecha = $request->fecha;
    $servicio = $request->servicio;
    $diagnostico = $request->diagnostico;
    $justificacion = $request->justificacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_U_ESOA(:v_pnumero,
                                                              :v_pubicacion,
                                                              :v_ptipo_doc_afiliado,
                                                              :v_pafiliado,
                                                              :v_pingreso,
                                                              :v_pcodigo_servicio,
                                                              :v_pdiagnostico_ppal,
                                                              :v_pjustificacion_clinica,
                                                              :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodocumento);
    oci_bind_by_name($consulta,':v_pafiliado',$documento);
    oci_bind_by_name($consulta,':v_pingreso',$fecha);
    oci_bind_by_name($consulta,':v_pcodigo_servicio',$servicio);
    oci_bind_by_name($consulta,':v_pdiagnostico_ppal',$diagnostico);
    oci_bind_by_name($consulta,':v_pjustificacion_clinica',$justificacion);
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
  function insertarDetalle(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $producto = $request->producto;
    $cantidad = $request->cantidad;
    $renglon = 0;
    $estado = 'P';
    $actividad = 'I';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_UI_ESOA_DETALLE(:v_pnumero,
                                                              :v_pubicacion,
                                                              :v_prenglon,
                                                              :v_pproducto,
                                                              :v_pcantidad,
                                                              :v_pestado,
                                                              :v_pactividad,
                                                              :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_prenglon',$renglon);
    oci_bind_by_name($consulta,':v_pproducto',$producto);
    oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
    oci_bind_by_name($consulta,':v_pestado',$estado);
    oci_bind_by_name($consulta,':v_pactividad',$actividad);
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
	function registrarusuarioips(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$nit =$request->nit;
		$documento_usuario =$request->documento_usuario;
		$nombre_usuario =$request->nombre_usuario;
		$clave =$request->clave;
		$cargo =$request->cargo;
		$pcelular =$request->pcelular;
		$telefono =$request->telefono;
		$correo =$request->correo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS.P_INSERTA_USUARIO(	:v_pnit,
																																	:v_pdocumento_usuario,
																																	:v_pnombre_usuario,
																																	:v_pclave,
																																	:v_pcargo,
																																	:v_pcelular,
																																	:v_ptelefono,
																																	:v_pcorreo,
																																	:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pdocumento_usuario',$documento_usuario);
		oci_bind_by_name($consulta,':v_pnombre_usuario',$nombre_usuario);
		oci_bind_by_name($consulta,':v_pclave',$clave);
		oci_bind_by_name($consulta,':v_pcargo',$cargo);
		oci_bind_by_name($consulta,':v_pcelular',$pcelular);
		oci_bind_by_name($consulta,':v_ptelefono',$telefono);
		oci_bind_by_name($consulta,':v_pcorreo',$correo);
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

	function consultarusuario(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$nit =$request->nit;
		$documento_usuario =$request->documento_usuario;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS.P_OBTENER_USUARIO(	:v_pnit,
																																	:v_pdocumento_usuario,
																																	:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pdocumento_usuario',$documento_usuario);
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
	function actualizarestado(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$documento_usuario =$request->documento_usuario;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS.P_ACTUALIZA_USUARIO(:v_pdocumento_usuario,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento_usuario',$documento_usuario);
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

  function obtenerConsolidadoAutorizadoDia(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $ubicacion =$request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_COSTO_AUT_DIA(:v_pseccional,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$ubicacion);
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

  function obtenerConsolidadoAutorizadoGrupo(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $ubicacion =$request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_COSTO_AUT_DIA_GRUPO(:v_pseccional,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$ubicacion);
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

  function obtenerConsolidadoProyeccionSec(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $anno = $request->anno;
    $periodo = $request->periodo;
    $ubicacion =$request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_TECHO_SEC(:v_panno,
                                                                          :v_pperiodo,
                                                                          :v_seccional,
                                                                          :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
    oci_bind_by_name($consulta,':v_seccional',$ubicacion);
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

?>
