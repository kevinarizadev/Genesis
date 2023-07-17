<?php
error_reporting(0);
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function obtenerCalendario(){
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        //$mes = $param->mes;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_CALENDARIO(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
        //oci_bind_by_name($consulta,':v_pperiodo',$mes);
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
    function obtenerProgramacion_Temp(){
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_PROGRAMACION_TEMP(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function obtenerProgramacion(){
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_PROGRAMACION(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function obtenerListaFecha(){
        require_once('../config/dbcon.php');
        global $param;
        $fecha = $param->fecha;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_REPORTE_CALENDARIO(:v_pfecha,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pfecha',$fecha);
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
    function obtenerListaReporte(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_REPORTES(:v_json_row); end;');
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
    function obtenerEntes(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_ENTES(:v_json_row); end;');
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
    function obtenerTipoNorma(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_TIPO_NORMA(:v_json_row); end;');
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
    function obtenerListaCargos(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_CARGOS(:v_json_row); end;');
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
    function obtenerListaArchivos(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_TIPO_ARCHIVO(:v_json_row); end;');
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
    function insertarReporte(){
        require_once('../config/dbcon.php');
        global $param;
        $json = json_decode($param->json);
        $numero = $json->numero;
        $codigo_reporte = $json->codigo_reporte;
        $fecha_reporte = $json->fecha_reporte;
        $hora = $json->hora;
        $dias_notifica = $json->dias_notifica;
        $frecuencia = $json->frecuencia;
        $objetivo = $json->objetivo;
        $entes = $json->entes;
        $tipo_norma = $json->tipo_norma;
        $anno_norma = $json->anno_norma;
        $norma = $json->norma;
        $link_norma = $json->link_norma;
        $link_anexo = $json->link_anexo;
        $tipo_archivo = $json->tipo_archivo;
        $cant_archivo = $json->cant_archivo;
        $delimitado = $json->delimitado;
        $elabora = $json->elabora;
        $revisa = $json->revisa;
        $reporta = $json->reporta;
        $accion = $json->accion;
        $link_cargue = $json->link_cargue;
        $fecha_cargue = $json->fecha_cargue;
        $estadop = $json->estadop;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_INSERTA_REPORTE(
            :v_pnumero,
            :v_pcodigo_reporte,
            :v_pfecha_reporte,
            :v_phora,
            :v_pdias_notifica,
            :v_pfrecuencia,
            :v_pobjetivo,
            :v_pentes,
            :v_ptipo_norma,
            :v_panno_norma,
            :v_pnorma,
            :v_plink_norma,
            :v_plink_anexo,
            :v_ptipo_archivo,
            :v_pcant_archivo,
            :v_pdelimitado,
            :v_pelabora,
            :v_previsa,
            :v_preporta,
            :v_paccion,
            :v_plink_cargue,
            :v_pfecha_cargue,
            :v_estadop,
            :v_json_row
        ); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pcodigo_reporte',$codigo_reporte);
        oci_bind_by_name($consulta,':v_pfecha_reporte',$fecha_reporte);
        oci_bind_by_name($consulta,':v_phora',$hora);
        oci_bind_by_name($consulta,':v_pdias_notifica',$dias_notifica);
        oci_bind_by_name($consulta,':v_pfrecuencia',$frecuencia);
        oci_bind_by_name($consulta,':v_pobjetivo',$objetivo);
        oci_bind_by_name($consulta,':v_pentes',$entes);
        oci_bind_by_name($consulta,':v_ptipo_norma',$tipo_norma);
        oci_bind_by_name($consulta,':v_panno_norma',$anno_norma);
        oci_bind_by_name($consulta,':v_pnorma',$norma);
        oci_bind_by_name($consulta,':v_plink_norma',$link_norma);
        oci_bind_by_name($consulta,':v_plink_anexo',$link_anexo);
        oci_bind_by_name($consulta,':v_ptipo_archivo',$tipo_archivo);
        oci_bind_by_name($consulta,':v_pcant_archivo',$cant_archivo);
        oci_bind_by_name($consulta,':v_pdelimitado',$delimitado);
        oci_bind_by_name($consulta,':v_pelabora',$elabora);
        oci_bind_by_name($consulta,':v_previsa',$revisa);
        oci_bind_by_name($consulta,':v_preporta',$reporta);
        oci_bind_by_name($consulta,':v_paccion',$accion);
        oci_bind_by_name($consulta,':v_plink_cargue',$link_cargue);
        oci_bind_by_name($consulta,':v_pfecha_cargue',$fecha_cargue);
        oci_bind_by_name($consulta,':v_estadop',$estadop);
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
    function verReporte(){
        require_once('../config/dbcon.php');
        global $param;
        $numero = $param->numero;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_DETALLE_REPORTE(:v_pnumero,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
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
    function cargarReporte(){
        require_once('../config/dbcon.php');
        global $param;
        $numero = $param->numero;
        $url = $param->url;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_DETALLE_REPORTE(:v_pnumero,:v_purl,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_purl',$url);
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
    function reporteFileUrl(){
        require_once('../config/dbcon_prod.php');
        require_once('../config/ftpcon.php');
        include('../upload_file/subir_archivo.php');
        global $param;
        $fileRuta = json_decode($param->file);
        $location = json_decode($param->location);
        $hoy = date('dmY');
        $path = '/cargue_ftp/Digitalizacion/Genesis/Colmena/'.$location.'/';
        $estado = 0;
        $name = $hoy.'_'.$fileRuta->name;  
        $SubirFTP = subirFTPIntranet($fileRuta->base64,$path,$name,$fileRuta->ext);
        if ($SubirFTP != '0 - Error') {
            $rutas->url = $SubirFTP;
        } else {
            $estado = $estado + 1;
        }
        if($estado == 0){
            echo json_encode($rutas);
        }else{
            echo '0';
        }
    }
    function obtenerGestion(){
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_GESTION(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function listarCargo(){
        require_once('../config/dbcon.php');
        global $param;
        $cargo = $param->id;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_RESPONSABLES(:v_pcargo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcargo',$cargo);
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
    function asignarReporte(){
        require_once('../config/dbcon.php');
        global $param;
        $numero = $param->numero;
        $elabora_cod = $param->elabora_cod;
        $elabora_cedula = $param->elabora_cedula;
        $reporta_cod = $param->reporta_cod;
        $reporta_cedula = $param->reporta_cedula;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_ACTUALIZA_RESPONSABLES(:v_pnumero,:v_elabora,:v_reporta,:v_cargo_reporta,:v_cargo_elabora,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_elabora',$elabora_cedula);
        oci_bind_by_name($consulta,':v_reporta',$reporta_cedula);
        oci_bind_by_name($consulta,':v_cargo_reporta',$elabora_cod);
        oci_bind_by_name($consulta,':v_cargo_elabora',$reporta_cod);
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
    function cuenta_Gestiona(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_GESTIONA(:v_json_row); end;');
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
    function misReportesCedula(){
        require_once('../config/dbcon.php');
        global $param;
        $tipo = $param->tipo;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_OBTENER_MIS_REPORTES(:v_ptipo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
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
    
//     function updateJson(){
//         require_once('../config/dbcon_prod.php');
//         global $param;
//         $id = "1";
//         $json_send = $param->json;
//         $consulta = oci_parse($c,'begin PQ_GENESIS_INTRANET.P_ACTUALIZA_SMOD(:v_prol,:v_pjsonin,:v_json_row); end;');
//         oci_bind_by_name($consulta, ':v_prol',$id);
//         oci_bind_by_name($consulta,':v_pjsonin',$json_send);
//         $clob = oci_new_descriptor($c,OCI_D_LOB);
//         oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
//         oci_execute($consulta);
//         $json = $clob->read($clob->size());
//         echo $json;
//         oci_close($c);
//    }
//    function JsonFilesUrls(){
//         require_once('../config/dbcon_prod.php');
//         require_once('../config/ftpcon.php');
//         include('../upload_file/subir_archivo.php');
//         global $param;
//         $array_PDFs = json_decode($param->PDFs);
//         // echo json_encode($array_PDFs);
//         $arrlength = count($array_PDFs);
//         $hoy = date('dmY');
//         $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
//         if ($arrlength == 0) {
//             $res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
//             echo json_encode($res);
//         } else {
//             $estado = 0;
//             for ($i=0; $i < $arrlength; $i++) { 
//                 $name = $hoy.'_'.$array_PDFs[$i]->name;   
//                 $SubirFTP = subirFTP($array_PDFs[$i]->base64,$path,$name,$array_PDFs[$i]->ext);
//                 if ($SubirFTP != '0 - Error') {
//                     $rutas[$i]->url = $SubirFTP;
//                     $rutas[$i]->macro = $array_PDFs[$i]->macro;
//                     $rutas[$i]->proce = $array_PDFs[$i]->proce;
//                     $rutas[$i]->tipo = $array_PDFs[$i]->tipo;
//                     $rutas[$i]->id = $array_PDFs[$i]->id;
//                 } else {
//                     $estado = $estado + 1;
//                 }
//             }
//             if($estado == 0){
//                 echo json_encode($rutas);
//             }else{
//                 echo '0';
//             }
//         }
//     }
//     function JsonFileUrl(){
//         require_once('../config/dbcon_prod.php');
//         require_once('../config/ftpcon.php');
//         include('../upload_file/subir_archivo.php');
//         global $param;
//         $fileRuta = json_decode($param->file);
//         // echo json_encode($fileRuta);
//         $hoy = date('dmY');
//         $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
//         $estado = 0;
//         $name = $hoy.'_'.$fileRuta->name;  
//         $SubirFTP = subirFTP($fileRuta->base64,$path,$name,$fileRuta->ext);
//         if ($SubirFTP != '0 - Error') {
//             $rutas->url = $SubirFTP;
//         } else {
//             $estado = $estado + 1;
//         }
//         if($estado == 0){
//             echo json_encode($rutas);
//         }else{
//             echo '0';
//         }
//     }
?>