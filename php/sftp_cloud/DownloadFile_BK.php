<?php

function DownloadFile($ruta /* Ruta del soporte */)
{
	require_once('../config/scp_oracle_con.php'); // Conexion SFTP ORACLE
	// require_once('../../config/scp_oracle_con.php'); // Conexion SFTP ORACLE
	// $ruta = $ruta;
	$name_file = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
	$local_file = '../../temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
	// $local_file = '../../../temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
	$sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
	$ruta = '/data/sftpuser'.$ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
	if(!file_exists("ssh2.sftp://$sftp$ruta")){ return '0 - Archivo no encontrado'; } //Validamos si el archivo existe en el servidor Oracle
	ssh2_scp_recv($con_id, $ruta, $local_file);// Traemos el archivo del servidor y lo enviamos a la carpeta temp de Genesis
	$con_id = null; unset($con_id); //Cerrar Conex
	return ($name_file); // Imprimimos el nombre del archivo para que se genere la descarga del mismo
}
?>