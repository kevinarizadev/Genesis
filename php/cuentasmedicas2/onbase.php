<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

require_once('../config/dbcon_prod.php');

$cursor = oci_new_cursor($c);
$clob = oci_new_descriptor($c,OCI_D_LOB);

$consulta = oci_parse(
  $c,
  'begin pq_genesis_rips_ga.P_OBTENER_GEN_ACTA(
    :v_pnit,
    :v_precibo,
    :v_json_out,
    :v_result
  ); end;'
);

oci_bind_by_name($consulta, ':v_pnit', $request->nit);
oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
oci_bind_by_name($consulta,':v_json_out', $clob,-1,OCI_B_CLOB);
oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);

$datos = null;

oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

oci_free_statement($consulta);
oci_free_statement($cursor);

if (isset($clob)) {
  $json = $clob->read($clob->size());
  // echo $json;
}

echo json_encode([
  "data" => count($datos) === 0 ? null : $datos[0],
  "meta" => json_decode($json, true)
]);
exit;
