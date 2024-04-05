<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}

function cargarSoporte()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Cuentasmedicas/NotificacionGlosa/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->codigo .  '_' . $hoy . '.zip';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_lista_glosas_estado_resp_agru()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = 1;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_glosas_estado_resp_agru(:v_pempresa,:v_pnit,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_lista_glosas_estado_resp()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $estado = 1;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_glosas_estado_resp(:v_pestado,:v_pnumero,:v_pubicacion,:v_pnit,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pestado', $estado);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_lista_glosas_estado_resp_detalle()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_glosas_estado_resp_detalle(:v_pnumero,:v_pubicacion,:v_renglon,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_renglon', $request->renglon);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  // echo json_encode($json);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}


function p_guardar_servicios_glosas_resp_ips()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = 1;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_guardar_servicios_glosas_resp_ips(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pruta,:v_pjson_in,:v_pcantidad,:v_presponsable,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pruta', $request->soporte);
  oci_bind_by_name($consulta, ':v_pjson_in', $request->datos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function DescargarNotificacion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $estado = '';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_u_acepta_glosa(:v_pnumero,:v_pubicacion,:v_renglon,:v_presponsable,:v_pobservacion,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_renglon', $request->renglon);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_certificado_notificacion_glosa()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../config/dbcon_produccion.php');
  global $request;
  $Empresa = 1;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_certificado_notificacion_glosa(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_row1,:v_pjson_row2); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $Empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $cursor = oci_new_cursor($c);
  $clob2 = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ":v_pjson_row1", $cursor, -1, OCI_B_CURSOR);

  oci_bind_by_name($consulta, ':v_pjson_row2', $clob2, -1, OCI_B_CLOB);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($clob2)) {
    $json = [];
    oci_fetch_all($cursor, $json, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    // echo json_encode($json);


    $json2 = $clob2->read($clob2->size());

    echo '{"json":' . json_encode($json) . ', "json2":' . $json2 . '}';
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_certificado_notificacion_glosa2()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $Empresa = 1;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_certificado_notificacion_glosa(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_row1,:v_pjson_row2); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $Empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  $clob2 = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row1', $clob, -1, OCI_B_CLOB);
  oci_bind_by_name($consulta, ':v_pjson_row2', $clob2, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $json2 = $clob2->read($clob2->size());

    echo '{"json":' . $json . ', "json2":' . $json2 . '}';
  } else {
    echo 0;
  }
  oci_close($c);
}
