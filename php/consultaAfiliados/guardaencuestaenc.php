<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$tipo = $_GET['tipo'];
	$numero = $_GET['numero'];
	$recomienda = $_GET['rec'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_inserta_encuesta(:v_ptipo_documento,:v_pdocumento,:v_recomienda,:v_respuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_ptipo_documento',$tipo);
	oci_bind_by_name($consulta,':v_pdocumento',$numero);
	oci_bind_by_name($consulta,':v_recomienda',$recomienda);
	oci_bind_by_name($consulta,':v_respuesta',$respuesta,2);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	// Devolvemos los resultados en formato JSON
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>