<?php

$servers = [
    1 => [
        "host" => "192.168.50.10",
        "username" => "ftp_genesis",
        "password" => "Senador2019!",
    ],

    3 => [
        "host" => "192.168.50.36",
        "username" => "genesis_ftp",
        "password" => "Cajacopi2022!",
    ]
];

function conectar($ftpId = 1) {
    global $servers;    
    //echo $servers[3]["host"];
    $ftp_server = $servers[$ftpId]["host"];
    $con_id = ftp_connect($ftp_server);
    $lr = ftp_login($con_id, $servers[$ftpId]["username"],$servers[$ftpId]["password"]);
	$ps = ftp_pasv($con_id, true);

    if ((!$con_id) || (!$lr)) {
        echo "Fallo en la conexión"; die;
    } else {
        return $con_id;
    }
}

function crearCarpetaFTP($rutaCarpetaFTP, $ftpId = 1) {
    $con_id = conectar($ftpId);  
    if (!isset($rutaCarpetaFTP) || $rutaCarpetaFTP === null || $rutaCarpetaFTP === '') {
        throw new Exception('La ruta ingresada no es valida');
    }

    if (existeCarpetaFTP($rutaCarpetaFTP, $ftpId) === true) {
        throw new Exception('La carpeta ya existe');
    } else {
        ftp_mkdir($con_id, $rutaCarpetaFTP);
        ftp_close($con_id);
    }
}

function existeCarpetaFTP($rutaCarpetaFTP, $ftpId = 1) {
    global $servers;
    if (!isset($rutaCarpetaFTP) || $rutaCarpetaFTP === null || $rutaCarpetaFTP === '') {
        throw new Exception('La ruta ingresada no es valida');
    }

    return is_dir('ftp://' . $servers[$ftpId]["username"] . ':' . $servers[$ftpId]["password"] . '@' . $servers[$ftpId]["host"] . '/' . $rutaCarpetaFTP) === true;
}

function existeArchivoFTP($rutaCarpetaFTP, $nombreArchivoFTP, $ftpId = 1) {
    $con_id = conectar($ftpId);  

    if (!isset($rutaCarpetaFTP) || $rutaCarpetaFTP === null || $rutaCarpetaFTP === '') {
        throw new Exception('La ruta ingresada no es valida');
    }

    if (!isset($nombreArchivoFTP) || $nombreArchivoFTP === null || $nombreArchivoFTP === '') {
        throw new Exception('El nombre del archivo en ftp ingresado no es valido');
    }

    if (existeCarpetaFTP($rutaCarpetaFTP, $ftpId) === false) {
        return false;
    }

    $elementos = ftp_nlist($con_id, $rutaCarpetaFTP);
    ftp_close($con_id);

    if (count($elementos) > 0) {
        return count(array_filter($elementos, function($elemento) use ($rutaCarpetaFTP, $nombreArchivoFTP, $ftpId) {
            return !existeCarpetaFTP($elemento, $ftpId) && $elemento === $rutaCarpetaFTP . $nombreArchivoFTP;
        })) > 0;
    } else {
        return false;
    }
}

function descargarArchivo($rutaCarpetaFTP, $nombreArchivoFTP, $ftpId = 1) {
    $con_id = conectar($ftpId);
//echo $ftpId;
    if (!existeArchivoFTP($rutaCarpetaFTP, $nombreArchivoFTP, $ftpId)) {
        throw new Exception('No puede descargar un archivo que no existe');
    }

    $nombreTemporal = tempnam(sys_get_temp_dir(), 'ftp');

    ftp_get($con_id, $nombreTemporal, $rutaCarpetaFTP . $nombreArchivoFTP, FTP_BINARY);
    ftp_close($con_id);

    return $nombreTemporal;
}

function subirArchivoFTP($rutaArchivo, $rutaCarpetaFTP, $nombreArchivoFTP, $crearRuta = false, $sobrescribir = false, $ftpId = 1) {
    if (!isset($rutaArchivo) || $rutaArchivo === null || $rutaArchivo === '') {
        throw new Exception('La ruta del archivo ingresado no es valida');
    }

    if (!isset($rutaCarpetaFTP) || $rutaCarpetaFTP === null || $rutaCarpetaFTP === '') {
        throw new Exception(('La ruta del archivo en ftp ingresada no es valida'));
    }

    if (!isset($nombreArchivoFTP) || $nombreArchivoFTP === null || $nombreArchivoFTP === '') {
        throw new Exception('El nombre del archivo en ftp ingresado no es valido');
    }

    if (!existeCarpetaFTP($rutaCarpetaFTP, $ftpId) && $crearRuta === false) {
        throw new Exception('No se puede subir porque no existe la ruta ingresada');
    }

    if (existeArchivoFTP($rutaCarpetaFTP, $nombreArchivoFTP, $ftpId) === true && $sobrescribir === false) {
        throw new Exception('Ya existe un archivo con el nombre y ruta ingresados');
    }

    if (existeCarpetaFTP($rutaCarpetaFTP, $ftpId) === false && $crearRuta === true) {
        crearCarpetaFTP($rutaCarpetaFTP, $ftpId);
    }

    $con_id = conectar($ftpId);

    $result = ftp_put($con_id, $rutaCarpetaFTP . $nombreArchivoFTP, $rutaArchivo, FTP_BINARY);

    ftp_close($con_id);

    return $result;
}