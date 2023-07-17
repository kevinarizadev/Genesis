<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$tipo = $_GET['tipo'];
	$numero = $_GET['numero'];
	$obse = $_GET['obse'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'UPDATE r_traza_rips_20162_frecval SET observacion=:obse
							WHERE trim(FCDC_TIPO_DOC_AFILIADO)=TRIM(:tipo)
							AND trim(FCDC_AFILIADO)=trim(:numero)');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':tipo',$tipo);
	oci_bind_by_name($consulta,':numero',$numero);
	oci_bind_by_name($consulta,':obse',$obse);
	// Ejecutamos la consulta
	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	// Devolvemos los resultados en formato JSON
	//echo oci_error(); 
	echo $result;
	/*if (!$result) {
	  	echo oci_error();   
	}else{
		echo $result;
	}*/
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>