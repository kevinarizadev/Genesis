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
$function = $request->function;
$function();

function consulta_aut()
{
  global $request;
  //require('../php/config/dbcon_qa.php');
  require_once('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_CONSULTA_AUTORIZACIONES(
        :v_ptipodoc,:v_pdocumento,:v_pips,
      :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodoc', $request->tipo_doc);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pips', $request->nit);
  // oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  oci_close($c);
  echo $json;
  exit;
}
