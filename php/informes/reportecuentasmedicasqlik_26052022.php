<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE CUENTAS MEDICAS QLIK"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$nit = $_GET['nit'];
?>
<h1>REPORTE CUENTAS MEDICAS QLIK</h1>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
          <tr>
          <th>NUM_OASIS</th>
          <th>TIPO_DOC</th>
          <th>DOC_AFILIADO</th>
          <th>NOMBRE_AFILIADO</th>
          <th>SEXO</th>
          <th>REGIMEN</th>
          <th>UBICACION_AFILIADO</th>
          <th>DEPARTAMENTO</th>
          <th>NOMBRE_MUNICIPIO</th>
          <th>NIT</th>
          <th>IPS</th>
          <th>MUN_IPS</th>
          <th>FECHA_RADICACION</th>
          <th>FACN_CONTRATO_CAPITADO</th>
          <th>CONCEPTO_CONTRATO</th>
          <th>NOMBRE_AUDITOR</th>
          <th>DOCUMENTO_RAD</th>
          <th>NOMBRE_RADICADOR</th>
          <th>UBICACION_RAD</th>
          <th>SEDE_RAD</th>
          <th>CONCEPTO_FACTURA</th>
          <th>FACTURA</th>
          <th>TOTAL_FACTURA</th>
          <th>ESTADO_FAC</th>
          <th>FACC_DOCUMENTO</th>
          <th>FACN_NUMERO</th>
          <th>FACN_UBICACION</th>
          <th>FACF_PSS</th>
          <th>MOTIVO_RADICACION</th>
          <th>ANTICIPO</th>
          <th>RAD_CAPITA</th>
          <th>FECHA_CAUSACION</th>
          <th>DOCUMENTO_AUD</th>
          <th>VALOR_FD</th>
          <th>DEP_IPS</th>
          <th>DANE_IPS</th>
          <th>FECHA_FACTURA</th>
          <th>FACN_RECIBO</th>
          <th>FACC_AMBITO</th>
          <th>FACC_TIPO_FACTURA</th>
          <th>FACC_NOMBRE_TIPO_FACTURA</th>
          <th>FACC_NOPBS</th>
          <th>FACC_CODCONCEPTO_FACTURA</th>
          <th>EDAD_AFI</th>
          <th>CURSO_VIDA</th>
          <th>CON_DOCUMENTO_CONTRATO</th>
          <th>CON_UBICACION_CONTRATO</th>
          <th>CON_CODIGO_CONCEPTO</th>
          <th>CON_NOMBRE_CONCEPTO</th>
          <th>CON_CODIGO_MOTIVO</th>
          <th>CON_NOMBRE_MOTIVO</th>
          <th>CON_CODIGO_ASUNTO</th>
          <th>CON_NOMBRE_ASUNTO</th>
          <th>CON_ESTADO_CONTRATO</th>
          <th>CON_COBERTURA_CONTRATO</th>
          <th>CON_FORMA_PAGO</th>
          <th>FECHA_PRESTACION_INICIAL</th>
          <th>FECHA_PRESTACION_FINAL</th>
          <th>EPS_ANTERIOR</th>
          <th>EPS_ANTERIOR_NOMBRE</th>
          </tr>
<?php
 $consulta = oci_parse($c, 'begin oasis.pq_genesis_repo.p_archivo_cuentas_medicas_qlik(:v_ptercero,:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado); end;');
 oci_bind_by_name($consulta, ':v_ptercero', $nit);
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);


  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{

  
  
    
          echo "<tr>";
          echo "<td>"; echo$row['NUM_OASIS'];echo "</td>";
          echo "<td>"; echo$row['TIPO_DOC'];echo "</td>";
          echo "<td>"; echo$row['DOC_AFILIADO'];echo "</td>";
          echo "<td>"; echo$row['NOMBRE_AFILIADO'];echo "</td>";
          echo "<td>"; echo$row['SEXO'];echo "</td>";
          echo "<td>"; echo$row['REGIMEN'];echo "</td>";
          echo "<td>"; echo$row['UBICACION_AFILIADO'];echo "</td>";
          echo "<td>"; echo$row['DEPARTAMENTO'];echo "</td>";
          echo "<td>"; echo$row['NOMBRE_MUNICIPIO'];echo "</td>";
          echo "<td>"; echo$row['NIT'];echo "</td>";
          echo "<td>"; echo$row['IPS'];echo "</td>";
          echo "<td>"; echo$row['MUN_IPS'];echo "</td>";
          echo "<td>"; echo$row['FECHA_RADICACION'];echo "</td>";
          echo "<td>"; echo$row['FACN_CONTRATO_CAPITADO'];echo "</td>";
          echo "<td>"; echo$row['CONCEPTO_CONTRATO'];echo "</td>";
          echo "<td>"; echo$row['NOMBRE_AUDITOR'];echo "</td>";
          echo "<td>"; echo$row['DOCUMENTO_RAD'];echo "</td>";
          echo "<td>"; echo$row['NOMBRE_RADICADOR'];echo "</td>";
          echo "<td>"; echo$row['UBICACION_RAD'];echo "</td>";
          echo "<td>"; echo$row['SEDE_RAD'];echo "</td>";
          echo "<td>"; echo$row['CONCEPTO_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['FACTURA'];echo "</td>";
          echo "<td>"; echo$row['TOTAL_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['ESTADO_FAC'];echo "</td>";
          echo "<td>"; echo$row['FACC_DOCUMENTO'];echo "</td>";
          echo "<td>"; echo$row['FACN_NUMERO'];echo "</td>";
          echo "<td>"; echo$row['FACN_UBICACION'];echo "</td>";
          echo "<td>"; echo$row['FACF_PSS'];echo "</td>";
          echo "<td>"; echo$row['MOTIVO_RADICACION'];echo "</td>";
          echo "<td>"; echo$row['ANTICIPO'];echo "</td>";
          echo "<td>"; echo$row['RAD_CAPITA'];echo "</td>";
          echo "<td>"; echo$row['FECHA_CAUSACION'];echo "</td>";
          echo "<td>"; echo$row['DOCUMENTO_AUD'];echo "</td>";
          echo "<td>"; echo$row['VALOR_FD'];echo "</td>";
          echo "<td>"; echo$row['DEP_IPS'];echo "</td>";
          echo "<td>"; echo$row['DANE_IPS'];echo "</td>";
          echo "<td>"; echo$row['FECHA_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['FACN_RECIBO'];echo "</td>";
          echo "<td>"; echo$row['FACC_AMBITO'];echo "</td>";
          echo "<td>"; echo$row['FACC_TIPO_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['FACC_NOMBRE_TIPO_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['FACC_NOPBS'];echo "</td>";
          echo "<td>"; echo$row['FACC_CODCONCEPTO_FACTURA'];echo "</td>";
          echo "<td>"; echo$row['EDAD_AFI'];echo "</td>";
          echo "<td>"; echo$row['CURSO_VIDA'];echo "</td>";
          echo "<td>"; echo$row['CON_DOCUMENTO_CONTRATO'];echo "</td>";
          echo "<td>"; echo$row['CON_UBICACION_CONTRATO'];echo "</td>";
          echo "<td>"; echo$row['CON_CODIGO_CONCEPTO'];echo "</td>";
          echo "<td>"; echo$row['CON_NOMBRE_CONCEPTO'];echo "</td>";
          echo "<td>"; echo$row['CON_CODIGO_MOTIVO'];echo "</td>";
          echo "<td>"; echo$row['CON_NOMBRE_MOTIVO'];echo "</td>";
          echo "<td>"; echo$row['CON_CODIGO_ASUNTO'];echo "</td>";
          echo "<td>"; echo$row['CON_NOMBRE_ASUNTO'];echo "</td>";
          echo "<td>"; echo$row['CON_ESTADO_CONTRATO'];echo "</td>";
          echo "<td>"; echo$row['CON_COBERTURA_CONTRATO'];echo "</td>";
          echo "<td>"; echo$row['CON_FORMA_PAGO'];echo "</td>";
          echo "<td>"; echo$row['FECHA_PRESTACION_INICIAL'];echo "</td>";
          echo "<td>"; echo$row['FECHA_PRESTACION_FINAL'];echo "</td>";
          echo "<td>"; echo$row['EPS_ANTERIOR'];echo "</td>";
          echo "<td>"; echo$row['EPS_ANTERIOR_NOMBRE'];echo "</td>";
        echo "</tr>";
 }
oci_close($c);

?>
