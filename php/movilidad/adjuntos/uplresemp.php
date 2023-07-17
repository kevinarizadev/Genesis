<?php
	// require_once('../../config/ftpcon.php');
	$day = date("dmY");
	$path = $_FILES['archivo']['name'];
	$ext = pathinfo($path, PATHINFO_EXTENSION);
	$name= 'Formulario_'.$_POST['tipo_documento'].'_'.$_POST['documento'].'_'.$day.'.'.$ext;

  $base64 = file_get_contents($_FILES['archivo']['tmp_name']);
  file_put_contents('../../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp

  $ruta = 'Movilidad/' . $day;

  require('../../sftp_cloud/UploadFile.php');
  $subio = UploadFile($ruta, $name);
  if(substr($subio, 0,11) == '/cargue_ftp'){
      echo $subio;
    } else{
      echo "0";
  }

	// $path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/Movilidad/". $day;
	// $nombrebd= $path_of_storage.'/'.$nombre;
	// if (@is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
	// 	$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
	// 	if ($subio) {
	// 		echo $nombrebd;
	// 	}else{
	// 		echo "0";
	// 	}
	// }else{
	// 	if (@ftp_mkdir($con_id, $path_of_storage)) {
	// 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
	// 		if ($subio) {
	// 			echo $nombrebd;
	// 		}else{
	// 			echo "0";
	// 		}
	// 	} else {
	// 		echo "0";
	// 	};
	// }
	// ftp_close($con_id);
?>
