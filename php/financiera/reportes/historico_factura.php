<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="historico_factura.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$documento = $_GET['doc']; //08
$numero = $_GET['num']; //08
$ubicacion = $_GET['ubi']; //2017

//var_dump($_GET);
$consulta = oci_parse($c,"select cruc_documento, crun_numero, crun_ubicacion, crun_plan, cruv_cuenta, crun_moneda, cruv_tercero,
crun_cuota, crun_renglon, cruc_doc_documento, crun_doc_numero, crun_doc_ubicacion, crun_doc_cuota, cruf_fecha, cruv_valor, cruc_operacion
from bcru_cruce_audit
where cruc_documento = :documento
and crun_numero = :numero
and crun_ubicacion = :ubicacion");

oci_bind_by_name($consulta,':documento',$documento);
oci_bind_by_name($consulta,':numero',$numero);
oci_bind_by_name($consulta,':ubicacion',$ubicacion);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'CRUC_DOCUMENTO'.'|'.
				'CRUN_NUMERO'.'|'.
				'CRUN_UBICACION'.'|'.
				'CRUN_PLAN'.'|'.
				'CRUV_CUENTA'.'|'.
				'CRUN_MONEDA'.'|'.
				'CRUV_TERCERO'.'|'.
				'CRUN_CUOTA'.'|'.
				'CRUN_RENGLON'.'|'.
				'CRUC_DOC_DOCUMENTO'.'|'.
				'CRUN_DOC_NUMERO'.'|'.
				'CRUN_DOC_UBICACION'.'|'.
				'CRUN_DOC_CUOTA'.'|'.
				'CRUF_FECHA'.'|'.
				'CRUV_VALOR'.'|'.
				'CRUC_OPERACION';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['CRUC_DOCUMENTO']. '|' .
				$rows['CRUN_NUMERO']. '|' .
				$rows['CRUN_UBICACION']. '|' .
				$rows['CRUN_PLAN']. '|' .
				$rows['CRUV_CUENTA']. '|' .
				$rows['CRUN_MONEDA']. '|' .
				$rows['CRUV_TERCERO']. '|' .
				$rows['CRUN_CUOTA']. '|' .
				$rows['CRUN_RENGLON']. '|' .
				$rows['CRUC_DOC_DOCUMENTO']. '|' .
				$rows['CRUN_DOC_NUMERO']. '|' .
				$rows['CRUN_DOC_UBICACION']. '|' .
				$rows['CRUN_DOC_CUOTA']. '|' .
				$rows['CRUF_FECHA']. '|' .
				$rows['CRUV_VALOR']. '|' .
				$rows['CRUC_OPERACION']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
