<?php
	$ftp_server = "192.168.50.10";
	$con_id = ftp_connect($ftp_server);
	$lr = ftp_login($con_id, "ftp_genesis","Senador2019!");
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		return $con_id;
	}
?>
