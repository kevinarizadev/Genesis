<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$codigo_bodega =$_GET['codigo_bodega'];
	$codigo_pasillo =$_GET['codigo_pasillo'];
	$codigo_piso =$_GET['codigo_piso'];
  	$nombre_nivel =$_GET['nombre_nivel'];
  	$descripcion_nivel =$_GET['descripcion_nivel'];
  	$estado_nivel =$_GET['estado_nivel'];
  	
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_REGISTRAR_NIVEL(:v_pcodigo_bodega,:v_pcodigo_pasillo,:v_pcodigo_piso,:v_pnombre_nivel,:v_pdescripcion_nivel,:v_pestado_nivel,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pcodigo_bodega',$codigo_bodega);
  	oci_bind_by_name($consulta,':v_pcodigo_pasillo',$codigo_pasillo);
  	oci_bind_by_name($consulta,':v_pcodigo_piso',$codigo_piso);
  	oci_bind_by_name($consulta,':v_pnombre_nivel',$nombre_nivel);
  	oci_bind_by_name($consulta,':v_pdescripcion_nivel',$descripcion_nivel);
  	oci_bind_by_name($consulta,':v_pestado_nivel',$estado_nivel);
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


