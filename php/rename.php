<?php 
	require_once('config/ftpcon.php');
	$day = date("dmY");
	$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/". $day;
	ftp_chdir($con_id, $path_of_storage);
	$old_name = $_GET['oldname'];
	$new_name = $_GET['newname'];
	if (ftp_rename($con_id, $old_name, $new_name)) {
		echo "successfully renamed $old_name to $new_name\n";
	} else {
		echo "There was a problem while renaming $old_name to $new_name\n";
	}
	ftp_close($con_id);
?>