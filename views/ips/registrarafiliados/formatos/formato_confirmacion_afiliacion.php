<?php
require_once('../../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Confirmacion Afiliacion - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$usuario = $_GET['usuario'];
$fin = $_GET['fin'];
$inicio = $_GET['inicio'];
$estado = $_GET['estado'];
$filtro = $_GET['filtro'];
?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>N° REGISTRO</th>
    <th>DOCUMENTO</th>
    <th>NOMBRE DEL NACIDO</th>
    <th>MUNICIPIO Y DEPARTAMENTO</th>
    <th>FECHA REGISTRO</th>
    <th>FUNCIONARIO QUE INGRESO</th>
    <th>REGIONAL</th>
    <th>REGIMEN</th>
    <th>DIRECCION</th>
    <th>BARRIO</th>
    <th>TELEFONO</th>
    <th>CORREO</th>
    <th>NOMBRE CABEZA</th>
    <th>DOCUMENTO CABEZA</th>
    <th>ESTADO</th>
    <th>RESPONSABLE REVISION</th>
    <th>RESPONSABLE APROBACION</th>
    <th>FECHA APROBACION</th>
    <th>RESPONSABLE RECHAZO</th>
    <th>FECHA RECHAZO</th>
    <th>MOTIVO RECHAZO</th>
  </tr>
  <?php



  $consulta = oci_parse($c, 'BEGIN pq_genesis_3047.p_listar_afiliacion_x_confirmar(:v_usuario,:v_pfecha_fin,:v_pfecha_inicio,:v_pfiltro,:v_pestado,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_usuario', $usuario);
  oci_bind_by_name($consulta, ':v_pfecha_fin', $fin);
  oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
  oci_bind_by_name($consulta, ':v_pfiltro', $filtro);
  oci_bind_by_name($consulta, ':v_pestado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  $datos = json_decode($json);

  foreach ($datos as $row) {
    echo "<tr>";
    echo "<td>";echo $row->numero;echo "</td>";
    echo "<td>";echo $row->tipo_doc.' - '.$row->doc;echo "</td>";
    echo "<td>";echo $row->nombre_completo;echo "</td>";
    echo "<td>";echo $row->departamento.' - '.$row->municipio;echo "</td>";
    echo "<td>";echo $row->fecha_registro;echo "</td>";
    echo "<td>";echo $row->Responsable;echo "</td>";
    echo "<td>";echo $row->departamento;echo "</td>";
    echo "<td>";echo $row->regimen;echo "</td>";
    echo "<td>";echo $row->direccion;echo "</td>";
    echo "<td>";echo $row->barrio;echo "</td>";
    echo "<td>";echo $row->movil;echo "</td>";
    echo "<td>";echo $row->correo;echo "</td>";
    echo "<td>";echo $row->nombre_cabeza;echo "</td>";
    echo "<td>";echo $row->tipo_doc_cabeza.' - '.$row->doc_cab;echo "</td>";
    echo "<td>";echo $row->Estado_Solicitud;echo "</td>";
    echo "<td>";echo $row->Responsable_revision;echo "</td>";
    echo "<td>";echo $row->Responsable_aprobacion;echo "</td>";
    echo "<td>";echo $row->fecha_aprobacion;echo "</td>";
    echo "<td>";echo $row->Responsable_rechazo;echo "</td>";
    echo "<td>";echo $row->fecha_rechazo;echo "</td>";
    echo "<td>";echo $row->Motivo_rechazo;echo "</td>";
    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
