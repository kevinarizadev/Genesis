<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/txt');
header("Content-Disposition: attachment; filename=errores_cagueips"."_".date("dmY").".txt");


$nit = $_GET['nit'];
$proceso = $_GET['proceso'];

 $consulta = oci_parse($c,"SELECT  TIPO_DOCUMENTO, NUMERO_DOCUMENTO,
 listagg(codigo_regla,' || ') WITHIN GROUP (ORDER BY codigo_regla) ERRORES
FROM (SELECT TIPO_DOCUMENTO,
 NUMERO_DOCUMENTO,
 'V'||ERRORES codigo_regla
 FROM RES_ARCHIVO_ERR WHERE NIT=:nit and NUMERO_PROCESO =:proceso ) 
 group by  TIPO_DOCUMENTO, NUMERO_DOCUMENTO");

                oci_bind_by_name($consulta,':nit',$nit);     
                oci_bind_by_name($consulta,':proceso',$proceso);     



oci_execute($consulta);



$row = array();
echo 'TIPO_DOCUMENTO'.';'.
    'NUMERO_DOCUMENTO'.';'.
    'ERRORES'.';';
;
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
echo  $rows['TIPO_DOCUMENTO']. ';' .
$rows['NUMERO_DOCUMENTO']. ';' .
$rows['ERRORES']. ';' ."\n";
}
oci_close($c);

?>
