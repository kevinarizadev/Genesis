<?php
$ftp_server = "152.70.137.27";//IP publica oracle


//$ftp_server = "152.70.137.27";//IP privada oracle tunel - sophos
//$ftp_server = "172.20.0.2";//IP privada oracle tunel - sophos
$ftp_port = "22";
$ftp_user = "opc";

//$pubkeyfile = 'C:/Users/svepslocal/.ssh/id_rsa.pub';
//$privkeyfile = 'C:/Users/svepslocal/.ssh/id_rsa';

$pubkeyfile = 'php/.ssh/id_rsa.pub';
$privkeyfile = 'php/.ssh/id_rsa';

// $connection = ssh2_connect($ftp_server, $ftp_port);
// ssh2_auth_password($connection, $ftp_user, $ftp_pass);
// $con_id = ssh2_sftp($connection);

if (!$con_id = ssh2_connect($ftp_server, $ftp_port)) die('Fallo al Conectar.');
if (!ssh2_auth_pubkey_file($con_id,$ftp_user,$pubkeyfile,$privkeyfile)) die('Fallo al crear la conexion sftp.');
//$sftp = ssh2_sftp($connection);
return $con_id;

?>