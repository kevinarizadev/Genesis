<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Obt_Nit()
{
	echo ($_SESSION["nit"]);
}

function Obt_Acas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PRUEBAS_SP.P_OBTENER_ACAS(:v_pjson_row_in,:v_pjson_row_out); end;');
	// $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_OBTENER_ACAS_2(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->xdata);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		// var_dump(json_decode($json));
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obt_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_obtener_funcionario(:v_pdato,:v_json_out,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdato', $request->Coincidencia);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NOMBRE' => $row['NOMBRE'],
			));
		}
		echo json_encode($array);
	} else {
		echo json_encode($json);
	}
	oci_free_statement($consulta);
	oci_free_statement($curs);
	oci_close($c);
}

function Consulta_EPS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin Pq_genesis_glosa.p_lista_glosas_estado_eps(:v_pestado,:v_pnumero,:v_pubicacion,:v_pfechaini,:v_pfechafin,:v_pnit,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta,':v_pestado',$request->Estado);
	oci_bind_by_name($consulta,':v_pnumero',$request->Num);
	oci_bind_by_name($consulta,':v_pubicacion',$request->Ubi);
	oci_bind_by_name($consulta,':v_pfechaini',$request->F_Inicio);
	oci_bind_by_name($consulta,':v_pfechafin',$request->F_Fin);
	oci_bind_by_name($consulta,':v_pnit',$request->Nit);
	oci_bind_by_name($consulta,':v_json_out', $json, 4000);
	oci_bind_by_name($consulta,':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}

function Consulta_IPS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin Pq_genesis_glosa.p_lista_glosas_estado(:v_pestado,:v_pnumero,:v_pubicacion,:v_pnit,:v_pfechaini,:v_pfechafin,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta,':v_pestado',$request->Estado);
	oci_bind_by_name($consulta,':v_pnumero',$request->Num);
	oci_bind_by_name($consulta,':v_pubicacion',$request->Ubi);
	oci_bind_by_name($consulta,':v_pnit',$request->Nit);
	oci_bind_by_name($consulta,':v_pfechaini',$request->F_Inicio);
	oci_bind_by_name($consulta,':v_pfechafin',$request->F_Fin);
	oci_bind_by_name($consulta,':v_json_out', $json, 4000);
	oci_bind_by_name($consulta,':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}