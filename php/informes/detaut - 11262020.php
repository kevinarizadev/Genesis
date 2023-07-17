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
$annos = $_GET['anno'];
$periodo = $_GET['periodo'];


		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT a.num_autorizacion, a.seccional, a.fecha_creacion, a.fecha_procesado, a.hora_confimado, a.fecha_orden,
                                   a.nit_pss, a.razon_social, a.nit_solicitante, a.ubicacion_ter, a.razon_solial_ips_solicitante, a.tipo_documento,
                                   a.documento, a.nombre_afiliado, a.fecha_nacimiento, a.edad, a.sexo, a.codigo_municipio, a.codigo_dpto_afiliado,
                                   a.nombre_dpto_afiliado, a.municipio_afiliado, a.cod_clasificacion, a.nombre_clasificacion, a.unidad_funcional, a.cod_dx,
                                   a.nombre_dx, a.alto_costo, a.clase, a.tipo, a.cod_producto, a.nombre_producto, a.cantidad, a.valor_unitario,
                                   a.valor_servicio, a.copago, a.doc_responsable_aut, a.nombre_responsable, a.estado, a.autn_autorizacion_manual, a.fecha_solicitud,
                                   a.año, a.mes, a.nivel_complejidad, a.anticipo, a.aliada, a.ubicacion_solicitud, a.autn_siniestro, a.autc_regimen,
                                   a.proc_copago, a.autn_nivel_contributivo
                            FROM r_traza_aut a
                              WHERE a.año = :anno
                              AND to_number(a.mes) = :periodo
                              AND to_number(a.codigo_dpto_afiliado) = case when length(:codmunicipio)=5 then substr(:codmunicipio,1,2) else substr(:codmunicipio,1,1)END");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);
oci_bind_by_name($consulta,':codmunicipio',$_SESSION['codmunicipio']);


?>

<h1>Reporte Autorizaciones </h1>
<h3>Parametros Del Reporte: Ano <?php echo $annos?> Mes <?php echo $periodo?></h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
          <th>NUM_AUTORIZACION</th>
          <th>SECCIONAL</th>
          <th>FECHA_CREACION</th>
          <th>FECHA_PROCESADO</th>
          <th>HORA_CONFIMADO</th>
          <th>FECHA_ORDEN</th>
          <th>NIT_PSS</th>
          <th>RAZON_SOCIAL</th>
          <th>NIT_SOLICITANTE</th>
          <th>UBICACION_TER</th>
          <th>RAZON_SOLIAL_IPS_SOLICITANTE</th>
          <th>TIPO_DOCUMENTO</th>
          <th>DOCUMENTO</th>
          <th>NOMBRE_AFILIADO</th>
          <th>FECHA_NACIMIENTO</th>
          <th>EDAD</th>
          <th>SEXO</th>
          <th>CODIGO_MUNICIPIO</th>
          <th>CODIGO_DPTO_AFILIADO</th>
          <th>NOMBRE_DPTO_AFILIADO</th>
          <th>MUNICIPIO_AFILIADO</th>
          <th>COD_CLASIFICACION</th>
          <th>NOMBRE_CLASIFICACION</th>
          <th>UNIDAD_FUNCIONAL</th>
          <th>COD_DX</th>
          <th>NOMBRE_DX</th>
          <th>ALTO_COSTO</th>
          <th>CLASE</th>
          <th>TIPO</th>
          <th>COD_PRODUCTO</th>
          <th>NOMBRE_PRODUCTO</th>
          <th>CANTIDAD</th>
          <th>VALOR_UNITARIO</th>
          <th>VALOR_SERVICIO</th>
          <th>COPAGO</th>
          <th>DOC_RESPONSABLE_AUT</th>
          <th>NOMBRE_RESPONSABLE</th>
          <th>ESTADO</th>
          <th>AUTN_AUTORIZACION_MANUAL</th>
          <th>FECHA_SOLICITUD</th>
          <th>AÑO</th>
          <th>MES</th>
          <th>NIVEL_COMPLEJIDAD</th>
          <th>ANTICIPO</th>
          <th>ALIADA</th>
          <th>UBICACION_SOLICITUD</th>
          <th>AUTN_SINIESTRO</th>
          <th>AUTC_REGIMEN</th>
          <th>PROC_COPAGO</th>
          <th>AUTN_NIVEL_CONTRIBUTIVO</th>
			</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

                      echo "<td>"; echo$rows['NUM_AUTORIZACION']; echo "</td>";
                      echo "<td>"; echo$rows['SECCIONAL']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_CREACION']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_PROCESADO']; echo "</td>";
                      echo "<td>"; echo$rows['HORA_CONFIMADO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_ORDEN']; echo "</td>";
                      echo "<td>"; echo$rows['NIT_PSS']; echo "</td>";
                      echo "<td>"; echo$rows['RAZON_SOCIAL']; echo "</td>";
                      echo "<td>"; echo$rows['NIT_SOLICITANTE']; echo "</td>";
                      echo "<td>"; echo$rows['UBICACION_TER']; echo "</td>";
                      echo "<td>"; echo$rows['RAZON_SOLIAL_IPS_SOLICITANTE']; echo "</td>";
                      echo "<td>"; echo$rows['TIPO_DOCUMENTO']; echo "</td>";
                      echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_NACIMIENTO']; echo "</td>";
                      echo "<td>"; echo$rows['EDAD']; echo "</td>";
                      echo "<td>"; echo$rows['SEXO']; echo "</td>";
                      echo "<td>"; echo$rows['CODIGO_MUNICIPIO']; echo "</td>";
                      echo "<td>"; echo$rows['CODIGO_DPTO_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_DPTO_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['MUNICIPIO_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['COD_CLASIFICACION']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_CLASIFICACION']; echo "</td>";
                      echo "<td>"; echo$rows['UNIDAD_FUNCIONAL']; echo "</td>";
                      echo "<td>"; echo$rows['COD_DX']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_DX']; echo "</td>";
                      echo "<td>"; echo$rows['ALTO_COSTO']; echo "</td>";
                      echo "<td>"; echo$rows['CLASE']; echo "</td>";
                      echo "<td>"; echo$rows['TIPO']; echo "</td>";
                      echo "<td>"; echo$rows['COD_PRODUCTO']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_PRODUCTO']; echo "</td>";
                      echo "<td>"; echo$rows['CANTIDAD']; echo "</td>";
                      echo "<td>"; echo$rows['VALOR_UNITARIO']; echo "</td>";
                      echo "<td>"; echo$rows['VALOR_SERVICIO']; echo "</td>";
                      echo "<td>"; echo$rows['COPAGO']; echo "</td>";
                      echo "<td>"; echo$rows['DOC_RESPONSABLE_AUT']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_RESPONSABLE']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADO']; echo "</td>";
                      echo "<td>"; echo$rows['AUTN_AUTORIZACION_MANUAL']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_SOLICITUD']; echo "</td>";
                      echo "<td>"; echo$rows['AÑO']; echo "</td>";
                      echo "<td>"; echo$rows['MES']; echo "</td>";
                      echo "<td>"; echo$rows['NIVEL_COMPLEJIDAD']; echo "</td>";
                      echo "<td>"; echo$rows['ANTICIPO']; echo "</td>";
                      echo "<td>"; echo$rows['ALIADA']; echo "</td>";
                      echo "<td>"; echo$rows['UBICACION_SOLICITUD']; echo "</td>";
                      echo "<td>"; echo$rows['AUTN_SINIESTRO']; echo "</td>";
                      echo "<td>"; echo$rows['AUTC_REGIMEN']; echo "</td>";
                      echo "<td>"; echo$rows['PROC_COPAGO']; echo "</td>";
                      echo "<td>"; echo$rows['AUTN_NIVEL_CONTRIBUTIVO']; echo "</td>";
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
