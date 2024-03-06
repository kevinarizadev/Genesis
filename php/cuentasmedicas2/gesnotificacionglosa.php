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

function p_guardar_servicios_glosas_resp_eps()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = 1;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_guardar_servicios_glosas_resp_eps(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_in,:v_pcantidad,:v_presponsable,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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
