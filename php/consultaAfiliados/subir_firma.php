<?php
require_once('../config/ftpcon.php');
$path_login = 'ftp://ftp_genesis:Senador2019!@192.168.50.10/';

if ((!$con_id) || (!$lr)) {
  echo "Fallo en la conexión"; die;
}
else {
  $day = date("dmY");
  $path_of_storage = '/cargue_ftp/Digitalizacion/Genesis/FirmaDeclaracion/'.$day;
  if (is_dir($path_login.$path_of_storage) == TRUE) {
    $temp_file = tempnam(sys_get_temp_dir(), '');
    $temp_file_name = str_replace('\\', '', explode(realpath(sys_get_temp_dir()), $temp_file)[1]);
    file_put_contents($temp_file, base64_decode(explode(',', file_get_contents('php://input'))[1]));
    $source_file = $temp_file;
    $subio=@ftp_put($con_id, $path_of_storage.'/'.$temp_file_name, $source_file, FTP_BINARY);
    if ($subio) {
      $rutadb = $path_of_storage.'/'.$temp_file_name;
      echo $rutadb;
    } else {
      echo "no subio";
    }
    ftp_close($con_id);
  } else {
    if (ftp_mkdir($con_id, $path_of_storage)) {
      $temp_file = tempnam(sys_get_temp_dir(), '');
      $temp_file_name = str_replace('\\', '', explode(realpath(sys_get_temp_dir()), $temp_file)[1]);
      file_put_contents($temp_file, base64_decode(explode(',', file_get_contents('php://input'))[1]));
      $source_file = $temp_file;
      $subio=@ftp_put($con_id, $path_of_storage.'/'.$temp_file_name, $source_file, FTP_BINARY);
      if ($subio) {
        $rutadb = $path_of_storage.'/'.$temp_file_name;
        echo $rutadb;
      } else {
        echo "no subio";
      }
      ftp_close($con_id);
   }else {
      echo "0";
   }
  }
}

// $file = hash('sha256', openssl_random_pseudo_bytes(64)) . '.png';

// $temp_file = realpath(__DIR__ . '/../../temp') . '/' . $file;
// file_put_contents($temp_file, base64_decode(explode(',', file_get_contents('php://input'))[1]));
// echo $file;
