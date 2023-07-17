<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$empresa   =$_GET['empresa'];
  $documento =$_GET['documento'];
  $numero    =$_GET['numero'];
  $ubicacion =$_GET['ubicacion'];
  


	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_ELIMINAR_INVENTARIO(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
  oci_bind_by_name($consulta,':v_pdocumento',$documento);
  oci_bind_by_name($consulta,':v_pnumero',$numero);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);


  oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);

	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
