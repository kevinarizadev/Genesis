<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Registro Urgencia - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$nit = $_GET['nit'];
$fecha_inicio = $_GET['fechainicio'];
$fecha_fin = $_GET['fechafin'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NIT</th>
        <th>IPS</th>
        <th>CODIGO</th>
        <th>TIPO_DOCUMENTO</th>
        <th>DOCUMENTO_AFILIADO</th>
        <th>NOMBRE_AFILIADO</th>
        <th>FECHA_INGRESO</th>
        <th>URGF_FECHA_SOLICITUD</th>
        <th>FECHA_APROBACION</th>
        <th>ESTADO</th>
        <th>DX_PPAL</th>
        <th>NOMBRE_DX_PPAL</th>
        <th>DX_SEC</th>
        <th>NOMBRE_DX_SEC</th>
        <th>RED</th>
        <th>RESPONSABLE_AUD</th>
        <th>MOTIVO_RECHAZO</th>
        <th>URVC_NEGACION</th>
        <th>URGT_OBSERVACIONES</th>
        <th>PROCESO</th>
    </tr>
    <?php

$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CD.p_obtener_reporte_urgencia_2(:v_pnit,:v_pfecha_inicial,:v_pfecha_final,:v_response); end;');
oci_bind_by_name($consulta, ':v_pnit',$nit);
oci_bind_by_name($consulta, ':v_pfecha_inicial',$fecha_inicio);
oci_bind_by_name($consulta, ':v_pfecha_final',$fecha_fin);
$cursor = oci_new_cursor($c);
oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);
$datos = [];
oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
oci_free_statement($consulta);
oci_free_statement($cursor);
    
foreach  ($datos as $row) { 
        echo "<tr>";        
        echo "<td>";
        echo $row['NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['IPS'];
        echo "</td>";
        echo "<td>";
        echo $row['CODIGO'];
        echo "</td>";
        echo "<td>";
        echo $row['TIPO_DOCUMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['DOCUMENTO_AFILIADO'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_AFILIADO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_INGRESO'];
        echo "</td>";
        echo "<td>";
        echo $row['URGF_FECHA_SOLICITUD'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_APROBACION'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "<td>";
        echo $row['DX_PPAL'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_DX_PPAL'];
        echo "</td>";
        echo "<td>";
        echo $row['DX_SEC'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_DX_SEC'];
        echo "</td>";
        echo "<td>";
        echo $row['RED'];
        echo "</td>";
        echo "<td>";
        echo $row['RESPONSABLE_AUD'];
        echo "</td>";
        echo "<td>";
        echo $row['MOTIVO_RECHAZO'];
        echo "</td>";
        echo "<td>";
        echo $row['URVC_NEGACION'];
        echo "</td>";
        echo "<td>";
        echo $row['URGT_OBSERVACIONES'];
        echo "</td>";
        echo "<td>";
        echo $row['PROCESO'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>