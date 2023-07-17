<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="doc_procesados.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
//var_dump($_GET);
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$anno = $_GET['anno']; //08

$consulta = oci_parse($c,"select anno_con, mes_con, anno_rad, mes_rad, documento, mvdv_tercero, tern_especialidad, trim(replace(replace(terc_nombre,chr(10),''),chr(13),'')) terc_nombre,
trim(replace(replace(movc_factura,chr(10),''),chr(13),'')) movc_factura, movc_documento, movc_concepto, movc_estado, cntc_concepto, modalidad, movv_total, mvdv_valor,
cuov_saldo, bruto, reteiva, valor_glosa, f_radicacion, f_contabilizacion, f_confirmacion, f_prestacion, movf_confirmacion, modulo, movv_empleado, mvdv_cuenta, facc_regimen,
trim(replace(replace(afic_tipo_documento,chr(10),''),chr(13),'')) afic_tipo_documento, trim(replace(replace(afic_documento,chr(10),''),chr(13),''))  afic_documento,
afin_ubicacion_geografica from nview_doc_procesados WHERE anno_con = :anno");
oci_bind_by_name($consulta,':anno',$anno);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'ANNO_CON'.'|'.
        'MES_CON'.'|'.
        'ANNO_RAD'.'|'.
        'MES_RAD'.'|'.
        'DOCUMENTO'.'|'.
        'MVDV_TERCERO'.'|'.
        'TERN_ESPECIALIDAD'.'|'.
        'TERC_NOMBRE'.'|'.
        'MOVC_FACTURA'.'|'.
        'MOVC_DOCUMENTO'.'|'.
        'MOVC_CONCEPTO'.'|'.
        'MOVC_ESTADO'.'|'.
        'CNTC_CONCEPTO'.'|'.
        'MODALIDAD'.'|'.
        'MOVV_TOTAL'.'|'.
        'MVDV_VALOR'.'|'.
        'CUOV_SALDO'.'|'.
        'BRUTO'.'|'.
        'RETEIVA'.'|'.
        'VALOR_GLOSA'.'|'.
        'F_RADICACION'.'|'.
        'F_CONTABILIZACION'.'|'.
        'F_CONFIRMACION'.'|'.
        'F_PRESTACION'.'|'.
        'MOVF_CONFIRMACION'.'|'.
        'MODULO'.'|'.
        'MOVV_EMPLEADO'.'|'.
        'MVDV_CUENTA'.'|'.
        'FACC_REGIMEN'.'|'.
        'AFIC_TIPO_DOCUMENTO'.'|'.
        'AFIC_DOCUMENTO'.'|'.
        'AFIN_UBICACION_GEOGRAFICA';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['ANNO_CON']. '|' .
        $rows['MES_CON']. '|' .
        $rows['ANNO_RAD']. '|' .
        $rows['MES_RAD']. '|' .
        $rows['DOCUMENTO']. '|' .
        $rows['MVDV_TERCERO']. '|' .
        $rows['TERN_ESPECIALIDAD']. '|' .
        $rows['TERC_NOMBRE']. '|' .
        $rows['MOVC_FACTURA']. '|' .
        $rows['MOVC_DOCUMENTO']. '|' .
        $rows['MOVC_CONCEPTO']. '|' .
        $rows['MOVC_ESTADO']. '|' .
        $rows['CNTC_CONCEPTO']. '|' .
        $rows['MODALIDAD']. '|' .
        $rows['MOVV_TOTAL']. '|' .
        $rows['MVDV_VALOR']. '|' .
        $rows['CUOV_SALDO']. '|' .
        $rows['BRUTO']. '|' .
        $rows['RETEIVA']. '|' .
        $rows['VALOR_GLOSA']. '|' .
        $rows['F_RADICACION']. '|' .
        $rows['F_CONTABILIZACION']. '|' .
        $rows['F_CONFIRMACION']. '|' .
        $rows['F_PRESTACION']. '|' .
        $rows['MOVF_CONFIRMACION']. '|' .
        $rows['MODULO']. '|' .
        $rows['MOVV_EMPLEADO']. '|' .
        $rows['MVDV_CUENTA']. '|' .
        $rows['FACC_REGIMEN']. '|' .
        $rows['AFIC_TIPO_DOCUMENTO']. '|' .
        $rows['AFIC_DOCUMENTO']. '|' .
        $rows['AFIN_UBICACION_GEOGRAFICA']. '|' ."\n";

 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
