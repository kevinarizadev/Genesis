<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Autorizaciones de Productos PGP " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$v_panno = $_GET['v_panno'];
$v_pperiodo = $_GET['v_pperiodo'];
$v_pnit = $_GET['v_pnit'];
$v_pregimen = $_GET['v_pregimen'];
?>



<table cellspacing="0" cellpadding="0" border="1" align="center"><?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Autorizaciones de Productos PGP " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$v_panno = $_GET['v_panno'];
$v_pperiodo = $_GET['v_pperiodo'];
$v_pnit = $_GET['v_pnit'];
$v_pregimen = $_GET['v_pregimen'];
?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>NUMERO_AUT</th>
    <th>CODIGO_UBICACION_AUT</th>
    <th>SECCIONAL</th>
    <th>FECHA_PROCESADO</th>
    <th>FECHA_ORDEN</th>
    <th>NIT</th>
    <th>RAZON_SOCIAL</th>
    <th>NIT_SOLICITANTE</th>
    <th>RAZON_SOCIAL_SOLICITANTE</th>
    <th>TIPO_DOCUMENTO</th>
    <th>NUM_DOCUMENTO</th>
    <th>FECHA_NACIMIENTO</th>
    <th>EDAD</th>
    <th>GENERO</th>
    <th>CODIGO_DPTO_AFILIADO</th>
    <th>NOMBRE_DPTO_AFILIADO</th>
    <th>CODIGO_MUNICIPIO</th>
    <th>MUNICIPIO_AFILIADO</th>
    <th>COD_CLASIFICACION</th>
    <th>NOMBRE_CLASIFICACION</th>
    <th>UNIDAD_FUNCIONAL</th>
    <th>COD_DX_PPAL</th>
    <th>NOMBRE_DX_PPAL</th>
    <th>COD_DX_2</th>
    <th>NOMBRE_DX_2</th>
    <th>ALTO_COSTO</th>
    <th>COBERTURA</th>
    <th>COD_PRODUCTO</th>
    <th>NOMBRE_PRODUCTO</th>
    <th>CANTIDAD</th>
    <th>VALOR_UNITARIO</th>
    <th>VALOR_TOTAL_AUT</th>
    <th>COPAGO</th>
    <th>ESTADO</th>
    <th>NUM_AUTORIZACION_MANUAL</th>
    <th>FECHA_SOLICITUD</th>
    <th>ANIO</th>
    <th>MES</th>
    <th>ANTICIPO</th>
    <th>REGIMEN_AUTORIZACION</th>
    <th>AMBITO</th>

  </tr>
  <?php

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_AUTORIZACIONES_PRODUCTOS_PGP(  :v_panno,
                                              :v_pperiodo,
                                              :v_pnit,
                                              :v_pregimen,
                                              :v_pjson_out,
                                              :v_presultado); end;');
  oci_bind_by_name($consulta, ':v_panno', $v_panno);
  oci_bind_by_name($consulta, ':v_pperiodo', $v_pperiodo);
  oci_bind_by_name($consulta, ':v_pnit', $v_pnit);
  oci_bind_by_name($consulta, ':v_pregimen', $v_pregimen);
  oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_presultado", $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);

  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    //echo json_encode($datos);

    foreach ($datos as $row) {
      echo "<tr>";
      echo "<td>";
      echo $row['NUMERO_AUT'];
      echo "</td>";
      echo "<td>";
      echo $row['CODIGO_UBICACION_AUT'];
      echo "</td>";
      echo "<td>";
      echo $row['SECCIONAL'];
      echo "</td>";
      echo "<td>";
      echo $row['FECHA_PROCESADO'];
      echo "</td>";
      echo "<td>";
      echo $row['FECHA_ORDEN'];
      echo "</td>";
      echo "<td>";
      echo $row['NIT'];
      echo "</td>";
      echo "<td>";
      echo $row['RAZON_SOCIAL'];
      echo "</td>";
      echo "<td>";
      echo $row['NIT_SOLICITANTE'];
      echo "</td>";
      echo "<td>";
      echo $row['RAZON_SOCIAL_SOLICITANTE'];
      echo "</td>";
      echo "<td>";
      echo $row['TIPO_DOCUMENTO'];
      echo "</td>";
      echo "<td>";
      echo $row['NUM_DOCUMENTO'];
      echo "</td>";
      echo "<td>";
      echo $row['FECHA_NACIMIENTO'];
      echo "</td>";
      echo "<td>";
      echo $row['EDAD'];
      echo "</td>";
      echo "<td>";
      echo $row['GENERO'];
      echo "</td>";
      echo "<td>";
      echo $row['CODIGO_DPTO_AFILIADO'];
      echo "</td>";
      echo "<td>";
      echo $row['NOMBRE_DPTO_AFILIADO'];
      echo "</td>";
      echo "<td>";
      echo $row['CODIGO_MUNICIPIO'];
      echo "</td>";
      echo "<td>";
      echo $row['MUNICIPIO_AFILIADO'];
      echo "</td>";
      echo "<td>";
      echo $row['COD_CLASIFICACION'];
      echo "</td>";
      echo "<td>";
      echo $row['NOMBRE_CLASIFICACION'];
      echo "</td>";
      echo "<td>";
      echo $row['UNIDAD_FUNCIONAL'];
      echo "</td>";
      echo "<td>";
      echo $row['COD_DX_PPAL'];
      echo "</td>";
      echo "<td>";
      echo $row['NOMBRE_DX_PPAL'];
      echo "</td>";
      echo "<td>";
      echo $row['COD_DX_2'];
      echo "</td>";
      echo "<td>";
      echo $row['NOMBRE_DX_2'];
      echo "</td>";
      echo "<td>";
      echo $row['ALTO_COSTO'];
      echo "</td>";
      echo "<td>";
      echo $row['COBERTURA'];
      echo "</td>";
      echo "<td>";
      echo $row['COD_PRODUCTO'];
      echo "</td>";
      echo "<td>";
      echo $row['NOMBRE_PRODUCTO'];
      echo "</td>";
      echo "<td>";
      echo $row['CANTIDAD'];
      echo "</td>";
      echo "<td>";
      echo $row['VALOR_UNITARIO'];
      echo "</td>";
      echo "<td>";
      echo $row['VALOR_TOTAL_AUT'];
      echo "</td>";
      echo "<td>";
      echo $row['COPAGO'];
      echo "</td>";
      echo "<td>";
      echo $row['ESTADO'];
      echo "</td>";
      echo "<td>";
      echo $row['NUM_AUTORIZACION_MANUAL'];
      echo "</td>";
      echo "<td>";
      echo $row['FECHA_SOLICITUD'];
      echo "</td>";
      echo "<td>";
      echo $row['AÑO'];
      echo "</td>";
      echo "<td>";
      echo $row['MES'];
      echo "</td>";
      echo "<td>";
      echo $row['ANTICIPO'];
      echo "</td>";
      echo "<td>";
      echo $row['REGIMEN_AUTORIZACION'];
      echo "</td>";
      echo "<td>";
      echo $row['AMBITO'];
      echo "</td>";
      echo "</tr>";
    }
  } else {
    echo json_encode($json);
  }
  oci_close($c);
  ?>
</table>
</table>
