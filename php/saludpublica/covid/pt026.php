<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
// header("Content-Type: text/plain");
// header('Content-Disposition: attachment; filename="PT026.txt"');

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=PT026.xls");
header("Pragma: no-cache");
header("Expires: 0");

$sql = "select REGIMENEAPB, UBGN_CODIGO, TOTALPRUEBASRT, PRUEBASPOSRT, TOTALPRUEBASAC, PRUEBASPOSAC, TOTALPRUEBASAG, PRUEBASPOSAG from oasis.vw_tempo_pt26_1 union select REGIMENEAPB, UBGN_CODIGO, TOTALPRUEBASRT, PRUEBASPOSRT, TOTALPRUEBASAC, PRUEBASPOSAC, TOTALPRUEBASAG, PRUEBASPOSAG from oasis.vw_tempo_pt26_2";

?>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
    <tr>
        <th>REGIMENEAPB</th>
        <th>UBGN_CODIGO</th>
        <th>TOTALPRUEBASRT</th>
        <th>FECHA PRUEBASPOSRT</th>
        <th>TOTALPRUEBASAC</th>
        <th>PRUEBASPOSAC</th>
        <th>TOTALPRUEBASAG</th>
        <th>PRUEBASPOSAG</th>
    </tr>
<?php

$consulta = oci_parse($c,$sql);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
// $row = array();
// $v_cabezado = 'REGIMENEAPB'.'|'.
// 				'UBGN_CODIGO'.'|'.
// 				'TOTALPRUEBASRT'.'|'.
// 				'PRUEBASPOSRT'.'|'.
// 				'TOTALPRUEBASAC'.'|'.
// 				'PRUEBASPOSAC'.'|'.
// 				'TOTALPRUEBASAG'.'|'.
// 				'PRUEBASPOSAG';
// 	echo $v_cabezado;
// 	//echo "\n";
// // Se recorre el array con los resultados obtenidos de la base de datos
// while( $row = oci_fetch_assoc($consulta))
// {
// 	$v_detalle =	$row['REGIMENEAPB']. '|' .
// 					$row['UBGN_CODIGO']. '|' .
// 					$row['TOTALPRUEBASRT']. '|' .
// 					$row['PRUEBASPOSRT']. '|' .
// 					$row['TOTALPRUEBASAC']. '|' .
// 					$row['PRUEBASPOSAC']. '|' .
// 					$row['TOTALPRUEBASAG']. '|' .
// 					$row['PRUEBASPOSAG'];
// 	echo $v_detalle;
// 	//echo "\n";
// }
 // Se cierra la conexion a la base de datos para evitar bloqueos
while( $row = oci_fetch_assoc($consulta))
{
	echo "<tr>";
    echo "<td>"; echo$row['REGIMENEAPB']; echo "</td>";
	echo "<td>"; echo$row['UBGN_CODIGO']; echo "</td>";
	echo "<td>"; echo$row['TOTALPRUEBASRT']; echo "</td>";
	echo "<td>"; echo$row['PRUEBASPOSRT']; echo "</td>";
	echo "<td>"; echo$row['TOTALPRUEBASAC']; echo "</td>";
	echo "<td>"; echo$row['PRUEBASPOSAC']; echo "</td>";
	echo "<td>"; echo$row['TOTALPRUEBASAG']; echo "</td>";
	echo "<td>"; echo$row['PRUEBASPOSAG']; echo "</td>";
	echo "</tr>";
 }
oci_close($c);
?>