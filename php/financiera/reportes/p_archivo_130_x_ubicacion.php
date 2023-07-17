<?php

require_once('../../config/dbcon_prod.php');

header("Content-Type: text/plain");
header("Content-Disposition: attachment; filename=p_archivo_130_x_ubicacion_radicacion- " . "_" . date("d_m_Y") . ".txt");




$row = array();
echo'TIPO_DE_IDENTIFICACION_DE_LA_ERP'.'|'.
'NUMERO_IDENTIFICACION_ERP'.'|'.
'NUMERO_IDENTIFICACION_EPS'.'|'.
'PREFIJO_DE_LA_FACTURA'.'|'.
'NUMERO_DE_LA_FACTURA'.'|'.
'VALOR_DE_LA_FACTURA'.'|'.
'FECHA_DE_EMISION_DE_LA_FACTURA'.'|'.
'FECHA_DE_RADICACIÓN_DE_LA_FACTURA'.'|'.
'VALOR_GLOSA_DEFINITIVA_ACEPTADA_POR_IPS'.'|'.
'VALOR_GLOSA_INICIAL'.'|'.
'TIPO_GIRO'.'|'.
'VALOR_GIRO'.'|'.
'TIPO_CUMPLIMIENTO'.'|'.
'FECHA_DE_GIRO'.'|'.
'MODALIDAD_DE_CONTRATACION'.'|'.
'TIPO_POBLACION_REGIMEN'.'|'.
'VALOR_DIARIOUSUARIO'.'|'.
'MES_LMA'.'|'.
'COD_MUNICIPIO'.'|'.
'INDICADOR_DE_ACTUALIZACION'.'|'.
'MOTIVO_DE_DEVOLUCION'.'|'.
'FACC_TIPO_DOC_AFILIADO'.'|'.
'FACC_AFILIADO'.'|'.
'AFIC_NOMBRE'.'|'.
'FACN_UBICACION_CONTRATO'.'|'.
'FACN_CONTRATO_CAPITADO'.'|'.
'FACV_TERCERO'.'|'.
'TERC_NOMBRE'.'|'.
'FACC_DOCUMENTO'.'|'.
'FACN_NUMERO'.'|'.
'FACN_UBICACION'.'|'.
'FACH_HORA'.'|'.
'RADICACCION'.'|'.
'VALOR_RETENCION'.'|'.
'SALDO'.'|'.
'PAGO'.'|'.
'VALOR_COPAGO'.'|'.
'VALOR_FD'.'|'.
'VALOR_GL'.'|'.
'VALOR_GI'.'|'.
'VALOR_DP'.'|'.
'ES_CAPITA'

;
echo "\n";
$v_pempresa = 1;
$v_pregimen = $_GET['v_pregimen'];
$v_panno = $_GET['v_panno'];
$v_pperiodo = $_GET['v_pperiodo'];
$v_pciclo = $_GET['v_pciclo'];
$v_ptercero = $_GET['v_ptercero'];
$v_pubicacion =  $_GET['v_pubicacion'];

$consulta = oci_parse($c, 'begin pq_genesis_repo.p_archivo_130_x_ubicacion_radicacion(           :v_pempresa,
                                                                                                 :v_pregimen,
                                                                                                 :v_panno,
                                                                                                 :v_pperiodo,
                                                                                                 :v_pciclo,
                                                                                                 :v_ptercero,
                                                                                                 :v_pubicacion,
                                                                                                 :v_json_out,
                                                                                                 :v_result); end;');
oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
oci_bind_by_name($consulta, ':v_pregimen', $v_pregimen);
oci_bind_by_name($consulta, ':v_panno', $v_panno);
oci_bind_by_name($consulta, ':v_pperiodo', $v_pperiodo);
oci_bind_by_name($consulta, ':v_pciclo', $v_pciclo);
oci_bind_by_name($consulta, ':v_ptercero', $v_ptercero);
oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
 while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) 
{
    echo  
$row['TIPO_DE_IDENTIFICACION_DE_LA_ERP'] . '|'.
$row['NUMERO_IDENTIFICACION_ERP'] . '|'.
$row['NUMERO_IDENTIFICACION_EPS'] . '|'.
$row['PREFIJO_DE_LA_FACTURA'] . '|'.
$row['NUMERO_DE_LA_FACTURA'] . '|'.
$row['VALOR_DE_LA_FACTURA'] . '|'.
$row['FECHA_DE_EMISION_DE_LA_FACTURA'] . '|'.
$row['FECHA_DE_RADICACIÓN_DE_LA_FACTURA'] . '|'.
$row['VALOR_GLOSA_DEFINITIVA_ACEPTADA_POR_IPS'] . '|'.
$row['VALOR_GLOSA_INICIAL'] . '|'.
$row['TIPO_GIRO'] . '|'.
$row['VALOR_GIRO'] . '|'.
$row['TIPO_CUMPLIMIENTO'] . '|'.
$row['FECHA_DE_GIRO'] . '|'.
$row['MODALIDAD_DE_CONTRATACION'] . '|'.
$row['TIPO_POBLACION_REGIMEN'] . '|'.
$row['VALOR_DIARIOUSUARIO'] . '|'.
$row['MES_LMA'] . '|'.
$row['COD_MUNICIPIO'] . '|'.
$row['INDICADOR_DE_ACTUALIZACION'] . '|'.
$row['MOTIVO_DE_DEVOLUCION'] . '|'.
$row['FACC_TIPO_DOC_AFILIADO'] . '|'.
$row['FACC_AFILIADO'] . '|'.
$row['AFIC_NOMBRE'] . '|'.
$row['FACN_UBICACION_CONTRATO'] . '|'.
$row['FACN_CONTRATO_CAPITADO'] . '|'.
$row['FACV_TERCERO'] . '|'.
$row['TERC_NOMBRE'] . '|'.
$row['FACC_DOCUMENTO'] . '|'.
$row['FACN_NUMERO'] . '|'.
$row['FACN_UBICACION'] . '|'.
$row['FACH_HORA'] . '|'.
$row['RADICACCION'] . '|'.
$row['VALOR_RETENCION'] . '|'.
$row['SALDO'] . '|'.
$row['PAGO'] . '|'.
$row['VALOR_COPAGO'] . '|'.
$row['VALOR_FD'] . '|'.
$row['VALOR_GL'] . '|'.
$row['VALOR_GI'] . '|'.
$row['VALOR_DP'] . '|'.
$row['ES_CAPITA'] . '|'.
 "\n";
 }
oci_close($c);

?>