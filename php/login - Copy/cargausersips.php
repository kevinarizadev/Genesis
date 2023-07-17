<?php
$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
require_once('../config/dbcon_prod.php');
global $request;
$consulta =  oci_parse($c,"SELECT trim(usuario) usuario FROM vw_usuario_ips WHERE nit = :nit");
oci_bind_by_name($consulta,':nit',$request->nit);
oci_execute($consulta);
$rows = array();while($row = oci_fetch_assoc($consulta))
{
$rows[] = $row;
}
echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
oci_close($c);
?>