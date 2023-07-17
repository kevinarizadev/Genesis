<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$documento =$_GET['documento'];
  	$ubicacion =$_GET['ubicacion'];
  	$concepto =$_GET['concepto'];
  	$motivo =$_GET['motivo'];
  	$ruta =$_GET['ruta'];
  	$observacion =$_GET['observacion'];
  	$emisor =$_GET['emisor'];
  	$asunto =$_GET['asunto'];
  	$priori = $_GET ['priori'];
	$barrio = $_GET ['barrio'];
	if(isset($_GET['tipo_doc_apor'])){$tipo_doc_apor =  $_GET['tipo_doc_apor'];}else{$tipo_doc_apor =  '';}
	if(isset($_GET['doc_aportante'])){$doc_aportante =  $_GET['doc_aportante'];}else{$doc_aportante =  '';}
	
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_INSERT_ACAS(:v_pdocumento,:v_pubicacion,:v_pconcepto,:v_pmotivo,:v_padjunto,:v_pobservacion,
																	:v_pemisor,:v_pasunto,:v_pprioridad,:v_pbarrio,
																	:v_ptipo_doc_apor,:v_pdoc_aportante,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
	oci_bind_by_name($consulta,':v_padjunto',$ruta);
	oci_bind_by_name($consulta,':v_pobservacion',$observacion);
	oci_bind_by_name($consulta,':v_pemisor',$emisor);
	oci_bind_by_name($consulta,':v_pasunto',$asunto);
	oci_bind_by_name($consulta,':v_pprioridad',$priori);
	oci_bind_by_name($consulta,':v_pbarrio',$barrio);
	oci_bind_by_name($consulta,':v_ptipo_doc_apor',$tipo_doc_apor);
	oci_bind_by_name($consulta,':v_pdoc_aportante',$doc_aportante);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
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


