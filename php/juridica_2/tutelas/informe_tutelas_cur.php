<?php
require_once('../../config/dbcon.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Informe_Incidentes"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>CODIGO</th>
        <th>RADICACION</th>
        <th>UBICACION</th>
        <th>TIPO DOCUMENTO AFILIADO</th>
        <th>DOCUMENTO AFILIADO</th>
        <th>NOMBRE AFILIADO</th>
        <th>ACCIONANTE</th>
        <th>NOMBRE ACCIONANTE</th>
        <th>JUZGADO</th>
        <th>CAUSA</th>
        <th>MOTIVO</th>
        <th>NOMBRE ETAPA</th>
        <th>FECHA REGISTRO</th>
        <th>FECHA RECEPCION</th>
        <th>RESPONSABLE</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'BEGIN pq_genesis_tut.V_TUTELAS_INFORME_INCIDENTE(:v_response); end;');
    $curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
    oci_execute($curs);
    
    while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>"; echo$rows['CODIGO']; echo "</td>";
        echo "<td>"; echo$rows['RADICACION']; echo "</td>";
        echo "<td>"; echo$rows['MUNICIPIO']; echo "</td>";
        echo "<td>"; echo$rows['TIPODOCUMENTOAFILIADO']; echo "</td>";
        echo "<td>"; echo$rows['DOCUMENTOAFILIADO']; echo "</td>";
        echo "<td>"; echo$rows['NOMBREAFILIADO']; echo "</td>";
        echo "<td>"; echo$rows['ACCIONANTE']; echo "</td>";
        echo "<td>"; echo$rows['NOMBRE_ACCIONANTE']; echo "</td>";
        echo "<td>"; echo$rows['JUZGADO']; echo "</td>";
        echo "<td>"; echo$rows['CAUSA']; echo "</td>";
        echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
        echo "<td>"; echo$rows['NOMBRE_ETAPA']; echo "</td>";
        echo "<td>"; echo$rows['FECHA_REGISTRO']; echo "</td>";
        echo "<td>"; echo$rows['FECHA_ETAPA_INCIDENTE']; echo "</td>";
        echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>