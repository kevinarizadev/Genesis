<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="pagos_x_afiliado.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$fecha1 = $_GET['fecha_inicio']; //08
$fecha2 = $_GET['fecha_final']; //08
$departamento = $_GET['dpto']; //2017
$municipio = $_GET['mun']; //2017

//var_dump($_GET);
$consulta = oci_parse($c,"select nit,
					       razon_social,
					       documento,
					       numero_interno,
					       ubicacion,
					       concatenado,
					       año_Radicacion,
					       mes_radicacion,
					       numero_factura,
					       valor_factura,
					       valor_glosa,
					       fecha_glosa,
					       motivo_glosa,
					       valor_neto_Factura,
					       documento_pago,
					       año_pago,
					       mes_pago,
					       fecha_pago,
					       prefactura,
					       departamento,
					       conc_clase,
					       afic_nombre,
					       tern_ubicacion_geografica,
					       facc_tipo_doc_afiliado,
					       facc_afiliado,
					       ubicacion_afi,
					       dep_cod,
					       mun_cod
from nview_pag_efce
where trunc(FECHA_PAGO) between :fecha1 and :fecha2
and ((dep_cod = :departamento) or (0 = :departamento))
and ((mun_cod = :municipio) or (0 = :municipio))");

oci_bind_by_name($consulta,':fecha1',$fecha1);
oci_bind_by_name($consulta,':fecha2',$fecha2);
oci_bind_by_name($consulta,':departamento',$departamento);
oci_bind_by_name($consulta,':municipio',$municipio);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 		'NIT'.'|'.
				'RAZON_SOCIAL'.'|'.
				'DOCUMENTO'.'|'.
				'NUMERO_INTERNO'.'|'.
				'UBICACION'.'|'.
				'CONCATENADO'.'|'.
				'AÑO_RADICACION'.'|'.
				'MES_RADICACION'.'|'.
				'NUMERO_FACTURA'.'|'.
				'VALOR_FACTURA'.'|'.
				'VALOR_GLOSA'.'|'.
				'FECHA_GLOSA'.'|'.
				'MOTIVO_GLOSA'.'|'.
				'VALOR_NETO_FACTURA'.'|'.
				'DOCUMENTO_PAGO'.'|'.
				'AÑO_PAGO'.'|'.
				'MES_PAGO'.'|'.
				'FECHA_PAGO'.'|'.
				'PREFACTURA'.'|'.
				'DEPARTAMENTO'.'|'.
				'CONC_CLASE'.'|'.
				'AFIC_NOMBRE'.'|'.
				'TERN_UBICACION_GEOGRAFICA'.'|'.
				'FACC_TIPO_DOC_AFILIADO'.'|'.
				'FACC_AFILIADO'.'|'.
				'UBICACION_AFI'.'|'.
				'DEP_COD'.'|'.
				'MUN_COD';




echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['NIT']. '|' .
			$rows['RAZON_SOCIAL']. '|' .
			$rows['DOCUMENTO']. '|' .
			$rows['NUMERO_INTERNO']. '|' .
			$rows['UBICACION']. '|' .
			$rows['CONCATENADO']. '|' .
			$rows['AÑO_RADICACION']. '|' .
			$rows['MES_RADICACION']. '|' .
			$rows['NUMERO_FACTURA']. '|' .
			$rows['VALOR_FACTURA']. '|' .
			$rows['VALOR_GLOSA']. '|' .
			$rows['FECHA_GLOSA']. '|' .
			$rows['MOTIVO_GLOSA']. '|' .
			$rows['VALOR_NETO_FACTURA']. '|' .
			$rows['DOCUMENTO_PAGO']. '|' .
			$rows['AÑO_PAGO']. '|' .
			$rows['MES_PAGO']. '|' .
			$rows['FECHA_PAGO']. '|' .
			$rows['PREFACTURA']. '|' .
			$rows['DEPARTAMENTO']. '|' .
			$rows['CONC_CLASE']. '|' .
			$rows['AFIC_NOMBRE']. '|' .
			$rows['TERN_UBICACION_GEOGRAFICA']. '|' .
			$rows['FACC_TIPO_DOC_AFILIADO']. '|' .
			$rows['FACC_AFILIADO']. '|' .
			$rows['UBICACION_AFI']. '|' .
			$rows['DEP_COD']. '|' .
			$rows['MUN_COD']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
