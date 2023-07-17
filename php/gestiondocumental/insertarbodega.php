<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$nombre_bodega =$_GET['nombre_bodega'];
  	$descripcion_bodega =$_GET['descripcion_bodega'];
  	$estado_bodega =$_GET['estado_bodega'];
  
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_REGISTRAR_BODEGA(:v_pnombre_bodega,:v_pdescripcion_bodega,:v_pestado_bodega,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pnombre_bodega',$nombre_bodega);
  	oci_bind_by_name($consulta,':v_pdescripcion_bodega',$descripcion_bodega);
  	oci_bind_by_name($consulta,':v_pestado_bodega',$estado_bodega);
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


