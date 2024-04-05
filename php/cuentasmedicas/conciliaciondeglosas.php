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
  // $archivos = json_decode($request->archivos);
  $archivo = $request->base;
  $path = 'Cuentasmedicas/ConciliacionGlosa/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->name .  '_' . $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function listarGlosasIPS()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $tercero = '0';
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_glosa.p_lista_glosas_estado_conc_agru(:v_pempresa,:v_ptercero,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_ptercero', $tercero);
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

function p_genera_conc_porc()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_genera_conc_porc(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pobservacion,:v_pvalor_fd,
  :v_pvalor_mantenido,:v_pporc_gl,:v_pporc_gi,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
  oci_bind_by_name($consulta, ':v_pvalor_fd', $request->valorFD);
  oci_bind_by_name($consulta, ':v_pvalor_mantenido', $request->mantenido);
  oci_bind_by_name($consulta, ':v_pporc_gl', $request->porcentajeGL);
  oci_bind_by_name($consulta, ':v_pporc_gi', $request->porcentajeGI);
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


function listarGlosasIPSDetalle()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  // $nit = '900465319';
  $documento = 'NG';
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin Pq_genesis_glosa.p_lista_glosas_estado_conc(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pconciliada,:v_json_out,:v_result); end;');
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


function guardarValoresGlosaDetalle()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_guardar_servicios_glosas_conc(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_in,
  :v_pcantidad,:v_presponsable,:v_json_out); end;');
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



function generarActaConciliacion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_genera_acta_conciliacion_glo(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_presponsable,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  // if (isset($json) && json_decode($json)->Codigo == 0) {
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

  oci_free_statement($consulta);
  oci_free_statement($cursor);

  // echo json_encode($datos);

  echo '{"cabeza":' . $json . ',"detalle":' . json_encode($datos) . '}';

  // } else {
  //   echo json_encode($json);
  // }
}


function guardarFacturaGlosa()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipo = 'C';
  $consulta = oci_parse($c, 'begin pq_genesis_glosa.p_adjunto_glosa(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptipo,:v_padjunto,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo);
  oci_bind_by_name($consulta, ':v_padjunto', $request->adjunto);
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

function p_agru_acta_conc()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'begin pq_genesis_glosa.p_agru_acta_conc(:v_pempresa,:v_ptercero,:v_responsable,:v_psoporte,:v_pjson_row_in,:v_pcantidad,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_ptercero', $request->nit);
  oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
  oci_bind_by_name($consulta, ':v_psoporte', $request->tipo);
  $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros,  -1, OCI_B_CLOB);
  $json_parametros->writeTemporary($request->datos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_genera_acta_conciliacion_glo_agru()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_genera_acta_conciliacion_glo_agru(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_presponsable,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  // if (isset($json) && json_decode($json)->Codigo == 0) {
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo '{"cabeza":' . $json . ',"detalle":' . json_encode($datos) . '}';

}

function p_adjunto_glosa_agru()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipo = 'C';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_adjunto_glosa_agru(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptipo,:v_padjunto,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo);
  oci_bind_by_name($consulta, ':v_padjunto', $request->adjunto);
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

function p_lista_glosas_estado_conc_agru_1()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $empresa = '1';
  $tercero = '0';
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_glosas_estado_conc_agru_1(:v_pempresa,:v_ptercero,:v_json_out,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_ptercero', $tercero);
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

function P_CONSULTA_PERMISOS_USUARIO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.P_CONSULTA_PERMISOS_USUARIO(:v_pcedula,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
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
