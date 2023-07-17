<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_AUSENTISMO"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
//header("Content-Type: text/plain");
//header('Content-Disposition: attachment; filename="REPORTE_AUSENTISMO.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
			$fecha_inicio = $_GET['fecha_inicio'];
		$fecha_final = $_GET['fecha_final'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT  to_date(c.casf_fecha,'dd/mm/yyyy')fecha, to_char(c.casf_fecha,'yyyy')año, to_char(c.casf_fecha,'mm')mes, t.terv_codigo documento, t.terc_nombre nombre,
       to_date(c.casf_entrega) fecha_inicio,TO_CHAR(c.cash_entrega,'HH24:MI')hora_inicio, c.casf_cierre, TO_CHAR(c.cash_cierre,'HH24:MI')hora_final,
       to_char(c.casf_entrega, 'DAY', 'NLS_DATE_LANGUAGE=SPANISH')dia_semana, round((c.casf_fecha-t.terf_nacimiento)/365,0)edad,
       replace(replace(ar.arec_nombre,chr(10),''),chr(13),'') unidad, u.ubgc_nombre, cr.carc_nombre, ''ENF_GENERAL, ''ENF_VIRALES,'' ENF_GASTRO, ''CIRUGÍA_AT,''LIC_MATER_PATERN, t.terv_sueldo,
       mt.motc_nombre, c.casc_status
FROM acas_caso c INNER JOIN bter_tercero t on t.terv_codigo = c.casv_tercero
                 INNER JOIN bcon_concepto cp on cp.conc_documento = c.casc_documento and cp.conc_codigo = c.casc_concepto
                 INNER JOIN bmot_motivo mt on mt.motc_concepto = c.casc_concepto and mt.motn_codigo = c.casn_motivo
                 INNER JOIN bcar_cargo cr on cr.carn_codigo = t.tern_cargo
                 INNER JOIN bare_area ar on ar.aren_codigo = cr.carn_unidad_funcional
                 INNER JOIN bubg_ubicacion_geografica u on u.ubgn_codigo = t.tern_ubicacion_laboral
WHERE c.casc_concepto = 'TH'
AND c.casf_fecha between :fecha_inicio AND :fecha_final
AND c.casc_status <> 'R'
ORDER BY 1 ASC "
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);

?>

<h1>Reporte de Permisos solicitados por Genesis WEB</h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
	<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas -->
<tr>

			<th>  FECHA</th>
			<th> AÑO</th>
			<th> MES</th>
			<th> DOCUMENTO</th>
			<th> NOMBRE</th>
			<th> FECHA_INICIO</th>
			<th> HORA_INICIO</th>
			<th> CASF_CIERRE</th>
			<th> HORA_FINAL</th>
			<th> DIA_SEMANA</th>
			<th> EDAD</th>
			<th> UNIDAD</th>
			<th> UBGC_NOMBRE</th>
			<th> CARC_NOMBRE</th>
			<th> ENF_GENERAL</th>
			<th> ENF_VIRALES</th>
			<th> ENF_GASTRO</th>
			<th> CIRUGÍA_AT</th>
			<th> LIC_MATER_PATERN</th>
			<th> TERV_SUELDO</th>
			<th> MOTC_NOMBRE</th>
			<th> CASC_STATUS</th>
</tr>

<?php

oci_execute($consulta);
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo "<tr>";
					echo "<td>"; echo$rows['FECHA']; echo "</td>";
					echo "<td>"; echo$rows['AÑO']; echo "</td>";
					echo "<td>"; echo$rows['MES']; echo "</td>";
					echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
					echo "<td>"; echo$rows['NOMBRE']; echo "</td>";
					echo "<td>"; echo$rows['FECHA_INICIO']; echo "</td>";
					echo "<td>"; echo$rows['HORA_INICIO']; echo "</td>";
					echo "<td>"; echo$rows['CASF_CIERRE']; echo "</td>";
					echo "<td>"; echo$rows['HORA_FINAL']; echo "</td>";
					echo "<td>"; echo$rows['DIA_SEMANA']; echo "</td>";
					echo "<td>"; echo$rows['EDAD']; echo "</td>";
					echo "<td>"; echo$rows['UNIDAD']; echo "</td>";
					echo "<td>"; echo$rows['UBGC_NOMBRE']; echo "</td>";
					echo "<td>"; echo$rows['CARC_NOMBRE']; echo "</td>";
					echo "<td>"; echo$rows['ENF_GENERAL']; echo "</td>";
					echo "<td>"; echo$rows['ENF_VIRALES']; echo "</td>";
					echo "<td>"; echo$rows['ENF_GASTRO']; echo "</td>";
					echo "<td>"; echo$rows['CIRUGÍA_AT']; echo "</td>";
					echo "<td>"; echo$rows['LIC_MATER_PATERN']; echo "</td>";
					echo "<td>"; echo$rows['TERV_SUELDO']; echo "</td>";
					echo "<td>"; echo$rows['MOTC_NOMBRE']; echo "</td>";
					echo "<td>"; echo$rows['CASC_STATUS']; echo "</td>";

	echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
