<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_MESADIGITURNO"."_".date("d-m-Y").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$mes = $_GET['periodo'];
$anio = $_GET['anno'];


$consulta = oci_parse($c, "SELECT u2.ubgc_nombre seccional,
u.ubgc_nombre oficina,
a.casn_numero numero_ticket,
a.casf_fecha fecha_inicio,
a.cast_diagnostico descripcion,
a.casf_cierre fecha_cierre,
a.casc_estado estado

FROM ACAS_CASO A
left join bubg_ubicacion_geografica u on u.ubgn_codigo = a.casn_ubicacion
left join bubg_ubicacion_geografica u2 on u2.ubgn_codigo = u.ubgn_pais*1000

WHERE A.CASC_DOCUMENTO = 'RE'
AND A.CASC_CONCEPTO = 'ST'
AND A.CASN_MOTIVO = 12
and to_char(a.casf_fecha,'yyyy') = :anno
and to_char(a.casf_fecha,'mm')= :mes
");
// and to_char(a.casf_fecha,'yyyy') = '2021'
// and to_char(a.casf_fecha,'mm')= '11'
oci_bind_by_name($consulta,':anno',$anio);
oci_bind_by_name($consulta,':mes',$mes);

?>

<h1>Reporte Mesas de ayuda por concepto de Digiturno registradas en Genesis </h1>
<h3>Parametros Del Reporte: DIA <?php echo $mes ?> DE <?php echo $anio ?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

  <th> SECCIONAL</th>
  <th> OFICINA</th>
  <th> NUMERO_TICKET</th>
  <th> FECHA_INICIO</th>
  <th> FECHA_CIERRE</th>
  <th> ESTADO</th>
  <th> DESCRIPCION</th>

</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";
          echo "<td>"; echo$rows['SECCIONAL']; echo "</td>";
          echo "<td>"; echo$rows['OFICINA']; echo "</td>";
          echo "<td>"; echo$rows['NUMERO_TICKET']; echo "</td>";
          echo "<td>"; echo$rows['FECHA_INICIO']; echo "</td>";
          echo "<td>"; echo$rows['FECHA_CIERRE']; echo "</td>";
          echo "<td>"; echo$rows['ESTADO'] == 'P' ? 'PROCESADO' : 'ACTIVO'; echo "</td>";
          echo "<td>"; echo$rows['DESCRIPCION']; echo "</td>";
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
