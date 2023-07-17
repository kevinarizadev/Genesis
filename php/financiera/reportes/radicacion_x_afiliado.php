<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="radicacion_x_afiliado2.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$fecha1 = $_GET['fecha_inicio']; //08
$fecha2 = $_GET['fecha_final']; //08
$departamento = $_GET['dpto']; //2017
$municipio =$_GET['mun'];

echo $municipio;
$consulta = oci_parse($c,"SELECT facc_documento, facn_numero, facn_ubicacion, facf_fecha, mes,
fach_hora, facv_tercero, facv_bruto, facv_iva, facv_total, facc_estado, facc_concepto,
TRIM(replace(replace(nombre_prestador,chr(10),''),chr(13),'')) nombre_prestador, facv_total_proveedor,
TRIM(replace(replace(nombre_responsable,chr(10),''),chr(13),'')) nombre_responsable,
TRIM(replace(replace(nombre_modificado,chr(10),''),chr(13),'')) nombre_modificado, facf_final,
facn_contrato_capitado, TRIM(replace(replace(facc_factura,chr(10),''),chr(13),'')) facc_factura,
TRIM(replace(replace(municipio,chr(10),''),chr(13),'')) municipio,
TRIM(replace(replace(departamento,chr(10),''),chr(13),'')) departamento, conc_clase, facn_anno, facn_periodo,
TRIM(replace(replace(afic_nombre,chr(10),''),chr(13),'')) afic_nombre, tern_ubicacion_geografica,
facc_tipo_doc_afiliado, facc_afiliado, fecha_autorizacion, tipo_autorizacion, anticipo, numero_autorizacion
FROM nview_rad_efce
WHERE fach_hora BETWEEN :fecha1 AND :fecha2
AND dep_cod = :departamento
AND ((mun_cod = :municipio) OR (:municipio = 0))");

oci_bind_by_name($consulta,':fecha1',$fecha1);
oci_bind_by_name($consulta,':fecha2',$fecha2);
oci_bind_by_name($consulta,':departamento',$departamento);
oci_bind_by_name($consulta,':municipio',$municipio);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 		'FACC_DOCUMENTO'.'|'.
				'FACN_NUMERO'.'|'.
				'FACN_UBICACION'.'|'.
				'FACF_FECHA'.'|'.
				'MES'.'|'.
				'FACH_HORA'.'|'.
				'FACV_TERCERO'.'|'.
				'FACV_BRUTO'.'|'.
				'FACV_IVA'.'|'.
				'FACV_TOTAL'.'|'.
				'FACC_ESTADO'.'|'.
				'FACC_CONCEPTO'.'|'.
				'NOMBRE_PRESTADOR'.'|'.
				'FACV_TOTAL_PROVEEDOR'.'|'.
				'NOMBRE_RESPONSABLE'.'|'.
				'NOMBRE_MODIFICADO'.'|'.
				'FACF_FINAL'.'|'.
				'FACN_CONTRATO_CAPITADO'.'|'.
				'FACC_FACTURA'.'|'.
				'MUNICIPIO'.'|'.
				'DEPARTAMENTO'.'|'.
				'CONC_CLASE'.'|'.
				'FACN_ANNO'.'|'.
				'FACN_PERIODO'.'|'.
				'AFIC_NOMBRE'.'|'.
				'TERN_UBICACION_GEOGRAFICA'.'|'.
				'FACC_TIPO_DOC_AFILIADO'.'|'.
				'FACC_AFILIADO'.'|'.
				'FECHA_AUTORIZACION'.'|'.
				'TIPO_AUTORIZACION'.'|'.
				'ANTICIPO'.'|'.
				'NUMERO_AUTORIZACION';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 		$rows['FACC_DOCUMENTO']. '|' .
				$rows['FACN_NUMERO']. '|' .
				$rows['FACN_UBICACION']. '|' .
				$rows['FACF_FECHA']. '|' .
				$rows['MES']. '|' .
				$rows['FACH_HORA']. '|' .
				$rows['FACV_TERCERO']. '|' .
				$rows['FACV_BRUTO']. '|' .
				$rows['FACV_IVA']. '|' .
				$rows['FACV_TOTAL']. '|' .
				$rows['FACC_ESTADO']. '|' .
				$rows['FACC_CONCEPTO']. '|' .
				$rows['NOMBRE_PRESTADOR']. '|' .
				$rows['FACV_TOTAL_PROVEEDOR']. '|' .
				$rows['NOMBRE_RESPONSABLE']. '|' .
				$rows['NOMBRE_MODIFICADO']. '|' .
				$rows['FACF_FINAL']. '|' .
				$rows['FACN_CONTRATO_CAPITADO']. '|' .
				$rows['FACC_FACTURA']. '|' .
				$rows['MUNICIPIO']. '|' .
				$rows['DEPARTAMENTO']. '|' .
				$rows['CONC_CLASE']. '|' .
				$rows['FACN_ANNO']. '|' .
				$rows['FACN_PERIODO']. '|' .
				$rows['AFIC_NOMBRE']. '|' .
				$rows['TERN_UBICACION_GEOGRAFICA']. '|' .
				$rows['FACC_TIPO_DOC_AFILIADO']. '|' .
				$rows['FACC_AFILIADO']. '|' .
				$rows['FECHA_AUTORIZACION']. '|' .
				$rows['TIPO_AUTORIZACION']. '|' .
				$rows['ANTICIPO']. '|' .
				$rows['NUMERO_AUTORIZACION']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
