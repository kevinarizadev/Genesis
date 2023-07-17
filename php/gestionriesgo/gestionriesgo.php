<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();
    



    function p_obtener_datos_afiliado(){
        require_once('../config/dbcon_prod.php');
        global $request;
        
        $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_OBTENER_DATOS_AFILIADO(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipodocumento',$request->tipodocumento);
        oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
            oci_close($c);
        }

        
    function p_obtener_teleorientacion(){
        require_once('../config/dbcon_prod.php');
        global $request;        
        $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_OBTENER_TELEORIENTACION(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipodocumento',$request->tipodocumento);
        oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
            oci_close($c);
        }


        function p_ui_teleorientacion(){
            require_once('../config/dbcon_prod.php');
            global $request;
            $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TELEORIENTACION.P_UI_TELEORIENTACION(:v_pdatos,
                                                                                  :v_pjson_row); end;');
            $jsonin = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pdatos', $jsonin, -1, OCI_B_CLOB);  
            $jsonin->writeTemporary($request->datos);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
            if (isset($clob)) {
              $json = $clob->read($clob->size());
              echo $json;
            }else{
              echo $clob;
            }
            oci_close($c);
          }

          function p_obtener_evolucion(){
            require_once('../config/dbcon_prod.php');
            global $request;        
            $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_OBTENER_EVOLUCION(:v_pnumero,:v_json_row); end;');
            oci_bind_by_name($consulta,':v_pnumero',$request->numero);        
            $clob = oci_new_descriptor($c,OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
                oci_execute($consulta,OCI_DEFAULT);
                if (isset($clob)) {
                    $json = $clob->read($clob->size());
                    echo $json;
                }else{
                    echo 0;
                }
                oci_close($c);
        }


        function p_ui_evolucion(){
            require_once('../config/dbcon_prod.php');
            global $request;        
            $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_UI_EVOLUCION(:v_pnumero,:v_pfecha,:v_pobservacion,:v_json_row); end;');
            oci_bind_by_name($consulta,':v_pnumero',$request->numero);  
            oci_bind_by_name($consulta,':v_pfecha',$request->fecha);  
            oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);  
            $clob = oci_new_descriptor($c,OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
                oci_execute($consulta,OCI_DEFAULT);
                if (isset($clob)) {
                    $json = $clob->read($clob->size());
                    echo $json;
                }else{
                    echo 0;
                }
                oci_close($c);
        }


        function  p_gen_nov() {
            require_once('../config/dbcon_prod.php');
            global $request;                           
            $consulta = oci_parse($c,'begin pq_genesis_ca.p_gen_nov(:v_tipo_doc,
                                                                    :v_documento,
                                                                    :v_direccion, 
                                                                    :v_telefono,
                                                                    :v_celular,                                                                                    
                                                                    :v_correo,                                                                                                                                                       
                                                                    :v_json_row); end;');
            oci_bind_by_name($consulta,':v_tipo_doc',$request->tipo_documento);
            oci_bind_by_name($consulta,':v_documento',$request->documento);
            oci_bind_by_name($consulta,':v_direccion',$request->direccion);
            oci_bind_by_name($consulta,':v_telefono',$request->telefono);
            oci_bind_by_name($consulta,':v_celular',$request->celular);    
            oci_bind_by_name($consulta,':v_correo',$request->correo);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
                oci_execute($consulta,OCI_DEFAULT);
                if (isset($clob)) {
                    $json = $clob->read($clob->size());
                    echo $json;
                }else{
                    echo 0;
                }
                oci_close($c);
        }
     
        
        function p_listar_teleorientaciones(){
            require_once('../config/dbcon_prod.php');
            global $request;                          
            $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_LISTAR_TELEORIENTACIONES(:v_ubicacion,:v_nit,:v_json_row); end;');
            oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);        
            oci_bind_by_name($consulta,':v_nit',$request->nit);        
            $clob = oci_new_descriptor($c,OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
                oci_execute($consulta,OCI_DEFAULT);
                if (isset($clob)) {
                    $json = $clob->read($clob->size());
                    echo $json;
                }else{
                    echo 0;
                }
                oci_close($c);
        }

        // function p_listar_teleorientaciones(){
        //     require_once('../config/dbcon_prod.php');
        //     global $request;
            
        //     $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.P_LISTAR_TELEORIENTACIONES(:v_json_row); end;');            
        //     $clob = oci_new_descriptor($c,OCI_D_LOB);
        //         oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        //         oci_execute($consulta,OCI_DEFAULT);
        //         if (isset($clob)) {
        //             $json = $clob->read($clob->size());
        //             echo $json;
        //         }else{
        //             echo 0;
        //         }
        //         oci_close($c);
        //     }


           function print_teleorientacion(){
                require_once('../config/dbcon_prod.php');
                global $request;        
                $consulta = oci_parse($c,'begin PQ_GENESIS_TELEORIENTACION.PRINT_TELEORIENTACION(:v_pnumero,:v_json_row); end;');
                oci_bind_by_name($consulta,':v_pnumero',$request->numero);        
                $clob = oci_new_descriptor($c,OCI_D_LOB);
                    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
                    oci_execute($consulta,OCI_DEFAULT);
                    if (isset($clob)) {
                        $json = $clob->read($clob->size());
                        echo $json;
                    }else{
                        echo 0;
                    }
                    oci_close($c);
            }
         
    
       
        
?>
