<?php
	function subirFTP($file,$path,$name,$ext){
		$ftp_server = "192.168.50.10";
		$con_id = ftp_connect($ftp_server);
		$lr = ftp_login($con_id, "ftp_genesis","Senador2019!");
		$ps = ftp_pasv($con_id, true);
		if ((!$con_id) || (!$lr)) {
			echo "Fallo en la conexión"; die;
		} 
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
		
?>