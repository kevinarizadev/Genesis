<?php
require_once('../config/sftp_con.php');
session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$db = $request->db;
// if ($request->ori == true) {
// 	$hoy = date("dmY");
// 	$tmpfile = $request->typefile.'_'.$hoy.'_'.$request->constutela.'_'.uniqid().'.'.$request->type;
// 	$b64img = $request->file;
// 	$path_of_storage = $request->path;
// 	list(, $b64img) = explode(';', $b64img);
// 	list(, $b64img) = explode(',', $b64img);
// 	$b64img = base64_decode($b64img);
// 	file_put_contents($tmpfile, $b64img);
// 	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/'.$path_of_storage) == TRUE) {
// 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
// 		if ($subio) {
// 			$db($path_of_storage.'/'.$tmpfile);
// 		}else{
// 			echo "0";
// 		}
// 	}else{
// 		if (ftp_mkdir($con_id, $path_of_storage)) {
// 			$subio=ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
// 			if ($subio) {
// 				$db($path_of_storage.'/'.$tmpfile);
// 			}else{
// 				echo "0";
// 			}
// 		} else {
// 			echo "0";
// 		};
// 	}
// 	ftp_close($con_id);
// 	unlink($tmpfile);
// }else{
// 	$db('');
// }
if ($request->ori == true) {
	$day = date("dmY_His");
	// $type='pdf';
	//$name= $request->typefile.'_'.$day.'_'.$request->constutela.'_'.uniqid().'.'.$type;
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



//Registro de tutela
function GTUT01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '1';
	$fecha = '';
	$mediofisico = null;

	$v_json_vars = '{
      "v_fallo_impugnacion":"",
      "v_sediorespuesta":"",
      "v_motivo_no_sediorespuesta":"",
      "v_observacion_admision":"",
      "v_sancionar_decision":""
  }';

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
//Recepcion de respuesta de tutela
function RRT01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '3';
	$falloimpugnacionfc = null;
	$mediofisico = null;
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
		:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_recepcion);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $request->seDioRespuestaTutela);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $request->seDioRespuestaTutela_Motivo);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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
// function uplRutaDb ($ruta){
// 	require_once('../config/dbcon.php');
// 	global $request;
// 	//$tipo = '2';
// 	$fecha = '';
// 	$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_json_row); end;');
// 	oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
// 	oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
// 	oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
// 	oci_bind_by_name($consulta,':v_pfecha_recibido',$fecha);
// 	oci_bind_by_name($consulta,':v_parchivo',$ruta);
// 	oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
// 	$ex = oci_execute($consulta,OCI_DEFAULT);
// 	if (!$ex) {
// 		echo oci_error($stid);
// 	}else{
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	}
// 	oci_close($c);
// }
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
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
		:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $fecha);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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
//Cumplimiento mensual
function CM01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '5';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_fechasegmen);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta, ':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta, ':v_psancionar_decision',$sancionar_decision);
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

//Fecha fallo impugnacion
function FLI01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$falloimpugnacionfc = ($request->falloimpugnacionfc == true) ? 'S' : 'N';
	$tipo = '6';
	$medio = null;
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	// $sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
	:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_fechafallimp);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $medio);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$request->decision);
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
//Fecha Requerimiento Previo
function RP01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '7';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_reqpre);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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

//Fecha Requerimiento Previo Respuesta
function RPR01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '8';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_reqpreres);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $request->sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $request->motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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

//Incidente de Desacato
function PID01($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '9';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';

	$sancionar_decision = '';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_proincdes);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta, ':v_pobservacion_admision', $request->observacion_admision);
	oci_bind_by_name($consulta, ':v_psancionar_decision', $sancionar_decision);
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

//Incidente de Desacato respuesta
function PID02($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '10';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_proincdesres);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $request->sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $request->motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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

//Fallo de incidente de Desacato Decision
function PID03($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '11';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';

	$observacion_admision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_fallincdes);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);

	oci_bind_by_name($consulta, ':v_pobservacion_admision', $observacion_admision);
	oci_bind_by_name($consulta, ':v_psancionar_decision', $request->sancionar_decision);
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
//Consulta incidente
function PID04($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '12';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_conincdes);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta, ':v_pobservacion_admision', $observacion_admision);
	oci_bind_by_name($consulta, ':v_psancionar_decision', $sancionar_decision);
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
//Cierre de incidente
function PID05($ruta)
{
	require_once('../config/dbcon.php');
	global $request;
	$tipo = '13';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_cieincdes);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $mediofisico);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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
	$falloimpugnacionfc = null;
	$medio = ($request->medio == true) ? 'S' : 'N';
	$sediorespuesta = '';
	$motivo_no_sediorespuesta = '';
	$observacion_admision = '';
	$sancionar_decision = '';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,
			:v_psediorespuesta,:v_pmotivo_no_sediorespuesta,:v_pobservacion_admision,:v_psancionar_decision,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->typefile);
	oci_bind_by_name($consulta, ':v_pfecha_recibido', $request->fecha_reqpre);
	oci_bind_by_name($consulta, ':v_parchivo', $ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfallo_impugnacion', $falloimpugnacionfc);
	oci_bind_by_name($consulta, ':v_pfisico', $medio);
	oci_bind_by_name($consulta, ':v_psediorespuesta', $sediorespuesta);
	oci_bind_by_name($consulta, ':v_pmotivo_no_sediorespuesta', $motivo_no_sediorespuesta);
	oci_bind_by_name($consulta,':v_pobservacion_admision',$observacion_admision);
	oci_bind_by_name($consulta,':v_psancionar_decision',$sancionar_decision);
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
	//$tipo = '48';
	$mediofisico  = null;
	// echo ($_SESSION['codmunicipio']);
	// echo ($_SESSION['cedula']);
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
	// oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
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
