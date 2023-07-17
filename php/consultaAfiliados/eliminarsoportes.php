<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function EliminarDocumento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_eliminar_anexos(:v_ruta,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_ruta',$request->ruta);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
?>