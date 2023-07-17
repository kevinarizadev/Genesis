<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenerEncuesta() {
    global $request;
    require_once('../config/dbcon.php');
    $documento = $request->data->documento;
    $consulta = oci_parse($c, 'begin pq_genesis_th.P_OBTENER_ENCUESTA(:v_pcedula, :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pcedula', $documento);
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

function finalizarEncuesta() {
    global $request;
    require_once('../config/dbcon.php');
    $documento = $request->data->documento;
    $municipio = $request->data->ubicacion;
    $consulta = oci_parse($c, 'begin pq_genesis_th.P_INSERTA_ENCUESTA(:v_cedula, :v_ubicacion, :v_pjson_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_cedula', $documento);
    oci_bind_by_name($consulta, ':v_ubicacion', $municipio);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}