<?php
require_once('../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reporte autorizacion qlik.txt"');

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$nit = $_GET['nit'];

 $consulta = oci_parse($c, 'begin pq_genesis_repo.p_archivo_autorizaciones_qlik(:v_ptercero,:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado); end;');
 oci_bind_by_name($consulta, ':v_ptercero', $nit);
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();
                     echo   'NUM_AUTORIZACION'.'|'.
                        'UBICACION_AUT'.'|'.
                        'SECCIONAL'.'|'.
                        'FECHA_CREACION'.'|'.
                        'FECHA_PROCESADO'.'|'.
                        'HORA_CONFIMADO'.'|'.
                        'FECHA_ORDEN'.'|'.
                        'NIT_PSS'.'|'.
                        'RAZON_SOCIAL'.'|'.
                        'NIT_SOLICITANTE'.'|'.
                        'UBICACION_TER'.'|'.
                        'RAZON_SOLIAL_IPS_SOLICITANTE'.'|'.
                        'TIPO_DOCUMENTO'.'|'.
                        'DOCUMENTO'.'|'.
                        'NOMBRE_AFILIADO'.'|'.
                        'FECHA_NACIMIENTO'.'|'.
                        'EDAD'.'|'.
                        'SEXO'.'|'.
                        'CODIGO_MUNICIPIO'.'|'.
                        'CODIGO_DPTO_AFILIADO'.'|'.
                        'NOMBRE_DPTO_AFILIADO'.'|'.
                        'MUNICIPIO_AFILIADO'.'|'.
                        'COD_CLASIFICACION'.'|'.
                        'NOMBRE_CLASIFICACION'.'|'.
                        'UNIDAD_FUNCIONAL'.'|'.
                        'COD_DX'.'|'.
                        'NOMBRE_DX'.'|'.
                        'COD_DX2'.'|'.
                        'ALTO_COSTO'.'|'.
                        'CLASE'.'|'.
                        'TIPO'.'|'.
                        'COD_PRODUCTO'.'|'.
                        'NOMBRE_PRODUCTO'.'|'.
                        'CANTIDAD'.'|'.
                        'VALOR_UNITARIO'.'|'.
                        'VALOR_SERVICIO'.'|'.
                        'COPAGO'.'|'.
                        'NIT_RECOBRAR'.'|'.
                        'NOMBRE_A_RECOBRAR'.'|'.
                        'DOC_RESPONSABLE_AUT'.'|'.
                        'NOMBRE_RESPONSABLE'.'|'.
                        'ESTADO'.'|'.
                        'AUTN_AUTORIZACION_MANUAL'.'|'.
                        'FECHA_SOLICITUD'.'|'.
                        'NIVEL_COMPLEJIDAD'.'|'.
                        'NIVEL_AUTORIZACION'.'|'.
                        'ANTICIPO'.'|'.
                        'AUTC_IMPRESO'.'|'.
                        'ALIADA'.'|'.
                        'UBICACION_SOLICITUD'.'|'.
                        'UBI_CONTRATO'.'|'.
                        'AUTN_SINIESTRO'.'|'.
                        'AUTC_REGIMEN'.'|'.
                        'PROC_COPAGO'.'|'.
                        'AUTN_NIVEL_CONTRIBUTIVO'.'|'.
                        'AUTN_NIVEL_SISBEN'.'|'.
                        'AMBITO'.'|'.
                        'PATOLOGIA'.'|'.
                        'TIPO_DE_CONTRATO'.'|'.
                        'AUTORIZACION_WEB'.'|'.
                        'FECHA_EJECUCION'.'|'.
                        'CONTRATO_PRESTACION'.'|'.
                        'UBICACION_CONTRATO'.'|'.
                        'FECHA_CONFIMADO'.'|'.
                        'NUMERO_SOLICITUD'.'|'.
                        'EPS_ANTERIOR'.'|'.
                        'EPS_ANTERIOR_NOMBRE'.'|'.
                        'FUENTE'.'|'.
                        'USUARIO_PORTABILIDAD'.'|'.
                        'FECHA_SALIDA'.'|'.
                        'CODIGO_MUNICIPIO_REC'.'|'.
                        'MUNICIPIO_RECEPCION'.'|'.
                        'SOLPROGRAMADA'.'|'.
                        'SOLESOA'.'|'.
                        'STATUS'.'|'.
                        'DOC_REALIZA_AUT'.'|'.
                        'NOMBRE_REALIZA_AUT'.'|'.
                        'DOC_ERRADO_EDAD'.'|'.
                        'SOLAUTOMATICA_NOPBS'.'|'.
                        'SOLUNICAHOSPITALARIA'.'|'.
                        'EXISTE_DETALLE_CONTRATO'.'|'.
                        'PRESUP_MAXIMOS'.'|'.
                        'MIPRES'.'|'.
                        'TIPO_AMBITO'.'|'.
                        'PROTECCION_LABORAL'.'|'.
                        'OFICINA_AUTORIZA'.'|'.
                        'GRUPO_POBLACIONAL'.'|'.
                        'DIAS_HABILES_ORDEN_VS_SOLICITUD'.'|'.
                        'DIAS_HABILES_SOLICITUD_VS_AUTORIZACION'.'|'.
                        'AUTC_TIENE_PGP'.'|'.
                        'MARCA_SUPER_EPS_LIQUIDADA'.'|';
                        echo "\n";

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{
    
          echo     $row['NUM_AUTORIZACION']. '|'.
                        $row['UBICACION_AUT']. '|'.
                          $row['SECCIONAL']. '|'.
                        $row['FECHA_CREACION']. '|'.
                        $row['FECHA_PROCESADO']. '|'.
                        $row['HORA_CONFIMADO']. '|'.
                        $row['FECHA_ORDEN']. '|'.
                        $row['NIT_PSS']. '|'.
                        $row['RAZON_SOCIAL']. '|'.
                        $row['NIT_SOLICITANTE']. '|'.
                        $row['UBICACION_TER']. '|'.
                        $row['RAZON_SOLIAL_IPS_SOLICITANTE']. '|'.
                        $row['TIPO_DOCUMENTO']. '|'.
                        $row['DOCUMENTO']. '|'.
                        $row['NOMBRE_AFILIADO']. '|'.
                        $row['FECHA_NACIMIENTO']. '|'.
                        $row['EDAD']. '|'.
                        $row['SEXO']. '|'.
                        $row['CODIGO_MUNICIPIO']. '|'.
                        $row['CODIGO_DPTO_AFILIADO']. '|'.
                        $row['NOMBRE_DPTO_AFILIADO']. '|'.
                        $row['MUNICIPIO_AFILIADO']. '|'.
                        $row['COD_CLASIFICACION']. '|'.
                        $row['NOMBRE_CLASIFICACION']. '|'.
                        $row['UNIDAD_FUNCIONAL']. '|'.
                        $row['COD_DX']. '|'.
                        $row['NOMBRE_DX']. '|'.
                        $row['COD_DX2']. '|'.
                        $row['ALTO_COSTO']. '|'.
                        $row['CLASE']. '|'.
                        $row['TIPO']. '|'.
                        $row['COD_PRODUCTO']. '|'.
                        $row['NOMBRE_PRODUCTO']. '|'.
                        $row['CANTIDAD']. '|'.
                        $row['VALOR_UNITARIO']. '|'.
                        $row['VALOR_SERVICIO']. '|'.
                        $row['COPAGO']. '|'.
                        $row['NIT_RECOBRAR']. '|'.
                        $row['NOMBRE_A_RECOBRAR']. '|'.
                        $row['DOC_RESPONSABLE_AUT']. '|'.
                        $row['NOMBRE_RESPONSABLE']. '|'.
                        $row['ESTADO']. '|'.
                        $row['AUTN_AUTORIZACION_MANUAL']. '|'.
                        $row['FECHA_SOLICITUD']. '|'.
                        $row['NIVEL_COMPLEJIDAD']. '|'.
                        $row['NIVEL_AUTORIZACION']. '|'.
                        $row['ANTICIPO']. '|'.
                        $row['AUTC_IMPRESO']. '|'.
                        $row['ALIADA']. '|'.
                        $row['UBICACION_SOLICITUD']. '|'.
                        $row['UBI_CONTRATO']. '|'.
                        $row['AUTN_SINIESTRO']. '|'.
                        $row['AUTC_REGIMEN']. '|'.
                        $row['PROC_COPAGO']. '|'.
                        $row['AUTN_NIVEL_CONTRIBUTIVO']. '|'.
                        $row['AUTN_NIVEL_SISBEN']. '|'.
                        $row['AMBITO']. '|'.
                        $row['PATOLOGIA']. '|'.
                        $row['TIPO_DE_CONTRATO']. '|'.
                        $row['AUTORIZACION_WEB']. '|'.
                        $row['FECHA_EJECUCION']. '|'.
                        $row['CONTRATO_PRESTACION']. '|'.
                        $row['UBICACION_CONTRATO']. '|'.
                        $row['FECHA_CONFIMADO']. '|'.
                        $row['NUMERO_SOLICITUD']. '|'.
                        $row['EPS_ANTERIOR']. '|'.
                        $row['EPS_ANTERIOR_NOMBRE']. '|'.
                        $row['FUENTE']. '|'.
                        $row['USUARIO_PORTABILIDAD']. '|'.
                        $row['FECHA_SALIDA']. '|'.
                        $row['CODIGO_MUNICIPIO_REC']. '|'.
                        $row['MUNICIPIO_RECEPCION']. '|'.
                        $row['SOLPROGRAMADA']. '|'.
                        $row['SOLESOA']. '|'.
                        $row['STATUS']. '|'.
                        $row['DOC_REALIZA_AUT']. '|'.
                        $row['NOMBRE_REALIZA_AUT']. '|'.
                        $row['DOC_ERRADO_EDAD']. '|'.
                        $row['SOLAUTOMATICA_NOPBS']. '|'.
                        $row['SOLUNICAHOSPITALARIA']. '|'.
                        $row['EXISTE_DETALLE_CONTRATO']. '|'.
                        $row['PRESUP_MAXIMOS']. '|'.
                        $row['MIPRES']. '|'.
                        $row['TIPO_AMBITO']. '|'.
                        $row['PROTECCION_LABORAL']. '|'.
                        $row['OFICINA_AUTORIZA']. '|'.
                        $row['GRUPO_POBLACIONAL']. '|'.
                        $row['DIAS_HABILES_ORDEN_VS_SOLICITUD']. '|'.
                        $row['DIAS_HABILES_SOLICITUD_VS_AUTORIZACION']. '|'.
                        $row['AUTC_TIENE_PGP']. '|'.
                        $row['MARCA_SUPER_EPS_LIQUIDADA']. '|'."\n";
       
 }
oci_close($c);

?>
