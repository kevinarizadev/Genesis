<?php
require_once('../../../config/dbcon_prod.php');
// header('Content-type: application/vnd.ms-excel;');
// header("Content-Disposition: attachment; filename=Reporte Gestion Tutelas Vencidas " . date("d_m_Y") . ".xls");
// header("Pragma: no-cache");
// header("Expires: 0");


$condicion = $_GET["condicion"];
$responsable = $_GET["responsable"];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>NUMERO_TUTELA</th>
    <th>RENGLON</th>
    <th>REGIONAL</th>
    <th>NUMERO_RADICACION</th>
    <th>ESTADO</th>
    <th>ETAPA</th>
    <th>ESTADO_GESTION</th>
    <th>FECHA_VENCIMIENTO</th>
    <th>AREA_RESPONSABLE</th>
    <th>FUNCIONARIO_RESPONSABLE</th>
    <th>JEFE_AREA</th>
  </tr>

  <?php

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin PQ_GENESIS_TUT.P_DESCARGA_GESTION_VENCIDAS(:v_pcondicion,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcondicion', $condicion);
  oci_bind_by_name($consulta, ':v_presponsable', $responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    // echo $json;
  }

  $json2 = json_decode($json);

  foreach ($json2 as $key) {
    echo "<tr>";
    echo "<td>".$key->{'numero_tutela'}."</td>";
    echo "<td>".$key->{'renglon'}."</td>";
    echo "<td>".$key->{'regional'}."</td>";
    echo "<td>".$key->{'numero_radicacion'}."</td>";
    echo "<td>".$key->{'estado'}."</td>";
    echo "<td>".$key->{'etapa'}."</td>";
    echo "<td>".$key->{'estado_gestion'}."</td>";
    echo "<td>".$key->{'fecha_vencimiento'}."</td>";
    echo "<td>".$key->{'area_responsable'}."</td>";
    echo "<td>".$key->{'funcionario_responsable'}."</td>";
    echo "<td>".$key->{'jefe_area'}."</td>";
    echo "</tr>";

  }


  oci_close($c);
  ?>
</table>
