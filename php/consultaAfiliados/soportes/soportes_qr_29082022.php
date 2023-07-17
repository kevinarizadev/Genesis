<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Obtener_Codigo()
{
    require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tic.p_valida_datos_certificados( :v_proceso,:v_usuario,:v_json,:v_resp);end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_proceso', $request->v_proceso);
	oci_bind_by_name($consulta, ':v_usuario', $request->v_usuario);
	oci_bind_by_name($consulta, ':v_json', $request->v_json_datos);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_resp', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}