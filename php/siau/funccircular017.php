<?php

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$reporte = $_GET['informe'];

require_once('../config/dbcon_prod.php');

$cursor = oci_new_cursor($c);

$consulta = oci_parse(
    $c,
    'begin pq_genesis_pqr.P_OBTENER_CIRCULAR (
        :v_reporte,
        :v_fecha_inicio,
        :v_fecha_fin,
        :v_json_row
    ); end;'
);

$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':v_reporte', $reporte);
oci_bind_by_name($consulta, ':v_fecha_inicio', $fecha_inicio);
oci_bind_by_name($consulta, ':v_fecha_fin', $fecha_fin);
oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
oci_execute($consulta, OCI_DEFAULT);

$json = $clob->read($clob->size());

// $data = json_decode(, true);
oci_close($c);

// echo json_encode([
//     "data" => $data
// ]);
// exit;
header('Content-Type: application/json');
echo $json;