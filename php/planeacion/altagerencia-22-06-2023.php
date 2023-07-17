<?php
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//Obtener comites
function obtenerComitesAsignados()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_COMITES_ADMIN_SUPER(
        :p_id_cedula,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_id_cedula', $request->cedula);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Validar permisos
function validarPermisos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_MODULOS_PERMISOS_USUARIOS(
        :p_v_codigo, 
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_v_codigo', $request->codigo);
    oci_bind_by_name($consulta, ':p_v_usuario', $request->usuario);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener agendas
function obtenerAgendas()
{
    global $request;
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_AGENDAS(
        :v_i_cedula, 
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_i_cedula', $request->cedula);
    oci_bind_by_name($consulta, ':p_v_usuario', $request->usuario);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener modalidades
function obtenerModalidad()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_MODALIDADES(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener dias no habiles
function obtenerDiasNoHabiles()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_OBTENER_DIAS_HABILES(:p_v_fecha, :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_v_fecha', $request->fecha);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener comites
function obtenerVisibilidad()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_VISIBILIDADES(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Guardar agenda
function guardarAgenda()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_AGENDAS_COMITE(
        :p_i_comite_id, 
        :p_v_tema,
        :p_i_modalidad_id,
        :p_v_ubicacion,
        :p_v_fecha,
        :p_v_hora_inicio,
        :p_v_hora_fin,
        :p_v_soporte,
    
        :p_v_recordatorio,
        :p_v_usu_creacion,
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_comite_id', $request->idComite);
    oci_bind_by_name($insertar, ':p_v_tema', $request->tema);
    oci_bind_by_name($insertar, ':p_i_modalidad_id', $request->idModalidad);
    oci_bind_by_name($insertar, ':p_v_ubicacion', $request->ubicacion);
    oci_bind_by_name($insertar, ':p_v_fecha', $request->fecha);
    oci_bind_by_name($insertar, ':p_v_hora_inicio', $request->horaInicio);
    oci_bind_by_name($insertar, ':p_v_hora_fin', $request->horaFin);
    oci_bind_by_name($insertar, ':p_v_soporte', $request->nombreArchivo);

    oci_bind_by_name($insertar, ':p_v_recordatorio', $request->recordatorio);
    oci_bind_by_name($insertar, ':p_v_usu_creacion', $request->usuCreacion);
    oci_bind_by_name($insertar, ':p_v_usuario', $request->usuario);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener prioridades
function obtenerPrioridades()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.F_AG_GET_PRIORIDADES(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Guardar compromiso
function guardarCompromiso()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_COMPROMISOS(
        :p_v_rel_compromiso_responsable,
        :p_v_compromiso,
        :p_d_fecha_inicio,
        :p_d_fecha_fin,
        :p_v_fecha_calculada,
        :p_v_subtarea,
        :p_v_soporte,
        :p_i_prioridad_id,
        :p_i_comite_id, 
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_v_rel_compromiso_responsable', $request->responsables);
    oci_bind_by_name($insertar, ':p_v_compromiso', $request->compromiso);
    oci_bind_by_name($insertar, ':p_d_fecha_inicio', $request->fechaInicio);
    oci_bind_by_name($insertar, ':p_d_fecha_fin', $request->fechaFin);
    oci_bind_by_name($insertar, ':p_v_fecha_calculada', $request->duracion);
    oci_bind_by_name($insertar, ':p_v_subtarea', $request->subtarea);
    oci_bind_by_name($insertar, ':p_v_soporte', $request->soporte);
    oci_bind_by_name($insertar, ':p_i_prioridad_id', $request->idPrioridad);
    oci_bind_by_name($insertar, ':p_i_comite_id', $request->idComite);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener compromisos
function obtenerCompromisos()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.F_AG_GET_COMPROMISOS(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener archivos compromisos
function obtenerArchivosCompromisos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.F_AG_GET_DOCUMENTOS_ADJUNTOS_COMPROMISOS(
        :p_i_compromiso_id,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_i_compromiso_id', $request->idCompromiso);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener compromisos por comite
function obtenerCompromisosComite()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_LISTAR_COMPROMISOS_COMITES(
        :P_I_ID,:P_I_CEDULA,
        :v_JSON_ROW); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':P_I_ID', $request->comite);
    oci_bind_by_name($consulta, ':P_I_CEDULA', $request->cedula);
    oci_bind_by_name($consulta, ':v_JSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//actualizar compromiso
function actualizarCompromiso()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_UPDATE_COMPROMISOS(
        :p_i_compromiso_id, 
        :p_i_comite_id,
        :p_v_observacion, 
        :p_v_estado,
        :p_v_usuario_update, 
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_compromiso_id', $request->idCompromiso);
    oci_bind_by_name($insertar, ':p_i_comite_id', $request->idComite);
    oci_bind_by_name($insertar, ':p_v_observacion', $request->descripcion);
    oci_bind_by_name($insertar, ':p_v_estado', $request->estado);
    oci_bind_by_name($insertar, ':p_v_usuario_update', $request->usuario);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Obtener compromisos
function obtenerDiasCompromiso()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_CALCULAR_DIAS(
        :fecha_inicio, 
        :fecha_fin, 
        :v_dias); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':fecha_inicio', $request->fechaInicio);
    oci_bind_by_name($consulta, ':fecha_fin', $request->fechaFin);
    oci_bind_by_name($consulta, ':v_dias', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}



//actualizar compromiso
function guardarAdjuntosSoportes()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_ADJUNTOS_SOPORTES(
        :p_v_nombre, 
        :p_v_formato, 
        :p_v_ruta, 
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_v_nombre', $request->nombreArchivo);
    oci_bind_by_name($insertar, ':p_v_formato', $request->formatoArchivo);
    oci_bind_by_name($insertar, ':p_v_ruta', $request->rutaArchivo);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//guardar relacion de comproomisos de adjuntos
function guardarRelCompromisoAdjuntos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_REL_ADJUNTOS_COMPROMISO(
        :p_i_compromiso_id, 
        :p_v_adjuntos, 
        :p_v_usuario, 
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_compromiso_id', $request->idCompromiso);
    oci_bind_by_name($insertar, ':p_v_adjuntos', $request->adjuntos);
    oci_bind_by_name($insertar, ':p_v_usuario', $request->usuario);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//guardar relacion de comites de adjuntos
function guardarRelComiteAdjuntos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_REL_ADJUNTOS_AGENDAS(
        :p_i_agenda_id, 
        :p_v_adjuntos, 
        :p_v_usuario, 
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_agenda_id', $request->idComite);
    oci_bind_by_name($insertar, ':p_v_adjuntos', $request->adjuntos);
    oci_bind_by_name($insertar, ':p_v_usuario', $request->usuario);
    oci_bind_by_name($insertar, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function subirFTP()
{
    require_once('../config/sftp_con.php');
    global $request;
    $file = $request->soporte;
    $path = $request->rutaArchivo;
    $name = $request->nombreArchivo;
    $tmpfile = $name;
    list(, $file) = explode(';', $file);
    list(, $file) = explode(',', $file);
    $file = base64_decode($file);
    file_put_contents($tmpfile, $file);
    if (is_dir('ftp://wikode:Wikode2023!!@172.20.0.7/' . $path) == TRUE) {
        $subio = @ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
        if ($subio) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
        if (ftp_mkdir($con_id, $path)) {
            $subio = ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
            if ($subio) {
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo 0;
        }
    }
    ftp_close($con_id);
    unlink($tmpfile);
}

function descargaAdjunto()
{
    global $request;
    $fileexists = false;
    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
        require('../config/sftp_con.php');
        $fileexists = true;
    }

    if ($fileexists) {
        $file_size = ftp_size($con_id, $request->ruta);

        if ($file_size != -1) {
            $ruta = $request->ruta;
            $name = explode("/", $ruta)[count(explode("/", $ruta)) - 1]; //Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
            // $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
            // $name = $name . '.' . $ext;
            $local_file = '../../temp/' . $name;
            $handle = fopen($local_file, 'w');
            if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
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
        // require('../sftp_cloud/DownloadFile.php');
        echo (DownloadFile($request->ruta));
    }
}

function DownloadFile($ruta /* Ruta del soporte */)
{
    // $root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';
    $root = $_SERVER['DOCUMENT_ROOT'] . '/'; // <---- Usar en servidor
    $con_id = Connect_FTP();
    $name_file = explode("/", $ruta)[count(explode("/", $ruta)) - 1]; //Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
    $local_file = $root + $name_file; //Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
    $sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
    $ruta = '/data/sftpuser' . $ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
    if (!file_exists("ssh2.sftp://$sftp$ruta")) {
        return '0 - Archivo no encontrado';
    } //Validamos si el archivo existe en el servidor Oracle
    ssh2_scp_recv($con_id, $ruta, $local_file); // Traemos el archivo del servidor y lo enviamos a la carpeta temp de Genesis
    $con_id = null;
    unset($con_id); //Cerrar Conex
    return ($name_file); // Imprimimos el nombre del archivo para que se genere la descarga del mismo
}
