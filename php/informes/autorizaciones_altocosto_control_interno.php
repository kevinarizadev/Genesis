<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=AUTORIZACIONES_ALTOCOSTO_CONTROL_INTERNO"."_".date("dmY").".xlsx");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
$fecha_inicio = $_GET['anno'];
$fecha_final = $_GET['periodo'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT a.num_autorizacion,a.ubicacion_aut,a.seccional,a.fecha_procesado,
 a.fecha_orden,a.nit_pss,a.razon_social,a.nit_solicitante,a.tipo_documento,
 a.documento,a.fecha_nacimiento,a.nombre_afiliado,a.edad,a.sexo,a.codigo_municipio,a.codigo_dpto_afiliado,
 a.nombre_dpto_afiliado,a.municipio_afiliado,a.cod_clasificacion,a.nombre_clasificacion,
 a.unidad_funcional,a.cod_dx,a.nombre_dx,a.cod_dx2,a.alto_costo,a.clase,a.tipo,a.cod_producto,
 a.nombre_producto,a.cantidad,a.valor_unitario,a.valor_servicio,a.copago,a.estado,a.autn_autorizacion_manual,
 a.fecha_solicitud,a.año,a.mes,a.anticipo,a.autc_regimen,a.audc_tipo,a.ambito
 FROM r_traza_aut a
 WHERE a.alto_costo = 'S' AND
 nvl(a.status,'0') <> '5' AND
 to_char(FECHA_PROCESADO,'yyyy') IN :anno AND
 to_char(FECHA_PROCESADO,'mm') = '0'||:periodo AND a.clase = 'P'"
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$fecha_inicio);
oci_bind_by_name($consulta,':periodo',$fecha_final);

?>


<table cellspacing="0" cellpadding="0"  align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

<th>NUMERO</th>  
<th>UBICACION_AUT </th>
<th>SECCIONAL </th>
<th>FECHA_PROCESADO </th>
<th>FECHA_ORDEN </th>
<th>NIT_PSS </th>
<th>RAZON_SOCIAL </th>
<th>NIT_SOLICITANTE </th>
<th>TIPO_DOCUMENTO </th>
<th>DOCUMENTO </th>
<th>FECHA_NACIMIENTO </th>
<th>NOMBRE_AFILIADO </th>
<th>EDAD </th>
<th>SEXO </th>
<th>CODIGO_MUNICIPIO </th>
<th>CODIGO_DPTO_AFILIADO </th>
<th> NOMBRE_DPTO_AFILIADO</th>
<th> MUNICIPIO_AFILIADO</th>
<th> COD_CLASIFICACION</th>
<th> NOMBRE_CLASIFICACION</th>
<th> UNIDAD_FUNCIONAL</th>
<th> COD_DX</th>
<th> NOMBRE_DX</th>
<th> COD_DX2</th>
<th> ALTO_COSTO</th>
<th> CLASE</th>
<th> COD_PRODUCTO</th>
<th> NOMBRE_PRODUCTO</th>
<th> CANTIDAD</th>
<th> VALOR_UNITARIO</th>
<th> VALOR_SERVICIO </th>
<th> COPAGO </th>
<th> ESTADO </th>
<th> AUTN_AUTORIZACION_MANUAL </th>
<th> FECHA_SOLICITUD </th>
<th> AÑO </th>
<th> MES </th>
<th> ANTICIPO </th>
<th> AUTC_REGIMEN </th>
<th> AMBITO </th>

</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

          echo "<td>"; echo$rows['NUM_AUTORIZACION']; echo "</td>";    		  
		  echo "<td>";  echo $rows['UBICACION_AUT'];  echo "</td>";    
		  echo "<td>";  echo $rows['SECCIONAL'];  echo "</td>";    
		  echo "<td>";  echo $rows['FECHA_PROCESADO'];  echo "</td>";    
		  echo "<td>";  echo $rows['FECHA_ORDEN'];  echo "</td>";    
		  echo "<td>";  echo $rows['NIT_PSS'];  echo "</td>";    
		  echo "<td>";  echo $rows['RAZON_SOCIAL'];  echo "</td>";
		  echo "<td>";  echo $rows['NIT_SOLICITANTE'];  echo "</td>";
		  echo "<td>";  echo $rows['TIPO_DOCUMENTO'];  echo "</td>";
		  echo "<td>";  echo $rows['DOCUMENTO'];  echo "</td>";
		  echo "<td>";  echo $rows['FECHA_NACIMIENTO'];  echo "</td>";
		  echo "<td>";  echo $rows['NOMBRE_AFILIADO'];  echo "</td>";
		  echo "<td>";  echo $rows['EDAD'];  echo "</td>";
		  echo "<td>";  echo $rows['SEXO'];  echo "</td>";
		  echo "<td>";  echo $rows['CODIGO_MUNICIPIO'];  echo "</td>";
		  echo "<td>";  echo $rows['CODIGO_DPTO_AFILIADO'];  echo "</td>";
		  echo "<td>";  echo $rows['NOMBRE_DPTO_AFILIADO']; echo "</td>";
		  echo "<td>";  echo $rows['MUNICIPIO_AFILIADO']; echo "</td>";
		  echo "<td>";  echo $rows['COD_CLASIFICACION']; echo "</td>";
		  echo "<td>";  echo $rows['NOMBRE_CLASIFICACION']; echo "</td>";
		  echo "<td>";  echo $rows['UNIDAD_FUNCIONAL']; echo "</td>";
		  echo "<td>";  echo $rows['COD_DX']; echo "</td>";
		  echo "<td>";  echo $rows['NOMBRE_DX']; echo "</td>";
		  echo "<td>";  echo $rows['COD_DX2']; echo "</td>";
		  echo "<td>";  echo $rows['ALTO_COSTO']; echo "</td>";
		  echo "<td>";  echo $rows['CLASE']; echo "</td>";		  
		  echo "<td>";  echo $rows['COD_PRODUCTO']; echo "</td>";
		  echo "<td>";  echo $rows['NOMBRE_PRODUCTO']; echo "</td>";
		  echo "<td>";  echo $rows['CANTIDAD']; echo "</td>";
		  echo "<td>";  echo $rows['VALOR_UNITARIO']; echo "</td>";
		  echo "<td>";  echo $rows['VALOR_SERVICIO']; echo "</td>";
		  echo "<td>";  echo $rows['COPAGO']; echo "</td>";
		  echo "<td>";  echo $rows['ESTADO']; echo "</td>";
		  echo "<td>";  echo $rows['AUTN_AUTORIZACION_MANUAL']; echo "</td>";
		  echo "<td>";  echo $rows['FECHA_SOLICITUD']; echo "</td>";
		  echo "<td>";  echo $rows['AÑO']; echo "</td>";
		  echo "<td>";  echo $rows['MES']; echo "</td>";
		  echo "<td>";  echo $rows['ANTICIPO']; echo "</td>";
		  echo "<td>";  echo $rows['AUTC_REGIMEN']; echo "</td>";		  
		  echo "<td>";  echo $rows['AMBITO']; echo "</td>";




        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
