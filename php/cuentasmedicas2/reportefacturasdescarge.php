<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();



function Cargar_Reportes_EREF()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_lista_facturas_eref(:v_pdocumento,:v_pfechaini,:v_pfechafin,:v_presponsable,:v_pestado,:v_json_out,:v_json_resumen,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
    oci_bind_by_name($consulta, ':v_pfechaini', $request->Fecha_Inicio);
    oci_bind_by_name($consulta, ':v_pfechafin', $request->Fecha_Fin);
    oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
    oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		oci_execute($curs, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($curs, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		// echo json_encode($datos);
		// $array = array();
		// while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
		// 	array_push($array, array(
		// 		'DOCUMENTO' => $row['DOCUMENTO'],
		// 		'CONCEPTO' => $row['CONCEPTO'],
		// 		'NUMERO' => $row['NUMERO'],
		// 		'UBICACION' => $row['UBICACION'],
		// 		'TERCERO' => $row['TERCERO'],
		// 		'TOTAL' => $row['TOTAL'],
		// 		'ESTADO' => $row['ESTADO'],
		// 		'PREFIJO' => $row['PREFIJO'],
		// 		'FACTURA2' => $row['FACTURA2'],
		// 		'FACTURA' => $row['FACTURA'],
		// 		'ALTOCOSTO' => $row['ALTOCOSTO'],
		// 		'NOMBRE_TERCERO' => $row['NOMBRE_TERCERO'],
		// 		'CONFIRMACION' => $row['CONFIRMACION'],
		// 		'RECIBO' => $row['RECIBO'],
		// 		'RECIBO_FECHA' => $row['RECIBO_FECHA'],
		// 		'COPAGO' => $row['COPAGO'],
		// 		'IDRESPONSABLE' => $row['IDRESPONSABLE'],
		// 		'RESPONSABLE' => $row['RESPONSABLE']
		// 	));
		// }
		$dato = '[{"array":'.json_encode($datos).'},{"resumen":'.($json2).'}]';
		// echo json_encode($array);
		// echo json_encode($json2);
		// echo json_encode($dato);
		echo $dato;

	} else {
		echo json_encode($json);
	}

	oci_free_statement($consulta);
	oci_free_statement($curs);

	oci_close($c);
}

//////////////////////////////////////
function Cargar_Reportes_EFCE()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_lista_facturas_efce (:v_pdocumento,:v_pconcepto,:v_pfechaini,:v_pfechafin,:v_pradicador,:v_presponsable,:v_pestado,:v_pnit,:v_json_out,:v_json_resumen,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
    oci_bind_by_name($consulta, ':v_pconcepto', $request->Con);
    oci_bind_by_name($consulta, ':v_pfechaini', $request->Fecha_Inicio);
    oci_bind_by_name($consulta, ':v_pfechafin', $request->Fecha_Fin);
    oci_bind_by_name($consulta, ':v_pradicador', $request->Rad);
    oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
    oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
    oci_bind_by_name($consulta, ':v_pnit', $request->Nit);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    $curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		oci_execute($curs, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($curs, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		$dato = '[{"array":'.json_encode($datos).'},{"resumen":'.($json2).'}]';
		echo $dato;
	} else {
		echo json_encode($json);
	}

	oci_free_statement($consulta);
	oci_free_statement($curs);

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

function Obt_Conceptos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$area = 'CM';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_CONCEPTOS(:v_parea,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parea', $area);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
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

function Obt_Ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_IPS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->Coincidencia);
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

///nuevo
function p_lista_glosas_ergp()
{
	require_once('../config/dbcon_prod.php');
	global $request; 
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.P_LISTA_GLOSAS_ERGP(:v_pnit,
																				:v_pfactura,
																				:v_pfechaini,
																				:v_pfechafin,
																				:v_pvalormin,
																				:v_pvalormax,
																				:v_pestado,
																				:v_json_out,
																				:v_result); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->v_pnit);
    oci_bind_by_name($consulta, ':v_pfactura', $request->v_pfactura);
    oci_bind_by_name($consulta, ':v_pfechaini', $request->v_pfechaini);
    oci_bind_by_name($consulta, ':v_pfechafin', $request->v_pfechafin);
    oci_bind_by_name($consulta, ':v_pvalormin', $request->v_pvalormin);
    oci_bind_by_name($consulta, ':v_pvalormax', $request->v_pvalormax);
    oci_bind_by_name($consulta, ':v_pestado', $request->v_pestado);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		oci_execute($curs, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($curs, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	 //echo $curs;
		// $array = array();
		// while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
		// 	array_push($array, array(
		// 		'DOCUMENTO' => $row['DOCUMENTO'],
		// 		'CONCEPTO' => $row['CONCEPTO'],
		// 		'NUMERO' => $row['NUMERO'],
		// 		'UBICACION' => $row['UBICACION'],
		// 		'TERCERO' => $row['TERCERO'],
		// 		'TOTAL' => $row['TOTAL'],
		// 		'ESTADO' => $row['ESTADO'],
		// 		'PREFIJO' => $row['PREFIJO'],
		// 		'FACTURA2' => $row['FACTURA2'],
		// 		'FACTURA' => $row['FACTURA'],
		// 		'ALTOCOSTO' => $row['ALTOCOSTO'],
		// 		'NOMBRE_TERCERO' => $row['NOMBRE_TERCERO'],
		// 		'CONFIRMACION' => $row['CONFIRMACION'],
		// 		'RECIBO' => $row['RECIBO'],
		// 		'RECIBO_FECHA' => $row['RECIBO_FECHA'],
		// 		'COPAGO' => $row['COPAGO'],
		// 		'IDRESPONSABLE' => $row['IDRESPONSABLE'],
		// 		'RESPONSABLE' => $row['RESPONSABLE']
		// 	));
		// }
		$dato = '[{"array":'.json_encode($datos).'},{"resumen":'.($json).'}]';
		// echo json_encode($array);
		// echo json_encode($json2);
		// echo json_encode($dato);
		echo $dato;

	} else {
		echo json_encode($json);
	}

	oci_free_statement($consulta);
	oci_free_statement($curs);

	oci_close($c);
}

