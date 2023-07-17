<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_consulta_usuario()
{
  require_once('../config/dbcon_prod.php');
	$cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_usuario(:v_presponse); end;');
	oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}


function p_actualiza_funcs()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualiza_usuario(:v_pcodigo,:v_pestado,:v_ptipo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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

