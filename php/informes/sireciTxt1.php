<?php

require_once('../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Sireci_'.$_GET['panno'].'_'.$_GET['ptrimestre'].'.txt"');

$anno      = $_GET['panno'];
$trimestre = $_GET['ptrimestre'];

$consulta = oci_parse($c,"select numero,
fila,
formulario_con_informacion,
justificacion,
numero_de_contrato,
to_char(fecha_suscripcion_contrato,'YYYY/MM/DD') fecha_suscripcion_contrato,
cantidad_de_veces_registrado_en_el_sireci,
clase_de_contrato,
describa_otra_clase_de_contrato,
objeto_del_contrato,
valor_inicial_del_contrato,
recursos_provienen_de_contrato,
entidad_de_donde_provienen,
entidad_de_donde_provienen_los_recursos,
contratista_naturaleza,
contratista_tipo_identificacion,
contratista_numero_de_cedula,
contratista_numero_del_nit,
contratista_digito_de_verificacion,
contratista_cedula_extranjeria,
contratista_nombre_completo,
tipo_de_seguimiento,
interventor_tipo_identificacion,
interventor_numero_de_cedula_o_rut,
interventor_numero_del_nit,
interventor_digito_de_verificacion,
interventor_cedula_extranjeria,
interventor_nombre_completo,
supervisor_tipo_identificacion,
supervisor_numero_de_cedula_o_rut,
supervisor_numero_del_nit,
supervisor_digito_de_verificacion,
supervisor_cedula_extranjeria,
supervisor_nombre_completo,
plazo_del_contrato,
anticipos_o_pago_anticipado,
anticipos_o_pago_anticipado_valor_total,
adiciones,
adiciones_valor_total,
adiciones_numero_de_dias,
to_char(fecha_inicio_contrato,'YYYY/MM/DD') fecha_inicio_contrato,
to_char(fecha_terminacion_contrato,'YYYY/MM/DD') fecha_terminacion_contrato,
to_char(fecha_liquidacion_contrato,'YYYY/MM/DD') fecha_liquidacion_contrato,
porcentaje_de_avance_fisico_programado,
porcentaje_de_avance_fisico_real,
porcentaje_avance_presupuestal_programado,
porcentaje_avance_presupuestal_real,
observaciones
from sireci_f5_2
where cnrn_anno = :panno
and cnrn_trimestre = :ptrimestre");

oci_bind_by_name($consulta,':panno',$anno);
oci_bind_by_name($consulta,':ptrimestre',$trimestre);

oci_execute($consulta);

$row = array();
echo 'NUMERO'.'|'.
     'FILA'.'|'.
     'FORMULARIO_CON_INFORMACION'.'|'.
     'JUSTIFICACION'.'|'.
     'NUMERO_DE_CONTRATO'.'|'.
     'FECHA_SUSCRIPCION_CONTRATO'.'|'.
     'CANTIDAD_DE_VECES_REGISTRADO_EN_EL_SIRECI'.'|'.
     'CLASE_DE_CONTRATO'.'|'.
     'DESCRIBA_OTRA_CLASE_DE_CONTRATO'.'|'.
     'OBJETO_DEL_CONTRATO'.'|'.
     'VALOR_INICIAL_DEL_CONTRATO_(EN_PESOS)'.'|'.
     'RECURSOS_PROVIENEN_DE_CONTRATO_O_CONVENIO_INTERADTIVO?'.'|'.
     'ENTIDAD_DE_DONDE_PROVIENEN_LOS_RECURSOS_NIT'.'|'.
     'ENTIDAD_DE_DONDE_PROVIENEN_LOS_RECURSOS_DIGITO_DE_VERIFICACION_DEL_NIT'.'|'.
     'CONTRATISTA_NATURALEZA'.'|'.
     'CONTRATISTA_TIPO_IDENTIFICACION'.'|'.
     'CONTRATISTA_NUMERO_DE_CEDULA_O_RUT'.'|'.
     'CONTRATISTA_NUMERO_DEL_NIT'.'|'.
     'CONTRATISTA_DIGITO_DE_VERIFICACION_(NIT_O_RUT)'.'|'.
     'CONTRATISTA_CEDULA_EXTRANJERIA'.'|'.
     'CONTRATISTA_NOMBRE_COMPLETO'.'|'.
     'TIPO_DE_SEGUIMIENTO'.'|'.
     'INTERVENTOR_TIPO_IDENTIFICACION'.'|'.
     'INTERVENTOR_NUMERO_DE_CEDULA_O_RUT'.'|'.
     'INTERVENTOR_NUMERO_DEL_NIT'.'|'.
     'INTERVENTOR_DIGITO_DE_VERIFICACION_(NIT_O_RUT)'.'|'.
     'INTERVENTOR_CEDULA_EXTRANJERIA'.'|'.
     'INTERVENTOR_NOMBRE_COMPLETO'.'|'.
     'SUPERVISOR_TIPO_IDENTIFICACION'.'|'.
     'SUPERVISOR_NUMERO_DE_CEDULA_O_RUT'.'|'.
     'SUPERVISOR_NUMERO_DEL_NIT'.'|'.
     'SUPERVISOR_DIGITO_DE_VERIFICACION_(NIT_O_RUT)'.'|'.
     'SUPERVISOR_CEDULA_EXTRANJERIA'.'|'.
     'SUPERVISOR_NOMBRE_COMPLETO'.'|'.
     'PLAZO_DEL_CONTRATO'.'|'.
     'ANTICIPOS_O_PAGO_ANTICIPADO'.'|'.
     'ANTICIPOS_O_PAGO_ANTICIPADO_VALOR_TOTAL'.'|'.
     'ADICIONES'.'|'.
     'ADICIONES_VALOR_TOTAL'.'|'.
     'ADICIONES_NUMERO_DE_DIAS'.'|'.
     'FECHA_INICIO_CONTRATO'.'|'.
     'FECHA_TERMINACION_CONTRATO'.'|'.
     'FECHA_LIQUIDACION_CONTRATO'.'|'.
     'PORCENTAJE_DE_AVANCE_FISICO_PROGRAMADO'.'|'.
     'PORCENTAJE_DE_AVANCE_FISICO_REAL'.'|'.
     'PORCENTAJE_AVANCE_PRESUPUESTAL_PROGRAMADO'.'|'.
     'PORCENTAJE_AVANCE_PRESUPUESTAL_REAL'.'|'.
     'OBSERVACIONES';
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
                echo  $rows['NUMERO']. '|' .
                      $rows['FILA']. '|' .
                      $rows['FORMULARIO_CON_INFORMACION']. '|' .
                      $rows['JUSTIFICACION']. '|' .
                      $rows['NUMERO_DE_CONTRATO']. '|' .
                      $rows['FECHA_SUSCRIPCION_CONTRATO']. '|' .
                      $rows['CANTIDAD_DE_VECES_REGISTRADO_EN_EL_SIRECI']. '|' .
                      $rows['CLASE_DE_CONTRATO']. '|' .
                      $rows['DESCRIBA_OTRA_CLASE_DE_CONTRATO']. '|' .
                      $rows['OBJETO_DEL_CONTRATO']. '|' .
                      $rows['VALOR_INICIAL_DEL_CONTRATO']. '|' .
                      $rows['RECURSOS_PROVIENEN_DE_CONTRATO']. '|' .
                      $rows['ENTIDAD_DE_DONDE_PROVIENEN']. '|' .
                      $rows['ENTIDAD_DE_DONDE_PROVIENEN_LOS_RECURSOS']. '|' .
                      $rows['CONTRATISTA_NATURALEZA']. '|' .
                      $rows['CONTRATISTA_TIPO_IDENTIFICACION']. '|' .
                      $rows['CONTRATISTA_NUMERO_DE_CEDULA']. '|' .
                      $rows['CONTRATISTA_NUMERO_DEL_NIT']. '|' .
                      $rows['CONTRATISTA_DIGITO_DE_VERIFICACION']. '|' .
                      $rows['CONTRATISTA_CEDULA_EXTRANJERIA']. '|' .
                      $rows['CONTRATISTA_NOMBRE_COMPLETO']. '|' .
                      $rows['TIPO_DE_SEGUIMIENTO']. '|' .
                      $rows['INTERVENTOR_TIPO_IDENTIFICACION']. '|' .
                      $rows['INTERVENTOR_NUMERO_DE_CEDULA_O_RUT']. '|' .
                      $rows['INTERVENTOR_NUMERO_DEL_NIT']. '|' .
                      $rows['INTERVENTOR_DIGITO_DE_VERIFICACION']. '|' .
                      $rows['INTERVENTOR_CEDULA_EXTRANJERIA']. '|' .
                      $rows['INTERVENTOR_NOMBRE_COMPLETO']. '|' .
                      $rows['SUPERVISOR_TIPO_IDENTIFICACION']. '|' .
                      $rows['SUPERVISOR_NUMERO_DE_CEDULA_O_RUT']. '|' .
                      $rows['SUPERVISOR_NUMERO_DEL_NIT']. '|' .
                      $rows['SUPERVISOR_DIGITO_DE_VERIFICACION']. '|' .
                      $rows['SUPERVISOR_CEDULA_EXTRANJERIA']. '|' .
                      $rows['SUPERVISOR_NOMBRE_COMPLETO']. '|' .
                      $rows['PLAZO_DEL_CONTRATO']. '|' .
                      $rows['ANTICIPOS_O_PAGO_ANTICIPADO']. '|' .
                      $rows['ANTICIPOS_O_PAGO_ANTICIPADO_VALOR_TOTAL']. '|' .
                      $rows['ADICIONES']. '|' .
                      $rows['ADICIONES_VALOR_TOTAL']. '|' .
                      $rows['ADICIONES_NUMERO_DE_DIAS']. '|' .
                      $rows['FECHA_INICIO_CONTRATO']. '|' .
                      $rows['FECHA_TERMINACION_CONTRATO']. '|' .
                      $rows['FECHA_LIQUIDACION_CONTRATO']. '|' .
                      $rows['PORCENTAJE_DE_AVANCE_FISICO_PROGRAMADO']. '|' .
                      $rows['PORCENTAJE_DE_AVANCE_FISICO_REAL']. '|' .
                      $rows['PORCENTAJE_AVANCE_PRESUPUESTAL_PROGRAMADO']. '|' .
                      $rows['PORCENTAJE_AVANCE_PRESUPUESTAL_REAL']. '|' .
                      $rows['OBSERVACIONES']."\n";
}
oci_close($c); 

?>
