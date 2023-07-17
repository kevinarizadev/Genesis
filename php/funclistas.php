<?php
	header("Content-Type: text/html;charset=utf-8");
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function cargaDepartamentos(){
		require_once('config/dbcon_empresa.php');
		$consulta = oci_parse($c,"select case when length(b.ubgn_ubicacion)=5 then substr(b.ubgn_ubicacion,1,2) else substr(b.ubgn_ubicacion,1,1) end codigo,b.ubgc_nombre nombre
										from bubg_ubicacion_geografica b
										where ubgn_nivel = 2
										and ubgn_ubicacion <> 0 
										order by 2");
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cargaMunicipios(){
		require_once('config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,"select ubgn_codigo codigo,ubgc_nombre nombre
											from bubg_ubicacion_geografica
											where ubgn_nivel = 3
											and case when length(ubgn_ubicacion)=5 then substr(ubgn_ubicacion,1,2) else substr(ubgn_ubicacion,1,1) end = :departamento
											order by 2");
		oci_bind_by_name($consulta,':departamento',$request->depa);
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