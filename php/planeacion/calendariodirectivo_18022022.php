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
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_LISTA_CALENDARIO_ADM(:v_panno,:v_json_row); end;');
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
    function accion_Agenda(){
        require_once('../config/dbcon.php');
        global $param;
        $json = json_decode($param->json);
        $numero = $json->numero;
        $fecha = $json->fecha;
        $tipo = $json->tipo;
        $hora = $json->hora;
        $titulo = $json->titulo;
        $descripcion = $json->descripcion;
        $link = $json->link;
        $accion = $json->accion;
        $asistentes = json_encode($json->asistentes);
        $cantidad = $json->cantidad;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_INSERTA_REPORTE_ADM(:v_pnumero,:v_pfecha,:v_ptipo,:v_phora,:v_ptitulo,:v_pdescripcion,:v_plink,:v_paccion,:v_pasistentes,:v_pcantidad,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pfecha',$fecha);
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        oci_bind_by_name($consulta,':v_phora',$hora);
        oci_bind_by_name($consulta,':v_ptitulo',$titulo);
        oci_bind_by_name($consulta,':v_pdescripcion',$descripcion);
        oci_bind_by_name($consulta,':v_plink',$link);
        oci_bind_by_name($consulta,':v_paccion',$accion);
        oci_bind_by_name($consulta,':v_pasistentes',$asistentes);
        oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo "error";
        }
        oci_close($c);
    }
    function obtenerAsistentes(){
        require_once('../config/dbcon.php');
        global $param;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_OBTENER_ASISTENTES_ADM(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo "error";
        }
        oci_close($c);
    }
    function obtenerCronograma(){
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_LISTA_PROGRAMACION_ADM(:v_panno,:v_json_row); end;');
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
    function obtenerListaTipo(){
        require_once('../config/dbcon.php');
        global $param;
        $fecha = $param->fecha;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_LISTA_TIPOAGENDA(:v_json_row); end;');
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
    function verAgenda(){
        require_once('../config/dbcon.php');
        global $param;
        $numero = $param->numero;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_CONSULTA_PROGRAMACION_ADM(:v_pnumero,:v_json_row); end;');
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
    function reporteFileUrl(){
        require_once('../config/dbcon_prod.php');
        require_once('../config/ftpcon.php');
        include('../upload_file/subir_archivo.php');
        global $param;
        $fileRuta = json_decode($param->file);
        $location = json_decode($param->location);
        $hoy = date('dmY');
        $path = '/cargue_ftp/Digitalizacion/Genesis/Calendario/'.$location.'/';
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
    function accion_Vacaciones(){
        require_once('../config/dbcon.php');
        global $param;
        $json = json_decode($param->json);
        $numero = $json->numero;
        $finicial = $json->finicial;
        $ffinal = $json->ffinal;
        $documento = $json->documento;
        $accion = $json->accion;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_INSERTA_VACACIONES(:v_pnumero,:v_pfinicial,:v_pffinal,:v_pdocumento,:v_paccion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pfinicial',$finicial);
        oci_bind_by_name($consulta,':v_pffinal',$ffinal);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        oci_bind_by_name($consulta,':v_paccion',$accion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo "error";
        }
        oci_close($c);
    }
    function listar_Vacaciones() {
        require_once('../config/dbcon.php');
        global $param;
        $year = $param->year;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_ADMINISTRATIVO.P_LISTA_VACACIONES(:v_panno,:v_json_row); end;');
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
?>