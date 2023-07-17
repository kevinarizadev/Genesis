<?php

require_once('../config/dbcon_prod.php');


header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Detalle_Mesa_Ayuda"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

?>

<h1>Detale Mesa de Ayuda</h1>
<h3>Filtrado Por Responsable: <?php echo $_SESSION['cedula'] ?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

  <th>SECCIONAL</th>
  <th>MUNICIPIO</th>
  <th># CASO</th>
  <th>UBIC CASO</th>
  <th>FECHA</th>
  <th>DOC_GENERA</th>
  <th>NOMBRE_GENERA</th>
  <th>DOC_RESPONSABLE</th>
  <th>NOMBRE_RESPONSABLE</th>
  <th>ESTADO</th>
  <th>CONCEPTO</th>
  <th>MOTIVO</th>
  <th>CAST_ASUNTO</th>

</tr>

<?php
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT *
                FROM view_repor_gestion_mesa_ayuda_gn
                where doc_responsable=:cedula");

// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':cedula',$_SESSION['cedula']);

oci_execute($consulta);

// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{

	        echo "<tr>";

          echo "<td>"; echo$rows['SECCIONAL']; echo "</td>";
          echo "<td>"; echo$rows['MUNICIPIO']; echo "</td>";
          echo "<td>"; echo$rows['CASO']; echo "</td>";
          echo "<td>"; echo$rows['UBI_CASO']; echo "</td>";
          echo "<td>"; echo$rows['FECHA']; echo "</td>";
          echo "<td>"; echo$rows['DOC_GENERA']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_GENERA']; echo "</td>";
          echo "<td>"; echo$rows['DOC_RESPONSABLE']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_RESPONSABLE']; echo "</td>";
          echo "<td>"; echo$rows['ESTADO']; echo "</td>";
          echo "<td>"; echo$rows['CONCEPTO']; echo "</td>";
          echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
          echo "<td>"; echo$rows['CAST_ASUNTO']; echo "</td>";

       echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
