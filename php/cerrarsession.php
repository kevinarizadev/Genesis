<?php
    session_start();
    $_SESSION = array();
   	session_destroy();
   	if (!isset($_SESSION['nombre'])) {
        header("Location: ../index.html");
    }else{
    	echo "Error cerrando sesion";
    }
?>
