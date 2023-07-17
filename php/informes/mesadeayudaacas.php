<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

function cosmesayudaacas(){
	require_once('../config/dbcon_prod.php');
	global $request;
 

	$consulta = oci_parse($c,"SELECT seccional,activo,procesado,rechazado,total
							  FROM view_pivot_gestion_mesa_ayuda_gn
							  where doc_responsable=:cedula");


oci_bind_by_name($consulta,':cedula',$_SESSION['cedula']);
oci_execute($consulta);
$rows = array();
while($row = oci_fetch_assoc($consulta))
{
$rows[] = $row;
}
echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
oci_close($c);
}


?>
