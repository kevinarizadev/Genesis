<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function validacion_contraReferencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_valida_referencia(:v_pcodigo,: v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcodigo', $request->pcodigo);
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
function validacion_inicio()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SARLAFT.p_usuario_autorizado(:v_pid_funcionario,:v_pjson_out);end;');
	oci_bind_by_name($consulta, ':v_pid_funcionario', $request->Cedula);
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
function obtenerCantidades()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_cantidades(:v_pgrupo,: v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pgrupo', $request->grupo);
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
function obtenerRol()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_rol(:v_json_row);end;');
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
function obtenermotivosReferencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_motivos_referencia(:v_pmotivo,: v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pmotivo', $request->motivoReferencia);
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
function obtenermotivoTraslado()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_tipo_traslado(: v_json_row);end;');
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
function obtenerlistaResumen()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_lista_resumen(: v_json_row);end;');
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
function obtenerNombreIps()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ips = $request->ips;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_ips_referencia(:v_pnit,:v_json_row); end;');
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
function obtenerNombreipsReceptora()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ips = $request->ips;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_ips_receptora(:v_pnit,:v_json_row); end;');
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
function obtenerEspecialidades()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$especialidades = $request->especialidades;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.P_OBTENER_ESPECIALIDADES(:v_pservicio,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pservicio', $especialidades);
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
function obtenerAfiliados()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_datos_basicos_referencia(:v_ptipodocumento ,:v_pdocumento,:v_tipo_solicitud,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
	oci_bind_by_name($consulta, ':v_tipo_solicitud', $request->tiposolicitud);
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
function obtenerFuncionario()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_funcionarios(:v_pcodigo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigo', $request->ndocumento);
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
function inserMotivos()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_ui_motivos_referencia(:v_pdocumento,:v_pconcepto,:v_pmotivo,:v_pnombre,:v_pestado,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->pdocumento);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->pconcepto);
	oci_bind_by_name($consulta, ':v_pmotivo', $request->pmotivo);
	oci_bind_by_name($consulta, ':v_pnombre', $request->pnombre);
	oci_bind_by_name($consulta, ':v_pestado', $request->pestado);
	oci_bind_by_name($consulta, ':v_paccion', $request->paccion);
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
function insertuserReferencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_ui_funcionarios_referencia(:v_pdocumento,:v_ptipo,:v_pestado,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->pdocumento);
	oci_bind_by_name($consulta, ':v_ptipo', $request->ptipo);
	oci_bind_by_name($consulta, ':v_pestado', $request->pestado);
	oci_bind_by_name($consulta, ':v_paccion', $request->paccion);
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
function insertReferencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_inserta_referencia(:v_pdocumento ,:v_porigen,:v_ptipodocumento ,:v_pnumerodocumento,:v_codmuniipio ,:v_pregimen,:v_pmotivo_remision ,:v_pdiagnostico,
	:v_pdiagnostico1 ,:v_pservicio,:v_pservicio2,:v_pservicio3,:v_pfecha_recepcion,:v_pips_solicitante ,:v_pdoc_solicitante,:v_pcargo_solicitante ,:v_ptelefono,:v_numero_referencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->pdocumento);
	oci_bind_by_name($consulta, ':v_porigen', $request->porigen);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->ptipodocumento);
	oci_bind_by_name($consulta, ':v_pnumerodocumento', $request->pnumerodocumento);
	oci_bind_by_name($consulta, ':v_codmuniipio', $request->codmuniipio);
	oci_bind_by_name($consulta, ':v_pregimen', $request->pregimen);
	oci_bind_by_name($consulta, ':v_pmotivo_remision', $request->pmotivo_remision);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->pdiagnostico);
	oci_bind_by_name($consulta, ':v_pdiagnostico1', $request->pdiagnostico1);
	oci_bind_by_name($consulta, ':v_pservicio', $request->pservicio);
	oci_bind_by_name($consulta, ':v_pservicio2', $request->pservicio2);
	oci_bind_by_name($consulta, ':v_pservicio3', $request->pservicio3);
	oci_bind_by_name($consulta, ':v_pfecha_recepcion', $request->pfecha_recepcion);
	oci_bind_by_name($consulta, ':v_pips_solicitante', $request->pips_solicitante);
	oci_bind_by_name($consulta, ':v_pdoc_solicitante', $request->pdoc_solicitante);
	oci_bind_by_name($consulta, ':v_pcargo_solicitante', $request->pcargo_solicitante);
	oci_bind_by_name($consulta, ':v_ptelefono', $request->ptelefono);
	oci_bind_by_name($consulta, ':v_numero_referencia', $request->vnumeroreferencia);
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
function insertGestion()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_inserta_referencia_detalle(:v_pnumero ,:v_pdocumento,:v_ptipo_gestion,
	:v_pips_receptora,:v_ptipo_traslado,:v_paceptacion,:v_pmotivo_rechazo,:v_pmotivo_cancelacion,:v_pfecha_gestion,:v_phora_gestion,:v_pprofesional_gestion,:v_patendido_por,:v_pcargo,
	:v_ptelefono,:v_pextension,:v_pobservacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->pnumero);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->pdocumento);
	oci_bind_by_name($consulta, ':v_ptipo_gestion', $request->ptipo_gestion);
	oci_bind_by_name($consulta, ':v_pips_receptora', $request->pips_receptora);
	oci_bind_by_name($consulta, ':v_ptipo_traslado', $request->ptipo_traslado);
	oci_bind_by_name($consulta, ':v_paceptacion', $request->paceptacion);
	oci_bind_by_name($consulta, ':v_pmotivo_rechazo', $request->pmotivorechazo);
	oci_bind_by_name($consulta, ':v_pmotivo_cancelacion', $request->pmotivocancelacion);
	oci_bind_by_name($consulta, ':v_pfecha_gestion', $request->pfecha_gestion);
	oci_bind_by_name($consulta, ':v_phora_gestion', $request->phora_gestion);
	oci_bind_by_name($consulta, ':v_pprofesional_gestion', $request->profesional_gestion);
	oci_bind_by_name($consulta, ':v_patendido_por', $request->patendido_por);
	oci_bind_by_name($consulta, ':v_pcargo', $request->pcargo);
	oci_bind_by_name($consulta, ':v_ptelefono', $request->ptelefono);
	oci_bind_by_name($consulta, ':v_pextension', $request->pextension);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->pobservacion);
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
function obtenerdetalleGestion()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_referencias_detalle(:v_pnumero ,:v_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigoreferencia);
	oci_bind_by_name($consulta, ':v_documento', $request->documentopaciente);
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
function listadoderefrenciasActivas()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_referencias_activas(:v_pgrupo,: v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pgrupo', $request->grupo);
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
function listausuariosReferencia()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_funcionarios_referencia(: v_json_row);end;');
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
function obtenerDiagnostico()
{
	require_once('../../config/dbcon.php');
	global $request;
	$sexo = $request->sexo;
	$edad = $request->edad;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_obtener_diagnostico_referencia(:v_psexo  ,:v_pedad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_psexo ', $request->$sexo);
	oci_bind_by_name($consulta, ':v_pedad', $request->$edad);
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
function obtener_archivos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SARLAFT.p_obtener_adjunto(:v_pnum_formulario,:v_pjson_out); end;');
	oci_bind_by_name($consulta, ':v_pnum_formulario', $request->Numero_radicado);
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
function obtener_archivo_ftp()
{
	require('../sftp_cloud/DownloadFile.php');
	global $request;
	echo (DownloadFile($request->ruta));
}
