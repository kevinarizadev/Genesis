<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$empresa =$_GET['empresa'];
  $fechainicio =$_GET['fechainicio'];
  $fechafin =$_GET['fechafin'];
  $estado =$_GET['estado'];
  $area =$_GET['area'];
  $tipolistas =$_GET['tipolistas'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_INSERTAR_ABRIR_INVENTARIO(:v_pempresa,:v_pfechainicio,:v_pfechafin,:v_pestado,:v_parea,:v_pdocumento,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
  oci_bind_by_name($consulta,':v_pfechainicio',$fechainicio);
  oci_bind_by_name($consulta,':v_pfechafin',$fechafin);
  oci_bind_by_name($consulta,':v_pestado',$estado);
  oci_bind_by_name($consulta,':v_parea',$area);
  oci_bind_by_name($consulta,':v_pdocumento',$tipolistas);

	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);


	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
