<?php

$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();

	function descargaAdjunto(){
		global $request;
		$fileexists = false;
		if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
			require_once('../config/ftpcon.php'); $fileexists = true;
		  }
		if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
			require_once('../config/sftp_con.php'); $fileexists = true;
		}
	
		if($fileexists) {
			$file_size = ftp_size($con_id, $request->ruta);
			if ($file_size != -1) {
				$ruta = $request->ruta;
				$name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
				// $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
				// $name = $name . '.' . $ext;
				$local_file = '../../temp/' . $name;
				$handle = fopen($local_file, 'w');
				if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
					echo $name;
				} else {
					echo "0 - Error Al descargar el archivo";
				}
				ftp_close($con_id);
				fclose($handle);
			} else {
				echo "0 - Error Archivo no existe";
			}
		} else {
			require('../sftp_cloud/DownloadFile.php');
			echo( DownloadFile($request->ruta) );
		}
	}

?>
