<?php
$serverName = "192.168.50.10\SQLEPSSRV001"; //serverName\instanceName
$connectionInfo = array( "Database"=>"SoftArs", "UID"=>"aseguramiento", "PWD"=>"senador","CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo); 
if( $conn ) {
     #echo "Connection Establecida.<br />";
}else{
     echo "Connection Fallo.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>