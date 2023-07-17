<?php
require_once('../../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Acas - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

// $cargo = $_GET['cargo'];
$cargo = 1;

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>TIPO</th>
    <th>NOMBRE</th>
    <th>CARGO</th>
    <th>DEPARTAMENTO</th>
    <th>MUNICIPIO</th>
    <th>CELULAR</th>
    <th>ESTADO</th>
  </tr>
  <?php

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TH.P_BUSCAR_USUARIOS_CARGO(:v_pcargo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcargo', $cargo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  $datos = json_decode($json);

  foreach ($datos as $row) {
    echo "<tr>";
    echo "<td>";
    echo $row->tipo . "-" . $row->cedula;
    echo "</td>";
    echo "<td>";
    echo $row->nombre;
    echo "</td>";
    echo "<td>";
    echo $row->cargo;
    echo "</td>";
    echo "<td>";
    echo $row->departamento;
    echo "</td>";
    echo "<td>";
    echo $row->municipio;
    echo "</td>";
    echo "<td>";
    echo $row->celular;
    echo "</td>";
    echo "<td>";
    echo $row->estado;
    echo "</td>";
    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
