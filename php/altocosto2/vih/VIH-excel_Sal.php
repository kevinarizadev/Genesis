<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_VIH_SALUD_PUBLICA"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");



$fecha = $_GET['fecha'];
$tipo = $_GET['tipo'];
$dpto = $_GET['dpto'];
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,
 "SELECT g.v1,
  g.v2,
  g.v3,
  g.v4,
  g.v5,
  g.v6,
  g.v7,
  g.v8,
  g.v9,
  g.v10,
  g.v11,
  g.v12,
  g.v13,
  g.v14,
  g.v15,
  g.v16,
  g.v17,
  g.v18,
  g.v19,
  g.v20,
  g.v21,
  g.v22,
  g.v23,
  g.v25,
  g.v251,
  g.v252,
  g.v26,
  g.v27,
  g.v28,
  g.v281,
  g.v29,
  g.v291,
  g.v30,
  g.v301,
  g.v31,
  g.v32,
  g.v33,
  g.v97,
  g.v971,
  g.v973,
  g.v974,
  g.v98,
  g.v99,
  g.responsable,
  b.terc_nombre,
  Bc.Ubgc_Nombre
  FROM eres_resolucion_vih g 
  inner join bter_tercero b on b.terv_codigo = g.responsable
  inner join BUBG_UBICACION_GEOGRAFICA uc
  on (b.tern_ubicacion_geografica = uc.UBGN_CODIGO)
  inner join BUBG_UBICACION_GEOGRAFICA Bc
  on (to_char(uc.UBGN_PAIS) || '000' = Bc.UBGN_CODIGO)
  WHERE g.clase_arc = :tipo
  AND to_date(g.fecha_registro) <= to_date(:fecha) 
  AND g.ultima_actualizacion = (select max(k.ultima_actualizacion) from eres_resolucion_vih k where k.ultima_actualizacion is not null and k.v4 =  g.v4 )
  AND Bc.Ubgc_Nombre like :dpto||'%'");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':tipo',$tipo);
oci_bind_by_name($consulta,':fecha',$fecha);
oci_bind_by_name($consulta,':dpto',$dpto);

?>

<h1>Reporte VIH <?php echo $dpto?></h1>
<h3>Parametros Del Reporte: Fecha consultada: <?php echo $fecha?> - Area: Salud publica</h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>
  
  <th> V1</th>
  <th> V2</th>
  <th> V3</th>
  <th> V4</th>
  <th> V5</th>
  <th> V6</th>
  <th> V7</th>
  <th> V8</th>
  <th> V9</th>
  <th> V10</th>

  <th> V11</th>
  <th> V12</th>
  <th> V13</th>
  <th> V14</th>
  <th> V15</th>
  <th> V16</th>
  <th> V17</th>
  <th> V18</th>
  <th> V19</th>
  <th> V20</th>

  <th> V21</th>
  <th> V22</th>
  <th> V23</th>
  <th> V25</th>
  <th> V251</th>
  <th> V252</th>
  <th> V26</th>
  <th> V27</th>
  <th> V28</th>
  <th> V281</th>
  <th> V29</th>
  <th> V291</th>

  <th> V30</th>
  <th> V301</th>
  <th> V31</th>
  <th> V32</th>
  <th> V33</th>
  <th> V97</th>
  <th> V971</th>
  <th> V973</th>
  <th> V974</th>
  <th> V98</th>
  <th> V99</th>
  <th> CEDULA DE FUNCIONARIO</th>
  <th> FUNCIONARIO</th>
  <th> UBICACION</th>
  
</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";
          
          echo "<td>"; echo$rows['V1']; echo "</td>";
          echo "<td>"; echo$rows['V2']; echo "</td>";
          echo "<td>"; echo$rows['V3']; echo "</td>";
          echo "<td>"; echo$rows['V4']; echo "</td>";
          echo "<td>"; echo$rows['V5']; echo "</td>";
          echo "<td>"; echo$rows['V6']; echo "</td>";
          echo "<td>"; echo$rows['V7']; echo "</td>";
          echo "<td>"; echo$rows['V8']; echo "</td>";
          echo "<td>"; echo$rows['V9']; echo "</td>";
          echo "<td>"; echo$rows['V10']; echo "</td>";
          echo "<td>"; echo$rows['V11']; echo "</td>";
          echo "<td>"; echo$rows['V12']; echo "</td>";
          echo "<td>"; echo$rows['V13']; echo "</td>";
          echo "<td>"; echo$rows['V14']; echo "</td>";
          echo "<td>"; echo$rows['V15']; echo "</td>";
          echo "<td>"; echo$rows['V16']; echo "</td>";
          echo "<td>"; echo$rows['V17']; echo "</td>";
          echo "<td>"; echo$rows['V18']; echo "</td>";
          echo "<td>"; echo$rows['V19']; echo "</td>";
          echo "<td>"; echo$rows['V20']; echo "</td>";
          echo "<td>"; echo$rows['V21']; echo "</td>";
          echo "<td>"; echo$rows['V22']; echo "</td>";
          echo "<td>"; echo$rows['V23']; echo "</td>";
          echo "<td>"; echo$rows['V25']; echo "</td>";
          echo "<td>"; echo$rows['V251']; echo "</td>";
          echo "<td>"; echo$rows['V252']; echo "</td>";
          echo "<td>"; echo$rows['V26']; echo "</td>";
          echo "<td>"; echo$rows['V27']; echo "</td>";
          echo "<td>"; echo$rows['V28']; echo "</td>";
          echo "<td>"; echo$rows['V281']; echo "</td>";
          echo "<td>"; echo$rows['V29']; echo "</td>";
          echo "<td>"; echo$rows['V291']; echo "</td>";
          echo "<td>"; echo$rows['V30']; echo "</td>";
          echo "<td>"; echo$rows['V301']; echo "</td>";
          echo "<td>"; echo$rows['V31']; echo "</td>";
          echo "<td>"; echo$rows['V32']; echo "</td>";
          echo "<td>"; echo$rows['V33']; echo "</td>";
          echo "<td>"; echo$rows['V97']; echo "</td>";
          echo "<td>"; echo$rows['V971']; echo "</td>";
          echo "<td>"; echo$rows['V973']; echo "</td>";
          echo "<td>"; echo$rows['V974']; echo "</td>";
          echo "<td>"; echo$rows['V98']; echo "</td>";
          echo "<td>"; echo$rows['V99']; echo "</td>";
          echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
          echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
          echo "<td>"; echo$rows['UBGC_NOMBRE']; echo "</td>";

          
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>

