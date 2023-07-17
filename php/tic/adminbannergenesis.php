<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function listarImagenesGenesis()
{
  $files = glob('../../images/Banner_Genesis/*'); //obtenemos todos los nombres de los ficheros
  $datos = [];
  foreach ($files as $file) {
    if (is_file($file)) {
      array_push($datos, (object)[
        'url' => 'images/Banner_Genesis/' . explode("/", $file)[count(explode("/", $file)) - 1]
      ]);
    }
  }
  echo json_encode($datos);
}

function listarImagenesActual()
{
  $files = glob('../../images/Banner_Genesis/*'); //obtenemos todos los nombres de los ficheros
  $datos = [];
  $cont = 1;
  foreach ($files as $file) {
    if (is_file($file)) {
      $ext = explode(".", $file)[count(explode(".", $file)) - 1];
      $name = $cont . '_' . uniqid() . '.' . $ext;
      $newName = '../../temp/' . $name;
      copy($file, $newName);
      array_push($datos, (object)[
        'url' => 'temp/' . $name
      ]);
      $cont++;
    }
    // unlink($file); //elimino el fichero
  }
  echo json_encode($datos);
}

function subirTemporalImg()
{
  global $request;
  $file = $request->base64;
  $name = uniqid();
  // $ext = $request->ext;
  $ext = '.jpg';
  list(, $file) = explode(';', $file);
  list(, $file) = explode(',', $file);
  $file = base64_decode($file);
  file_put_contents('../../temp/' . $name . $ext, $file);
  echo 'temp/' . $name . $ext;
}

function limpiarDir()
{
  $files = glob('../../images/Banner_Genesis/*'); //obtenemos todos los nombres de los ficheros
  foreach ($files as $file) {
    if (is_file($file))
      unlink($file); //elimino el fichero
  }
}


function guardarFiles()
{
  global $request;
  $archivo = '../../temp/' .$request->archivo;

  $archivoNuevo = '../../images/Banner_Genesis/'.$request->nombre;
  copy($archivo, $archivoNuevo);

  echo 'images/Banner_Genesis/' . $request->nombre;
}



