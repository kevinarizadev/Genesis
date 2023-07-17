<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_obtener_datos_cert_retencion_caja()
{
  require_once('../../config/dbcon_prod.php');
  // require_once('../../config/dbcon_produccion.php');
  global $request;
  $tipo = '';
  $empresa = '1';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.P_OBTENER_DATOS_CERT_RETENCION_CAJA(:v_pempresa,:v_panno,:v_pproveedor,:v_ptipo,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  //oci_bind_by_name($consulta, ':v_pempresa', $request->empresa);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pproveedor', $request->proveedor);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
}

function p_obtener_datos_cert_retencion_eps()
{
  require_once('../../config/dbcon_prod.php');
  // require_once('../../config/dbcon_produccion.php');
  global $request;
  $tipo = '';
  $empresa = '1';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.P_OBTENER_DATOS_CERT_RETENCION_EPS(:v_pempresa,:v_panno,:v_pproveedor,:v_ptipo,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  //oci_bind_by_name($consulta, ':v_pempresa', $request->empresa);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pproveedor', $request->proveedor);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
}
