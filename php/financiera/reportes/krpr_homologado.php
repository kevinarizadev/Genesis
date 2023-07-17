<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="krpr_homologado.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$anno = $_GET['ann']; //08
$per = $_GET['per']; //2017
$tip = $_GET['tip']; //2017

$sql = "select focn_empresa saln_empresa,
         focn_periodo saln_periodo,
         focn_anno saln_anno,
         focv_codigo salv_cuenta,
         cufc_nombre cuec_nombre,
         f_saldo_anterior(focn_empresa,focn_anno,focn_periodo,focv_codigo,focn_formato) salv_anterior,
         focv_debito salv_debito,
         focv_credito salv_credito,
         focv_valor salv_saldo,
	       cufn_nivel
    from kview_formato_cuenta,
         kcuf_cuenta_formato,
         semp_empresa
   where focn_empresa = empn_codigo
   and   focn_formato = cufn_formato
   and   focv_codigo = cufv_codigo
   and   focn_empresa = 1
   and   focn_periodo = :periodo
   and   focn_anno = :anno
   and   focn_formato = :formato
order by cufn_orden asc, cufv_codigo asc";

//echo $sql;

$consulta = oci_parse($c,$sql);

oci_bind_by_name($consulta,':anno',$anno);
oci_bind_by_name($consulta,':periodo',$per);
oci_bind_by_name($consulta,':formato',$tip);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
echo  'SALN_EMPRESA,'.'|'.
			'SALN_PERIODO,'.'|'.
			'SALN_ANNO,'.'|'.
			'SALV_CUENTA,'.'|'.
			'CUEC_NOMBRE,'.'|'.
			'SALV_ANTERIOR,'.'|'.
			'SALV_DEBITO,'.'|'.
			'ALV_CREDITO,'.'|'.
			'SALV_SALDO,'.'|'.
			'CUFN_NIVEL';
echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['SALN_EMPRESA']. '|' .
				$rows['SALN_PERIODO']. '|' .
				$rows['SALN_ANNO']. '|' .
				$rows['SALV_CUENTA']. '|' .
				$rows['CUEC_NOMBRE']. '|' .
				$rows['SALV_ANTERIOR']. '|' .
				$rows['SALV_DEBITO']. '|' .
				$rows['SALV_CREDITO']. '|' .
				$rows['SALV_SALDO']. '|' .
				$rows['CUFN_NIVEL']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
