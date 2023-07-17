<?php
    $archivos_all = ['CT','AF','US','AC','AP','AH','AU','AM','AN','AT','AD'];
    $archivos_temp = array();
    function validar_archivos($archivos, $val_aut) {
        global $archivos_all, $archivos_temp;
        $errores = array();
        for ($i = 0; $i < count($archivos); $i++) {
            if (is_object($archivos[$i])) {
                $archivos[$i] = json_decode(json_encode($archivos[$i]));
                if ($archivos[$i]->src != '') {
                    $texto =  base64_decode(explode(",", $archivos[$i]->src)[1]);
                    $filas = explode("\r\n", $texto);
                    $archivos_all = ['CT','AF','US','AC','AP','AH','AU','AM','AN','AT','AD'];
                    $archivos_temp = array();
                    $error_temp = array();
                    foreach($filas as $fila => $fila_v) {
                        $columnas = explode(",", $fila_v);
                        $tipo_archivo = substr($archivos[$i]->name, 0, 2);
                        $longitud = 0;
                        switch ($tipo_archivo) {
                            case 'CT':
                                $longitud = 4;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                }
                                                break;
                                            case 2:
                                                // Fecha
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                                break;
                                            case 3:
                                                // Remisión Código archivo
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 8])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Remisión Código archivo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 8'];
                                                } else {
                                                    $t_m = validar(6, $columna_v);
                                                    if ($t_m == 1) {// nombre archivo no valido
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Remisión Código archivo)', 'mensaje' => 'Las 2 primeras letras no son validas para los nombres de archivos permitidos'];
                                                    } else if ($t_m == 2) {// archivo esta repetido
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Remisión Código archivo)', 'mensaje' => 'Las 2 primeras letras no son validas, se encuentran repetidas en otra fila de este archivo'];
                                                    }
                                                }
                                                break;
                                            case 4:
                                                // Total registros
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Total registros)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 10])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Total registros)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 10'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Total registros)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(7, $columna_v)) {// entero
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Total registros)', 'mensaje' => 'El valor ingresado no es un numero entero'];
                                                }                                        
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AF':
                                $longitud = 17;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                                break;
                                            case 2:
                                                // Razón social o apellidos y nombre del prestador de servicios de salud
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Razón social o apellidos y nombre del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 100])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Razón social o apellidos y nombre del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 100'];
                                                }
                                                break;
                                            case 3:
                                                 // Tipo de identificación
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(9, $columna_v)) {// Tipo de identificación
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion'];
                                                }
                                                break;
                                            case 4:
                                                // Número de identificación
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                } else if (!validar(3, $columna_v)) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 5:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 6:
                                                // Fecha de expedición de la factura
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de expedición de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de expedición de la factura)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                }
                                                break;
                                            case 7:
                                                // Fecha de inicio
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de inicio)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de inicio)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                }
                                                break;
                                            case 8:
                                                // Fecha final
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha final)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha final)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                }
                                                break;
                                            case 9:
                                                // Código entidad administradora
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código entidad administradora)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 6])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código entidad administradora)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 6'];
                                                }
                                                break;
                                            case 10:
                                                // Nombre entidad administradora
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre entidad administradora)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 100])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre entidad administradora)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 100'];
                                                }
                                                break;
                                            case 11:
                                                // Número contrato
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número contrato)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número contrato)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número contrato)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 12:
                                                // Plan beneficios
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 30])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Plan beneficios, en blanco cuando la contratación no obedece a un plan en particular)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 30'];
                                                }
                                                break;
                                            case 13:
                                                // Número póliza
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 10])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número póliza, en blanco cuando el servicio prestado no sea contra una póliza)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 10'];
                                                }
                                                break;
                                            case 14:
                                                // Valor total del pago compartido (copago)
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total del pago compartido (copago))', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total del pago compartido (copago))', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total del pago compartido (copago))', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }
                                                break;
                                            case 15:
                                                // Valor de la comisón
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de la comisón)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de la comisón)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de la comisón)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }
                                                break;
                                            case 16:
                                                // Valor total de descuentos
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de descuentos)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de descuentos)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de descuentos)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }
                                                break;
                                            case 17:
                                                // Valor neto a pagar por la entidad contratante
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor neto a pagar por la entidad contratante)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor neto a pagar por la entidad contratante)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor neto a pagar por la entidad contratante)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'US':
                                $longitud = 14;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        $vinculado = $columnas[4];
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                                break;
                                            case 2:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 3:
                                                // Código entidad administradora
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 6])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 6'];
                                                }
                                                break;
                                            case 4:
                                                // Tipo de usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de usuario)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 1])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 1'];
                                                } else if (!validar(16, $columna_v)) {// Tipo de usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de usuario)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 5:
                                                // Primer apellido del usuario
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer apellido del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(0, (object) ['x' => $columna_v,'y' => 30])) {// longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer apellido del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 30'];
                                                    }
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 30])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer apellido del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 30'];
                                                }
                                                break;
                                            case 6:
                                                // Segundo apellido del usuario
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 30])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer apellido del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 30'];
                                                }
                                                break;
                                            case 7:
                                                // Primer nombre del usuario
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer nombre del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer nombre del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                    }
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Primer nombre del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 8:
                                                // Segundo nombre del usuario
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Segundo nombre del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 9:
                                                // Edad
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(3, $columna_v)) {// numerico
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                    } else if (!validar(0, (object) ['x' => $columna_v,'y' => 3])) {// longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 3'];
                                                    }
                                                } else if ($columna_v !='' && !validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v !='' && !validar(0, (object) ['x' => $columna_v,'y' => 3])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 3'];
                                                }
                                                break;
                                            case 10:
                                                // Unidad medida de edad
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(3, $columna_v)) {// numerico
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                    } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 1])) {// longitud > 0 && longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                    } else if (!validar(17, $columna_v)) {// Unidad medida de edad
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no es valido'];
                                                    }
                                                } else if ($columna_v !='' && !validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v !='' && !validar(-1, (object) ['x' => $columna_v,'y' => 1])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if ($columna_v !='' && !validar(17, $columna_v)) {// Unidad medida de edad
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad medida de edad)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 11:
                                                // Sexo
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                    } else if (!validar(19, $columna_v)) {// Sexo
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no es valido'];
                                                    }
                                                } else if ($columna_v !='' && !validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if ($columna_v !='' && !validar(19, $columna_v)) {// Sexo
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 12:
                                                // Código del departamento de residencia habitual
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del departamento de residencia habitual)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del departamento de residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                    }
                                                } else if ($columna_v !='' && !validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del departamento de residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                }
                                                break;
                                            case 13:
                                                // Código municipios residencia habitual
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código municipios residencia habitual)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(3, $columna_v)) {// numerico
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código municipios residencia habitual)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                    } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 3])) {// longitud > 0 && longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código municipios residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 3'];
                                                    }
                                                } else if ($columna_v !='' && !validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código municipios residencia habitual)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v !='' && !validar(0, (object) ['x' => $columna_v,'y' => 3])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código municipios residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 3'];
                                                }
                                                break;
                                            case 14:
                                                // Zona residencia habitual
                                                if ($vinculado == 3) {
                                                    if ($columna_v == '') {
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Zona residencia habitual)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                    } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 1])) {// longitud > 0 && longitud <= y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Zona residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                    } else if (!validar(18, $columna_v)) {// Zona residencia habitual
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Zona residencia habitual)', 'mensaje' => 'El valor ingresado no es valido'];
                                                    }
                                                } else if ($columna_v !='' && !validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Zona residencia habitual)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if ($columna_v !='' && !validar(18, $columna_v)) {// Zona residencia habitual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Zona residencia habitual)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AC':
                                $longitud = 17;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 2:
                                                // Código prestador servicios salud
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código prestador servicios salud)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 12])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código prestador servicios salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 12'];
                                                }
                                                break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                                break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 5:
                                                // Fecha consulta
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha consulta)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha consulta)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                }
                                                break;
                                            case 6:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                                break;
                                            case 7:
                                                // Código consulta
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código consulta)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 8])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código consulta)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 8'];
                                                }
                                                break;
                                            case 8:
                                                // Finalidad consulta
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Finalidad consulta)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(11, $columna_v)) {// Finalidad consulta
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Finalidad consulta)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 9:
                                                // Causa externa
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(12, $columna_v)) {// Causa externa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 10:
                                                // Código diagnóstico principal
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnóstico principal)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 4])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnóstico principal)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 4'];
                                                }
                                                break;
                                            case 11:
                                                // Código diagnóstico relacionado No. 1
                                                if ($columna_v != '' && !validar(1, (object) ['x' => $columna_v,'y' => 4])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnóstico relacionado No. 1)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 4'];
                                                }
                                                break;
                                            case 12:
                                                // Código diagnóstico relacionado No. 2
                                                if ($columna_v != '' && !validar(1, (object) ['x' => $columna_v,'y' => 4])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnóstico relacionado No. 2)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 4'];
                                                }
                                                break;
                                            case 13:
                                                // Código diagnóstico relacionado No. 3
                                                if ($columna_v != '' && !validar(1, (object) ['x' => $columna_v,'y' => 4])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código diagnóstico relacionado No. 3)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 4'];
                                                }
                                                break;
                                            case 14:
                                                // Tipo diagnóstico principal
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 1])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo diagnóstico principal)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo diagnóstico principal)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(13, $columna_v)) {// Tipo diagnóstico principal
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo diagnóstico principal)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 15:
                                                // Valor de consulta
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de consulta)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de consulta)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 16:
                                                // Valor de la cuota
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de la cuota)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor de la cuota)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 17:
                                                // Valor neto pagar
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor neto pagar)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor neto pagar)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AP':
                                $longitud = 15;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                            break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                            break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 5:
                                                // Fecha del procedimiento
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha del procedimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha del procedimiento)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                }
                                            break;
                                            case 6:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                            break;
                                            case 7:
                                                // Código del procedimiento
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 8])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del procedimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 8'];
                                                }
                                                break;
                                            case 8:
                                                // Ambito de realización del procedimiento
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Ambito de realización del procedimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Ambito de realización del procedimiento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(23, $columna_v)) {// Ambito de realización del procedimiento
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Ambito de realización del procedimiento)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 9:
                                                // Finalidad del procedimiento
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Finalidad del procedimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Finalidad del procedimiento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(24, $columna_v)) {// Finalidad del procedimiento
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Finalidad del procedimiento)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 10:
                                                // Personal que atiende
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Personal que atiende)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if ($columna_v != '' && !validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Personal que atiende)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(25, $columna_v)) {// Personal que atiende
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Personal que atiende)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 11:
                                                // Diagnóstico principal
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico principal)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 12:
                                                // Diagnóstico relacionado
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 13:
                                                // Complicación
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Complicación)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 14:
                                                // Forma de realización del acto quirúrgico
                                                if ($columna_v == '') {
                                                //     $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma de realización del acto quirúrgico)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma de realización del acto quirúrgico)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma de realización del acto quirúrgico)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(26, $columna_v)) {// Forma de realización del acto quirúrgico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma de realización del acto quirúrgico)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 15:
                                                // Valor del procedimiento
                                                if (!validar(-1, (object) ['x' => $columna_v,'y' => 15])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor del procedimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor del procedimiento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AH':
                                $longitud = 19;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                            break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                            break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 5:
                                                // Vía de ingreso a la institución
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Vía de ingreso a la institución)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Vía de ingreso a la institución)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(29, $columna_v)) {// Vía de ingreso a la institución
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Vía de ingreso a la institución)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                            break;
                                            case 6:
                                                // Fecha ingreso usuario a institución
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario a institución)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario a institución)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario a institución)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                            break;
                                            case 7:
                                                // Hora de ingreso del usuario a la institución
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de ingreso del usuario a la institución)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                } else if (!validar(20, $columna_v)) {// Hora de ingreso del usuario a la institución
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de ingreso del usuario a la institución)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                }
                                            break;
                                            case 8:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                            break;
                                            case 9:
                                                // Causa externa
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(12, $columna_v)) {// Causa externa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 10:
                                                // Diagnóstico principal ingreso
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico principal ingreso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 11:
                                                // Diagnóstico principal egreso
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico principal egreso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 12:
                                                // Diagnóstico relacionado 1, de egreso
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado 1, de egreso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 13:
                                                // Diagnóstico relacionado 2 del egreso
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado 2 del egreso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 14:
                                                // Diagnóstico relacionado 3, de egreso
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado 3, de egreso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 15:
                                                // Diagnóstico de la complicación
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico de la complicación)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 16:
                                                // Estado a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(26, $columna_v)) {// Estado a la salida
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 17:
                                                // Diagnóstico de la causa básica de muerte
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico de la causa básica de muerte)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 18:
                                                // Fecha de egreso del usuario a la institución
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de egreso del usuario a la institución)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de egreso del usuario a la institución)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de egreso del usuario a la institución)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                                break;
                                            case 19:
                                                // Hora de egreso del usuario a la institución
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de egreso del usuario a la institución)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                } else if (!validar(20, $columna_v)) {// Hora de egreso del usuario a la institución
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de egreso del usuario a la institución)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AU':
                                $longitud = 17;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 10,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                            break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                            break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 5:
                                                // Fecha ingreso usuario observación
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario observación)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario observación)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha ingreso usuario observación)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                            break;
                                            case 6:
                                                // Hora de ingreso del usuario a observación
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de ingreso del usuario a observación)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                } else if (!validar(20, $columna_v)) {// Hora de ingreso del usuario a observación
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de ingreso del usuario a observación)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                }
                                            break;
                                            case 7:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                            break;
                                            case 8:
                                                // Causa externa
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(12, $columna_v)) {// Causa externa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa externa)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 9:
                                                // Diagnóstico a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 10:
                                                // Diagnóstico relacionado 1, a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado 1, a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 11:
                                                // Diagnóstico relacionado Nro. 2, a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado Nro. 2, a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 12:
                                                // Diagnóstico relacionado Nro. 3, a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico relacionado Nro. 3, a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 13:
                                                // Destino del usuario a la salida de observación
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Destino del usuario a la salida de observación)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Destino del usuario a la salida de observación)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(27, $columna_v)) {// Destino del usuario a la salida de observación
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Destino del usuario a la salida de observación)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 14:
                                                // Estado a la salida
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if ($columna_v != '' && !validar(26, $columna_v)) {// Estado a la salida
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Estado a la salida)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 15:
                                                // Causa básica de muerte en urgencias
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Causa básica de muerte en urgencias)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 16:
                                                // Fecha de salida del usuario de observación
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de salida del usuario de observación)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de salida del usuario de observación)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de salida del usuario de observación)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                                break;
                                            case 17:
                                                // Hora de salida del usuario de observación
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de salida del usuario de observación)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                } else if (!validar(20, $columna_v)) {// Hora de salida del usuario de observación
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de salida del usuario de observación)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AM':
                                $longitud = 14;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                            break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                            break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                            break;
                                            case 5:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                            break;
                                            case 6:
                                                // Código del medicamento
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 7:
                                                // Tipo de medicamento
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de medicamento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(22, $columna_v)) {// Tipo de medicamento
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de medicamento)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 8:
                                                // Nombre genérico del medicamento
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre genérico del medicamento)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 30])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre genérico del medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 30'];
                                                }
                                                break;
                                            case 9:
                                                // Forma farmacéutica
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma farmacéutica)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Forma farmacéutica)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 10:
                                                // Concentración del medicamento
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Concentración del medicamento)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Concentración del medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 11:
                                                // Unidad de medida del medicamento
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad de medida del medicamento)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Unidad de medida del medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 12:
                                                // Número de unidades
                                                if (!validar(-1, (object) ['x' => $columna_v,'y' => 5])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de unidades)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 5'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de unidades)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 13:
                                                // Valor unitario de medicamento
                                                if (!validar(-1, (object) ['x' => $columna_v,'y' => 15])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario de medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario de medicamento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 14:
                                                // Valor total de medicamento
                                                if (!validar(-1, (object) ['x' => $columna_v,'y' => 15])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de medicamento)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de medicamento)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(30, $columnas[11]) || !validar(30, $columnas[12])) {// numerico 11 y 12
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de medicamento)', 'mensaje' => 'Los valores de la multiplicación deben ser numericos'];
                                                } else if (($columnas[11]*$columnas[12]) != $columna_v) {// multiplicar
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total de medicamento)', 'mensaje' => 'La multiplicación de las unidades por el valor del medicamento no correponde'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AN':
                                $longitud = 14;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                                break;
                                            case 3:
                                                // Tipo de identificación de la madre
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación de la madre)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación de la madre)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación de la madre
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación de la madre)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                                break;
                                            case 4:
                                                // Número de identificación de la madre en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación de la madre en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación de la madre en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 5:
                                                // Fecha de nacimiento del recién nacido
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de nacimiento del recién nacido)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de nacimiento del recién nacido)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de nacimiento del recién nacido)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                }
                                                break;
                                            case 6:
                                                // Hora de nacimiento
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de nacimiento)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                } else if (!validar(20, $columna_v)) {// Hora de nacimiento
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de nacimiento)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                }
                                                break;
                                            case 7:
                                                // Edad gestacional
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad gestacional)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Edad gestacional)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 8:
                                                // Control prenatal
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Control prenatal)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Control prenatal)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(21, $columna_v)) {// Control prenatal
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Control prenatal)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 9:
                                                // Sexo
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 1])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 1'];
                                                } else if (!validar(19, $columna_v)) {// Sexo
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Sexo)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 10:
                                                // Peso
                                                if (!validar(-1, (object) ['x' => $columna_v,'y' => 4])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Peso)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Peso)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 11:
                                                // Diagnóstico del recién nacido
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico del recién nacido)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 12:
                                                // Causa básica de muerte
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 4])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Diagnóstico del recién nacido)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 4'];
                                                }
                                                break;
                                            case 13:
                                                // Fecha de muerte del recién nacido
                                                if ($columna_v != '') {
                                                    if (!validar(1, (object) ['x' => $columna_v,'y' => 10])) {// longitud == y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de muerte del recién nacido)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 10'];
                                                    } else if (!validar(4, $columna_v)) {// fecha dd/mm/aaaa
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de muerte del recién nacido)', 'mensaje' => 'La fecha ingresada no tiene un formato valido (dd/mm/aaaa)'];
                                                    } else if (!validar(5, $columna_v)) {// fecha <= fecha_actual
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Fecha de muerte del recién nacido)', 'mensaje' => 'La fecha ingresada debe ser menor a la fecha actual'];
                                                    }
                                                }
                                                break;
                                            case 14:
                                                // Hora de muerte del recién nacido
                                                if ($columna_v != '') {
                                                    if (!validar(1, (object) ['x' => $columna_v,'y' => 5])) {// longitud == y
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de muerte del recién nacido)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 5'];
                                                    } else if (!validar(20, $columna_v)) {// Hora de muerte del recién nacido
                                                        $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Hora de muerte del recién nacido)', 'mensaje' => 'La hora ingresada no tiene un formato valido (hh:mm)'];
                                                    }
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AT':
                                $longitud = 11;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // Número de la factura
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de la factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                                break;
                                            case 3:
                                                // Tipo de identificación del usuario
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(1, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 2'];
                                                } else if (!validar(10, $columna_v)) {// Tipo de identificación del usuario
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de identificación del usuario)', 'mensaje' => 'El valor ingresado no es valido para los tipos de identificacion de usuarios'];
                                                }
                                                break;
                                            case 4:
                                                // Número de identificación del usuario en el Sistema
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de identificación del usuario en el Sistema)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 5:
                                                // Número de autorización
                                                if ($val_aut == 'S' && $columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if ($val_aut == 'S' && !validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if ($val_aut == 'S' && !validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                } else if ($val_aut == 'N' && $columna_v != ''){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Número de autorización)', 'mensaje' => 'El valor ingresado debe estar vacio'];
                                                }
                                                break;
                                            case 6:
                                                // Tipo de servicio
                                                if (!validar(1, (object) ['x' => $columna_v,'y' => 1])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de servicio)', 'mensaje' => 'El valor ingresado no cumple con la longitud igual a 1'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de servicio)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                } else if (!validar(15, $columna_v)) {// Tipo de servicio
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Tipo de servicio)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 7:
                                                // Código servicio
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código servicio)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 20])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código servicio)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 8:
                                                // Nombre servicio
                                                if ($columna_v == '') {
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre servicio)', 'mensaje' => 'El valor ingresado no puede estar vacio'];    
                                                } else if (!validar(-1, (object) ['x' => $columna_v,'y' => 60])) {// longitud > 0 && longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Nombre servicio)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 60'];
                                                }
                                                break;
                                            case 9:
                                                // Cantidad
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 5])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 5'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 10:
                                                // Valor unitario del material e insumo
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario del material e insumo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario del material e insumo)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 11:
                                                // Valor total material insumo
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total material insumo)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                } else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total material insumo)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            case 'AD':
                                $longitud = 6;
                                if (count($columnas) == $longitud) {
                                    foreach ($columnas as $columna => $columna_v) {
                                        // echo "Archivo :".$tipo_archivo.", fila: ".$fila.", columna: ".$columna.", valor: ".$columna_v."<br>";
                                        switch (($columna + 1)) {
                                            case 1:
                                                // factura
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 20])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(factura)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 20'];
                                                }
                                                break;
                                            case 2:
                                                // Código del prestador de servicios de salud
                                                if (!validar(-2, (object) ['x' => $columna_v,'y' => 9,'z' => 12])) {// longitud >= y && longitud <= z
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado no cumple con la longitud mayor o igual a 9 y menor o igual a 12'];
                                                } else if(!validar(30, $columna_v)){
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código del prestador de servicios de salud)', 'mensaje' => 'El valor ingresado solo debe contener numeros'];
                                                }
                                                break;
                                            case 3:
                                                // Código concepto
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 2])) {// longitud == y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código concepto)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 2'];
                                                } else if (!validar(14, $columna_v)) {// Código concepto
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Código concepto)', 'mensaje' => 'El valor ingresado no es valido'];
                                                }
                                                break;
                                            case 4:
                                                // Cantidad
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }  else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Cantidad)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 5:
                                                // Valor unitario
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }  else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor unitario)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            case 6:
                                                // Valor total por concepto
                                                if (!validar(0, (object) ['x' => $columna_v,'y' => 15])) {// longitud <= y
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total por concepto)', 'mensaje' => 'El valor ingresado no cumple con la longitud menor o igual a 15'];
                                                }  else if (!validar(3, $columna_v)) {// numerico
                                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $columna_v, 'dato' => '(Valor total por concepto)', 'mensaje' => 'El valor ingresado no es numerico'];
                                                }
                                                break;
                                            default:
                                                $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => ($columna + 1), 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'La cantidad de columnas de esta fila es invalida: '.count($columnas).'/'.$longitud];
                                                break;
                                        }
                                    }
                                } else {
                                    $error_temp[] = (object) ['fila' => ($fila + 1),'columna' => '', 'valor' => $fila_v, 'dato' => '', 'mensaje' => 'El valor ingresado en esta linea tiene un salto de linea o esta vacia'];
                                }
                                break;
                            default:
                                $longitud = 0;
                                break;
                        }
                        if (count($filas) == ($fila+1)) {
                            if (count($error_temp) > 0) {
                                $errores[] = (object) [
                                    'nombre' => $archivos[$i]->name,
                                    'filas' => count($filas),
                                    'columnas' => $longitud,
                                    'errores' => $error_temp
                                ]; 
                            }  
                        }
                    } 
                } else {
                    $errores[] = (object) [
                        'nombre' => $archivos[$i]->name,
                        'errores' => [],
                        'mensaje' => 'El contenido del archivo esta vacio'
                    ];
                }
            } else {
                $errores[] = (object) [
                    'nombre' => 'posicion: '.$i,
                    'errores' => [],
                    'mensaje' => 'El valor ingresado no se pudo leer el contenido del archivo: '.json_encode($archivos[$i])
                ];
            }
        }
        return $errores;
    }

    function validar($tipo = "", $param = "") {
        switch ($tipo) {
            case -2:// longitud >= y && longitud <= z
                if (strlen($param->x) >= $param->y && strlen($param->x) <= $param->z) {
                    return true;
                } 
                return false;
            break;
            case -1:// longitud > 0 && longitud <= y
                if (strlen($param->x) > 0 && strlen($param->x) <= $param->y) {
                    return true;
                } 
                return false;
            break;
            case 0:// longitud <= y
                if (strlen($param->x) <= $param->y) {
                    return true;
                } 
                return false;
            break;
            case 1:// longitud == y
                if (strlen($param->x) == $param->y) {
                    return true;
                } 
                return false;
            break;
            case 2:// longitud >= y
                if (strlen($param->x) >= $param->y) {
                    return true;
                } 
                return false;
            break;
            case 3:// numerico
                $param = trim($param);
                if (is_numeric($param)) {
                    return true;
                } 
                return false;
            break;
            case 4:// fecha dd/mm/aaaa
                $fecha = explode('/', $param);
                if (validar(3,$fecha[0]) && validar(3,$fecha[1]) && validar(3,$fecha[2])) {// numerico
                    if (count($fecha) == 3 && checkdate($fecha[1], $fecha[0], $fecha[2])) {
                        return true;
                    }
                }
                return false;
            break;
            case 5:// fecha <= fecha_actual
                $hoy = strtotime(date("d-m-Y"));
                $fecha = strtotime(str_replace('/', '-', $param));
                if ($fecha <= $hoy) {
                    return true;
                }
                return false;
            case 6:// nombre archivo valido y archivo no repetido
                global $archivos_all, $archivos_temp;
                $archivo = substr($param, 0, 2);
                $po1 = array_search($archivo, $archivos_all); 
                if ($po1 !== false) {
                    $po2 = array_search($archivo, $archivos_temp);
                    if ($po2 === false) {
                        $archivos_temp[] = $archivos_all[$po1];
                        return 0;
                    }
                    // archivo esta repetido
                    return 2;
                }
                // nombre archivo no valido
                return 1;
            break;
            case 7:// entero
                if (is_integer((int)$param)) {
                    return true;
                } 
                return false;
            break;
            case 8:// Letras [A-Za-z]
                if (ctype_alpha($param)) {
                    return true;
                } 
                return false;
            break;
            case 9:// Tipo de identificación
                $po = array_search($param, ['NI','CC','CE','PA']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 10:// Tipo de identificación del usuario
                $po = array_search($param, ['CC','CE','PA','RC','TI','AS','MS','NU','PE','CN','SC','PT']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 11:// Finalidad consulta
                $po = array_search($param, ['01','02','03','04','05','06','07','08','09','10']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 12:// Causa externa
                $po = array_search($param, ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 13:// Tipo diagnóstico principal
                $po = array_search($param, ['1','2','3']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 14:// Código concepto
                $po = array_search($param, ['01','02','03','04','05','06','07','08','09','10','11','12','13','14']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 15:// Tipo de servicio
                $po = array_search($param, ['1','2','3','4']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 16:// Tipo de usuario
                $po = array_search($param, ['1','2','3','4','5']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 17:// Unidad medida de edad
                $po = array_search($param, ['1','2','3']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 18:// Zona residencia habitual
                $po = array_search($param, ['U','R']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 19:// Sexo
                $po = array_search($param, ['M','F']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 20:// Hora de nacimiento
                $d = DateTime::createFromFormat('H:i', $param);
                return $d && $d->format('H:i') == $param;
            break;
            case 21:// Control prenatal
                $po = array_search($param, ['1','2']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 22:// Tipo de medicamento
                $po = array_search($param, ['1','2']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 23:// Ambito de realización del procedimiento
                $po = array_search($param, ['1','2','3']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 24:// Finalidad del procedimiento
                $po = array_search($param, ['1','2','3','4','5']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 25:// Personal que atiende
                $po = array_search($param, ['1','2','3','4','5']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 26:// Forma de realización del acto quirúrgico
                $po = array_search($param, ['1','2','3','4','5']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 27:// Destino del usuario a la salida de observación
                $po = array_search($param, ['1','2','3']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 28:// Estado a la salida
                $po = array_search($param, ['1','2']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 29:// Vía de ingreso a la institución
                $po = array_search($param, ['1','2','3','4']);
                if ($po !== false) {
                    return true;
                } 
                return false;
            break;
            case 30:// Solo Numero
                $expr = "/^[0-9]*$/";
                if (preg_match($expr, $param)) {
                    return true;
                } 
                return false;
            break;
            default:
                return true;
            break;             
        }
    }
?>