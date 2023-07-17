<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Obtener_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ENCUESTA.P_LISTA_FUNCIONARIO(:v_pdoc_jefe,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdoc_jefe', $request->Cedula);
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

function Guardar_Respuesta()
{
	
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ENCUESTA.P_INSERTA_ENCUESTA(:v_pconse_encuestas,:v_pdoc_funcionario,
	:v_poficina,:v_parea,:v_pdoc_jefe,:v_prespuestas,:v_prespuestas_cant,:v_pobservacion_general,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pconse_encuestas', $request->Cons_encuesta);
	oci_bind_by_name($consulta, ':v_pdoc_funcionario', $request->Cedula_Func);
	oci_bind_by_name($consulta, ':v_poficina', $request->Oficina);
	oci_bind_by_name($consulta, ':v_parea', $request->Sede);
	oci_bind_by_name($consulta, ':v_pdoc_jefe', $request->Cedula_Jefe);
	oci_bind_by_name($consulta, ':v_prespuestas', $request->Preguntas);
	oci_bind_by_name($consulta, ':v_prespuestas_cant', $request->Cantidad_Preguntas);
	oci_bind_by_name($consulta, ':v_pobservacion_general', $request->Obs_General);
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


function subirArchivoFTP_Oracle($file, $path, $name, $ext)
{
	error_reporting(0);
	include('../../sftp_cloud/upload_file.php');

	$db_name = $path . $name . '.' . $ext;
	$tmpfile = $name . '.' . $ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);

	echo (upload_file($db_name,$tmpfile));
	
	unlink($tmpfile);
}


function descargaAdjunto()
{
	global $request;
	include('../../sftp_cloud/download_file.php');

	$name_file = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
	
	$local_file = '../../../temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo

	echo(download_file($request->ruta,$local_file));

}
