<?php
header("Content-Type: text/html;charset=utf-8");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
header("Allow: POST");
// header("Allow: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: *");
header("Content-Type: text/html;charset=utf-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
// $function = $request->function;
// $function();

$json_nuevo = array();

foreach ($request as $key) {
    $errores = array();
    foreach ($key->error_factura as $objeto) {
        $errores[] = $objeto->error;
    }
    $cadenaErrores = implode(", ", $errores);
    array_push($json_nuevo, array("codigo_factura" => $key->codigo_factura, "nit" => $key->nit, "rips_id" => $key->rips_id, "estado_factura" => $key->estado_factura, "id" => isset($key->id) ? $key->id : '', "error_factura" => $cadenaErrores));
}

// var_dump($json_nuevo);
// echo json_encode($json_nuevo);
// exit;

$json_cant = count($request);
$json = json_encode($json_nuevo);

require_once('../../php/config/dbcon_qanube.php');
$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_RIPS_GA.p_actualiza_id_estado_rips_ocr(:v_json_in,:v_json_cant,:v_json_row); end;');
// oci_bind_by_name($consulta, ':v_nit', $request->nit);
// oci_bind_by_name($consulta, ':v_recibo', $request->numero_recibo);
// oci_bind_by_name($consulta, ':v_id_ocr', $request->id_ocr);
// oci_bind_by_name($consulta, ':v_estado_ocr', $request->estado_ocr);
oci_bind_by_name($consulta, ':v_json_in', $json);
oci_bind_by_name($consulta, ':v_json_cant', $json_cant);
$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
oci_execute($consulta, OCI_DEFAULT);
$json = $clob->read($clob->size());
oci_close($c);
echo $json;
exit;

// }
