<?php
  function ftp_mksubdirs($ftpcon,$ftpbasedir,$ftpath){
     @ftp_chdir($ftpcon, $ftpbasedir); // /var/www/uploads
     $parts = explode('/',$ftpath); // 2013/06/11/username
     foreach($parts as $part){
        if(!@ftp_chdir($ftpcon, $part)){
           ftp_mkdir($ftpcon, $part);
           ftp_chdir($ftpcon, $part);
           //ftp_chmod($ftpcon, 0777, $part);
        }
     }
  }
	function subirRipsFtp($file,$path,$name,$ext,$ruta){
		//include('../../config/ftpcon.php');
		include('../../config/sftp_con.php');
		$db_name = $path.$name.'.'.$ext;
		$tmpfile = $name.'.'.$ext;
		list(, $file) = explode(';', $file);
		list(, $file) = explode(',', $file);
		$file = base64_decode($file);
		file_put_contents($tmpfile, $file);
    	ftp_mksubdirs($con_id,'/cargue_ftp/Digitalizacion/Genesis/Rips/',$ruta);
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

  

	function subirProyecto($file,$name,$ext){
		//require_once('../../config/ftpcon.php');
		require_once('../../config/sftp_con.php');
		$tmpfile = $name.'.'.$ext;
		list(, $file) = explode(';', $file);
		list(, $file) = explode(',', $file);
		$file = base64_decode($file);
		file_put_contents('../../../images/versionamiento/'.$tmpfile, $file);
		return 'images/versionamiento/'.$tmpfile;
	}

?>
