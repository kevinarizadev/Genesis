<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenercantidades(){
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'begin pq_genesis_pe.p_cantidades(:v_pendientes,:v_realizadas); end;');
		$pendientes = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pendientes', $pendientes,-1,OCI_B_CLOB);
		$realizadas = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_realizadas', $realizadas,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($pendientes)) {
			$json = $pendientes->read($pendientes->size());
			$json2 = $realizadas->read($realizadas->size());
			echo '['.$json.','.$json2.']';
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function obtenerafiliados(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$patologia = $request->patologia;
		$estado = $request->estado;
		$consulta = oci_parse($c,"SELECT r.egec_tipo_documento tipodocumento,r.egec_afiliado documento,e.afic_nombre nombre, r.egef_modificado fechamodificacion, r.egef_fecha fechaingreso
										  from eger_gestion_riesgo r
										  left join eafi_afiliado e on e.afic_tipo_documento = r.egec_tipo_documento and e.afic_documento = r.egec_afiliado
										  where r.egec_estado = :v_estado
										        and r.egec_concepto = :v_patologia
										   order by r.egef_fecha");	
		oci_bind_by_name($consulta,':v_estado',$estado);
		oci_bind_by_name($consulta,':v_patologia',$patologia);
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function detaafil(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$patologia = $request->patologia;
		$consulta = oci_parse($c,'begin pq_genesis_pe.p_detalleafil	(:v_ptipo_documento,:v_pdocumento,:v_patologia,:v_afildata); end;');
		oci_bind_by_name($consulta, ':v_ptipo_documento', $type);
		oci_bind_by_name($consulta, ':v_pdocumento', $id);
		oci_bind_by_name($consulta, ':v_patologia', $patologia);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_afildata', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function dxanexos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$patologia = $request->patologia;
		$consulta = oci_parse($c,"SELECT trim(g.diac_codigo) CODIGO,g.diac_nombre NOMBRE,d.egdf_fecha FECHA,b.terc_nombre IPS,case when d.egdc_factura is null then 'AUT'
                                                                   when to_char(d.egdn_autorizacion) is null then 'FAC'
                                                                   end INGRESO--else 'Verificar' end afic_regimen
                                                                   ,case when d.egdc_factura is null then to_char(d.egdn_autorizacion)
                                                                   when to_char(d.egdn_autorizacion) is null then d.egdc_factura
                                                                   end SUBINGRESO
											from eger_gestion_riesgo_detalle d
											inner join edia_diagnostico g on trim(g.diac_codigo) = trim(d.egdc_diagnostico)
											left join bter_tercero b on b.terv_codigo = d.egdv_tercero
											where d.egdc_tipo_documento = :v_type and d.egdc_afiliado = :v_id and d.egdc_concepto = :v_patologia and d.egdc_diagnostico is not null");	
		oci_bind_by_name($consulta,':v_type',$type);
		oci_bind_by_name($consulta,':v_id',$id);
		oci_bind_by_name($consulta,':v_patologia',$patologia);
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function docanexos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$consulta = oci_parse($c,"SELECT t.tidc_nombre TIPO,s.sdcf_fecha_adjunto FECHA,s.sdcc_observaciones OBSERVACION,s.sdcc_ruta RUTA
											from esdc_soporte_doc s
											inner join etid_tipo_documental t on t.tidn_codigo = s.sdcn_tipo_documental and t.tidc_programa = 'poac'
											where s.sdcc_tipo_doc_afiliado = :v_type
									      and s.sdcc_afiliado = :v_id
									      and s.sdcn_tipo_documental in (select tidn_codigo from etid_tipo_documental where tidc_programa = 'poac' )");	
		oci_bind_by_name($consulta,':v_type',$type);
		oci_bind_by_name($consulta,':v_id',$id);
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function marcaafiliado(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$accion = $request->accion;
		$patologia = $request->patologia;
		$consulta = oci_parse($c,'begin pq_genesis_pe.p_marca_afiliado	(:v_ptipo_documento,:v_pdocumento,:v_accion,:v_patologia,:v_res); end;');
		oci_bind_by_name($consulta, ':v_ptipo_documento', $type);
		oci_bind_by_name($consulta, ':v_pdocumento', $id);
		oci_bind_by_name($consulta, ':v_accion', $accion);
		oci_bind_by_name($consulta, ':v_patologia', $patologia);
		oci_bind_by_name($consulta, ':v_res', $respuesta,50);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $respuesta;
		oci_close($c);
	}
	function cargapatologias(){
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT b.conc_codigo CODIGO, b.conc_nombre NOMBRE
											FROM bcon_concepto b
											WHERE b.conc_documento = 'GS'
											AND b.conc_estado = 'A'");	
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function obtenertipodocs(){
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT d.tidn_codigo CODIGO  ,d.tidc_nombre NOMBRE 
											FROM etid_tipo_documental d
											WHERE d.tidc_programa = 'poac'");	
		oci_execute($consulta);	
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cargadxs(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$patologia = $request->patologia;
		$list = $request->list;
		$keyword = $request->keyword;
		$consulta = oci_parse($c,'begin pq_genesis_pe.p_dx_patologia(:v_listado,:v_keyword,:v_patologia,:v_asociadas,:v_noasociadas); end;');
		oci_bind_by_name($consulta, ':v_listado', $list);
		oci_bind_by_name($consulta, ':v_keyword', $keyword);
		oci_bind_by_name($consulta, ':v_patologia', $patologia);
		$asociadas = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_asociadas', $asociadas,-1,OCI_B_CLOB);
		$noasociadas = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_noasociadas', $noasociadas,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		
		if ($list == 1) {
			if (isset($asociadas)) {
				$json = $asociadas->read($asociadas->size());
				echo '['.$json.']';
			}
		}else{
			if (isset($noasociadas)) {
				$json2 = $noasociadas->read($noasociadas->size());
				echo '['.$json2.']';
			}
		}
		oci_close($c);
	}
	function eliminadx(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$patologia = $request->patologia;
		$dx = $request->dx;
		$consulta = oci_parse($c,"UPDATE bcod_concepto_diagnostico p
											SET p.bcoc_estado = 'X'
											WHERE p.bcod_concepto = :v_patologia
											      and trim(p.bcod_diagnostico) = trim(:v_dx)");
		oci_bind_by_name($consulta,':v_patologia',$patologia);
		oci_bind_by_name($consulta,':v_dx',$dx);
		$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $result;
		oci_close($c);
	}
	function agregadx(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$patologia = $request->patologia;
		$dx = $request->dx;
		$consulta = oci_parse($c,'begin pq_genesis_pe.p_agrega_dx(:v_dx,:v_patologia); end;');
		oci_bind_by_name($consulta, ':v_dx', $dx);
		oci_bind_by_name($consulta, ':v_patologia', $patologia);
		$respuesta = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $respuesta;
		oci_close($c);
	}
	function creapatologia(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$codigo = $request->codigo;
		$nombre = $request->nombre;
		$consulta = oci_parse($c,"INSERT into bcon_concepto b (conc_documento,conc_codigo,conc_nombre ) 
											values ('GS',upper(:v_codigo),upper(:v_nombre))");
		oci_bind_by_name($consulta,':v_codigo',$codigo);
		oci_bind_by_name($consulta,':v_nombre',$nombre);
		$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $result;
		oci_close($c);
	}
	function eliminapatologia(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$patologia = $request->patologia;
		$consulta = oci_parse($c,"UPDATE bcon_concepto b
											SET b.conc_estado = 'X'
											WHERE b.conc_documento = 'GS'
											      AND b.conc_codigo = :v_patologia");
		oci_bind_by_name($consulta,':v_patologia',$patologia);
		$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $result;
		oci_close($c);
	}
?>