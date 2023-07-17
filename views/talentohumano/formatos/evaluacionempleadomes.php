<?php
require_once('../../../php/config/dbcon_prod.php');
$Mes = $_GET['Mes'];
header('Content-type: application/vnd.ms-excel;');
//header('Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;');
header("Content-Disposition: attachment; filename=Evaluacion Empleado Mes ".$Mes. ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$MesAno = $_GET['MesAno'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>OFICINA</th>
        <th>AREA</th>
        <th>JEFE INMEDIATO</th>
        <th>TRABAJADOR</th>
        <th>CALIFICACION FINAL</th>
        <th>1.1 PLANIFICACION</th>
        <th>1.2 ASISTENCIA Y PUNTUALIDAD</th>
        <th>1. CONSIDERACIONES</th>
        <th>2.1 DOTACION</th>
        <th>2. CONSIDERACIONES</th>
        <th>3.1 RESPONSABILIDAD</th>
        <th>3.2 COMPROMISO</th>
        <th>3. CONSIDERACIONES</th>
        <th>4.1 COOPERACION</th>
        <th>4.2 LIDERAZGO</th>
        <th>4. CONSIDERACIONES</th>
        <th>FECHA DE LA ENCUESTA</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ENCUESTA.p_obtener_registros(:v_pmes,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pmes', $MesAno);
    $curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
    oci_execute($curs);
    
    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['OFICINA'];
        echo "</td>";
        echo "<td>";
        echo $row['AREA'];
        echo "</td>";
        echo "<td>";
        echo $row['JEFE'];
        echo "</td>";
        echo "<td>";
        echo $row['FUNCIONARIO'];
        echo "</td>";
        echo "<td>";
        echo ($row['PRE_1']+$row['PRE_2']+$row['PRE_3']+$row['PRE_4']+$row['PRE_5']+$row['PRE_6']+$row['PRE_7']);
        echo "</td>";
        echo "<td>";
        echo $row['PRE_1'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_2'];
        echo "</td>";
        echo "<td>";
        echo $row['OBS_1'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_3'];
        echo "</td>";
        echo "<td>";
        echo $row['OBS_2'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_4'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_5'];
        echo "</td>";
        echo "<td>";
        echo $row['OBS_3'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_6'];
        echo "</td>";
        echo "<td>";
        echo $row['PRE_7'];
        echo "</td>";
        echo "<td>";
        echo $row['OBS_4'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_ENCUESTA'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>