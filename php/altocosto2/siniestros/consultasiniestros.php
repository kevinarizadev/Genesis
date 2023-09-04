<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
	// echo "1003380258";
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Hoja1_Consultar_Siniestros()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_CONSULTA_SINIESTRO(:v_ptipo_doc,:v_pnum_doc,:v_pjson_row_out); end;');
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

function Hoja1_Anular_Siniestros()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ANULA_SINIESTRO_NACIONAL(:v_pradicado,:v_presponsable,:v_pobservacion,:v_ptipo,:v_pmotivo_accion,:v_pfecha_accion,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Obs);
	oci_bind_by_name($consulta, ':v_ptipo', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pmotivo_accion', $request->Motivo);
	oci_bind_by_name($consulta, ':v_pfecha_accion', $request->Fecha_Accion);
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

function Hoja1_Actualiza_Diag()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTUALIZA_DIAGNOSTICO(:v_pradicado,:v_ptipo_doc,:v_pnum_doc,:v_presponsable,:v_pdiagnostico,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pnum_doc', $request->Num_Doc);
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

function Hoja1_Actualiza_Fecha_Diag()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTUALIZA_FECHADIAGNO(:v_presponsable,:v_pradicado,:v_pfecha_diagno,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
	oci_bind_by_name($consulta, ':v_pfecha_diagno', $request->Fecha);
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

function Hoja1_Actualiza_Ips()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_INSERTA_IPS_ATENCIONINTEGRAL(:v_presponsable,:v_pradicado,:v_pnit,:v_pfecha_vigencia,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
	oci_bind_by_name($consulta, ':v_pradicado', $request->Rad);
	oci_bind_by_name($consulta, ':v_pnit', $request->Ips);
	oci_bind_by_name($consulta, ':v_pfecha_vigencia', $request->Fecha_Inicio);
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

function Hoja1_Ver_Traza()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$Doc = 'AL';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_TRAZA_SINIESTRO2(:v_prespnsable,:v_pradicado,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_prespnsable', $request->Ced);
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

function Hoja1_Modal_Actualizar_Ips_Primera_Aten()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTUALIZA_TRATAMIENTO(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->json);
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

function Actualizar_Ruta_Soporte_Nac()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_ACTUALIZA_SOPORTE (:v_pradicado,:v_pruta,:v_presponsable,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pradicado', $request->radicado);
	oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);

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

// function Descargar_Excel()
// {
// 	require_once('../../config/dbcon_prod.php');
// 	global $request;
// 	$cursor = oci_new_cursor($c);
// 	$consulta = oci_parse($c,'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_SINIESTRO(:v_pestado,:v_ubicacion,:v_cohorte,:v_pfecha_1,:v_pfecha_2,:v_response); end;');
// 	oci_bind_by_name($consulta,':v_pestado',$request->Estado);
// 	oci_bind_by_name($consulta,':v_ubicacion',$request->Ubicacion);
// 	oci_bind_by_name($consulta,':v_cohorte',$request->Cohorte);
// 	oci_bind_by_name($consulta,':v_pfecha_1',$request->F_Inicio);
//     oci_bind_by_name($consulta,':v_pfecha_2',$request->F_Fin);
// 	oci_bind_by_name($consulta,':v_response', $cursor, -1, OCI_B_CURSOR);
// 	oci_execute($consulta);
// 	oci_execute($cursor, OCI_DEFAULT);
// 		$datos = null;
// 		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
// 		oci_free_statement($consulta);
// 		oci_free_statement($cursor);
// 		echo json_encode($datos);
// }

function Descargar_Excel()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_SINIESTRO(:v_pestado,:v_ubicacion,:v_concepto,:v_pfecha_1,:v_pfecha_2,
	:v_opcion,:v_tipo_doc,:v_cedula,:v_response); end;');
	oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->Ubicacion);
	oci_bind_by_name($consulta, ':v_concepto', $request->Cohorte);
	oci_bind_by_name($consulta, ':v_pfecha_1', $request->F_Inicio);
	oci_bind_by_name($consulta, ':v_pfecha_2', $request->F_Fin);
	oci_bind_by_name($consulta, ':v_opcion',  $request->opcion);
	oci_bind_by_name($consulta, ':v_tipo_doc',  $request->tipoDoc);
	oci_bind_by_name($consulta, ':v_cedula',  $request->numDoc);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}


function P_LISTAR_MOTIVO_ANULACION()
{
	require_once('../../config/dbcon_prod.php');
	// global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GESTION_ACGS.P_LISTAR_MOTIVO_ANULACION (:v_pjson_row_out); end;');
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
