<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function obtenersupervisionPausada()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision_pausada(:v_prenglon,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglon);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function calculaResultado()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_calcula_resultado(:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function cantadorContrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_consol(:v_pinterventor,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pinterventor', $request->vpinterventor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function listarContrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_ips_supervisor(:v_pinterventor,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pinterventor', $request->vpinterventor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function consultarPrestador()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_ips_supervision(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->valorNit);
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
function consultarlistaContrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_lista_contratos(:v_pnit,:v_pregimen,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregimen', $request->vpregimen);
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
function consul_dias_Controtrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_controla_visita(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
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
function optenerContrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_contratos(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
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
// function optenerResultado()
// {
// 	require_once('../../php/config/dbcon.php');
// 	global $request;
// 	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_resultado(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prenglon,:v_json_row); end;');
// 	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumentoResultado);
// 	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumeroResultado);
// 	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacionResultado);
// 	oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglonResultado);
// 	$clob = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
// 	oci_execute($consulta, OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	} else {
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function optenerResultado()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_resultado(:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
// function guardarResultado()
// {
// 	require_once('../../php/config/dbcon.php');
// 	global $request;
// 	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_cierre_supervision(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prenglon,:v_pconclusiones,:v_precomendaciones,:v_json_row); end;');
// 	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
// 	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
// 	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
// 	oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglon);
// 	oci_bind_by_name($consulta, ':v_pconclusiones', $request->vpconclusiones);
// 	oci_bind_by_name($consulta, ':v_precomendaciones', $request->vprecomendaciones);
// 	$clob = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
// 	oci_execute($consulta, OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	} else {
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function guardarResultado()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_cierre_supervision(:v_pidproceso,:v_pconclusiones,:v_precomendaciones,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
	oci_bind_by_name($consulta, ':v_pconclusiones', $request->vpconclusiones);
	oci_bind_by_name($consulta, ':v_precomendaciones', $request->vprecomendaciones);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
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
// function guardarrevisionContrato()
// {
// 	require_once('../../php/config/dbcon.php');
// 	global $request;
// 	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_supervision(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pregional,:v_pfecha_visita,:v_phabilitacion,:v_pfecha_inicio,:v_pfecha_fin,
// 	:v_pcedulasupervisor_ips,:v_psupervisor_eps,:v_prepresentante_ips,:v_pcargo_repreentante,:v_pobservacion,:v_paccion,:v_pcantidad_preguntas,:v_json_preguntas,:v_json_row); end;');
// 	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
// 	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
// 	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
// 	oci_bind_by_name($consulta, ':v_pregional', $request->vpregional);
// 	oci_bind_by_name($consulta, ':v_pfecha_visita', $request->vpfechavisita);
// 	oci_bind_by_name($consulta, ':v_phabilitacion', $request->vphabilitacion);
// 	oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->vpfechainicio);
// 	oci_bind_by_name($consulta, ':v_pfecha_fin', $request->vpfechafin);
// 	oci_bind_by_name($consulta, ':v_pcedulasupervisor_ips', $request->vpcedulasupervisorips);
// 	oci_bind_by_name($consulta, ':v_psupervisor_eps', $request->vpsupervisoreps);
// 	oci_bind_by_name($consulta, ':v_prepresentante_ips', $request->vprepresentanteips);
// 	oci_bind_by_name($consulta, ':v_pcargo_repreentante', $request->vpcargorepreentante);
// 	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
// 	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
// 	oci_bind_by_name($consulta, ':v_pcantidad_preguntas', $request->vpcantidadpreguntas);
// 	oci_bind_by_name($consulta, ':v_json_preguntas', $request->vjsonpreguntas);
// 	$clob = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
// 	oci_execute($consulta, OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	} else {
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function guardarrevisionContrato()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_supervision_2(:v_pdocumento,:v_pnit,:v_pregional,:v_pfecha_visita,
	:v_pcedulasupervisor_ips,:v_prepresentante_ips,:v_pcargo_repreentante,:v_pobservacion,:v_paccion,:v_pcantidad_preguntas,:v_json_preguntas,:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregional', $request->vpregional);
	oci_bind_by_name($consulta, ':v_pfecha_visita', $request->vpfechavisita);
	// oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->vpfechainicio);
	// oci_bind_by_name($consulta, ':v_pfecha_fin', $request->vpfechafin);
	oci_bind_by_name($consulta, ':v_pcedulasupervisor_ips', $request->vpcedulasupervisorips);
	// oci_bind_by_name($consulta, ':v_psupervisor_eps', $request->vpsupervisoreps);
	oci_bind_by_name($consulta, ':v_prepresentante_ips', $request->vprepresentanteips);
	oci_bind_by_name($consulta, ':v_pcargo_repreentante', $request->vpcargorepreentante);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
	oci_bind_by_name($consulta, ':v_pcantidad_preguntas', $request->vpcantidadpreguntas);
	oci_bind_by_name($consulta, ':v_json_preguntas', $request->vjsonpreguntas);
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
function consultaPregunta()
{
	require_once('../../php/config/dbcon.php');
  global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_preguntas(:v_pproceso,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
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
function consultaReporte()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision_ips(:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
function consultaReporteUnitario()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prenglon,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
	oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglon);
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
function consultaContratos()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN  pq_genesis_supervision.p_obtener_contratos(:v_pdocumento,:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
function consultaunicoContratos()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN  pq_genesis_supervision.p_obtener_supervision_final(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
?>
