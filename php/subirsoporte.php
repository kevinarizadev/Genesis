<?php
	require_once('config/ftpcon.php');
	$nombre= $_FILES['archivo']['name'];
	$temp = explode(".", $_FILES['archivo']['name']);
	$source_file = $_FILES['archivo']['tmp_name'];
	$day = date("dmY");
	$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/Ausentismo/". $day;
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
		$subio=ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
		if ($subio) {
			echo "1"; 
		}else{
			echo "error " . $_FILES["archivo"]['error'];
		}
	}else{
		echo $path_of_storage;
		if (ftp_mkdir($con_id, $path_of_storage)) {
			$subio=ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
			if ($subio) {
				echo "1"; 
			}else{
				echo "error " . $_FILES["archivo"]['error']; 
			}
		} else {
			echo "2"; 
		};
	}
	ftp_close($con_id);
?>
