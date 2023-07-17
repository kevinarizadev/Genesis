<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');

	$codigo_bodega =$_GET['codigo_bodega'];
	$codigo_pasillo =$_GET['codigo_pasillo'];
	$codigo_piso =$_GET['codigo_piso'];
	$codigo_nivel =$_GET['codigo_nivel'];
  	$codigo_secuencia =$_GET['codigo_secuencia'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_GD.P_MOSTRAR_CAJA(:v_pcodigo_bodega,:v_pcodigo_pasillo,:v_pcodigo_piso,:v_pcodigo_nivel,:v_pcodigo_secuencia,:v_json_row); end;');

	oci_bind_by_name($consulta,':v_pcodigo_bodega',$codigo_bodega);
  	oci_bind_by_name($consulta,':v_pcodigo_pasillo',$codigo_pasillo);
  	oci_bind_by_name($consulta,':v_pcodigo_piso',$codigo_piso);
  	oci_bind_by_name($consulta,':v_pcodigo_nivel',$codigo_nivel);
  	oci_bind_by_name($consulta,':v_pcodigo_secuencia',$codigo_secuencia);

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
