<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
}


function Vista2_List_Facturas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_PRODUCTIVIDAD(:v_presponsable,:v_ptipo,:v_pfecha1,:v_pfecha2,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_ptipo', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pfecha1', $request->Fecha_Inicio);
	oci_bind_by_name($consulta, ':v_pfecha2', $request->Fecha_Fin);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

