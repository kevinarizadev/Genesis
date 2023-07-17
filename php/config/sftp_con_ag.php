<?php
$ftp_server = "172.20.0.7";
$con_id = ftp_connect($ftp_server);
//$lr = ftp_login($con_id, "ftp_genesis","C@j@FT9");
$lr = ftp_login($con_id, "wikode", "Wikode2023!!");
$ps = ftp_pasv($con_id, true);
if ((!$con_id) || (!$lr)) {
	echo "Fallo en la conexión";
	die;
} else {
	return $con_id;
	//echo "conexion";

}
