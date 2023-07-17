<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$codigo_bodega =$_GET['codigo_bodega'];
  	$nombre_pasillo =$_GET['nombre_pasillo'];
  	$descripcion_pasillo =$_GET['descripcion_pasillo'];
  	$estado_pasillo =$_GET['estado_pasillo'];
  
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_REGISTRAR_PASILLO(:v_pcodigo_bodega,:v_pnombre_pasillo,:v_pdescripcion_pasillo,:v_pestado_pasillo,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pcodigo_bodega',$codigo_bodega);
  	oci_bind_by_name($consulta,':v_pnombre_pasillo',$nombre_pasillo);
  	oci_bind_by_name($consulta,':v_pdescripcion_pasillo',$descripcion_pasillo);
  	oci_bind_by_name($consulta,':v_pestado_pasillo',$estado_pasillo);
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


