<?php 
require_once('../config/dbconsqlserver.php');
// Recibimos los parametros enviados desde servicio de consulta
// Preparamos la vista
//global $request;

$myparams['idCedula']= $_GET['cedula'];
$myparams['strTipoRanking'] =$_GET['TipoRanking'];

$procedure_params = array(array(&$myparams['idCedula'],SQLSRV_PARAM_IN),
array(&$myparams['strTipoRanking'], SQLSRV_PARAM_IN));
$consulta = "EXEC fmsp_UsuariosxPuntosyPosicionsRanking @idCedula=?, @strTipoRanking=?";
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


?>
