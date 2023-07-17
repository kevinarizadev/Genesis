<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
header('Access-Control-Allow-Origin: *');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
global $request;
$row = array();
$errores = $request->data;
echo 'LINEA'.'|'.'COLUMNA'.'|'.'STATUS_CODIGO'.'|'.'ERROR'.'|'.'NOMBRE_ERROR';
echo "\n";
for ($i=0; $i < count($errores) ; $i++) {
	echo 
	$errores[$i]->linea. '|' .
	$errores[$i]->columna. '|' .
	$errores[$i]->status_cod. '|' .
	$errores[$i]->error. '|' .
	$errores[$i]->name_error."\n";
}

?>