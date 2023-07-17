<?php

require_once('../config/ftpcon.php');
global $request;
$name = uniqid();
$ext = pathinfo($_GET['ruta'], PATHINFO_EXTENSION);
$name = $name.'.'.$ext;
$local_file = '../../temp/'.$name;
$handle = fopen($local_file, 'w');
if (ftp_fget($con_id, $handle, $_GET['ruta'], FTP_ASCII, 0)) {
  echo $name;
} else {
  echo "Error";
}
ftp_close($con_id);
fclose($handle);
