<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");

//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$anno = $_GET['ann']; //08
$per = $_GET['per']; //2017
$reg = $_GET['reg']; //2017
$tcu = $_GET['tcu']; //2017

switch ($tcu) {
	case '1';
		$nombre_tcu="Anticipo";
	break;
	case '2';
		$nombre_tcu="Glosa";
	break;
	case '3';
		$nombre_tcu="Autorizacion";
	break;
	case '4';
		$nombre_tcu="Cuentas_por_pagar";
	break;
	case '5';
		$nombre_tcu="Todas(Ant,Glo,Aut,CXP)";
	break;
	case '6';
		$nombre_tcu="Activos_y_Pasivos";
	break;
	case '7';
		$nombre_tcu="Estado_Resultado";
	break;
	case '8';
		$nombre_tcu="Presupuesto_Max_AUT";
	break;
	case '9';
		$nombre_tcu="Presupuesto_Max_CXP";
	break;

}
$nombre=$anno.'_'.$per.'_'.$nombre_tcu;
header('Content-Disposition: attachment; filename="'.$nombre.'.txt"');

if ($reg == 'S'){$reg = 'N'; $regimen = ' and (cuec_abc = :regimen) ';}
if ($reg == 'C'){$reg = 'S'; $regimen = ' and (cuec_abc = :regimen) ';}
if ($reg == 'X'){$reg = 'X'; $regimen = ' and ((cuec_abc = :regimen) or (1 = 1)) ';}
//var_dump($_GET);

//Anticipo
if ($tcu == '1'){ $cuenta = "'13300502', '13300501'";}
//Glosa
if ($tcu == '2'){ $cuenta = "'22052002', '22052001'";}
//AUTORIZACION
if ($tcu == '3'){ $cuenta = "'290505010101', '290505010102', '290505010103', '290505010104', '290505010105', '290505010106', '290505010107', '290505010108',
														 '290505020101', '290505020102', '290505020103', '290505020104', '290505020105', '290505020106', '290505020107', '290505020108'";}
//PRESUPUESTO MAXIMO POR AUT
if ($tcu == '8'){ $cuenta = "'2912030101', '2912030102', '2912030103', '2912030104', '2912030105','2912030201', '2912030202', '2912030203', '2912030204', '2912030205'";}
//PRESUPUESTO MAXIMO POR CXP
if ($tcu == '9'){ $cuenta = "'2913010101', '2913010102', '2913010103', '2913010104', '2913010105','2913010201', '2913010202', '2913010203', '2913010204', '2913010205'";}
//CUENTAS POR PAGAR
if ($tcu == '4'){ $cuenta = "'2905100103', '2905100104', '2905100202',
														 '290510010101', '290510010102', '290510010103', '290510010104', '290510010105', '290510010106', '290510010107', '290510010108',
														 '290510020101', '290510020102', '290510020103', '290510020104', '290510020105', '290510020106', '290510020107', '290510020108'";}

if ($tcu == '5'){$cuenta =	"'13300502', '13300501', '22052002', '22052001',
														 '290505010101', '290505010102', '290505010103', '290505010104', '290505010105', '290505010106', '290505010107', '290505010108',
														 '290505020101', '290505020102', '290505020103', '290505020104', '290505020105', '290505020106', '290505020107', '290505020108',
														 '2905100103', '2905100104', '2905100202',
														 '290510010101', '290510010102', '290510010103', '290510010104', '290510010105', '290510010106', '290510010107', '290510010108',
														 '290510020101', '290510020102', '290510020103', '290510020104', '290510020105', '290510020106', '290510020107','290510020108','2913010101', '2913010102', '2913010103', '2913010104', '2913010105','2913010201', '2913010202', '2913010203', '2913010204', '2913010205','2912030101', '2912030102', '2912030103', '2912030104', '2912030105','2912030201', '2912030202', '2912030203', '2912030204', '2912030205'";}

if ($tcu == '1' || $tcu == '2'|| $tcu =='3' || $tcu == '4' || $tcu =='5'|| $tcu =='8' || $tcu =='9'){
	$sql = "SELECT satn_periodo, satn_anno, satv_cuenta, satv_tercero, satv_debito, satv_credito, satv_saldo, satv_debito_base, satv_credito_base,
	satv_saldo_base, satn_empresa, trim(replace(replace(cuec_nombre,chr(10),''),chr(13),'')) cuec_nombre, trim(replace(replace(terc_nombre,chr(10),''),chr(13),'')) terc_nombre,
	cuec_tipo, cuev_codigo, cuev_orden
	FROM kview_saldo_auxiliar_tercero, bcue_cuenta, bter_tercero
	WHERE ( satv_cuenta = cuev_codigo )
	and   ( satv_tercero = terv_codigo )
	and   ( satn_plan = cuen_plan )
	and   ( ( satn_empresa = 1 ) AND ( ( satv_debito <> 0 ) OR ( satv_credito <> 0 ) OR ( satv_saldo <> 0) ) )
	and (((satn_periodo = :periodo)
	and satv_saldo <> 0
	and (satn_anno =  :anno)" .$regimen. " and (cuev_codigo in ($cuenta))))";

//echo $sql;

}elseif ($tcu == '6') {

	$sql = "SELECT satn_periodo, satn_anno, satv_cuenta, satv_tercero, satv_debito, satv_credito, satv_saldo, satv_debito_base, satv_credito_base,
	satv_saldo_base, satn_empresa, trim(replace(replace(cuec_nombre,chr(10),''),chr(13),'')) cuec_nombre, trim(replace(replace(terc_nombre,chr(10),''),chr(13),'')) terc_nombre,
	cuec_tipo, cuev_codigo, cuev_orden, cudv_codigo cuenta_niif
	FROM kview_saldo_auxiliar_tercero
  inner join bcue_cuenta on (satv_cuenta = cuev_codigo and satn_plan = cuen_plan)
  inner join bter_tercero on (satv_tercero = terv_codigo )
  left join kcud_cuenta_detalle on (cudn_formato = 2 and satv_cuenta between cudv_inicial and cudv_final)
  WHERE ( ( satn_empresa = 1 ) AND ( ( satv_debito <> 0 ) OR ( satv_credito <> 0 ) OR ( satv_saldo <> 0) ) )
  and (((satn_periodo = :periodo)
	and (satn_anno =  :anno)
	and (cuec_abc = :regimen)
	and cuec_imputable = 'S'
  and satv_saldo <> 0
	and (substr(cuev_codigo,1,1) in (1,2))))";

}elseif ($tcu == '7') {

	$sql = "SELECT satn_periodo, satn_anno, satv_cuenta, satv_tercero, satv_debito, satv_credito, satv_saldo, satv_debito_base, satv_credito_base,
	satv_saldo_base, satn_empresa, trim(replace(replace(cuec_nombre,chr(10),''),chr(13),'')) cuec_nombre, trim(replace(replace(terc_nombre,chr(10),''),chr(13),'')) terc_nombre,
	cuec_tipo, cuev_codigo, cuev_orden, cudv_codigo cuenta_niif
	FROM kview_saldo_auxiliar_tercero
  inner join bcue_cuenta on (satv_cuenta = cuev_codigo and satn_plan = cuen_plan)
  inner join bter_tercero on (satv_tercero = terv_codigo )
  left join kcud_cuenta_detalle on (cudn_formato = 2 and satv_cuenta between cudv_inicial and cudv_final)
  WHERE ( ( satn_empresa = 1 ) AND ( ( satv_debito <> 0 ) OR ( satv_credito <> 0 ) OR ( satv_saldo <> 0) ) )
  and (((satn_periodo = :periodo)
	and (satn_anno =  :anno)
	and (cuec_abc = :regimen)
	and cuec_imputable = 'S'
  and satv_saldo <> 0
	and (substr(cuev_codigo,1,1) in (4,5,6))))";

}
//echo $sql;
$consulta = oci_parse($c,$sql);

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
oci_bind_by_name($consulta,':regimen',$reg);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
$v_cabezado = 'SATN_PERIODO'.'|'.
							'SATN_ANNO'.'|'.
							'SATV_CUENTA'.'|'.
							'SATV_TERCERO'.'|'.
							'SATV_DEBITO'.'|'.
							'SATV_CREDITO'.'|'.
							'SATV_SALDO'.'|'.
							'SATV_DEBITO_BASE'.'|'.
							'SATV_CREDITO_BASE'.'|'.
							'SATV_SALDO_BASE'.'|'.
							'SATN_EMPRESA'.'|'.
							'CUEC_NOMBRE'.'|'.
							'TERC_NOMBRE'.'|'.
							'CUEC_TIPO'.'|'.
							'CUEV_CODIGO'.'|'.
							'CUEV_ORDEN';

if ($tcu == '1' || $tcu == '2'|| $tcu =='3' || $tcu == '4' || $tcu =='5' || $tcu =='8' || $tcu =='9'){
  echo $v_cabezado;
}elseif ($tcu == '6'|| $tcu =='7') {
	echo $v_cabezado.'|'.'CUENTA_NIIF';
}
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	$v_detalle =	$rows['SATN_PERIODO']. '|' .
								$rows['SATN_ANNO']. '|' .
								$rows['SATV_CUENTA']. '|' .
								$rows['SATV_TERCERO']. '|' .
								$rows['SATV_DEBITO']. '|' .
								$rows['SATV_CREDITO']. '|' .
								$rows['SATV_SALDO']. '|' .
								$rows['SATV_DEBITO_BASE']. '|' .
								$rows['SATV_CREDITO_BASE']. '|' .
								$rows['SATV_SALDO_BASE']. '|' .
								$rows['SATN_EMPRESA']. '|' .
								$rows['CUEC_NOMBRE']. '|' .
								$rows['TERC_NOMBRE']. '|' .
								$rows['CUEC_TIPO']. '|' .
								$rows['CUEV_CODIGO']. '|' .
								$rows['CUEV_ORDEN'];

	if ($tcu == '1' || $tcu == '2'|| $tcu =='3' || $tcu == '4' || $tcu =='5'|| $tcu =='7' || $tcu =='8'|| $tcu =='9'){
	  echo $v_detalle;
	}elseif ($tcu == '6'|| $tcu =='7') {
	  echo $v_detalle. '|' .$rows['CUENTA_NIIF'];
	}

	echo "\n";
}
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);
