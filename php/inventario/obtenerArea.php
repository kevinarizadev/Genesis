<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$cedula = $_GET['cedula'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_OBTENER_AREA(:v_pemisor,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pemisor',$cedula);
	oci_bind_by_name($consulta,':v_prespuesta',$area,5);


	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $area;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
