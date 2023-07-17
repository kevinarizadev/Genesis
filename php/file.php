<?php

require('./genesis/utils.php');

$informacionArchivo = filter_input(INPUT_GET, 'data');

if (!isset($informacionArchivo) || $informacionArchivo === null || $informacionArchivo === '') {
    http_response_code(400);
    echo json_encode([
        'error' => [
            'message' => 'Información de archivo invalida'
        ]
    ]);
    exit;
}

$archivo = json_decode(base64_decode($informacionArchivo), true);

switch($archivo['extension']) {
    case 'pdf':
        header('Content-Type: application/pdf');
    break;
}

readfile(descargarArchivo($archivo['ruta'], $archivo['nombre']));
