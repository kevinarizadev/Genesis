<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename= Reporte_Homologacion_Medicamentos_ST015_por_mes"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$fecha_inicio = $_GET['fecha_inicio'];
		$fecha_final = $_GET['fecha_fin'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT
 ad.audc_producto codigoMedicamento,
 pr.proc_nombre nombre_producto,
 count(1) cantidad
 
 from eaut_autorizacion au
 inner join eaud_autorizacion_detalle ad on (au.autn_empresa = ad.audn_empresa
                                             and au.autc_documento = ad.audc_documento
                                             and au.autn_numero = ad.audn_numero
                                             and au.autn_ubicacion = ad.audn_ubicacion)
 inner join epro_producto pr on (trim(ad.audc_producto) = trim(pr.proc_codigo))
 
 where au.autn_empresa = 1
 and trunc(au.autf_confirmado) between :fecha_inicio and :fecha_fin
 and au.autc_documento = 'AS'
 and au.autc_estado = 'P'
 and nvl(au.autc_status,'0') <> '5'
 and pr.pron_clasificacion = 714
 group by ad.audc_producto, pr.proc_nombre"
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_fin',$fecha_final);

?>

<h1>Reporte Homologacion Medicamentos autorizaciones por mes </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>
<th>CODIGO MEDICAMENTO	</th>
<th>NOMBRE PRODUCTO	</th>
<th>CANTIDAD	</th>

  


</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	    echo "<tr>";
      echo "<td>"; echo$rows['CODIGOMEDICAMENTO']; echo "</td>";
      echo "<td>"; echo$rows['NOMBRE_PRODUCTO']; echo "</td>";
      echo "<td>"; echo$rows['CANTIDAD']; echo "</td>";         
      echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
