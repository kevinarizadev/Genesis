<?php
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function listaAnio(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT distinct to_char(p.prof_final,'yyyy') anno
										   from nnmd_nomina_detalle d
										   inner join nnom_nomina n on d.nmdn_empresa = n.nomn_empresa and d.nmdc_documento = n.nomc_documento and d.nmdn_numero = n.nomn_numero and d.nmdn_ubicacion = n.nomn_ubicacion 
										   inner join npro_programa p on p.proc_codigo = n.nomc_programa
										   where d.nmdv_tercero = :v_usuario
										   and d.nmdc_documento = 'NM'
										   and n.nomc_estado = 'P'
										   order by 1 desc");
		oci_bind_by_name($consulta,':v_usuario',$_SESSION["cedula"]);
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}

	function listaMeses(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT distinct to_char(p.prof_final,'mm') codigo, to_char(p.prof_final,'MONTH') mes
											from nnmd_nomina_detalle d
											inner join nnom_nomina n on d.nmdn_empresa = n.nomn_empresa and d.nmdc_documento = n.nomc_documento and d.nmdn_numero = n.nomn_numero and d.nmdn_ubicacion = n.nomn_ubicacion 
											inner join npro_programa p on p.proc_codigo = n.nomc_programa
											where d.nmdv_tercero = :v_usuario
											and d.nmdc_documento = 'NM'
											and n.nomc_estado = 'P'
											and to_char(p.prof_final,'yyyy') = :v_anio
											order by 1 desc");
		oci_bind_by_name($consulta,':v_usuario',$_SESSION["cedula"]);
		oci_bind_by_name($consulta,':v_anio',$request->anio);
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function listaPeriodos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT distinct case when substr(p.prof_final,1,2) between 1 and 15 then 1 when substr(p.prof_final,1,2) between 16 and 31 then 2 end periodo
											from nnmd_nomina_detalle d
											inner join nnom_nomina n on d.nmdn_empresa = n.nomn_empresa and d.nmdc_documento = n.nomc_documento and d.nmdn_numero = n.nomn_numero and d.nmdn_ubicacion = n.nomn_ubicacion 
											inner join npro_programa p on p.proc_codigo = n.nomc_programa
											where d.nmdv_tercero = :v_usuario
											and d.nmdc_documento = 'NM'
											and n.nomc_estado = 'P'
											and to_char(p.prof_final,'yyyy') = :v_anio
											and to_char(p.prof_final,'mm') = :v_mes
											order by 1");
		oci_bind_by_name($consulta,':v_usuario',$_SESSION["cedula"]);
		oci_bind_by_name($consulta,':v_anio',$request->anio);
		oci_bind_by_name($consulta,':v_mes',$request->mes);
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function volantePago(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_th.p_llena_comprobante_pago(:v_cedula,:v_anio,:v_mes,:v_periodo,:js_conceptos,:js_afiliaciones,:js_totales); end;');
		oci_bind_by_name($consulta,':v_cedula',$_SESSION["cedula"]);
		oci_bind_by_name($consulta,':v_anio',$request->anio);
		oci_bind_by_name($consulta,':v_mes',$request->mes);
		oci_bind_by_name($consulta,':v_periodo',$request->per);
		$js1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':js_conceptos', $js1,-1,OCI_B_CLOB);
		$js2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':js_afiliaciones', $js2,-1,OCI_B_CLOB);
		$js3 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':js_totales', $js3,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$js1 = $js1->read($js1->size());
		$js2 = $js2->read($js2->size());
		$js3 = $js3->read($js3->size());
      echo '{"conceptos":'.$js1.',"afiliaciones":'.$js2.',"totales":'.$js3.'}' ;
		oci_close($c);
	}
?>