<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	
  	$nombre_caja =$_GET['nombre_caja'];
  	$descripcion_caja =$_GET['descripcion_caja'];
  	$codigo_area =$_GET['codigo_area'];
  	$codigo_rango =$_GET['codigo_rango'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_ACTUALIZAR_CAJA(:v_pnombre_caja,:v_pdescripcion_caja,:v_pcodigo_area,:v_pcodigo_rango,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
  	oci_bind_by_name($consulta,':v_pnombre_caja',$nombre_caja);
  	oci_bind_by_name($consulta,':v_pdescripcion_caja',$descripcion_caja);
	oci_bind_by_name($consulta,':v_pcodigo_area',$codigo_area);
    oci_bind_by_name($consulta,':v_pcodigo_rango',$codigo_rango);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pmensaje', $clob,-1,OCI_B_CLOB);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>


