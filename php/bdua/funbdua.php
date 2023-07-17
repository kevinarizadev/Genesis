<?php
header('Content-Type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

    //Contributivo
function bduacrc1(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONR1 @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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

function bduacrc2(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONR2 @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cs2(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONS2AUT @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cama(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONMA @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cmc(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONMC @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cnc(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONNC @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function conafil(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONAfil @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cbi(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONBDUAINTERNA @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cp(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONPila @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cpp(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONPreli @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cnrp(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONNovRetPila @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function ccc(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONACX @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function ccr(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONCR @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function cggb(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONREPORGLOSA @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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

function satc(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspCON_ConsultaProcBDUACONSAT @strNumeroDocumento=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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

    //Subsidiado


function traslado(){

  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'S1';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
       //$strDescripGlosa = $row['strDescripGlosa'];
    $rows[] = $row;
       //echo $strDescripGlosa;
  }
    
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}
function s2(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'S2';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function s2automatico(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'S2AUT';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function r2traslado(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'R2';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function r2autotraslado(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'R2AUT';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function maestroingreso(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'MS';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function maestronovedad(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'NS';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function consolidado(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'CB';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function consolidadohistorico(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'CH';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function liquidacionmensual(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'LM';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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
function eliminacion(){
  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'PR';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
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

function sats(){

  require_once('../config/0_conexion.php');
  global $request;
  $myparams['strNumeroDocumento'] = $request->strNumeroDocumento ;
  $myparams['strTipoReporte'] = 'SAT';

  $procedure_params = array(array(&$myparams['strNumeroDocumento'],SQLSRV_PARAM_IN),
    array(&$myparams['strTipoReporte'],SQLSRV_PARAM_IN));

  $consulta = "EXEC phpspsub_ConsultaProcBDUACONR2 @strNumeroDocumento=?,  @strTipoReporte=?";
  $stmt = sqlsrv_query($conn, $consulta, $procedure_params);
  $row = array();
  $rows= array();

  if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
  }
  while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
  {
       //$strDescripGlosa = $row['strDescripGlosa'];
    $rows[] = $row;
       //echo $strDescripGlosa;
  }
    
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
}

?>
