<?php
$rad = $_GET['radicado'];
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Errores " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

require_once('../../config/dbcon_prod.php');


$cursor = oci_new_cursor($c);
$consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_lista_errores_cargue (:V_PCODIGO_PROCESO,:V_JSON_ROW); end;');
oci_bind_by_name($consulta, ':V_PCODIGO_PROCESO', $rad);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":V_JSON_ROW", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
?>

<table border="1" cellpadding="2" cellspacing="0" width="100">
  <caption>Radicado: <?php $rad ?></caption>
  <tbody>
    <tr align='center'>
      <h2>Reporte de errores</h2>
    </tr>
    <tr>
      <th align='center'>ARCHIVO</th>
      <th align='center'> CODIGO ERROR</th>
      <th align='center'>FILA</th>
      <th align='center'>CAMPO</th>
      <th align='center'>MENSAJE</th>
    </tr>
  </tbody>

  <?php

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {

    echo "<tr>";
    echo "<td>";
    echo $row['CODIGO_PROCESO'];
    echo "</td>";
    echo "<td>";
    echo $row['VALN_CODIGO_ERROR'];
    echo "</td>";
    echo "<td>";
    echo $row['LINEA'];
    echo "</td>";
    echo "<td>";
    echo $row['VALC_CAMPO'];
    echo "</td>";
    echo "<td>";
    echo $row['DESCRIPCION_ERROR'];
    echo "</td>";
    echo "</tr>";
  }
  oci_close($c);
  ?>
</table>
