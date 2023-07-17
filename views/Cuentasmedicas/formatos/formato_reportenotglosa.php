<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Notificacion de Glosa - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NIT</th>
        <th>IPS</th>
        <th>NUMERO DOC.</th>
        <th>DOC. FACTURA</th>
        <th>FACTURA</th>
        <th>FECHA RAD. FACTURA</th>
        <th>FECHA PROCESAMIENTO</th>
        <th>FECHA NOT. GLOSA</th>
        <th>FECHA ENTREGA IPS</th>
        <th>VALOR FACTURA</th>
        <th>VALOR GLOSA</th>
        <th>RESPONSABLE</th>
        <th>NOMBRE RESPONSABLE</th>
        <th>ESTADO</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_reporte_glosas(:v_pfechaini,:v_pfechafin,:v_json_out,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pfechaini', $fecha_i);
    oci_bind_by_name($consulta, ':v_pfechafin', $fecha_f);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['IPS'];
        echo "</td>";
        echo "<td>";
        echo $row['NUMERO_DOCUMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['DOCUMENTO_FACTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['FACTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_RAD_FACTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_PROCESAMIENTO_GLOSA'];
        echo "</td>";
        echo "<td>";
        echo $row['NOTF_FECHA'];
        echo "</td>";
        echo "<td>";
        echo $row['NOTF_FECHA_NOTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR_FACTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR_GLOSA'];
        echo "</td>";
        echo "<td>";
        echo $row['RESPONSABLE'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_RESPONSABLE'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>