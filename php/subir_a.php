<?php
require_once('config/ftpcon.php');

if (count($_FILES) === 0) {
	echo json_encode([
		"error" => "No se ha cargado ningún archivo"
	]);
	exit;
}

$nombre = $_FILES['archivo']['name'];
$tokensNombreArchivo = explode(".", $_FILES['archivo']['name']);
$extension = end($tokensNombreArchivo);
$source_file = $_FILES['archivo']['tmp_name'];
$day = date("dmY");
$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/Ausentismo/th/" . $day;
$nombre = sha1($nombre . time()) . '.' . $extension;
if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $path_of_storage) == TRUE) {
    $subio = ftp_put($con_id, $path_of_storage . '/' . $nombre, $source_file, FTP_BINARY);
    if ($subio) {
        header('Content-Type: application/json');
        echo json_encode([
            "ruta" => $path_of_storage,
            "nombre" => $nombre
        ]);
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            "error" => $_FILES["archivo"]['error']
        ]);
    }
} else {
    echo $path_of_storage;
    if (ftp_mkdir($con_id, $path_of_storage)) {
        $subio = ftp_put($con_id, $path_of_storage . '/' . $nombre, $source_file, FTP_BINARY);
        if ($subio) {
            echo json_encode([
                "ruta" => $path_of_storage,
                "nombre" => $nombre
            ]);
        } else {
            header('Content-Type: application/json');
            echo json_encode([
                "error" => $_FILES["archivo"]['error']
            ]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            "error" => "error al crear carpeta"
        ]);
    };
}
ftp_close($con_id);
