<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function BuscarAfiliado()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipodoc = $request->tipodoc;
  $cedula = $request->cedula;
  $res = 273;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_presolucion,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodoc);
  oci_bind_by_name($consulta, ':v_pdocumento', $cedula);
  oci_bind_by_name($consulta, ':v_presolucion', $res);
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

function Guardar()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $formulario = $request->formulario;
  // echo json_encode($formulario);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_cac_ori.P_INSERTA_CAC_CANCER(:v_pjson,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->formulario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 99;
  }
  oci_close($c);
}

function obtRespuestas()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cod = $request->cod;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_VARIABLES_CIE10(:v_diagnostico,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_diagnostico', $cod);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function existenRespuestas()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cod = $request->cod;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.p_verifica_registro(:v_siniestro,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_siniestro', $cod);
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

function obtenerRespuestas()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cod = $request->cod;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_DATOS_CAC_CANCER(:V_CODIGO_SINIESTRO,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':V_CODIGO_SINIESTRO', $cod);
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

function obtenerResp_Rips()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ced = $request->ced;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_RIPS_CAC_CA(:v_documento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_documento', $ced);
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

function obtenerResp_Censo()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipoDoc = $request->tipoDoc;
  $ced = $request->ced;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_CENSO_CAC_CA(:v_tipo_documento, :v_documento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_tipo_documento', $tipoDoc);
  oci_bind_by_name($consulta, ':v_documento', $ced);
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

function obtenerResp_Medicamentos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_ATC_CAC_CA(:v_json_row); end;');
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

function obtenerResp_PQR()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $doc = $request->doc;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_PQR_AFILIADO_CAC_CA(:v_documento, :v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_documento', $doc);
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


function obtenerCUPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_CUPS_CIRUGIA_CAC_CA(:v_json_row); end;');
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

function obtenerCUPSRadio()
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_CUPS_RADIOTERAPIA_CAC_CA(:v_json_row); end;');
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

function Errores()
{
  global $request;
  $json = $request->json;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_EXPORTAR_CAC_CANCER(:v_pjson_row_in,:v_ref_cur); end;');
  oci_bind_by_name($consulta, ':v_pjson_row_in', $json);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_ref_cur', $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);
  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    print_r($row);
  }
}

function Obt_Registros_Nac()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CAC_ORI.P_LISTADO_SEGUIMIENTO_COH_CANCER(:v_pjson_row_out); end;');
  // oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
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