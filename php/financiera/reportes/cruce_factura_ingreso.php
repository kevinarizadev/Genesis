<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="cruce_factura_ingreso.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$documento = $_GET['doc']; //08
$concepto = $_GET['con']; //08
$nit = $_GET['nit']; //2017

//var_dump($_GET);
$consulta = oci_parse($c,"select cxc,	ingreso, fecha_ingreso,	tercero_ing, razon_social_ing,	fcdv_producto, fcdv_cantidad,
observacion_ing,	documento_ing, factura_ing, concepto_ing, valor_ing,
documento_cruce, fecha_cruce, concepto_cruce,	observacion_cruce,	valor_cruce
from nview_factura_ingreso
where ((tercero_ing = :tercero) or ( 0=:tercero))
and documento_ing = :documento
and concepto_ing = :concepto");

oci_bind_by_name($consulta,':documento',$documento);
oci_bind_by_name($consulta,':concepto',$concepto);
oci_bind_by_name($consulta,':tercero',$nit);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'CXC'.'|'.
				'INGRESO'.'|'.
				'FECHA_INGRESO'.'|'.
				'TERCERO_ING'.'|'.
				'RAZON_SOCIAL_ING'.'|'.
				'FCDV_PRODUCTO'.'|'.
				'FCDV_CANTIDAD'.'|'.
				'OBSERVACION_ING'.'|'.
				'DOCUMENTO_ING'.'|'.
				'FACTURA_ING'.'|'.
				'CONCEPTO_ING'.'|'.
				'VALOR_ING'.'|'.
				'DOCUMENTO_CRUCE'.'|'.
				'FECHA_CRUCE'.'|'.
				'CONCEPTO_CRUCE'.'|'.
				'OBSERVACION_CRUCE'.'|'.
				'VALOR_CRUCE';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['CXC']. '|' .
				$rows['INGRESO']. '|' .
				$rows['FECHA_INGRESO']. '|' .
				$rows['TERCERO_ING']. '|' .
				$rows['RAZON_SOCIAL_ING']. '|' .
				$rows['FCDV_PRODUCTO']. '|' .
				$rows['FCDV_CANTIDAD']. '|' .
				$rows['OBSERVACION_ING']. '|' .
				$rows['DOCUMENTO_ING']. '|' .
				$rows['FACTURA_ING']. '|' .
				$rows['CONCEPTO_ING']. '|' .
				$rows['VALOR_ING']. '|' .
				$rows['DOCUMENTO_CRUCE']. '|' .
				$rows['FECHA_CRUCE']. '|' .
				$rows['CONCEPTO_CRUCE']. '|' .
				$rows['OBSERVACION_CRUCE']. '|' .
				$rows['VALOR_CRUCE']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
