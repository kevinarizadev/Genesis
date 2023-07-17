<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$tipolistas =$_GET['tipolistas'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_VALIDAR_PERIODO(:v_ptipolistas,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_ptipolistas',$tipolistas);

  oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);

	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
