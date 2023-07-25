<?php
    error_reporting(0);
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function getJson(){
        require_once('../config/dbcon_prod.php');
        $id = "1";
        $consulta = oci_parse($c,'begin PQ_GENESIS_INTRANET.P_OBTENER_JSON(:v_prol,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_prol',$id);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

   function updateJson(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $id = "1";
        $json_send = $param->json;
        $consulta = oci_parse($c,'begin PQ_GENESIS_INTRANET.P_ACTUALIZA_SMOD(:v_prol,:v_pjsonin,:v_json_row); end;');
        $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_prol',$id);
        oci_bind_by_name($consulta, ':v_pjsonin', $json_parametros, -1, OCI_B_CLOB);
        $json_parametros->writeTemporary($json_send);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }

   function JsonFilesUrls(){
        require_once('../config/dbcon_prod.php');
        require_once('../config/ftpcon.php');
        include('../upload_file/subir_archivo.php');
        global $param;
        $array_PDFs = json_decode($param->PDFs);
        // echo json_encode($array_PDFs);
        $arrlength = count($array_PDFs);
        $hoy = date('dmY');
        $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
        if ($arrlength == 0) {
            $res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
            echo json_encode($res);
        } else {
            $estado = 0;
            for ($i=0; $i < $arrlength; $i++) {
                $name = $hoy.'_'.$array_PDFs[$i]->name;
                $SubirFTPintra = subirFTPIntranet($array_PDFs[$i]->base64,$path,$name,$array_PDFs[$i]->ext);
                if ($SubirFTPintra != '0 - Error') {
                    $rutas[$i]->url = $SubirFTPintra;
                    $rutas[$i]->macro = $array_PDFs[$i]->macro;
                    $rutas[$i]->proce = $array_PDFs[$i]->proce;
                    $rutas[$i]->tipo = $array_PDFs[$i]->tipo;
                    $rutas[$i]->id = $array_PDFs[$i]->id;
                } else {
                    $estado = $estado + 1;
                }
            }
            if($estado == 0){
                echo json_encode($rutas);
            }else{
                echo '0';
            }
        }
    }
    function JsonFileUrl(){
        require_once('../config/dbcon_prod.php');
        require_once('../config/ftpcon.php');
        include('../upload_file/subir_archivo.php');
        global $param;
        $fileRuta = json_decode($param->file);
        // echo json_encode($fileRuta);
        $hoy = date('dmY');
        $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
        $estado = 0;
        $name = $hoy.'_'.$fileRuta->name;
        $SubirFTPintra = subirFTPIntranet($fileRuta->base64,$path,$name,$fileRuta->ext);
        if ($SubirFTPintra != '0 - Error') {
            $rutas->url = $SubirFTPintra;
        } else {
            $estado = $estado + 1;
        }
        if($estado == 0){
            echo json_encode($rutas);
        }else{
            echo '0';
        }
    }

    function JsonFileUrl_sgc(){
        global $param;
        $fileRuta = json_decode($param->file);
        $hoy = date('dmY');
        $name= $hoy.'_'.$fileRuta->name.'.'.$fileRuta->ext;
        $file= $fileRuta->base64;
        $estado = 0;
        list(, $file) = explode(';', $file);
        list(, $file) = explode(',', $file);
        $base64 = base64_decode($file);
        file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp

        $hoy = date("dmY");
        $path = 'Calidad/Procesos';
        $ruta = $path.'/'.$hoy;
        require('../sftp_cloud/UploadFile.php');
        $subio = UploadFile($ruta, $name);
        $rutas=[];
        if(substr($subio, 0,11) == '/cargue_ftp'){
            $rutas = '{"url":"'.$subio.'"}';
        } else{
            $estado = $estado + 1;
        }
        if($estado == 0){
            echo $rutas;
        }else{
            echo '0';
        }
    }

    // New SGC ------------------------------------------------------------------------------------------------
     // tab.macroprocesos
     function listar_macroprocesos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_MACROPROCESOS(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }


    function listar_procesos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $macroproceso = $param->macroproceso;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_PROCESOS(:v_mprn_cod_macro,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_mprn_cod_macro', $macroproceso);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_subprocesos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $proceso = $param->proceso;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_SUBPROCESOS(:v_prcn_cod_proceso,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_prcn_cod_proceso', $proceso);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_tipo_documentos(){
        require_once('../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_TIPO_DOCUMENTO(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function guardar_documento(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $subproceso = $param->subproceso;
        $nombre = $param->nombre;
        $codigo = $param->codigo;
        $version = $param->version;
        $fecha = $param->fecha;
        $origen = $param->origen;
        $estado = $param->estado;
        $url = $param->url;
        $responsable = $param->responsable;
        $macroprocesos = $param->macroprocesos;
        $proceso = $param->proceso;
        $tipo_documento = $param->tipo_documento;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_INSERTAR_DOCUMENTOS_SGC(:v_dcsn_cod_subproceso,
                                                                                :v_dcsn_nombre,
                                                                                :v_dcsv_codigo_doc,
                                                                                :v_dcsn_version,
                                                                                :v_dcsd_fecha_act,
                                                                                :v_dcsc_origen,
                                                                                :v_dcsc_estado,
                                                                                :v_dcsv_url,
                                                                                :v_dcsn_responsable,
                                                                                :v_dcsn_cod_macro,
                                                                                :v_dcsn_cod_proceso,
                                                                                :v_dcsv_tipo_documento,
                                                                                :v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_cod_subproceso', $subproceso);
        oci_bind_by_name($consulta, ':v_dcsn_nombre', $nombre);
        oci_bind_by_name($consulta, ':v_dcsv_codigo_doc', $codigo);
        oci_bind_by_name($consulta, ':v_dcsn_version', $version);
        oci_bind_by_name($consulta, ':v_dcsd_fecha_act', $fecha);
        oci_bind_by_name($consulta, ':v_dcsc_origen', $origen);
        oci_bind_by_name($consulta, ':v_dcsc_estado', $estado);
        oci_bind_by_name($consulta, ':v_dcsv_url', $url);
        oci_bind_by_name($consulta, ':v_dcsn_responsable', $responsable);
        oci_bind_by_name($consulta, ':v_dcsn_cod_macro', $macroprocesos);
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        oci_bind_by_name($consulta, ':v_dcsv_tipo_documento', $tipo_documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    // , :v_dcsn_cod_proceso, :v_dcsn_cod_subproceso, :v_dcsv_tipo_documento
    function listar_documentos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $macroproceso = $param->macroproceso;
        // $proceso = $param->proceso;
        // $subproceso = $param->subproceso;
        // $tdocumento = $param->tdocumento;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_DOCUMENTOS_SGC(:v_dcsn_cod_macro,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_cod_macro', $macroproceso);
        // oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        // oci_bind_by_name($consulta, ':v_dcsn_cod_subproceso', $subproceso);
        // oci_bind_by_name($consulta, ':v_dcsv_tipo_documento', $tdocumento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_sub_documentos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $macroproceso = $param->macroproceso;
        $proceso = $param->proceso;
        // $subproceso = $param->subproceso;
        // $tdocumento = $param->tdocumento;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_SUB_DOCUMENTOS_SGC(:v_dcsn_cod_macro, :v_dcsn_cod_proceso,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_cod_macro', $macroproceso);
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        // oci_bind_by_name($consulta, ':v_dcsn_cod_subproceso', $subproceso);
        // oci_bind_by_name($consulta, ':v_dcsv_tipo_documento', $tdocumento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_sub_documentos_estado(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $macroproceso = $param->macroproceso;
        $proceso = $param->proceso;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.p_lista_sub_documentos_estado_sgc(:v_dcsn_cod_macro, :v_dcsn_cod_proceso,:v_dcsn_estado,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_cod_macro', $macroproceso);
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        oci_bind_by_name($consulta, ':v_dcsn_estado', $estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function actualizar_documento(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $id = $param->id;
        $subproceso = $param->subproceso;
        $nombre = $param->nombre;
        $codigo = $param->codigo;
        $version = $param->version;
        $fecha = $param->fecha;
        $origen = $param->origen;
        $estado = $param->estado;
        $url = $param->url;
        $responsable = $param->responsable;
        $macroprocesos = $param->macroprocesos;
        $proceso = $param->proceso;
        $tipo_documento = $param->tipo_documento;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_ACTUALIZA_DOCUMENTOS_SGC(:v_dcsn_doc_id,
                                                                                :v_dcsn_cod_subproceso,
                                                                                :v_dcsn_nombre,
                                                                                :v_dcsv_codigo_doc,
                                                                                :v_dcsn_version,
                                                                                :v_dcsd_fecha_act,
                                                                                :v_dcsc_origen,
                                                                                :v_dcsc_estado,
                                                                                :v_dcsv_url,
                                                                                :v_dcsn_responsable,
                                                                                :v_dcsn_cod_macro,
                                                                                :v_dcsn_cod_proceso,
                                                                                :v_dcsv_tipo_documento,
                                                                                :v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_doc_id', $id);
        oci_bind_by_name($consulta, ':v_dcsn_cod_subproceso', $subproceso);
        oci_bind_by_name($consulta, ':v_dcsn_nombre', $nombre);
        oci_bind_by_name($consulta, ':v_dcsv_codigo_doc', $codigo);
        oci_bind_by_name($consulta, ':v_dcsn_version', $version);
        oci_bind_by_name($consulta, ':v_dcsd_fecha_act', $fecha);
        oci_bind_by_name($consulta, ':v_dcsc_origen', $origen);
        oci_bind_by_name($consulta, ':v_dcsc_estado', $estado);
        oci_bind_by_name($consulta, ':v_dcsv_url', $url);
        oci_bind_by_name($consulta, ':v_dcsn_responsable', $responsable);
        oci_bind_by_name($consulta, ':v_dcsn_cod_macro', $macroprocesos);
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        oci_bind_by_name($consulta, ':v_dcsv_tipo_documento', $tipo_documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    // Tab.indicadores
    function listar_historial_documentos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.p_lista_all_documentos_sgc(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function grafica_tipo_documentos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.p_lista_tipodocumento(:v_pjson_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function grafica_procesos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo_d = $param->tipo_d;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.p_lista_procesostipodocumento(:v_dcsn_cod_proceso,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $tipo_d);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function grafica_documentos(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo_d = $param->tipo_d;
        $proceso = $param->proceso;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.p_lista_all_documentos_pro_td(:v_dcsv_tipo_documento,:v_dcsn_cod_proceso,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_dcsv_tipo_documento', $tipo_d);
        oci_bind_by_name($consulta, ':v_dcsn_cod_proceso', $proceso);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    // Tab.plantillas

    function guardar_plantilla(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $nombre = $param->nombre;
        $url = $param->url;
        $responsable = $param->responsable;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_INSERTAR_PLANTILLA(:v_plav_nombre,:v_plav_url,:v_plac_estado,:v_plan_responsable,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_plav_nombre', $nombre);
        oci_bind_by_name($consulta, ':v_plav_url', $url);
        oci_bind_by_name($consulta, ':v_plac_estado', $estado);
        oci_bind_by_name($consulta, ':v_plan_responsable', $responsable);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function listar_plantilla(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_LISTA_PLANTILLA(:v_plac_estado,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_plac_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function actualizar_plantilla(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $codigo = $param->codigo;
        $nombre = $param->nombre;
        $url = $param->url;
        $responsable = $param->responsable;
        $estado = $param->estado;
        $consulta = oci_parse($c,'begin PQ_GENESIS_SGC.P_ACTUALIZA_PLANTILLA(:v_codigo,:v_plav_nombre,:v_plav_url,:v_plac_estado,:v_plan_responsable,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_codigo', $codigo);
        oci_bind_by_name($consulta, ':v_plav_nombre', $nombre);
        oci_bind_by_name($consulta, ':v_plav_url', $url);
        oci_bind_by_name($consulta, ':v_plac_estado', $estado);
        oci_bind_by_name($consulta, ':v_plan_responsable', $responsable);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    function get_url_ftp(){
        global $param;
        $base64 = json_decode($param->base64);
        $hoy = date('dmY');
        $path = $param->location.'/'.$hoy;
        // $path = '/cargue_ftp/Digitalizacion/Genesis/'.$param->location.'/';
        $estado = 0;
        $name = $param->name.'.'.$param->ext;

        list(, $base64) = explode(';', $base64); // Proceso para traer el Base64
        list(, $base64) = explode(',', $base64); // Proceso para traer el Base64
        $base = base64_decode($base64); // Proceso para traer el Base64
        file_put_contents('../../temp/' . $name, $base); // El Base64 lo guardamos como archivo en la carpeta temp

        $rutas = new class{};

        include('../sftp_cloud/UploadFile.php');
        $SubirFTPintra = UploadFile($path, $name);

        if ($SubirFTPintra != '0 - Error' && $SubirFTPintra.substr(0, 3) != '<br' && $SubirFTPintra.substr(0, 1) != '0' && $SubirFTPintra != '') {
            // $rutas->url = $SubirFTPintra;
            $rutas = (object) [
              'url' => $SubirFTPintra,
            ];
        } else {
            $estado = $estado + 1;
        }
        if($estado == 0){
            echo json_encode($rutas);
        }else{
            echo '0';
        }
    }
    function descargaAdjunto(){
        global $param;
        $fileexists = false;

      if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $param->ruta) == TRUE) {
        require_once('../config/sftp_con.php');
        $fileexists = true;
      }

      if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $param->ruta) == TRUE && $fileexists == false) {
        require_once('../config/ftpcon.php');
        $fileexists = true;
      }

      if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $param->ruta) == TRUE && $fileexists == false) {
        require_once('../config/sftp_con_2.php');
        $fileexists = true;
      }
      if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $param->ruta) == TRUE && $fileexists == false) {
        require_once('../config/l_ftpcon.php');
        $fileexists = true;
      }

      if($fileexists) {
        //echo $param->ruta;

        $file_size = ftp_size($con_id, $param->ruta);
        //echo $file_size;
        if ($file_size != -1) {
            $name = uniqid();
            $ext = pathinfo($param->ruta, PATHINFO_EXTENSION);
            $name = $name . '.' . $ext;
            $local_file = '../../temp/' . $name;
            $handle = fopen($local_file, 'w');
            if (ftp_fget($con_id, $handle, $param->ruta, FTP_ASCII, 0)) {
                echo $name;
            } else {
                echo "Error";
            }
            ftp_close($con_id);
            fclose($handle);
        } else {
            echo "Error";
        }
      }else{
        require('../sftp_cloud/DownloadFile.php');
        echo( DownloadFile($param->ruta) );
      }
	}

    function descargaAdjunto_sgc(){
        global $param;
        $fileexists = false;
        if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $param->ruta) == TRUE) {
            require('../config/ftpcon.php'); $fileexists = true;
          }
        if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $param->ruta) == TRUE) {
            require('../config/sftp_con.php'); $fileexists = true;
        }

        if($fileexists) {
            $file_size = ftp_size($con_id, $param->ruta);

            if ($file_size != -1) {
                $ruta = $param->ruta;
                $name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
                // $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
                // $name = $name . '.' . $ext;
                $local_file = '../../temp/' . $name;
                $handle = fopen($local_file, 'w');
                if (ftp_fget($con_id, $handle, $param->ruta, FTP_ASCII, 0)) {
                    echo $name;
                } else {
                    echo "0 - Error Al descargar el archivo";
                }
                ftp_close($con_id);
                fclose($handle);
            } else {
                echo "0 - Error Archivo no existe";
            }
        } else {
            require('../sftp_cloud/DownloadFile.php');
            echo( DownloadFile($param->ruta) );
        }
    }
?>
