<?php
$postdata = file_get_contents("php://input");
//error_reporting(0);
$request = json_decode($postdata);
$function = $request->function;
$function();



function subirValidaciion()
{
  include('validador_medicamentos.php');
  global $request;
  $base = $request->base;
  $name = $request->name;
  $ext = $request->ext;
  $nit = $request->nit;
  $name = $name . '.' . $ext;
  if (isset($base) && $base != '') {
    if (isset($nit) && $nit != '') {
      $archivos = $base;
      list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
      list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
      $base64 = base64_decode($archivos); // Proceso para traer el Base64
      file_put_contents('../../../temp/' . $name, $base64);
      // $validar = ValidarArchivo($base, $name, $ext);
      // if (count($validar) == 0) {
      //   // echo 'Sin errores';
      //   $hoy = date('dmY');
      //   $mes = date('m');
      //   $ano = date('Y');
      //   $estado = false;
      //   if (!$estado == true) {
      //     echo json_encode((object) [
      //       'codigo' => 0,
      //       'mensaje' => 'La validacion inicial y el cargue del archivo se completo exitosamente.',
      //       'rutas' => json_encode('$rutas')
      //     ]);
      //   } else {
      //     echo json_encode((object) [
      //       'codigo' => -4,
      //       'mensaje' => 'No se subieron correctamente los archivo al servidor.'
      //     ]);
      //   }
      // } else {
      //   echo json_encode((object) [
      //     'codigo' => 1,
      //     'mensaje' => 'El siguientes archivo presentan errores de estructura.',
      //     'archivos' => $validar
      //   ]);
      // }
    } else {
      echo json_encode((object) [
        'codigo' => -2,
        'mensaje' => 'NIT no puede estar vacio, intente reiniciar la sesion del usuario.'
      ]);
    }
  } else {
    echo json_encode((object) [
      'codigo' => -1,
      'mensaje' => 'No se recibio el archivo, intente seleccionarlo nuevamente.'
    ]);
  }
}
