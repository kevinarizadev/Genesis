<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function subir()
{
	// require_once('./config/dbcon_login.php');
	global $request;
	$ext = (explode('/', $request->base64))[1];
	if (strtoupper(substr($ext, 0, 3)) == 'PDF') {
		list(, $request->base64) = explode(';', $request->base64); // Proceso para traer el Base64
		list(, $request->base64) = explode(',', $request->base64); // Proceso para traer el Base64
		$base64 = base64_decode($request->base64); // Proceso para traer el Base64
		$name = $request->name . '.' . substr($ext, 0, 3);
		file_put_contents('../../temp/' . $name, $base64);
		$path = 'SARLAFT/' . $request->carpeta;
		// echo $path;
		// echo $name;
		require('../sftp_cloud/UploadFile.php');
		$subio = UploadFile($path, $name);
		echo $subio;
	} else {
		echo ('NO');
	}
}
