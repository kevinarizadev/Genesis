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
  $path = 'Planeacion/POA/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->codigo .  '_' . $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function cargarSoporteGestionIndic()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/GestionPeriodo/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}



function p_consulta_usuario()
{
  require_once('../config/dbcon_prod.php');
	$cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_consulta_usuario(:v_presponse); end;');
	oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}


function p_insertar_usuario()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_insertar_usuario(:v_pcedula,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->codigo);
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
function p_actualiza_funcs()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_actualiza_usuario(:v_pcodigo,:v_pestado,:v_ptipo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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

function p_consulta_permisos_usuario()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_consulta_permisos_usuario(:v_pcedula,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_listado_procesos()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_obtener_listado_procesos(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_listado_riesgos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_obtener_listado_riesgos(:v_pproceso,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_listado_indicadores()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_obtener_listado_indicadores(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_lista_indicadores()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_lista_indicadores(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_obtener_tercero()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis.p_obtener_tercero(:v_pcodigo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_ui_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_ui_indicador(:v_pjson,:v_pjson_det,:v_pcantidad_det,:v_paccion,
  :v_pjson_row); end;');

  oci_bind_by_name($consulta, ':v_pjson', $request->datosJson);
  oci_bind_by_name($consulta, ':v_pjson_det', $request->listadoResponsableTabla);
  oci_bind_by_name($consulta, ':v_pcantidad_det', $request->cantidadResponsable);

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

function p_consulta_responsable_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_consulta_responsable_indicador(:v_pbinn_consecutivo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pbinn_consecutivo', $request->consecutivo);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_lista_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_lista_gestion_indicador(:v_pbinn_consecutivo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pbinn_consecutivo', $request->consecutivo);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_ui_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_ui_gestion_indicador(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos);
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

function p_obtener_funcionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_riesgos.p_obtener_funcionario(:v_pfuncionario,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pfuncionario', $request->funcionario);
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
