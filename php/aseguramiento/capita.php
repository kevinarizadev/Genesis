<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_resumen_capita_ips(){    
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin pq_genesis_capita.p_resumen_capita_ips (:v_pnit, :v_response); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);    
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);    
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);

}


function p_descarga_consolidado_ips(){    
    require_once('../config/dbcon_prod.php');
    global $request;            
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin pq_genesis_capita.p_descarga_consolidado_ips (:v_pnit,:v_pcontrato,:v_pperiodo, :v_response); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);    
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);    
    oci_bind_by_name($consulta,':v_pperiodo',$request->periodo);    
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
