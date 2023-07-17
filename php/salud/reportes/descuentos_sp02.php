<?php
// Se abre la conexion a la base de datos 
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="DESCUENTOS_SP_02.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$MES = $_GET['MES']; //08
		$ANO = $_GET['ANO']; //2017
		$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT * FROM eview_pypdetall_prestador_pyp
									WHERE periodo2 = :v_periodo
								"
								);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':v_periodo',$PERIODO);


oci_execute($consulta);	
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'SECCIONAL_PSS'.'|'.
			'MUN_PSS'.'|'.
			'RAZON_SOCIAL'.'|'.
			'NIT'.'|'.
			'NUM_CONTRATO'.'|'.
			'MES_EVALUADO'.'|'.
			'AÑO'.'|'.
			'VALOR_CONTRATO_MES'.'|'.
			'TIPO'.'|'.
			'ACTC_NOMBRE'.'|'.
			'PROGRAMACION_MES'.'|'.
			'EJECUCION_MES'.'|'.
			'CALIFICACION_CUALITATIVA'.'|'.
			'COSTO_PROM_MES'.'|'.
			'VALOR_A_DESCONTAR'.'|'.
			'EACC_NUM_AFILIADOS'.'|'.
			'EACC_VAL_UPCAFILIADO'.'|'.
			'PORC_CUMPLIMIENTO'.'|'.
			'PORC_ACTIVIDAD'.'|'.
			'PORC_DESCUENTO'.'|'.
			'PERIODO2';
;

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo 	$rows['SECCIONAL_PSS']. '|' .
			$rows['MUN_PSS']. '|' .
			$rows['RAZON_SOCIAL']. '|' .
			$rows['NIT']. '|' .
			$rows['NUM_CONTRATO']. '|' .
			$rows['MES_EVALUADO']. '|' .
			$rows['AÑO']. '|' .
			$rows['VALOR_CONTRATO_MES']. '|' .
			$rows['TIPO']. '|' .
			$rows['ACTC_NOMBRE']. '|' .
			$rows['PROGRAMACION_MES']. '|' .
			$rows['EJECUCION_MES']. '|' .
			$rows['CALIFICACION_CUALITATIVA']. '|' .
			$rows['COSTO_PROM_MES']. '|' .
			$rows['VALOR_A_DESCONTAR']. '|' .
			$rows['EACC_NUM_AFILIADOS']. '|' .
			$rows['EACC_VAL_UPCAFILIADO']. '|' .
			$rows['PORC_CUMPLIMIENTO']. '|' .
			$rows['PORC_ACTIVIDAD']. '|' .
			$rows['PORC_DESCUENTO']. '|' .
			$rows['PERIODO2']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>