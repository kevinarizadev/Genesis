<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="costo_menor_mayor.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

        //$PERIODO =$MES.'/'.$ANO;
        //echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$anno = $_GET['ann']; //08
$per = $_GET['per']; //2017
$reg = $_GET['reg']; //2017


if ($reg == 'S'){$reg = 'N'; $regimen = ' and (cuec_abc = :regimen) ';}
if ($reg == 'C'){$reg = 'S'; $regimen = ' and (cuec_abc = :regimen) ';}
if ($reg == 'X'){$reg = 'X'; $regimen = ' and ((cuec_abc = :regimen) or (1 = 1)) ';}

//var_dump($_GET);
$consulta = oci_parse($c,"select cc.satn_periodo, cc.satn_anno, cc.satv_cuenta, cc.satv_tercero, cc.cuec_nombre, cc.terc_nombre, regimen, satv_saldo,
dd.cudv_codigo niif_imptable,
substr(cudv_codigo,1,8) niif_8
from (select satn_periodo, satn_anno, satv_cuenta, satv_tercero, trim(replace(replace(cuec_nombre,chr(10),''),chr(13),'')) cuec_nombre,
trim(replace(replace(terc_nombre,chr(10),''),chr(13),'')) terc_nombre, case when cuec_abc = 'S' then 'Contributivo' else 'Subsidiado' end regimen, max(satv_saldo) satv_saldo
from kview_saldo_auxiliar_tercero
inner join bcue_cuenta bc on (satn_plan = cuen_plan and satv_cuenta = cuev_codigo)
inner join bter_tercero bt on (satv_tercero = terv_codigo)
where 1=1
and satn_empresa = 1
and (( satv_debito <> 0 ) or ( satv_credito <> 0 ) or ( satv_saldo <> 0) )
and substr(satv_cuenta,0,4) = 6165
and cuec_imputable = 'S'
and satn_anno = :anno
and satn_periodo = :periodo ".$regimen."
and satv_saldo <> 0
group by satn_periodo, satn_anno, satv_cuenta, satv_tercero, cuec_nombre, terc_nombre, cuec_abc) cc
left join (select dd.cudv_codigo, dd.cudv_inicial, dd.cudv_final
    from kcud_cuenta_detalle dd
    inner join kcuf_cuenta_formato kf on (dd.cudn_anno = kf.cufn_anno and
                                          dd.cudn_formato = kf.cufn_formato and
                                          dd.cudv_codigo = kf.cufv_codigo)
    where dd.cudn_formato = 2 and kf.cufc_imputable = 'S'
   ) dd on (satv_cuenta between cudv_inicial and cudv_final)");

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
oci_bind_by_name($consulta,':regimen',$reg);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
    echo    'SATN_PERIODO'.'|'.
        'SATN_ANNO'.'|'.
        'SATV_CUENTA'.'|'.
        'SATV_TERCERO'.'|'.
        'CUEC_NOMBRE'.'|'.
        'TERC_NOMBRE'.'|'.
        'REGIMEN'.'|'.
        'NIIF_IMPTABLE'.'|'.
        'NIIF_8'.'|'.
        'SATV_SALDO';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
    echo    $rows['SATN_PERIODO']. '|' .
        $rows['SATN_ANNO']. '|' .
        $rows['SATV_CUENTA']. '|' .
        $rows['SATV_TERCERO']. '|' .
        $rows['CUEC_NOMBRE']. '|' .
        $rows['TERC_NOMBRE']. '|' .
        $rows['REGIMEN']. '|' .
        $rows['NIIF_IMPTABLE']. '|' .
        $rows['NIIF_8']. '|' .
        $rows['SATV_SALDO']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
