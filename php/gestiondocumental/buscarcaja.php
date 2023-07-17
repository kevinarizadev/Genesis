<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');

	$codigo_area =$_GET['codigo_area'];
	$descripcion =$_GET['descripcion'];
	$fecha_inicio =$_GET['fecha_inicio'];
	$fecha_fin =$_GET['fecha_fin'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_BUSCAR_CAJA(:v_pcodigo_area,:v_pcodigo_descripcion,:v_pfecha_inicial,:v_pfecha_final,:v_json_row); end;');

	oci_bind_by_name($consulta,':v_pcodigo_area',$codigo_area);
  	oci_bind_by_name($consulta,':v_pcodigo_descripcion',$descripcion);
  	oci_bind_by_name($consulta,':v_pfecha_inicial',$fecha_inicio);
  	oci_bind_by_name($consulta,':v_pfecha_final',$fecha_fin);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

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
