
 <?php
  // error_reporting(0);
  header("Content-Type: text/html;charset=utf-8");
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $function = $request->function;
  $function();

  //GUARDA ARCHIVOS AL FTP NUBE
  function guardarAdjuntosDemandas()
  {
    global $request;
    $hoy = date('dmY');
    $hoy2 = date('dmYHi');
    $path = 'Juridica/Demandas/'.$hoy;
    $ext =  $request->ext;
    $name = $hoy2 . '.' . $ext;
    $archivos = $request->data;
    list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
    list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
    $base64 = base64_decode($archivos); // Proceso para traer el Base64
    file_put_contents('../../../temp/' . $name, $base64);
    require('../../sftp_cloud/UploadFile.php');
    $subio = UploadFile($path, $name);

    explode('-', $subio);
    if ($subio[0] != '0') {
      echo $subio;
    } else {
      echo '0';
    }
  }

  //GUARDA ARCHIVOS AL FTP
  // function guardarAdjuntosDemandas(){
  //     require_once('../../config/dbcon_prod.php');
  //     //require_once('../../config/ftpcon.php');
  //     include('../../upload_file/subir_archivo_juridica.php');
  //     global $request;
  //     $hoy = date('dmY');
  //     $path = '/cargue_ftp/Digitalizacion/Genesis/Juridica/Demandas/'.$hoy.'/';
  //     $data = $request->data;
  //     $ext = $request->ext;
  //     $subio = subirArchivoFTP_Demandas($data,$path,uniqid(),$ext);
  //     if ($subio != '0') {
  //          echo $subio;
  //     }else {
  //         echo '0';
  //     }
  // }

  //DESCARGAR ADJUNTOS FTP
  function descargaAdjunto()
  {
    global $request;
    $fileexists = false;

    if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
      require_once('../../config/ftpcon.php');
      $fileexists = true;
    }
    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
      require_once('../../config/sftp_con.php');
      $fileexists = true;
    }

    if($fileexists) {
      $file_size = ftp_size($con_id, $request->ruta);
      if ($file_size != -1) {
        // $ruta = $request->ruta;
        $name = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
        // $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
        // $name = $name;
        $local_file = '../../../temp/' . $name;
        $handle = fopen($local_file, 'w');
        if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
          echo $name;
        } else {
          echo "0 - Error Al descargar el archivo";
        }
        ftp_close($con_id);
        fclose($handle);
      } else {
        echo "0 - Error Archivo no existe";
      }
    } else {
      require('../../sftp_cloud/DownloadFile.php');
      echo( DownloadFile($request->ruta) );
    }
  }

  //BUSQUEDA DE DEMANDANTE
  function buscarDemandante()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $documento = $request->documento;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DEMANDAS.P_BUSQUEDA_DEMANDANTE(:v_pnumero_documento,:v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_pnumero_documento', $documento);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function BuscarApoderadoDemandado()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $documento = $request->documento;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DEMANDAS.P_BUSQUEDA_APODERADO(:v_cedula,:v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_cedula', $documento);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaDepartamentos()
  {
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'begin pq_genesis_parametros.p_lista_departamentos(:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaMunicipios()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    // $departamento='8000';
    // var_dump($departamento);
    $consulta = oci_parse($c, 'begin pq_genesis_parametros.p_lista_municipios(:v_departamento,:v_respuesta); end;');
    // oci_bind_by_name($consulta,':v_departamento',$departamento);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_departamento', $request->departamento);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listatiposjurisdiccion()
  {
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_tipos_jurisdiccion(:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listatiposprocesos()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    //echo ($request->tipojurisdiccion);
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_tipos_proceso(:v_jurisdiccion,:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_jurisdiccion', $request->tipojurisdiccion);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function registraDemanda()
  {
    require_once('../../config/dbcon.php');
    global $request;
    $dataRegistro = json_decode($request->dataRegistro);
    $numero = '';
    if ($dataRegistro->actividad == 'U') {
      $numero = $dataRegistro->codigo_demanda;
      //$dataRegistro->ubicmunicipio = $dataRegistro->ubicacion;
      // $dataRegistro->estado = $dataRegistro->ubicacion;
    }
    // echo ($_SESSION['cedula']);
    // echo($dataRegistro->estado);
    // echo($dataRegistrodemte);
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_uid_demanda(:v_accion,
																		  :v_numero,
																		  :v_ubicacion,
																		  :v_juzgado,
																		  :v_radicacion,
																		  :v_codigo_jurisdiccion,
																		  :v_codigo_tipo_proceso,
																		  :v_descripcion,
																		  :v_cuantia,
																		  :v_usuario_registro,
																		  :v_demandantes,
																		  :v_cantidad_demandantes,
																		  :v_demandados,
																		  :v_cantidad_demandados,
																		  :v_apoderados,
																		  :v_estado,
																		  :v_probabilidad,
																		  :v_resultado,
																		  :v_provision,
																		  :v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_accion', $dataRegistro->actividad);
    oci_bind_by_name($consulta, ':v_numero', $numero);
    oci_bind_by_name($consulta, ':v_ubicacion', $dataRegistro->ubicmunicipio);
    oci_bind_by_name($consulta, ':v_juzgado', $dataRegistro->juzgado);
    oci_bind_by_name($consulta, ':v_radicacion', $dataRegistro->radicacion);
    oci_bind_by_name($consulta, ':v_codigo_jurisdiccion', $dataRegistro->tipojurisdiccion);
    oci_bind_by_name($consulta, ':v_codigo_tipo_proceso', $dataRegistro->tipoproceso);
    oci_bind_by_name($consulta, ':v_descripcion', $dataRegistro->descripcion);
    oci_bind_by_name($consulta, ':v_cuantia', $dataRegistro->cuantia);
    //oci_bind_by_name($consulta,':v_prob_perdida',$dataRegistro->probabilidad);
    oci_bind_by_name($consulta, ':v_usuario_registro', $_SESSION['cedula']);
    oci_bind_by_name($consulta, ':v_cantidad_demandantes', $dataRegistro->cantdemandantes);
    oci_bind_by_name($consulta, ':v_cantidad_demandados', $dataRegistro->cantdemandados);
    //oci_bind_by_name($consulta,':v_fecha_embargo',$dataRegistro->tempFechaRecEmbargo);
    //oci_bind_by_name($consulta,':v_valor_embargo',$dataRegistro->valorembargo);
    //oci_bind_by_name($consulta,':v_fecha_desembargo',$dataRegistro->tempFechaDesembargo);
    oci_bind_by_name($consulta, ':v_estado', $dataRegistro->estado);
    oci_bind_by_name($consulta, ':v_probabilidad', $dataRegistro->probabilidad_n);
    oci_bind_by_name($consulta, ':v_resultado', $dataRegistro->resultado);
    oci_bind_by_name($consulta, ':v_provision', $dataRegistro->provision);
    $jsondemandantess = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_demandantes', $jsondemandantess, -1, OCI_B_CLOB);
    $jsondemandantess->writeTemporary($dataRegistro->jsondemandantes);

    $jsondemandadoss = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_demandados', $jsondemandadoss, -1, OCI_B_CLOB);
    $jsondemandadoss->writeTemporary($dataRegistro->jsondemandados);

    $jsonapoderados = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_apoderados', $jsonapoderados, -1, OCI_B_CLOB);
    $jsonapoderados->writeTemporary($dataRegistro->jsonapoderado);

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);

    oci_execute($consulta, OCI_DEFAULT);
    $respuesta = $clob->read($clob->size());
    echo $respuesta;
    oci_close($c);
  }

  function obtenerdemanda()
  {
    require_once('../../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_obtener_demanda(:v_codigo_demanda,:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_codigo_demanda', $request->numerodemanda);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function registraactuacion()
  {
    require_once('../../config/dbcon.php');
    global $request;
    // echo($request);
    $accion = $request->accion;
    $codigo_actuacion = "";
    $codigo_demanda = $request->codigo_demanda;
    $fecha = $request->fecha;
    $nombre = $request->nombre;
    $descripcion = $request->descripcion;
    $tipo_archivo = $request->tipo_archivo;
    if ($request->tipo_archivo == 'A') {
      $ruta_archivo = $request->ruta;
    } else {
      $ruta_archivo = $request->url;
    }
    // echo($request->dataRegistro);
    // echo($request->accion);
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_uid_actuacion(:v_accion,
																	:v_codigo_actuacion,
																	:v_codigo_demanda,
																	:v_fecha_actuacion,
																	:v_nombre,
																	:v_descripcion,
																	:v_ruta_archivo,
																	:v_tipo_archivo,
																	:v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_accion', $accion);
    oci_bind_by_name($consulta, ':v_codigo_actuacion', $codigo_actuacion);
    oci_bind_by_name($consulta, ':v_codigo_demanda', $codigo_demanda);
    oci_bind_by_name($consulta, ':v_fecha_actuacion', $fecha);
    oci_bind_by_name($consulta, ':v_nombre', $nombre);
    oci_bind_by_name($consulta, ':v_descripcion', $descripcion);
    oci_bind_by_name($consulta, ':v_ruta_archivo', $ruta_archivo);
    oci_bind_by_name($consulta, ':v_tipo_archivo', $tipo_archivo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $respuesta = $clob->read($clob->size());
    echo $respuesta;
    oci_close($c);
  }

  function registrarEstado()
  {
    require_once('../../config/dbcon.php');
    global $request;
    // echo ($request->codigo_demanda);
    $codigo_demanda = $request->codigo_demanda;
    $estado = $request->estado;
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_inserta_bitacora_estado (:v_demanda,
																	:v_estado,
																	:v_responsable,
																	:v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_demanda', $codigo_demanda);
    oci_bind_by_name($consulta, ':v_estado', $estado);
    oci_bind_by_name($consulta, ':v_responsable', $_SESSION['cedula']);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $respuesta = $clob->read($clob->size());
    echo $respuesta;
    oci_close($c);
  }

  function listaactuaciones()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    //echo ($request->tipojurisdiccion);
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_actuaciones(:v_codigo_demanda,:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_codigo_demanda', $request->codigo_demanda);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaEstados()
  {
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_estado_actual(:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaBitacora()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_bitacora_estado (:v_demanda, :v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_demanda', $request->codigo_demanda);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaBitacoraMedida()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_traza_medida_cautelar (:v_demanda, :v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_demanda', $request->codigo_demanda);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function listaMedidasCautelar()
  {
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_tipos_medida_cautelar (:v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function registraMedidaCautelar()
  {
    require_once('../../config/dbcon.php');
    global $request;
    // echo($request);
    // $dataRegistroMedida = json_decode($request->dataRegistroMedidas);
    // echo ($_SESSION['cedula']);
    // echo($dataRegistro->estado);
    // echo($request->medida);
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_inserta_medida_cautelar (:v_demanda,
																		  :v_medida,
																		  :v_cantidad,
																		  :v_monto,
																		  :v_estado_medida,
																		  :v_descripcion,
																		  :v_ruta,
																		  :v_responsable,
																		  :v_respuesta); end;');
    oci_bind_by_name($consulta, ':v_demanda', $request->codigo_demanda);
    // oci_bind_by_name($consulta,':v_medida',$request->medida);
    $jsonmedidas = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_medida', $jsonmedidas, -1, OCI_B_CLOB);
    $jsonmedidas->writeTemporary($request->medida);
    oci_bind_by_name($consulta, ':v_cantidad', $request->cantidad);
    oci_bind_by_name($consulta, ':v_monto', $request->monto);
    oci_bind_by_name($consulta, ':v_estado_medida', $request->estado);
    oci_bind_by_name($consulta, ':v_descripcion', $request->descripcion);
    oci_bind_by_name($consulta, ':v_ruta', $request->ruta);
    oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
    // oci_bind_by_name($consulta,':v_responsable',$_SESSION['cedula']);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $respuesta = $clob->read($clob->size());
    echo $respuesta;
    oci_close($c);
  }

  function listaDetalleMedidaCautelar()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin pq_genesis_demandas.p_lista_medida_cautelar (:v_demanda, :v_respuesta); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_demanda', $request->codigo_demanda);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }
  ?>
