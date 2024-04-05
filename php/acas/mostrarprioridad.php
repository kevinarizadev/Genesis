<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$documento = $_GET['documento'];
	$concepto = $_GET['concepto'];
	$motivo = $_GET['motivo'];
	$asunto = $_GET['asunto'];
  $prioridad = '0';
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_OBTENER_PRIORIDAD(:v_pdocumento,:v_pconcepto,:v_pmotivo,:v_pasunto,:v_pprioridad,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
	oci_bind_by_name($consulta,':v_pasunto',$asunto);
	oci_bind_by_name($consulta,':v_pprioridad',$prioridad);
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


