<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function getGestionAfiliacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.p_mostrar_datos(:p_tipog,:p_finicio,:p_ffinal,:p_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':p_tipog', $request->p_tipog);
	oci_bind_by_name($consulta, ':p_finicio', $request->p_finicio);
	oci_bind_by_name($consulta, ':p_ffinal', $request->p_ffinal);
	oci_bind_by_name($consulta, ':p_documento', $request->p_documento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
