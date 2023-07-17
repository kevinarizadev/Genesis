<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
//header('Content-Type: text/html; charset=utf-8');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; charset=UTF-8; filename=Afiliados Atendidos de QX"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
			$annos = $_GET['anno'];
      $periodo = $_GET['periodo'];
				//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT distinct A.tipo_documento, A.documento, A.nombre_afiliado, A.municipio_afiliado, A.nombre_dpto_afiliado,
       A.cod_clasificacion, A.nombre_clasificacion, A.cod_producto, A.nombre_producto, a.cod_dx, a.nombre_dx,
       a.nit_pss, a.razon_social
FROM r_traza_aut A
where to_number(to_char(a.fecha_procesado,'mm')) = :periodo
and to_char(a.fecha_procesado,'yyyy') = :anno
and a.nombre_clasificacion like 'QX%'
");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);
?>
<h1>Afiliados Atendidos de QX </h1>
<h3>Periodo: <?php echo $annos?>-<?php echo $periodo?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
      <tr>
						<th> TIPO_DOCUMENTO</th>
						<th> DOCUMENTO</th>
						<th> NOMBRE_AFILIADO</th>
						<th> MUNICIPIO_AFILIADO</th>
						<th> NOMBRE_DPTO_AFILIADO</th>
						<th> COD_CLASIFICACION</th>
						<th> NOMBRE_CLASIFICACION</th>
						<th> COD_PRODUCTO</th>
						<th> NOMBRE_PRODUCTO</th>
						<th> COD_DX</th>
						<th> NOMBRE_DX</th>
						<th> NIT_PSS</th>
						<th> RAZON_SOCIAL</th>
      </tr>
<?php

oci_execute($consulta);

// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";
											echo "<td>"; echo$rows['TIPO_DOCUMENTO']; echo "</td>";
											echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_AFILIADO']; echo "</td>";
											echo "<td>"; echo$rows['MUNICIPIO_AFILIADO']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_DPTO_AFILIADO']; echo "</td>";
											echo "<td>"; echo$rows['COD_CLASIFICACION']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_CLASIFICACION']; echo "</td>";
											echo "<td>"; echo$rows['COD_PRODUCTO']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_PRODUCTO']; echo "</td>";
											echo "<td>"; echo$rows['COD_DX']; echo "</td>";
											echo "<td>"; echo$rows['NOMBRE_DX']; echo "</td>";
											echo "<td>"; echo$rows['NIT_PSS']; echo "</td>";
											echo "<td>"; echo$rows['RAZON_SOCIAL']; echo "</td>";
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
