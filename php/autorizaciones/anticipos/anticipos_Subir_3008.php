<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Upload()
{
	error_reporting(0);
	require_once('../../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	$pdf = 'pdf';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Anticipos/' . $request->carpeta . '/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $pdf);
	echo $subio;
}

function subirArchivoFTP($file, $path, $name, $ext)
{
	error_reporting(0);
	//require('../../config/ftpcon.php');
	require('../../config/sftp_con.php');
	$db_name = $path . $name . '.' . $ext;
	$tmpfile = $name . '.' . $ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	//if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $path) == TRUE) {
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $path) == TRUE) {
		$subio = @ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		} else {
			unlink($tmpfile);
			return '0 - Error1';
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


function Upload_Ant()
{
	error_reporting(0);
	require_once('../../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	$pdf = 'pdf';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Anticipos/' . $request->carpeta . '/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name, $pdf);
	echo $subio;
}
