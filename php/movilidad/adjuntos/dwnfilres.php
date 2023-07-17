<?php
$remote_file = 'MOVILIDAD/'.$_GET["ruta"];
$pos = strpos($_GET["ruta"], '.');
$ext = substr($_GET["ruta"], $pos);
$local_file = 'FormularioAfiliación'.$ext;
$ftp_server = "192.168.0.4";
$handle = fopen($local_file, 'w');
$conn_id = ftp_connect($ftp_server);
$login_result = ftp_login($conn_id, "adminwebepss","Cajacopi2018.");
$ps = ftp_pasv($con_id, true);
if (ftp_fget($conn_id, $handle, $remote_file, FTP_ASCII, 0)) {
 	echo "Se ha escrito satisfactoriamente sobre $local_file\n";
} else {
 	echo "Ha habido un problema durante la descarga de $remote_file en $local_file\n";
}
header ("Content-Disposition: attachment; filename=".$local_file); 
header ("Content-Type: application/octet-stream");
header ("Content-Length: ".filesize($local_file));
readfile($local_file);
ftp_close($conn_id);
fclose($handle);
unlink($local_file);
?>