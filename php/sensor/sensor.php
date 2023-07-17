
<?php session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
/*
--Description:
Establece los datos de filtro--
S = Seccional--
A = Area--
E = Empleado--================================
EXEC sp_geListarDatosFilstro 'SEDE NACIONAL','S'*/

function lista_sede(){
  // Llamamos la conexion a la base de datos
  require_once("../config/conexion_sensor.php");
  // Recibimos los parametros enviados desde servicio de consulta
  // Preparamos la vista
  global $request;

  $myparams['strSeccional'] = '';
  $myparams['tipo'] ='S';
  $myparams['strEstado'] = '';

  $procedure_params = array(array(&$myparams['strSeccional'],SQLSRV_PARAM_IN),
                            array(&$myparams['tipo'], SQLSRV_PARAM_IN),
                            array(&$myparams['strEstado'], SQLSRV_PARAM_IN));

  $consulta = "EXEC sp_geListarDatosFilstro  @strDato=?, @strtipo=? , @strEstado=?";
  $stmt=sqlsrv_query($conn_sen,$consulta,$procedure_params);

  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt( $stmt);
}
function lista_area(){
  // Llamamos la conexion a la base de datos
  require_once("../config/conexion_sensor.php");
  // Recibimos los parametros enviados desde servicio de consulta
  // Preparamos la vista
  global $request;

  $myparams['strSeccional'] = $request->psede;
  $myparams['tipo'] ='A';
  $myparams['strEstado'] = '';

  $procedure_params = array(array(&$myparams['strSeccional'],SQLSRV_PARAM_IN),
                            array(&$myparams['tipo'], SQLSRV_PARAM_IN),
                            array(&$myparams['strEstado'], SQLSRV_PARAM_IN));

  $consulta = "EXEC sp_geListarDatosFilstro  @strDato=?, @strtipo=?, @strEstado=?";
  $stmt=sqlsrv_query($conn_sen,$consulta,$procedure_params);

  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt( $stmt);
}

function lista_empleado(){
  // Llamamos la conexion a la base de datos
  require_once("../config/conexion_sensor.php");
  // Recibimos los parametros enviados desde servicio de consulta
  // Preparamos la vista
  global $request;

  $myparams['strSeccional'] = $request->parea;
  $myparams['tipo'] ='E';
  $myparams['strEstado'] = $request->estado;

  $procedure_params = array(array(&$myparams['strSeccional'],SQLSRV_PARAM_IN),
                            array(&$myparams['tipo'], SQLSRV_PARAM_IN),
                            array(&$myparams['strEstado'], SQLSRV_PARAM_IN));

  $consulta = "EXEC sp_geListarDatosFilstro  @strDato=?, @strtipo=?, @strEstado=?";
  $stmt=sqlsrv_query($conn_sen,$consulta,$procedure_params);

  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt( $stmt);
}

?>
