<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$radicado =$_GET['radicado'];
  $ubicacion =$_GET['ubicacion'];
  $autoriza =$_GET['autoriza'];
  $solicitante =$_GET['solicitante'];
  $problema =$_GET['problema'];
  $estado =$_GET['estado'];
  $fechaterminacion =$_GET['fechaterminacion'];


	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_AU.P_INSERTAR_ACAS_DETALLE(:v_pradicado,:v_pubicacion,:v_pautoriza,:v_psolicitante,:v_pdescripcion,:v_pestado,:v_pfechaterminacion,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pradicado',$radicado);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  oci_bind_by_name($consulta,':v_pautoriza',$autoriza);
  oci_bind_by_name($consulta,':v_psolicitante',$solicitante);
  oci_bind_by_name($consulta,':v_pdescripcion',$problema);
  oci_bind_by_name($consulta,':v_pestado',$estado);
  oci_bind_by_name($consulta,':v_pfechaterminacion',$fechaterminacion);

	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);


	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
