<?php
require_once('../config/dbcon_prod.php');
header("Content-Type: text/plain");
header("Content-Disposition: attachment; filename=Reporte Gestion Cargue"."_".date("dmY").".txt");

$v_pinicial = $_GET['v_pinicial'];
$v_pfinal = $_GET['v_pfinal'];


$consulta = oci_parse ($c,"SELECT S.SDCC_TIPO_DOC_AFILIADO TIPO_AFIL, 
                                 S.SDCC_AFILIADO DOCAFIL, 
                                 E.AFIC_PRIMER_APELLIDO PRIAPELL,
                                 E.AFIC_SEGUNDO_APELLIDO SEGAPELL, 
                                 E.AFIC_PRIMER_NOMBRE PRINOM, 
                                 E.AFIC_SEGUNDO_NOMBRE SEGNOMBRE,
                                 TO_CHAR(E.AFIF_NACIMIENTO,'dd/mm/yyyy') FECNAC, 
                                 E.AFIC_SEXO SEXO, 
                                 E.AFIN_UBICACION_GEOGRAFICA CODDPTOMUNI,
                                 S.SDCN_TIPO_DOCUMENTAL TIPO_DOCUMENTAL,
                                 T.TIDC_NOMBRE TIPOSOPORTE,       S.SDCC_ESTADO ESTADO,
                                 CASE   WHEN S.SDCC_ESTADO='S' THEN 'POR REVISAR'
                                        WHEN S.SDCC_ESTADO='R' THEN 'RECHAZADO'
                                        WHEN S.SDCC_ESTADO='A' THEN 'APROBADO' ELSE 'VERIFICAR' END ESTADOSOPORTE,
                                 TO_CHAR(S.SDCF_FECHA_ADJUNTO,'dd/mm/yyyy') FECHAREGISTRO,
                                 S.SDCC_OBSERVACIONES OBSERVACIONES,
                                 S.SDCC_RUTA RUTA,
                                 E.AFIC_TIPO_DOC_CABEZA TIPO_DOC_CAB,
                                 E.AFIC_DOCUMENTO_CABEZA DOC_CABEZA,
                                 CASE   WHEN E.AFIC_TIPO='F' THEN 'CABEZA FAMILIA'
                                        WHEN E.AFIC_TIPO='O' THEN 'BENEFICIARIO' ELSE 'VERIFICAR' END AFIC_TIPO,
                                 B.TERC_NOMBRE RESPONSABLE_CARGUE,
                                 BR.TERC_NOMBRE RESPONSABLE_REVISION
                        FROM ESDC_SOPORTE_DOC S 
                        INNER JOIN ETID_TIPO_DOCUMENTAL T ON S.SDCN_TIPO_DOCUMENTAL = T.TIDN_CODIGO
                        LEFT JOIN EAFI_AFILIADO E ON S.SDCC_TIPO_DOC_AFILIADO = E.AFIC_TIPO_DOCUMENTO AND S.SDCC_AFILIADO = E.AFIC_DOCUMENTO
                        LEFT JOIN BTER_TERCERO B ON B.TERV_CODIGO = S.SDCV_RESPONSABLE
                        LEFT JOIN BTER_TERCERO BR ON BR.TERV_CODIGO = S.SDCV_RESPONSABLE_REVISION
                        WHERE S.SDCF_FECHA_ADJUNTO BETWEEN :v_pinicial AND :v_pfinal");


oci_bind_by_name($consulta,':v_pinicial',$v_pinicial);
oci_bind_by_name($consulta,':v_pfinal',$v_pfinal);


oci_execute($consulta);
$row = array();
              echo   'TIPO_AFIL'.'|'.
                     'DOCAFIL'.'|'.
                     'PRIAPELL'.'|'.
                     'SEGAPELL'.'|'.
                     'PRINOM'.'|'.
                     'SEGNOMBRE'.'|'.
                     'FECNAC'.'|'.
                     'SEXO'.'|'.
                     'CODDPTOMUNI'.'|'.
                     'TIPO_DOCUMENTAL'.'|'.
                     'TIPOSOPORTE'.'|'.
                     'ESTADO'.'|'.
                     'ESTADOSOPORTE'.'|'.
                     'FECHAREGISTRO'.'|'.
                     'OBSERVACIONES'.'|'.
                     'RUTA'.'|'.
                     'TIPO_DOC_CAB'.'|'.
                     'DOC_CABEZA'.'|'.
                     'AFIC_TIPO'.'|'.
                     'RESPONSABLE_CARGUE'.'|'.
                     'RESPONSABLE_REVISION';
;
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
                echo  $rows['TIPO_AFIL']. '|' .
                      $rows['DOCAFIL']. '|' .
                      $rows['PRIAPELL']. '|' .
                      $rows['SEGAPELL']. '|' .
                      $rows['PRINOM']. '|' .
                      $rows['SEGNOMBRE']. '|' .
                      $rows['FECNAC']. '|' .
                      $rows['SEXO']. '|' .
                      $rows['CODDPTOMUNI']. '|' .
                      $rows['TIPO_DOCUMENTAL']. '|' .
                      $rows['TIPOSOPORTE']. '|' .
                      $rows['ESTADO']. '|' .
                      $rows['ESTADOSOPORTE']. '|' .
                      $rows['FECHAREGISTRO']. '|' .
                      $rows['OBSERVACIONES']. '|' .
                      $rows['RUTA']. '|' .
                      $rows['TIPO_DOC_CAB']. '|' .
                      $rows['DOC_CABEZA']. '|' .
                      $rows['AFIC_TIPO']. '|' .
                      $rows['RESPONSABLE_CARGUE']. '|' .
                      $rows['RESPONSABLE_REVISION']."\n";
}
oci_close($c);

?>















