<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Grupos Priorizados " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$F_Inicio = $_GET['F_Inicio'];
$F_Fin = $_GET['F_Fin'];
$Ubicacion = $_GET['Ubicacion'];
$Responsable = $_GET['Responsable'];
?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>RADICADO</th>
    <th>TIPO_DOCUMENTO</th>
    <th>NUM_DOCUMENTO</th>
    <th>NOMBRE_AFILIADO</th>
    <th>ESTADO_AFILIADO</th>
    <th>COD_COHORTE</th>
    <th>NOM_COHORTE</th>
    <th>FUENTE_IDENTIFICACION</th>
    <th>CONSECUTIVO_GESTION</th>
    <th>FECHA_GESTION</th>
    <th>FECHA_PROXIMO_SEGUIMIENTO</th>
    <th>ESTADO_SEGUIMIENTO</th>
    <th>EDUCACION</th>
    <th>OBSERVACION</th>
    <th>NECESIDAD_USUARIO</th>
    <th>GESTACION</th>
    <th>SECCIONAL</th>
    <th>MUNICIPIO</th>
    <th>COD_RESPONSABLE_ACTUAL</th>
    <th>RESPONSABLE_ACTUAL</th>
    <th>ESTADO_GESTION</th>
    <th>ESTADO</th>
    <th>FECHA_ACTIVO</th>
    <th>FECHA_MODIFICACION</th>
    <th>MOTIVO</th>
    <th>COD_DIAGNOSTICO</th>
    <th>NOM_DIAGNOSTICO</th>
    <th>COD_RESPONSABLE_GESTION</th>
    <th>RESPOSANBLE_DE_GESTION</th>
    <th>FECHA_ULT_MESTRUACION</th>
    <th>COD_AUTORIZACION</th>
    </tr>
    
    <?php

    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_GESTIONES_GS(:v_pfecha_inicio,:v_pfecha_fin,:v_pubicacion,:v_presponsable,:v_response); end;');
	oci_bind_by_name($consulta,':v_pfecha_inicio',$F_Inicio);
	oci_bind_by_name($consulta,':v_pfecha_fin',$F_Fin);
	oci_bind_by_name($consulta,':v_pubicacion',$Ubicacion);
	oci_bind_by_name($consulta,':v_presponsable',$Responsable);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";echo $row['RADICADO'];echo "</td>";
        echo "<td>";echo $row['TIPO_DOCUMENTO'];echo "</td>";
        echo "<td>";echo $row['NUM_DOCUMENTO'];echo "</td>";
        echo "<td>";echo $row['NOMBRE_AFILIADO'];echo "</td>";
        echo "<td>";echo $row['ESTADO_AFILIADO'];echo "</td>";
        echo "<td>";echo $row['COD_COHORTE'];echo "</td>";
        echo "<td>";echo $row['NOM_COHORTE'];echo "</td>";
        echo "<td>";echo $row['FUENTE_IDENTIFICACION'];echo "</td>";
        echo "<td>";echo $row['CONSECUTIVO_GESTION'];echo "</td>";
        echo "<td>";echo $row['FECHA_GESTION'];echo "</td>";
        echo "<td>";echo $row['FECHA_PROXIMO_SEGUIMIENTO'];echo "</td>";
        echo "<td>";echo $row['ESTADO_SEGUIMIENTO'];echo "</td>";
        echo "<td>";echo $row['EDUCACION'];echo "</td>";
        echo "<td>";echo $row['OBSERVACION'];echo "</td>";
        echo "<td>";echo $row['NECESIDAD_USUARIO'];echo "</td>";
        echo "<td>";echo $row['GESTACION'];echo "</td>";
        echo "<td>";echo $row['SECCIONAL'];echo "</td>";
        echo "<td>";echo $row['MUNICIPIO'];echo "</td>";
        echo "<td>";echo $row['COD_RESPONSABLE_ACTUAL'];echo "</td>";
        echo "<td>";echo $row['RESPONSABLE_ACTUAL'];echo "</td>";
        echo "<td>";echo $row['ESTADO_GESTION'];echo "</td>";
        echo "<td>";echo $row['ESTADO'];echo "</td>";
        echo "<td>";echo $row['FECHA_ACTIVO'];echo "</td>";
        echo "<td>";echo $row['FECHA_MODIFICACION'];echo "</td>";
        echo "<td>";echo $row['MOTIVO'];echo "</td>";
        echo "<td>";echo $row['COD_DIAGNOSTICO'];echo "</td>";
        echo "<td>";echo $row['NOM_DIAGNOSTICO'];echo "</td>";
        echo "<td>";echo $row['COD_RESPONSABLE_GESTION'];echo "</td>";
        echo "<td>";echo $row['RESPOSANBLE_DE_GESTION'];echo "</td>";
        echo "<td>";echo $row['FECHA_ULT_MESTRUACION'];echo "</td>";
        echo "<td>";echo $row['COD_AUTORIZACION'];echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>