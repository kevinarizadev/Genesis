<?php

if (count($_FILES) === 0) {
	echo json_encode([
		"error" => "No se ha cargado ningún archivo"
	]);
	exit;
}

$nombre = $_FILES['archivo']['name'];
$tokensNombreArchivo = explode(".", $_FILES['archivo']['name']);
$extension = end($tokensNombreArchivo);
// $source_file = $_FILES['archivo']['tmp_name'];
// $day = date("dmY");
// $path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/Ausentismo/th/" . $day;
$name = sha1($nombre . time()) . '.' . $extension;

$base64 = file_get_contents($_FILES['archivo']['tmp_name']);
file_put_contents('../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp


require('./sftp_cloud/UploadFile.php');
$subio = UploadFile($path, $name);

if ($subio) {
  header('Content-Type: application/json');
  echo json_encode([
      "ruta" => $subio,
      "nombre" => $name
  ]);
} else {
  header('Content-Type: application/json');
  echo json_encode([
      "error" => $_FILES["archivo"]['error']
  ]);
}

// ftp_close($con_id);
