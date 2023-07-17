<?php
require('../../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte PQR " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$pqr = $_GET['pqr'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>NUMERO PQR</th>
    <th>ESTADO</th>
    <th>MARCACION PENDIENTE GESTION</th>
    <th>FECHA MARCACION</th>
    <th>OBSERVACION MARCACION</th>
    <th>RESPONSABLE MARCACION</th>

  </tr>

  <?php

  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_MARCACION_REGISTRO_PQRS(:V_PQR,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':V_PQR', $pqr);
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
    echo $row['ESTADO'];
    echo "</td>";
    echo "<td>";
    echo $row['MARCACION_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_MOVIMIENTO'];
    echo "</td>";
    echo "<td>";
    echo $row['OBSERVACION'];
    echo "</td>";
    echo "<td>";
    echo $row['MARCACION_GESTION_RESPONSABLE'];
    echo "</td>";
    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
