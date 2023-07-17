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

function Base64()
{
	global $request;
	$name = uniqid();
	$base_to_php = explode(',', $request->Base64);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".pdf";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".pdf");
}

function Upload()
{
	// CC_1046270267_20201007_213128
	error_reporting(0);
	require_once('../../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	$pdf = 'pdf';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/GestionDeRiego/Siniestro/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $pdf);
	// $subio = subirArchivoFTP($request->base, $ruta, 'CC_1046270267_20201007_213128', $pdf);
	echo $subio;
}



function subirArchivoFTP($file, $path, $name, $ext)
{
	error_reporting(0);
	require('../../config/ftpcon.php');
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
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_OBTENER_AFILIADO_PGP(:v_ptipodocumento,:v_pdocumento,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Num_Doc);
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

function Buscar_Motivo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_MOTIVOS_PGP(:v_ptercero,:v_pcod_regimen,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
	oci_bind_by_name($consulta, ':v_pcod_regimen', $request->Regimen);
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

function Buscar_Asunto()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_ASUNTOS_PGP(:v_ptercero,:v_pmotivo,:v_pcod_regimen,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
	oci_bind_by_name($consulta, ':v_pmotivo', $request->Cod_Mot);
	oci_bind_by_name($consulta, ':v_pcod_regimen', $request->Regimen);
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

function Buscar_Contrato()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_OBTENER_CONTRATO_PGP(:v_ptercero,:v_pmotivo,:v_pasunto,:v_pcod_regimen,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
	oci_bind_by_name($consulta, ':v_pmotivo', $request->Cod_Mot);
	oci_bind_by_name($consulta, ':v_pasunto', $request->Cod_Asu);
	oci_bind_by_name($consulta, ':v_pcod_regimen', $request->Regimen);
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

function Buscar_Producto()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_OBTENER_PRODUCTO_PGP(:v_pcoincidencia,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->Coinc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc_Con);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Num_Con);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubi_Con);
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

function Guardar_Solicitud()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_INSERTA_REGISTRO_PGP(:v_ptercero,:v_ptipodocumento,:v_pdocumento,:v_pdocumento_contrato,:v_pnumero,:v_pubicacion,:v_pproducto,:v_ptipofrecuencia,:v_pfrecuencia,:v_pedad,:v_psexo,:v_pcantidad,:v_pcod_regimen,:v_pfecha_prestacion,:v_pjson_out); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pdocumento_contrato', $request->Doc_Con);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Num_Con);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubi_Con);
	oci_bind_by_name($consulta, ':v_pproducto', $request->Prod);
	oci_bind_by_name($consulta, ':v_ptipofrecuencia', $request->Tipo_Frecuencia);
	oci_bind_by_name($consulta, ':v_pfrecuencia', $request->Cantidad_Frecuencia);
	oci_bind_by_name($consulta, ':v_pedad', $request->Edad);
	oci_bind_by_name($consulta, ':v_psexo', $request->Sexo);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->Cant);
	oci_bind_by_name($consulta, ':v_pcod_regimen', $request->Regimen);
	oci_bind_by_name($consulta, ':v_pfecha_prestacion', $request->Fecha);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


///////////////////////////
function Consultar_Actividades()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_ACTIVIDADES_AFILIADO_PGP(:v_ptercero,:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
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

function Listar_Actividades()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_REGISTRO_PGP(:v_ptercero,:v_fecha_inicio,:v_fecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $request->Bter);
	oci_bind_by_name($consulta, ':v_fecha_inicio', $request->F_Inicio);
	oci_bind_by_name($consulta, ':v_fecha_fin', $request->F_Fin);
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