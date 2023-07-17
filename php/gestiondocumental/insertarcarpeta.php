<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	
	$codigo_bodega =$_GET['codigo_bodega'];
	$codigo_pasillo =$_GET['codigo_pasillo'];
	$codigo_piso =$_GET['codigo_piso'];
	$codigo_nivel =$_GET['codigo_nivel'];
  	$codigo_secuencia =$_GET['codigo_secuencia'];
  	
  	$codigo_ubicacion =$_GET['codigo_ubicacion'];
  	$rango_caja =$_GET['rango_caja'];
  	$nombre_carpeta =$_GET['nombre_carpeta'];
  	$descripcion_carpeta =$_GET['descripcion_carpeta'];
  	$codigo_estado =$_GET['codigo_estado'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_REGISTRAR_CARPETA(:v_pcodigo_bodega,:v_pcodigo_pasillo,:v_pcodigo_piso,
		:v_pcodigo_nivel,:v_pcodigo_secuencia,:v_pcodigo_caja,:v_prango_caja,:v_pnombre_carpeta,:v_pdescripcion_carpeta,:v_pestado_carpeta,
		:v_psalida,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
  	oci_bind_by_name($consulta,':v_pcodigo_bodega',$codigo_bodega);
  	oci_bind_by_name($consulta,':v_pcodigo_pasillo',$codigo_pasillo);
	oci_bind_by_name($consulta,':v_pcodigo_piso',$codigo_piso);
    oci_bind_by_name($consulta,':v_pcodigo_nivel',$codigo_nivel);
    oci_bind_by_name($consulta,':v_pcodigo_secuencia',$codigo_secuencia);

  	oci_bind_by_name($consulta,':v_pcodigo_caja',$codigo_ubicacion);
	oci_bind_by_name($consulta,':v_prango_caja',$rango_caja);
    oci_bind_by_name($consulta,':v_pnombre_carpeta',$nombre_carpeta);
    oci_bind_by_name($consulta,':v_pdescripcion_carpeta',$descripcion_carpeta);
  	oci_bind_by_name($consulta,':v_pestado_carpeta',$codigo_estado);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_psalida', $clob,-1,OCI_B_CLOB);                               
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
