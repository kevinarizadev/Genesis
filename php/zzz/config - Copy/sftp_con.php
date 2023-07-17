<?php
	$ftp_server = "192.168.50.36";
	$con_id = ftp_connect($ftp_server);
	//$lr = ftp_login($con_id, "ftp_genesis","C@j@FT9");
	$lr = ftp_login($con_id, "genesis_ftp","Cajacopi2022!");
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		return $con_id;
		//echo "conexion";
		
	}
?>