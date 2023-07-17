<?php session_start();
include("../config/conexion_sensor.php");

/*
$strSeccional =  $_GET['sede'];
$strArea =  0;
$strDocumento =  0;
$strFechaIni = $_GET['finicio'];
$strFechaFin = $_GET['ffin'];*/

if(isset($_GET['sede']))    {$strSeccional =  $_GET['sede'];}else{$strSeccional =  'SEDE NACIONAL';}
if(isset($_GET['area']))    {$strArea      =  $_GET['area'];}else{$strArea =  '0';}
if(isset($_GET['empleado'])){$strDocumento =  $_GET['empleado'];}else{$strDocumento =  '0';}
if(isset($_GET['finicio'])) {$strFechaIni  =  $_GET['finicio'];}else{$strFechaIni =  date('Y-m-d');}
if(isset($_GET['ffin'])) {$strFechaFin     =  $_GET['ffin'];}else{$strFechaFin =  date('Y-m-d');}

$strEstado=$_GET['estado'];

//echo date('Y-m-d');

//Hago la consulta SQL, selecciono todos los datos de usuario
$selectConsolPila= "EXEC sp_geEstableceLlegadasTardes '$strSeccional', '$strArea', '$strDocumento', '$strFechaIni', '$strFechaFin','$strEstado'";
$stmt=sqlsrv_query($conn_sen,$selectConsolPila);

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

?>
