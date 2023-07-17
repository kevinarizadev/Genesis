<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenerPublicaciones() {
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesapp_app.p_listar_notificaciones  (
          :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function insertarNotificacion() {
    global $request;

    $titulo = $request->data->titulo;
    $descripcion = $request->data->descripcion;
    $fecha_publicacion = $request->data->fecha;
    $estado = $request->data->estado;
    $ruta = $request->data->ruta;

    require_once('../config/dbcon_prod.php');

    $consulta = oci_parse(
        $c,
        'begin pq_genesapp_app.p_insertar_notificaciones   (
            :v_titulo,
            :v_descripcion,
            :v_ruta,
            :v_estado,
            :v_f_publicacion,
            :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_titulo', $titulo);
    oci_bind_by_name($consulta, ':v_descripcion', $descripcion);
    oci_bind_by_name($consulta, ':v_ruta', $ruta);
    oci_bind_by_name($consulta, ':v_estado', $estado);
    oci_bind_by_name($consulta, ':v_f_publicacion', $fecha_publicacion);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_response', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }
    exit;
}

function actualizarNotificacion() {
    global $request;

    $id = $request->data->id;
    $titulo = $request->data->titulo;
    $descripcion = $request->data->descripcion;
    $fecha_publicacion = $request->data->fecha;
    $estado = $request->data->estado;
    $ruta = $request->data->ruta;

    require_once('../config/dbcon_prod.php');

    $consulta = oci_parse(
        $c,
        'begin pq_genesapp_app.p_actualiza_notificaciones (
            :v_numero,
            :v_titulo,
            :v_descripcion,
            :v_ruta,
            :v_f_publicacion,
            :v_estado,
            :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_numero', $id);
    oci_bind_by_name($consulta, ':v_titulo', $titulo);
    oci_bind_by_name($consulta, ':v_descripcion', $descripcion);
    oci_bind_by_name($consulta, ':v_ruta', $ruta);
    oci_bind_by_name($consulta, ':v_f_publicacion', $fecha_publicacion);
    oci_bind_by_name($consulta, ':v_estado', $estado);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_response', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }
    exit;
}