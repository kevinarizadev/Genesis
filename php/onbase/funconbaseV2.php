<?php

//$token = 'bde45cca-4619-488c-bbc1-0dc4b7fea585';

//if (!isset($_SERVER['Authorization']) || $_SERVER['Authorization'] !== $token) {
//	http_response_code(401);
//}

require_once('../config/dbcon_prod.php');

$nit = $_GET['nit'];
$recibo = $_GET['recibo'];
$factura = filter_input(INPUT_GET, 'factura');

$cursor = oci_new_cursor($c);

$consulta = oci_parse(
    $c,
    'begin PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURA(
      :v_pnit,
      :v_precibo,
      :v_pfactura,
      :v_json_out,
      :v_result
    ); end;'
);

$clob = oci_new_descriptor($c,OCI_D_LOB);
oci_bind_by_name($consulta, ':v_pnit', $nit);
oci_bind_by_name($consulta, ':v_precibo', $recibo);
oci_bind_by_name($consulta, ':v_pfactura', $factura);
oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);


$datos = null;

oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

oci_free_statement($consulta);
oci_free_statement($cursor);

if (is_array($datos) && count($datos) > 0) {
  $datos = array_map(function ($item) {
    $item['AMBITO_FACTURA'] = $item['AMBITO_FACURA'];
    unset($item['AMBITO_FACURA']);
    return $item;
  }, $datos);
}


echo json_encode([
    "data" => count($datos) === 0 ? null : $datos,
    "meta" => $clob !== null ? $clob->read($clob->size()) : null
]);
exit;