<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_OBTENER_PQR_AVANZADO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_AVANZADO(:v_pjson_row_in,:v_pjson_row_out); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
  $jsonin->writeTemporary($request->data);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo $clob;
  }
  oci_close($c);
}



function guardarEncuestaPQR()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTA_ENCUESTA(:v_pdatos,:v_ptipoencuesta,:v_presponsable,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pdatos', $request->datos);
  oci_bind_by_name($consulta, ':v_ptipoencuesta', $request->tipoEncuesta);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function descargarEncuesta()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_DESCARGAR_ENCUESTA(:v_pfechaInicio,:v_pfechaFin,:v_ptipoEncuesta,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':v_pfechaInicio', $request->fechaInicio);
  oci_bind_by_name($consulta, ':v_pfechaFin', $request->fechaFin);
  oci_bind_by_name($consulta, ':v_ptipoEncuesta', $request->tipoEncuesta);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
}
