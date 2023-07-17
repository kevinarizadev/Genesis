<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
   function lista_condicion() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_afiliacion_contributivo.p_lista_condicion(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        foreach ($datos as $record) {
            $formatted[] = [
                "codigo" => $record["CODIGO"],
                "nombre" => $record["NOMBRE"]
            ];
        }
        echo json_encode(count($formatted) === 0 ? null : $formatted);
        exit;
    }
    function lista_tipo_cotizante() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $condicion = $param->condicion;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_afiliacion_contributivo.p_lista_tipo_cotizante(:v_condicion, :v_response); end;');
        oci_bind_by_name($consulta,':v_condicion',$condicion);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        foreach ($datos as $record) {
            $formatted[] = [
                "codigo" => $record["CODIGO"],
                "nombre" => $record["NOMBRE"],
                "paquete" => $record["PAQUETE"]
            ];
        }
        echo json_encode(count($formatted) === 0 ? null : $formatted);
        exit;
    }
    function lista_datos_afiliado() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $tipo_doc = $param->tipo_doc;
        $documento = $param->documento;
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_datos_afiliado(:v_tipo_doc, :v_documento, :v_response, :v_beneficiarios); end;');
        oci_bind_by_name($consulta,':v_tipo_doc',$tipo_doc);
        oci_bind_by_name($consulta,':v_documento',$documento);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_beneficiarios', $cursor2, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        $datos = null;
        $datos2 = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor2, $datos2, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        oci_free_statement($cursor2);
        $json = '{"datos_basicos":'.json_encode(count($datos) === 0 ? null : $datos[0]).',"beneficiarios":'.json_encode(count($datos2) === 0 ? [] : $datos2).'}';
        echo $json;
        exit;
    }
    function lista_afp() {
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_afp(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_arl() {
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_arl(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_parentezco() {
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_parentezco(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_eps() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $coincidencia = $param->coincidencia;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_eps(:v_coincidencia, :v_response); end;');
        oci_bind_by_name($consulta,':v_coincidencia',$coincidencia);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_departamento() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $coincidencia = $param->coincidencia;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_departamento(:v_coincidencia, :v_response); end;');
        oci_bind_by_name($consulta,':v_coincidencia',$coincidencia);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_municipio () {
        global $param;
        require_once('../config/dbcon_prod.php');
        $departamento = $param->departamento;
        $coincidencia = $param->coincidencia;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_municipio(:v_departamento, :v_coincidencia, :v_response); end;');
        oci_bind_by_name($consulta,':v_departamento',$departamento);
        oci_bind_by_name($consulta,':v_coincidencia',$coincidencia);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_estado_civil() {
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_estado_civil(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_ips() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $ubicacion = $param->ubicacion;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_ips(:v_ubicacion, :v_response); end;');
        oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }

    function lista_aportante() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo_documento = $param->tipo_documento;
        $documento = $param->documento;     
        $consulta = oci_parse($c,'begin pq_genesis_mov.p_obtiene_empresa (:v_tipo_documento,:v_documento,:v_json_empresa,:v_json_archivos,:v_json_asesores,:v_json_sedes,:v_json_novedades); end;');
        oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
        oci_bind_by_name($consulta,':v_documento',$documento);
        $clob1 = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_empresa', $clob1,-1,OCI_B_CLOB);
        $clob2 = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_archivos', $clob2,-1,OCI_B_CLOB);
        $clob3 = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_asesores', $clob3,-1,OCI_B_CLOB);
        $clob4 = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_sedes', $clob4,-1,OCI_B_CLOB);
        $clob5 = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_novedades', $clob5,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json1 = $clob1->read($clob1->size());
        $json2 = $clob2->read($clob2->size());
        $json3 = $clob3->read($clob3->size());
        $json4 = $clob4->read($clob4->size());
        $json5 = $clob5->read($clob5->size());
        $var = '{"info_empresa":'.$json1.',"lista_archivos":'.$json2.',"lista_responsables":'.$json3.',"lista_sucursales":'.$json4.',"lista_novedades":'.$json5.'}';
        echo($var);
        oci_close($c);
    }
    function lista_info_aportante() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $tipo_documento = $param->tipo_documento;
        $documento = $param->documento;  
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'begin pq_genesis_afiliacion_contributivo.p_obtener_info_apo(:v_tipo_documento,
                                                                  :v_documento,
                                                                  :v_response); end;');
        oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
        oci_bind_by_name($consulta,':v_documento',$documento);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        // foreach ($datos as $record) {
        //     $formatted[] = [
        //         "codigo" => $record["CODIGO"],
        //         "nombre" => $record["NOMBRE"]
        //     ];
        // }
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_actividad() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_actividad(:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }

   //  function insertar_solicitud() {
   //      require_once('../config/dbcon_prod.php');
   //      global $param;
   //      if (($param->origen!="E")?isset($_SESSION["cedula"]):isset($param->doc_aportante)) {
   //          $condicion = $param->condicion;
   //          $tipo_cotizante = $param->tipo_cotizante;
   //          $tipo_doc_aportante = $param->tipo_doc_aportante;
   //          $doc_aportante = $param->doc_aportante;
   //          $tipo_doc_cotizante = $param->tipo_doc_cotizante;
   //          $doc_cotizante = $param->doc_cotizante;
   //          $pri_nombre = $param->pri_nombre;
   //          $seg_nombre = $param->seg_nombre;
   //          $pri_apellido = $param->pri_apellido;
   //          $seg_apellido = $param->seg_apellido;
   //          $nacimiento = $param->nacimiento;
   //          $genero = $param->genero;
   //          $estado_civil = $param->estado_civil;
   //          $direccion = $param->direccion;
   //          $ubicacion_geografica = $param->ubicacion_geografica;
   //          $zona = $param->zona;
   //          $escenario = $param->escenario;
   //          $telef = $param->telef;
   //          $celular = $param->celular;
   //          $correo = $param->correo;
   //          $afp = $param->afp;
   //          $arl = $param->arl;
   //          $salario = $param->salario;
   //          $actividad = $param->actividad;
   //          $ingreso = $param->ingreso;
   //          $origen = $param->origen;
   //          $responsable = ($param->origen!="E")?$_SESSION["cedula"]:$param->doc_aportante;
   //          $beneficiarios = $param->beneficiarios;
   //          $cantidad = $param->cantidad;
   //          $soportes = $param->soportes;
   //          $cantidad_soportes = $param->cantidad_soportes;
   //          $tipo_solicitud = $param->tipo_solicitud;
   //          $barrio_cotizante = $param->barrio_cotizante;
   //          $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_inserta_solicitud(:v_condicion,
   //                                                                              :v_tipo_cotizante, 
   //                                                                              :v_tipo_doc_aportante, 
   //                                                                              :v_doc_aportante, 
   //                                                                              :v_tipo_doc_cotizante, 
   //                                                                              :v_doc_cotizante, 
   //                                                                              :v_pri_nombre, 
   //                                                                              :v_seg_nombre, 
   //                                                                              :v_pri_apellido,  
   //                                                                              :v_seg_apellido,  
   //                                                                              :v_nacimiento,  
   //                                                                              :v_genero,  
   //                                                                              :v_estado_civil,  
   //                                                                              :v_direccion,  
   //                                                                              :v_ubicacion_geografica,  
   //                                                                              :v_zona,  
   //                                                                              :v_escenario,  
   //                                                                              :v_telefono,  
   //                                                                              :v_celular,  
   //                                                                              :v_correo,  
   //                                                                              :v_afp,  
   //                                                                              :v_arl,  
   //                                                                              :v_salario,  
   //                                                                              :v_ingreso, 
   //                                                                              :v_actividad,
   //                                                                              :v_origen, 
   //                                                                              :v_responsable,  
   //                                                                              :v_beneficiarios,  
   //                                                                              :v_cantidad,
   //                                                                              :v_adjuntos,
   //                                                                              :v_cantidad_adjuntos,
   //                                                                              :v_tipo_solicitud,
   //                                                                              :v_barrio,
   //                                                                              :v_response); end;');
   //          oci_bind_by_name($consulta,':v_condicion',$condicion);
   //          oci_bind_by_name($consulta,':v_tipo_cotizante',$tipo_cotizante);
   //          oci_bind_by_name($consulta,':v_tipo_doc_aportante',$tipo_doc_aportante);
   //          oci_bind_by_name($consulta,':v_doc_aportante',$doc_aportante);
   //          oci_bind_by_name($consulta,':v_tipo_doc_cotizante',$tipo_doc_cotizante);
   //          oci_bind_by_name($consulta,':v_doc_cotizante',$doc_cotizante);
   //          oci_bind_by_name($consulta,':v_pri_nombre',$pri_nombre);
   //          oci_bind_by_name($consulta,':v_seg_nombre',$seg_nombre);
   //          oci_bind_by_name($consulta,':v_pri_apellido',$pri_apellido);
   //          oci_bind_by_name($consulta,':v_seg_apellido',$seg_apellido);
   //          oci_bind_by_name($consulta,':v_nacimiento',$nacimiento);
   //          oci_bind_by_name($consulta,':v_genero',$genero);
   //          oci_bind_by_name($consulta,':v_estado_civil',$estado_civil);
   //          oci_bind_by_name($consulta,':v_direccion',$direccion);
   //          oci_bind_by_name($consulta,':v_ubicacion_geografica',$ubicacion_geografica);
   //          oci_bind_by_name($consulta,':v_zona',$zona);
   //          oci_bind_by_name($consulta,':v_escenario',$escenario);
   //          oci_bind_by_name($consulta,':v_telefono',$telef);
   //          oci_bind_by_name($consulta,':v_celular',$celular);
   //          oci_bind_by_name($consulta,':v_correo',$correo);
   //          oci_bind_by_name($consulta,':v_afp',$afp);
   //          oci_bind_by_name($consulta,':v_arl',$arl);
   //          oci_bind_by_name($consulta,':v_salario',$salario);
   //          oci_bind_by_name($consulta,':v_ingreso',$ingreso);
   //          oci_bind_by_name($consulta,':v_actividad',$actividad);
   //          oci_bind_by_name($consulta,':v_origen',$origen);
   //          oci_bind_by_name($consulta,':v_responsable',$responsable);
   //          oci_bind_by_name($consulta,':v_beneficiarios',$beneficiarios);
   //          oci_bind_by_name($consulta,':v_cantidad',$cantidad);
   //          oci_bind_by_name($consulta,':v_adjuntos',$soportes);
   //          oci_bind_by_name($consulta,':v_cantidad_adjuntos',$cantidad_soportes);
   //          oci_bind_by_name($consulta,':v_tipo_solicitud',$tipo_solicitud);
   //          oci_bind_by_name($consulta,':v_barrio',$barrio_cotizante);
   //          $clob = oci_new_descriptor($c,OCI_D_LOB);
   //          oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
   //          oci_execute($consulta);
   //          $json = $clob->read($clob->size());
   //          echo $json;
   //          oci_close($c);
   //      } else {
   //          echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
   //      }       
   // }

   function insertar_solicitud() {
        require_once('../config/dbcon_prod.php');
        global $param;
        //echo $param->soportes_beneficiarios;
        if (($param->origen!="E")?isset($_SESSION["cedula"]):isset($param->doc_aportante)) {
            $condicion = $param->condicion;
            $tipo_cotizante = $param->tipo_cotizante;
            $tipo_doc_aportante = $param->tipo_doc_aportante;
            $doc_aportante = $param->doc_aportante;
            $tipo_doc_cotizante = $param->tipo_doc_cotizante;
            $doc_cotizante = $param->doc_cotizante;
            $pri_nombre = $param->pri_nombre;
            $seg_nombre = $param->seg_nombre;
            $pri_apellido = $param->pri_apellido;
            $seg_apellido = $param->seg_apellido;
            $nacimiento = $param->nacimiento;
            $genero = $param->genero;
            $estado_civil = $param->estado_civil;
            $direccion = $param->direccion;
            $ubicacion_geografica = $param->ubicacion_geografica;
            $zona = $param->zona;
            $escenario = $param->escenario;
            $telef = $param->telef;
            $celular = $param->celular;
            $correo = $param->correo;
            $afp = $param->afp;
            $arl = $param->arl;
            $salario = $param->salario;
            $actividad = $param->actividad;
            $ingreso = $param->ingreso;
            $origen = $param->origen;
            $responsable = ($param->origen!="E")?$_SESSION["cedula"]:$param->doc_aportante;
            $beneficiarios = $param->beneficiarios;
            $cantidad = $param->cantidad;
            $soportes = $param->soportes;
            $cantidad_soportes = $param->cantidad_soportes;
            $soportes_ben = $param->soportes_beneficiarios;
            $cantidad_soportes_ben = $param->cantidad_soportes_beneficiarios;
            $tipo_solicitud = $param->tipo_solicitud;
            $barrio_cotizante = $param->barrio_cotizante;
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_inserta_solicitud(:v_condicion,
                                                                                :v_tipo_cotizante, 
                                                                                :v_tipo_doc_aportante, 
                                                                                :v_doc_aportante, 
                                                                                :v_tipo_doc_cotizante, 
                                                                                :v_doc_cotizante, 
                                                                                :v_pri_nombre, 
                                                                                :v_seg_nombre, 
                                                                                :v_pri_apellido,  
                                                                                :v_seg_apellido,  
                                                                                :v_nacimiento,  
                                                                                :v_genero,  
                                                                                :v_estado_civil,  
                                                                                :v_direccion,  
                                                                                :v_ubicacion_geografica,  
                                                                                :v_zona,  
                                                                                :v_escenario,  
                                                                                :v_telefono,  
                                                                                :v_celular,  
                                                                                :v_correo,  
                                                                                :v_afp,  
                                                                                :v_arl,  
                                                                                :v_salario,  
                                                                                :v_ingreso, 
                                                                                :v_actividad,
                                                                                :v_origen, 
                                                                                :v_responsable,  
                                                                                :v_beneficiarios,  
                                                                                :v_cantidad,
                                                                                :v_adjuntos,
                                                                                :v_cantidad_adjuntos,
                                                                                :v_adjuntos_ben,
                                                                                :v_cantidad_adjuntos_ben,
                                                                                :v_tipo_solicitud,
                                                                                :v_barrio,
                                                                                :v_response); end;');
            oci_bind_by_name($consulta,':v_condicion',$condicion);
            oci_bind_by_name($consulta,':v_tipo_cotizante',$tipo_cotizante);
            oci_bind_by_name($consulta,':v_tipo_doc_aportante',$tipo_doc_aportante);
            oci_bind_by_name($consulta,':v_doc_aportante',$doc_aportante);
            oci_bind_by_name($consulta,':v_tipo_doc_cotizante',$tipo_doc_cotizante);
            oci_bind_by_name($consulta,':v_doc_cotizante',$doc_cotizante);
            oci_bind_by_name($consulta,':v_pri_nombre',$pri_nombre);
            oci_bind_by_name($consulta,':v_seg_nombre',$seg_nombre);
            oci_bind_by_name($consulta,':v_pri_apellido',$pri_apellido);
            oci_bind_by_name($consulta,':v_seg_apellido',$seg_apellido);
            oci_bind_by_name($consulta,':v_nacimiento',$nacimiento);
            oci_bind_by_name($consulta,':v_genero',$genero);
            oci_bind_by_name($consulta,':v_estado_civil',$estado_civil);
            oci_bind_by_name($consulta,':v_direccion',$direccion);
            oci_bind_by_name($consulta,':v_ubicacion_geografica',$ubicacion_geografica);
            oci_bind_by_name($consulta,':v_zona',$zona);
            oci_bind_by_name($consulta,':v_escenario',$escenario);
            oci_bind_by_name($consulta,':v_telefono',$telef);
            oci_bind_by_name($consulta,':v_celular',$celular);
            oci_bind_by_name($consulta,':v_correo',$correo);
            oci_bind_by_name($consulta,':v_afp',$afp);
            oci_bind_by_name($consulta,':v_arl',$arl);
            oci_bind_by_name($consulta,':v_salario',$salario);
            oci_bind_by_name($consulta,':v_ingreso',$ingreso);
            oci_bind_by_name($consulta,':v_actividad',$actividad);
            oci_bind_by_name($consulta,':v_origen',$origen);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            oci_bind_by_name($consulta,':v_beneficiarios',$beneficiarios);
            oci_bind_by_name($consulta,':v_cantidad',$cantidad);
            oci_bind_by_name($consulta,':v_adjuntos',$soportes);
            oci_bind_by_name($consulta,':v_cantidad_adjuntos',$cantidad_soportes);
            oci_bind_by_name($consulta,':v_adjuntos_ben',$soportes_ben);
            oci_bind_by_name($consulta,':v_cantidad_adjuntos_ben',$cantidad_soportes_ben);
            oci_bind_by_name($consulta,':v_tipo_solicitud',$tipo_solicitud);
            oci_bind_by_name($consulta,':v_barrio',$barrio_cotizante);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
        }
    } 
   function inserta_solicitud_cambio_ips_mun() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $tipo_doc = $param->tipo_doc;
            $documento = $param->documento;
            $tipo = $param->tipo;
            $nucleo = $param->nucleo;
            $beneficiarios = $param->beneficiarios;
            $cantidad = $param->cantidad;
            $ubicacion = $param->ubicacion;
            $paquete = $param->paquete;
            $causal = $param->causal;
            $descripcion = $param->descripcion;
            $origen = $param->origen;
            $responsable = $_SESSION["cedula"];
            // T = TODOS
            // N = NULL
            // P = ALGUNOS
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_inserta_solicitud_cambio_ips_mun (:v_tipo_doc,:v_documento,:v_tipo,:v_nucleo,:v_nucleo_detalle,:v_nucleo_cantidad,:v_ubicacion,:v_paquete,:v_causal,:v_descripcion,:v_origen,:v_responsable,:v_response); end;');
            oci_bind_by_name($consulta,':v_tipo_doc',$tipo_doc);
            oci_bind_by_name($consulta,':v_documento',$documento);
            oci_bind_by_name($consulta,':v_tipo',$tipo);
            oci_bind_by_name($consulta,':v_nucleo',$nucleo);
            oci_bind_by_name($consulta,':v_nucleo_detalle',$beneficiarios);
            oci_bind_by_name($consulta,':v_nucleo_cantidad',$cantidad);
            oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);
            oci_bind_by_name($consulta,':v_paquete',$paquete);
            oci_bind_by_name($consulta,':v_causal',$causal);
            oci_bind_by_name($consulta,':v_descripcion',$descripcion);
            oci_bind_by_name($consulta,':v_origen',$origen);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo null;
        } 
    }
    function lista_solicitudes_afiliacion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $origen = $param->origen;
            $responsable = $_SESSION["cedula"];
            $estado = $param->estado;
            $fecha_inicio = $param->fecha_inicio;
            $fecha_fin = $param->fecha_fin;
            $user = $_SESSION["cedula"];
            $cursor = oci_new_cursor($c);
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_solicitudes_afiliacion (:v_origen, :v_aportante, :v_estado, :v_fecha_inicio, :v_fecha_fin, :v_user, :v_response); end;');
            oci_bind_by_name($consulta,':v_origen',$origen);
            oci_bind_by_name($consulta,':v_aportante',$responsable);
            oci_bind_by_name($consulta,':v_estado',$estado);
            oci_bind_by_name($consulta,':v_fecha_inicio',$fecha_inicio);
            oci_bind_by_name($consulta,':v_fecha_fin',$fecha_fin);
            oci_bind_by_name($consulta,':v_user',$user);
            oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
            oci_execute($consulta);
            oci_execute($cursor, OCI_DEFAULT);
            $datos = null;
            oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
            oci_free_statement($consulta);
            oci_free_statement($cursor);
            echo json_encode(count($datos) === 0 ? null : $datos);
            exit;
        } else {
            echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
        } 
    }
    function lista_solicitudes_afiliacion_rad() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $origen = $param->origen;
            $responsable = $_SESSION["cedula"];
            $estado = $param->estado;
            $fecha_inicio = $param->fecha_inicio;
            $fecha_fin = $param->fecha_fin;
            $user = $_SESSION["cedula"];
            $radicado = $param->filtro;
            $cursor = oci_new_cursor($c);
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_solicitudes_afiliacion_rad (:v_origen, :v_aportante, :v_estado, :v_fecha_inicio, :v_fecha_fin, :v_user, :v_radicado, :v_response); end;');
            oci_bind_by_name($consulta,':v_origen',$origen);
            oci_bind_by_name($consulta,':v_aportante',$responsable);
            oci_bind_by_name($consulta,':v_estado',$estado);
            oci_bind_by_name($consulta,':v_fecha_inicio',$fecha_inicio);
            oci_bind_by_name($consulta,':v_fecha_fin',$fecha_fin);
            oci_bind_by_name($consulta,':v_user',$user);
            oci_bind_by_name($consulta,':v_radicado',$radicado);
            oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
            oci_execute($consulta);
            oci_execute($cursor, OCI_DEFAULT);
            $datos = null;
            oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
            oci_free_statement($consulta);
            oci_free_statement($cursor);
            echo json_encode(count($datos) === 0 ? null : $datos);
            exit;
        } else {
            echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
        } 
    }
    function carga_formulario() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["nit"])) {
            $solicitud = $param->solicitud;
            $ruta = $param->ruta;
            $responsable = $_SESSION["nit"];
            $cursor = oci_new_cursor($c);
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_carga_formulario (:v_solicitud, :v_ruta, :v_responsable, :v_response); end;');
            oci_bind_by_name($consulta,':v_solicitud',$solicitud);
            oci_bind_by_name($consulta,':v_ruta',$ruta);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
        } 
    }
    function carga_formulario_secc() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $solicitud = $param->solicitud;
            $ruta = $param->ruta;
            $responsable = $_SESSION["cedula"];
            $ftp = $param->ftp;
            $cursor = oci_new_cursor($c);
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_carga_formulario (:v_solicitud, :v_ruta, :v_responsable, :v_tipo_ftp, :v_response); end;');
            oci_bind_by_name($consulta,':v_solicitud',$solicitud);
            oci_bind_by_name($consulta,':v_ruta',$ruta);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            oci_bind_by_name($consulta,':v_tipo_ftp',$ftp);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo '{"codigo":1,"mensaje":"Responsable invalido, por favor reinicie la sesión"}';
        } 
    }
    function lista_motivo_ips() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_mot_ips (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function lista_solicitud_afiliacion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["nit"])) {
            $origen = $param->origen;
            $responsable = $_SESSION["nit"];
            $estado = $param->estado;
            $fecha_inicio = $param->fecha_inicio;
            $fecha_fin = $param->fecha_fin;
            $user = '';
            $cursor = oci_new_cursor($c);
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_solicitudes_afiliacion (:v_origen, :v_aportante, :v_estado, :v_fecha_inicio, :v_fecha_fin, :v_user, :v_response); end;');
            oci_bind_by_name($consulta,':v_origen',$origen);
            oci_bind_by_name($consulta,':v_aportante',$responsable);
            oci_bind_by_name($consulta,':v_estado',$estado);
            oci_bind_by_name($consulta,':v_fecha_inicio',$fecha_inicio);
            oci_bind_by_name($consulta,':v_fecha_fin',$fecha_fin);
            oci_bind_by_name($consulta,':v_user',$user);
            oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
            oci_execute($consulta);
            oci_execute($cursor, OCI_DEFAULT);
            $datos = null;
            oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
            oci_free_statement($consulta);
            oci_free_statement($cursor);
            echo json_encode(count($datos) === 0 ? null : $datos);
            exit;
        } else {
            echo '{"codigo":1,"mensaje":"Nit invalido, por favor reinicie la sesión"}';
        }
    }
    function detalle_afiliacion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $codigo = $param->codigo;
        $origen = $param->origen;
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $cursor3 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_obtener_detalle_afiliacion (:v_codigo, :v_origen, :v_response, :v_beneficiarios, :v_adjuntos); end;');
        oci_bind_by_name($consulta,':v_codigo',$codigo);
        oci_bind_by_name($consulta,':v_origen',$origen);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_beneficiarios', $cursor2, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_adjuntos', $cursor3, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        oci_execute($cursor3, OCI_DEFAULT);
        $datos = null;
        $datos2 = null;
        $datos3 = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor2, $datos2, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor3, $datos3, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        oci_free_statement($cursor2);
        oci_free_statement($cursor3);
        $json = '{"datos_basicos":'.json_encode(count($datos) === 0 ? null : $datos[0]).',"beneficiarios":'.json_encode(count($datos2) === 0 ? [] : $datos2).',"adjuntos":'.json_encode(count($datos3) === 0 ? [] : $datos3).'}';
        echo $json;
        exit;
    }
    function lista_causal_rechazo() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_causal_rechazo (:v_response); end;');
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode(count($datos) === 0 ? null : $datos);
        exit;
    }
    function gestion_seccional() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $numero = $param->numero;
            $gestion = $param->gestion;
            $causal_rechazo = $param->causal_rechazo;
            $responsable = $_SESSION["cedula"];
            $nota = $param->nota;
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_gestion_seccional (:v_numero, :v_gestion, :v_causal_rechazo, :v_responsable, :v_nota, :v_response); end;');
            oci_bind_by_name($consulta,':v_numero',$numero);
            oci_bind_by_name($consulta,':v_gestion',$gestion);
            oci_bind_by_name($consulta,':v_causal_rechazo',$causal_rechazo);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            oci_bind_by_name($consulta,':v_nota',$nota);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo null;
        } 
    }

    function gestion_nacional() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $numero = $param->numero;
            $gestion = $param->gestion;
            $modulo = $param->modulo;
            $fecha_inicio = $param->fecha_inicio;
            $fecha_retiro = $param->fecha_retiro;
            $causal_rechazo = $param->causal_rechazo;
            $responsable = $_SESSION["cedula"];
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_gestion_nacional (:v_numero, :v_gestion, :v_modulo, :v_fecha_inicio, :v_fecha_retiro, :v_causal_rechazo, :v_responsable, :v_response); end;');
            oci_bind_by_name($consulta,':v_numero',$numero);
            oci_bind_by_name($consulta,':v_gestion',$gestion);
            oci_bind_by_name($consulta,':v_modulo',$modulo);
            oci_bind_by_name($consulta,':v_fecha_inicio',$fecha_inicio);
            oci_bind_by_name($consulta,':v_fecha_retiro',$fecha_retiro);
            oci_bind_by_name($consulta,':v_causal_rechazo',$causal_rechazo);
            oci_bind_by_name($consulta,':v_responsable',$responsable);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo null;
        } 
    }

    function valida_afiliacion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $validacion = $param->validacion;
        $tipo_documento = $param->tipo_documento;
        $documento = $param->documento;
        $f_ingreso = $param->f_ingreso;
        $tipo_doc_aportante = $param->tipo_doc_aportante;
        $doc_aportante = $param->doc_aportante;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_valida_afiliacion (:v_validacion, :v_tipo_documento, :v_documento, :v_f_ingreso, :v_tipo_doc_aportante, :v_doc_aportante, :v_response); end;');
        oci_bind_by_name($consulta,':v_validacion',$validacion);
        oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
        oci_bind_by_name($consulta,':v_documento',$documento);
        oci_bind_by_name($consulta,':v_f_ingreso',$f_ingreso);
        oci_bind_by_name($consulta,':v_tipo_doc_aportante',$tipo_doc_aportante);
        oci_bind_by_name($consulta,':v_doc_aportante',$doc_aportante);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
   // ----------------------------------------------------------------------------------------------- EMPRESAS
    //CNVU
    function array_change_key_case_recursive($arr){
        return array_map(function($item){
            if(is_array($item))
                $item = array_change_key_case_recursive($item);
            return $item;
        },array_change_key_case($arr));
    }
    function informe_general() {
        require_once('../config/dbcon_prod.php');
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
        oci_bind_by_name($consulta,':v_inicio', $param->fecha_inicio);
        oci_bind_by_name($consulta,':v_fin', $param->fecha_fin);
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
        $datos2 = null;
        $datos3 = null;
        $datos4 = null;
        $datos5 = null;
        $datos6 = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor2, $datos2, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor3, $datos3, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor4, $datos4, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor5, $datos5, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor6, $datos6, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        oci_free_statement($cursor2);
        oci_free_statement($cursor3);
        oci_free_statement($cursor4);
        oci_free_statement($cursor5);
        oci_free_statement($cursor6);
        // echo json_encode(count($datos) === 0 ? null : $datos);
        $json = '{"activas":'.json_encode(count($datos) === 0 ? null : $datos).
            ',"cant_procesadas":'.json_encode(count($datos2) === 0 ? [] : array_change_key_case_recursive($datos2),JSON_NUMERIC_CHECK).
            ',"cant_procesadas_secc":'.json_encode(count($datos3) === 0 ? [] : array_change_key_case_recursive($datos3),JSON_NUMERIC_CHECK).
            ',"procesadas_det":'.json_encode(count($datos4) === 0 ? [] : $datos4).
            ',"cant_rechazadas":'.json_encode(count($datos5) === 0 ? [] : array_change_key_case_recursive($datos5),JSON_NUMERIC_CHECK).
            ',"rechazadas_det":'.json_encode(count($datos6) === 0 ? [] : $datos6).'}';
        echo $json;
        exit;
    }
     function lista_funcionarios() {
        global $param;
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $cursor2 = oci_new_cursor($c);
        $cursor3 = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_funcionarios(:v_lista_funcionarios, :v_lista_funcionarios_nacional,
                                                                                                :v_lista_funcionarios_seccional); end;');
        oci_bind_by_name($consulta, ':v_lista_funcionarios', $cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_lista_funcionarios_nacional', $cursor2, -1, OCI_B_CURSOR);
        oci_bind_by_name($consulta, ':v_lista_funcionarios_seccional', $cursor3, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        oci_execute($cursor2, OCI_DEFAULT);
        oci_execute($cursor3, OCI_DEFAULT);
        $datos = null;
        $datos2 = null;
        $datos3 = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor2, $datos2, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_fetch_all($cursor3, $datos3, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        oci_free_statement($cursor2);
        oci_free_statement($cursor3);
        // $formatted = [];
        // echo json_encode(count($datos) === 0 ? null : $datos);
        $json = '{"funcionarios":'.json_encode(count($datos) === 0 ? null : $datos).
            ',"funcionarios_nacional":'.json_encode(count($datos2) === 0 ? [] : $datos2).
            ',"funcionarios_seccional":'.json_encode(count($datos3) === 0 ? [] : $datos3).'}';
        echo $json;
        exit;
    }
    function accion_funcionarios() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_accion_funcionario (:v_accion, :v_tipo, :v_funcionario, 
                                                                                                :v_ambiente, :v_response); end;');
        oci_bind_by_name($consulta,':v_accion',$param->accion);
        oci_bind_by_name($consulta,':v_tipo',$param->tipo);
        oci_bind_by_name($consulta,':v_funcionario',$param->funcionario);
        oci_bind_by_name($consulta,':v_ambiente',$param->ambiente);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function inserta_solicitud_actualizar_datos() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $tipo_doc = $param->tipo_doc;
            $documento = $param->documento;
            $telefono = $param->telefono;
            $celular = $param->celular;
            $celular_dos = $param->celular_dos;
            $correo = $param->correo;
            $direccion = $param->direccion;
            $barrio = $param->barrio;

            $consulta = oci_parse($c,'begin pq_genesis_ca.p_actualiza_contacto_afil (:v_ptipo_documento,:v_pdocumento,:p_telefono,:p_celular,
                                                                                     :p_celular2,:p_correo,:p_direccion,
                                                                                     :p_localidad,:p_res); end;');
            oci_bind_by_name($consulta,':v_ptipo_documento',$tipo_doc);
            oci_bind_by_name($consulta,':v_pdocumento',$documento);
            oci_bind_by_name($consulta,':p_telefono',$telefono);
            oci_bind_by_name($consulta,':p_celular',$celular);
            oci_bind_by_name($consulta,':p_celular2',$celular_dos);
            oci_bind_by_name($consulta,':p_correo',$correo);
            oci_bind_by_name($consulta,':p_direccion',$direccion);
            oci_bind_by_name($consulta,':p_localidad',$barrio);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':p_res', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo null;
        } 
    }
    function comprobar_afiliacion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION["cedula"])) {
            $documento = $param->documento;
            $f_ingreso = $param->f_ingreso;
            $doc_aportante = $param->doc_aportante;
            $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_comprobar_afil (:v_cotizante,:v_aportante,:v_f_inicio,:v_response); end;');
            oci_bind_by_name($consulta,':v_cotizante',$documento);
            oci_bind_by_name($consulta,':v_aportante',$doc_aportante);
            oci_bind_by_name($consulta,':v_f_inicio',$f_ingreso);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
        } else {
            echo null;
        } 
    }
    function valida_salario() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $f_ingreso = $param->f_ingreso;
        $salario = $param->salario;
        $tipo_cotizante = $param->tipo_cotizante;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_valida_salario (:v_fecha, :v_salario, :v_tipo_cotizante, :v_response); end;');
        oci_bind_by_name($consulta,':v_fecha',$f_ingreso);
        oci_bind_by_name($consulta,':v_salario',$salario);
        oci_bind_by_name($consulta,':v_tipo_cotizante',$tipo_cotizante);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function valida_direccion() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $direccion = $param->direccion;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.valida_direccion (:v_direccion, :v_response); end;');
        oci_bind_by_name($consulta,':v_direccion',$direccion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function valida_adres() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo_doc = $param->tipo_doc;
        $doc = $param->doc;
        $eps = $param->eps;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_valida_adres (:v_tipo_doc, 
           :v_documento,
           :v_eps,
           :v_response); end;');
        oci_bind_by_name($consulta,':v_tipo_doc',$tipo_doc);
        oci_bind_by_name($consulta,':v_documento',$doc);
        oci_bind_by_name($consulta,':v_eps',$eps);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function valida_periodos() {
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo_doc = $param->tipo_documento;
        $doc = $param->documento;
        $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_valida_periodos(:v_tipo_documento, 
           :v_documento,
           :v_response); end;');
        oci_bind_by_name($consulta,':v_tipo_documento',$tipo_doc);
        oci_bind_by_name($consulta,':v_documento',$doc);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    //CNVU
?>