<?php
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//Obtener comites
function obtenerComites()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_COMITES(:v_json_row); end;');
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

//Obtener comites
function p_ag_get_comites_compromisos()
{
    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_COMITES_COMPROMISOS(
        :p_i_cedula,
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_i_cedula', $request->cedula);
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

//Obtener detalle comites
function obtenerDetalleComites()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_COMITES_ASIGNADOS(
        :p_i_id,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_i_id', $request->idComite);
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


//Asignar administrador a un comité
function asignarAdministrador()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_UPDATE_COMITES_ASIGNADOS(
        :p_i_comite_id,
        :p_i_asignado_id,
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_i_comite_id', $request->idComite);
    oci_bind_by_name($consulta, ':p_i_asignado_id', $request->idAsignacion);
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

//Obtener asignaciones
function obtenerAsignacion()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_TIPOS_ASIGNACIONES(:v_json_row); end;');
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

//Obtener internos
function obtenerInternos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_GET_BUSCAR_INTERNOS(
        :p_v_coincidencia,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_v_coincidencia', $request->coincidencia);
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

//Guardar comite
function guardarComite()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_COMITES(
        :P_V_DESCRIPCION,
        :P_V_DETALLE,
        :P_V_USU_CREACION,
        :V_JSON_ROW); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':P_V_DESCRIPCION', $request->nombreComite);
    oci_bind_by_name($insertar, ':P_V_DETALLE', $request->detalleComite);
    oci_bind_by_name($insertar, ':P_V_USU_CREACION', $request->usuario);
    oci_bind_by_name($insertar, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($insertar, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//Guardar relacion comite asignados
function guardarRelComiteAsignacion()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_REL_COMITE_ASIGNADOS(
        :p_i_comite, 
        :p_v_asignados, 
        :p_v_usuario,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_comite', $request->idComite);
    oci_bind_by_name($insertar, ':p_v_asignados', $request->idAsignaciones);
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

//Guardar asignaciones
function guardarAsignacion()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_POST_ASIGNACIONES(
        :p_v_nombre, 
        :p_v_apellido,
        :p_v_cedula,
        :p_v_correo,
        :p_v_cargo,
        :p_i_tipo_asignacion_id,
        :p_v_usu_creacion,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_v_nombre', $request->nombre);
    oci_bind_by_name($insertar, ':p_v_apellido', $request->apellidos);
    oci_bind_by_name($insertar, ':p_v_cedula', $request->cedula);
    oci_bind_by_name($insertar, ':p_v_correo', $request->correo);
    oci_bind_by_name($insertar, ':p_v_cargo', $request->cargo);
    oci_bind_by_name($insertar, ':p_i_tipo_asignacion_id', $request->tipoAsignacion);
    oci_bind_by_name($insertar, ':p_v_usu_creacion', $request->usuario);
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

//eliminar asignaciones
function eliminarAsignacion()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $insertar = oci_parse($c, 'BEGIN OASIS.PQ_ALTA_GERENCIA.P_AG_DELETE_ASIGNACIONES(
        :p_i_asignacion_id,
        :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($insertar, ':p_i_asignacion_id', $request->idAsignacion);
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
