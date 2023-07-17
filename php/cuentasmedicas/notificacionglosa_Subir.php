<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Upload()
{
	error_reporting(0);
	require_once('../config/dbcon.php');
	global $request;
	$hoy = date('Ymd_His');
	$carpeta = date('Ymd');
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/Cuentasmedicas/notificacionips/' . $carpeta . '/';
	$subio = subirArchivoFTP($request->base, $ruta,  $hoy, $request->ext);
	echo $subio;
}

function subirArchivoFTP($file, $path, $name, $ext)
{
	error_reporting(0);
	require('../config/ftpcon.php');
	$db_name = $path . $name . '.' . $ext;
	$tmpfile = $name . '.' . $ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $path) == TRUE) {
		$subio = @ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		} else {
			unlink($tmpfile);
			return '0 - Error';
		}
	} else {
		if (ftp_mkdir($con_id, $path)) {
			$subio = ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			} else {
				unlink($tmpfile);
				return '0 - Error';
			}
		} else {
			return '0';
		}
	}
	ftp_close($con_id);
}

