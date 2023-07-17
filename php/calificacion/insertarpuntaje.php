<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$numero =$_GET['numero'];
  	$ubicacion =$_GET['ubicacion'];
  	$identificacion =$_GET['identificacion'];
  	$calificacion =$_GET['calificacion'];
  	$comentario =$_GET['comentario'];
  
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_SERV.P_INSERTAR_CALIFICACION(:v_pnumero,:v_pubicacion,:v_identificacion,:v_pcalificacion,:v_pcomentario,:v_pmensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pnumero',$numero);
  	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  	oci_bind_by_name($consulta,':v_identificacion',$identificacion);
  	oci_bind_by_name($consulta,':v_pcalificacion',$calificacion);
  	oci_bind_by_name($consulta,':v_pcomentario',$comentario);
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
