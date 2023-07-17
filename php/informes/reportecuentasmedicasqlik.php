<?php
require_once('../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reporte cuentas medicas qlik.txt"');

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$nit = $_GET['nit'];

 $consulta = oci_parse($c, 'begin pq_genesis_repo.p_archivo_cuentas_medicas_qlik(:v_ptercero,:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado); end;');
 oci_bind_by_name($consulta, ':v_ptercero', $nit);
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);

$row = array();
         echo 'NUM_OASIS'.'|'.
          'TIPO_DOC'.'|'.
          'DOC_AFILIADO'.'|'.
          'NOMBRE_AFILIADO'.'|'.
          'SEXO'.'|'.
          'REGIMEN'.'|'.
          'UBICACION_AFILIADO'.'|'.
          'DEPARTAMENTO'.'|'.
          'NOMBRE_MUNICIPIO'.'|'.
          'NIT'.'|'.
          'IPS'.'|'.
          'MUN_IPS'.'|'.
          'FECHA_RADICACION'.'|'.
          'FACN_CONTRATO_CAPITADO'.'|'.
          'CONCEPTO_CONTRATO'.'|'.
          'NOMBRE_AUDITOR'.'|'.
          'DOCUMENTO_RAD'.'|'.
          'NOMBRE_RADICADOR'.'|'.
          'UBICACION_RAD'.'|'.
          'SEDE_RAD'.'|'.
          'CONCEPTO_FACTURA'.'|'.
          'FACTURA'.'|'.
          'TOTAL_FACTURA'.'|'.
          'ESTADO_FAC'.'|'.
          'FACC_DOCUMENTO'.'|'.
          'FACN_NUMERO'.'|'.
          'FACN_UBICACION'.'|'.
          'FACF_PSS'.'|'.
          'MOTIVO_RADICACION'.'|'.
          'ANTICIPO'.'|'.
          'RAD_CAPITA'.'|'.
          'FECHA_CAUSACION'.'|'.
          'DOCUMENTO_AUD'.'|'.
          'VALOR_FD'.'|'.
          'DEP_IPS'.'|'.
          'DANE_IPS'.'|'.
          'FECHA_FACTURA'.'|'.
          'FACN_RECIBO'.'|'.
          'FACC_AMBITO'.'|'.
          'FACC_TIPO_FACTURA'.'|'.
          'FACC_NOMBRE_TIPO_FACTURA'.'|'.
          'FACC_NOPBS'.'|'.
          'FACC_CODCONCEPTO_FACTURA'.'|'.
          'EDAD_AFI'.'|'.
          'CURSO_VIDA'.'|'.
          'CON_DOCUMENTO_CONTRATO'.'|'.
          'CON_UBICACION_CONTRATO'.'|'.
          'CON_CODIGO_CONCEPTO'.'|'.
          'CON_NOMBRE_CONCEPTO'.'|'.
          'CON_CODIGO_MOTIVO'.'|'.
          'CON_NOMBRE_MOTIVO'.'|'.
          'CON_CODIGO_ASUNTO'.'|'.
          'CON_NOMBRE_ASUNTO'.'|'.
          'CON_ESTADO_CONTRATO'.'|'.
          'CON_COBERTURA_CONTRATO'.'|'.
          'CON_FORMA_PAGO'.'|'.
          'FECHA_PRESTACION_INICIAL'.'|'.
          'FECHA_PRESTACION_FINAL'.'|'.
          'EPS_ANTERIOR'.'|'.
          'EPS_ANTERIOR_NOMBRE'.'|';
          echo "\n";

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{

     echo $row['NUM_OASIS']. '|' .
          $row['TIPO_DOC']. '|' .
          $row['DOC_AFILIADO']. '|' .
          $row['NOMBRE_AFILIADO']. '|' .
          $row['SEXO']. '|' .
          $row['REGIMEN']. '|' .
          $row['UBICACION_AFILIADO']. '|' .
          $row['DEPARTAMENTO']. '|' .
          $row['NOMBRE_MUNICIPIO']. '|' .
          $row['NIT']. '|' .
          $row['IPS']. '|' .
          $row['MUN_IPS']. '|' .
          $row['FECHA_RADICACION']. '|' .
          $row['FACN_CONTRATO_CAPITADO']. '|' .
          $row['CONCEPTO_CONTRATO']. '|' .
          $row['NOMBRE_AUDITOR']. '|' .
          $row['DOCUMENTO_RAD']. '|' .
          $row['NOMBRE_RADICADOR']. '|' .
          $row['UBICACION_RAD']. '|' .
          $row['SEDE_RAD']. '|' .
          $row['CONCEPTO_FACTURA']. '|' .
          $row['FACTURA']. '|' .
          $row['TOTAL_FACTURA']. '|' .
          $row['ESTADO_FAC']. '|' .
          $row['FACC_DOCUMENTO']. '|' .
          $row['FACN_NUMERO']. '|' .
          $row['FACN_UBICACION']. '|' .
          $row['FACF_PSS']. '|' .
          $row['MOTIVO_RADICACION']. '|' .
          $row['ANTICIPO']. '|' .
          $row['RAD_CAPITA']. '|' .
          $row['FECHA_CAUSACION']. '|' .
          $row['DOCUMENTO_AUD']. '|' .
          $row['VALOR_FD']. '|' .
          $row['DEP_IPS']. '|' .
          $row['DANE_IPS']. '|' .
          $row['FECHA_FACTURA']. '|' .
          $row['FACN_RECIBO']. '|' .
          $row['FACC_AMBITO']. '|' .
          $row['FACC_TIPO_FACTURA']. '|' .
          $row['FACC_NOMBRE_TIPO_FACTURA']. '|' .
          $row['FACC_NOPBS']. '|' .
          $row['FACC_CODCONCEPTO_FACTURA']. '|' .
          $row['EDAD_AFI']. '|' .
          $row['CURSO_VIDA']. '|' .
          $row['CON_DOCUMENTO_CONTRATO']. '|' .
          $row['CON_UBICACION_CONTRATO']. '|' .
          $row['CON_CODIGO_CONCEPTO']. '|' .
          $row['CON_NOMBRE_CONCEPTO']. '|' .
          $row['CON_CODIGO_MOTIVO']. '|' .
          $row['CON_NOMBRE_MOTIVO']. '|' .
          $row['CON_CODIGO_ASUNTO']. '|' .
          $row['CON_NOMBRE_ASUNTO']. '|' .
          $row['CON_ESTADO_CONTRATO']. '|' .
          $row['CON_COBERTURA_CONTRATO']. '|' .
          $row['CON_FORMA_PAGO']. '|' .
          $row['FECHA_PRESTACION_INICIAL']. '|' .
          $row['FECHA_PRESTACION_FINAL']. '|' .
          $row['EPS_ANTERIOR']. '|' .
          $row['EPS_ANTERIOR_NOMBRE']. '|'."\n";
 }
oci_close($c);

?>
