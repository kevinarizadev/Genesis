<?php

function Validator()
{
  $name = $_POST['archivo'];
  $archiveName = explode('.', $name);
  $base64 = file_get_contents($_FILES['fileInput']['tmp_name']);
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $ubicacion =   $root = $_SERVER['DOCUMENT_ROOT'] . '/genesisactual/temp/';
  ValidarArchivo($ubicacion . $name, $archiveName);
}

Validator();


function ValidarArchivo($base, $name)
{
  $errores = array();
  $archivos_temp = array();
  $error_temp = array();
  $filas = file($base);
  // foreach ($líneas as $num_línea => $línea) {
  //   $fila = htmlspecialchars($línea) . "<br />\n";
  // }
  foreach ($filas as $fila => $fila_v) {
    $columnas = explode("|", $fila_v);

    if (count($columnas) == 12) {
      foreach ($columnas as $columna => $columna_v) {
        switch ($columna + 1) {

          case 1: //Validar Nit Operador
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 9])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 9'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 2: // Codigo DANE
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 4])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código DANE)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 4'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código DANE)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 3: // Valida Tipo de Documento
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de Documento)', 'mensaje' => 'El valor ingresado no es válido'];
            }
            break;

          case 4: // Valida Documento Alfanumerico
            if (!ValidarDatos(4, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Documento de identidad)', 'mensaje' => 'El valor ingresado no es válido'];
            }
            break;

            case 5: // Valida Direccion
              if (!ValidarDatos(5, $columna_v)) { //Valida Solo Texto
                $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Dirección)', 'mensaje' => 'El valor ingresado no es válido'];
              }
              break;

            case 6: // Valida Celular
              if (!ValidarDatos(6, $columna_v)) { //Valida Solo Numeros
                $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Telefono)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
              }
              break;

            case 7: // Valida Correo
              if (!ValidarDatos(7, $columna_v)) { //Valida Solo Numeros
                $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Correo Electronico)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
              }
              break;

          case 8: // Valida Fecha de solicitud
            if (!ValidarDatos(8, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de solicitud)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 9: // Fecha asignación de la cita por la IPS
            if (!ValidarDatos(8, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha asignación de la cita por la IPS)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 10: // Valida Fecha para cuando el usuario requería la cita
            if (!ValidarDatos(8, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha para cuando el usuario requería la cita)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 11: // Valida Códigos CUPS o Especialidad
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 6])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Códigos CUPS o Especialidad)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 9'];
            }
            break;

        }
      }
      if (count($filas) == ($fila + 1)) {
        if (count($error_temp) > 0) {
          $errores[] = (object) [
            'nombre' => $name[0] . '.' . $name[1],
            'filas' => count($filas),
            'columnas' => 32,
            'errores' => $error_temp
          ];
        }
      }
    } else {
      $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
    }
  }
  echo json_encode($errores);

  // echo '<br />';
  // echo count($error_temp);
}

function ValidarDatos($tipo = "", $param = "")
{

  switch ($tipo) {
    case 1:  //Valida longitub == 9
      if (strlen($param->x) == $param->y) {
        return true;
      }
      break;

    case 2:  //Valida Solo Numeros
      $param = trim($param);
      if (is_numeric($param)) {
        return true;
      }
      return false;
      break;

    case 3:  //Valida Tipo de Documento
      $po = array_search($param, ['CC', 'CE', 'PA', 'RC', 'TI', 'AS', 'MS', 'NU', 'PE', 'CN', 'SC', 'PT']);
      if ($po !== false) {
        return true;
      }
      return false;
      break;

    case 4:  //Valida Texto con espacios
      if (ctype_alnum($param)) {
        return true;
      }
      return false;
      break;

    case 5: //Validacion Direccion
      $pattern = "/^[a-zA-Z- #\d]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 6: //Validacion Telefono
      $pattern = "/^[0-9- \d]+$/";
      if ($param == '') {
        return true;
      }
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 7: //Validacion Correo
      $pattern = "/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i";
      if ($param == '@' || $param == '') {
        return true;
      }
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 8: //Valida Fecha dd/mm/aaaa valida
      if (trim($param) != '') {
        if (str_contains($param, '/')) {
          $fecha = explode('/', $param);
          if (ValidarDatos(2, $fecha[0]) && ValidarDatos(2, $fecha[1]) && ValidarDatos(2, $fecha[2])) { // numerico
            if (count($fecha) == 3 && checkdate($fecha[1], $fecha[0], $fecha[2])) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
      break;

  }
}
