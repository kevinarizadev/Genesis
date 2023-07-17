<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Novedades" . "_" . date("dmY") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$periodo = $_GET['periodo'];
$consulta = oci_parse($c,"SELECT    n.novc_documento||'-'||n.novn_numero||'-'||n.novn_ubicacion novedad,
                                    n.novv_tercero documento,
                                    b.terc_nombre nombre,
                                    n.novc_concepto concepto,
                                    c.conc_nombre nombre_concepto,
                                    n.novf_fecha fecha,
                                    n.novv_cantidad cantidad,
                                    n.novv_valor valor,
                                    n.novn_duracion duracion,
                                    n.novn_periodos periodo,
                                    n.novn_periodos_pago periodos_pago,
                                    n.novv_saldo saldo,
                                    n.novt_observacion observacion,
                                    n.novc_tipo_incapacidad tipo_incapacidad,
                                    n.novc_prorroga_incapacidad prorroga_incapacidad,
                                    n.novv_nueva_entidad nueva_entidad,
                                    n.novf_final final,
                                    n.novv_nuevo_salario nuevo_salario,
                                    n.novv_total total,
                                    n.novv_responsable responsable,
                                    b1.terc_nombre nombre_responsable,
                                    b.terv_sueldo salario,
                                    ne.empc_nombre tipo_empleador
                                    FROM nnov_novedad n
                                    INNER JOIN bter_tercero b   ON   (b.terv_codigo = n.novv_tercero)
                                    INNER JOIN bter_tercero b1  ON   (b1.terv_codigo = n.novv_responsable)
                                    INNER JOIN ncon_concepto c  ON   (n.novc_concepto = c.conc_codigo)
                                    LEFT JOIN nemp_empleadores ne ON (b.tern_empleador = ne.empn_codigo)
                                    WHERE   to_char(n.novf_fecha,'MM/YYYY') = :periodo AND
                                            n.novc_estado = 'P' AND n.novn_ubicacion = '1'");
oci_bind_by_name($consulta, ':periodo', $periodo);

?>

<h1>Reporte Novedades </h1>
<h3>Parametros Del Reporte: Perido <?php echo $periodo ?></h3>

<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>

        <th>NOVEDAD</th>
        <th>DOCUMENTO</th>
        <th>NOMBRE</th>
        <th>CONCEPTO</th>
        <th>NOMBRE_CONCEPTO</th>
        <th>FECHA INICIAL</th>
        <th>FECHA FINAL</th>
        <th>CANTIDAD</th>
        <!-- <th>VALOR</th>
        <th>DURACION</th>
        <th>PERIODO</th>
        <th>PERIODOS_PAGO</th>
        <th>SALDO</th> -->
        <th>OBSERVACION</th>
        <th>TIPO_INCAPACIDAD</th>
        <th>PRORROGA_INCAPACIDAD</th>
        <th>NUEVA_ENTIDAD</th>        
        <th>NUEVO_SALARIO</th>
        <!-- <th>TOTAL</th>
        <th>RESPONSABLE</th>
        <th>NOMBRE_RESPONSABLE</th> -->
        <th>SALARIO</th>
        <th>TIPO_EMPLEADOR</th>
    </tr>



    <?php

    oci_execute($consulta);
    while ($rows = oci_fetch_assoc($consulta)) {
        echo "<tr>"; 
            echo "<td>"; echo $rows['NOVEDAD']; echo "</td>";
            echo "<td>"; echo $rows['DOCUMENTO']; echo "</td>";
            echo "<td>"; echo $rows['NOMBRE']; echo "</td>";
            echo "<td>"; echo $rows['CONCEPTO']; echo "</td>";
            echo "<td>"; echo $rows['NOMBRE_CONCEPTO']; echo "</td>";
            echo "<td>"; echo $rows['FECHA']; echo "</td>";
            echo "<td>"; echo $rows['FINAL']; echo "</td>";
            echo "<td>"; echo $rows['CANTIDAD']; echo "</td>";
            // echo "<td>"; echo $rows['VALOR']; echo "</td>";
            // echo "<td>"; echo $rows['DURACION']; echo "</td>";
            // echo "<td>"; echo $rows['PERIODO']; echo "</td>";
            // echo "<td>"; echo $rows['PERIODOS_PAGO']; echo "</td>";
            // echo "<td>"; echo $rows['SALDO']; echo "</td>";
            echo "<td>"; echo $rows['OBSERVACION']; echo "</td>";
            echo "<td>"; echo $rows['TIPO_INCAPACIDAD']; echo "</td>";
            echo "<td>"; echo $rows['PRORROGA_INCAPACIDAD']; echo "</td>";
            echo "<td>"; echo $rows['NUEVA_ENTIDAD']; echo "</td>";
            
            echo "<td>"; echo $rows['NUEVO_SALARIO']; echo "</td>";
            // echo "<td>"; echo $rows['TOTAL']; echo "</td>";
            // echo "<td>"; echo $rows['RESPONSABLE']; echo "</td>";
            // echo "<td>"; echo $rows['NOMBRE_RESPONSABLE'];echo "</td>";
            echo "<td>"; echo $rows['SALARIO']; echo "</td>";
            echo "<td>"; echo $rows['TIPO_EMPLEADOR']; echo "</td>";
        echo "</tr>";
    }

    oci_close($c);

    ?>