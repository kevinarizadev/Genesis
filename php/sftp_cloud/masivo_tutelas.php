<?php

function Connect_FTP()
{
	 $ftp_server = "172.20.0.2";//IP privada oracle tunel - sophos
	// $ftp_server = "152.70.137.27";//IP privada oracle tunel - sophos <---- Usar en servidor
	$ftp_port = "22";
	$ftp_user = "opc"; // <--- SCP

	$pubkeyfile = '/Users/kevin.ariza/.ssh/id_rsa.pub'; // <---- Usar en equipo local
	$privkeyfile = '/Users/kevin.ariza/.ssh/id_rsa'; // <---- Usar en equipo local
	/*$pubkeyfile = '../.ssh/id_rsa.pub'; // <---- Usar en servidor
	$privkeyfile = '../.ssh/id_rsa'; // <---- Usar en servidor*/
	// $pubkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa.pub';
	// $privkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa';
	//echo $_SERVER['DOCUMENT_ROOT'];
	if (!$con_id = ssh2_connect($ftp_server, $ftp_port)) die('0 - Error al conectar');
	if (!ssh2_auth_pubkey_file($con_id,$ftp_user,$pubkeyfile,$privkeyfile)) die('0 - Error al conectar');

	return $con_id;
}

// function DownloadFile()
function DownloadFile($ruta /* Ruta del soporte */)
{
  // $ruta = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Pro/PRO-37301-44001.pdf';
  // $ruta = '/cargue_ftp/Digitalizacion/Genesis/PQR/31122023/S370865_1.pdf';
	$root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';
	// $root = $_SERVER['DOCUMENT_ROOT'].'/'; // <---- Usar en servidor
	$con_id = Connect_FTP();
	$name_file = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
	$local_file = $root.'temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
	$sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
	$ruta = '/data/sftpuser'.$ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
	if(!file_exists("ssh2.sftp://$sftp$ruta")){ return '0 - Archivo no encontrado2'; } //Validamos si el archivo existe en el servidor Oracle
	ssh2_scp_recv($con_id, $ruta, $local_file);// Traemos el archivo del servidor y lo enviamos a la carpeta temp de Genesis
	$con_id = null; unset($con_id); //Cerrar Conex
	return ($name_file); // Imprimimos el nombre del archivo para que se genere la descarga del mismo
}



// $json = '[
//   {
//       "CODIGO": 13123155,
//       "ARCHIVO": "/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Pro/PRO-34472-44430.pdf"
//   }]';

$json_2 = json_decode($json);

$root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';
	// $root = $_SERVER['DOCUMENT_ROOT'].'/'; // <---- Usar en servidor
$con_id = Connect_FTP();
$sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
foreach ($json_2 as $value) {
  $name_file = explode("/", $value->ARCHIVO)[count(explode("/", $value->ARCHIVO))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
  // echo $value;
  // echo($value->CODIGO);
  // echo($value->ARCHIVO);

  //////////////
  //////////////
  //////////////
  $ruta = $value->ARCHIVO;
	// $name_file = $value->CODIGO;
	$local_file = $root.'temp/'.$name_file.'.pdf';//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo

	$ruta = '/data/sftpuser'.$ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
	if(!file_exists("ssh2.sftp://$sftp$ruta")){ echo ($name_file.' - Archivo no encontrado2'); } //Validamos si el archivo existe en el servidor Oracle
	ssh2_scp_recv($con_id, $ruta, $local_file);// Traemos el archivo del servidor y lo

  // if(substr(DownloadFile($value->ARCHIVO),0,1) != '0'){
  //   rename()
  // }

}
echo '<br>';
$con_id = null; unset($con_id); //Cerrar Conex


//http://www.localhost/genesis/php\sftp_cloud\masivo_tutelas.php

?>
