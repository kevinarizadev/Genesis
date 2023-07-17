<?php
// Se abre la conexion a la base de datos 
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="DESCUENTOS_SP_04.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$MES = $_GET['MES']; //08
		$ANO = $_GET['ANO']; //2017
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT * FROM eview_pyp_detalle_nocruzo
									WHERE MES = :MES
									AND AÑO = :ANO
								"
								);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':MES', $MES);
oci_bind_by_name($consulta,':ANO', $ANO);


oci_execute($consulta);	
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'TITULO'.'|'.
			'AÑO'.'|'.
			'MES'.'|'.
			'RAZON_SOCIAL'.'|'.
			'NIT'.'|'.
			'FCDC_ARCHIVO'.'|'.
			'FCDC_PRODUCTO'.'|'.
			'PROC_NOMBRE'.'|'.
			'FCDC_FINALIDAD'.'|'.
			'FCDC_TIPO_DOC_AFILIADO'.'|'.
			'FCDC_AFILIADO'.'|'.
			'AFIC_SEXO'.'|'.
			'EDAD'.'|'.
			'FCDC_DIAGNOSTICO'.'|'.
			'DIAC_NOMBRE'.'|'.
			'OBSERVACION'.'|'.
			'FCDC_MARCA'.'|'.
			'PERIODO2';
;

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo 	$rows['TITULO']. '|' .
			$rows['AÑO']. '|' .
			$rows['MES']. '|' .
			$rows['RAZON_SOCIAL']. '|' .
			$rows['NIT']. '|' .
			$rows['FCDC_ARCHIVO']. '|' .
			$rows['FCDC_PRODUCTO']. '|' .
			$rows['PROC_NOMBRE']. '|' .
			$rows['FCDC_FINALIDAD']. '|' .
			$rows['FCDC_TIPO_DOC_AFILIADO']. '|' .
			$rows['FCDC_AFILIADO']. '|' .
			$rows['AFIC_SEXO']. '|' .
			$rows['EDAD']. '|' .
			$rows['FCDC_DIAGNOSTICO']. '|' .
			$rows['DIAC_NOMBRE']. '|' .
			$rows['OBSERVACION']. '|' .
			$rows['FCDC_MARCA']. '|' .
			$rows['PERIODO2']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>