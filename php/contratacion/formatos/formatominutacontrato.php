<?php
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_OBTENER_CONTRATO_MINUTA()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_CONTRATO_MINUTA(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

