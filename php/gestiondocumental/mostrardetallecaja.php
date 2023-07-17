<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');

  	$codigo_caja =$_GET['codigo_caja'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_MOSTRAR_INFO_CAJA(:v_pcodigo_caja,:v_json_row); end;');
	
  	oci_bind_by_name($consulta,':v_pcodigo_caja',$codigo_caja);
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
