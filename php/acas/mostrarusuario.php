<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$nombre =$_GET['nombre'];
	//$consulta = oci_parse($c,'begin PQ_GENESIS_TH.P_BUSCAR_USUARIOS(:v_pcoincidencia,:v_json_row); end;');
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.p_buscar_usuarios_acas(:v_pcoincidencia,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pcoincidencia',$nombre);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
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
