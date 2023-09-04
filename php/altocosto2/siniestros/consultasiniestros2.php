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


function Descargar_Excel()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_SINIESTRO(:v_pestado,:v_ubicacion,:v_cohorte,:v_response); end;');
	oci_bind_by_name($consulta,':v_pestado',$request->Estado);
	oci_bind_by_name($consulta,':v_ubicacion',$request->Ubicacion);
	oci_bind_by_name($consulta,':v_cohorte',$request->Cohorte);
	oci_bind_by_name($consulta,':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	// if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	// } else {
		// echo json_encode($json);
	// }
}