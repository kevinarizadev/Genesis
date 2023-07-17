<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	
  	$tipo_identificacion=$_GET['tipo_identificacion'];
  	$identificacion = $_GET['identificacion'];
  	$codigo_rango = $_GET['codigo_rango'];
  	$codigo_area = $_GET['codigo_area']; 
  	$tipo_objeto = $_GET['tipo_objeto'];
  	$codigo_prioridad = $_GET['codigo_prioridad'];
  	$descripcion = $_GET['descripcion'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_SOLICITUD_PRESTAMO(:v_ptipo_documento,:v_pdocumento,:v_pcodigo_rango,:v_pcodigo_area,:v_ptipo_objeto,:v_pprioridad,:v_pdescripcion,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
  	oci_bind_by_name($consulta,':v_ptipo_documento',$tipo_identificacion);
  	oci_bind_by_name($consulta,':v_pdocumento',$identificacion);
	oci_bind_by_name($consulta,':v_pcodigo_rango',$codigo_rango);
    oci_bind_by_name($consulta,':v_pcodigo_area',$codigo_area);
    
    oci_bind_by_name($consulta,':v_ptipo_objeto',$tipo_objeto);
    oci_bind_by_name($consulta,':v_pprioridad',$codigo_prioridad);
    oci_bind_by_name($consulta,':v_pdescripcion',$descripcion);
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


