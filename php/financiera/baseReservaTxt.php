<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
$ano         = $_GET['panno'];
$periodo     = $_GET['pperiodo'];
$base        = $_GET['pbase'];
$consulta    = $_GET['pconsulta_base'];
$consulta    = $consulta .' and anno = :v_panno and periodo = :v_pperiodo';
//var_dump($_GET);

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Base_Reserva_'.$base.'.txt"');
//echo $consulta;
$query = oci_parse($c,$consulta);
oci_bind_by_name($query,':v_panno',$ano);
oci_bind_by_name($query,':v_pperiodo',$periodo);
oci_execute($query);

if($base == 1){
  // Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
  $row = array();
  	echo 	'NIT_PRESTADOR'.'|'.
          'NOMBRE_PRESTADOR'.'|'.
          'CODIGO_REPS_PRESTADOR'.'|'.
          'CONTRATO'.'|'.
          'NUEVO_CONTRATO'.'|'.
          'FECHA_INICIO_VIGENCIA_CONTRATO'.'|'.
          'FECHA_FINAL_VIGENCIA_CONTRATO'.'|'.
          'CODIGO_CUPS'.'|'.
          'DESCRIPCION_CUPS'.'|'.
          'TIPO_TARIFA'.'|'.
          'TARIFA_BASE'.'|'.
          'RECARGO_TARIFA'.'|'.
          'TARIFA_ACTUALIZADA'.'|'.
          'FECHA_INICIO_VIGENCIA_TARIFA'.'|'.
          'FECHA_FIN_VIGENCIA_TARIFA';
  echo "\n";
  // Se recorre el array con los resultados obtenidos de la base de datos
  while( $rows = oci_fetch_assoc($query))
  {
  	echo 	$rows['NIT_PRESTADOR']. '|' .
          $rows['NOMBRE_PRESTADOR']. '|' .
          $rows['CODIGO_REPS_PRESTADOR']. '|' .
          $rows['CONTRATO']. '|' .
          $rows['NUEVO_CONTRATO']. '|' .
          $rows['FECHA_INICIO_VIGENCIA_CONTRATO']. '|' .
          $rows['FECHA_FINAL_VIGENCIA_CONTRATO']. '|' .
          $rows['CODIGO_CUPS']. '|' .
          $rows['DESCRIPCION_CUPS']. '|' .
          $rows['TIPO_TARIFA']. '|' .
          $rows['TARIFA_BASE']. '|' .
          $rows['RECARGO_TARIFA']. '|' .
          $rows['TARIFA_ACTUALIZADA']. '|' .
          $rows['FECHA_INICIO_VIGENCIA_TARIFA']. '|' .
          $rows['FECHA_FIN_VIGENCIA_TARIFA']. '|' ."\n";
   }
}
if($base == 2){
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'NIT_PRESTADOR'.'|'.
        'NOMBRE_PRESTADOR'.'|'.
        'CODIGO_REPS_PRESTADOR'.'|'.
        'CONTRATO'.'|'.
        'AUTORIZACION'.'|'.
        'FECHA_AUTORIZACION'.'|'.
        'AMBITO'.'|'.
        'CODIGO_CUPS'.'|'.
        'DESCRIPCION_CUPS'.'|'.
        'UNIDAD_DE_MEDIDA'.'|'.
        'CANTIDAD'.'|'.
        'ESTIMACION'.'|'.
        'TARIFA_PROMEDIO_POR_UNIDAD'.'|'.
        'VALOR_RESERVA'.'|'.
        'LLAVE';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($query))
{
	echo 	$rows['NIT_PRESTADOR']. '|' .
        $rows['NOMBRE_PRESTADOR']. '|' .
        $rows['CODIGO_REPS_PRESTADOR']. '|' .
        $rows['CONTRATO']. '|' .
        $rows['AUTORIZACION']. '|' .
        $rows['FECHA_AUTORIZACION']. '|' .
        $rows['AMBITO']. '|' .
        $rows['CODIGO_CUPS']. '|' .
        $rows['DESCRIPCION_CUPS']. '|' .
        $rows['UNIDAD_DE_MEDIDA']. '|' .
        $rows['CANTIDAD']. '|' .
        $rows['ESTIMACION']. '|' .
        $rows['TARIFA_PROMEDIO_POR_UNIDAD']. '|' .
        $rows['VALOR_RESERVA']. '|' .
        $rows['LLAVE']. '|' ."\n";
 }
}
if($base == 4){
  $row = array();
  	echo 	'NIT_PRESTADOR'.'|'.
          'NOMBRE_PRESTADOR'.'|'.
          'CODIGO_REPS_PRESTADOR'.'|'.
          'CONTRATO'.'|'.
          'AUTORIZACION'.'|'.
          'FECHA_AUTORIZACION'.'|'.
          'AMBITO'.'|'.
          'CODIGO_CUPS'.'|'.
          'DESCRIPCION_CUPS'.'|'.
          'UNIDAD_MEDIDA'.'|'.
          'CANTIDAD_FACTURADA'.'|'.
          'FACTURA'.'|'.
          'FECHA_PRESTACION'.'|'.
          'FECHA_ELABORACION'.'|'.
          'FECHA_RADICACION'.'|'.
          'VALOR_FACTURADO'.'|'.
          'VALOR_GLOSADO'.'|'.
          'FECHA_GLOSA'.'|'.
          'ESTADO_GLOSA'.'|'.
          'VALOR_PAGADO'.'|'.
          'FECHA_PAGO'.'|'.
          'VALOR_RESERVA'.'|'.
          'LLAVE';
  echo "\n";
  // Se recorre el array con los resultados obtenidos de la base de datos
  while( $rows = oci_fetch_assoc($query))
  {
  	echo 	$rows['NIT_PRESTADOR']. '|' .
          $rows['NOMBRE_PRESTADOR']. '|' .
          $rows['CODIGO_REPS_PRESTADOR']. '|' .
          $rows['CONTRATO']. '|' .
          $rows['AUTORIZACION']. '|' .
          $rows['FECHA_AUTORIZACION']. '|' .
          $rows['AMBITO']. '|' .
          $rows['CODIGO_CUPS']. '|' .
          $rows['DESCRIPCION_CUPS']. '|' .
          $rows['UNIDAD_MEDIDA']. '|' .
          $rows['CANTIDAD_FACTURADA']. '|' .
          $rows['FACTURA']. '|' .
          $rows['FECHA_PRESTACION']. '|' .
          $rows['FECHA_ELABORACION']. '|' .
          $rows['FECHA_RADICACION']. '|' .
          $rows['VALOR_FACTURADO']. '|' .
          $rows['VALOR_GLOSADO']. '|' .
          $rows['FECHA_GLOSA']. '|' .
          $rows['ESTADO_GLOSA']. '|' .
          $rows['VALOR_PAGADO']. '|' .
          $rows['FECHA_PAGO']. '|' .
          $rows['VALOR_RESERVA']. '|' .
          $rows['LLAVE']. '|' ."\n";
   }
}

if($base == 5){
  $row = array();
  	echo 	'NIT_PRESTADOR'.'|'.
          'NOMBRE_PRESTADOR'.'|'.
          'CODIGO_REPS_PRESTADOR'.'|'.
          'CONTRATO'.'|'.
          'MES_COBERTURA'.'|'.
          'AMBITO'.'|'.
          'VALOR_CONTRATO_MES'.'|'.
          'FACTURA'.'|'.
          'FECHA_ELABORACION'.'|'.
          'FECHA_RADICACION'.'|'.
          'VALOR_FACTURADO'.'|'.
          'VALOR_GLOSADO'.'|'.
          'FECHA_GLOSA'.'|'.
          'ESTADO_GLOSA'.'|'.
          'VALOR_PAGADO'.'|'.
          'FECHA_PAGO'.'|'.
          'VALOR_RESERVA'.'|'.
          'LLAVE'.'|'.
          'SALDO';
  echo "\n";
  // Se recorre el array con los resultados obtenidos de la base de datos
  while( $rows = oci_fetch_assoc($query))
  {
  	echo 	$rows['NIT_PRESTADOR']. '|' .
          $rows['NOMBRE_PRESTADOR']. '|' .
          $rows['CODIGO_REPS_PRESTADOR']. '|' .
          $rows['CONTRATO']. '|' .
          $rows['MES_COBERTURA']. '|' .
          $rows['AMBITO']. '|' .
          $rows['VALOR_CONTRATO_MES']. '|' .
          $rows['FACTURA']. '|' .
          $rows['FECHA_ELABORACION']. '|' .
          $rows['FECHA_RADICACION']. '|' .
          $rows['VALOR_FACTURADO']. '|' .
          $rows['VALOR_GLOSADO']. '|' .
          $rows['FECHA_GLOSA']. '|' .
          $rows['ESTADO_GLOSA']. '|' .
          $rows['VALOR_PAGADO']. '|' .
          $rows['FECHA_PAGO']. '|' .
          $rows['VALOR_RESERVA']. '|' .
          $rows['LLAVE']. '|' .
          $rows['SALDO']. '|' ."\n";
   }

}

if($base == 6){
  $row = array();
    echo 	'NIT_PRESTADOR'.'|'.
          'NOMBRE_PRESTADOR'.'|'.
          'CODIGO_REPS_PRESTADOR'.'|'.
          'CONTRATO'.'|'.
          'AUTORIZACION'.'|'.
          'FECHA_AUTORIZACION'.'|'.
          'AMBITO'.'|'.
          'CODIGO_CUPS'.'|'.
          'DESCRIPCION_CUPS'.'|'.
          'UNIDAD_DE_MEDIDA'.'|'.
          'CANTIDAD'.'|'.
          'FACTURA'.'|'.
          'FECHA_PRESTACION'.'|'.
          'FECHA_ELABORACION'.'|'.
          'FECHA_RADICACION'.'|'.
          'VALOR_FACTURADO'.'|'.
          'VALOR_GLOSADO'.'|'.
          'FECHA_GLOSA'.'|'.
          'ESTADO_DE_GLOSA'.'|'.
          'VALOR_PAGADO'.'|'.
          'FECHA_PAGO'.'|'.
          'TIPO_DE_PAGO'.'|'.
          'LLAVE'.'|'.
          'PAGO';
  echo "\n";
  // Se recorre el array con los resultados obtenidos de la base de datos
  while( $rows = oci_fetch_assoc($query))
  {
    echo 	$rows['NIT_PRESTADOR']. '|' .
          $rows['NOMBRE_PRESTADOR']. '|' .
          $rows['CODIGO_REPS_PRESTADOR']. '|' .
          $rows['CONTRATO']. '|' .
          $rows['AUTORIZACION']. '|' .
          $rows['FECHA_AUTORIZACION']. '|' .
          $rows['AMBITO']. '|' .
          $rows['CODIGO_CUPS']. '|' .
          $rows['DESCRIPCION_CUPS']. '|' .
          $rows['UNIDAD_DE_MEDIDA']. '|' .
          $rows['CANTIDAD']. '|' .
          $rows['FACTURA']. '|' .
          $rows['FECHA_PRESTACION']. '|' .
          $rows['FECHA_ELABORACION']. '|' .
          $rows['FECHA_RADICACION']. '|' .
          $rows['VALOR_FACTURADO']. '|' .
          $rows['VALOR_GLOSADO']. '|' .
          $rows['FECHA_GLOSA']. '|' .
          $rows['ESTADO_DE_GLOSA']. '|' .
          $rows['VALOR_PAGADO']. '|' .
          $rows['FECHA_PAGO']. '|' .
          $rows['TIPO_DE_PAGO']. '|' .
          $rows['LLAVE']. '|' .
          $rows['PAGO']. '|' ."\n";
   }
}

if($base == 7){
  $row = array();
    echo 	'NIT_PRESTADOR'.'|'.
          'NOMBRE_PRESTADOR'.'|'.
          'CODIGO_REPS_PRESTADOR'.'|'.
          'CONTRATO'.'|'.
          'MES_COBERTURA'.'|'.
          'AMBITO'.'|'.
          'VALOR_CONTRATO_MES'.'|'.
          'FACTURA'.'|'.
          'FECHA_ELABORACION'.'|'.
          'FECHA_RADICACION_FACTURA'.'|'.
          'VALOR_FACTURA'.'|'.
          'VALOR_GLOSA'.'|'.
          'FECHA_GLOSA'.'|'.
          'ESTADO_DE_GLOSA'.'|'.
          'VALOR_PAGO'.'|'.
          'FECHA_PAGO'.'|'.
          'TIPO_PAGO'.'|'.
          'LLAVE';
  echo "\n";
  // Se recorre el array con los resultados obtenidos de la base de datos
  while( $rows = oci_fetch_assoc($query))
  {
    echo 	$rows['NIT_PRESTADOR']. '|' .
          $rows['NOMBRE_PRESTADOR']. '|' .
          $rows['CODIGO_REPS_PRESTADOR']. '|' .
          $rows['CONTRATO']. '|' .
          $rows['MES_COBERTURA']. '|' .
          $rows['AMBITO']. '|' .
          $rows['VALOR_CONTRATO_MES']. '|' .
          $rows['FACTURA']. '|' .
          $rows['FECHA_ELABORACION']. '|' .
          $rows['FECHA_RADICACION_FACTURA']. '|' .
          $rows['VALOR_FACTURA']. '|' .
          $rows['VALOR_GLOSA']. '|' .
          $rows['FECHA_GLOSA']. '|' .
          $rows['ESTADO_DE_GLOSA']. '|' .
          $rows['VALOR_PAGO']. '|' .
          $rows['FECHA_PAGO']. '|' .
          $rows['TIPO_PAGO']. '|' .
          $rows['LLAVE']. '|' ."\n";
   }
}

 
if($base == 8){
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
  echo      'TIPO_IDENTIFICACION'.'|'.
            'NUM_IDENTIFICACION'.'|'.
            'AFILIADO'.'|'.
            'TIPO_AFILIADO'.'|'.
            'NUMERO_INCAPACIDAD'.'|'.
            'TIPO_INCAPACIDAD'.'|'.
            'COD_DIAGNOSTICO'.'|'.
            'DIAGNOSTICO'.'|'.
            'FECHA_INICIO'.'|'.
            'FECHA_FIN'.'|'.
            'IBC'.'|'.
            'FECHA_RADICACION'.'|'.
            'ESTADO_INCAPACIDAD'.'|'.
            'VALOR_PAGO'.'|'.
            'FECHA_PAGO'.'|'.
            'NUMERO_DIAS_PAGO'.'|'.
            'VALOR_RESERVA'.'|'.
            'LLAVE';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($query))
{
  echo      $rows['TIPO_IDENTIFICACION']. '|' .
            $rows['NUM_IDENTIFICACION']. '|' .
            $rows['AFILIADO']. '|' .
            $rows['TIPO_AFILIADO']. '|' .
            $rows['NUMERO_INCAPACIDAD']. '|' .
            $rows['TIPO_INCAPACIDAD']. '|' .
            $rows['COD_DIAGNOSTICO']. '|' .
            $rows['DIAGNOSTICO']. '|' .
            $rows['FECHA_INICIO']. '|' .
            $rows['FECHA_FIN']. '|' .
            $rows['IBC']. '|' .
            $rows['FECHA_RADICACION']. '|' .
            $rows['ESTADO_INCAPACIDAD']. '|' .
            $rows['VALOR_PAGO']. '|' .
            $rows['FECHA_PAGO']. '|' .
            $rows['NUMERO_DIAS_PAGO']. '|' .
            $rows['VALOR_RESERVA']. '|' .
            $rows['LLAVE']. '|' ."\n";
}
}
 
if($base == 9){
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
  echo      'TIPO_IDENTIFICACION'.'|'.
            'NUM_IDENTIFICACION'.'|'.
            'AFILIADO'.'|'.
            'TIPO_AFILIADO'.'|'.
            'NUMERO_INCAPACIDAD'.'|'.
            'TIPO_INCAPACIDAD'.'|'.
            'COD_DIAGNOSTICO'.'|'.
            'DIAGNOSTICO'.'|'.
            'FECHA_INICIO'.'|'.
            'FECHA_FIN'.'|'.
            'IBC'.'|'.
            'FECHA_RADICACION'.'|'.
            'VALOR_PAGO'.'|'.
            'FECHA_PAGO'.'|'.
            'NUMERO_DIAS_PAGO'.'|'.
            'TIPO_PAGO'.'|'.
            'LLAVE';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($query))
{
  echo      $rows['TIPO_IDENTIFICACION']. '|' .
            $rows['NUM_IDENTIFICACION']. '|' .
            $rows['AFILIADO']. '|' .
            $rows['TIPO_AFILIADO']. '|' .
            $rows['NUMERO_INCAPACIDAD']. '|' .
            $rows['TIPO_INCAPACIDAD']. '|' .
            $rows['COD_DIAGNOSTICO']. '|' .
            $rows['DIAGNOSTICO']. '|' .
            $rows['FECHA_INICIO']. '|' .
            $rows['FECHA_FIN']. '|' .
            $rows['IBC']. '|' .
            $rows['FECHA_RADICACION']. '|' .
            $rows['VALOR_PAGO']. '|' .
            $rows['FECHA_PAGO']. '|' .
            $rows['NUMERO_DIAS_PAGO']. '|' .
            $rows['TIPO_PAGO']. '|' .
            $rows['LLAVE']. '|' ."\n";
}
}
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
