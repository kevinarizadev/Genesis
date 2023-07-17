
<?php
error_reporting(0);
header("Content-Type: text/html;charset=utf-8");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
header("Allow: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function ConsultarAfiliado()
{
	require_once('config/dbcon_prod.php');
	global $request;
	$tipo = $request->TipoIDPaciente;
	$documento = $request->NoIDPaciente;
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_plan_vacunacion.p_consulto_afiliado_vacuna(:v_tipo_documento,:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_documento', $documento);
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


function ListadoIPS()
{
	require_once('config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin oasis.pq_genesis_plan_vacunacion.p_prestadores_vacuna_covid(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);	
	echo json_encode($datos);
	}





?>
