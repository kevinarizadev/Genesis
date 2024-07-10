<?php
require_once('../config/sftp_con.php');
session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$db = $request->db;

if ($request->ori == true) {
	$day = date("dmY_His");
	$name = $request->typefile . '_' . $day . '_' . $request->constutela . '_' . uniqid() . '.' . $request->type;
	$file =  $request->file;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$base64 = base64_decode($file);
	file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
	$fecha = date("dmY");
	$ruta = $request->path . '/' . $fecha;
	require('../sftp_cloud/UploadFile.php');
	$subio = UploadFile($ruta, $name);
	if (substr($subio, 0, 11) == '/cargue_ftp') {
		$db($subio);
		// echo $subio;
	} else {
		echo json_encode((object) [
			'codigo' => -1,
			'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
		]);
	}
} else {
	$db('');
}


function STT01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;

	$tipo = $request->typefile;
	$fecha = isset($request->fecha_recibido) ? $request->fecha_recibido : null;
  $falloimpugnacionfc = ((isset($request->falloimpugnacionfc) ? $request->falloimpugnacionfc : null) == true) ? 'S' : 'N';

	$mediofisico = null;

  $seDioRespuestaTutela = isset($request->seDioRespuestaTutela) ? $request->seDioRespuestaTutela : null;
  $seDioRespuestaTutela_Motivo = isset($request->seDioRespuestaTutela_Motivo) ? $request->seDioRespuestaTutela_Motivo : null;
  $observacion_admision = isset($request->observacion_admision) ? $request->observacion_admision : null;
  $sancionar_decision = isset($request->sancionar_decision) ? $request->sancionar_decision : null;
  $marcaCumplimientoMensual = isset($request->checkCumplimientoMensual) ? $request->checkCumplimientoMensual : null;

  $CuantosDias = isset($request->CuantosDias) ? $request->CuantosDias : null;
  $ValorMulta = isset($request->ValorMulta) ? $request->ValorMulta : null;

  $RespuestaApertura = isset($request->chkRespuestaApertura) ? $request->chkRespuestaApertura : null;

  $v_json_vars = '{
    "v_fallo_impugnacion":"'.$falloimpugnacionfc.'",
    "v_sediorespuesta":"'.$seDioRespuestaTutela.'",
    "v_motivo_no_sediorespuesta":"'.$seDioRespuestaTutela_Motivo.'",
    "v_observacion_admision":"'.$observacion_admision.'",
    "v_sancionar_decision":"'.$sancionar_decision.'",
    "v_marcaCumplimientoMensual":"'.$marcaCumplimientoMensual.'",
    "v_cuantos_dias":"'.$CuantosDias.'",
    "v_valor_multa":"'.$ValorMulta.'",
    "v_respuesta_apertura":"'.$RespuestaApertura.'"
  }';

  // echo $v_json_vars;

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfisico,:v_json_vars,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $fecha);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);

	oci_bind_by_name($consulta, ':v_json_vars', $v_json_vars);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}


function uplRutaDb($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	//$tipo = '2';
	$fecha = '';
	if ($request->typefile == "14") {
		if ($request->fallo_seg == true) {
			$fecha = 'A';
		} else {
			$fecha = 'C';
		}
	}

  $falloimpugnacionfc = ((isset($request->falloimpugnacionfc) ? $request->falloimpugnacionfc : null) == true) ? 'S' : 'N';

  $v_json_vars = '{
    "v_fallo_impugnacion":"'.$falloimpugnacionfc.'",
    "v_sediorespuesta":"",
    "v_motivo_no_sediorespuesta":"",
    "v_observacion_admision":"",
    "v_sancionar_decision":""
  }';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfisico,:v_json_vars,:v_json_row); end;');

	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $fecha);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);

  oci_bind_by_name($consulta, ':v_json_vars', $v_json_vars);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}
function APRE01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$fecha = '';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_INS_DOC_APROBACION(:v_pnumero,
																								:v_pubicacion,
																								:v_ptipo,
																								:v_pfecha_recibido,
																								:v_parchivo,
																								:v_presponsable,
																								:v_observacion,
																								:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $fecha);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_observacion', $request->mensaje);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}


//Registro de Medios de Recepción CNVU
function GMREC($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	// $tipo = '3';
	$medio = ($request->medio == true) ? 'S' : 'N';

  $v_json_vars = '{
    "v_fallo_impugnacion":"",
    "v_sediorespuesta":"",
    "v_motivo_no_sediorespuesta":"",
    "v_observacion_admision":"",
    "v_sancionar_decision":""
  }';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfisico,:v_json_vars,:v_json_row); end;');

	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_reqpre);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfisico', $medio);


  oci_bind_by_name($consulta, ':v_json_vars', $v_json_vars);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}
//ESTADO DE TUTELA CNVU CC ABRIL 2021
function ET01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;

	$mediofisico = null;

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo_estado(:v_pnumero,
																				:v_pubicacion,
																				:v_ptipo,
																				:v_pfecha_recibido,
																				:v_pobservacion,
																				:v_pestado,
																				:v_parchivo,
																				:v_presponsable,
																				:v_pfisico,
																				:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);

	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_estadotutela);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}

function GOBS_ftp3()
{
	require_once('../config/sftp_con.php');
	$hoy = date("dmY");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$tmpfile = $request->typefile . '_' . $hoy . '_' . $request->constutela . '_' . uniqid() . '.' . $request->type;
	$b64img = $request->file;
	$path_of_storage = $request->path;
	list(, $b64img) = explode(';', $b64img);
	list(, $b64img) = explode(',', $b64img);
	$b64img = base64_decode($b64img);
	file_put_contents($tmpfile, $b64img);
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $path_of_storage) == TRUE) {
		$subio = @ftp_put($con_id, $path_of_storage . '/' . $tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			GOBS($path_of_storage . '/' . $tmpfile);
		} else {
			echo "0";
		}
	} else {
		if (ftp_mkdir($con_id, $path_of_storage)) {
			$subio = ftp_put($con_id, $path_of_storage . '/' . $tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				GOBS($path_of_storage . '/' . $tmpfile);
			} else {
				echo "0";
			}
		} else {
			echo "0";
		};
	}
	ftp_close($con_id);
	unlink($tmpfile);
}
//Registro de Observaciones Etapas CNVU
function GOBS($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo_observacion(:v_pnumero,
																							:v_pubicacion,
																							:v_ptipo,
																							:v_pobservacion,
																							:v_parchivo,
																							:v_presponsable,
																							:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}
function IANUL($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$falloimpugnacion = "";
	// echo ($_SESSION['codmunicipio']);
	// var_dump ($ruta);
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_nulidad_archivo(:v_pnumero,
																				 :v_pconsecutivo,
																				 :v_pubicacion,
																				 :v_ptipo,
																				 :v_pfecha_recibido,
																				 :v_parchivo,
																				 :v_presponsable,
																				 :v_pfallo_impugnacion,
																				 :v_pfisico,
																				 :v_pobservacion,
																				 :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->consnulidad);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_recepcion);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $request->impugnacion);
	oci_bind_by_name($consulta, ':v_pfisico', $request->medio);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	//var_dump($clob);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}
