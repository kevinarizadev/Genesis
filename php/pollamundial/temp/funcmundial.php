<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function listarPartidosFaseUno(){
  // Llamamos la conexion a la base de datos
  require_once('../config/dbconsqlserver.php');
  // Recibimos los parametros enviados desde servicio de consulta
  // Preparamos la vista
  global $request;

  $myparams['cedula'] = $request->cedula;
  $procedure_params = array(array(&$myparams['cedula'],SQLSRV_PARAM_IN));
  $consulta = "EXEC fmsp_ObtienePartidosPrimeraFase  @strCedula=?";
  $stmt=sqlsrv_query($conn,$consulta,$procedure_params);

  $row = array();
  $rows= array();

  if( $stmt === false) {
  die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
  $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt( $stmt);
}

function agregarCelular(){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['idCedula'] = $request->cedula ;
  $myparams['strCelular'] = $request->celular;
  $myparams['strTituloError'] = '';
  $myparams['strMessageError'] ='';
  $myparams['strCodig'] ='';
  $myparams['intValorError'] ='';
  $procedure_params = array(array(&$myparams['idCedula'],SQLSRV_PARAM_IN),
  array(&$myparams['strCelular'], SQLSRV_PARAM_IN),
  array(&$myparams['strTituloError'],SQLSRV_PARAM_OUT),
  array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
  array(&$myparams['strCodig'], SQLSRV_PARAM_OUT),
  array(&$myparams['intValorError'], SQLSRV_PARAM_OUT));
  $sql = "EXEC fmsp_ActualizaCelularCliente @idCedula = ?,
  @strCelular = ?,
  @strTituloError = ?,
  @strMessageError = ?,
  @strCodig =?,
  @intValorError =?";
  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if( !$stmt ) {
    die( print_r( sqlsrv_errors(), true));
  }

  if(sqlsrv_execute($stmt)){
    while($res = sqlsrv_next_result($stmt)){
      // make sure all result sets are stepped through, since the output params may not be set until this happens
    }
    print_r($myparams['strTituloError']);
  }else{
    die( print_r( sqlsrv_errors(), true));
  }
  sqlsrv_close( $conn );
}
function listarPartidosFaseUnoAdmin(){
// Llamamos la conexion a la base de datos
require_once('../config/dbconsqlserver.php');
// Recibimos los parametros enviados desde servicio de consulta
// Preparamos la vista
global $request;

$myparams['cedula'] = $request->cedula;
$procedure_params = array(array(&$myparams['cedula'],SQLSRV_PARAM_IN));
$consulta = "EXEC fmsp_ObtienePartidosPrimeraFaseAdmin  @strCedula=?";
$stmt=sqlsrv_query($conn,$consulta,$procedure_params);

$row = array();
$rows= array();

if( $stmt === false) {
die( print_r( sqlsrv_errors(), true) );
}
while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
{
$rows[] = $row;
}
echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
sqlsrv_free_stmt( $stmt);
}

// Obtener Datos Del Cliente y Verificar Si Es PREMIUM


function validacliente(){
// Llamamos la conexion a la base de datos
require_once('../config/dbconsqlserver.php');
global $request;
$cedula = $request->cedula;

// Recibimos los parametros enviados desde servicio de consulta
// Preparamos la vista
$consulta = "SELECT * FROM tblCliente WHERE NumeroIdentificacion=?";
//oci_bind_by_name($consulta, ':idclub', $idclub);
$stmt=sqlsrv_query($conn,$consulta,array(&$cedula));
$row = array();
$rows= array();
/*echo $cod_oficina;
echo $cod_regional;*/

if( $stmt === false) {
die( print_r( sqlsrv_errors(), true) );
}
while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
{
$rows[] = $row;
}
echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
sqlsrv_free_stmt( $stmt);
}


function InsertarApuesta (){
require_once('../config/dbconsqlserver.php');
global $request;
$myparams['intIdPartido'] = $request->intIdPartido ;
$myparams['strIdCliente'] = $request->strIdCliente;
$myparams['strTipoApuesta'] = $request->strTipoApuesta ;
$myparams['strTituloError'] = '';
$myparams['strMessageError'] ='';
$myparams['strCodig'] ='';
$myparams['strGuidApueOut'] = '';
$procedure_params = array(array(&$myparams['intIdPartido'],SQLSRV_PARAM_IN),
array(&$myparams['strIdCliente'], SQLSRV_PARAM_IN),
array(&$myparams['strTipoApuesta'], SQLSRV_PARAM_IN),
array(&$myparams['strTituloError'],SQLSRV_PARAM_OUT),
array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
array(&$myparams['strCodig'], SQLSRV_PARAM_OUT),
array(&$myparams['strGuidApueOut'],SQLSRV_PARAM_OUT));
$consulta = "EXEC fmsp_InsertarApuesta  @intIdPartido = ?,
@strIdCliente = ?,
@strTipoApuesta =?,
@strTituloError = ?,
@strMessageError = ?,
@strCodig =?,
@strGuidApueOut = ?";

$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
if( !$stmt ) {
die( print_r( sqlsrv_errors(), true));
}

if(sqlsrv_execute($stmt)){
while($res = sqlsrv_next_result($stmt)){
// make sure all result sets are stepped through, since the output params may not be set until this happens
}
print_r($myparams['strGuidApueOut']);
}else{
die( print_r( sqlsrv_errors(), true));
}
sqlsrv_close( $conn );
}

function InsertarDetalleApuesta (){
  require_once('../config/dbconsqlserver.php');
  global $request;

  $myparams['strIdApuesta'] = $request->strIdApuesta  ;
  $myparams['intIdEquipo'] = $request->intIdEquipo ;
  $myparams['intGolesEquipo'] = $request->intGolesEquipo  ;
  $myparams['strTituloError'] = '';
  $myparams['strMessageError'] ='';
  $myparams['strCodig'] ='';
  $procedure_params = array(array(&$myparams['strIdApuesta'],SQLSRV_PARAM_IN),
  array(&$myparams['intIdEquipo'], SQLSRV_PARAM_IN),
  array(&$myparams['intGolesEquipo'], SQLSRV_PARAM_IN),
  array(&$myparams['strTituloError'],SQLSRV_PARAM_OUT),
  array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
  array(&$myparams['strCodig'], SQLSRV_PARAM_OUT));
  $sql = "EXEC fmsp_InsertarDetalleApuesta  @strIdApuesta = ?,
  @intIdEquipo  = ?,
  @intGolesEquipo  =?,
  @strTituloError = ?,
  @strMessageError = ?,
  @strCodig =?";


  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if( !$stmt ) {
  die( print_r( sqlsrv_errors(), true));
  }

  if(sqlsrv_execute($stmt)){
  while($res = sqlsrv_next_result($stmt)){
  // make sure all result sets are stepped through, since the output params may not be set until this happens
  }
  print_r($myparams['strTituloError'].$myparams['strMessageError'].$myparams['strCodig']);
  }else{
  die( print_r( sqlsrv_errors(), true));
  }
  sqlsrv_close( $conn );
}


function listarresumen_basico(){
  require_once('../config/dbconsqlserver.php');
  global $request;

  $myparams['idCedula'] = $request->cedula;
  $myparams['strTipoApuesta'] = 0; //$request->strTipoApuesta;

  $procedure_params=array(array(&$myparams['idCedula'],SQLSRV_PARAM_IN),
                      array(&$myparams['strTipoApuesta'],SQLSRV_PARAM_IN));

  $consulta = "EXEC fmsp_ObtieneApuestasPorClienteyFase @idCedula=?, @strTipoApuesta=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();
  //var_dump($request->intIdPartido);
  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}
function listarresumen_premium(){
  require_once('../config/dbconsqlserver.php');
  global $request;

  $myparams['idCedula'] = $request->cedula ;
  $myparams['strTipoApuesta'] =1;//$request->intIdPartido ;

  $procedure_params=array(array(&$myparams['idCedula'],SQLSRV_PARAM_IN),
                      array(&$myparams['strTipoApuesta'],SQLSRV_PARAM_IN));

  $consulta = "EXEC fmsp_ObtieneApuestasPorClienteyFase @idCedula=?, @strTipoApuesta=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();
  //var_dump($request->intIdPartido);
  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}

function EstableceOrdenDeLosEquiposPorGrupo(){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['intIdPartido'] = $request->intIdPartido ;
  $procedure_params = array(array(&$myparams['intIdPartido'],SQLSRV_PARAM_IN));
  $consulta = "EXEC fmsp_EstableceOrdenDeLosEquiposPorGrupo @IdPartido=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();
    //var_dump($request->intIdPartido);
    if( $stmt === false) {
      die( print_r( sqlsrv_errors(), true) );
    }
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    sqlsrv_free_stmt($stmt);


}

//CAMBIOS KEVIN

function FinalizarPartido (){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['intIdPartido'] = $request->intIdPartido ;
  $myparams['strTituloError'] = '';
  $myparams['strMessageError'] ='';
  $myparams['strCodig'] ='';
  $procedure_params = array(array(&$myparams['intIdPartido'],SQLSRV_PARAM_IN),
  array(&$myparams['strTituloError'],SQLSRV_PARAM_OUT),
  array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
  array(&$myparams['strCodig'], SQLSRV_PARAM_OUT));
  $sql = "EXEC fmsp_FinalizaPartido   @intIdPartido = ?,
  @strTituloError = ?,
  @strMessageError = ?,
  @strCodig =?";

  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if( !$stmt ) {
    die( print_r( sqlsrv_errors(), true));
  }

  if(sqlsrv_execute($stmt)){
    while($res = sqlsrv_next_result($stmt)){
      // make sure all result sets are stepped through, since the output params may not be set until this happens
    }
    print_r($myparams['strTituloError']);
  }else{
    die( print_r( sqlsrv_errors(), true));
  }
  sqlsrv_close( $conn );
}

function RetornoPartido (){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['intIdPartido'] = $request->intIdPartido ;
  $procedure_params = array(array(&$myparams['intIdPartido'],SQLSRV_PARAM_IN));
  $consulta = "EXEC fmsp_ObtieneEquiposPartido  @intIdPartido = ?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();
  //var_dump($request->intIdPartido);
  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}


function RegistrarMarcadores (){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['strIdPartidoEquipoPorGrupo'] = $request->id ;
  $myparams['intIdTipoDetallePartido'] = $request->tipo;
  $myparams['intGolesAnotados'] = $request->goles ;
  $myparams['intAmarillasObtenidas'] = 0;
  $myparams['intRojasObtenidas'] = 0;
  $myparams['intPosesionBalon'] = 0;
  $myparams['intAsistencias'] = 0;
  $myparams['strTituloError'] = '';
  $myparams['strMessageError'] ='';
  $myparams['strCodig'] ='';
  $myparams['strGuidApueOut'] = '';
  $procedure_params = array(array(&$myparams['strIdPartidoEquipoPorGrupo'],SQLSRV_PARAM_IN),
  array(&$myparams['intIdTipoDetallePartido'], SQLSRV_PARAM_IN),
  array(&$myparams['intGolesAnotados'], SQLSRV_PARAM_IN),
  array(&$myparams['intAmarillasObtenidas'], SQLSRV_PARAM_IN),
  array(&$myparams['intRojasObtenidas'], SQLSRV_PARAM_IN),
  array(&$myparams['intPosesionBalon'], SQLSRV_PARAM_IN),
  array(&$myparams['intAsistencias'], SQLSRV_PARAM_IN),
  array(&$myparams['strTituloError'],SQLSRV_PARAM_OUT),
  array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
  array(&$myparams['strCodig'], SQLSRV_PARAM_OUT));
  $sql = "EXEC fmsp_InsertarTipoResultadoPorEquipoPorPartido  @strIdPartidoEquipoPorGrupo  = ?,
  @intIdTipoDetallePartido = ?,
  @intGolesAnotados =?,
  @intAmarillasObtenidas =?,
  @intRojasObtenidas =?,
  @intPosesionBalon =?,
  @intAsistencias  = ?,
  @strTituloError = ?,
  @strMessageError = ?,
  @strCodig =?";
  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if( !$stmt ) {
    die( print_r( sqlsrv_errors(), true));
  }

  if(sqlsrv_execute($stmt)){
    while($res = sqlsrv_next_result($stmt)){
      // make sure all result sets are stepped through, since the output params may not be set until this happens
    }
    print_r($myparams['strTituloError']);
  }else{
    die( print_r( sqlsrv_errors(), true));
  }
  sqlsrv_close( $conn );
}



// CalcularPuntaje
function CalcularPuntaje(){
  require_once('../config/dbconsqlserver.php');
  // Recibimos los parametros enviados desde servicio de consulta
  // Preparamos la vista
  global $request;

  $procedure_params = array(array(SQLSRV_PARAM_IN));
  $consulta = "EXEC fmsp_EstableceResultadoyPuntosPorEquipo";

  $stmt=sqlsrv_query($conn,$consulta);
  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}

function ActualizarApuesta (){
  require_once('../config/dbconsqlserver.php');
  global $request;
  $myparams['intIdPartido']=$request->intIdPartido;

  $procedure_params = array(array(&$myparams['intIdPartido'],SQLSRV_PARAM_IN));
   
  $sql = "EXEC fmsp_ActualizaEquiposPartidos @intIdPartido=?";

  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if( !$stmt ) {
    die( print_r( sqlsrv_errors(), true));
  }

  if(sqlsrv_execute($stmt)){
    while($res = sqlsrv_next_result($stmt)){
      // make sure all result sets are stepped through, since the output params may not be set until this happens
    }
    
  }else{
    die( print_r( sqlsrv_errors(), true));
  }
  sqlsrv_close( $conn );
}

?>