<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Relacion_libranzas"."_".date("dmY").".xls");
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
 $consulta = oci_parse($c,"SELECT to_char(n.nomf_fecha, 'MM') mes,to_char(n.nomf_fecha, 'yyyy')año, TE.TERC_NOMBRE  ENTIDAD, D.NDDV_TERCERO, t.terc_nombre, d.nddc_concepto,
 sum(d.nddv_valor) valor
FROM nnom_nomina n inner join nndd_nomina_detalle_detalle d on n.nomn_empresa = d.nddn_empresa  and
                             n.nomc_documento = d.nddc_documento and
                             n.nomn_ubicacion = d.nddn_ubicacion and
                             n.nomn_numero = d.nddn_numero
                             inner join nnov_novedad nv on nv.novn_numero = d.nddn_novedad
inner join BTER_TERCERO T on d.nddv_tercero = t.terv_codigo
inner join BTER_TERCERO TE on tE.terv_codigo = nv.novv_entidad
WHERE d.nddc_concepto IN ('LIB','DVI')
AND n.nomc_estado = 'P'
AND to_number(to_char(n.nomf_fecha, 'MM')) = :periodo
AND to_char(n.nomf_fecha, 'yyyy') = :anno
AND n.NOMC_DOCUMENTO <> 'NE'
GROUP BY to_char(n.nomf_fecha, 'MM') ,to_char(n.nomf_fecha, 'yyyy'), TE.TERC_NOMBRE, D.NDDV_TERCERO, t.terc_nombre, d.nddc_concepto"
				);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);


?>

<h1>Listado Libranzas </h1>
<h3>Periodo: <?php echo $annos?>-<?php echo $periodo?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

  <th>ENTIDAD</th>
  <th>MES</th>
  <th> AÑO</th>
  <th> NDDV_TERCERO</th>
  <th> TERC_NOMBRE</th>
  <th> NDDC_CONCEPTO</th>
  <th> VALOR</th>

</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

          echo "<td>"; echo$rows['ENTIDAD']; echo "</td>";
          echo "<td>"; echo$rows['MES']; echo "</td>";
          echo "<td>"; echo$rows['AÑO']; echo "</td>";
          echo "<td>"; echo$rows['NDDV_TERCERO']; echo "</td>";
          echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
          echo "<td>"; echo$rows['NDDC_CONCEPTO']; echo "</td>";
          echo "<td>"; echo$rows['VALOR']; echo "</td>";






        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
