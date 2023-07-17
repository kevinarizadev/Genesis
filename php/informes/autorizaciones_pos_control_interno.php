<?php

require_once('../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="AUTORIZACIONES_POS_CONTROL_INTERNO'.$_GET['anno'].'_'.$_GET['periodo'].'.txt"');

$anno      = $_GET['anno'];
$periodo = $_GET['periodo'];

$consulta = oci_parse($c,"select a.num_autorizacion,a.ubicacion_aut,a.seccional,a.fecha_procesado,a.fecha_orden,a.nit_pss,a.razon_social,
a.nit_solicitante,a.tipo_documento,a.documento,a.fecha_nacimiento,a.edad,a.sexo,a.codigo_municipio,a.codigo_dpto_afiliado,
a.nombre_dpto_afiliado,a.municipio_afiliado,a.cod_clasificacion,a.nombre_clasificacion,a.unidad_funcional,a.cod_dx,a.nombre_dx,
a.cod_dx2,a.alto_costo,a.clase,a.tipo,a.cod_producto,a.nombre_producto,a.cantidad,a.valor_unitario,a.valor_servicio,
a.copago,a.estado,a.autn_autorizacion_manual,a.fecha_solicitud,a.año,a.mes,a.anticipo,a.autc_regimen,a.audc_tipo,a.ambito
FROM r_traza_aut a
WHERE nvl(a.status,'0') <> '5' AND
to_char(FECHA_PROCESADO,'yyyy') IN :anno AND
to_char(FECHA_PROCESADO,'mm') = '0'||:periodo AND
a.clase = 'P' AND a.alto_costo <> 'S'");

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$periodo);

oci_execute($consulta);

$row = array();
echo 'NUM_AUTORIZACION'.'|'.
     'UBICACION_AUT'.'|'.
     'SECCIONAL'.'|'.
     'FECHA_PROCESADO'.'|'.
     'FECHA_ORDEN'.'|'.
     'NIT_PSS'.'|'.
     'RAZON_SOCIAL'.'|'.
     'NIT_SOLICITANTE'.'|'.
     'TIPO_DOCUMENTO'.'|'.
     'DOCUMENTO'.'|'.
     'FECHA_NACIMIENTO'.'|'.
     'EDAD?'.'|'.
     'SEXO'.'|'.
     'CODIGO_MUNICIPIO'.'|'.
     'CODIGO_DPTO_AFILIADO'.'|'.
     'COD_CLASIFICACION'.'|'.
     'NOMBRE_CLASIFICACION'.'|'.
     'UNIDAD_FUNCIONAL'.'|'.
     'COD_DX(NIT_O_RUT)'.'|'.
     'NOMBRE_DX'.'|'.
     'COD_DX2'.'|'.
     'ALTO_COSTO'.'|'.
     'CLASE'.'|'.
     'TIPO'.'|'.
     'COD_PRODUCTO'.'|'.
     'NOMBRE_PRODUCTO(NIT_O_RUT)'.'|'.
     'CANTIDAD'.'|'.
     'VALOR_UNITARIO'.'|'.
     'VALOR_SERVICIO'.'|'.
     'COPAGO'.'|'.
     'ESTADO'.'|'.
     'AUTN_AUTORIZACION_MANUAL(NIT_O_RUT)'.'|'.
     'FECHA_SOLICITUD'.'|'.
     'AÑO'.'|'.
     'MES'.'|'.
     'ANTICIPO'.'|'.
     'AUTC_REGIMEN'.'|'.
     'AUDC_TIPO'.'|'.
     'AMBITO';
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
            echo $rows['NUM_AUTORIZACION'].'|'.
				$rows['UBICACION_AUT'].'|'.
				$rows['SECCIONAL'].'|'.
				$rows['FECHA_PROCESADO'].'|'.
				$rows['FECHA_ORDEN'].'|'.
				$rows['NIT_PSS'].'|'.
				$rows['RAZON_SOCIAL'].'|'.
				$rows['NIT_SOLICITANTE'].'|'.
				$rows['TIPO_DOCUMENTO'].'|'.
				$rows['DOCUMENTO'].'|'.
				$rows['FECHA_NACIMIENTO'].'|'.
				$rows['EDAD'].'|'.
				$rows['SEXO'].'|'.
				$rows['CODIGO_MUNICIPIO'].'|'.
				$rows['CODIGO_DPTO_AFILIADO'].'|'.
				$rows['COD_CLASIFICACION'].'|'.
				$rows['NOMBRE_CLASIFICACION'].'|'.
				$rows['UNIDAD_FUNCIONAL'].'|'.
				$rows['COD_DX'].'|'.
				$rows['NOMBRE_DX'].'|'.
				$rows['COD_DX2'].'|'.
				$rows['ALTO_COSTO'].'|'.
				$rows['CLASE'].'|'.
				$rows['TIPO'].'|'.
				$rows['COD_PRODUCTO'].'|'.
				$rows['NOMBRE_PRODUCTO'].'|'.
				$rows['CANTIDAD'].'|'.
				$rows['VALOR_UNITARIO'].'|'.
				$rows['VALOR_SERVICIO'].'|'.
				$rows['COPAGO'].'|'.
				$rows['ESTADO'].'|'.
				$rows['AUTN_AUTORIZACION_MANUAL'].'|'.
				$rows['FECHA_SOLICITUD'].'|'.
				$rows['AÑO'].'|'.
				$rows['MES'].'|'.
				$rows['ANTICIPO'].'|'.
				$rows['AUTC_REGIMEN'].'|'.
				$rows['AUDC_TIPO'].'|'.
				$rows['AMBITO']."\N";
}
oci_close($c); 

?>

