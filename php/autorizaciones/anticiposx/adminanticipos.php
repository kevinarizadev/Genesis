<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
	require_once('../../config/ftpcon.php');
	global $request;
	$file_size = ftp_size($con_id, $request->ruta);
	if ($file_size != -1) {
		$name = uniqid();
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

function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
}

function Obt_Control()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_USUARIO(:V_PCEDULA,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCEDULA', $request->Cedula);
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

function Base64()
{
	// require_once('../../config/dbcon_prod.php');
	global $request;
	$name = uniqid();
	$base_to_php = explode(',', $request->Base64);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".pdf";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".pdf");
}

function Baseimg()
{
	// require_once('../../config/dbcon_prod.php');
	global $request;
	$name = uniqid();
	$base_to_php = $request->Base64;
	$data = base64_decode($base_to_php);
	$filepath = "../../../temp/" . $name . ".jpeg";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".jpeg");
}

function strigToBinary($string)
{
	$characters = str_split($string);
	$binary = [];
	foreach ($characters as $character) {
		$data = unpack('H*', $character);
		$binary[] = base_convert($data[1], 16, 2);
	}
	return implode(' ', $binary);
}


function Obtener_Usuarios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_LISTAR_USUARIOS(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function In_Ac_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_ACTIVAR_INACTIVAR_USUARIO(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Modificar_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_MODIFICAR_USUARIO(:VP_CEDULA,:VP_CORREO,:VP_CREAR,:VP_SUBDIRECTOR_UBI,:VP_CARGO,:VP_UBICACION,:VP_RESPONSABLE,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	oci_bind_by_name($consulta, ':VP_CORREO', $request->Correo);
	oci_bind_by_name($consulta, ':VP_CREAR', $request->Crear);
	oci_bind_by_name($consulta, ':VP_SUBDIRECTOR_UBI', $request->Subdirector);
	oci_bind_by_name($consulta, ':VP_CARGO', $request->Cargo);
	oci_bind_by_name($consulta, ':VP_UBICACION', $request->Ubicacion);
	oci_bind_by_name($consulta, ':VP_RESPONSABLE', $request->Responsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Insertar_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_INSERTAR_USUARIO(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Consultar_Usuario_Nuevo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.CONSULTAR_USUARIO_NUEVO(:V_PCED,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCED', $request->ced);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Guardar_Firma()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$firma = strigToBinary($request->signature);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GUARDAR_FIRMA(:VP_CEDULA,:VP_SIGNATURE,:V_JSON_ROW); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->ced);
	oci_bind_by_name($consulta, ':VP_SIGNATURE', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($firma);
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

function Guardar_Codigo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GUARDAR_CODIGO(:V_PNUMERO,:VP_JSON_ANT,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
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

//////////////////////////////////////////////////////////OBTENER////////////////////////////////////////////////////



