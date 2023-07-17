<?php
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	require_once('config/l_ftpcon.php');
	$name = uniqid();
	$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
	$name = $name.'.'.$ext;
	$local_file = '../temp/'.$name;
	$handle = fopen($local_file, 'w');
	if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
	 	echo $name;
	} else {
	 	echo "Error";
	}
	ftp_close($con_id);
	fclose($handle);
?>