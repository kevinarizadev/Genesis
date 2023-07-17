<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_INCAPACIDADES"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
			$fecha_inicio = $_GET['fecha_inicio'];
		$fecha_final = $_GET['fecha_final'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT  n.novn_numero,  to_char(novf_fecha,'YYYY')año, to_char(novf_fecha,'MM')mes, nvl(n.novv_tercero,0) documento_id,
 t.terc_nombre nombres, n.novf_fecha fecha_inicio_incap, n.novf_final fecha_final_incap, nvl(n.novv_cantidad,0)cantidad,  trim(to_char(n.novf_fecha, 'DAY', 'NLS_DATE_LANGUAGE=SPANISH'))dia_semana,
 round((n.novf_fecha-t.terf_nacimiento)/365,0)edad_actual, ar.arec_nombre unidad, u.ubgc_nombre seccional, cr.carc_nombre cargo,  trim(d.diac_codigo) diagnostico,
 trim(d.diac_nombre) nombre_dx, '' causa
FROM nnov_novedad n inner join bter_tercero t on t.terv_codigo = n.novv_tercero
                    inner join bcar_cargo cr on cr.carn_codigo = t.tern_cargo
                    inner join bubg_ubicacion_geografica u on u.ubgn_codigo = t.tern_ubicacion_laboral
                    inner join bare_area ar on ar.aren_codigo = cr.carn_unidad_funcional
                    left join edia_diagnostico d on d.diac_codigo = n.novc_diagnostico
WHERE n.novc_concepto in ('IGE','INC')
AND n.novf_fecha between :fecha_inicio AND :fecha_final
order by n.novf_fecha asc"
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);

?>

<h1>Reporte Incapacidades registradas en Oasis </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

  <th>NOVN_NUMERO</th>
  <th> AÑO</th>
  <th> MES</th>
  <th> DOCUMENTO_ID</th>
  <th> NOMBRES</th>
  <th> FECHA_INICIO_INCAP</th>
  <th> FECHA_FINAL_INCAP</th>
  <th> CANTIDAD</th>
  <th> DIA_SEMANA</th>
  <th> EDAD_ACTUAL</th>
  <th> UNIDAD</th>
  <th> SECCIONAL</th>
  <th> CARGO</th>
  <th> DIAGNOSTICO</th>
  <th> NOMBRE_DX</th>
  <th> CAUSA</th>


</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

          echo "<td>"; echo$rows['NOVN_NUMERO']; echo "</td>";
          echo "<td>"; echo$rows['AÑO']; echo "</td>";
          echo "<td>"; echo$rows['MES']; echo "</td>";
          echo "<td>"; echo$rows['DOCUMENTO_ID']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRES']; echo "</td>";
          echo "<td>"; echo$rows['FECHA_INICIO_INCAP']; echo "</td>";
          echo "<td>"; echo$rows['FECHA_FINAL_INCAP']; echo "</td>";
          echo "<td>"; echo$rows['CANTIDAD']; echo "</td>";
          echo "<td>"; echo$rows['DIA_SEMANA']; echo "</td>";
          echo "<td>"; echo$rows['EDAD_ACTUAL']; echo "</td>";
          echo "<td>"; echo$rows['UNIDAD']; echo "</td>";
          echo "<td>"; echo$rows['SECCIONAL']; echo "</td>";
          echo "<td>"; echo$rows['CARGO']; echo "</td>";
          echo "<td>"; echo$rows['DIAGNOSTICO']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_DX']; echo "</td>";
          echo "<td>"; echo$rows['CAUSA']; echo "</td>";




        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
