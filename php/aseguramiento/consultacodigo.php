<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();



    function Obtener_dato_codigo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.p_consulta_certificados(:V_PCODIGO,:V_RESP); end;');
	oci_bind_by_name($consulta, ':V_PCODIGO', $request->codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_RESP', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
    function Obtener_dato_afiliado()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.p_consulta_certificados2(:V_PTIPO_DOC,:V_PID_DOC,:V_RESP); end;');
	oci_bind_by_name($consulta, ':V_PTIPO_DOC', $request->tipodocumento);
	oci_bind_by_name($consulta, ':V_PID_DOC', $request->numerodocumento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_RESP', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

