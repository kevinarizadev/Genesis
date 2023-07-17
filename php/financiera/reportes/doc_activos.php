<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="doc_activos.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$consulta = oci_parse($c,"select documento_contable, f_radicado, documento, concepto, facn_ubicacion, f_radicacion, f_confirmacion, facf_fecha_factura,
                          nit, trim(replace(replace(razon,chr(10),''),chr(13),'')) razon, trim(replace(replace(factura,chr(10),''),chr(13),'')) factura,
                          facn_contrato_capitado, modalidad, facv_bruto, facv_iva, facv_total, facv_total_proveedor, facv_responsable
                          from nview_doc_activos");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'DOCUMENTO_CONTABLE'.'|'.
        'F_RADICADO'.'|'.
        'DOCUMENTO'.'|'.
        'CONCEPTO'.'|'.
        'FACN_UBICACION'.'|'.
        'F_RADICACION'.'|'.
        'F_CONFIRMACION'.'|'.
        'FACF_FECHA_FACTURA'.'|'.
        'NIT'.'|'.
        'RAZON'.'|'.
        'FACTURA'.'|'.
        'FACN_CONTRATO_CAPITADO'.'|'.
        'MODALIDAD'.'|'.
        'FACV_BRUTO'.'|'.
        'FACV_IVA'.'|'.
        'FACV_TOTAL'.'|'.
        'FACV_TOTAL_PROVEEDOR';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['DOCUMENTO_CONTABLE']. '|' .
        $rows['F_RADICADO']. '|' .
        $rows['DOCUMENTO']. '|' .
        $rows['CONCEPTO']. '|' .
        $rows['FACN_UBICACION']. '|' .
        $rows['F_RADICACION']. '|' .
        $rows['F_CONFIRMACION']. '|' .
        $rows['FACF_FECHA_FACTURA']. '|' .
        $rows['NIT']. '|' .
        $rows['RAZON']. '|' .
        $rows['FACTURA']. '|' .
        $rows['FACN_CONTRATO_CAPITADO']. '|' .
        $rows['MODALIDAD']. '|' .
        $rows['FACV_BRUTO']. '|' .
        $rows['FACV_IVA']. '|' .
        $rows['FACV_TOTAL']. '|' .
        $rows['FACV_TOTAL_PROVEEDOR']. '|' ."\n";

 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
