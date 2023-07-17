<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$envia =$_GET['envia'];
  	$destinatario =$_GET['destino'];
  	$destinatario_copia ='';
  	$destinatario_copia_oculta ='';
  	$asunto =$_GET['asunto'];
  	$formato =$_GET['formato'];
  	$numeroacas =$_GET['numeroacas'];
  	

	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_ENVIA_CORREO_HTML_ACAS(:v_penvia,:v_pdestinatario,
														:v_pdestinatario_copia,:v_pdestinatario_copia_ocul,:v_pasunto,
													    :v_pformato,:v_pnumerocaso,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_penvia',$envia);
	oci_bind_by_name($consulta,':v_pdestinatario',$destinatario);
	oci_bind_by_name($consulta,':v_pdestinatario_copia',$destinatario_copia);
	oci_bind_by_name($consulta,':v_pdestinatario_copia_ocul',$destinatario_copia_oculta);
	oci_bind_by_name($consulta,':v_pasunto',$asunto);
	oci_bind_by_name($consulta,':v_pformato',$formato);
	oci_bind_by_name($consulta,':v_pnumerocaso',$numeroacas);
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


