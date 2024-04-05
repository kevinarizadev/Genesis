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

function p_lista_glosas_estado_conc_agru_consulta()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_glosa.p_lista_glosas_estado_conc_agru_consulta(:v_pempresa,:v_ptercero,:v_ptipo_cliente,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_ptercero', $request->nit);
  oci_bind_by_name($consulta, ':v_ptipo_cliente', $request->tipo);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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


function p_lista_glosas_estado_conc_consulta()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  // $nit = '900465319';
  $documento = 'NG';
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin Pq_genesis_glosa.p_lista_glosas_estado_conc_consulta(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pconciliada,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pconciliada', $request->marcaConciliada);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function listarGlosasServicios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_servicios_glosas_conc(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

