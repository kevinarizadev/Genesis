<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename= Reporte_Presupuestos_Maximos_Medicamentos_por_mes"."_".date("dmY").".xls");
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
 e.autc_tipo_doc_afiliado TIPO_DOC, 
 e.autc_afiliado NUMERO_DOC_PACIENTE,
 e.autn_autorizacion_manual NUMERO_AUTORIZACION,
 trunc(e.autf_confirmado) FECHA_AUTORIZACION,
 trunc(e.autf_orden) FECHA_ORDEN,
 e.autc_mipres MIPRES,
 p.proc_presup_maximos CONCEPTO_PRES_MAX,
 e.Autc_Regimen REGIMEN,
 e.autn_numero numero,
 e.autn_ubicacion ubicacion,
 sum(d.audv_cantidad*d.audv_valor) VALOR
 from eaut_autorizacion e inner join eaud_autorizacion_detalle d 
 on e.autn_empresa = d.audn_empresa  and
 e.autc_documento = d.audc_documento  and
 e.autn_numero = d.audn_numero  and
 e.autn_ubicacion = d.audn_ubicacion  
 inner join epro_producto p on trim(p.proc_codigo) = trim(d.audc_producto)
 where e.autc_estado = 'P' and 
 nvl(e.autc_status,'0') <> '5' and
 e.autc_mipres <> '0' and
 trunc(e.autf_confirmado) between :fecha_inicio and :fecha_fin and
 p.proc_presup_maximos in ('PD',	'PM', 'PP','PN','PS')
 group by
 e.autc_tipo_doc_afiliado, 
 e.autc_afiliado,
 e.autn_autorizacion_manual,
 trunc(e.autf_confirmado),
 trunc(e.autf_orden),
 e.autc_mipres,
 p.proc_presup_maximos,
 e.Autc_Regimen,
 e.autn_numero,
 e.autn_ubicacion");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_fin',$fecha_final);

?>

<h1>Reporte Presupuestos Maximos Medicamentos por mes </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>
<th>TIPO_DOC	 </th> 
<th>NUMERO_DOC_PACIENTE	 </th> 
<th>NUMERO_AUTORIZACION	 </th> 
<th>FECHA_AUTORIZACION	 </th> 
<th>FECHA_ORDEN	 </th> 
<th>MIPRES	 </th> 
<th>CONCEPTO_PRES_MAX	 </th> 
<th>REGIMEN	 </th> 
<th>NUMERO	 </th> 
<th>UBICACION	 </th> 
<th>VALOR </th> 
  


</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	    echo "<tr>";
      echo "<td>"; echo$rows['TIPO_DOC']; echo "</td>";
      echo "<td>"; echo$rows['NUMERO_DOC_PACIENTE']; echo "</td>";
      echo "<td>"; echo$rows['NUMERO_AUTORIZACION']; echo "</td>";     
      echo "<td>"; echo$rows['FECHA_AUTORIZACION']; echo "</td>";     
      echo "<td>"; echo$rows['FECHA_ORDEN']; echo "</td>";     
      echo "<td>"; echo$rows['MIPRES']; echo "</td>";     
      echo "<td>"; echo$rows['CONCEPTO_PRES_MAX']; echo "</td>";     
      echo "<td>"; echo$rows['REGIMEN']; echo "</td>";     
      echo "<td>"; echo$rows['NUMERO']; echo "</td>";     
      echo "<td>"; echo$rows['UBICACION']; echo "</td>";     
      echo "<td>"; echo$rows['VALOR']; echo "</td>";         
      echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
