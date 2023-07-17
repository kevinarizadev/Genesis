<?php
require_once('../../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Historico Permisos " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$cedula = $_GET['cedula'];

?>


<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NUMERO</th>
        <th>DOC_FUNC</th>
        <th>NOMBRE_FUNC</th>
        <th>TIPO</th>
        <th>F_INICIO</th>
        <th>F_CIERRE</th>
        <th>ESTADO</th>
        <th>PERMISO</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AU.P_OBTENER_HISTORICO(:v_pcedula,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pcedula', $cedula);
    $curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_json_row", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";

        echo "<td>";echo $row['NUMERO'];echo "</td>";
        echo "<td>";echo $row['DOC_FUNC'];echo "</td>";
        echo "<td>";echo $row['NOMBRE_FUNC'];echo "</td>";
        echo "<td>";echo $row['TIPO'];echo "</td>";
        echo "<td>";echo $row['F_INICIO'];echo "</td>";
        echo "<td>";echo $row['F_CIERRE'];echo "</td>";
        echo "<td>";echo $row['ESTADO'];echo "</td>";
        echo "<td>";echo $row['PERMISO'];echo "</td>";

        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
