<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="PRSA.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"select terc_tipo_tercero, cuov_tercero, replace(replace(terc_nombre,chr(10),''),chr(13),'') terc_nombre, tern_chequeo, replace(replace(cuec_nombre,chr(10),''),chr(13),'') cuec_nombre, cuon_empresa, cuoc_documento, cuon_numero, cuon_ubicacion,
  cuon_cuota, cuof_vencimiento, cuof_fecha, cuon_factura, replace(replace(cuoc_factura,chr(10),''),chr(13),'') cuoc_factura, replace(replace(movc_prefijo,chr(10),''),chr(13),'') movc_prefijo, cuoc_naturaleza, cuov_valor, cuov_saldo, cuov_cuenta, movc_documento, tern_zona,
  bruto, retefuente, reteica, reteiva, timbre, fecha_causacion, fecha_radicado, fecha_prestacion, modalidad, ubicacion_afi, cuec_imputable, cuec_abc, fecha_factura,
  cuon_plan, movc_estado, movc_concepto
  from nview_prsa_tempo");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'TERC_TIPO_TERCERO'.'|'.
				'CUOV_TERCERO'.'|'.
				'TERC_NOMBRE'.'|'.
				'TERN_CHEQUEO'.'|'.
				'CUEC_NOMBRE'.'|'.
				'CUON_EMPRESA'.'|'.
				'CUOC_DOCUMENTO'.'|'.
				'CUON_NUMERO'.'|'.
				'CUON_UBICACION'.'|'.
				'CUON_CUOTA'.'|'.
				'CUOF_VENCIMIENTO'.'|'.
				'CUOF_FECHA'.'|'.
				'CUON_FACTURA'.'|'.
				'CUOC_FACTURA'.'|'.
				'MOVC_PREFIJO'.'|'.
				'CUOC_NATURALEZA'.'|'.
				'CUOV_VALOR'.'|'.
				'CUOV_SALDO'.'|'.
				'CUOV_CUENTA'.'|'.
				'MOVC_DOCUMENTO'.'|'.
				'TERN_ZONA'.'|'.
				'BRUTO'.'|'.
				'RETEFUENTE'.'|'.
				'RETEICA'.'|'.
				'RETEIVA'.'|'.
				'TIMBRE'.'|'.
				'FECHA_CAUSACION'.'|'.
				'FECHA_RADICADO'.'|'.
				'FECHA_PRESTACION'.'|'.
				'MODALIDAD'.'|'.
				'UBICACION_AFI'.'|'.
				'CUEC_IMPUTABLE'.'|'.
				'CUEC_ABC'.'|'.
				'FECHA_FACTURA'.'|'.
				'CUON_PLAN'.'|'.
				'MOVC_ESTADO'.'|'.
				'MOVC_CONCEPTO';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['TERC_TIPO_TERCERO']. '|' .
				$rows['CUOV_TERCERO']. '|' .
				$rows['TERC_NOMBRE']. '|' .
				$rows['TERN_CHEQUEO']. '|' .
				$rows['CUEC_NOMBRE']. '|' .
				$rows['CUON_EMPRESA']. '|' .
				$rows['CUOC_DOCUMENTO']. '|' .
				$rows['CUON_NUMERO']. '|' .
				$rows['CUON_UBICACION']. '|' .
				$rows['CUON_CUOTA']. '|' .
				$rows['CUOF_VENCIMIENTO']. '|' .
				$rows['CUOF_FECHA']. '|' .
				$rows['CUON_FACTURA']. '|' .
				$rows['CUOC_FACTURA']. '|' .
				$rows['MOVC_PREFIJO']. '|' .
				$rows['CUOC_NATURALEZA']. '|' .
				$rows['CUOV_VALOR']. '|' .
				$rows['CUOV_SALDO']. '|' .
				$rows['CUOV_CUENTA']. '|' .
				$rows['MOVC_DOCUMENTO']. '|' .
				$rows['TERN_ZONA']. '|' .
				$rows['BRUTO']. '|' .
				$rows['RETEFUENTE']. '|' .
				$rows['RETEICA']. '|' .
				$rows['RETEIVA']. '|' .
				$rows['TIMBRE']. '|' .
				$rows['FECHA_CAUSACION']. '|' .
				$rows['FECHA_RADICADO']. '|' .
				$rows['FECHA_PRESTACION']. '|' .
				$rows['MODALIDAD']. '|' .
				$rows['UBICACION_AFI']. '|' .
				$rows['CUEC_IMPUTABLE']. '|' .
				$rows['CUEC_ABC']. '|' .
				$rows['FECHA_FACTURA']. '|' .
				$rows['CUON_PLAN']. '|' .
				$rows['MOVC_ESTADO']. '|' .
				$rows['MOVC_CONCEPTO']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
