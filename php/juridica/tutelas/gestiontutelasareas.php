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
  require('../../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}

function cargarSoporte()
{
  // require_once('../config/dbcon.php');
  require('../../sftp_cloud/UploadFile.php');
  global $request;
  // $archivos = json_decode($request->archivos);
  $archivo = $request->base64;
  $path = 'Juridica/Tutelas/GestionAreas/' . $request->tutela;
  $hoy = date('dmY_His');
  $name = $request->tutela .  '_' . $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}


function P_lista_tutela_areas()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  // echo $request->condicion;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.P_lista_tutela_areas(:v_pcondicion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcondicion', $request->condicion);
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

function p_obtener_tutelas_areas()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.P_obtener_tutela_areas(:v_pnumero,:v_pubicacion,:v_prenglon,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
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

function p_ui_areas_tutela()
{
  require_once('../../config/dbcon_prod.php');
  global $request;

  //$funcionario = '';
  $fvencimiento = '';
  $hvencimiento = '';

  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_areas_tutela(:v_pnumero,:v_pubicacion,:v_parea,:v_pfuncionario,:v_pfvencimiento,
	:v_phvencimiento,:v_pobservacion,:v_padjunto,:v_pestado,:v_pgestion,:v_paccion,:v_prenglon,:v_pobservacion_gestion,:v_pobservacion_nacional,:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_parea', $request->area);
  oci_bind_by_name($consulta, ':v_pfuncionario', $request->funcionario);
  oci_bind_by_name($consulta, ':v_pfvencimiento', $fvencimiento);
  oci_bind_by_name($consulta, ':v_phvencimiento', $hvencimiento);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
  oci_bind_by_name($consulta, ':v_padjunto', $request->adjunto);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  oci_bind_by_name($consulta, ':v_pgestion', $request->gestion);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
  oci_bind_by_name($consulta, ':v_pobservacion_gestion', $request->observacion_gestion);
	oci_bind_by_name($consulta, ':v_pobservacion_nacional', $request->observacion_nacional);
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


function p_lista_productos_tut()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_productos_tut(:v_pnumero,:v_pubicacion,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function p_ui_bitacora_areas()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_bitacora_areas(:v_pnumero,:v_pubicacion,:v_prenglon,:v_pobservacion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
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

function p_lista_bitacora_area()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_bitacora_area(:v_pnumero,:v_pubicacion,:v_prenglon,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
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

function v_informe_gestion_areas_tutelas()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_tut.V_INFORME_GESTION_AREAS_TUTELAS(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_actualiza_responsable_gestion()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_actualiza_responsable_gestion(:v_pactual,:v_pnuevo,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pactual', $request->actual);
  oci_bind_by_name($consulta, ':v_pnuevo', $request->nuevo);
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
