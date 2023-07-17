<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_valida_afiliado()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_valida_afiliado(:query,:v_response); end;');
    oci_bind_by_name($consulta, ':query', $request->query);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);  
    $datos=null;  
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}


    function p_mostrar_afiliado_ips()
    {
        
    
      require_once('../config/dbcon_login.php');
      global $request;
      $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_afiliado_ips (:v_ptipo_documento,:v_pdocumento,:v_prespuesta); end;');
      oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
      oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);  
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());
      
      oci_close($c);
    
      echo $json;
      exit;
    }

function p_listar_grupo_etnico()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_listar_grupo_etnico(:v_response); end;');
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT); 
    $datos=null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}


function p_listar_actividades_economicas()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_listar_actividades_economicas(:v_response); end;');
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos=null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}

function p_listar_escolaridad()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_listar_escolaridad(:v_response); end;');
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);    
    $datos=null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}
function p_listar_grupo_poblacional()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_listar_grupo_poblacional(:v_response); end;');
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);  
    $datos=null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}   


function p_valida_nucleo_app()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_valida_nucleo_app(:v_ptipo_doc,:v_pnum_doc,:v_pficha,:v_response); end;');
    oci_bind_by_name($consulta, ':v_ptipo_doc', $request->v_ptipo_doc);
    oci_bind_by_name($consulta, ':v_pnum_doc', $request->v_pnum_doc);
    oci_bind_by_name($consulta, ':v_pficha', $request->v_pficha);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);  
    $datos=[];  
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}

function p_valida_nucleo_app_g()
{
    require_once('../config/dbcon_login.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_valida_nucleo_app_g(:v_ptipo_doc,:v_pnum_doc,:v_pficha,:v_response); end;');
    oci_bind_by_name($consulta, ':v_ptipo_doc', $request->v_ptipo_doc);
    oci_bind_by_name($consulta, ':v_pnum_doc', $request->v_pnum_doc);
    oci_bind_by_name($consulta, ':v_pficha', $request->v_pficha);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);  
    $datos=[];  
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos);
}



function p_actualiza_ficha_vivienda(){

       require_once('../config/dbcon_login.php');
        global $request;
        $json_data = json_encode($request->v_pjson);    
        $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_actualiza_ficha_vivienda(:v_pjson,:v_pcantidad,:v_pficha,:v_json_out); end;');
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson', $jsonin, -1, OCI_B_CLOB);    
        $jsonin->writeTemporary($json_data);
        oci_bind_by_name($consulta, ':v_pcantidad', $request->v_pcantidad);
        oci_bind_by_name($consulta, ':v_pficha', $request->v_pficha);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        $bd_response = $clob->read($clob->size());
        $json_bd_response = json_decode($bd_response);  
            echo $bd_response;
    
        oci_close($c);
}

function p_obtener_afiliados_cursovida_girs(){

       require_once('../config/dbcon_login.php');
        global $request;
        $json_data = json_encode($request->v_pjson_in);    
        $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_obtener_afiliados_cursovida_girs(:v_presponsable,:v_pjson_in,:v_pcantidad,:v_json_out); end;');
        oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_in', $jsonin, -1, OCI_B_CLOB);    
        $jsonin->writeTemporary($json_data);
        oci_bind_by_name($consulta, ':v_pcantidad', $request->v_pcantidad);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        $bd_response = $clob->read($clob->size());
        $json_bd_response = json_decode($bd_response);  
            echo $bd_response;
    
        oci_close($c);
}

  
function p_actualiza_datos_basicos(){

       require_once('../config/dbcon_login.php');
        global $request;
        $json_data = json_encode($request->v_pjson);    
        $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_actualiza_datos_basicos(:v_pjson,:v_pcantidad,:v_json_out); end;');        
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson', $jsonin, -1, OCI_B_CLOB);    
        $jsonin->writeTemporary($json_data);
        oci_bind_by_name($consulta, ':v_pcantidad', $request->v_pcantidad);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        $bd_response = $clob->read($clob->size());
        $json_bd_response = json_decode($bd_response);  
            echo $bd_response;
    
        oci_close($c);
}


function p_desvincular_afi(){

       require_once('../config/dbcon_login.php');
        global $request;        
        $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_desvincular_afi(:v_ptipodoc,:v_pdocumento,:v_json_out); end;');                
        oci_bind_by_name($consulta, ':v_ptipodoc', $request->v_ptipodoc);
        oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        $bd_response = $clob->read($clob->size());
        $json_bd_response = json_decode($bd_response);  
            echo $bd_response;
    
        oci_close($c);
}



function p_vincula_afiliado_nucleo(){
       require_once('../config/dbcon_login.php');
        global $request;
        $json_data = json_encode($request->v_pjson);    
        $consulta = oci_parse($c, 'BEGIN PQ_SERVICIO_CONSU.p_vincula_afiliado_nucleo(:v_pjson,:v_pcantidad,:v_ptipo_documento_cabeza,:v_pdocumento_cabeza,:v_json_out); end;'); 
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson', $jsonin, -1, OCI_B_CLOB);    
        $jsonin->writeTemporary($json_data);
        oci_bind_by_name($consulta, ':v_pcantidad', $request->v_pcantidad);        
        oci_bind_by_name($consulta, ':v_ptipo_documento_cabeza', $request->v_ptipo_documento_cabeza);        
        oci_bind_by_name($consulta, ':v_pdocumento_cabeza', $request->v_pdocumento_cabeza);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        $bd_response = $clob->read($clob->size());
        $json_bd_response = json_decode($bd_response);  
            echo $bd_response;
    
        oci_close($c);
}




?>
