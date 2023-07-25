<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaFile()
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
  $path = 'Administrativa/Equipos/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->codigo .  '_' . $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_gestion_equipos()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.P_GESTION_EQUIPOS(:v_pjson_in,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson_in', $request->data);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
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


function p_consulta_equipo_cel()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_consulta_equipo_cel(:cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_consulta_equipo_modem()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_consulta_equipo_modem(:cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}
function p_gestion_modem()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_gestion_modem(:v_pjson_in,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson_in', $request->data);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
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

function p_consulta_linea()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_consulta_linea(:cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_gestion_lineas()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_gestion_lineas(:v_pjson_in,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson_in', $request->data);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
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


function p_trazabilidad_cel()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_trazabilidad_cel(:v_pcodigo,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_trazabilidad_modem()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_trazabilidad_modem(:v_pcodigo,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_trazabilidad_linea()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_trazabilidad_linea(:v_pcodigo,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_consulta_asignacion()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_consulta_asignacion(:cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_acas()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_listar_mesa_ayuda(:v_cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_insertar_asignacion()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_insertar_asignacion(:v_pjson_in,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson_in', $request->data);
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

function p_cargar_soporte()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_actualiza_adjunto(:v_pcodigo,:v_pruta,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
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

function p_acta_entrega()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_acta_entrega(:v_pcodigo,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_exportar_informacion()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_exportar_informacion(:v_cur_conver); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_funcionario()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_gestion_equipos.p_obtener_funcionario(:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->cedula);
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
