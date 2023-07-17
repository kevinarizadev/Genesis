<?php
// Se abre la conexion a la base de datos 
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="RIPS_PRESTADOR.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$fecha_inicio = $_GET['fecha_inicio'];
		$fecha_final = $_GET['fecha_final'];
		$prestador = $_GET['prestador'];
		
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
$consulta = oci_parse($c,"SELECT * FROM R_TRAZA_RIPS_2017
                				   where fcdf_fecha between :fecha_inicio and :fecha_final      
                				   and nit = :prestador
								"
								);
// Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);
oci_bind_by_name($consulta,':prestador',$prestador);


oci_execute($consulta);	
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
echo 	'NIT PRESTADOR'.'|'.
		'RAZON SOCIAL'.'|'.
		'UBICACIÓN'.'|'.
		'TIPO DOCUMENTO AFILIADO'.'|'.
		'DOCUMENTO AFILIADO'.'|'.
		'FECHA NACIMIENTO'.'|'.
		'NOMBRE AFILIADO'.'|'.
		'EDAD'.'|'.
		'SEXO'.'|'.
		'COD MUNICIPIO'.'|'.
		'NOMBRE DPTO'.'|'.
		'NOMBRE MUNICIPIO'.'|'.
		'ZONA'.'|'.
		'RECIBO'.'|'.
		'NUM FACTURA'.'|'.
		'TIPO CONTRATO'.'|'.
		'NUMERO CONTRATO'.'|'.
		'FECHA INICIAL'.'|'.
		'FECHA FINAL'.'|'.
		'FECHA PRESTACION'.'|'.
		'FECHA EGRESO'.'|'.
		'ARCHIVO'.'|'.
		'NUMERO AUTORIZACION'.'|'.
		'FECHA AUTORIZACION'.'|'.
		'FINALIDAD'.'|'.
		'CAUSA EXTERNA'.'|'.
		'AMBITO'.'|'.
		'INGRESO'.'|'.
		'COD PRODUCTO'.'|'.
		'NOMBRE PRODUCTO'.'|'.
		'TIPO'.'|'.
		'POS'.'|'.
		'COD CLASIFICACION'.'|'.
		'NOMBRE CLASIFICACION'.'|'.
		'COD DX'.'|'.
		'COD DX1'.'|'.
		'NOMBRE DX'.'|'.
		'CANTIDAD'.'|'.
		'VALOR UNITARIO'.'|'.
		'VALOR TOTAL'.'|'.
		'MODALIDAD'.'|'.
		'NOMBRE GENERICO'.'|'.
		'DESTINO'.'|'.
		'SERVICIO'.'|'.
		'PRENATAL'.'|'.
		'SEXO NACIDO'.'|'.
		'COD HABILITACION';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo 	$rows['NIT']. '|' .
			$rows['TERC_NOMBRE']. '|' .
			$rows['FCDN_UBICACION']. '|' .
			$rows['AFIC_TIPO_DOCUMENTO']. '|' .
			$rows['AFIC_DOCUMENTO']. '|' .
			$rows['AFIF_NACIMIENTO']. '|' .
			$rows['AFIC_NOMBRE']. '|' .
			$rows['EDAD']. '|' .
			$rows['AFIC_SEXO']. '|' .
			$rows['AFIN_UBICACION_GEOGRAFICA']. '|' .
			$rows['DPTO']. '|' .
			$rows['CIUDAD']. '|' .
			$rows['AFIC_ZONA']. '|' .
			$rows['RECN_NUMERO']. '|' .
			$rows['FCDC_FACTURA']. '|' .
			$rows['TIPO_CONTRATO']. '|' .
			$rows['NUMERO_CONTRATO']. '|' .
			$rows['CNTF_INICIAL']. '|' .
			$rows['CNTF_FINAL']. '|' .
			$rows['FCDF_FECHA']. '|' .
			$rows['FCDF_FECHA1']. '|' .
			$rows['ARCHIVO']. '|' .
			$rows['AUTORIZACION']. '|' .
			$rows['AUTF_CONFIRMADO']. '|' .
			$rows['FCDC_FINALIDAD']. '|' .
			$rows['FCDC_CAUSA']. '|' .
			$rows['FCDC_AMBITO']. '|' .
			$rows['FCDC_INGRESO']. '|' .
			$rows['PROC_CODIGO']. '|' .
			$rows['PROC_NOMBRE']. '|' .
			$rows['PROC_TIPO']. '|' .
			$rows['PROC_POS']. '|' .
			$rows['PRON_CLASIFICACION']. '|' .
			$rows['CLAC_NOMBRE']. '|' .
			$rows['FCDC_DIAGNOSTICO']. '|' .
			$rows['FCDC_DIAGNOSTICO1']. '|' .
			$rows['DIAC_NOMBRE']. '|' .
			$rows['FCDV_CANTIDAD']. '|' .
			$rows['FCDV_PRECIO']. '|' .
			$rows['FCDV_TOTAL']. '|' .
			$rows['MODALIDAD']. '|' .
			$rows['FCDC_NOMBRE_GENERICO']. '|' .
			$rows['FCDC_DESTINO']. '|' .
			$rows['FCDC_SERVICIO']. '|' .
			$rows['FCDC_PRENATAL']. '|' .
			$rows['FCDC_SEXO_NACIDO']. '|' .
			$rows['RECC_PRESTADOR']. '|' .
			$rows['RECC_ENTIDAD']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>