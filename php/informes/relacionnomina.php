<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Relacion_nomina"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
			$nomina = $_GET['nomina'];
				//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT TO_CHAR(NMDV_TERCERO)NMDV_TERCERO, '1' AS DIGITO,  TERC_NOMBRE, TERN_BANCO,
 																	 TO_CHAR(TERC_CUENTA_BANCO)TERC_CUENTA_BANCO, terc_tipo_cuentabanco, NMDV_TOTAL
															 		FROM NNMD_NOMINA_DETALLE, BTER_TERCERO
																	WHERE NMDV_TERCERO = TERV_CODIGO
																				and nmdn_empresa = 1
																				and nmdn_numero = :nomina
																				and nmdn_ubicacion = 1
																				and nmdc_documento = 'NM'"
				);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':nomina',$nomina);


?>

<h1>Reporte de Nomina </h1>
<h3>Nomina No : <?php echo $nomina?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

	<th> DOCUMENTO</th>
<th> DIGITO</th>
<th> NOMBRE</th>
<th> BANCO</th>
<th> CUENTA_BANCO</th>
<th> TIPO_CUENTA_BANCO</th>
<th> VALOR</th>

</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

					echo "<td>"; echo$rows['NMDV_TERCERO']; echo "</td>";
					echo "<td>"; echo$rows['DIGITO']; echo "</td>";
					echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
					echo "<td>"; echo$rows['TERN_BANCO']; echo "</td>";
					echo "<td>"; echo$rows['TERC_CUENTA_BANCO']; echo "</td>";
					echo "<td>"; echo$rows['TERC_TIPO_CUENTABANCO']; echo "</td>";
					echo "<td>"; echo$rows['NMDV_TOTAL']; echo "</td>";





        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
