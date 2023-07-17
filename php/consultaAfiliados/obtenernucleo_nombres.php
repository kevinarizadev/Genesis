<?php
	require_once('../config/dbcon_prod.php');
	$p_nombre = isset($_GET['p_nombre']) ? $_GET['p_nombre'] : '';
	$s_nombre = isset($_GET['s_nombre']) ? $_GET['s_nombre'] : '';
	$p_apellido = isset($_GET['p_apellido']) ? $_GET['p_apellido'] : '';
	$s_apellido = isset($_GET['s_apellido']) ? $_GET['s_apellido'] : '';
	$ubicacion = isset($_GET['ubicacion']) ? $_GET['ubicacion'] : '';
	$f_nacimiento = isset($_GET['f_nacimiento']) ? $_GET['f_nacimiento'] : '';
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_nucleo_nombres(:v_pri_nombre,:v_seg_nombre,:v_pri_apellido,:v_seg_apellido,:v_ubicacion,:v_f_nacimiento,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pri_nombre',$p_nombre);
	oci_bind_by_name($consulta,':v_seg_nombre',$s_nombre);
	oci_bind_by_name($consulta,':v_pri_apellido',$p_apellido);
	oci_bind_by_name($consulta,':v_seg_apellido',$s_apellido);
	oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);
	oci_bind_by_name($consulta,':v_f_nacimiento',$f_nacimiento);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta);	
	$json = $clob->read($clob->size());
	echo $json;
	
	oci_close($c);
?>