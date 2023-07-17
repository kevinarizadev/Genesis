<?php
//Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Buscar_Ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_OBTENER_IPS_PGP(:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->Coinc);
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

function P_AUTORIZACIONES_PRODUCTOS_PGP()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_AUTORIZACIONES_PRODUCTOS_PGP(	:v_panno,
																							:v_pperiodo,
																							:v_pnit,
																							:v_pregimen,
																							:v_pjson_out,
																							:v_presultado); end;');
	oci_bind_by_name($consulta, ':v_panno', $request->v_panno);
	oci_bind_by_name($consulta, ':v_pperiodo', $request->v_pperiodo);
	oci_bind_by_name($consulta, ':v_pnit', $request->v_pnit);
	oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
    $cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_presultado", $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);

  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}

