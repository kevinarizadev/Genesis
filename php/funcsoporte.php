<?php

require('./genesis/utils.php');

$files = filter_var_array($_FILES);
$path = filter_input(INPUT_GET, 'path');

if (count($files) > 0) {
    $extension = explode('.', $files['soporte']['name'])[1];
    $resultado = subirArchivoFTP($files['soporte']['tmp_name'], $path, hash('sha256', $files['soporte']['name'] . time()) . '.' . $extension, true);

    if ($resultado === true) {
        if (existeArchivoFTP($path, hash('sha256', $files['soporte']['name'] . time()) . '.' . $extension)) {
            echo json_encode([
                'data' => $path . hash('sha256', $files['soporte']['name'] . time()) . '.' . $extension
            ]);
        } else {
            echo json_encode([
                'error' => [
                    'message' => 'No se pudo cargar el archivo'
                ]
            ]);
        }
        
    } else {
        echo json_encode([
            'error' => [
                'message' => 'No se pudo cargar el archivo'
            ]
        ]);
    }
} else {
    if ($path !== null) {
        $tokens = explode('/', strrev($path), 2);
        $tokens = array_map(function ($token) {
            return strrev($token);
        }, $tokens);

        if (existeArchivoFTP($tokens[1] . '/', $tokens[0])) {
            $extension = explode('.', $tokens[0])[1];
            if (strtoupper($extension) === "PNG") {
                header('Content-Type: image/png');
            } elseif (strtoupper($extension) === "JPG") {
                header('Content-Type: image/jpg');
            } elseif (strtoupper($extension) === "PDF") {
                header('Content-Type: application/pdf');
            }
            // echo descargarArchivo($tokens[1] . '/', $tokens[0]);
            echo file_get_contents(descargarArchivo($tokens[1] . '/', $tokens[0]));
        } else {
            http_response_code(404);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            'data' => [
                'message' => 'No se han cargado archivos'
            ]
        ]);
    }
}
