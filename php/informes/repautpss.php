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
$fecha_final = $_GET['fecha_final'];
$nit = $_GET['nit'];

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT A.autn_autorizacion_manual,razon_social,A.tipo_documento,
	 																 A.documento, A.nombre_afiliado,to_char(a.fecha_procesado,'dd/mm/yyyy')fecha_procesado,
																	 sum(a.valor_servicio) valor_autorizado, A.autc_regimen, NUMERO_SOLICITUD,A.NOMBRE_RESPONSABLE
																	 from r_traza_aut a where 
																	 to_date(a.fecha_procesado,'dd/mm/yyyy') between :fecha_inicio and :fecha_final
																	 and a.nit_pss = :nit
																	 GROUP BY  A.autn_autorizacion_manual, A.tipo_documento, A.documento,
																	 A.nombre_afiliado,a.fecha_procesado, A.autc_regimen,razon_social, NUMERO_SOLICITUD, A.NOMBRE_RESPONSABLE");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);
oci_bind_by_name($consulta,':nit',$nit);

?>

<h1>Reporte Autorizaciones por Prestador </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?>  NIT: <?php echo $nit?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
						<th>AUTN_AUTORIZACION_MANUAL</th>
						<th>RAZON_SOCIAL</th>
						<th>TIPO_DOCUMENTO</th>
						<th>DOCUMENTO</th>
						<th>NOMBRE_AFILIADO</th>
						<th>FECHA_PROCESADO</th>
						<th>VALOR_AUTORIZADO</th>
						<th>AUTC_REGIMEN</th>
						<th>NUMERO_SOLICITUD</th>
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
											echo "<td>"; echo$rows['TIPO_DOCUMENTO']; echo "</td>";
											echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_AFILIADO']; echo "</td>";
											echo "<td>"; echo$rows['FECHA_PROCESADO']; echo "</td>";
											echo "<td>"; echo$rows['VALOR_AUTORIZADO']; echo "</td>";
											echo "<td>"; echo$rows['AUTC_REGIMEN']; echo "</td>";
											echo "<td>"; echo$rows['NUMERO_SOLICITUD']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_RESPONSABLE']; echo "</td>";

        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
