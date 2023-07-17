<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function seccionaless16(){
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT distinct(SECCIONAL_CONTRATO) SECCIONAL from nview_contratacion_report");	
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta)){
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cantidads16(){
		global $request;
		require_once('../../config/dbcon_prod.php');
		$fecha_inicio = $request->fecha_inicio;
		$fecha_final = $request->fecha_final;
		$seccional = $request->seccional;
		$regimen = $request->regimen;
		$consulta = oci_parse($c,"SELECT count(1) CANTIDAD FROM nview_contratacion_report
									where F_INICIAL <= :fecha_inicio
									and F_FINAL >= :fecha_final       
									and SECCIONAL_CONTRATO = :seccional
									and cntc_documento = :regimen");	
		oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
		oci_bind_by_name($consulta,':fecha_final',$fecha_final);
		oci_bind_by_name($consulta,':seccional',$seccional);
		oci_bind_by_name($consulta,':regimen',$regimen);
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		
		oci_close($c);
	}
	
?>