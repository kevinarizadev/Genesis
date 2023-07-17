<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
  $ubicacion =$_GET['ubicacion'];
  $problema =$_GET['problema'];
  $motivo =$_GET['motivo'];
  $emisor =$_GET['emisor'];
  $fechainicio =$_GET['fechainicio'];
  $fechaterminacion =$_GET['fechaterminacion'];
  $nombreadjunto =$_GET['nombreadjunto'];
  $ruta =$_GET['ruta'];

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AU.P_INSERTAR_SOLICITUD_ACAS(:v_pubicacion,:v_pproblema,:v_pmotivo,:v_pemisor,:v_pfechainicio,:v_pfechaterminacion,:v_pnombrearchivo,:v_pruta,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  oci_bind_by_name($consulta,':v_pproblema',$problema);
  oci_bind_by_name($consulta,':v_pmotivo',$motivo);
  oci_bind_by_name($consulta,':v_pemisor',$emisor);
  oci_bind_by_name($consulta,':v_pfechainicio',$fechainicio);
  oci_bind_by_name($consulta,':v_pfechaterminacion',$fechaterminacion);
  oci_bind_by_name($consulta,':v_pnombrearchivo',$nombreadjunto);
  oci_bind_by_name($consulta,':v_pruta',$ruta);


  $clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	}else{
		echo 0;
	}
	oci_close($c);
?>
