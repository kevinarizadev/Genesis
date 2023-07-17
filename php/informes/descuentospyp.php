<?php

require_once('../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Informe Salud Publica Descuentos.txt"');

$annos = $_GET['anno'];
$nit = $_GET['nit'];

$consulta = oci_parse($c,"SELECT TFC.FCDF_FECHA mes,
       TO_CHAR(TFC.FCDF_FECHA,'YYYY') AÑO,
       TO_CHAR(TFC.FCDF_FECHA,'MM') MES,
       T.TERC_NOMBRE AS RAZON_SOCIAL,
       NVL(T.TERV_CODIGO,0) AS NIT,
       tfc.fcdn_ubicacion cod_mun,
       b.ubgc_nombre municipio,
       TFC.FCDC_ARCHIVO,
       trim(TFC.FCDC_PRODUCTO) FCDC_PRODUCTO,
       P.PROC_NOMBRE,
       TFC.FCDC_FINALIDAD,
       TFC.FCDC_TIPO_DOC_AFILIADO,
       TFC.FCDC_AFILIADO,  
       A.AFIC_SEXO,
       A.AFIN_UBICACION_GEOGRAFICA municipio_afiliado,
       A.AFIF_NACIMIENTO FECHA_NTO,
      TRUNC(((TFC.FCDF_FECHA-A.AFIF_NACIMIENTO)/365),1)EDAD,
       TFC.FCDC_DIAGNOSTICO,D.DIAC_NOMBRE,
       TFC.FCDC_OBSERVACION,
       tfc.fcdc_codigo_actividad, 
      PP.NOMBRE,     
         TFC.FCDC_MARCA, 
          tfc.facn_contrato
          , c.cntc_concepto
FROM tfcd_factura_detalle TFC left JOIN BTER_TERCERO T ON T.TERV_CODIGO = TFC.FCDV_PROVEEDOR
                              left JOIN EAFI_AFILIADO A ON TRIM(A.AFIC_TIPO_DOCUMENTO) = TRIM(TFC.FCDC_TIPO_DOC_AFILIADO)
                                                        AND TRIM(A.AFIC_DOCUMENTO) = TRIM(TFC.FCDC_AFILIADO)
                              LEFT JOIN EPRO_PRODUCTO P ON (P.PROC_CODIGO) = TRIM(TFC.FCDC_PRODUCTO)
                              LEFT JOIN EDIA_DIAGNOSTICO D ON TRIM(D.DIAC_CODIGO) = TRIM(TFC.FCDC_DIAGNOSTICO)
                              LEFT JOIN rips_actividad PP ON pp.codigo =   tfc.fcdc_codigo_actividad
                              
                              left join bubg_ubicacion_geografica b on b.ubgn_codigo = tfc.fcdn_ubicacion 
                              left join ocnt_contrato c on c.cntn_numero =  tfc.facn_contrato
                           
WHERE TO_CHAR(TFC.FCDF_FECHA,'YYYY') = :anno
AND TFC.FCDV_PROVEEDOR = :nit");

oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':nit',$nit);

oci_execute($consulta);

$row = array();
                              echo 'MES'.'|'.
                                  'AÑO'.'|'.
                                  'MES'.'|'.
                                  'RAZON_SOCIAL'.'|'.
                                  'NIT'.'|'.
                                  'COD_MUN'.'|'.
                                  'MUNICIPIO'.'|'.
                                  'FCDC_ARCHIVO'.'|'.
                                  'FCDC_PRODUCTO'.'|'.
                                  'PROC_NOMBRE'.'|'.
                                  'FCDC_FINALIDAD'.'|'.
                                  'FCDC_TIPO_DOC_AFILIADO'.'|'.
                                  'FCDC_AFILIADO'.'|'.
                                  'AFIC_SEXO'.'|'.
                                  'MUNICIPIO_AFILIADO'.'|'.
                                  'FECHA_NTO'.'|'.
                                  'EDAD'.'|'.
                                  'FCDC_DIAGNOSTICO'.'|'.
                                  'DIAC_NOMBRE'.'|'.
                                  'FCDC_OBSERVACION'.'|'.
                                  'FCDC_CODIGO_ACTIVIDAD'.'|'.
                                  'NOMBRE'.'|'.
                                  'FCDC_MARCA'.'|'.
                                  'FACN_CONTRATO'.'|'.
                                  'CNTC_CONCEPTO';
;
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
                echo  $rows['MES']. '|' .
                      $rows['AÑO']. '|' .
                      $rows['MES']. '|' .
                      $rows['RAZON_SOCIAL']. '|' .
                      $rows['NIT']. '|' .
                      $rows['COD_MUN']. '|' .
                      $rows['MUNICIPIO']. '|' .
                      $rows['FCDC_ARCHIVO']. '|' .
                      $rows['FCDC_PRODUCTO']. '|' .
                      $rows['PROC_NOMBRE']. '|' .
                      $rows['FCDC_FINALIDAD']. '|' .
                      $rows['FCDC_TIPO_DOC_AFILIADO']. '|' .
                      $rows['FCDC_AFILIADO']. '|' .
                      $rows['AFIC_SEXO']. '|' .
                      $rows['MUNICIPIO_AFILIADO']. '|' .
                      $rows['FECHA_NTO']. '|' .
                      $rows['EDAD']. '|' .
                      $rows['FCDC_DIAGNOSTICO']. '|' .
                      $rows['DIAC_NOMBRE']. '|' .
                      $rows['FCDC_OBSERVACION']. '|' .
                      $rows['FCDC_CODIGO_ACTIVIDAD']. '|' .
                      $rows['NOMBRE']. '|' .
                      $rows['FCDC_MARCA']. '|' .
                      $rows['FACN_CONTRATO']. '|' .
                      $rows['CNTC_CONCEPTO']."\n";
}
oci_close($c);

?>
