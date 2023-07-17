<?php
header('Content-Type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function EjecutarJob (){
	require_once('../config/0_conexion.php');
	global $request;
	$codigojob="Proceso_Cargue Archivos BDUA";
	$myparams['codigojob'] = $codigojob;
	$myparams['strCodig'] = '';
	$myparams['strTituloError'] ='';
	$myparams['strMessageError'] ='';
	$myparams['intValorError'] = '';
	$procedure_params = array(	array(&$myparams['codigojob'],SQLSRV_PARAM_IN),
		array(&$myparams['strTituloError'], SQLSRV_PARAM_OUT),
		array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
		array(&$myparams['strCodig'],SQLSRV_PARAM_OUT),
		array(&$myparams['intValorError'],SQLSRV_PARAM_OUT));
	$consulta = "EXEC etlsp_EjecutaJob  @strProceso=?,@strTituloError=?,@strMessageError=?,@strCodig=?,@intValorError=?";
	$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
	if( !$stmt ) {
		die( print_r( sqlsrv_errors(), true));
	}
	if(sqlsrv_execute($stmt) === false){
		if ( $myparams['intValorError'] === 1 ){
			echo  '{'.'"codigo":'.'"'.$myparams['intValorError'].'"'.','.'"mensaje":'.'"Error ejecutando proceso, notificar al area de TIC"'.'}';
			sqlsrv_free_stmt($stmt);
		}else{
			echo  '{'.'"codigo":'.'"'.$myparams['intValorError'].'"'.','.'"mensaje":'.'"Job Ejecutadose.. Favor Esperar Un Correo Con la Notificacion De Finalizacion"'.'}';
			sqlsrv_free_stmt($stmt);
		}
	}else{
		die( print_r( sqlsrv_errors(), true));
		sqlsrv_free_stmt($stmt);
	}
	sqlsrv_close( $conn); 
}


?>
