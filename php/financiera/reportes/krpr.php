<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="krpr.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$anno = $_GET['ann']; //08
$per = $_GET['per']; //2017
//$reg = $_GET['reg']; //2017

if(isset($_GET['reg'])){
if ($_GET['reg'] == 'S'){$reg = 'N';}
if ($_GET['reg'] == 'C'){$reg = 'S';}

$sql = "select saln_empresa,saln_periodo,saln_anno,padre salv_cuenta,cuec_nombre,cuev_orden,cuen_nivel,a.cuec_abc,cuec_naturaleza,cuec_tipo,
(sum(saldo)-sum(Debito)+sum(Credito)) salv_saldo_ant, sum(a.Debito) salv_debito, sum(a.Credito) salv_credito,sum(a.saldo) salv_saldo
from kview_krpr_saldos a,bcue_cuenta,semp_empresa
where padre = cuev_codigo
and saln_plan = cuen_plan
and saln_empresa = empn_codigo
and cuec_tipo <> 'P'
and saln_empresa = 1
and saln_periodo = :periodo
and saln_anno = :anno
and a.cuec_abc = :regimen
group by a.saln_empresa,a.saln_periodo,a.saln_anno,a.padre,cuec_nombre,cuev_orden,cuen_nivel,a.cuec_abc,cuec_naturaleza,cuec_tipo
order by cuev_orden,a.padre";

$consulta = oci_parse($c,$sql);

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
oci_bind_by_name($consulta,':regimen',$reg);
//echo $sql;
oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
echo  'SALN_EMPRESA'.'|'.
			'SALN_PERIODO'.'|'.
			'SALN_ANNO'.'|'.
			'SALV_CUENTA'.'|'.
			'CUEC_NOMBRE'.'|'.
			'CUEV_ORDEN'.'|'.
			'CUEN_NIVEL'.'|'.
			'CUEC_ABC'.'|'.
			'CUEC_NATURALEZA'.'|'.
			'CUEC_TIPO'.'|'.
			'SALV_SALDO_ANTS'.'|'.
			'SALV_DEBITO'.'|'.
			'SALV_CREDITO'.'|'.
			'SALV_SALDO';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['SALN_EMPRESA']. '|' .
				$rows['SALN_PERIODO']. '|' .
				$rows['SALN_ANNO']. '|' .
				$rows['SALV_CUENTA']. '|' .
				$rows['CUEC_NOMBRE']. '|' .
				$rows['CUEV_ORDEN']. '|' .
				$rows['CUEN_NIVEL']. '|' .
				$rows['CUEC_ABC']. '|' .
				$rows['CUEC_NATURALEZA']. '|' .
				$rows['CUEC_TIPO']. '|' .
				$rows['SALV_SALDO_ANT']. '|' .
				$rows['SALV_DEBITO']. '|' .
				$rows['SALV_CREDITO']. '|' .
				$rows['SALV_SALDO']. '|' ."\n";
 }
}else{

$sql = "select saln_empresa, saln_periodo, saln_anno, salv_cuenta, cuec_nombre, cuec_naturaleza,
cuen_nivel, salv_anterior, salv_debito, salv_credito, salv_saldo, cuev_orden,
cuec_codigo_antiguo, cuec_imputable, proc_nombre, cuec_abc
from kview_saldo_cuenta, bcue_cuenta, spro_programa, semp_empresa
where  salv_cuenta = cuev_codigo
and saln_plan = cuen_plan
and saln_empresa = empn_codigo
and empn_plan = cuen_plan
and cuec_tipo <> 'P'
and proc_argumento = 'dw_r_krpr'
and saln_empresa = 1
and saln_periodo = :periodo
and saln_anno = :anno
order by cuev_orden asc, cuev_codigo asc";

$consulta = oci_parse($c,$sql);

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);

// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
echo  'SALN_EMPRESA'.'|'.
			'SALN_PERIODO'.'|'.
			'SALN_ANNO'.'|'.
			'SALV_CUENTA'.'|'.
			'CUEC_NOMBRE'.'|'.
			'CUEC_NATURALEZA'.'|'.
			'CUEN_NIVEL'.'|'.
			'SALV_ANTERIOR'.'|'.
			'SALV_DEBITO'.'|'.
			'SALV_CREDITO'.'|'.
			'SALV_SALDO'.'|'.
			'CUEV_ORDEN'.'|'.
			'CUEC_CODIGO_ANTIGUO'.'|'.
			'CUEC_IMPUTABLE'.'|'.
			'PROC_NOMBRE'.'|'.
			'CUEC_ABC';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['SALN_EMPRESA']. '|' .
				$rows['SALN_PERIODO']. '|' .
				$rows['SALN_ANNO']. '|' .
				$rows['SALV_CUENTA']. '|' .
				$rows['CUEC_NOMBRE']. '|' .
				$rows['CUEC_NATURALEZA']. '|' .
				$rows['CUEN_NIVEL']. '|' .
				$rows['SALV_ANTERIOR']. '|' .
				$rows['SALV_DEBITO']. '|' .
				$rows['SALV_CREDITO']. '|' .
				$rows['SALV_SALDO']. '|' .
				$rows['CUEV_ORDEN']. '|' .
				$rows['CUEC_CODIGO_ANTIGUO']. '|' .
				$rows['CUEC_IMPUTABLE']. '|' .
				$rows['PROC_NOMBRE']. '|' .
				$rows['CUEC_ABC']. '|' ."\n";
 }
}
//echo $sql;

 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
