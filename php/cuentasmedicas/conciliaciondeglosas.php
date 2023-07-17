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
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_genera_conc_porc(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pvalor_fd,
  :v_pporc_gl,:v_pporc_gi,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pvalor_fd', $request->valorFD);
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
  :v_pcantidad,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pjson_in', $request->datos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
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
  // var_dump($request);
  // $documento = 'FD';
  // $numero = 13097;
  // $ubicacion = 8001;
  // $responsable = 1042454684;
  // $adjunto = '/cargue_ftp/Digitalizacion/Genesis/Cuentasmedicas/ConciliacionGlosa/';

  $consulta = oci_parse($c, 'begin pq_genesis_glosa.p_adjunto_glosa(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_padjunto,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_padjunto', $request->adjunto);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  // oci_bind_by_name($consulta, ':v_pdocumento', $documento);
  // oci_bind_by_name($consulta, ':v_pnumero', $numero);
  // oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
  // oci_bind_by_name($consulta, ':v_presponsable', $responsable);
  // oci_bind_by_name($consulta, ':v_padjunto', $adjunto);
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
