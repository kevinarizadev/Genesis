<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function Obt_Area()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_OBTENER_AREA(:v_pjson_row); end;');
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

function Obt_Bitacoras()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_CONSULTA_BITACORA(:v_presponsable,:v_parea,:v_pjson_row); end;');
	oci_bind_by_name($consulta,':v_presponsable',$request->Ced);
	oci_bind_by_name($consulta,':v_parea',$request->Area);
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

function Guardar_Bitacora()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_INSERTAR_BITACORA(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_pjson_row_in',$request->xdata);
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

// PROCEDURE P_OBTENER_AREA(v_pjson_row out clob); para obtener las áreas

// PROCEDURE  P_INSERTAR_BITACORA(v_pjson_row_in in clob, v_pjson_row_out out clob  )
// v_proceso                                   :=json_value(v_pjson_row_in,'[0].proceso');
//    v_paquete                                   :=json_value(v_pjson_row_in,'[0].paquete');
//    v_procedimiento                             :=json_value(v_pjson_row_in,'[0].procedimiento');
//    v_detalle                                   :=json_value(v_pjson_row_in,'[0].detalle');
//    v_responsable                               :=json_value(v_pjson_row_in,'[0].responsable');
//    v_fecha                                     :=json_value(v_pjson_row_in,'[0].fecha_modificado');
//    v_anexo                                     :=json_value(v_pjson_row_in,'[0].anexo');

// PROCEDURE P_CONSULTA_BITACORA( v_presponsable in number, v_parea in number, v_pjson_row out clob) 
// Permite consultar registros de bitacoras por area o por responsable

function Base64()
{
	global $request;
	$name = uniqid();
	$base_to_php = explode(',', $request->Base64);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../temp/" . $name . ".pdf";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".pdf");
}

function Upload()
{
	// CC_1046270267_20201007_213128
	error_reporting(0);
	require_once('../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	// $ext = 'pdf';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/TIC/Bitacora/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $request->ext);
	// $subio = subirArchivoFTP($request->base, $ruta, 'CC_1046270267_20201007_213128', $pdf);
	echo $subio;
}



function subirArchivoFTP($file, $path, $name, $ext)
{
	error_reporting(0);
	require('../config/ftpcon.php');
	$db_name = $path . $name . '.' . $ext;
	$tmpfile = $name . '.' . $ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $path) == TRUE) {
		$subio = @ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			unlink($tmpfile);
			return $db_name;
		} else {
			unlink($tmpfile);
			return '0 - Error';
		}
	} else {
		if (ftp_mkdir($con_id, $path)) {
			$subio = ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				unlink($tmpfile);
				return $db_name;
			} else {
				unlink($tmpfile);
				return '0 - Error';
			}
		} else {
			return '0';
		}
	}
	ftp_close($con_id);
}

function descargaAdjunto()
{
	global $request;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
    	require_once('../config/ftpcon.php');
  	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con.php');
	}
	
	$file_size = ftp_size($con_id, $request->ruta);
	if ($file_size != -1) {
		$name = uniqid();
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../temp/' . $name;
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