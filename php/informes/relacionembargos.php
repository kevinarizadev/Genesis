<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Relacion_Embargos"."_".date("dmY").".xls");
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
 $consulta = oci_parse($c," SELECT to_char(n.nomf_fecha, 'yyyy')año, to_char(n.nomf_fecha, 'MM') mes, nvl(D.NDDV_TERCERO,0) documento,
      t.terc_nombre funcionario, SUM(d.nddv_valor) valor, D.NDDN_NOVEDAD num_novedad, nvl(D.NDDV_ENTIDAD,0)entidad, te.terc_nombre nombre
FROM nnom_nomina n inner join nndd_nomina_detalle_detalle d on  n.nomn_empresa = d.nddn_empresa
                                                            and n.nomc_documento = d.nddc_documento
                                                            and n.nomn_ubicacion = d.nddn_ubicacion
                                                            and n.nomn_numero = d.nddn_numero
                   inner join BTER_TERCERO T on d.nddv_tercero = t.terv_codigo
                   inner join bter_tercero te on te.terv_codigo = D.NDDV_ENTIDAD
WHERE d.nddc_concepto in ('EM1','ESP', 'ECF', 'EM2', 'EMB', 'EMI', 'EMA')
and n.nomc_estado = 'P'
and TO_NUMBER(to_char(n.nomf_fecha, 'MM')) = :periodo
and to_char(n.nomf_fecha, 'yyyy') = :anno
group by to_char(n.nomf_fecha, 'MM') ,to_char(n.nomf_fecha, 'yyyy'), D.NDDV_TERCERO, t.terc_nombre,
         D.NDDN_NOVEDAD, D.NDDV_ENTIDAD, te.terc_nombre
order by t.terc_nombre"
				);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);


?>

<h1>Relacion de Embargos </h1>
<h3>Periodo: <?php echo $annos?>-<?php echo $periodo?>  </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
      <tr>

            <th> AÑO</th>
            <th> MES</th>
            <th> DOCUMENTO</th>
            <th> FUNCIONARIO</th>
            <th> VALOR</th>
            <th> NUM_NOVEDAD</th>
            <th> ENTIDAD</th>
            <th> NOMBRE</th>

      </tr>

<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

                echo "<td>"; echo$rows['AÑO']; echo "</td>";
                echo "<td>"; echo$rows['MES']; echo "</td>";
                echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
                echo "<td>"; echo$rows['FUNCIONARIO']; echo "</td>";
                echo "<td>"; echo$rows['VALOR']; echo "</td>";
                echo "<td>"; echo$rows['NUM_NOVEDAD']; echo "</td>";
                echo "<td>"; echo$rows['ENTIDAD']; echo "</td>";
                echo "<td>"; echo$rows['NOMBRE']; echo "</td>";

        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
