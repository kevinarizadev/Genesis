<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function historial_cargue(){
        $serverName = "192.168.50.10\SQLEPSSRV001"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"softeps", "UID"=>"aseguramiento", "PWD"=>"senador","CharacterSet" => "UTF-8");
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        SESSION_START();
        if( $conn ) {
            //echo "Connection Establecida.<br />";
        }else{
            echo "Connection Fallo.<br />";
            die( print_r( sqlsrv_errors(), true));
        }
        global $param;
        $myparams['v_trimestre'] = $param->trimestre;
        $myparams['v_ano'] = $param->ano;
        $myparams['v_proveedor'] = $param->prestador;
        
        $procedure_params = array(array(&$myparams['v_trimestre'],SQLSRV_PARAM_IN),
                            array(&$myparams['v_ano'], SQLSRV_PARAM_IN),
                            array(&$myparams['v_proveedor'], SQLSRV_PARAM_IN));
        $consulta = "EXEC etl_obtenerHistorialCargueIPS @v_trimestre=?, @v_ano=?, @v_proveedor=?";
        $stmt=sqlsrv_query($conn,$consulta,$procedure_params);
        
        
        $row = array();
        $rows= array();
        
        if( $stmt === false) {
            die( print_r( sqlsrv_errors(), true) );
        }
        while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
            $rows[] = $row;
        }
        echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
        sqlsrv_free_stmt( $stmt);
    }
    function obtener_cod_habilitacion(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $consulta = oci_parse($c,'begin P_OBTENER_HABILITACION4505(:v_nit,:v_out_habilitacion); end;');
        oci_bind_by_name($consulta,':v_nit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_out_habilitacion', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        if (strlen((string)$json)>0){
            $_SESSION["cod_habilitacion"] = $json;
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }
    // Entrega de medicamentos - FUNCIONARIO
    
    function listar_municipios(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $departamento = $param->departamento;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_MUNICIPIOS_MED(:v_departamento,:v_estado,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_departamento',$departamento);
        oci_bind_by_name($consulta,':v_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function listar_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $municipio = $param->municipio;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_IPS(:v_municipio,:v_estado,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_municipio',$municipio);
        oci_bind_by_name($consulta,':v_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_autorizaciones_fun(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $ubicacion = $param->ubicacion;
        $nit = $param->nit;
        $filtro = $param->filtro;
        $estado = $param->estado;
        $tipo = $param->tipo;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_AUTORIZACIONES_FUN(:v_pubicacion,:v_pnit,:v_pfiltro,:v_pestado,:v_ptipo,:v_cursor); end;');
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        oci_bind_by_name($consulta,':v_pfiltro',$filtro);
        oci_bind_by_name($consulta,':v_pestado',$estado);
        oci_bind_by_name($consulta,':v_ptipo',$tipo);

        $curs = oci_new_cursor($c);
        oci_bind_by_name($consulta, ":v_cursor", $curs, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($curs);    
        $array = array(); 
        while (($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
            array_push($array, array(
                'codigo' => $row['NUMERO_AUTORIZACION'],
                'fecha_orden' => $row['FECHA'],
                'fecha_entrega' => $row['FECHA_ENTREGA'],
                'ubi_aut' => $row['UBI_AUT'],
                'ubi_afi' => $row['UBI_AFI'],
                'estado' => ($row['ESTADO_ENTREGA'] == null ? "Pendiente" : $row['ESTADO_ENTREGA'])
            ));
        }
        echo json_encode($array);
        oci_free_statement($consulta);
        oci_free_statement($curs);
        oci_close($c);
    }

    // Entrega de medicamentos - IPS
    function listar_departamentos_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_DEPARTAMENTOS_MED_IPS(:v_nit,:v_estado,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_nit',$nit);
        oci_bind_by_name($consulta,':v_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function listar_municipio_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $departamento = $param->departamento;
        $nit = $param->nit;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_MUNICIPIOS_MED_IPS(:v_departamento,:v_nit,:v_estado,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_departamento',$departamento);
        oci_bind_by_name($consulta,':v_nit',$nit);
        oci_bind_by_name($consulta,':v_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
   function listar_autorizaciones_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $ubicacion = $param->ubicacion;
        $nit = $param->nit;
        $filtro = $param->filtro;
        $estado = $param->estado;
        $tipo = $param->tipo;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTA_AUTORIZACIONES_IPS(:v_pubicacion,:v_pnit,:v_pfiltro,:v_pestado,:v_ptipo,:v_cursor); end;');
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        oci_bind_by_name($consulta,':v_pfiltro',$filtro);
        oci_bind_by_name($consulta,':v_pestado',$estado);
        oci_bind_by_name($consulta,':v_ptipo',$tipo);

        $curs = oci_new_cursor($c);
        oci_bind_by_name($consulta, ":v_cursor", $curs, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($curs);    
        $array = array(); 
        while (($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
            array_push($array, array(
                'codigo' => $row['NUMERO_AUTORIZACION'],
                'fecha_orden' => $row['FECHA'],
                'fecha_entrega' => $row['FECHA_ENTREGA'],
                'nombre_afi' => $row['NOMBRE_AFI'],
                'ubi_afi' => $row['UBI_AFI'],
                'ubi_aut' => $row['UBI_AUT'],
                'estado' => $row['ESTADO_ENTREGA']
            ));
        }
        echo json_encode($array);
        oci_free_statement($consulta);
        oci_free_statement($curs);
        oci_close($c);
    }

    function ver_detalle_autorizacion(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $numero = $param->numero;
        $ubicacion = $param->ubicacion;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_OBTENER_DETALLE_AUTORIZACION(:v_pnumero,:v_pubicacion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function insertar_soporte_medicamento(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $productos = $param->productos;
        $producto_length = $param->producto_length;
        $fecha_entrega = $param->fecha_entrega;
        $ubicacion = $param->ubicacion;
        $numero_autorizacion = $param->numero_autorizacion;
        $responsable = $param->responsable;
        $url_soporte = $param->url_soporte;
        // Actualizar afiliado
        $tipo_doc_afi = $param->tipo_doc_afi;
        $documento_afi = $param->documento_afi;
        $correo = $param->correo;
        $contacto = $param->contacto;
        $nit = $param->nit;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_INSERTA_ENTREGA_MED(:v_pjson_productos,:v_pcantidad_pro,:v_pfecha_entrega,:v_pubicacion,:v_pnumero_autorizacion,:v_presponsable,:v_purl_soporte,:v_tipo_doc_afi,:v_documento_afi,:v_correo,:v_contacto,:v_nit,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_pjson_productos',$productos);
        oci_bind_by_name($consulta,':v_pcantidad_pro',$producto_length);
        oci_bind_by_name($consulta,':v_pfecha_entrega',$fecha_entrega);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pnumero_autorizacion',$numero_autorizacion);
        oci_bind_by_name($consulta,':v_presponsable',$responsable);
        oci_bind_by_name($consulta,':v_purl_soporte',$url_soporte);
        // Actualizar afiliado
        oci_bind_by_name($consulta,':v_tipo_doc_afi',$tipo_doc_afi);
        oci_bind_by_name($consulta,':v_documento_afi',$documento_afi);
        oci_bind_by_name($consulta,':v_correo',$correo);
        oci_bind_by_name($consulta,':v_contacto',$contacto);
        oci_bind_by_name($consulta,':v_nit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }


    function ver_soportes_cargados(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $ubicacion = $param->ubicacion;
        $numero = $param->numero;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_LISTAR_SOPORTES(:v_pubicacion,:v_pnumero_autorizacion,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pnumero_autorizacion',$numero);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function buscar_autorizacion(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $ubicacion = $param->ubicacion;
        $nit = $param->nit;
        $numero_aut = $param->numero_aut;
        $consulta = oci_parse($c,'begin PQ_GENESIS_MEDICAMENTOS.P_OBTENER_AUTORIZACION(:v_pubicacion,:v_pnit,:v_numero_aut,:v_cursor); end;');
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        oci_bind_by_name($consulta,':v_numero_aut',$numero_aut);

        $curs = oci_new_cursor($c);
        oci_bind_by_name($consulta, ":v_cursor", $curs, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($curs);    
        $array = array(); 
        while (($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
            array_push($array, array(
                'codigo' => $row['NUMERO_AUTORIZACION'],
                'fecha_orden' => $row['FECHA'],
                'fecha_entrega' => $row['FECHA_ENTREGA'],
                'ubi_aut' => $row['UBI_AUT'],
                'nombre_ubi_aut' => $row['NOMBRE_UBI_AUT'],
                'ubi_afi' => $row['UBI_AFI'],
                // 'nombre_ips' => $row['NOMBRE_IPS'],
                'estado' => $row['ESTADO_ENTREGA']
            ));
        }
        echo json_encode($array);
        oci_free_statement($consulta);
        oci_free_statement($curs);
        oci_close($c);
    }

?>