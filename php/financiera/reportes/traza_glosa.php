<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Traza_glosa.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

$tercero = $_GET['tercero']; //08

//var_dump($_GET);
$consulta = oci_parse($c,"select documento_fs, numero_fs, ubicacion_fs, facf_fecha_fs, concepto_fs, valor_fs, cuenta_fs,    
facv_tercero, trim(replace(replace(facc_factura,chr(10),''),chr(13),'')) facc_factura, trim(replace(replace(FACC_PREFIJO,chr(10),''),chr(13),'')) FACC_PREFIJO, FACN_FACTURA2,
documento_fd, numero_fd, ubicacion_fd, facf_fecha_fd, concepto_fd,  
valor_fd, saldo_fd, cuenta_fd, valor_gi, valor_gl, valor_fl, valor_fn     
from r_traza_glo
where ((facv_tercero = :tercero) or (0 = :tercero))");

oci_bind_by_name($consulta,':tercero',$tercero);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

oci_execute($consulta);
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();

	echo 	'DOCUMENTO_FS'.'|'.
            'NUMERO_FS'.'|'.
            'UBICACION_FS'.'|'.
            'FECHA_FS'.'|'.            
            'CONCEPTO_FS'.'|'.
            'VALOR_FS'.'|'.
            'CUENTA_FS'.'|'.
            'FACV_TERCERO'.'|'.
            'FACC_FACTURA'.'|'.
            'FACC_PREFIJO'.'|'.
            'FACN_FACTURA2'.'|'.
            'DOCUMENTO_FD'.'|'.
            'NUMERO_FD'.'|'.
            'UBICACION_FD'.'|'.
            'FECHA_FD'.'|'.
            'CONCEPTO_FD'.'|'.
            'VALOR_FD'.'|'.
            'SALDO_FD'.'|'.
            'CUENTA_FD'.'|'.
            'VALOR_GI'.'|'.
            'VALOR_GL'.'|'.
            'VALOR_FL'.'|'.
            'VALOR_FN';

echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	echo 	$rows['DOCUMENTO_FS']. '|' .
            $rows['NUMERO_FS']. '|' .
            $rows['UBICACION_FS']. '|' .
            $rows['FACF_FECHA_FS']. '|' .
            $rows['CONCEPTO_FS']. '|' .
            $rows['VALOR_FS']. '|' .
            $rows['CUENTA_FS']. '|' .
            $rows['FACV_TERCERO']. '|' .
            $rows['FACC_FACTURA']. '|' .            
            $rows['FACC_PREFIJO']. '|' .
            $rows['FACN_FACTURA2']. '|' .
            $rows['DOCUMENTO_FD']. '|' .
            $rows['NUMERO_FD']. '|' .
            $rows['UBICACION_FD']. '|' .
            $rows['FACF_FECHA_FD']. '|' .
            $rows['CONCEPTO_FD']. '|' .
            $rows['VALOR_FD']. '|' .
            $rows['SALDO_FD']. '|' .
            $rows['CUENTA_FD']. '|' .
            $rows['VALOR_GI']. '|' .
            $rows['VALOR_GL']. '|' .
            $rows['VALOR_FL']. '|' .
            $rows['VALOR_FN']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
