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
	global $request;
	('../../config/sftp_con.php');
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	$pdf = 'zip';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/GestionDeRiego/Siniestro/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $pdf);
	// $subio = subirArchivoFTP($request->base, $ruta, 'CC_1046270267_20201007_213128', $pdf);
	echo $subio;
}



function subirArchivoFTP($file, $path, $name, $ext)
{
	error_reporting(0);
	require('../../config/sftp_con.php');
	$db_name = $path . $name . '.' . $ext;
	$tmpfile = $name . '.' . $ext;
	list(, $file) = explode(';', $file);
	list(, $file) = explode(',', $file);
	$file = base64_decode($file);
	file_put_contents($tmpfile, $file);
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $path) == TRUE) {
		// if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $path) == TRUE) {
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
	// echo "1045712025";//NACIONAL - SECCIONAL
	// echo "1045745252"; //NACIONAL - SECCIONAL
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Obt_Rol()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ROLES_ALTOCOSTO(:v_presponsable,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
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

function Obt_Cantidades_Secc()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CANTIDAD_GESTIONES(:v_presponsable,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
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

function Obt_Tratamientos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_TRATAMIENTO(:v_pconcepto,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Cohorte);
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

function Obtener_Diagnostico_F()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$Doc = 'AL';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSULTAR_DIAGNOSTICO_CAMBIO(:v_pdiagno,:v_pdocumento,:v_pconcepto,:v_pclase,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdiagno', $request->Conc);
	oci_bind_by_name($consulta, ':v_pdocumento', $Doc);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
	oci_bind_by_name($consulta, ':v_pclase', $request->Cla);
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
function Obtener_Diagnostico()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$Doc = 'AL';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.p_listar_diagnostico(:v_pdiagno,:v_pdocumento,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdiagno', $request->Conc);
	oci_bind_by_name($consulta, ':v_pdocumento', $Doc);
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

function Obtener_DiagsxCohorte()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$Doc = 'AL';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_DIAGNOSTICO_CLASIFICACION(:v_pdocumento,:v_pconcepto,:v_pdiagnostico,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $Doc);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->Conc);
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

function Actualizar_Diag_Clase()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTUALIZA_CLASE_SINIESTRO(:v_pclase_correcta,:v_pdiagnostico,:v_pradicado,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pclase_correcta', $request->Cla);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->Conc);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
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

function Obt_Ips_Asignada()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$tipo = 'G';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_IPS_ALTOCOSTO3(:v_ptipo,:v_pregimen,:v_pips,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pregimen', $request->Regimen);
	oci_bind_by_name($consulta, ':v_pips', $request->Conc);
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
function Obt_Ips_Tratamientos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$tipo = 'T';
	$ips = '';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_IPS_ALTOCOSTO3(:v_ptipo,:v_pregimen,:v_pips,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
	oci_bind_by_name($consulta, ':v_pregimen', $request->Regimen);
	oci_bind_by_name($consulta, ':v_pips', $ips);
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


function Obt_Registros_Secc()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_MARCA_ALTOCOSTO(:v_presponsable,:v_pgestion,:v_pradicado,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_pgestion', $request->Gestion);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
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


function Guardar_Seccional_Nacional()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_INSERTA_REGISTRO_ALTOCOSTO(:v_pjson_row_in,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->xdata);
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

function Buscar_Afiliado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_CONSULTA_AFILIADO(:v_ptipodoc,:v_pnumdoc,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
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

function Activar_Registro()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$v_pdocume_al = 'AL';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_ACTIVAR_REGISTRO_AL(:v_ptipodoc,:v_pnumdoc,:v_pdocume_al,:v_pconcepto,:v_pfuente,:v_presponsable,:v_pdiagnostico,:v_clase_concepto,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pdocume_al', $v_pdocume_al);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Cod_Coh);
	oci_bind_by_name($consulta, ':v_pfuente', $request->Fuente);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->Diag);
	oci_bind_by_name($consulta, ':v_clase_concepto', $request->Clase_Concepto);
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

function Obt_Registros_Nac()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_ALTOCOSTO_NAL(:v_presponsable,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
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

function Obt_Registros_Detalle_Nac()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_ALTOCOSTO_NAL_DETALLE(:v_pconsecutivo,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->Radicado);
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

function Ver_Patologia()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_SINIESTROS(:v_ptipodoc,:v_pnumdoc,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
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

function Anular_Registro_Seccional()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_ANULA_SINIESTRO(:v_pradicado,:v_presponsable,:v_pobservacion,:v_pfuente,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pradicado', $request->Radicado);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Responsable);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Observacion);
	oci_bind_by_name($consulta, ':v_pfuente', $request->Fuente);
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


//////////////////////////////
//////////DATOS BASICOS///////
//////////////////////////////
function Consultar_Siniestros_Datos_Basicos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_DATOS_BASICOS_ALTOCOSTO(:v_ptipo_doc,:v_pnum_doc,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnum_doc', $request->Num_Doc);
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



//////////////////////////////
//////////ASIGNACION TRATAMIENTO///////
//////////////////////////////
function Consolidado_Cohortes()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSOLIDADO_COHORTE(:v_presponsable,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
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

function Consolidado_Seccionales()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSOLIDADO_SECCIONAL(:v_presponsable,:v_pconcepto,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
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

function Consolidado_Municipios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSOLIDADO_MUNICIPIO(:v_presponsable,:v_pdepartamento,:v_pconcepto,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_pdepartamento', $request->Sec);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
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

function Obt_Detalle_Municipio()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_DETALLE_MUNICIPIO(:v_presponsable,:v_pmunicipio,:v_pconcepto,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_pmunicipio', $request->Mun);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Coh);
	// oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
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


function Obt_Inserta_Tratamiento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_INSERTA_TRATAMIENTO(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->datos);
	// oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
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
