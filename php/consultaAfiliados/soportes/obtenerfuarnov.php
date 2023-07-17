<?php
	require_once('../../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,"SELECT n.novc_concepto concepto
										from enov_novedad n
										where n.novc_tipo_doc_afiliado = :tipo
									      and n.novc_afiliado = :documento
									      and n.novf_fecha = to_date(sysdate)");	
	oci_bind_by_name($consulta,':tipo',$type);
	oci_bind_by_name($consulta,':documento',$num);
	oci_execute($consulta);	
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
?>