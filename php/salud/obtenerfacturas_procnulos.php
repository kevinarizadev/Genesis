<?php
	//defined('ed') or die(header('Location: ../404.html'));
	require_once('../config/dbcon_prod.php');
	// Preparamos la consulta que se ira a la base de datos
	$consulta = oci_parse($c,"
							SELECT * FROM r_traza_rips_20162_facpnd e
							WHERE e.CUPS_HOMOLOGADO IS NULL 
							AND EXISTS (SELECT 1 FROM r_traza_rips_20162_facdpn D 
							           where d.terv_codigo = e.nit 
							           and trim(d.num_factura) = trim(e.num_factura) 
							           and d.fcdn_recibo = e.fcdn_recibo 
							           and trim(d.afic_documento) = trim(e.afic_documento)
							           and fcdc_producto is null)

							and
							ROWnUM <= 10 order by dbms_random.value");	
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