<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Autorizaciones por Prestador"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
$fecha_inicio = $_GET['fecha_inicio'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT A.autn_autorizacion_manual,a.razon_social, to_char(A.fecha_procesado,'dd/mm/yyyy')fecha_procesado,
                                   sum(a.valor_servicio) VALOR, A.nombre_responsable
													  FROM r_traza_aut a
                            WHERE  to_date(a.fecha_procesado,'dd/mm/yyyy') = :fecha_inicio group by A.autn_autorizacion_manual,a.razon_social, to_char(A.fecha_procesado,'dd/mm/yyyy'), A.nombre_responsable");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);


?>

<h1>Reporte Autorizaciones por Funcionario </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
						<th>AUTN_AUTORIZACION_MANUAL</th>
						<th>RAZON_SOCIAL</th>
						<th>FECHA_PROCESADO</th>
						<th>VALOR</th>
						<th>NOMBRE_RESPONSABLE</th>
			</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";
											echo "<td>"; echo$rows['AUTN_AUTORIZACION_MANUAL']; echo "</td>";
											echo "<td>"; echo$rows['RAZON_SOCIAL']; echo "</td>";
											echo "<td>"; echo$rows['FECHA_PROCESADO']; echo "</td>";
											echo "<td>"; echo$rows['VALOR']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_RESPONSABLE']; echo "</td>";
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
