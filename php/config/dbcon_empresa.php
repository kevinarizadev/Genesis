<?php

	if(!isset($_SESSION))
	{
		session_start();
	}
	if (isset($_SESSION['usu']) ){
		$usu = $_SESSION['usu'];
	}else{
		$usu = 'usuweb';
	}
	if (isset($_SESSION['acc']) ){
		$acc = $_SESSION['acc'];
	}else{
    $acc = 'Cajacopi2022.';
	}
	//$servidor = "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.17)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.18)(PORT = 1521))(LOAD_BALANCE = yes)(FAILOVER=YES) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = oasis)))";
	// $c = oci_connect($usu,$acc, 'SVEPSORACLESCANL001.cajacopieps.local/OASIS','AL32UTF8');
	$c = oci_connect($usu,$acc, '192.168.50.14/OASISQA','AL32UTF8');
	//$c = oci_connect($usu,$acc, $servidor,'AL32UTF8');
	if (!$c) {
	    $e = oci_error();
	    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	}

?>
