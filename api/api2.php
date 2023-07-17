<?php
    header("Content-Type: text/html;charset=utf-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: text/html;charset=utf-8");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


   function p_mostrar_detalle_autorizacion()
    {
        global $request;
      require('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin PQ_AUTORIZACION_WS.P_CONSULTA_QR_AUT (:v_pnum_autorizacion,:v_pubicacion,:v_prespuesta); end;');
      oci_bind_by_name($consulta, ':v_pnum_autorizacion', $request->num_autorizacion);
      oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());

      oci_close($c);

      echo $json;
      exit;
    }

    function p_mostrar_afiliado_ips()
    {
        global $request;
      require('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_afiliado_ips (:v_ptipo_documento,:v_pdocumento,:v_prespuesta); end;');
      oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
      oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());

      oci_close($c);

      echo $json;
      exit;
    }



function p_mostrar_nucleo()
{
    global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_nucleo (:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function p_mostrar_soporte_doc()
{
    global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_soporte_doc (:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  oci_close($c);
  echo $json;
  exit;
}

function descargaAdjuntoftp(){
    require_once('../php/config/ftpcon.php');
    global $request;
    $name = uniqid();
    $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
    $name = $name.'.'.$ext;
    $local_file = '../temp/'.$name;
    $handle = fopen($local_file, 'w');
      $my_data = new stdClass();
    if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
      $my_data->codigo= "0";
      $my_data->nombre= $name;
        $out_data=json_encode($my_data);
        echo $out_data;
    } else {
      $my_data->codigo= "1";
      $my_data->nombre= "Error";
      echo $my_data;
    }
    ftp_close($con_id);
    fclose($handle);
  }
function descargaAdjuntoftp3(){
    require_once('../php/config/sftp_con.php');
    global $request;
    $name = uniqid();
    $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
    $name = $name.'.'.$ext;
    $local_file = '../temp/'.$name;
    $handle = fopen($local_file, 'w');
    $my_data = new stdClass();
    if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
      $my_data->codigo= "0";
      $my_data->nombre= $name;
        $out_data=json_encode($my_data);
        echo $out_data;
    } else {
      $my_data->codigo= "1";
      $my_data->nombre= "Error";
      echo $my_data;
    }
    ftp_close($con_id);
    fclose($handle);
  }


function obtenerMotivosEspecificos_tiposol()
{
    global $request;
    require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_ESPECIFICO_TIPOSOL(:v_tiposol,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_tiposol', $request->tiposol);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function p_obtener_pqr()
{
    global $request;
    require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_obtener_pqr(:v_pestado,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}


function p_obtener_pqr_afiliado()
{
    global $request;
    require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_obtener_pqr_afiliado(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}


function p_lista_afiliados_cursovida2()
{
    global $request;
    require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_lista_afiliados_cursovida(:v_pidcampana,:v_pubicacion,:v_pcant_ubicacion,:v_pcurso_vida,:v_pcant_curso,:v_presponsable, :v_json_out); end;');

  oci_bind_by_name($consulta, ':v_pidcampana', $request->id_campana);

  $ubicacion = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion, -1, OCI_B_CLOB);
  $ubicacion->writeTemporary($request->ubicacion);

  oci_bind_by_name($consulta, ':v_pcant_ubicacion', $request->cant_ubicacion);

  $curso_vida = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcurso_vida', $curso_vida, -1, OCI_B_CLOB);
  $curso_vida->writeTemporary($request->curso_vida);

  oci_bind_by_name($consulta, ':v_pcant_curso', $request->cant_curso);

  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}


function p_actualiza_direccion()
{
  global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_actualiza_direccion(:v_json_datos, :v_json_out); end;');


  $datos = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_datos', $datos, -1, OCI_B_CLOB);
  $ubicacion->writeTemporary($request->datos);

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function insertarDatosPqr() {
  require('../php/config/dbcon_login.php');
  global $request;
  $jsonpqr = '['.$request->pqr.']';
  $json_data = json_decode($request->pqr);
  $type = $request->action;
  $numero = $request->numero;
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
  echo $bd_response;
  oci_close($c);
}


function p_listar_patologias_seguimiento()
{
    global $request;


  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.P_LISTAR_PATOLOGIAS_SEGUIMIENTO (:v_ptipo_doc,:v_pnumdoc,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_doc', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pnumdoc', $request->documento);

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}




function p_obtener_afiliados_cursovida()
{
    global $request;
    require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_obtener_afiliados_cursovida(:v_pidcampana,:v_pubicacion,:v_pcant_ubicacion,:v_pcurso_vida,:v_pcant_curso,:v_presponsable, :v_ptipodoc, :v_pdocumento, :v_json_out); end;');

  oci_bind_by_name($consulta, ':v_pidcampana', $request->id_campana);

  $ubicacion = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion, -1, OCI_B_CLOB);
  $ubicacion->writeTemporary($request->ubicacion);

  oci_bind_by_name($consulta, ':v_pcant_ubicacion', $request->cant_ubicacion);

  $curso_vida = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcurso_vida', $curso_vida, -1, OCI_B_CLOB);
  $curso_vida->writeTemporary($request->curso_vida);

  oci_bind_by_name($consulta, ':v_pcant_curso', $request->cant_curso);

  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  oci_bind_by_name($consulta, ':v_ptipodoc', $request->v_ptipodoc);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function obtenerMediosRecepcionTipo() {
  require_once('../php/config/dbcon_login.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MEDIOS_TIPO(:v_ptipo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo',$request->tipo);
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



 function p_obtener_pqr_avanzado(){
  require_once('../php/config/dbcon_login.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_AVANZADO(:v_pjson_row_in,
                                      :v_pjson_row_out); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
  $jsonin->writeTemporary($request->jsonpqr);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
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
