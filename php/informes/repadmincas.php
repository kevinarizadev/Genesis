<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Solicitudes mesa de Ayuda Administrativo"."_".date("dmY").".xls");
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
 $consulta = oci_parse($c," SELECT CASN_NUMERO NUMERO,MOTC_NOMBRE MOTIVO, TO_CHAR(C.CASF_FECHA,'DD/MM/YYYY') DIA,
                                  CASE WHEN C.CASC_ESTADO = 'P' THEN 'PROCESADO'
                                       WHEN C.CASC_ESTADO = 'A' THEN 'ACTIVO'
                                       WHEN C.CASC_ESTADO = 'X' THEN 'ANULADO' END ESTADO, NVL(C.CASV_TERCERO,0) DOC_FUNCIONARIO,
                                       TERC_NOMBRE NOMBRE, UPPER(C.CAST_DIAGNOSTICO) DESCRIPCION
                            FROM ACAS_CASO C INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = C.CASV_TERCERO
                                             INNER JOIN BMOT_MOTIVO M ON M.MOTC_DOCUMENTO = C.CASC_DOCUMENTO AND
                                                                         M.MOTC_CONCEPTO = C.CASC_CONCEPTO AND
                                                                         M.MOTN_CODIGO = C.CASN_MOTIVO
                            WHERE C.CASC_CONCEPTO = 'EX'
                            AND TO_CHAR(C.CASF_FECHA,'YYYY')  = :anno
                            AND TO_NUMBER(TO_CHAR(C.CASF_FECHA,'MM'))= :periodo");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);


?>

<h1>Reporte Solicitudes Mesa de Ayuda Administrativa </h1>
<h3>Parametros Del Reporte: Anno <?php echo $annos?> Mes <?php echo $periodo?></h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
          <th>NUMERO</th>
          <th>MOTIVO</th>
          <th>DIA</th>
          <th>ESTADO</th>
          <th>DOC_FUNCIONARIO</th>
          <th>NOMBRE</th>
          <th>DESCRIPCION</th>

			</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

                      echo "<td>"; echo$rows['NUMERO']; echo "</td>";
                      echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
                      echo "<td>"; echo$rows['DIA']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADO']; echo "</td>";
                      echo "<td>"; echo$rows['DOC_FUNCIONARIO']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE']; echo "</td>";
                      echo "<td>"; echo$rows['DESCRIPCION']; echo "</td>";

        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
