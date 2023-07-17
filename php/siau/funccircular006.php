<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de circular 006" . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$reporte = $_GET['informe'];
?>


<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>SERIAL S</th>
    <th>SERIAL SNS</th>
    <th>FECHA RADICACION</th>
    <th>FECHA RESPUESTA</th>
    <th>TIPO RESPUESTA</th>
    <th>OTRAS RESPUESTAS</th>
  </tr>

  <?php

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse(
    $c,
    'begin oasis.pq_genesis_pqr.P_OBTENER_CIRCULAR (
        :v_reporte,
        :v_fecha_inicio,
        :v_fecha_fin,
        :v_json_row
    ); end;'
  );

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_reporte', $reporte);
  oci_bind_by_name($consulta, ':v_fecha_inicio', $fecha_inicio);
  oci_bind_by_name($consulta, ':v_fecha_fin', $fecha_fin);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  $json = $clob->read($clob->size());
  $datos = json_decode($json);
  foreach ($datos as $row) {
    echo "<tr>";
    echo "<td>";
    echo $row->SERIAL_S;
    echo "</td>";
    echo "<td>";
    echo strval($row->SERIAL_SNS);
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_RADICADO;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_RESPUESTA;
    echo "</td>";
    echo "<td>";
    echo $row->TIPO_RESPUESTA;
    echo "</td>";
    echo "<td>";
    echo $row->OTRAS_RESPUESTAS;
    echo "</td>";
    echo "</tr>";
  }
  oci_close($c);
  ?>
</table>