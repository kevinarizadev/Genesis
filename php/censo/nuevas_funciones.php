<?php

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function insertar_entrevista(){
        // echo "1";
        require_once('../config/dbcon_pru.php');
        global $request;
        $consulta = oci_parse($c,'begin pq_genesis_ch.P_ACTUALIZAR_ENTREVISTA(:v_pnumero,:v_pubicacion,:v_pnombre, :v_descripcion,:v_respuesta); end;');
        oci_bind_by_name($consulta,':v_pnumero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
        oci_bind_by_name($consulta,':v_pnombre',$request->nombre);
        oci_bind_by_name($consulta,':v_descripcion',$request->descripcion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);

            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
            oci_close($c);
    }
    /*
    function obtener_censo(){
        // echo "1";
        require_once('../config/dbcon_pru.php');
        global $request;
        $consulta = oci_parse($c,'begin pq_genesis_chTEST.P_OBTENER_CENSO_UNICO (:v_pubicacion,:v_pnumero,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$request->numerocenso);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
    }*/
    function obtener_censo(){
        require_once('../config/dbcon_pru.php');
        global $request;
        
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_censo_unico(:v_pubicacion,
                                                                                                    :v_pnumerocenso,
                                                                                                    :v_response); end;');

        oci_bind_by_name($consulta,':v_pnumero',$request->numerocenso);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
        
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos) ;      
    }

    
    function obtener_glosas(){
        // echo "1";
        require_once('../config/dbcon_pru.php');
        global $request;
        $consulta = oci_parse($c,'begin pq_genesis_ch.P_OBTENER_HIST_GLOSA(:v_pnumero,:v_pubicacion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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


    function obtener_glosas_cursor(){
        // echo "1";
        require_once('../config/dbcon_pru.php');
        global $request;
            
        $cursor = oci_new_cursor($c);
        
        $consulta = oci_parse($c,'begin        
        pq_genesis_censo_hospitalario.p_obtener_hist_glosa(:v_pnumero,
                                                                 :v_pubicacion,
                                                                 :v_response);
                                                                 end; ');
        oci_bind_by_name($consulta,':v_pnumero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
        
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos) ;      
    }

function insertar_queja(){
    // echo "1";
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_ch.P_ACTUALIZAR_QUEJAS(:v_pnumero,
    :v_pubicacion,
    :v_id,
    :v_descripcion,
    :v_pcodigo,
    :v_respuesta); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->pubicacion);
    oci_bind_by_name($consulta,':v_id',$request->id);
    oci_bind_by_name($consulta,':v_descripcion',$request->descripcion);
    oci_bind_by_name($consulta,':v_pcodigo',$request->pcodigo);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);

        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
}

/*PROCEDURE P_ACTUALIZAR_RESPUESTA_QUEJAS       (v_pnumero                   in numeric DEFAULT NULL,                                                  
  v_pubicacion                in numeric DEFAULT NULL,
  v_id                        in numeric DEFAULT NULL,
  v_descripcion               in varchar2 DEFAULT NULL,
  v_respuesta                 out clob);
*/
function ACTUALIZAR_RESPUESTA_QUEJAS(){
    // echo "1";
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_ch.P_ACTUALIZAR_RESPUESTA_QUEJAS(:v_pnumero,
    :v_pubicacion,
    :v_id,
    :v_descripcion,
    :v_respuesta); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->pubicacion);
    oci_bind_by_name($consulta,':v_id',$request->id);
    oci_bind_by_name($consulta,':v_descripcion',$request->descripcion);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);

        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
}

/*actualizar censo     PROCEDURE P_ACTUALIZAR_DATOS (v_pnumero in varchar2,*/
function actualizar_glosa(){
        require_once('../config/dbcon_pru.php');
        global $request;
        $consulta = oci_parse($c,'begin pq_genesis_chTEST.P_ACTUALIZAR_GLOSA(:v_pnumero,
        :v_pubicacion,
        :v_prenglon,
        :v_pmotivo,
        :v_pvalor,
        :v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
        oci_bind_by_name($consulta,':v_prenglon',$request->renglon);
        oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);
        oci_bind_by_name($consulta,':v_pvalor',$request->valor);
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
    
    function inserta_encuesta_psi()
    {
        require_once('../config/dbcon_pru.php');
        global $request;
        $consulta = oci_parse($c,'begin  pq_genesis_ch.p_ui_psi(:v_numero,:v_ubicacion, :v_responsable, :v_pjson_row_in, :v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_numero',$request->numero);
        oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);
        oci_bind_by_name($consulta,':v_responsable',$request->responsable);
        
        $row_json = json_encode($request->encuesta);
        oci_bind_by_name($consulta,':v_pjson_row_in',$row_json);

        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);

            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo 0;
            }
            oci_close($c);
    }
    function actualizar_censo(){
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_chTEST.P_ACTUALIZAR_DATOS(:v_pnumero,
    :v_pubicacion,
    :v_pdx,
    :v_pdx1,
    :v_pdx2,
    :v_json_row); end;');
    
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    oci_bind_by_name($consulta,':v_pdx',$request->dx);
    oci_bind_by_name($consulta,':v_pdx1',$request->dx1);
    oci_bind_by_name($consulta,':v_pdx2',$request->dx2);
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

    function obtener_aut(){
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_autpro.p_obtener_autorizaciones(:v_pdocumento,
    :v_pnumero,
    :v_pubicacion,
    :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$request->v_pdocumento);
    oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
 
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

    function actualizar_prestador(){
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_chTEST.p_actualizar_prestador(:v_pnumero,
    :v_pubicacion,
    :v_pdata,
    :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    oci_bind_by_name($consulta,':v_pdata',$request->prestador);
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
    
    function actualizar_fecha(){
    require_once('../config/dbcon_pru.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_chTEST.p_actualizar_fecha(:v_pnumero,
    :v_pubicacion,
    :v_pfecha_i,
    :v_pfecha_f,
    :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    
    $finicio = $request->fecha_i;
    $newDate = date("d/m/Y", strtotime($finicio));
    oci_bind_by_name($consulta,':v_pfecha_i',$newDate);

    $ffin = $request->fecha_f;
    $newDatee = date("d/m/Y", strtotime($ffin));
    // echo $newDate;
    oci_bind_by_name($consulta,':v_pfecha_f',$newDatee);
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
