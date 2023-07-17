<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenerPrivilegios()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PRIVILEGIO_PQR(:v_pcedula,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcedula', $_SESSION['cedula']);
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

function obtenerRiesgoSolicitud()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_RIESGO_SOLICITUD(:v_json_row); end;');
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
function obtenerMediosRecepcion()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MEDIOS(:v_json_row); end;');
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
function obtenerMediosRecepcionTipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MEDIOS_TIPO(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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
function obtenerTipoRadicacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_TIPO_RADICACION(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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


function obtenerEntesControl()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_ENTE_CONTROL(:v_json_row); end;');
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

function obtenerEntidades()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_ENTIDAD(:v_cod_ente,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_cod_ente', $request->entidad);
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


function obtenerDepartamentosMunicipios()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_UBICACION(:v_json_row); end;');
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

//Gets RV
function obtenerCriteriObjetivos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CRITERIO_OBJETIVO(:v_json_row); end;');
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
function obtenerCriterioSubjetivos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CRITERIO_SUBJETIVO(:v_json_row); end;');
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
function obtenerCriterioComplementario()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CRITERIO_COMPL(:v_json_row); end;');
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
function obtenerSujetos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_SUJETO(:v_json_row); end;');
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
function obtenerServicios()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_SERVICIO(:v_json_row); end;');
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
function obtenerMedicamentos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MEDICAMENTO(:v_json_row); end;');
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
// RV

//Gets Macromotivos y  Motivos
function obtenerMacromotivos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS(:v_json_row); end;');
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

function obtenerSeccionales()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_SECCIONALES(:v_json_row); end;');
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
function obtenerMotivosGenerales()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$codigomacromotivo = 10;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_GENERAL(:v_pcodigomacro,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigomacro', $codigomacromotivo);
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
function obtenerMotivosEspecificos()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_ESPECIFICO(:v_json_row); end;');
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
function obtenerMotivosEspecificos_tiposol()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_ESPECIFICO_TIPOSOL(:v_tiposol,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tiposol', $request->tiposol);
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
// Macromotivos y  Motivos

// PQRS
function obtenerPQRS()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_obtener_pqr(:v_presponsable,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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

function obtenerPQRSTIPOSOL()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_TIPO_SOLICITUD(:v_tiposolicitud,:v_presponsable,:v_tipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tiposolicitud', $request->tiposol);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_tipo', $request->estado);
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
function P_OBTENER_PQR_TIPO_SOL()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_TIPO_SOL(:v_presponsable,:v_pestado,:v_ptiposol,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_ptiposol', $request->tiposol);
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


/*function obtenerCorrespondencia() {
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORRESPONDENCIA(:v_presponsable,:v_p_tipocorrepondencia,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable',$request->responsable);
	oci_bind_by_name($consulta, ':v_p_tipocorrepondencia',$request->tipo_corresp);

	oci_bind_by_name($consulta, ':v_pestado',$request->estado);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $json = $clob -> read($clob -> size());
        echo $json;
    } else {
		echo 0;
    }
    oci_close($c);
}*/
function obtenerCorrespondencia()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORRESPONDENCIA(:v_presponsable,:v_p_tipocorrepondencia,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_p_tipocorrepondencia', $request->tipo_corresp);
	//oci_bind_by_name($consulta, ':v_tipo',$request->rol);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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


function obtenerResponsables()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_RESPONSABLES(:v_json_row); end;');
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
function obtenerResponsablesPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_SECUNDARIO_XPQR(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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
function obtenerProcesoSaludPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_GESTION_SALUD(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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
function obtenerNegacionPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_NEGACION(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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

/*function obtenerFaseActual(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_FASE_ACTUAL(:v_ppqr,:v_pfase,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ppqr',$request->pqr);
	oci_bind_by_name($consulta,':v_pfase',$request->fase);
	oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
  }*/

function obtenerFaseActual()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_FASE_ACTUAL(:v_ppqr,:v_presponsable,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function obtenerGestionXFase()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_GESTION_XFASES(:v_ppqr,:v_pfase,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
	oci_bind_by_name($consulta, ':v_pfase', $request->fase);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function obtenerPQRaseguramiento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_INFO_PQR_ASE(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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
function obtenerGestionPQRaseguramiento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_GESTION_ASEGURAMIENTO(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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
//PQRS

//Searches
function searchAfiliado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$tipodocumento = $request->tipodocumento;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_INFO_AFILIADO(:v_ptipo_documento,:v_pnumero_documento,:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipodocumento);
	oci_bind_by_name($consulta, ':v_pnumero_documento', $documento);
	oci_bind_by_name($consulta, ':v_ptipo', $tipo);
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
function searchIps()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ips = $request->ips;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_IPS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $ips);
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
function searchEmpleador()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_EMPLEADOR(:v_tipo_documento,:v_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $request->tipodocumento);
	oci_bind_by_name($consulta, ':v_documento', $request->documento);
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


function obtenerListados()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$coincidencia = isset($request->coincidencia) ? $request->coincidencia : '';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_BUSCAR_USUARIOS(:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $coincidencia);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function obtenerListadosIps()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$coincidencia = isset($request->coincidencia) ? $request->coincidencia : '';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_BUSCAR_IPS(:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $coincidencia);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

//============= Administracion ==================//
function obtenerParametro()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	//$riesgo = $request->riesgo;
	$regimen = $request->regimen;
	$sede = $request->sede;
	$ente = $request->ente;
	$riesgo = isset($request->riesgo) ? $request->riesgo : '';
	$medio = $request->medio;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PARAMETRO_CONTROL(:v_riesgo,:v_regimen,:v_sede,:v_ente,:v_medior,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_riesgo', $riesgo);
	oci_bind_by_name($consulta, ':v_regimen', $regimen);
	oci_bind_by_name($consulta, ':v_sede', $sede);
	oci_bind_by_name($consulta, ':v_ente', $ente);
	oci_bind_by_name($consulta, ':v_medior', $medio);
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
function obtenerMotivosXparametro()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MOTIVO_POR_ENTES(:v_ente,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ente', $codigo);
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
function obtenerResponsable()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$responsable = $request->responsable;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_RESPONSABLES_ADMIN(:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $responsable);
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
function obtenerResponsableMotivos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$parametro = $request->parametro;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_RESPONSABLES_MOTIVOS(:v_parametro,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parametro', $parametro);
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
function obtenerMotivosResponsable()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$parametro = $request->parametro;
	$responsable = $request->responsable;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_MOTIVOS_RESPONSABLE(:v_responsable,:v_parametro,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_responsable', $responsable);
	oci_bind_by_name($consulta, ':v_parametro', $parametro);
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
function obtenerResponsablesSeccionales()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_RESPONSABLES_SECCIONALES(:v_json_row); end;');
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
function obtenerPqrExcel()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQR_PRUEBA_EXCEL.P_OBTENER_PQR_EXCEL(:v_json_row); end;');
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

function buscarpqr()
{
	// echo "1";
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_PQRREPORTE_ASEGURAMIENTO (:v_ppqr, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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

// detallecenso
function detallepqr()
{
	// echo "1";
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_PQRREPORTE_ASE_DETA (:v_ppqr, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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

function p_mostrar_traza()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_MOSTRAR_TRAZA (:v_ppqr, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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

function p_obtener_areas()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_AREAS (:v_json_row); end;');
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
function p_obtener_func_areas()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_FUNCIONARIOS (:v_parea,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parea', $request->area);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->seccional);
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
function p_chequear_ips_medicamento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_CHEQUEAR_IPS_MEDICAMENTO (:v_ppqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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


function obtenerIps()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ips = $request->ips;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_IPS_ALL(:v_pips,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pips', $ips);
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


function BuscarProducto()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_BUSCAR_PRODUCTOS(:v_pcoincidencia,
																			  :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coincidencia);
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

function obtenerpqrestado()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_ESTADOPQRS(:v_pnumero,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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
function p_obtener_correpondencia_x_estado()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORREPONDENCIA_X_ESTADO(:v_pestado,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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



function obtenermotivosacciones()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.PQR_MOTIVOS_ACCIONES(:v_pmotivo,
																			:v_pmodulo,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pmotivo', $request->motivo);
	oci_bind_by_name($consulta, ':v_pmodulo', $request->modulo);
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

function p_obtener_pqr_numero()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_NUMERO(:v_ppqr,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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
function p_obtener_correspondencia_numero()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORRESPONDENCIA_NUMERO(:v_pconsecutivo,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->consecutivo);
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

function p_obtener_pqr_estadisticas()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_ESTADISTICAS(:v_responsable,
																				   :v_tipo,
																				   :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_tipo', $request->estado);
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

function p_obtener_pq_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQ_CORRESPONDENCIA(:v_responsable,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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

function p_obtener_ipq_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_IPQ_CORRESPONDENCIA(:v_len,
																			:v_pjson_row_in,
																			:v_responsable,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_len', $request->cantidad);
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($request->correspondencias);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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

//	function p_obtener_pq_pqr(){
//		require_once('../../config/dbcon.php');
//		global $request;
//		$consulta  = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQ_PQR(:v_json_row); end;');
//		$clob = oci_new_descriptor($c,OCI_D_LOB);
//		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
//		oci_execute($consulta,OCI_DEFAULT);
//		if (isset($clob)) {
//		  $json = $clob->read($clob->size());
//		  echo $json;
//		}else{
//		  echo 0;
//		}
//		oci_close($c);
//	}
function p_obtener_pq_pqr()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQ_PQR(:v_correspondencia,:v_estado,:v_responsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_correspondencia', $request->corrrespondencia);
	oci_bind_by_name($consulta, ':v_estado', $request->estado);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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
function p_obtener_pqprocesado_pqr()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQPROCESADO_PQR(:v_json_row); end;');
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

function p_obtener_historico_pqr()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_HISTORICO_PQR(:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

function p_obtener_operadores_correspondencia()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_OPERADORES_CORRESPONDENCIA(:v_json_row); end;');
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


function p_obtener_tercero()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_obtener_tercero(:v_pcoincidencia,:v_ptiporad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coincidencia);
	oci_bind_by_name($consulta, ':v_ptiporad', $request->tipo);
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


function p_obtener_sticker()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_obtener_sticker(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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

function p_obtener_ciudades()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CIUDADES(:v_json_row); end;');
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

function p_obtener_formato_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_FORMATO_CORRESPONDENCIA(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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

function p_obtener_formato_correspondencia_r()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_FORMATO_CORRESPONDENCIA_R(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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
function p_mostrar_datos_enviada()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_DATOS_ENVIADA(:v_pcodigopq,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigopq', $request->paquete);
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
function p_mostrar_datos_recibida()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_DATOS_RECIBIDA(:v_pcodigopq,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigopq', $request->paquete);
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


function p_obtener_detalle_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_DETALLE_CORRESPONDENCIA(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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

function p_obtener_documentos_radicar()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_DOCUMENTOS_RADICAR(:v_json_row); end;');
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

function p_validar_documento_radicar()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_VALIDAR_DOCUMENTO_RADICAR(:v_premitente,:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_premitente', $request->remitente);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento_rad);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento_rad);
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



function p_obtener_rol_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_ROL_CORRESPONDENCIA(:v_presponsble,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsble', $request->responsable);
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


function p_obtener_lista_responsables_correspondencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_LISTA_RESPONSABLES_CORRESPONDENCIA(:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function p_obtener_funcionario_eps()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_FUNCIONARIO_EPS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
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


function  p_obtener_pqr_super()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_SUPER(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
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



function p_obtener_pqr_patologia()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_PATOLOGIA(:v_json_row); end;');
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
function p_obtener_pqr_motivo_res()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_MOTIVO_RES(:v_json_row); end;');
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
// -------------------------------------------------yordis 16/06/2023-------------------------------------------
function  P_Tipos_Motivos_Especificos()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_TIPO_MOTIVOS_ESPECIFICO(:v_pmacromotivo,:v_pmotivo_general,:v_pmotivo_especifico,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pmacromotivo', $request->macro_motivo);
	oci_bind_by_name($consulta, ':v_pmotivo_general', $request->motivo_general);
	oci_bind_by_name($consulta, ':v_pmotivo_especifico', $request->motivo_especifico);
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
function  P_Sub_Tipos_Motivos_Especificos()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_SUBTIPO_MOTIVOS_ESPECIFICO(:v_pmacromotivo,:v_pmotivo_general,:v_pmotivo_especifico,:v_ptipo_motivo_especifico,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pmacromotivo', $request->macro_motivo);
	oci_bind_by_name($consulta, ':v_pmotivo_general', $request->motivo_general);
	oci_bind_by_name($consulta, ':v_pmotivo_especifico', $request->motivo_especifico);
	oci_bind_by_name($consulta, ':v_ptipo_motivo_especifico', $request->tipo_motivo_especifico);
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
// -------------------------------------------------yordis 16/06/2023-------------------------------------------
function p_obtener_pqr_tecno_altocosto()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_TECNO_ALTOCOSTO(:v_json_row); end;');
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


function p_obtener_pqr_avanzado()
{
	require_once('../../config/dbcon.php');
	global $request;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_AVANZADO(:v_pjson_row_in,
																		  :v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
	$jsonin->writeTemporary($request->jsonpqr);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo $clob;
	}
	oci_close($c);
}


function listarAreas()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$sede = $request->sede;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_AREAS_CORRESPONDENCIA(:v_psede,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_psede', $sede);
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


function  p_validapqr_gestionriesgo()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_VALIDAPQR_GESTIONRIESGO(:v_ptipo_doc,:v_pnumdoc,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_doc', $request->tipodocumento);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->documento);
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

function  p_validapqr_responsable()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_VALIDAPQR_RESPONSABLE(:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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



// pqr ips

function p_mostrar_responsables_ips()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_MOSTRAR_RESPONSABLES_IPS(:v_pjson_row); end;');
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

function p_obtener_pqr_ips()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_obtener_pqr_ips(:v_pestado,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

function p_obtener_pqr_ips_avanzado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_IPS_AVANZADO(:v_presponsable,:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->fecha_inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $request->fecha_fin);
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


function Obtener_Usuarios_Radicacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_LISTAR_ROLES_CORR(:v_json_row ); end;');
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

function Insertar_Usuario_Radicacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_NUEVO_ROLES_CORR(:v_pcedula, :v_presponsable, :v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcedula', $request->Cedula);
	oci_bind_by_name($consulta, ':v_presponsable', $request->v_responsable);
	oci_bind_by_name($consulta, ':v_paccion', $request->v_accion);
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

function Inactivar_Activar_Usuario_Radicacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_NUEVO_ROLES_CORR(:v_pcedula, :v_presponsable, :v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcedula', $request->Cedula);
	oci_bind_by_name($consulta, ':v_presponsable', $request->v_responsable);
	oci_bind_by_name($consulta, ':v_paccion', $request->v_accion);
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

function p_obtener_pqr_tipodocumento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_TIPODOCUMENTO(:v_ptipo,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->v_ptipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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

function p_obtener_pqr_gestion_riesgo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_GESTION_RIESGO(:v_ptipo,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->v_ptipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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

function p_consulta_pqrconsol()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_consulta_pqrconsol(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->v_ptipo_documento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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

function p_obtener_motivos_clasificacion_usuarios_pqr()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MOTIVOS_CLASIFICACION_USUARIOS_PQR(:v_json_row); end;');
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

function p_obtener_macromotivos_especifico_tiporad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_ESPECIFICO_TIPORAD(:v_tiporad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tiporad', $request->tiporad);
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

function P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO(       :v_ptipodocumento,
                                                                                                  :v_pdocumento,
                                                                                                  :v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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

function P_CONSULTA_ACCION_AREA()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CONSULTA_ACCION_AREA(:v_ppqr,:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ppqr', $request->v_ppqr);
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

function P_UI_ACCION_AREA()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_ACCION_AREA(:v_ppqr,:v_paccion,:v_presponsable,:v_parea,:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ppqr', $request->v_ppqr);
	oci_bind_by_name($consulta, ':v_paccion', $request->v_paccion);
	oci_bind_by_name($consulta, ':v_presponsable', $request->v_presponsable);
	oci_bind_by_name($consulta, ':v_parea', $request->v_parea);
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


function ACTUALIZAR_PQR_CARGADAS()
{
	require_once('../../config/dbcon_prod.php');
	$empresa = 1;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_GENERA_PQRCONSOL(:v_pempresa); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $empresa);
	oci_execute($consulta, OCI_DEFAULT);
	echo 1;
	oci_close($c);
}

function obtenerComentariosPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_COMENTARIOS_PQR(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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

function subirArchivo()
{
	// error_reporting(0);
	// require_once('../../config/dbcon.php');
	global $request;
	// $hoy = date('Ymd');
	$hoy = date('Ymd_His');
	if ($request->tipo == 'COMENTARIO') {
		$path = 'PQR/Comentarios/' . $request->carpeta;
		$name = 'Comentario_' . $hoy . '.' . $request->ext;
	}
	if ($request->tipo == 'SERVICIO') {
		$path = 'PQR/Servicios/' . $request->carpeta;
		$name = 'Servicio_' . $hoy . '.' . $request->ext;
	}
	list(, $request->base) = explode(';', $request->base); // Proceso para traer el Base64
	list(, $request->base) = explode(',', $request->base); // Proceso para traer el Base64
	$base64 = base64_decode($request->base); // Proceso para traer el Base64
	file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
	// $subio = subirArchivoFTP($request->base, $ruta, $request->name . '_' . $hoy, $pdf);
	// echo 1;
	require('../../sftp_cloud/UploadFile.php');
	$subio = UploadFile($path, $name);
	echo $subio;
}

function bajarArchivo()
{
	global $request;
	require('../../sftp_cloud/DownloadFile.php');
	echo (DownloadFile($request->ruta));
}

function crearComentariosPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CREAR_COMENTARIOS_PQR(:v_pqr,:v_comentario,:v_responsable,:v_adjunto,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
	oci_bind_by_name($consulta, ':v_comentario', $request->comentario);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_adjunto', $request->adjunto);
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

function obtenerMarcacionPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MARCACION_PQR(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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

function crearMarcacionPQR()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_REGISTRAR_MARCA_PQR(:v_pqr,:v_observacion,:v_responsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
	oci_bind_by_name($consulta, ':v_observacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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


function p_consulta_aut()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CONSULTA_AUT(:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->pqr);
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

function p_buscar_productos_cierre()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_BUSCAR_PRODUCTOS_CIERRE(:v_pcoincidencia,:v_pedad,:v_psexo,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coinc);
	oci_bind_by_name($consulta, ':v_pedad', $request->edadDias);
	oci_bind_by_name($consulta, ':v_psexo', $request->sexoCodigo);
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

function p_obtener_subcategorias()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_SUBCATEGORIAS(:v_pcodigo,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigo', $request->coinc);
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

function p_insertar_productos_pqr()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_INSERTAR_PRODUCTOS_PQR(:v_pproductos,:v_pcantidad,:v_pnumero,:v_presponsable,:v_pgestion,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pproductos', $request->productos);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numeroPQR);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_pgestion', $request->gestion);
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

function p_lista_productos_pqr()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_LISTA_PRODUCTOS_PQR(:v_pnumero,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->pqr);
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


function p_lista_reporte_servicios_pqr()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_lista_reporte_servicios_pqr(:v_pinicio,:v_pfin,:v_pjson_out); end;');
	oci_bind_by_name($consulta, ':v_pinicio', $request->fecha_i);
	oci_bind_by_name($consulta, ':v_pfin', $request->fecha_f);
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


function actualizarSoporteCorrep()
{
	global $request;

	// $ext =  $request->ext;
	$path = substr($request->ruta,35,12);
	$archivos =  $request->B64;
	$name = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];

	list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
	list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
	$base64 = base64_decode($archivos); // Proceso para traer el Base64
	file_put_contents('../../../temp/' . $name, $base64);
	require('../../sftp_cloud/UploadFile.php');

	$subio = UploadFile($path, $name);
	//echo substr($path,36,strlen($path)-1);
	
	if ($subio[0] != '0') {
	echo $subio;
	} else {
	echo '0';
	}
}


function p_validar_permisos_servicio_pqr()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_VALIDAR_PERMISOS_SERVICIO_PQR(:v_pcedula,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
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

function P_DESCARGAR_INFORME_CONSOLIDADO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_DESCARGAR_INFORME_CONSOLIDADO(:v_pfechainicio,:v_pfechafin,:v_pestado,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':v_pfechainicio',$request->fechaInicio);
  oci_bind_by_name($consulta, ':v_pfechafin',$request->fechaFin);
  oci_bind_by_name($consulta, ':v_pestado',$request->estado);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}