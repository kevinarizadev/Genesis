<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$type = $_GET['type'];
	$num = $_GET['id'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_verifica_encuestauser(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
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