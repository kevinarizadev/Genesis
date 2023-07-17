<?php
	$ftp_server = "192.168.0.4";
	$con_id = ftp_connect($ftp_server);
	$lr = ftp_login($con_id, "adminwebepss","Cajacopi2018.");
	$ps = ftp_pasv($con_id, true);
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		$day = date("dmY");
		$path_of_storage = "INVENTARIO/TIC/". $day;
		ftp_chdir($con_id, $path_of_storage);
		$old_name = $_GET['oldname'];
		$new_name = $_GET['newname'];
		if (ftp_rename($con_id, $old_name, $new_name)) {
			 echo "1";
			} else {
			 echo "Error actualizando nombre del archivo";
		}
	}
	ftp_close($con_id);
?>
