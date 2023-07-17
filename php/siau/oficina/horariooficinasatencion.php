<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_obtener_oficinas_siau()
{
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_gestion_adm.p_obtener_oficinas_siau(:v_json_row); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_json_row', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_actualiza_oficina_siau()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_gestion_adm.p_actualiza_oficina_siau(:v_pcod_ubi,:v_pcons_ubi,:v_phorario,:v_pmananahoraentrada,:v_pmananahorasalida,:v_ptardehoraentrada,:v_ptardehorasalida,
  :v_pjornadacontinua,:v_presponsable,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_ubi', $request->cod_ubi);
  oci_bind_by_name($consulta, ':v_pcons_ubi', $request->cons_ubi);
  oci_bind_by_name($consulta, ':v_phorario', $request->horario);
  oci_bind_by_name($consulta, ':v_pmananahoraentrada', $request->mananahoraentrada);
  oci_bind_by_name($consulta, ':v_pmananahorasalida', $request->mananahorasalida);
  oci_bind_by_name($consulta, ':v_ptardehoraentrada', $request->tardehoraentrada);
  oci_bind_by_name($consulta, ':v_ptardehorasalida', $request->tardehorasalida);
  oci_bind_by_name($consulta, ':v_pjornadacontinua', $request->jornadacontinua);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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
