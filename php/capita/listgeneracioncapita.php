<?php
	if($_GET["funcion"]=='inconsistentesRS'){
        require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_informe_inconsistentes_subsidiado (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
	}else if ($_GET["funcion"]=='inconsistentesRC'){
		require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_informe_inconsistentes_contributivo (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
	}else if ($_GET["funcion"]=='preliminarRS'){
        require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_informe_precapita_subsidiado (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
	}else if ($_GET["funcion"]=='preliminarRC'){
        require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_informe_precapita_contributivo (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
	}
?>
