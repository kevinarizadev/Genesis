<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="diferencias_aux_con.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$anno = $_GET['ann']; //08
$per = $_GET['per']; //2017

$sql = "select movn_empresa,saln_periodo,cuev_orden,salv_cuenta,
salv_debito,salv_credito,mvdc_naturaleza,sum(mvdv_valor) mvdv_valor,
(case mvdc_naturaleza when 'D' then salv_debito - sum(mvdv_valor) else sum(mvdv_valor) - salv_credito  end) diferencia
from kview_movimiento2,kview_saldo_cuenta, bper_periodo, bcue_cuenta
where movn_empresa =saln_empresa
and mvdv_cuenta =salv_cuenta
and mvdv_cuenta =cuev_codigo
and cuec_imputable ='S'
and saln_anno = :anno
and saln_periodo = :periodo
and saln_anno= pern_anno
and saln_periodo =pern_numero
and movf_fecha >=perf_inicial
and movf_fecha <=perf_final
and movc_estado ='P'
group by movn_empresa,saln_periodo,cuev_orden,salv_cuenta,salv_debito,salv_credito,mvdc_naturaleza
having (case mvdc_naturaleza when 'D' then salv_debito - sum(mvdv_valor) else salv_credito - sum(mvdv_valor) end) <>0
order by movn_empresa,saln_periodo,cuev_orden";

//echo $sql;

$consulta = oci_parse($c,$sql);

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
echo  'MOVN_EMPRESA'.'|'.
      'SALN_PERIODO'.'|'.
      'CUEV_ORDEN'.'|'.
      'SALV_CUENTA'.'|'.
      'SALV_DEBITO'.'|'.
      'SALV_CREDITO'.'|'.
      'MVDC_NATURALEZA'.'|'.
      'MVDV_VALOR'.'|'.
      'DIFERENCIA';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['MOVN_EMPRESA']. '|' .
        $rows['SALN_PERIODO']. '|' .
        $rows['CUEV_ORDEN']. '|' .
        $rows['SALV_CUENTA']. '|' .
        $rows['SALV_DEBITO']. '|' .
        $rows['SALV_CREDITO']. '|' .
        $rows['MVDC_NATURALEZA']. '|' .
        $rows['MVDV_VALOR']. '|' .
        $rows['DIFERENCIA']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
