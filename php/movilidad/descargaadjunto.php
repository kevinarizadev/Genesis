<?php
	$ftp_server='192.168.0.4';
	$ftp_user_name='adminwebepss';
	$ftp_user_pass='Cajacopi2018.';
	$conn_id = ftp_connect($ftp_server);

	// Loguearse con usuario y contraseña
	$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);
	$ps = ftp_pasv($con_id, true);
	// Descarga el $server_file y lo guarda en $local_file
	if (ftp_get($conn_id, $local_file, $server_file, FTP_BINARY)) {
	echo "Se descargado el archivo con éxito\n";
	} else {
	echo "Ha ocurrido un error\n";
	}

	// Cerrar la conexión
	ftp_close($conn_id);
?>