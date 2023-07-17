<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function obtener_examen(){
        require_once('../config/dbcon.php');
        $id = 1;
        $documento = $_SESSION['cedula'];
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CTH.P_OBTENER_EXAMEN(:v_capacitacion, :v_documento, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_capacitacion',$id);
        oci_bind_by_name($consulta,':v_documento',$documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }   
    function responder_examen(){
        require_once('../config/dbcon.php');
        global $param;
        $respuestas = $param->respuestas;
        $respuestas_len = $param->respuestas_len;
        $documento = $_SESSION['cedula'];
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CTH.P_INSERTAR_EXAMEN(:v_json_resp, :v_len, :v_responsable, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_json_resp',$respuestas);
        oci_bind_by_name($consulta,':v_len',$respuestas_len);
        oci_bind_by_name($consulta,':v_responsable',$documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }
    function buscar_datos_contacto(){

        require_once('../config/dbcon.php');
        global $param;
        $tipo = $param->tipo;
        $documento = $param->documento;

        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin
  -- Call the procedure
  pq_genesis_plan_vacunacion.p_buscar_datos_contacto( :v_tipo_documento,
                                                            :v_documento,
                                                            :v_response);
end;
');


        oci_bind_by_name($consulta,':v_tipo_documento',$tipo);
        oci_bind_by_name($consulta,':v_documento',$documento);
        
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos) ;  
    }

    function obtenerViaPrincipal(){

        require_once('../config/dbcon.php');
        global $param;

        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin  pq_genesis_plan_vacunacion.p_listar_nomenclatura(:v_response); end;');
        
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos) ;  
    }

    function envia_sms(){
        global $param;
        session_start();
        $numero = $param->numero;
        $code = rand(1000,9999);
        $fecha = date("H:i:s d/m/Y");
        $mensaje = "Su codigo de verificación en Genesis es:  " .$code." Enviado a las ". $fecha;
        $_SESSION['code'] = $code;


        $url = 'https://api.infobip.com/sms/1/text/single';
        $header = array('Content-Type' => 'application/json', 'authorization' => 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==', 'accept'  => 'application/json');
        $data = array('from' => 'CajacopiEPS', 'to' => '57'.$numero, 'text'  => $mensaje);

        // use key 'http' even if you send the request to https://...
        $options = array(
        'http' => array(
        'method'  => 'POST',
        'header'  => 
        "Content-Type: application/x-www-form-urlencoded\r\n".
        "Authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==\n",
        'content' => http_build_query($data)));
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) { /* Handle error */ }

        echo ($result);
    }

        function auth(){
            require_once('../config/dbcon.php');
            global $param;

            $codigo = $param-> codigo;
       
            if ($codigo == $_SESSION['code']) {
                echo "1";       
            }else{
                echo "0";
            }


        }

        
         function confirmar_datos_contacto(){
            /*procedure p_valida_modal_afiliado  (v_tipo   in varchar2 default null,
                                    v_documento in varchar2 default null,
                                    v_res     out clob)*/
            require_once('../config/dbcon.php');
            global $param;
            
            $tipo = $param->tipo_documento;
            $documento = $param->documento;
            $responsable = $param->responsable;


            
            $consulta = oci_parse($c,'begin pq_genesis_plan_vacunacion.p_verifica_infocontacto  (:v_ptipo_documento,:v_pdocumento,:v_presponsable,:v_json_res); end;');
        
        
            oci_bind_by_name($consulta,':v_ptipo_documento',$tipo);
            oci_bind_by_name($consulta,':v_pdocumento',$documento);
            oci_bind_by_name($consulta,':v_presponsable',$responsable);

            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            } else {
                echo 0;
            }
            oci_close($c);
        }

        function actualizable(){
            /*procedure p_valida_modal_afiliado  (v_tipo   in varchar2 default null,
                                    v_documento in varchar2 default null,
                                    v_res     out clob)*/
            require_once('../config/dbcon.php');
            global $param;
            
            $tipo = $param->tipo;
            $documento = $param->documento;

            
            $consulta = oci_parse($c,'begin pq_genesis.p_valida_modal_afiliado  (:v_tipo_documento,:v_documento,:v_res); end;');
        
        
            oci_bind_by_name($consulta,':v_tipo_documento',$tipo);
            oci_bind_by_name($consulta,':v_documento',$documento);

            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            } else {
                echo 0;
            }
            oci_close($c);
        }

                        
        function get_phone(){

            require_once('../config/dbcon.php');
            global $param;
            $user = $param->user;
    
            
            $consulta = oci_parse($c,'begin pq_genesis.p_busca_celular_afil  (:v_usuario,:v_json_res); end;');
        
            oci_bind_by_name($consulta,':v_usuario',$user);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            } else {
                echo 0;
            }
            oci_close($c);
        }

    
    function actualizar_datos_contacto(){

        require_once('../config/dbcon.php');
        global $param;
    
    
        $consulta = oci_parse($c,'begin
        -- Call the procedure
        pq_genesis_plan_vacunacion.p_gestion_datos_contacto(:vp_tipo_documento,
                                                                  :vp_documento,
                                                                  :vp_direccion,
                                                                  :vp_localidad,
                                                                  :vp_telefono,
                                                                  :vp_celular,
                                                                  :vp_celular2,
                                                                  :vp_correo,
                                                                  :v_json_res);
      end;
      ');

        oci_bind_by_name($consulta,':vp_tipo_documento',$param -> tipo_documento);
        oci_bind_by_name($consulta,':vp_documento',$param -> documento);
        oci_bind_by_name($consulta,':vp_direccion',$param -> direccion);
        oci_bind_by_name($consulta,':vp_localidad',$param -> localidad);
        oci_bind_by_name($consulta,':vp_telefono',$param -> telefono);
        oci_bind_by_name($consulta,':vp_celular',$param -> celular);
        oci_bind_by_name($consulta,':vp_celular2',$param -> celular2);
        oci_bind_by_name($consulta,':vp_correo',$param -> correo);
        //oci_bind_by_name($consulta,':vp_fuente',$param -> fuente);        
        //oci_bind_by_name($consulta,':vp_responsable',$param -> responsable);        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }

    function obtenerPermisoVolante(){
      require_once('../config/dbcon.php');
      global $param;
      $consulta = oci_parse($c,'begin oasis.PQ_GENESIS_TH.p_obtener_funcionario_nomina(:v_documento,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_documento',$param->cedula);
      $clob = oci_new_descriptor($c,OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
      oci_execute($consulta,OCI_DEFAULT);
      if (isset($clob)) {
          $json = $clob->read($clob->size());
          echo $json;
      } else {
          echo 0;
      }
      oci_close($c);
  }
?>