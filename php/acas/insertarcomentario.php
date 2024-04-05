<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$documento =$_GET['documento'];
	$numero =$_GET['numero'];
  	$ubicacion =$_GET['ubicacion'];
  	$tipo =$_GET['tipo'];
  	$cedula =$_GET['cedula'];
	$observacion=$_GET['observacion'];
	$ruta_respuesta=$_GET['ruta'];
	$estado_res=$_GET['estado_res'];
	$cierre=$_GET['cierre'];
	$numeroserial=isset($_GET['numeroserial']) ? $_GET['numeroserial'] : '';
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_INSERT_GESTION(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptipo,
																    :v_ptercero,:v_pobservacion,:v_ruta_respuesta,:v_estado_res,:v_cierre,:v_casc_serial_equipo,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pnumero',$numero);
	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
	oci_bind_by_name($consulta,':v_ptipo',$tipo);
	oci_bind_by_name($consulta,':v_ptercero',$cedula);
	oci_bind_by_name($consulta,':v_pobservacion',$observacion);
	oci_bind_by_name($consulta,':v_ruta_respuesta',$ruta_respuesta);
	oci_bind_by_name($consulta,':v_estado_res',$estado_res);
	oci_bind_by_name($consulta,':v_cierre',$cierre);
	oci_bind_by_name($consulta,':v_casc_serial_equipo',$numeroserial);
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
