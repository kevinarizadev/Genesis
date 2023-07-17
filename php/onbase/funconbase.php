<?php

//$token = 'bde45cca-4619-488c-bbc1-0dc4b7fea585';

//if (!isset($_SERVER['Authorization']) || $_SERVER['Authorization'] !== $token) {
//	http_response_code(401);
//}

require_once('../config/dbcon_prod.php');

$cursor = oci_new_cursor($c);

$consulta = oci_parse(
    $c,
    'begin PQ_GENESIS_RIPS_GA.P_LISTA_RADIACION (
      :v_json_out,
      :v_result
    ); end;'
);

$clob = oci_new_descriptor($c,OCI_D_LOB);
oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);


$datos = null;

oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

oci_free_statement($consulta);
oci_free_statement($cursor);

echo json_encode([
    "data" => count($datos) === 0 ? null : $datos,
    "meta" => $clob !== null ? $clob->read($clob->size()) : null
]);
exit;