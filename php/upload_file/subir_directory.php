<?php
	function subirDirectory($file,$path,$name,$ext){
		require_once('../config/ftpdirect.php');
		$db_name = $path.$name.'.'.$ext;
		$tmpfile = $name.'.'.$ext;
		list(, $file) = explode(';', $file);
		list(, $file) = explode(',', $file);
		$file = base64_decode($file);
		file_put_contents($tmpfile, $file);
		if (is_dir('ftp://oracle:yQtev!2017.@192.168.50.12/'.$path) == TRUE) {
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
					chmod ($path.'/'.$tmpfile,0777);
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


?>
