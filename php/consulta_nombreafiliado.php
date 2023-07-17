<?php
	// Llamamos la conexion a la base de datos
	require_once('config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$p_nombre = $_GET['p_nombre'];
	$s_nombre = $_GET['s_nombre'];
	$p_apellido = $_GET['p_apellido'];
	$s_apellido = $_GET['s_apellido'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin P_MOSTRAR_ASIGNA_POBLA_NOM_N(:v_prinombre,:v_segnombre,:v_priapellido,:v_segapellido,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_prinombre',$p_nombre);
	oci_bind_by_name($consulta,':v_segnombre',$s_nombre);
	oci_bind_by_name($consulta,':v_priapellido',$p_apellido);
	oci_bind_by_name($consulta,':v_segapellido',$s_apellido);
	// Preparamos las variables de salida tipo CLOB
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