<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function p_lista_autorizaciones_copago_cuota()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_FACTURACION.p_lista_autorizaciones_copago_cuota(:v_pnit,:v_pfechaini,:v_pfechafin,:v_result);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pfechaini', $request->vpfechaini);
	oci_bind_by_name($consulta, ':v_pfechafin', $request->vpfechafin);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function p_lista_fact_aut_copago_cuota()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_FACTURACION.p_lista_fact_aut_copago_cuota(:v_pnit,:v_pfechaini,:v_pfechafin,:v_result);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pfechaini', $request->vpfechaini);
	oci_bind_by_name($consulta, ':v_pfechafin', $request->vpfechafin);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
