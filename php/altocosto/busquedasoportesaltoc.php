<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
	// require_once('../config/ftpcon.php');
	// require_once('../config/sftp_con.php');
	global $request;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../config/ftpcon.php');
	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con.php');
	}
	$file_size = ftp_size($con_id, $request->ruta);
	if ($file_size != -1) {
		// $name = uniqid();
		$name = pathinfo($request->ruta, PATHINFO_FILENAME);
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


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
	// echo "1003380258";
}

function Obt_Nit()
{
	echo ($_SESSION["nit"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Buscar_Afiliado()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_plan_vacunacion.p_consulto_afiliado(:v_tipo_documento,:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_documento', $request->Num_Doc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Buscar_Soportes_Siniestros()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_CONSULTA_SOPORTE_SINIESTRO(:v_ptipo_doc,:v_pnum_doc,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnum_doc', $request->Num_Doc);
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


function Listar_Soportes()
{
	error_reporting(0);
	global $request;
	$afi = $request->Tipo_Doc . '' . $request->Num_Doc;
	$ftp_server = "192.168.50.36";
	$ftp_user_name = "genesis_ftp";
	$ftp_user_pass = "Cajacopi2022!";
	$conn_id = ftp_connect($ftp_server);
	$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);
	$ps = ftp_pasv($conn_id, true);
	$ruta = 'ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/cargue_ftp/Digitalizacion/Genesis/Altocosto/'.$request->Tipo.'/';
	if (is_dir($ruta) == TRUE) {
		$contents1 = ftp_nlist($conn_id, "/cargue_ftp/Digitalizacion/Genesis/Altocosto/".$request->Tipo.'/');
		$array = '';
		$i = 0;
		foreach ($contents1 as $posicion => $dato1) {
			if (strpos($dato1, $afi) !== false) {
				$i++;
				$contents2 = ftp_nlist($conn_id, $dato1);
				$array2 = array();
				foreach ($contents2 as $posicion2 => $dato2) {
					array_push($array2, ["RUTA" => $dato2, "NOMBRE" => pathinfo($ruta . $dato1 . $dato2, PATHINFO_FILENAME), "EXT" => pathinfo($ruta . $dato1 . $dato2, PATHINFO_EXTENSION)]);
				}
				$array = $array . '{"NOMBRE":"' . explode('/', $dato1)[5] . '",';
				$array = $array . '"LISTA":' . json_encode($array2);
				$array = $array . '},';
			}
		}
		$array2 = substr($array, 0, count($array) - 2);
		echo '[' . $array2 . ']';
	}else{
		echo '[]';
	}
}

function DescargaAdjunto_Recursivo($carpeta, $ruta)
{
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $ruta) == TRUE) {
		require('../config/ftpcon.php');
	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $ruta) == TRUE) {
		require('../config/sftp_con.php');
	}
	$file_size = ftp_size($con_id, $ruta);
	if ($file_size != -1) {
		$name = pathinfo($ruta, PATHINFO_FILENAME);
		$ext = pathinfo($ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../temp/' . $carpeta . '/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $ruta, FTP_ASCII, 0)) {
			return $name;
		} else {
			echo "Error";
		}
		ftp_close($con_id);
		fclose($handle);
	} else {
		echo "Error";
	}
}


function Descarga_Carpeta()
{
	global $request;
	$ruta = '../../temp/' . $request->Carpeta;
	if (file_exists($ruta) == 1) {
		array_map('unlink', glob("$ruta/*.*"));
		rmdir($ruta);
		mkdir($ruta);
		if(file_exists($ruta.'.zip')){
			$x=$ruta.'.zip';
			unlink($x);
		}
	} else {
		mkdir($ruta);
	}
	$Array = json_decode($request->Listado);
	for ($i = 0; $i < count($Array); $i++) {
		$Array[$i]->RUTA_FINAL = DescargaAdjunto_Recursivo($request->Carpeta, $Array[$i]->RUTA);
	}
	$zip = new ZipArchive();
	$archivoCrearZip = '../../temp/' . $request->Carpeta . '.zip';
	if ($zip->open($archivoCrearZip, ZipArchive::CREATE) === TRUE) {
		if ($handle = opendir($ruta)) {
			while (false !== ($entry = readdir($handle))) {
				if (is_dir($ruta) && $entry != "." && $entry != "..") {
					$zip->addFile($ruta. '/'.$entry, $entry);
				}
			}
			closedir($handle);
		}
		$zip->close();
	}
	echo $request->Carpeta.'.zip';
}
