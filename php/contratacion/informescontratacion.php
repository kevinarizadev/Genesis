<?php
require_once('../config/dbcon_prod.php');
$tipo_servicio_nombre = $_GET['tipo_servicio_nombre'];
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Informe_Contratacion_". $tipo_servicio_nombre . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$tipo_servicio = $_GET['tipo_servicio'];
$departamento = $_GET['dpto'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>DEPARTAMENTO</th>
        <th>MUNICIPIO</th>
        <th>CODIGO DE SERVICIO</th>
        <th>SERVICIO</th>
        <th>MUNICIPIO PRESTADOR</th>
        <th>CODIGO HABILITACION</th>
        <th>NOMBRE IPS</th>
        <th>ORIGEN</th>
        <th>DISTINTIVO</th>
    </tr>
    <?php

    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_INFORME (:V_PTIPO_SERVICIO, :V_PFECHA_INICIO, :V_PFECHA_FIN, :V_PDPTO, :V_PRESULTADO); end;');
    oci_bind_by_name($consulta,':V_PTIPO_SERVICIO',$tipo_servicio);
    oci_bind_by_name($consulta,':V_PFECHA_INICIO',$fecha_inicio);
    oci_bind_by_name($consulta,':V_PFECHA_FIN',$fecha_fin);
    oci_bind_by_name($consulta,':V_PDPTO',$departamento);
	oci_bind_by_name($consulta, ":V_PRESULTADO", $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
    oci_execute($cursor);
    
    while (($row = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";        
        echo "<td>";
        echo $row['DPTO'];
        echo "</td>";
        echo "<td>";
        echo $row['MUNICIPIO'];
        echo "</td>";
        echo "<td>";
        echo $row['CODIGO_SERVICIO'];
        echo "</td>";
        echo "<td>";
        echo $row['SERVICIO'];
        echo "</td>";
        echo "<td>";
        echo $row['MUNICIPIO_PRESTADOR'];
        echo "</td>";
        echo "<td>";
        echo $row['CODIGO_HABILITACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_IPS'];
        echo "</td>";
        echo "<td>";
        echo $row['ORIGEN'];
        echo "</td>";
        echo "<td>";
        echo $row['DISTINTIVO'];
        echo "</td>";
        // echo "<td></td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>