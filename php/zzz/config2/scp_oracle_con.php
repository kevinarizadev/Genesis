<?php
 //$ftp_server = "172.20.0.2";//IP Privada nueva oracle
$ftp_server = "152.70.137.27";//IP privada oracle tunel - sophos
//$ftp_server = "152.70.133.234";//IP publica oracle
//$ftp_server = "10.10.1.5";//IP privada oracle l - sophos
$ftp_port = "22";
$ftp_user = "opc"; // <--- SCP
// $ftp_user2 = "sftpuser"; <---- SFTP
// $ftp_pass = "FTP_Cajacopi2021.";

//$pubkeyfile = '/Users/nombre.apellido/.ssh/id_rsa.pub'; // <---- Usar en equipo local
//$privkeyfile = '/Users/nombre.apellido/.ssh/id_rsa'; // <---- Usar en equipo local
 $pubkeyfile = '../.ssh/id_rsa.pub'; // <---- Usar en servidor
 $privkeyfile = '../.ssh/id_rsa'; // <---- Usar en servidor
 //$pubkeyfile = './php/.ssh/id_rsa.pub'; // <---- Usar en servidor
 //$privkeyfile = './php/.ssh/id_rsa'; // <---- Usar en servidor

if (!$con_id = ssh2_connect($ftp_server, $ftp_port)) die('0 - Error al conectar');
if (!ssh2_auth_pubkey_file($con_id,$ftp_user,$pubkeyfile,$privkeyfile)) die('0 - Error al conectar');

return $con_id;

?>