<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$anterior = $_GET['anterior'];
	$nuevo = $_GET['nuevo'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'UPDATE r_traza_rips_20162_cups SET producto_homologado=:nuevo 
							WHERE producto=:viejo
							AND producto_homologado is NULL');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':viejo',$anterior);
	oci_bind_by_name($consulta,':nuevo',$nuevo);
	// Ejecutamos la consulta
	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	// Devolvemos los resultados en formato JSON
	if (!$result) {
	  	echo oci_error();   
	}else{
		echo $result;
		$mod = "sufi";
		$empresa = 1;
		$des = $_SESSION['usu'].' actualiza CUPS Homologos: Anterior: '.$anterior.' - Nuevo: '.$nuevo;
		$audit = oci_parse($c,'begin p_audit(:v_pempresa,:v_pproceso,:v_pdescripcion); end;');
		oci_bind_by_name($audit,':v_pempresa',$empresa);
		oci_bind_by_name($audit,':v_pproceso',$mod);
		oci_bind_by_name($audit,':v_pdescripcion',$des);
		oci_execute($audit,OCI_COMMIT_ON_SUCCESS);
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>