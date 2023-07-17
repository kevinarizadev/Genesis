<?php
	require_once('../../config/ftpcon.php');
	$day = date("dmY");
	$path = $_FILES['archivo']['name'];
	$ext = pathinfo($path, PATHINFO_EXTENSION);
	$nombre= 'Formulario_'.$_POST['tipo_documento'].'_'.$_POST['documento'].'_'.$day.'.'.$ext;
	$source_file = $_FILES['archivo']['tmp_name'];
	$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/Movilidad/". $day;
	$nombrebd= $path_of_storage.'/'.$nombre;
	if (@is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
		if ($subio) {
			echo $nombrebd;
		}else{
			echo "0";
		}
	}else{
		if (@ftp_mkdir($con_id, $path_of_storage)) {
			$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
			if ($subio) {
				echo $nombrebd;
			}else{
				echo "0";
			}
		} else {
			echo "0";
		};			
	}
	ftp_close($con_id);
?>