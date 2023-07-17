<?php


	function subirDigitalizacionFTP($file,$path,$name,$ext){
		require('../config/ftpcon.php');
		$db_name = $path.$name.'.'.$ext;
		$tmpfile = $name.'.'.$ext;
		list(, $file) = explode(';', $file);
		list(, $file) = explode(',', $file);
		$file = base64_decode($file);
		file_put_contents($tmpfile, $file);
		if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
			$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			if (ftp_mkdir($con_id, $path)) {
				$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
				if ($subio) {
					unlink($tmpfile);
					return $db_name;
				}else{
					unlink($tmpfile);
					return '0 - Error';
				}
			}else{
				return '0';
			}
		}
		ftp_close($con_id);
	}
function subirFTP($file,$path,$name,$ext){
	require('../../config/ftpcon.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}

function subirFTP3($file,$path,$name,$ext){	
	require('../../config/sftp_con.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/'.$path) == TRUE) {
	// if (is_dir('ftp://prueba:Prueb@123#@192.168.50.36/'.$path) == TRUE) {
	// if (true == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);				
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);			
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}


function subirFTP3jeff($file,$path,$name,$ext){	
	require('../config/sftp_con.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/'.$path) == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);				
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);			
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}

function subirArchivoFTP($file,$path,$name,$ext){
	require('../config/ftpcon.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}

function subirArchivoFTP_Demandas($file,$path,$name,$ext){
	require('../../config/ftpcon.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}

function subirFTPIntranet($file,$path,$name,$ext){
	require('../config/ftpcon.php');
	$db_name = $path.$name.'.'.$ext;
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
		$subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		}else{
			unlink($tmpfile);
			return '0 - Error';
		}
	}else{
		if (ftp_mkdir($con_id, $path)) {
			$subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			}else{
				unlink($tmpfile);
				return '0 - Error';
			}
		}else{
			return '0';
		}
	}
	ftp_close($con_id);
}
function subirProyecto($file,$name,$ext){
	require_once('../../config/ftpcon.php');
	$tmpfile = $name.'.'.$ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents('../../../images/versionamiento/'.$tmpfile, $file);
	return 'images/versionamiento/'.$tmpfile;
}
function subirImagen($imagenes,$ext){
	require_once('../config/ftpcon.php');
	$identidicador = uniqid();
	$tmpfile = $identidicador.'.'.$ext;
	list(, $imagenes) = explode(';', $imagenes);
	list(, $imagenes) = explode(',', $imagenes);
	$imagenes = base64_decode($imagenes);
	file_put_contents('../../temp/'.$tmpfile, $imagenes);
	return 'temp/'.$tmpfile;
}

?>