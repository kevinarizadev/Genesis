<?php
	//defined('ed') or die(header('Location: ../404.html'));
	require_once('../config/dbcon_prod.php');
	$id = $_GET['id'];
	// Preparamos la consulta que se ira a la base de datos
	$consulta = oci_parse($c,"SELECT  replace (s.proc_tipopresentador,'PInforme*Pages/ReportViewer.aspx?','http://reportes.cajacopieps.com/reportes/Pages/Report.aspx?ItemPath=') TIPO
						     from spro_programa s
						     where s.proc_tipopresentador is not null and
						     trim(s.proc_modulo) = 'Informes' and
						     trim(s.proc_codigo) = :id");	
	oci_bind_by_name($consulta, ':id', $id);
	oci_execute($consulta);	
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	//convertimos el array en JSON para el tratamiento en angular
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	//return $resultado;
	oci_close($c);
?>