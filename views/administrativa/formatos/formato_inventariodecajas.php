<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de inventario de cajas " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");



$F_Inicio = $_GET['F_Inicio'];
$F_Final = $_GET['F_Final'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">

    <tr>
    <th>NUMERO_CAJA</th>
    <th>FACT_NUM</th>
    <th>NIT</th>
    <th>IPS</th>
    <th>VALOR</th>
    <th>FECHA_RADICADO</th>
    <th>FACT_COMPLETA</th>
    <th>FECHA_PROCESADO</th>
    <th>ID_RESPONSABLE</th>
    <th>RESPONSABLE</th>
    <th>USUARIO_PROCESA</th>
    <th>ESTADO</th>
    </tr>
    
    <?php

    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_reporte_fechas(:p_vfechaini,:p_vfechafin,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':p_vfechaini',$F_Inicio);
	oci_bind_by_name($consulta,':p_vfechafin',$F_Final);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_pjson_row_out", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";echo $row['NUMERO_CAJA'];echo "</td>";
        echo "<td>";echo $row['FACT_NUM'];echo "</td>";
        echo "<td>";echo $row['NIT'];echo "</td>";
        echo "<td>";echo $row['IPS'];echo "</td>";
        echo "<td>";echo $row['VALOR'];echo "</td>";
        echo "<td>";echo $row['FECHA_RADICADO'];echo "</td>";
        echo "<td>";echo $row['FACT_COMPLETA'];echo "</td>";
        echo "<td>";echo $row['FECHA_PROCESA'];echo "</td>";
        echo "<td>";echo $row['ID_RESPONSABLE'];echo "</td>";
        echo "<td>";echo $row['RESPONSABLE'];echo "</td>";
        echo "<td>";echo $row['USUARIO_PROCESA'];echo "</td>";
        echo "<td>";echo $row['ESTADO'];echo "</td>";   
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
