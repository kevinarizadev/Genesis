<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Obtener_Roles()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_SUFICIENCIA.P_LISTA_ROL(:v_json_row); end;');
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

function Buscar_Usuario()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_SUFICIENCIA.P_OBTENER_FUNCIONARIO(:v_pid,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pid', $request->Cedula);
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

function Guardar_R_C_H()
{
	
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_SUFICIENCIA.P_UI_USUARIOS(:v_paccion,:v_prol,
	:v_pclave,:v_pusuario,:v_pdocumento,:v_phomologo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
	oci_bind_by_name($consulta, ':v_prol', $request->Rol);
	oci_bind_by_name($consulta, ':v_pclave', $request->Clave);
	oci_bind_by_name($consulta, ':v_pusuario', $request->Usu);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_phomologo', $request->Homologo);
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

