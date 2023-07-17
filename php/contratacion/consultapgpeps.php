<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


function Hojas_Consultar_PGP()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_EPS_REGISTRO_PGP(:v_ptercero,:v_fecha_inicio,:v_fecha_fin,:v_ptipo_busqueda,
	:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Nit);
	oci_bind_by_name($consulta, ':v_fecha_inicio', $request->F_Inicio);
	oci_bind_by_name($consulta, ':v_fecha_fin', $request->F_Fin);
	oci_bind_by_name($consulta, ':v_ptipo_busqueda', $request->Tipo);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Num_Doc);
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

function Obtener_Ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_IPS_PGP(:v_pcoindicencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoindicencia', $request->Conc);
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
