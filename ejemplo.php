<?php
// if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
// } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip1 = $_SERVER['HTTP_REFERER'];
// } else {
    $ip2 = $_SERVER['SERVER_ADDR'];
// }
 
echo $ip;
echo $ip1;
echo $ip2;
?>