<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();





function p_inserta_tablero()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $data = json_decode($request->tablero);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_INSERTA_TABLERO(:V_PJSON_TABLERO,
                                                              :V_PJSON_OUT); end;');
  $jsontablero = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_TABLERO', $jsontablero, -1, OCI_B_CLOB);
  $jsontablero->writeTemporary($request->tablero);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_lista_areas_general()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_LISTA_AREAS_GENERAL(:V_PJSON_OUT); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_lista_tablero_general()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_LISTA_TABLERO_GENERAL(:V_PJSON_OUT); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}



function p_lista_areas_funcionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_LISTA_AREAS_FUNCIONARIO(:V_PFUNCIONARIO,
                                                                       :V_PJSON_OUT); end;');
  oci_bind_by_name($consulta, ':V_PFUNCIONARIO', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_lista_tablero_funcionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_LISTA_TABLERO_FUNCIONARIO(:V_PFUNCIONARIO,
                                                                        :V_PAREA,
                                                                       :V_PJSON_OUT); end;');
  oci_bind_by_name($consulta, ':V_PFUNCIONARIO', $request->funcionario);
  oci_bind_by_name($consulta, ':V_PAREA', $request->area);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_modificacion_tablero()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  // $data = json_decode($request->tablero);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_MODIFICACION_TABLERO(:V_PJSON_TABLERO,
                                                            :V_PJSON_OUT); end;');
  $jsontablero = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_TABLERO', $jsontablero, -1, OCI_B_CLOB);
  $jsontablero->writeTemporary($request->tablero);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function P_LISTA_FUNCIONARIO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  // $data = json_decode($request->tablero);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_LISTA_FUNCIONARIO(:V_PCOINCIDENCIA,
                                                            :V_PJSON_OUT); end;');
  oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}
function P_INSERTA_FUNCIONARIO_BI()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  // $data = json_decode($request->tablero);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_INSERTA_FUNCIONARIO_BI(:V_PJSON_ADM_TABLERO,:V_PCANTIDAD_FUNCIONARIOS,:V_PFUNCIONARIO,
                                                            :V_PJSON_OUT); end;');
  oci_bind_by_name($consulta, ':V_PJSON_ADM_TABLERO', $request->json_funcionario);
  oci_bind_by_name($consulta, ':V_PCANTIDAD_FUNCIONARIOS', $request->cantidad);
  oci_bind_by_name($consulta, ':V_PFUNCIONARIO', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}


function p_guardar_traza()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANALITICA_DATOS.P_INSERTA_LOG(:V_PJSON_TABLERO,
                                                            :V_PJSON_OUT); end;');
  oci_bind_by_name($consulta, ':V_PJSON_TABLERO', $request->json);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}


