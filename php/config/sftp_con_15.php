<?php
	$ftp_server = "192.168.50.15";
	// $puerto = 2121;
	$puerto = "21";
	$con_id = ftp_connect($ftp_server,$puerto);
	//$lr = ftp_login($con_id, "ftp_genesis","C@j@FT9");
	$lr = ftp_login($con_id, "genesis_ftp","Cajacopi2022!");
	// $lr = ftp_login($con_id, "prueba","Prueb@123#");
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		return $con_id;
		//echo "conexion";
		
	}
?>