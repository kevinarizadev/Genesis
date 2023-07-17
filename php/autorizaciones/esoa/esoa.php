<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $function = $request->function; 
  $function();  
  function obtenerSolicitud(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_LISTA_SOLICITUD( :v_tipo_doc,
                                                                        :v_pcodigo,
                                                                        :v_pfiltro,
                                                                        :v_json_row
                                                                      ); end;');                                                                      
    oci_bind_by_name($consulta,':v_tipo_doc',$request->tipodocumento);
    oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
    oci_bind_by_name($consulta,':v_pfiltro',$request->filtro);
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
  function obtenerDetalles(){ 
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SOLICITUD_DET(  :v_pnumero,
                                                                              :v_pubicacion,
                                                                              :v_json_row
                                                                           ); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
  function obtenerSolicitud_unica(){ 
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_LISTA_ESOA(  :v_pnumero,
                                                                              :v_pubicacion,
                                                                              :v_json_row
                                                                           ); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
  function obtenerdiagnostico(){    
    require_once('../../config/dbcon_prod.php');
    global $request;
    $coincidencia = $request->coincidencia;
    $sexo = $request->sexo;
    $edad = $request->edad;
    $hijo =  $request->hijo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcie10',$coincidencia);
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
  function actualizar_datos_auto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $fecha = date('d/m/Y', strtotime($request->v_pfecha));
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_GESTIONA_ESOA(:v_pnumero,
                                                                  :v_pubicacion,
                                                                  :v_pubicacionpaciente,
                                                                  :v_pservicio,
                                                                  :v_pfecha,
                                                                  :v_pproductos,
                                                                  :v_pcantidad,
                                                                  :v_pjustificacion,
                                                                  :v_json_row
                                                                ); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
    oci_bind_by_name($consulta,':v_pubicacionpaciente',$request->v_pubicacionpaciente);
    oci_bind_by_name($consulta,':v_pservicio',$request->v_pservicio);
    oci_bind_by_name($consulta,':v_pfecha',$fecha);
    oci_bind_by_name($consulta,':v_pproductos',$request->v_pproductos);
    oci_bind_by_name($consulta,':v_pcantidad',$request->v_pcantidad);
    oci_bind_by_name($consulta,':v_pjustificacion',$request->v_pjustificacion);
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
function p_guarda_esoa()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $fecha = date('d/m/Y', strtotime($request->v_pfecha));
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_GUARDA_ESOA(:v_pnumero,
                                                                  :v_pubicacion,
                                                                  :v_pubicacionpaciente,
                                                                  :v_pservicio,
                                                                  :v_pfecha,
                                                                  :v_pproductos,
                                                                  :v_pcantidad,
                                                                  :v_pjustificacion,
                                                                  :v_json_row
                                                                ); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
  oci_bind_by_name($consulta, ':v_pubicacionpaciente', $request->v_pubicacionpaciente);
  oci_bind_by_name($consulta, ':v_pservicio', $request->v_pservicio);
  oci_bind_by_name($consulta, ':v_pfecha', $fecha);
  oci_bind_by_name($consulta, ':v_pproductos', $request->v_pproductos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->v_pcantidad);
  oci_bind_by_name($consulta, ':v_pjustificacion', $request->v_pjustificacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
  function p_anular_esoa(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_ANULAR_ESOA(:v_pnumero,
                                                                  :v_pubicacion,
                                                                  :v_pmotivo_anulacion, 
                                                                  :v_json_row 
                                                                ); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
    oci_bind_by_name($consulta,':v_pmotivo_anulacion',$request->v_pmotivo_anulacion);    
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

function p_obtener_censo()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_CENSO(:v_pafiliado,
                                                                       :v_pprestador,
                                                                       :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pafiliado', $request->v_pafiliado);
  oci_bind_by_name($consulta, ':v_pprestador', $request->v_pprestador);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo '[{"Codigo":0}]';
  }
  oci_close($c);
}
function obtenerProducto()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $regimen = $request->regimen;
  $contrato = $request->contrato;
  $producto = $request->word;
  $clasificacion = $request->clasificacion;
  $sexo = $request->sexo;
  $edad = $request->edad;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO_INTERNO(:v_pcodigo,
                                                                              :v_pclasificacion,
                                                                              :v_pregimen,
                                                                              :v_pcontrato,
                                                                              :v_edad,
                                                                              :v_sexo,
                                                                              :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pregimen', $regimen);
  oci_bind_by_name($consulta, ':v_pcontrato', $contrato);
  oci_bind_by_name($consulta, ':v_pcodigo', $producto);
  oci_bind_by_name($consulta, ':v_pclasificacion', $clasificacion);
  oci_bind_by_name($consulta, ':v_edad', $edad);
  oci_bind_by_name($consulta, ':v_sexo', $sexo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function P_LISTA_SOLICITUD_AVANZADO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_LISTA_SOLICITUD_AVANZADO(  :v_pautorizacion,
                                                                                :v_json_row
                                                                              ); end;');
  oci_bind_by_name($consulta, ':v_pautorizacion', $request->v_pautorizacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_obtener_estancia() {
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.p_obtener_estancia(:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  if (isset($clob)) {
    $json = $clob -> read($clob -> size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_listar_medicos(){ 
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_LISTAR_MEDICOS(:v_pubicacion,
                                                                    :v_json_row
                                                                  ); end;');  
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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


function p_insertar_censo(){
  require_once('../../config/dbcon.php');
  global $request;
  $data = json_decode($request->censo);  

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_insertar_censo(:v_pautorizacion,
                                                                        :v_pjson_row); end;');

  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->censo);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}


function p_obtener_ips_cantidad_solicitudes() {
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.p_obtener_ips_cantidad_solicitudes(:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  if (isset($clob)) {
    $json = $clob -> read($clob -> size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_llamar_solicitud(){
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_LLAMAR_SOLICITUD(:vp_estado,
                                                                      :vp_nit,
                                                                      :v_json_row
                                                                    ); end;');
  oci_bind_by_name($consulta,':vp_estado',$request->estado);
  oci_bind_by_name($consulta,':vp_nit',$request->nit);
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

function p_liberar_solicitud(){
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_LIBERAR_SOLICITUD(:v_numero,
                                                                      :v_ubicacion,
                                                                      :v_json_row
                                                                    ); end;');
  oci_bind_by_name($consulta,':v_numero',$request->numero);
  oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);
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

function subirArchivoAut(){
  require_once('../../config/dbcon_prod.php');
  require_once('../../upload_file/subir_archivo.php');
  $subir="";
  global $request;  
      if ($request->ext) {
        $file = $request->file;
        $ext = $request->ext;
        $numero = $request->num;
        $ubicacion = $request->ubicacion;                    
        $arhivo =  $request->namefile;    
        $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Web/';  
        $subir = subirFTP3($file,$path,$arhivo,$ext);     
      }else{
       echo 'Extension vacia';
      }
      if ($subir) {
        echo $subir;
      }         
}  

function descaradjunto(){
  require_once('../../config/ftpcon.php');
  global $request;
  $file_size = ftp_size($con_id, $request->ruta);
  if ($file_size != -1) {
    $name = uniqid();
    $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
    $name = $name . '.' . $ext;
    $local_file = '../../../temp/' . $name;
    $handle = fopen($local_file, 'w');
    if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
      echo $name;
    } else {
      echo "Error";
    }
    ftp_close($con_id);
    fclose($handle);
  } else {
    echo "Error";
  }
}




function p_obtener_hospitalizacion() {
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_HOSPITALIZACION(:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  if (isset($clob)) {
    $json = $clob -> read($clob -> size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_motivo_egreso() {
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_MOTIVO_EGRESO(:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  if (isset($clob)) {
    $json = $clob -> read($clob -> size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_obtener_servicio(){
  require_once('../../config/dbcon.php');
  global $request;  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SERVICIO(:v_pcontrato,:v_pdocumento,:v_pubicacioncontrato,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
  oci_bind_by_name($consulta,':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta,':v_pubicacioncontrato', $request->ubicacion);  
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
function p_devolver_solicitud_gestionadas_avanzado(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_DEVOLVER_SOLICITUD_GESTIONADAS_AVANZADO(:v_pautorizacion,
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




