<?php
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	//require_once('config/ftpcon.php');
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
    	require_once('config/ftpcon.php');
  	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('config/sftp_con.php');
	}
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