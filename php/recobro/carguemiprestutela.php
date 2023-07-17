<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_inserta_tutelas_json()
{
  require('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_mipres_direccionamiento.p_inserta_tutelas_json(:v_prescripcion,:v_cantidad,:v_json_row); end;');
  // oci_bind_by_name($consulta, ':v_prescripcion', $request->datos);
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prescripcion', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($request->datos);
  oci_bind_by_name($consulta, ':v_cantidad', $request->cantidad);
  // oci_bind_by_name($consulta, ':v_regimen', $request->regimen);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);

  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    // echo 0;
  }
  oci_close($c);
}

