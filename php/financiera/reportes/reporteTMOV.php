<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Modulo TMOV"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


$fecha_inicio = $_GET['fecha_inicio'];
$fecha_final = $_GET['fecha_final'];

//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT p.movf_fecha, d.mvdv_tercero, b.terc_nombre, p.movn_numero, p.movn_ubicacion,
 p.movc_documento, p.movc_concepto||'-'||bc.conc_nombre concepto, p.movc_estado, d.mvdv_valor,
 p.movc_factura, p.movv_empleado, b2.terc_nombre nom_empleado, p.movv_tercero,d.mvdc_observacion, d.mvdv_cuenta
from tmov_movimiento p
inner join bcon_concepto bc on (p.movc_documento = bc.conc_documento and
						  p.movc_concepto = bc.conc_codigo)
inner join tmvd_movimiento_detalle d on (p.movn_empresa = d.mvdn_empresa and
								   p.movc_documento = d.mvdc_documento and
								   p.movn_numero = d.mvdn_numero and
								   p.movn_ubicacion = d.mvdn_ubicacion)
inner join bter_tercero b on (b.terv_codigo = d.mvdv_tercero)
inner join bter_tercero b2 on (b2.terv_codigo = p.movv_empleado)
where p.movf_fecha between :fecha_inicio and :fecha_final ");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);

?>

<h1>Reporte Modulo TMOV </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
						<th>FECHA</th>	
						<th>NIT</th>
						<th>RAZON SOCIAL</th>	
						<th>NUMERO</th>
						<th>DANE	</th>
						<th>DOCUMENTO	</th>
						<th>CONCEPTO	</th>
						<th>VALOR	</th>
						<th>NUMERO DE FACTURA	</th>
						<th>CEDULA FUNCIONARIO ELABORO REGISTRO	</th>
						<th>NOMBRE FUNCIONARIO ELABORO REGISTRO	</th>
						<th>OBSERVACION	</th>
						<th>CUENTA CONTABLE</th>
						<th>ESTADO</th>
						
			

			</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	    echo "<tr>";

				echo "<td>"; echo$rows['MOVF_FECHA']; echo "</td>";
				echo "<td>"; echo$rows['MVDV_TERCERO']; echo "</td>";
				echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
				echo "<td>"; echo$rows['MOVN_NUMERO']; echo "</td>";
				echo "<td>"; echo$rows['MOVN_UBICACION']; echo "</td>";
				echo "<td>"; echo$rows['MOVC_DOCUMENTO']; echo "</td>";
				echo "<td>"; echo$rows['CONCEPTO']; echo "</td>";
				echo "<td>"; echo$rows['MVDV_VALOR']; echo "</td>";
				echo "<td>"; echo$rows['MOVC_FACTURA']; echo "</td>";
				echo "<td>"; echo$rows['MOVV_EMPLEADO']; echo "</td>";
				echo "<td>"; echo$rows['NOM_EMPLEADO']; echo "</td>";
				echo "<td>"; echo$rows['MVDC_OBSERVACION']; echo "</td>";
				echo "<td>"; echo$rows['MVDV_CUENTA']; echo "</td>";
				echo "<td>"; echo$rows['MOVC_ESTADO']; echo "</td>";
			
        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
