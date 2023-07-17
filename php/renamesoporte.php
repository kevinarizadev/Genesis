	<?php
	require_once('config/ftpcon.php');
	$day = date("dmY");
	$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/Ausentismo/". $day;
	ftp_chdir($con_id, $path_of_storage);
	$old_name = $_GET['oldname'];
	$new_name = $_GET['newname'];
	if (ftp_rename($con_id, $old_name, $new_name)) {
		 echo "1";
		} else {
		 echo "Error actualizando nombre del archivo";
	}

	ftp_close($con_id);
	?>
