<?php
	//defined('ed') or die(header('Location: ../404.html'));
	require_once('../config/dbcon_prod.php');
	// Preparamos la consulta que se ira a la base de datos
	$consulta = oci_parse($c,"SELECT  (select count(1) from r_traza_rips_20162_facpnd) as TOTAL, 
              (select count(1) from r_traza_rips_20162_facpnd f where f.cups_homologado is not null) as REALIZADO from dual");	
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