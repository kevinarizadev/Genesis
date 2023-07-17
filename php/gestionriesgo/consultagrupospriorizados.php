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
	//echo "1045693360";
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Descargar_Excel()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin PQ_GENESIS_GESTION_ACGS.P_DESCARGA_GESTIONES_GS(:v_pfecha_inicio,:v_pfecha_fin,:v_pubicacion,:v_presponsable,:v_response); end;');
	oci_bind_by_name($consulta,':v_pfecha_inicio',$request->F_Inicio);
	oci_bind_by_name($consulta,':v_pfecha_fin',$request->F_Fin);
	oci_bind_by_name($consulta,':v_pubicacion',$request->Ubicacion);
	oci_bind_by_name($consulta,':v_presponsable',$request->Responsable);
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