<?php

function UploadFile($dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
$file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
// function UploadFile($base64 /*Base 64*/, $dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
// $file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
{
    require_once('../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
    // require_once('../../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
    $host_path = '/data/sftpuser/cargue_ftp/Digitalizacion/Genesis/';//Ruta Host

    // list(, $base64) = explode(';', $base64); // Proceso para traer el Base64
    // list(, $base64) = explode(',', $base64); // Proceso para traer el Base64
    // $base64 = base64_decode($base64); // Proceso para traer el Base64
    // file_put_contents('../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    // file_put_contents('../../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    
    $sftp = ssh2_sftp($con_id); // Abrimos la conexion sftp
    
    $parts = explode('/',$dir); // Calculamos cuantos directorios existen
    foreach($parts as $part){ // Iniciamos el recorrido para crear los directorios si es que no existen algunos
        $host_path = $host_path.$part.'/'; // Concatenamos la ruta $host_path con la carpeta del proyecto
        if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Usamos la conexion sftp creada para Validar si el directorio existe
            mkdir("ssh2.sftp://$sftp$host_path"); // Crea el directorio
        }
    }

    if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Validamos si se crearon los directorios
        return '0 - Error al subir el archivo, no se crearon los directorios';
    } else {
        $host_path = $host_path.$file; // Concatenamos la ruta del directorio con el nombre del archivo
        $subio = ssh2_scp_send($con_id, '../../temp/'.$file, $host_path); // Subimos el archivo al servidor
        // $subio = ssh2_scp_send($con_id, '../../../temp/'.$file, $host_path); // Subimos el archivo al servidor
    }

    if((!$subio) || (filesize("ssh2.sftp://$sftp$host_path") == 0 )){ return '0 - Archivo no subido correctamente';} // Validamos que se subio el archivo y que el peso sea diferente de 0

    ssh2_exec($con_id, 'exit'); // Cerramos la conexion
    return (substr($host_path, 14, strlen($host_path)-1)); // Recortamos la ruta para que solo muestre desde /cargue_ftp/...
}

?>