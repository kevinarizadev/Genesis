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
		require_once('../config/ftpcon.php');
	} else {
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

function ObtenerOpciones()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_LISTAR_GRUPO_OPCIONES(:v_pjson_row); end;');
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
function ObtenerFechaSeg()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_OBTENER_FECHA_SEGUIMIENTO(:v_pfecha2); end;');
	oci_bind_by_name($consulta,':v_pfecha2',$vencimiento,10);
	oci_execute($consulta,OCI_DEFAULT);
	echo $vencimiento;
	oci_close($c);
}


function ObtenerListado()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$Doc = 'GS';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_LISTAR_GESTION_RIESGO(:v_presponsable,:v_pdocumento,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
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

function ObtenerDetalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = '';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_LISTAR_GESTION_RIESGO_DETALLE(:v_ptipodoc,:v_pnumdoc,:v_pradicado,:v_pconcepto,:v_pfuente,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Num_Rad);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Cod_Coh);
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

function Guardar_Solicitud()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_INSERTA_REGISTRO(:V_PJSON_ROW_IN,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':V_PJSON_ROW_IN', $request->xdata);
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
	require_once('../config/dbcon_prod.php');
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
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = '';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_ACTIVAR_REGISTRO_GS(:v_ptipodoc,:v_pnumdoc,:v_pconcepto,:v_pfuente,:v_pgestion,:v_pradicado,:v_presponsable,:v_pdiagnostico,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Cod_Coh);
	oci_bind_by_name($consulta, ':v_pfuente', $request->Fuente);
	oci_bind_by_name($consulta, ':v_pgestion', $request->Gestion);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
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



function Obtener_Diagnostico()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$Doc = 'GS';
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
function Mostrar_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_DESCRIPCION_GP(:v_pid_radicado,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pid_radicado', $request->Rad);
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

function Upload()
{
	// CC_1046270267_20201007_213128
	error_reporting(0);
	require_once('../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	$pdf = 'pdf';
	$ruta = '/cargue_ftp/Digitalizacion/Genesis/GestionDeRiego/GrupoPriorizado/';
	$subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $pdf);
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




/////////////////////////////////////////////////////////////////////
///////////////////////GESTION DIAGNOSTICOS/////////////////////////
/////////////////////////////////////////////////////////////////////

function Obtener_Diags()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$Doc = '';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.p_listar_diagnostico_detalle(:v_pdocumento,:v_pconcepto,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Con);
	oci_bind_by_name($consulta, ':v_pconcepto', $Doc);
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
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.p_anular_diagnostico(:v_pdiagno,:v_pconcepto,:v_pestado,:v_pdocumento,:v_puser,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdiagno', $request->Diag);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Patologia);
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

/////////////////////////////////////////////////////////////////////
///////////////////////GESTION FUNCIONARIOS/////////////////////////
/////////////////////////////////////////////////////////////////////
function Obtener_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_USUARIOS_GESTION_RIESGO(:v_pjson_row); end;');
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

function Agregar_Inac_Func()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTIVAR_USUARIOS_GS(:v_pnumdoc,:v_paccion,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->Cedula);
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

function Reasignar_Sol()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_TRASLADO_GESTIONES(:v_pnumdoc1,:v_pnumdoc2,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pnumdoc1', $request->Actual);
	oci_bind_by_name($consulta, ':v_pnumdoc2', $request->Nuevo);
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