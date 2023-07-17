<?php
require('../../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte PQR LOGIFARMA" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];


?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
  <th>CODIGO</th>
  <th>CNTV_TERCERO</th>
  <th>FECHARAD</th>
  <th>FECHAENT</th>
  <th>NOMMEDIO</th>
  <th>OBSERVACION</th>
  <th>DIAS_HABILES_RESTANTES</th>
  <th>DIAS_HABILES</th>
  <th>CODRESP</th>
  <th>RESPONSABLE</th>
  <th>ESTADO</th>
  <th>SOLICITUD</th>
  <th>TIPODOCUMENTO</th>
  <th>DOCUMENTO</th>
  <th>NOMBRECOMPLETO</th>
  <th>AFIC_TELEFONO</th>
  <th>AFIC_CELULAR</th>
  <th>AFIC_CORREO</th>
  <th>AFIC_CELULAR2</th>
  <th>AFIC_DIRECCION</th>
  <th>ESTADO_PQR</th>
  <th>ESTADO_CODIGO</th>
  <th>PQRC_NOMBRE_MEDIO</th>
  <th>NOMSENTESDECONTROL</th>
  <th>AFIN_UBICACION_GEOGRAFICA</th>
  <th>UBGC_NOMBRE</th>

  </tr>

  <?php

  global $request;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_REPORTE_LOGIFARMA(:V_FECHA_I,:V_FECHA_F,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':V_FECHA_I', $fecha_i);
  oci_bind_by_name($consulta, ':V_FECHA_F', $fecha_f);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    echo "<tr>";
    echo "<td>";echo $row['CODIGO'];echo "</td>";
    echo "<td>";echo $row['CNTV_TERCERO'];echo "</td>";
    echo "<td>";echo $row['FECHARAD'];echo "</td>";
    echo "<td>";echo $row['FECHAENT'];echo "</td>";
    echo "<td>";echo $row['NOMMEDIO'];echo "</td>";
    echo "<td>";echo $row['OBSERVACION'];echo "</td>";
    echo "<td>";echo $row['DIAS_HABILES_RESTANTES'];echo "</td>";
    echo "<td>";echo $row['DIAS_HABILES'];echo "</td>";
    echo "<td>";echo $row['CODRESP'];echo "</td>";
    echo "<td>";echo $row['RESPONSABLE'];echo "</td>";
    echo "<td>";echo $row['ESTADO'];echo "</td>";
    echo "<td>";echo $row['SOLICITUD'];echo "</td>";
    echo "<td>";echo $row['TIPODOCUMENTO'];echo "</td>";
    echo "<td>";echo $row['DOCUMENTO'];echo "</td>";
    echo "<td>";echo $row['NOMBRECOMPLETO'];echo "</td>";
    echo "<td>";echo $row['AFIC_TELEFONO'];echo "</td>";
    echo "<td>";echo $row['AFIC_CELULAR'];echo "</td>";
    echo "<td>";echo $row['AFIC_CORREO'];echo "</td>";
    echo "<td>";echo $row['AFIC_CELULAR2'];echo "</td>";
    echo "<td>";echo $row['AFIC_DIRECCION'];echo "</td>";
    echo "<td>";echo $row['ESTADO_PQR'];echo "</td>";
    echo "<td>";echo $row['ESTADO_CODIGO'];echo "</td>";
    echo "<td>";echo $row['PQRC_NOMBRE_MEDIO'];echo "</td>";
    echo "<td>";echo $row['NOMSENTESDECONTROL'];echo "</td>";
    echo "<td>";echo $row['AFIN_UBICACION_GEOGRAFICA'];echo "</td>";
    echo "<td>";echo $row['UBGC_NOMBRE'];echo "</td>";
    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
