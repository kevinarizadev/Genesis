<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$codigo_bodega =$_GET['codigo_bodega'];
	$codigo_pasillo =$_GET['codigo_pasillo'];
  	$nombre_piso =$_GET['nombre_piso'];
  	$descripcion_piso =$_GET['descripcion_piso'];
  	$estado_piso =$_GET['estado_piso'];
  	
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_REGISTRAR_PISO(:v_pcodigo_bodega,:v_pcodigo_pasillo,:v_pnombre_piso,:v_pdescripcion_piso,:v_pestado_piso,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pcodigo_bodega',$codigo_bodega);
  	oci_bind_by_name($consulta,':v_pcodigo_pasillo',$codigo_pasillo);
  	oci_bind_by_name($consulta,':v_pnombre_piso',$nombre_piso);
  	oci_bind_by_name($consulta,':v_pdescripcion_piso',$descripcion_piso);
  	oci_bind_by_name($consulta,':v_pestado_piso',$estado_piso);
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


