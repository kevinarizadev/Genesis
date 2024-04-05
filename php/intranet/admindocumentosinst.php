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
  $path = 'SGC/Documentos_Inst/'.$request->tipo.'/' . date('dmY');
  $hoy = date('His');
  $name = $request->nombre .  '_' . $hoy . '.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}


function p_lista_documentos_inst()
{
  global $request;
  require_once('../config/dbcon_prod.php');
	$cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_sgc.p_lista_documentos_inst(:v_pestado,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}

function p_ui_documentos_inst()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $datos = json_encode($request->datos);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_sgc.p_ui_documentos_inst(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $datos);
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
