<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function cargarRuta()
{
  global $request;
  $ano = $request->ano;
  $periodo = $request->periodo;
  $nit = $request->nit;
  $archivo = $request->archivo;

  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_leer_archivo_medicamentos (:v_panno,:v_pperiodo,:v_ptercero, :v_pcodigo_proceso,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_panno', $ano);
  oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
  oci_bind_by_name($consulta, ':v_ptercero', $nit);
  oci_bind_by_name($consulta, ':v_pcodigo_proceso', $archivo);
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

function radicado()
{
  global $request;
  $ano = $request->ano;
  $periodo = $request->periodo;
  $nit = $request->nit;
  $archivo = $request->archivo . '.txt';

  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.P_INSERTAR_GESTION_MEDICAMENTOS (:V_PTERCERO,:V_PANNO,:V_PPERIODO, :v_pnomarch, :v_PRADICADO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':v_ptercero', $nit);
  oci_bind_by_name($consulta, ':v_panno', $ano);
  oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
  oci_bind_by_name($consulta, ':v_pnomarch', $archivo);
  oci_bind_by_name($consulta, ':v_PRADICADO', $json2, 4000);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
    echo $dato;
  } else {
    echo 0;
  }
  oci_close($c);
}

function listarRadicados()
{
  global $request;
  $nit = $request->nit;

  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_listar_archivos_cargados (:V_PTERCERO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':v_ptercero', $nit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function ConsultaErrores()
{
  global $request;
  $rad = $request->rad;

  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_lista_errores_cargue (:V_PCODIGO_PROCESO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':V_PCODIGO_PROCESO', $rad);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function actualizarCargue()
{
  global $request;
  $request->ruta;

  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_re_cargar_archivo(:v_ptercero,:v_panno,:v_pperiodo,:v_pcodigo_proceso,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptercero', $request->nit);
  oci_bind_by_name($consulta, ':v_panno', $request->ano);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pcodigo_proceso', $request->radicado);
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

function Obt_Ips()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_IPS(:v_pnit,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->Coincidencia);
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

function cargaannos()
{
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo order by 1 desc");
  oci_execute($consulta);
  $rows = array();
  while ($row = oci_fetch_assoc($consulta)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}

function cargaperiodos()
{
  global $request;
  require_once('../../config/dbcon_prod.php');
  $anno = $request->anno;
  $consulta = oci_parse($c, "SELECT pern_numero IDE, case when pern_numero = 1 then 'ENERO'
                                                 when pern_numero = 2 then 'FEBRERO'
                                                 when pern_numero = 3 then 'MARZO'
                                                 when pern_numero = 4 then 'ABRIL'
                                                 when pern_numero = 5 then 'MAYO'
                                                 when pern_numero = 6 then 'JUNIO'
                                                 when pern_numero = 7 then 'JULIO'
                                                 when pern_numero = 8 then 'AGOSTO'
                                                 when pern_numero = 9 then 'SEPTIEMBRE'
                                                 when pern_numero = 10 then 'OCTUBRE'
                                                 when pern_numero = 11 then 'NOVIEMBRE'
                                                 when pern_numero = 12 then 'DICIEMBRE'
                            end as NOMBRE
                  from bper_periodo
                  where pern_anno = :v_anno
                  and pern_numero not in (0,99)
                  and to_char(perf_inicial, 'YYYY/MM') <= to_char(sysdate, 'YYYY/MM') order by pern_numero asc");
  oci_bind_by_name($consulta, ':v_anno', $anno);
  oci_execute($consulta);
  $rows = array();
  while ($row = oci_fetch_assoc($consulta)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}

function ValidaEstructura()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $ruta = $request->ruta;

  $consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_valida_archivo_medicamentos(:v_pruta,:v_pnomarch,:v_json_error); end;');
  oci_bind_by_name($consulta, ':v_pruta', $ruta);
  oci_bind_by_name($consulta, ':v_pnomarch', $request->nombre);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_error', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
