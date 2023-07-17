<?php
	require_once('../../config/dbcon.php');
    global $request;
    $responsable = $_SESSION["cedula"];
    if ($_SESSION["cedula"]== 8646049 || $_SESSION["cedula"]== 22523027 || $_SESSION["cedula"]== 1143450658) {
        $consulta = oci_parse($c,"SELECT r.responsable||' - '||r.nombre_responsable responsable, r.tipo_reporte tipo_reporte, 
                                     r.periodo_reporte periodo, r.fecha_generacion||' - '||r.hora_inicio fecha_inicio,
                                     r.fecha_fin||' - '||r.hora_fin fecha_fin, r.transcurrido ||' Minutos' transcurrido,
                                  case when r.tipo_reporte = 'C' then 'Crecimiento de Población' 
                                       when r.tipo_reporte = 'TN' then 'Traslados Negados'
                                       when r.tipo_reporte = 'RN' then 'Reporte Novedades' end tipo_reporte
                                  from REPORTE_NOVEDADES_HISTORIAL r
                                  order by to_date(r.fecha_generacion,'yyyy/mm/dd') desc"
                            );
        oci_execute($consulta);
        $rows = array();
        while($row = oci_fetch_assoc($consulta))
        {
            $rows[] = $row;
        }
        echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
        oci_close($c);
    }else{
        $consulta = oci_parse($c,"SELECT r.responsable||' - '||r.nombre_responsable responsable, r.tipo_reporte tipo_reporte, 
                                        r.periodo_reporte periodo, r.fecha_generacion||' - '||r.hora_inicio fecha_inicio,
                                        r.fecha_fin||' - '||r.hora_fin fecha_fin, r.transcurrido ||' Minutos' transcurrido,
                                    case when r.tipo_reporte = 'C' then 'Crecimiento de Población' 
                                        when r.tipo_reporte = 'TN' then 'Traslados Negados'
                                        when r.tipo_reporte = 'RN' then 'Reporte Novedades' end tipo_reporte
                                    from REPORTE_NOVEDADES_HISTORIAL r
                                    where r.responsable = :v_presponsable
                                    order by to_date(r.fecha_generacion,'yyyy/mm/dd') desc"
                                );
        oci_bind_by_name($consulta, ':v_presponsable', $responsable);
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