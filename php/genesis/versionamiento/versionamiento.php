<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function listaAreas(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_lista_areas(:v_json_res); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function estadoNotificaciones(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_registra_leido(:v_codigo_notificacion,:v_funcionario,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_codigo_notificacion',$param->id);
        oci_bind_by_name($consulta,':v_funcionario',$_SESSION["cedula"]);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function obtenerNotificaciones(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_lista_notificaciones(:v_funcionario,:v_cantidad,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_funcionario',$_SESSION["cedula"]);
        oci_bind_by_name($consulta,':v_cantidad',$param->cantidad);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function guardarNotificaciones(){
        require_once('../../config/dbcon_prod.php');
        require_once('../../upload_file/subir_archivo.php');
        global $param;
        $dataRegistro = json_decode($param->data);
        $ruta = '/cargue_ftp/Digitalizacion/Genesis/Versionamiento';
        if(isset($dataRegistro->img) && $dataRegistro->img != ""){
            $nombre_archivo = uniqid();
            $img_bs64 = $dataRegistro->img;
            $extension = $dataRegistro->ext;
            $upl = subirProyecto($img_bs64,$nombre_archivo,$extension);
        } else {
            $upl = $dataRegistro->img_url;
        }
        $hora_publicacion = isset($dataRegistro->hour) ? $dataRegistro->hour : '06:00 am';
        $publicacion = $dataRegistro->date_ori . ' ' . $hora_publicacion;
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_ui_entrada(:v_action,:v_titulo,:v_desripcion,:v_fecha_publicacion,:v_area,:v_ruta_imagen,:v_ruta_icon,:v_registra,:v_responsables,:v_modifica,:v_id,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_action',$dataRegistro->action);
        oci_bind_by_name($consulta,':v_titulo',$dataRegistro->title);
        oci_bind_by_name($consulta,':v_desripcion',$dataRegistro->description);
        oci_bind_by_name($consulta,':v_fecha_publicacion',$publicacion);
        oci_bind_by_name($consulta,':v_area',$dataRegistro->area);
        oci_bind_by_name($consulta,':v_ruta_imagen',$upl);
        oci_bind_by_name($consulta,':v_ruta_icon',$dataRegistro->icon);
        oci_bind_by_name($consulta,':v_registra',$_SESSION['cedula']);
        oci_bind_by_name($consulta,':v_responsables',$dataRegistro->responsable);
        oci_bind_by_name($consulta,':v_modifica',$dataRegistro->modifier_id);
        oci_bind_by_name($consulta,':v_id',$dataRegistro->id);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function editarNotificaciones(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_lista_notificaciones(:v_funcionario,:v_cantidad,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_funcionario',$_SESSION["cedula"]);
        oci_bind_by_name($consulta,':v_cantidad',$param->cantidad);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function eliminarNotificaciones(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $dataRegistro = json_decode($param->data);
        $temp = '';
        $consulta = oci_parse($c,'begin pq_genesis.p_gnot_ui_entrada(:v_action,:v_titulo,:v_desripcion,:v_fecha_publicacion,:v_area,:v_ruta_imagen,:v_ruta_icon,:v_registra,:v_responsables,:v_modifica,:v_id,:v_json_res); end;');
        oci_bind_by_name($consulta,':v_action',$dataRegistro->action);
        oci_bind_by_name($consulta,':v_titulo',$temp);
        oci_bind_by_name($consulta,':v_desripcion',$temp);
        oci_bind_by_name($consulta,':v_fecha_publicacion',$temp);
        oci_bind_by_name($consulta,':v_area',$temp);
        oci_bind_by_name($consulta,':v_ruta_imagen',$temp);
        oci_bind_by_name($consulta,':v_ruta_icon',$temp);
        oci_bind_by_name($consulta,':v_registra',$temp);
        oci_bind_by_name($consulta,':v_responsables',$temp);
        oci_bind_by_name($consulta,':v_modifica',$_SESSION['cedula']);
        oci_bind_by_name($consulta,':v_id',$dataRegistro->id);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
?>