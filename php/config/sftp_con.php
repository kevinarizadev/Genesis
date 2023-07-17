<?php
	$ftp_server = "192.168.50.36";
	// $puerto = 2121;
	// $puerto = 21;
	// $con_id = ftp_ssl_connect($ftp_server);
	$con_id = ftp_connect($ftp_server);
	//$lr = ftp_login($con_id, "ftp_genesis","C@j@FT9");
	$lr = ftp_login($con_id, "genesis_ftp","Cajacopi2022!");
	// $lr = ftp_login($con_id, "prueba","Prueb@123#");
	$ps = ftp_pasv($con_id, true);
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		return $con_id;
		//echo "conexion";
		
	}
?>