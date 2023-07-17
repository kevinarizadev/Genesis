<?php
// Se abre la conexion a la base de datos 
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="DESCUENTOS_SP_03.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$MES = $_GET['MES']; //08
		$ANO = $_GET['ANO']; //2017
		$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT * FROM eview_pypconsol_descuentos
									WHERE periodo2 = :v_periodo
								"
								);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':v_periodo',$PERIODO);


oci_execute($consulta);	
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'MES_EVALUADO'.'|'.
			'AÑO'.'|'.
			'DEPARTAMENTO_PSS'.'|'.
			'MUNICIPIO_PSS'.'|'.
			'ACPN_PROVEEDOR'.'|'.
			'TERC_NOMBRE'.'|'.
			'VALORCONTRATO'.'|'.
			'TOTALDESCONTAR'.'|'.
			'NUMEROAFILIADO'.'|'.
			'VALORUPCAFILLIADO'.'|'.
			'EACC_NUM_CONTRATO'.'|'.
			'PERIODO2';
;

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo 	$rows['MES_EVALUADO']. '|' .
			$rows['AÑO']. '|' .
			$rows['DEPARTAMENTO_PSS']. '|' .
			$rows['MUNICIPIO_PSS']. '|' .
			$rows['ACPN_PROVEEDOR']. '|' .
			$rows['TERC_NOMBRE']. '|' .
			$rows['VALORCONTRATO']. '|' .
			$rows['TOTALDESCONTAR']. '|' .
			$rows['NUMEROAFILIADO']. '|' .
			$rows['VALORUPCAFILLIADO']. '|' .
			$rows['EACC_NUM_CONTRATO']. '|' .
			$rows['PERIODO2']. '|' .
			"\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>