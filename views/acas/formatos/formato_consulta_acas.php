<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Acas - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$data = $_GET['data'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NUMERO</th>
        <th>ASUNTO</th>
        <th>FECHA RADICACION</th>
        <th>FECHA CIERRE</th>
        <th>UBICACION</th>
        <th>REMITENTE</th>
        <th>RESPONSABLE</th>
        <th>DIAS</th>
        <th>ESTADO</th>
        <th>PRIORIDAD</th>
        <th>DESCRIPCION</th>
        <th>DESCRIPCION CIERRE</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_OBTENER_ACAS_2(:v_pjson_row_in,:v_pjson_row_out); end;');
    oci_bind_by_name($consulta, ':v_pjson_row_in', $data);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);

    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";
        echo $row->NUMERO;
        echo "</td>";
        echo "<td>";
        echo $row->ASUNTO;
        echo "</td>";
        echo "<td>";
        echo $row->FECHA_APERTURA;
        echo "</td>";
        echo "<td>";
        echo $row->FECHA_CIERRE;
        echo "</td>";
        echo "<td>";
        echo $row->UBICACION;
        echo "</td>";
        echo "<td>";
        echo $row->NOMBRE_REMITENTE;
        echo "</td>";
        echo "<td>";
        echo $row->RESPONSABLE;
        echo "</td>";
        echo "<td>";
        echo $row->DIAS;
        echo "</td>";
        echo "<td>";
        echo $row->ESTADO;
        echo "</td>";
        echo "<td>";
        echo $row->PRIORIDAD;
        echo "</td>";
        echo "<td>";
        echo $row->DESCRIPCION;
        echo "</td>";        
        echo "<td>";
        echo $row->DESCRIPCION_CIERRE;
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>