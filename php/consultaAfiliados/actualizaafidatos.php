<?php
	require_once('../config/dbcon_prod.php');
	$type = $_GET['tipo'];
	$num = $_GET['numero'];
	$direccion = isset($_GET['direccion']) ? $_GET['direccion'] : '';
	$localidad = isset($_GET['barrio']) ? $_GET['barrio'] : '';
	$telefono = isset($_GET['telefono']) ? $_GET['telefono'] : '';
	$celular = isset($_GET['celular']) ? $_GET['celular'] : '';
	$celular2 = isset($_GET['celular2']) ? $_GET['celular2'] : '';
	$correo = isset($_GET['correo']) ? $_GET['correo'] : '';
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_actualiza_contacto_afil(:v_ptipo_documento,
																		  :v_pdocumento,
																		  :p_telefono,
																		  :p_celular,
																		  :p_celular2,
																		  :p_correo,
																		  :p_direccion,
																		  :p_localidad,
																		  :p_res); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	oci_bind_by_name($consulta,':p_telefono',$telefono);
	oci_bind_by_name($consulta,':p_celular',$celular);
	oci_bind_by_name($consulta,':p_celular2',$celular2);
	oci_bind_by_name($consulta,':p_correo',$correo);
	oci_bind_by_name($consulta,':p_direccion',$direccion);
	oci_bind_by_name($consulta,':p_localidad',$localidad);
	oci_bind_by_name($consulta,':p_res',$respuesta,100);
	$res = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $respuesta;
	oci_close($c);
?>