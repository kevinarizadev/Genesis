<?php
$serverName = "192.168.50.10\SQLEPSSRV001"; //serverName\instanceName
$connectionInfo = array( "Database"=>"att2000SQL", "UID"=>"reportes", "PWD"=>"PRA0271REPORTES");
$conn_sen = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn_sen ) {
     #echo "Connection Establecida.<br />";
}else{
     echo "Connection Fallo.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>
