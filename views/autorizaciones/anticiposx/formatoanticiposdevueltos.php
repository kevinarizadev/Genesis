<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Anticipos Devueltos - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];
$seccional = $_GET['seccional'] . '%';

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>No</th>
        <th>REGIONAL</th>
        <th>FECHA_CREACION</th>
        <th>RESPONSABLE</th>
        <th>FECHA_DEVOLUCION</th>
        <th>COMENTARIO</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_REGISTROS_DEVUELTOS(:V_FECHA_I,:V_FECHA_F,:V_SECCIONAL,:V_RESULT); end;');
    oci_bind_by_name($consulta, ':V_FECHA_I', $fecha_i);
    oci_bind_by_name($consulta, ':V_FECHA_F', $fecha_f);
    oci_bind_by_name($consulta, ':V_SECCIONAL', $seccional);
    $curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['NUMERO'];
        echo "</td>";
        echo "<td>";
        echo $row['REGIONAL'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_CREACION'];
        echo "</td>";
        echo "<td>";
        echo $row['RESPONSABLE'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_DEVOLUCION'];
        echo "</td>";
        echo "<td>";
        echo $row['COMENTARIO'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
