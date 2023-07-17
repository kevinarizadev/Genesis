<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function guardarAfiliacion(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_HELISOFT.p_registrar_formulario(:v_fecha,
                                                                                    :v_codigo,
                                                                                    :v_tipo_usuario,
                                                                                    :v_usuario,
                                                                                    :v_tipo_empresa,
                                                                                    :v_cod_empresa,
                                                                                    :v_razon_social,
                                                                                    :v_observacion,
                                                                                    :v_responsable,
                                                                                    :v_ubi_responsable,
                                                                                    :v_proceso,
                                                                                    :v_json_res); end;');
        oci_bind_by_name($consulta,':v_fecha',$request->fecha);
        oci_bind_by_name($consulta,':v_codigo',$request->codigo_asesor);
        oci_bind_by_name($consulta,':v_tipo_usuario',$request->tipo_doc_usuario);
        oci_bind_by_name($consulta,':v_usuario',$request->doc_usuario);
        oci_bind_by_name($consulta,':v_tipo_empresa',$request->tipo_doc_empresa);
        oci_bind_by_name($consulta,':v_cod_empresa',$request->codigo_empresa);
        oci_bind_by_name($consulta,':v_razon_social',$request->nombre_empresa);
        oci_bind_by_name($consulta,':v_observacion',$request->observacion);
        oci_bind_by_name($consulta,':v_responsable',$request->responsable);
        oci_bind_by_name($consulta,':v_ubi_responsable',$request->ubi_responsable);
        oci_bind_by_name($consulta,':v_proceso',$request->tipo_proceso);
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

    function consultarAfiliacion(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_HELISOFT.p_listar_registro_afi(:v_fecha,
                                                                                  :v_codigo,
                                                                                  :v_proceso,
                                                                                  :v_json_res); end;');
        oci_bind_by_name($consulta,':v_fecha',$request->fecha);
        oci_bind_by_name($consulta,':v_codigo',$request->codigo_asesor);
        oci_bind_by_name($consulta,':v_proceso',$request->tipo_proceso);
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

    function listaTiposObservacion(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_HELISOFT.p_listar_observacion(:v_json_res); end;');
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

    function lista_datos_afiliado() {
        require_once('../../config/dbcon_prod.php');
        global $request;
        if ($request->tipo == 'E') {
            $documento = $request->doc_empresa;
        }else{
            $documento = $request->documento;
        }
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin PQ_GENESIS_HELISOFT.p_lista_datos_afiliado(:v_documento, :v_proceso, :v_response); end;');
        oci_bind_by_name($consulta,':v_documento',$documento);
        oci_bind_by_name($consulta,':v_proceso',$request->tipo);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        $formatted = [];
        echo json_encode(count($datos) === 0 ? null : $datos[0]);
        exit;
    }
?>
