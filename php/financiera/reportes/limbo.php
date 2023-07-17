<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="limbo.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"select consecutivo, item, replace(replace(num_factura,chr(10),''),chr(13),'') num_factura, rad_fecha_registro, fecha_rad, nvl(id_tercero,0) id_tercero, valor_factura,
valor_glosas, valor_pagar, codetapa, marca_financ, cnsfinanc, radd_fecha_registro, mes, ano, fecha_ocurrencia, mes_ocu,
ano_ocu, nvl(cuenta,0) cuenta, vr_factura, vrglosa, idafiliado, idcontratoadm, idsede, nivel, codigo_ciu, modulo_oasis, documento_oasis,
valor_oasis, fecha_cruce
from limbo_krystalos");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'CONSECUTIVO'.'|'.
        'ITEM'.'|'.
        'NUM_FACTURA'.'|'.
        'RAD_FECHA_REGISTRO'.'|'.
        'FECHA_RAD'.'|'.
        'ID_TERCERO'.'|'.
        'VALOR_FACTURA'.'|'.
        'VALOR_GLOSAS'.'|'.
        'VALOR_PAGAR'.'|'.
        'CODETAPA'.'|'.
        'MARCA_FINANC'.'|'.
        'CNSFINANC'.'|'.
        'RADD_FECHA_REGISTRO'.'|'.
        'MES'.'|'.
        'ANO'.'|'.
        'FECHA_OCURRENCIA'.'|'.
        'MES_OCU'.'|'.
        'ANO_OCU'.'|'.
        'CUENTA'.'|'.
        'VR_FACTURA'.'|'.
        'VRGLOSA'.'|'.
        'IDAFILIADO'.'|'.
        'IDCONTRATOADM'.'|'.
        'IDSEDE'.'|'.
        'NIVEL'.'|'.
        'CODIGO_CIU'.'|'.
        'MODULO_OASIS'.'|'.
        'DOCUMENTO_OASIS'.'|'.
        'VALOR_OASIS'.'|'.
        'FECHA_CRUCE';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['CONSECUTIVO']. '|' .
        $rows['ITEM']. '|' .
        $rows['NUM_FACTURA']. '|' .
        $rows['RAD_FECHA_REGISTRO']. '|' .
        $rows['FECHA_RAD']. '|' .
        $rows['ID_TERCERO']. '|' .
        $rows['VALOR_FACTURA']. '|' .
        $rows['VALOR_GLOSAS']. '|' .
        $rows['VALOR_PAGAR']. '|' .
        $rows['CODETAPA']. '|' .
        $rows['MARCA_FINANC']. '|' .
        $rows['CNSFINANC']. '|' .
        $rows['RADD_FECHA_REGISTRO']. '|' .
        $rows['MES']. '|' .
        $rows['ANO']. '|' .
        $rows['FECHA_OCURRENCIA']. '|' .
        $rows['MES_OCU']. '|' .
        $rows['ANO_OCU']. '|' .
        $rows['CUENTA']. '|' .
        $rows['VR_FACTURA']. '|' .
        $rows['VRGLOSA']. '|' .
        $rows['IDAFILIADO']. '|' .
        $rows['IDCONTRATOADM']. '|' .
        $rows['IDSEDE']. '|' .
        $rows['NIVEL']. '|' .
        $rows['CODIGO_CIU']. '|' .
        $rows['MODULO_OASIS']. '|' .
        $rows['DOCUMENTO_OASIS']. '|' .
        $rows['VALOR_OASIS']. '|' .
        $rows['FECHA_CRUCE']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
