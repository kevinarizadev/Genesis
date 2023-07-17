<?php

require_once('../../php/config/dbcon_prod.php');
header("Content-Type: text/plain");
header("Content-Disposition: attachment; filename=Reporte"."_".$_GET['nombrereporte'] . "_" . date("d_m_Y") . ".txt");

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$seccional = $_GET['seccional'];
$tipo = $_GET['tipo'];
$empresa = 1;

 $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_REPORTE_AUT_REGIONAL_2023(:v_pempresa,:v_pfecha_inicio,:v_pfecha_final,:v_pseccional,:v_ptipo,:v_presponse); end;');
 oci_bind_by_name($consulta, ':v_pempresa', $empresa);
 oci_bind_by_name($consulta, ':v_pfecha_inicio', $fecha_inicio);
 oci_bind_by_name($consulta, ':v_pfecha_final', $fecha_fin);
 oci_bind_by_name($consulta, ':v_pseccional', $seccional);
 oci_bind_by_name($consulta, ':v_ptipo', $tipo);

$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presponse", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();
                     echo 'ANNO'.'|'.
                        'PERIODO'.'|'.
                        'DIA'.'|'.
                        'NUMERO_AUTORIZACION'.'|'.
                        'NIT'.'|'.
                        'NOMBRE_NIT'.'|'.
                        'AFIN_UBICACION_GEOGRAFICA'.'|'.
                        'TIPO DOCUMENTO'.'|'.
                        'DOCUMENTO'.'|'.
                        'NOMBREDE_AFILIADO'.'|'.
                        'RENGLON'.'|'.
                        'CODIGO_PRODUCTO'.'|'.
                        'NOMBRE_PRODUCTO'.'|'.
                        'VALOR'.'|'.
                        'CANTIDAD'.'|'.
                        'TOTAL'.'|'.
                        'DOCUMENTO_RESPONSABLE'.'|'.
                        'RESPONSABLE'.'|';
                        echo "\n";

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{
          echo     $row['ANNO']. '|'.
                        $row['PERIODO']. '|'.
                          $row['DIA']. '|'.
                        $row['AUTN_AUTORIZACION_MANUAL']. '|'.
                        $row['NIT']. '|'.
                        $row['RAZON_SOCIAL']. '|'.
                        $row['AFIN_UBICACION_GEOGRAFICA']. '|'.
                        $row['AUTC_TIPO_DOC_AFILIADO']. '|'.
                        $row['AUTC_AFILIADO']. '|'.
                        $row['AFIC_PRIMER_NOMBRE']. '|'.
                        $row['AUDN_RENGLON']. '|'.
                        $row['AUDC_PRODUCTO']. '|'.
                        $row['PROC_NOMBRE']. '|'.
                        $row['AUDV_VALOR']. '|'.
                        $row['AUDV_CANTIDAD']. '|'.
                        $row['VALOR_SERVICIO']. '|'.
                        $row['RESPONSABLE']. '|'.
                        $row['NOM_RESPONSABLE']. '|'."\n";
       
 }
oci_close($c);

?>















