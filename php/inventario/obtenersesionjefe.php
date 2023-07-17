<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$emisor = $_GET['emisor'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_OBTENER_SESION_JEFE(:v_pemisor,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pemisor',$emisor);
	oci_bind_by_name($consulta,':v_prespuesta',$jefe,40);


	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $jefe;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
