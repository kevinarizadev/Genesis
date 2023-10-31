<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_listar_funcs()
{
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_pqr.p_listar_funcs(:v_json_row); end;');
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

function p_insertar_funcs()
{
  global $request;
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_pqr.p_insertar_funcs(:v_pcedula,:v_presponsable,:vp_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':vp_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_actualiza_funcs()
{
  global $request;
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_pqr.p_actualiza_funcs(:v_pcedula,:v_pcolumna,:v_pestado,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_pcolumna', $request->columna);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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
