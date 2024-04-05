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

function p_reversa_ng()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = 1;
  $documento = 'NG';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_reversa_ng(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_presponsable,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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


function P_INSERTAR_USUARIO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_INSERTAR_USUARIO(:v_pcedula,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function P_ACTUALIZA_USUARIO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_ACTUALIZA_USUARIO(:v_pcedula,:v_pestado,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function P_CONSULTA_PERMISOS_USUARIO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_CONSULTA_PERMISOS_USUARIO(:v_pcedula,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  // oci_bind_by_name($consulta, ':v_pcedula', $cedula);
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

function P_ACTUALIZA_PRESTADOR()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_ACTUALIZA_PRESTADOR(:v_pnit,:v_pestado,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function P_CONSULTA_PERMISOS_IPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_CONSULTA_PERMISOS_IPS(:v_presponse); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  // echo json_encode($json);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function P_CONSULTA_FACTURA()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_CONSULTA_FACTURA(:v_pnit,:v_pfactura,:v_pdoc_documento,:v_pdoc_numero,:v_pdoc_ubicacion); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_pfactura', $request->factura);

  oci_bind_by_name($consulta, ':v_pdoc_documento', $v_pdoc_documento, 20);
  oci_bind_by_name($consulta, ':v_pdoc_numero', $v_pdoc_numero, 20);
  oci_bind_by_name($consulta, ':v_pdoc_ubicacion', $v_pdoc_ubicacion, 20);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($v_pdoc_documento)) {
    $json = trim($v_pdoc_documento).'-'.$v_pdoc_numero.'-'.$v_pdoc_ubicacion;
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

