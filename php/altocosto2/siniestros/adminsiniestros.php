<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
	global $request;
	if ($request->ftp == 1) {
		require_once('../../config/ftpcon.php');
	} else {
		require_once('../../config/sftp_con.php');
	}

	$file_size = ftp_size($con_id, $request->ruta);
	if ($file_size != -1) {
		// $name = uniqid();
		$name = explode(".", (explode("/", $request->ruta)[6]))[0];
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../../temp/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
			echo $name;
		} else {
			echo "Error";
		}
		ftp_close($con_id);
		fclose($handle);
	} else {
		echo "Error";
	}
}


function Obtener_Cohortes()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTADO_COHORTES(:v_pdocumento,:v_pjson_out); end;');
	$Doc = 'AL';
	// oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $Doc);
	// oci_bind_by_name($consulta, ':v_pjson_clase', $json2, 400000);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
		// echo '{"Clases":' . $json2 . ', "Cohortes":' . $json . '}';
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obtener_Diags()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.p_listar_diagnostico_detalle(:v_pdocumento,:v_pconcepto,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
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

function In_Ac_Diag()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.p_anular_diagnostico(:v_pdiagno,:v_pconcepto,:v_pclase,:v_pestado,:v_pdocumento,:v_puser,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdiagno', $request->Diag);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Patologia);
	oci_bind_by_name($consulta, ':v_pclase', $request->Clase);
	oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Con);
	oci_bind_by_name($consulta, ':v_puser', $request->Ced);
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
function Traza_Diag()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_TRAZA_SINIESTRO3(:v_pdocumento,:v_pconcepto,:v_pclase,:v_pdiagnostico,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Con);
	oci_bind_by_name($consulta, ':v_pclase', $request->Clase);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->Diag);
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

function Busqueda_Diags()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTADO_DIAGNOSTICO_GNRAL(:v_pdiagno,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pdiagno', $request->Con);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Inserta_Diags()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_INSERTA_DIAGNOSTICO(:v_pjson_row_in,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->data);
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

function Obtener_Funcs()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_USUARIOS_GESTION_ALTOCOSTO(:v_pjson_row); end;');
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

function Buscar_Func()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSULTA_USUARIOS(:v_pfuncionario,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pfuncionario', $request->Con);
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

function Guardar_Func()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTIVAR_USUARIOS_AC(:v_presponsable,:v_pfuncionario,:v_pcohorte,:v_origenf,:v_paccion,
	:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Resp);
	oci_bind_by_name($consulta, ':v_pfuncionario', $request->Func);
	oci_bind_by_name($consulta, ':v_pcohorte', $request->Coh);
	oci_bind_by_name($consulta, ':v_origenf', $request->Origen);
	oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
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