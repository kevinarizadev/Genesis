<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');

	$codigo_prestamo =$_GET['codigo_prestamo'];
	$respuesta =$_GET['respuesta'];
	$descripcion =$_GET['descripcion'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_ACT_SOLICITUD_PRESTAMO(:v_pcodigo_prestamo,:v_prespuesta_sol,:v_pdescripcion_res,:v_pmensaje); end;');  
	
	oci_bind_by_name($consulta,':v_pcodigo_prestamo',$codigo_prestamo);
    oci_bind_by_name($consulta,':v_prespuesta_sol',$respuesta);
	oci_bind_by_name($consulta,':v_pdescripcion_res',$descripcion);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pmensaje', $clob,-1,OCI_B_CLOB);

	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	}else{
		echo 0;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
