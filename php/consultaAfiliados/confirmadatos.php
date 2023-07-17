<?php
	require_once('../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_verifica_infocontacto(:v_ptipo_documento,:v_pdocumento); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	$res = oci_execute($consulta);
	echo $res;
	oci_close($c);
?>