<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Upload()
{
	global $request;
	$hoy = date('Ymd_His');
	$carpeta = date('Ymd');
	$path = 'Cuentasmedicas/notificacionips/' . $carpeta;
	// $path = '/cargue_ftp/Digitalizacion/Genesis/Cuentasmedicas/notificacionips/' . $carpeta . '/';
  $name=$hoy.'.'.$request->ext;
	// $subio = subirArchivoFTP($request->base, $ruta,  $hoy, $request->ext);
  list(, $request->base) = explode(';', $request->base); // Proceso para traer el Base64
  list(, $request->base) = explode(',', $request->base); // Proceso para traer el Base64
  $base64 = base64_decode($request->base); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  include('../sftp_cloud/UploadFile.php');
  $subio = UploadFile($path, $name);
	echo $subio;
}

