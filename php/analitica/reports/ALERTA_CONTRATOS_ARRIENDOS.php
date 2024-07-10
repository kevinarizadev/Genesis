<?php
require_once('../../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Alerta Contratos Arriendos " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>DEPARTAMENTO</th>
    <th>MUNICIPIO</th>
    <th>TIPO_ARRIENDO</th>
    <th>NIT</th>
    <th>ARRENDADOR</th>
    <th>CONTRATO_VIGENTE</th>
    <th>FECHA_APERTURA</th>
    <th>FECHA_VENCIMIENTO</th>
    <th>DIAS_MAXIMO_PARA_NOTIFICACION</th>
    <th>DIAS_PARA_VENCIMIENTO</th>
    <th>OPORTUNIDAD_PARA_NOTIFICACION</th>
  </tr>

  <?php

  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin PQ_GENESIS_ANALITICA_DATOS.P_ALERTA_CONTRATOS_ARRIENDOS(:V_JSON_ROW); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    // echo $json;
  }

  $json2 = json_decode($json);

  foreach ($json2 as $key) {
    echo "<tr>";
    echo "<td>".$key->{'DEPARTAMENTO'}."</td>";
    echo "<td>".$key->{'MUNICIPIO'}."</td>";
    echo "<td>".$key->{'TIPO_ARRIENDO'}."</td>";
    echo "<td>".$key->{'NIT'}."</td>";
    echo "<td>".$key->{'ARRENDADOR'}."</td>";
    echo "<td>".$key->{'CONTRATO_VIGENTE'}."</td>";
    echo "<td>".$key->{'FECHA_APERTURA'}."</td>";
    echo "<td>".$key->{'FECHA_VENCIMIENTO'}."</td>";
    echo "<td>".$key->{'DIAS_MAXIMO_PARA_NOTIFICACION'}."</td>";
    echo "<td>".$key->{'DIAS_PARA_VENCIMIENTO'}."</td>";
    echo "<td>".$key->{'OPORTUNIDAD_PARA_NOTIFICACION'}."</td>";
    echo "</tr>";
  }


  oci_close($c);
  ?>
</table>
