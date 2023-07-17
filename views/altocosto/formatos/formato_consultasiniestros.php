<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Siniestros " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$Estado = $_GET['Estado'];
$Ubicacion = $_GET['Ubicacion'];
$Cohorte = $_GET['Cohorte'];
$F_Inicio = $_GET['F_Inicio'];
$F_Fin = $_GET['F_Fin'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>RADICADO</th>
    <th>SECCIONAL</th>
    <th>DOCUMENTO AFILIADO</th>
    <th>NUM DOC AFILIADO</th>
    <!-- <th>NOMBRE AFILIADO</th> -->
    <th>PRIMER NOMBRE</th>
    <th>SEGUNDO NOMBRE </th>
    <th>PRIMER APELLIDO</th>
    <th>SEGUNDO APELLIDO</th>

    <th>EDAD</th>
    <th>SEXO</th>
    <th>FECHA NACIMIENTO</th>
    <th>FECHA AFILIACION</th>
    <th>ESTADO AFILIADO</th>
    <th>FECHA RETIRO AFILIADO</th>
    <th>DIRECCION AFILIADO</th>
    <th>CODIGO DANE MUNICIPIO AFILIADO</th>
    <th>MUNICIPIO AFILIADO</th>
    <th>LOCALIDAD AFILIADO</th>
    <th>CELULAR AFILIADO</th>
    <th>TELEFONO AFILIADO</th>
    <th>REGIMEN</th>
    <th>COHORTE</th>
    <th>CLASIFICACION</th>
    <th>DIAGNOSTICO</th>
    <th>FECHA CONFIRMACION DIAGNO</th>
    <th>FUENTE</th>
    <th>FECHA IDENTIFICACION REGISTRO</th>
    <th>FECHA INICIO GESTION</th>
    <th>ESTADO</th>
    <th>FECHA DE ACCION</th>
    <!-- <th>OBSERVACION</th> -->
    <th>PLURIPATOLOGICO</th>
    <th>PRIORIDAD</th>
    <!-- <th>RESPONSABLE</th> -->
    <!-- <th>IPS DE IDENTIFICACION AFILIADO</th> -->
    <th>IPS INICIO TRATAMIENTO</th>
    <th>TIPO TRATAMIENTO</th>
    <th>FECHA INICIO IPS TRATAMIENTO</th>
    <th>IPS ATENCION INTEGRAL</th>
    <th>FECHA INICIO IPS ATENCION INTEGRAL</th>
    <th>CODIGO HABILITACION DE IPS</th>

    <th>RESPONSABLE_SECCIONAL</th>
    <th>FECHA_GESTION_SECCIONAL</th>
    <th>OBSERVACION_SECCIONAL</th>
    <th>RESPONSABLE_NACIONAL</th>
    <th>FECHA_GESTION_NACIONAL</th>
    <th>OBSERVACION_NACIONAL</th>

    <th>FUNCIONARIO QUE IDENTIFICA EL SINIESTRO</th>
    <th>PORTABILIDAD DEL USUARIO</th>
    <th>TUTELA</th>
    <th>FECHA VACUNACION 1RA DOSIS</th>
    <th>FECHA VACUNACION 2DA DOSIS</th>
    <th>FECHA VACUNACION 3RA DOSIS</th>
    <!-- <th>MOTIVO DE INACTIVACION</th> -->
    <th>IPS QUE IDENTIFICA O SOLICITANTE</th>
    <th>IPS ASIGNADA</th>
  </tr>

  <?php

  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_SINIESTRO(:v_pestado,:v_ubicacion,:v_cohorte,:v_pfecha_1,:v_pfecha_2,:v_response); end;');
  oci_bind_by_name($consulta, ':v_pestado', $Estado);
  oci_bind_by_name($consulta, ':v_ubicacion', $Ubicacion);
  oci_bind_by_name($consulta, ':v_cohorte', $Cohorte);
  oci_bind_by_name($consulta, ':v_pfecha_1', $F_Inicio);
  oci_bind_by_name($consulta, ':v_pfecha_2', $F_Fin);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    echo "<tr>";
    echo "<td>";
    echo $row['RADICADO'];
    echo "</td>";
    echo "<td>";
    echo $row['DEPARTAMENTO_AFILIADO'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_DOCUMENTO'];
    echo "</td>";
    echo "<td>";
    echo $row['NUM_DOCUMENTO'];
    echo "</td>";
    // echo "<td>";echo $row['AFIC_NOMBRE'];echo "</td>";
    echo "<td>";
    echo $row['PRIMER_NOMBRE'];
    echo "</td>";
    echo "<td>";
    echo $row['SEGUNDO_NOMBRE'];
    echo "</td>";
    echo "<td>";
    echo $row['PRIMER_APELLIDO'];
    echo "</td>";
    echo "<td>";
    echo $row['SEGUNDO_APELLIDO'];
    echo "</td>";

    echo "<td>";
    echo $row['EDAD'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_SEXO'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_NACIMIENTO'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIF_AFILIACION'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_DESCRIPCION'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_NOVEDAD'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_DIRECCION'];
    echo "</td>";
    echo "<td>";
    echo $row['CODIGO_DANE'];
    echo "</td>";
    echo "<td>";
    echo $row['MUNICIPIO_AFILIADO'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_LOCALIDAD'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_CELULAR'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_TELEFONO'];
    echo "</td>";
    echo "<td>";
    echo $row['DESC_REGIMEN'];
    echo "</td>";
    echo "<td>";
    echo $row['DESC_CONCEPTO'];
    echo "</td>";
    echo "<td>";
    echo $row['CLAC_DESCRIPCION'];
    echo "</td>";
    echo "<td>";
    echo $row['COD_DIAGNOSTICO'] . ' - ' . $row['DESC_DIAGNOSTICO'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_CONFIRMACION_DIAGNO'];
    echo "</td>";
    echo "<td>";
    echo $row['EGPC_ORIGEN'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_INICIO'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_INICIO_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['ESTADO_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_GESTION'];
    echo "</td>";
    // echo "<td>";echo $row['OBSERVACION'];echo "</td>";
    echo "<td>";
    echo $row['PLURIPATOLOGICO'];
    echo "</td>";
    echo "<td>";
    echo $row['PRIORIDAD'];
    echo "</td>";
    // echo "<td>";echo $row['RESPONSABLE_GESTION']. ' - '.$row['NOMBRE_RESPONSABLE'];echo "</td>";
    // echo "<td>";
    // echo $row['NIT_IPS'] . ' - ' . $row['NOM_IPS'];
    // echo "</td>";
    echo "<td>";
    echo $row['IPS_TTO'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_TTO'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_IPS_TTO'];
    echo "</td>";
    echo "<td>";
    echo $row['IPS_ATENCION_INTEGRAL'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_IPS_ATENCION'];
    echo "</td>";
    echo "<td>";
    echo $row['COD_IPS_HABILITACION'];
    echo "</td>";

    echo "<td>";
    echo $row['RESPONSABLE_SECCIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_GESTION_SECCIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['OBSERVACION_SECCIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['RESPONSABLE_NACIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_GESTION_NACIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['OBSERVACION_NACIONAL'];
    echo "</td>";

    echo "<td>";
    echo $row['NOM_RESPONSABLE_PROCESO'];
    echo "</td>";
    echo "<td>";
    echo $row['UBICACION_PORTABILIDAD'];
    echo "</td>";
    echo "<td>";
    echo $row['TUTELA'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHAAPLICACION_VACUNA'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHASEGUNDAVAC'];
    echo "</td>";
    echo "<td>";
    // echo $row['FECHATERCERAVAC'];
    echo '';
    echo "</td>";
    // echo "<td>";
    // echo $row['MOTIVO_RETIRO'];
    // echo "</td>";
    echo "<td>";
    echo $row['IPS_SOL'];
    echo "</td>";
    echo "<td>";
    echo $row['IPS_ASG'];
    echo "</td>";


    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
