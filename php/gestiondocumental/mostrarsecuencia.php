<?php
// Llamamos la conexion a la base de datos
require_once('../config/dbcon_prod.php');
 // Recibimos los parametros enviados desde servicio de consulta
$codigo_bodega =$_GET['codigo_bodega'];
$codigo_pasillo =$_GET['codigo_pasillo'];
$codigo_piso =$_GET['codigo_piso'];
$codigo_nivel =$_GET['codigo_nivel'];
// Preparamos la vista 
$consulta = oci_parse($c,"SELECT * from vw_sgdo_secuencia where codigobodega = :codigo_bodega 
						 and codigopasillo = :codigo_pasillo
						 and codigopiso =  :codigo_piso
						 and codigonivel = :codigo_nivel");

oci_bind_by_name($consulta,':codigo_bodega',$codigo_bodega);
oci_bind_by_name($consulta,':codigo_pasillo',$codigo_pasillo);
oci_bind_by_name($consulta,':codigo_piso',$codigo_piso);
oci_bind_by_name($consulta,':codigo_nivel',$codigo_nivel);
oci_execute($consulta);              
$rows = array();
while($row = oci_fetch_assoc($consulta))
{
	$rows[] = $row;
}
echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
oci_close($c);
?>
