<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    
    function obtener_gestionacascontratacion(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN pq_genesis_contr.P_OBTENER_ACAS_CONTRATACION(:v_jsonout_eps, :v_jsonout_ips); end;');
        oci_bind_by_name($consulta, ':v_jsonout_eps', $respuesta,4000);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_jsonout_ips', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json2 = $clob->read($clob->size());
            echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
        }else{
            echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
        }
        oci_close($c);
    }
    



    function obteneracasconcepto_responsable(){
        require_once('../config/dbcon_prod.php');
        global $param;  
        $consulta = oci_parse($c, 'begin pq_genesis_contr.p_obtener_acas_concepto(:v_pconcepto,
                                                                                        :v_ptipo,
                                                                                        :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_pconcepto', $param->concepto);
        oci_bind_by_name($consulta, ':v_ptipo', $param->tipo);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }



    function obteneracasconcepto(){
        require_once('../config/dbcon_prod.php');
        global $param;  
        $consulta = oci_parse($c, 'begin pq_genesis_contr.p_obtener_acas_concepto_persona(:v_pconcepto,
                                                                                        :v_pestado,
                                                                                        :v_ptipo,
                                                                                        :v_cedula,
                                                                                        :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_pconcepto', $param->concepto);
        oci_bind_by_name($consulta, ':v_pestado', $param->estado);
        oci_bind_by_name($consulta, ':v_ptipo', $param->tipo);
        oci_bind_by_name($consulta, ':v_cedula', $param->cedula);


        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }


    function obtenerAcasDetalleXticket(){
        require_once('../config/dbcon_prod.php');
        global $param;  
        $consulta = oci_parse($c, 'begin pq_genesis_contr.p_obtener_detalle_acas(:v_pnumero,
                                                                                    :v_pubicacion,
                                                                                    :v_json_out); end;');
        
        oci_bind_by_name($consulta, ':v_pnumero', $param->ticket);
        oci_bind_by_name($consulta, ':v_pubicacion', $param->ubicacion);

        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    // function obtenerAcasDetalleXticket(){
    //     require_once('../config/dbcon_prod.php');
    //     global $request;
    //    /* $v_pnumero = $request->ticket;
    //    $v_pubicacion = $request->ubicacion;*/
    //     $consulta =  oci_parse($c,'begin pq_genesis_contr.p_obtener_detalle_acas(
    //                                                                          :v_pnumero, 
    //                                                                          :v_pubicacion,
    //                                                                          v_json_out); end;');
    //     oci_bind_by_name($consulta,':v_pnumero ',$request->ticket);
    //    oci_bind_by_name($consulta,':v_pubicacion ',$request->ubicacion);
    //     oci_execute($consulta);
    //     $rows = array();while($row = oci_fetch_assoc($consulta))
    //     {
    //         $rows[] = $row;
    //     }
    //     echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    //     oci_close($c);
    // }


?>
