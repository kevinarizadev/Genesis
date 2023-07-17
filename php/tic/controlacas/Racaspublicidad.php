<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenerDptoPublicidad()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_ACAS_PUBLICIDAD(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function obtenerAcas()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$keyword = '%' . $request->keyword . '%';
	$keyword2 = $request->keyword;
	$consulta =  oci_parse($c, "select t.nombre as nombre,
	t2.nombre as nombre_autoriza,
			u.casn_ubicacion UBICACION,
					 u.casn_numero as numero,
					 nvl(asu2.asuc_nombre,asu.asuc_nombre) as asunto,
					 to_char(u.cash_hora,'dd/mm/yyyy hh24:mi') as fecha_ingreso,
					 to_char(u.cash_cierre,'dd/mm/yyyy hh24:mi') as fecha_cierre,
					 case when u.casc_estado = 'A' then trunc(to_date(sysdate,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) else trunc(to_date(u.cash_cierre,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) end dias,
					 bu.ubgc_nombre as ciudad,
					 t.tern_cargo as cargo,
					 u.cast_diagnostico as descripcion
					 ,(select count(1) from acsd_caso_detalle cd where cd.csdn_empresa = u.casn_empresa
												   and cd.csdc_documento = u.casc_documento
												   and cd.csdn_numero = u.casn_numero
												   and cd.csdn_ubicacion = u.casn_ubicacion) cantidad
			  from acas_caso u
			  left join oasis.vw_terceros_ips t on t.documento = u.casv_tercero
			  left join oasis.vw_terceros_ips t2 on t2.documento = u.casv_autoriza
			  left join bubg_ubicacion_geografica bu on bu.ubgn_codigo = u.casn_ubicacion
			  left join oasis.basu_asunto asu on asu.asuc_documento = u.casc_documento and asu.asuc_concepto = u.casc_concepto
                                      and asu.asun_motivo = u.casn_motivo and trim(asu.id_asunto) = trim(u.cast_asunto)
									  left join oasis.basu_asunto asu2 on asu2.asuc_documento = u.casc_documento and asu2.asuc_concepto = u.casc_concepto
                                      and asu2.asun_motivo = u.casn_motivo and trim(asu2.asun_codigo) = trim(u.cast_asunto)
			  left join bcar_cargo b on b.carn_codigo = t.tern_cargo
						where u.casc_documento = 'RE' and t.nombre like UPPER(:keyword) or to_char(u.casn_numero) = :keyword2
						order by u.casn_numero desc");
	oci_bind_by_name($consulta, ':keyword', $keyword);
	oci_bind_by_name($consulta, ':keyword2', $keyword2);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function obtenerAcasXPersona()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$cedula = $request->cedula;
	$estado = $request->estado;
	if ($estado == "A") {
		$consulta =  oci_parse($c, " select bt.nombre as nombre,
bt2.terc_nombre as nombre_autoriza,
u.casn_ubicacion as ubicacion,
u.casn_numero as numero,
case when u.casc_concepto='GS' then BAs.ASUC_NOMBRE else BA.ASUC_NOMBRE end asunto,
                                        to_char(u.cash_hora,'dd/mm/yyyy hh24:mi') as fecha_ingreso,
                                        to_char(u.cash_cierre,'dd/mm/yyyy hh24:mi') as fecha_cierre,
                                        case when u.casc_estado = 'A' then trunc(to_date(sysdate,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) else trunc(to_date(u.cash_cierre,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) end dias,
                                        bu.ubgc_nombre as ciudad,
                                        b.carc_nombre as cargo,
                                        u.cast_diagnostico as descripcion,
                                        (select count(1) from acsd_caso_detalle cd where cd.csdn_empresa = u.casn_empresa
                                       and cd.csdc_documento = u.casc_documento
                                       and cd.csdn_numero = u.casn_numero
                                       and cd.csdn_ubicacion = u.casn_ubicacion) cantidad
                                 from acas_caso u
                                 left join oasis.vw_terceros_ips bt on bt.documento = u.casv_tercero
left join bter_tercero bt2 on bt2.terv_codigo = u.casv_autoriza
                                 inner join bubg_ubicacion_geografica bu on bu.ubgn_codigo = u.casn_ubicacion
left join bcar_cargo b on b.carn_codigo = bt.tern_cargo
LEFT JOIN OASIS.BASU_ASUNTO BA ON TO_CHAR(BA.ID_ASUNTO) = TO_CHAR(u.cast_asunto)
LEFT JOIN OASIS.BASU_ASUNTO BAs ON TO_CHAR(BAs.ASUN_CODIGO) = TO_CHAR(u.cast_asunto) and BAs.Asuc_Documento=u.casc_documento and BAs.Asuc_Concepto=u.casc_concepto and BAs.Asun_Motivo=u.casn_motivo
		                                 where u.casc_documento = 'RE' and u.casv_autoriza = :cedula and u.casc_estado = :estado
																		 order by dias desc, fecha_ingreso asc");
	} else {
		$consulta =  oci_parse($c, " select bt.nombre as nombre,
																						bt2.terc_nombre as nombre_autoriza,
																						u.casn_ubicacion as ubicacion,
		                                        u.casn_numero as numero,
												case when u.casc_concepto='GS' then BAs.ASUC_NOMBRE else BA.ASUC_NOMBRE end asunto,
		                                        to_char(u.cash_hora,'dd/mm/yyyy hh24:mi') as fecha_ingreso,
		                                        to_char(u.cash_cierre,'dd/mm/yyyy hh24:mi') as fecha_cierre,
		                                        case when u.casc_estado = 'A' then trunc(to_date(sysdate,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) else trunc(to_date(u.cash_cierre,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) end dias,
		                                        bu.ubgc_nombre as ciudad,
		                                        b.carc_nombre as cargo,
		                                        u.cast_diagnostico as descripcion,
		                                        (select count(1) from acsd_caso_detalle cd where cd.csdn_empresa = u.casn_empresa
                                       and cd.csdc_documento = u.casc_documento
                                       and cd.csdn_numero = u.casn_numero
                                       and cd.csdn_ubicacion = u.casn_ubicacion) cantidad
		                                 from acas_caso u
		                                 left join oasis.vw_terceros_ips bt on bt.documento = u.casv_tercero
																		 left join bter_tercero bt2 on bt2.terv_codigo = u.casv_autoriza
		                                 inner join bubg_ubicacion_geografica bu on bu.ubgn_codigo = u.casn_ubicacion
										 left join bcar_cargo b on b.carn_codigo = bt.tern_cargo
										 LEFT JOIN OASIS.BASU_ASUNTO BA ON TO_CHAR(BA.ID_ASUNTO) = TO_CHAR(u.cast_asunto)
										 LEFT JOIN OASIS.BASU_ASUNTO BAs ON TO_CHAR(BAs.ASUN_CODIGO) = TO_CHAR(u.cast_asunto) and BAs.Asuc_Documento=u.casc_documento and BAs.Asuc_Concepto=u.casc_concepto and BAs.Asun_Motivo=u.casn_motivo
		                                 where u.casc_documento = 'RE' and u.casv_autoriza = :cedula and u.casc_estado = :estado
																		 order by fecha_ingreso desc");
	}
	oci_bind_by_name($consulta, ':estado', $estado);
	oci_bind_by_name($consulta, ':cedula', $cedula);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function obtenerAcasDetalleXticket()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ticket = $request->ticket;
	$ubicacion = $request->ubicacion;
	$consulta =  oci_parse($c, "select j.csdn_renglon as renglon,
           to_char(j.csdh_entrega,'dd/mm/yyyy hh24:mi') as fecha,
j.csdt_descripcion as descripcion,
case when j.csdc_tipo = 'R' 
      and j.csdv_tercero_anterior is not null
    then
     upper(b.terc_nombre)||'->'||oasis.f_utf8_json(t.nombre) else oasis.f_utf8_json(t.nombre) end emisor
from acsd_caso_detalle j
left join oasis.vw_terceros_ips t on t.documento = j.csdv_tercero 
   left join bter_tercero b on b.terv_codigo = j.csdv_tercero_anterior
where j.csdc_documento = 'RE' and j.csdn_ubicacion = :ubicacion and j.csdn_numero = :ticket
order by j.csdn_renglon desc");
	oci_bind_by_name($consulta, ':ticket', $ticket);
	oci_bind_by_name($consulta, ':ubicacion', $ubicacion);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

