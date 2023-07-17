<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
// $function();
$archivos_temp = array();

function ValidarArchivo($base, $name, $ext)
{
  global $request, $archivos_temp;
  $base = $base;
  $name = $name;
  $ext = $ext;
  $errores = array();
  $archivo = json_decode(json_encode($base));
  $texto =  base64_decode(explode(",", $archivo)[1]);
  $filas = explode("\r\n", $texto);
  $archivos_temp = array();
  $error_temp = array();
  $archivo = '';
  foreach ($filas as $fila => $fila_v) {
    $columnas = explode(",", $fila_v);
    // echo json_encode($columnas);
    if (count($columnas) == 32) {
      foreach ($columnas as $columna => $columna_v) {
        switch ($columna + 1) {
          case 1: //Validar Nit Operador
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 9, 'z' => 12])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 2: //Validar Modalidad (Cápita / Evento / PGP)
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Texto
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Modalidad)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            if (!ValidarDatos(4, $columna_v)) { // Modalidad Valida
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Modalidad)', 'mensaje' => 'Tipo de evento invalido'];
            }
            break;

          case 3: // Tipo de Medicamento
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Texto
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de medicamento)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            if (!ValidarDatos(5, $columna_v)) { // Tipo de medicamento Valido
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de medicamento)', 'mensaje' => 'Tipo de medicamento invalido'];
            }
            break;

          case 4: // Nit IPS origen del Paciente
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 9, 'z' => 12])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nit IPS Origen del Paciente)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nit IPS Origen del Paciente)', 'mensaje' => 'El valor ingresado no es numerico'];
            }
            break;

          case 5: // Nombre IPS origen del Paciente
            if (!ValidarDatos(16, $columna_v)) { //Valida Solo Texto con espacios
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre IPS Origen del Paciente)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            break;

          case 6: // Tipo de identificacion
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Texto
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo identificación)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            if (!ValidarDatos(7, $columna_v)) { //Tipo de documento Valido
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo identificación)', 'mensaje' => 'El tipo de documento ingresado no es valido'];
            }
            break;

          case 7: // Numeros de identificacion
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número identificación)', 'mensaje' => 'El valor ingresado no es numerico'];
            }
            break;

          case 8: // Direccion de Paciente
            if (!ValidarDatos(16, $columna_v)) { //Valida Solo Texto con espacios
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Dirección del paciente)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            break;

          case 9: // Codigo DANE
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 5, 'z' => 6])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código DANE)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código DANE)', 'mensaje' => 'El valor ingresado no es numerico'];
            }
            break;

          case 10: // Telefono
            if ($columna_v == '') {
              $columna_v = 9999999999;
            }
            // echo $columna_v;
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código Teléfono)', 'mensaje' => 'El valor ingresado no es numerico'];
            }
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 7, 'z' => 10])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código Teléfono)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 7 y menor o igual a 10'];
            }
            break;

          case 11: // CUM
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 3, 'z' => 18])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(CUM)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(10, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(CUM)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            // if
            break;

          case 12: // Codigo ATC
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(CÓDIGO ATC)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            break;

          case 13: // Descripción Medicamento
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 3, 'z' => 1000])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Descripción Medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 3 y menor o igual a 1000'];
            }
            break;

          case 14: // Vía Administración
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 3, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Vía Administración)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            break;

          case 15: // Frecuencia
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 1, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Frecuencia)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Frecuencia)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 16: // Duración tratamiento
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 1, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Duración tratamiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Duración tratamiento)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 17: // Lote
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Lote)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            break;

          case 18: // Fecha Vencimiento
            if (!ValidarDatos(11, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha Vencimiento)', 'mensaje' => 'La fecha ingresada tiene formato inválido'];
            }
            // if (!ValidarDatos(12, $columna_v)) {
            //   $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha Vencimiento)', 'mensaje' => 'La fecha ingresada no puede ser mayor a la fecha actual'];
            // }
            break;

          case 19: // Cantidad prescrita Total
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 1, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad prescrita Total)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 1 y menor o igual a 5'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad prescrita Total)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 20: // Cantidad Solicitada
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 1, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad Solicitada)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 1 y menor o igual a 5'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad Solicitada)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 21: // Cantidad entregada
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 1, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad entregada)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 1 y menor o igual a 5'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad entregada)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 22: // Valor unitario del medicamento
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario del medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario del medicamento)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 23: // Código diagnostico Principal
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 5])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnostico Principal)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(13, $columna_v)) { //Valida Código diagnostico
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnostico Principal)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 24: // Fecha prescripción
            if (!ValidarDatos(11, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha prescripción)', 'mensaje' => 'La fecha ingresada tiene formato inválido'];
            }
            // if (!ValidarDatos(12, $columna_v)) {
            //   $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha prescripción)', 'mensaje' => 'La fecha ingresada no puede ser mayor a la fecha actual'];
            // }
            break;

          case 25: // Fecha autorización entrega
            if (!ValidarDatos(11, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha autorización entrega)', 'mensaje' => 'La fecha ingresada tiene formato inválido'];
            }
            // if (!ValidarDatos(12, $columna_v)) {
            //   $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha autorización entrega)', 'mensaje' => 'La fecha ingresada no puede ser mayor a la fecha actual'];
            // }
            break;

          case 26: // Fecha Solicitud
            if (!ValidarDatos(11, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha Solicitud)', 'mensaje' => 'La fecha ingresada tiene formato inválido'];
            }
            // if (!ValidarDatos(12, $columna_v)) {
            //   $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha Solicitud)', 'mensaje' => 'La fecha ingresada no puede ser mayor a la fecha actual'];
            // }
            break;

          case 27: // Fecha entrega
            if (!ValidarDatos(11, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha entrega)', 'mensaje' => 'La fecha ingresada tiene formato inválido'];
            }
            // if (!ValidarDatos(12, $columna_v)) {
            //   $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha entrega)', 'mensaje' => 'La fecha ingresada no puede ser mayor a la fecha actual'];
            // }
            break;

          case 28: // Número de autorización
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(2, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 29: // Número fórmula
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 50])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número fórmula)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
            }
            if (!ValidarDatos(13, $columna_v)) { //Valida Solo Numeros
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número fórmula)', 'mensaje' => 'El valor ingresado no es numerico o tiene caracteres inválidos'];
            }
            break;

          case 30: // ¿Autoriza entrega a domicilio?
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 2])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Autoriza entrega a domicilio?)', 'mensaje' => 'El valor ingresado no cumple con una respuesta valida'];
            }
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Texto
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Autoriza entrega a domicilio?)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            if (!ValidarDatos(14, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Autoriza entrega a domicilio?)', 'mensaje' => 'La respuesta ingresada no es valida'];
            }
            break;

          case 31: // ¿Se entrego en el domicilio ?
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 0, 'z' => 2])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Se entrego en el domicilio ?)', 'mensaje' => 'El valor ingresado no cumple con una respuesta valida'];
            }
            if (!ValidarDatos(3, $columna_v)) { //Valida Solo Texto
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Se entrego en el domicilio ?)', 'mensaje' => 'El valor ingresado no es valido'];
            }
            if (!ValidarDatos(14, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿Se entrego en el domicilio ?)', 'mensaje' => 'La respuesta ingresada no es valida'];
            }
            break;

          case 32: // ¿El registro corresponde a una entrega completa o entrega de un pendiente?
            if (!ValidarDatos(1, (object)['x' => $columna_v, 'y' => 3, 'z' => 12])) { //Valida Longitud
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿El registro corresponde a una entrega completa o entrega de un pendiente?)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 3 y menor o igual a 10'];
            }
            if (!ValidarDatos(15, $columna_v)) {
              $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(¿El registro corresponde a una entrega completa o entrega de un pendiente?)', 'mensaje' => 'La respuesta ingresada no es valida'];
            }
            break;


          default:
            $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: ' . count($columnas) . '/' . '41'];
            break;
        }
      }
      if (count($filas) == ($fila + 1)) {
        if (count($error_temp) > 0) {
          $errores[] = (object) [
            'nombre' => $name,
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
  // echo json_encode($error_temp);
  return $errores;
}

function ValidarDatos($tipo = "", $param = "")
{
  switch ($tipo) {
    case 1:  //Valida longitub >= N && N <= Y
      if (strlen($param->x) >= $param->y && strlen($param->x) <= $param->z) {
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

    case 3:  //Valida Solo Texto
      if (ctype_alpha($param)) {
        return true;
      }
      return false;
      break;

    case 4:  //Valida Modalidad valida
      if (strtoupper($param) == "CAPITA" || strtoupper($param) == "EVENTO" || strtoupper($param) == "PGP") {
        return true;
      }
      return false;
      break;

    case 5:  //Valida Tipo de Medicamento
      if (strtoupper($param) == "PBS" || strtoupper($param) == "NOPBS") {
        return true;
      }
      return false;
      break;

    case 6:  //Valida Texto con espacios
      $pattern = "/^[a-zA-Z ]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 7:  //Valida Tipo de Documento
      $po = array_search($param, ['CC', 'CE', 'PA', 'RC', 'TI', 'AS', 'MS', 'NU', 'PE', 'CN', 'SC', 'PT']);
      if ($po !== false) {
        return true;
      }
      return false;
      break;

    case 8:  //Valida Texto y numerico
      // echo $param;
      $pattern = "/^[a-zA-Z 0-9]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 9:  //Valida Campos no vacios
      // echo $param;
      if ($param == '') {
        return true;
      }
      return false;
      break;

    case 10: //Valida CUM
      $pattern = "/^[0-9 -]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 11: //Valida Fecha dd/mm/aaaa
      $fecha = explode('/', $param);
      if (ValidarDatos(2, $fecha[0]) && ValidarDatos(2, $fecha[1]) && ValidarDatos(2, $fecha[2])) { // numerico
        if (count($fecha) == 3 && checkdate($fecha[1], $fecha[0], $fecha[2])) {
          return true;
        }
      }
      return false;
      break;

    case 12: //Valida Fecha <= a fecha actual
      $hoy = strtotime(date("d-m-Y"));
      $fecha = strtotime(str_replace('/', '-', $param));
      // echo $hoy;
      if ($fecha <= $hoy) {
        return true;
      }
      return false;
      break;

    case 13: //Valida Codigo diagnostico
      $pattern = "/^[a-zA-Z0-9]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;

    case 14: //Valida SI / NO
      if (strtoupper($param) == 'SI' || strtoupper($param) == 'NO') {
        return true;
      }
      return false;
      break;

    case 15: //Valida E. FORMULA / E. PENDIENTE
      if (strtoupper($param) == 'E. FORMULA' || strtoupper($param) == 'E. PENDIENTE') {
        return true;
      }
      return false;
      break;

    case 16: //Validacion Libre
      $pattern = "/^[a-zA-Z0-9 -.,]+$/";
      if (preg_match($pattern, $param)) {
        return true;
      }
      return false;
      break;
  }
}
