<?php
    $ip = $_SERVER['REMOTE_ADDR'];
    $fullhost = gethostbyaddr($ip);
    $host = preg_replace("/^[^.]+./", "*.", $fullhost);
    echo gethostname();
    echo $fullhost;
    
    echo 'PRUEBA5001';
    echo $_SERVER['SERVER_ADDR']."<br/>"; //Imprime la IP del servidor
    echo $_SERVER['SERVER_NAME']."<br/>"; //Imprime el nombre del servidor
    echo $_SERVER['SERVER_SOFTWARE']."<br/>"; //Imprime el software que usa el servidor
    echo $_SERVER['SERVER_PROTOCOL']."<br/>"; //Imprime el protocolo usado
    echo $_SERVER['REQUEST_METHOD']."<br/>"; //Imprime el método de petición empleado
    echo $_SERVER['REQUEST_TIME']."<br/>";  //Imprime el tiempo de respuesta
    echo $_SERVER['HTTP_USER_AGENT']."<br/>"; /*Imprime la información de S.O y navegador del cliente*/
    echo $_SERVER["REMOTE_ADDR"]."<br/>";  //Imprime la dirección IP del cliente
    /*Imprime puerto empleado por la máquina del usuario para comunicarse con el servidor web. */
    echo $_SERVER["REMOTE_PORT"]."<br/>";
    echo $_SERVER["REMOTE_HOST"]."<br/>";  //Imprime la dirección IP del cliente
    echo $_SERVER["REMOTE_USER"]."<br/>";  //Imprime la dirección IP del cliente
    echo $_SERVER["HTTP_X_FORWARDED_FOR"];


    echo "IP Share: " . $_SERVER['HTTP_CLIENT_IP'] . "<br />";
// IP Proxy
echo "IP Proxy: " . $_SERVER['HTTP_X_FORWARDED_FOR'] . "<br />";
// IP Acceso
echo "IP Access: " . $_SERVER['REMOTE_ADDR'] . "<br />";




echo "El nombre del servidor es: {$_SERVER['SERVER_NAME']}<hr>"; 
echo "Vienes procedente de la página: {$_SERVER['HTTP_REFERER']}<hr>"; 
echo "Te has conectado usando el puerto: {$_SERVER['REMOTE_PORT']}<hr>"; 
echo "El agente de usuario de tu navegador es: {$_SERVER['HTTP_USER_AGENT']}";



    ?>