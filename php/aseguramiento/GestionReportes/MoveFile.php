<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
try {
  $source_file = $_FILES['soporte']['tmp_name'];
  if (isset($source_file)) {
    $directorio = 'FileTemp/';
    $token = explode('.', $_FILES['soporte']['name']);
    $subir_archivo = $directorio.basename(sha1($token[0] . time()) . '.' . $token[1]);
    move_uploaded_file($_FILES['soporte']['tmp_name'], $subir_archivo);
    $res = array('codigo' => 0,'ruta' => $subir_archivo,'mensaje' => 'Archivos Cargado Correctamente');
    echo json_encode($res);
  } else {
    $res = array('codigo' => 1, 'mensaje' => 'Error Cargado Soportes');
    echo json_encode($res);
  }
  exit;

} catch (Exception $exception) {
  echo json_encode($exception->getMessage());
}

