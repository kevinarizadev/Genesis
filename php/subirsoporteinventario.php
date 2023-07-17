<?php
	$ftp_server = "192.168.0.4";
	$con_id = ftp_connect($ftp_server);
	$lr = ftp_login($con_id, "adminwebepss","Cajacopi2018.");
	$ps = ftp_pasv($con_id, true);
	// Nos conectamos al FTP
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die; // Error si no se pudo conectar al FTP
	} else {
		//Preparamos las variables necesarias para subir la imagen al servidor
		$nombre= $_FILES['archivo']['name'];
		$temp = explode(".", $_FILES['archivo']['name']);
		$source_file = $_FILES['archivo']['tmp_name'];
		// Declaramos las variables para la creacion y validacion de las subcarpetas
		$day = date("dmY");
		$path_of_storage = "INVENTARIO/TIC/". $day;
		//Verificamos si la carpeta ha sido creada anteriormente
		if (is_dir('ftp://adminwebepss:Cajacopi2018.@192.168.0.4/'.$path_of_storage) == TRUE) {
			$subio=ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
			if ($subio) {
				echo "1"; //Codigo 1: Imagen subida correctamente a la BD
			}else{
				echo "error " . $_FILES["archivo"]['error'];
			}
		}else{
			//echo $path_of_storage;
			if (ftp_mkdir($con_id, $path_of_storage)) {
				$subio=ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
				if ($subio) {
					echo "1"; //Codigo 1: Imagen subida correctamente a la BD
				}else{
					echo "error " . $_FILES["archivo"]['error']; // Codigo 0: Se presento un error al subir el archivo a la base de datos
				}
			} else {
				echo "2"; // Error creando la carpeta automaticamente
			};
		}

	}
	ftp_close($con_id);
?>
