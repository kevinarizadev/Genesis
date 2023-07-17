<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
    $function();
    
    function generaCapita(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN pq_genesis_capita.p_genera_capita(:v_json_res); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }

    function informeCapita(){
        require_once('../config/dbcon_prod.php');
        global $request;
        if ($request->regimen == 'RC') {
            $consulta = oci_parse($c,'BEGIN pq_genesis_capita.p_capita_contributivo(:v_json_res); end;');
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
        }
        if ($request->regimen == 'RS') {
            $consulta = oci_parse($c,'BEGIN pq_genesis_capita.p_capita_subsidiado; end;');
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            // oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
        }
        oci_close($c);
    }

    function validaUsuario(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN pq_genesis_capita.p_valida_usuario(:v_json_res); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }


     //capita ips

    function p_resumen_capita_ips(){    
        require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_resumen_capita_ips (:v_pnit,:v_pperiodo, :v_response); end;');
        oci_bind_by_name($consulta,':v_pnit',$request->nit);  
        oci_bind_by_name($consulta,':v_pperiodo',$request->v_pperiodo);    
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);    
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos);
    
    }

    function p_valida_descarga() {
        require_once('../config/dbcon_prod.php');
        global $request;        
        $consulta = oci_parse($c, 'BEGIN pq_genesis_capita.p_valida_descarga(:v_pcontrato,:v_pubicacion,:v_pnit,:v_pregimen,:v_pperiodo,
        :v_json_res); end;');
        oci_bind_by_name($consulta, ':v_pcontrato',$request->contrato);
        oci_bind_by_name($consulta, ':v_pubicacion',$request->ubicacion);
        oci_bind_by_name($consulta, ':v_pnit',$request->nit);
        oci_bind_by_name($consulta, ':v_pregimen',$request->regimen);
        oci_bind_by_name($consulta, ':v_pperiodo',$request->periodo);
          $clob = oci_new_descriptor($c, OCI_D_LOB);
          oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
                               
        if (isset($clob)) {
            $json = $clob -> read($clob -> size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }
   
    
    function p_descarga_consolidado_ips()
    {
        require_once('../config/dbcon_prod.php');
        global $request;
  
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_capita.p_descarga_consolidado_ips (:v_pcontrato,:v_pubicacion,:v_pnit,:v_pregimen,:v_pperiodo,:v_pusuario,:v_response); end;');
        oci_bind_by_name($consulta,':v_pcontrato',$request->contrato); 
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
        oci_bind_by_name($consulta,':v_pnit',$request->nit);     
        oci_bind_by_name($consulta,':v_pregimen',$request->regimen);            
        oci_bind_by_name($consulta,':v_pperiodo',$request->periodo);   
        oci_bind_by_name($consulta,':v_pusuario',$request->usuario);                
        oci_bind_by_name($consulta,':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
    
    
        $datos = null;
    
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode([
            "datos" => count($datos) === 0 ? null : $datos
        ]);
        exit;
    }



    function p_visualiza_historico()
    {
        require_once('../config/dbcon_prod.php');
        global $request;
  
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_capita.p_visualiza_historico (:v_pcontrato,:v_pubicacion,:v_pnit,:v_pregimen,:v_pperiodo,:v_response); end;');
        oci_bind_by_name($consulta,':v_pcontrato',$request->contrato); 
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
        oci_bind_by_name($consulta,':v_pnit',$request->nit);     
        oci_bind_by_name($consulta,':v_pregimen',$request->regimen);            
        oci_bind_by_name($consulta,':v_pperiodo',$request->periodo);                        
        oci_bind_by_name($consulta,':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos);
    }



    function p_obtener_periodo(){    
        require_once('../config/dbcon_prod.php');
        global $request;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_capita.p_obtener_periodo (:v_response); end;');        
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
