<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de Siniestros " . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$p_tipog = $_GET['p_tipog'];
$p_finicio = $_GET['p_finicio'];
$p_ffinal = $_GET['p_ffinal'];
$p_documento = $_GET['p_documento'];

?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>NOMBRE</th>
    <th>TIPO DOCUMENTO</th>
    <th>DOCUMENTO</th>
    <th>TELEFONO CELULAR</th>
    <th>TELEFONO FIJO</th>
    <th>BARRIO</th>
    <th>DIRECCION</th>
    <th>DEPARTAMENTO</th>
    <th>MUNICIPIO</th>
    <th>CORREO ELECTRONICO</th>
    <th>FECHA REGISTRO</th>
  </tr>
  <?php


  $consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.p_mostrar_datos(:p_tipog,:p_finicio,:p_ffinal,:p_documento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':p_tipog', $p_tipog);
  oci_bind_by_name($consulta, ':p_finicio', $p_finicio);
  oci_bind_by_name($consulta, ':p_ffinal', $p_ffinal);
  oci_bind_by_name($consulta, ':p_documento', $p_documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  $datos = json_decode($json);

  foreach ($datos as $row) {
    echo "<tr>";
    echo "<td>";
    echo $row->NOMBRE1;
    echo "</td>";
    echo "<td>";
    echo $row->TIPODOCUMENTO;
    echo "</td>";
    echo "<td>";
    echo $row->DOCUMENTO;
    echo "</td>";
    echo "<td>";
    echo $row->TELEFONO != '' ? $row->TELEFONO : 'NO REGISTRA';
    echo "</td>";
    echo "<td>";
    echo $row->TELEFONO2 != '' ? $row->TELEFONO2 : 'NO REGISTRA';
    echo "</td>";
    echo "<td>";
    echo $row->BARRIO;
    echo "</td>";
    echo "<td>";
    echo $row->DIRECCION;
    echo "</td>";
    echo "<td>";
    echo $row->NDEPARTAMENTO;
    echo "</td>";
    echo "<td>";
    echo $row->NMUNICIPIO;
    echo "</td>";
    echo "<td>";
    echo $row->CORREO;
    echo "</td>";
    echo "<td>";
    echo $row->FMODIFICADO;
    echo "</td>";
    echo "</tr>";
  }

  oci_close($c);

  ?>
</table>
