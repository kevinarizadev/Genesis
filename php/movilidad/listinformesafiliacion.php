<?php
	if($_GET["funcion"]=='procesadas'){
        global $fecha_inicio;
        global $fecha_fin;
        $fecha_inicio = $_GET["fecha_inicio"];
        $fecha_fin = $_GET["fecha_fin"];

        require_once('../config/dbcon_empresa.php');
        global $param;
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $cursor3 = oci_new_cursor($c);
        $cursor4 = oci_new_cursor($c);
        $cursor5 = oci_new_cursor($c);
        $cursor6 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_datos_informe (:v_inicio, :v_fin, :v_activas, :v_procesadas_cant, 
                                                                                            :v_procesadas_secc, :v_procesadas_det,
                                                                                            :v_rechazadas_cant, :v_rechazadas_det); end;');
        oci_bind_by_name($consulta,':v_inicio', $fecha_inicio);
        oci_bind_by_name($consulta,':v_fin', $fecha_fin);
        oci_bind_by_name($consulta, ':v_activas', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_cant', $cursor2, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_secc', $cursor3, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_det', $cursor4, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_cant', $cursor5, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_det', $cursor6, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        oci_execute($cursor3, OCI_DEFAULT);
        oci_execute($cursor4, OCI_DEFAULT);
        oci_execute($cursor5, OCI_DEFAULT);
        oci_execute($cursor6, OCI_DEFAULT);

        $datos = null;
        oci_fetch_all($cursor4, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        echo json_encode($datos);
        oci_free_statement($consulta);
        oci_free_statement($cursor4);
        

	}else if ($_GET["funcion"]=='rechazadas'){
        global $fecha_inicio;
        global $fecha_fin;
        $fecha_inicio = $_GET["fecha_inicio"];
        $fecha_fin = $_GET["fecha_fin"];

        require_once('../config/dbcon_empresa.php');
        global $param;
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $cursor3 = oci_new_cursor($c);
        $cursor4 = oci_new_cursor($c);
        $cursor5 = oci_new_cursor($c);
        $cursor6 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_datos_informe (:v_inicio, :v_fin, :v_activas, :v_procesadas_cant, 
                                                                                            :v_procesadas_secc, :v_procesadas_det,
                                                                                            :v_rechazadas_cant, :v_rechazadas_det); end;');
        oci_bind_by_name($consulta,':v_inicio', $fecha_inicio);
        oci_bind_by_name($consulta,':v_fin', $fecha_fin);
        oci_bind_by_name($consulta, ':v_activas', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_cant', $cursor2, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_secc', $cursor3, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_det', $cursor4, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_cant', $cursor5, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_det', $cursor6, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        oci_execute($cursor3, OCI_DEFAULT);
        oci_execute($cursor4, OCI_DEFAULT);
        oci_execute($cursor5, OCI_DEFAULT);
        oci_execute($cursor6, OCI_DEFAULT);

        $datos = null;
        oci_fetch_all($cursor6, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        echo json_encode($datos);
        oci_free_statement($consulta);
        oci_free_statement($cursor6);
    }else if ($_GET["funcion"]=='activas'){
        global $fecha_inicio;
        global $fecha_fin;
        $fecha_inicio = $_GET["fecha_inicio"];
        $fecha_fin = $_GET["fecha_fin"];

        require_once('../config/dbcon_empresa.php');
        global $param;
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $cursor3 = oci_new_cursor($c);
        $cursor4 = oci_new_cursor($c);
        $cursor5 = oci_new_cursor($c);
        $cursor6 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_datos_informe (:v_inicio, :v_fin, :v_activas, :v_procesadas_cant, 
                                                                                            :v_procesadas_secc, :v_procesadas_det,
                                                                                            :v_rechazadas_cant, :v_rechazadas_det); end;');
        oci_bind_by_name($consulta,':v_inicio', $fecha_inicio);
        oci_bind_by_name($consulta,':v_fin', $fecha_fin);
        oci_bind_by_name($consulta, ':v_activas', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_cant', $cursor2, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_secc', $cursor3, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_procesadas_det', $cursor4, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_cant', $cursor5, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_rechazadas_det', $cursor6, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        oci_execute($cursor3, OCI_DEFAULT);
        oci_execute($cursor4, OCI_DEFAULT);
        oci_execute($cursor5, OCI_DEFAULT);
        oci_execute($cursor6, OCI_DEFAULT);

        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        echo json_encode($datos);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    }
?>