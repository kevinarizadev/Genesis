<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$resolucion =$_GET['resolucion'];
  $CodigoCAC =$_GET['CodigoCAC'];
  $fechainicial =$_GET['fechainicial'];
  $fechafinal =$_GET['fechafinal'];
  $fechalimite =$_GET['fechalimite'];
  $type =$_GET['type'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_CAC.P_PERIODO_CAC_UI(:v_presolucion,:v_pnumero,:v_pfecha_inicial,:v_pfecha_final,:v_pfecha_corte,:v_pactividad,:v_psalida); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_presolucion',$resolucion);
  oci_bind_by_name($consulta,':v_pnumero',$CodigoCAC);
	oci_bind_by_name($consulta,':v_pfecha_inicial',$fechainicial);
  oci_bind_by_name($consulta,':v_pfecha_final',$fechafinal);
	oci_bind_by_name($consulta,':v_pfecha_corte',$fechalimite);
  oci_bind_by_name($consulta,':v_pactividad',$type);

	oci_bind_by_name($consulta,':v_psalida',$respuesta,50);


	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
