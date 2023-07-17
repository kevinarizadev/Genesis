<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Aseguramiento Acas ". date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>nombre</th>
    <th>documento</th>
    <th>identificacion</th>
    <th>nombre_autoriza</th>
    <th>ubicacion</th>
    <th>numero</th>
    <th>estado</th>
    <th>asunto</th>
    <th>desc_asunto</th>
    <th>fecha_ingreso</th>
    <th>fecha_cierre</th>
    <th>dias</th>
    <th>ciudad</th>
    <th>concepto</th>
    <th>subconcepto</th>
    <th>descripcion</th>
    <th>cantidad</th>
    <th>descripcion cierre</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ASEG2.P_EXPORTAR_ACASXPERSONA(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);

    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";echo $row->nombre;echo "</td>";
        echo "<td>";echo $row->documento;echo "</td>";
        echo "<td>";echo $row->identificacion;echo "</td>";
        echo "<td>";echo $row->nombre_autoriza;echo "</td>";
        echo "<td>";echo $row->ubicacion;echo "</td>";
        echo "<td>";echo $row->numero;echo "</td>";
        echo "<td>";echo $row->estado;echo "</td>";
        echo "<td>";echo $row->asunto;echo "</td>";
        echo "<td>";echo $row->desc_asunto;echo "</td>";
        echo "<td>";echo $row->fecha_ingreso;echo "</td>";
        echo "<td>";echo $row->fecha_cierre;echo "</td>";
        echo "<td>";echo $row->dias;echo "</td>";
        echo "<td>";echo $row->ciudad;echo "</td>";
        echo "<td>";echo $row->concepto;echo "</td>";
        echo "<td>";echo $row->subconcepto;echo "</td>";
        echo "<td>";echo $row->descripcion;echo "</td>";
        echo "<td>";echo $row->cantidad;echo "</td>";
        echo "<td>";echo $row->descripcion_cierre;echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
