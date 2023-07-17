<?php 
require_once('../config/0_conexion.php');
// Recibimos los parametros enviados desde servicio de consulta
// Preparamos la vista
//global $request;



$myparams['codigopqr'] = isset($_GET['codigopqr']) ? $_GET['codigopqr'] : '';
$myparams['codigonurc'] = isset($_GET['codigonurc']) ? $_GET['codigonurc'] : '';
$myparams['estado'] = $_GET['estado'];
$myparams['fecha_inicio'] = isset($_GET['fecha_inicio']) ? $_GET['fecha_inicio'] : '';
$myparams['fecha_final'] = isset($_GET['fecha_final']) ? $_GET['fecha_final'] : '';


$procedure_params = array(  array(&$myparams['codigopqr'],SQLSRV_PARAM_IN),
                            array(&$myparams['codigonurc'], SQLSRV_PARAM_IN),
                            array(&$myparams['estado'], SQLSRV_PARAM_IN),
                            array(&$myparams['fecha_inicio'], SQLSRV_PARAM_IN),
                            array(&$myparams['fecha_final'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtiene_pqr @codigopqr =?, @codigonurc =?, @estado=?, @fecha_inicio=?, @fecha_final=? ";
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