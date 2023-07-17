<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();



function Cargar_Reportes()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = '';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_reporte_glosas(:v_pfechaini,:v_pfechafin,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pfechaini', $request->Fecha_Inicio);
	oci_bind_by_name($consulta, ':v_pfechafin', $request->Fecha_Fin);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'NUMERO_DOCUMENTO' => $row['NUMERO_DOCUMENTO'],
				'DOCUMENTO_FACTURA' => $row['DOCUMENTO_FACTURA'],
				'FECHA_RAD_FACTURA' => $row['FECHA_RAD_FACTURA'],
				'VALOR_FACTURA' => $row['VALOR_FACTURA'],
				'FECHA_PROCESAMIENTO_GLOSA' => $row['FECHA_PROCESAMIENTO_GLOSA'],
				'VALOR_GLOSA' => $row['VALOR_GLOSA'],
				'NIT' => $row['NIT'],
				'IPS' => $row['IPS'],
				'FACTURA' => $row['FACTURA'],
				'NOTF_FECHA_NOTIFICACION' => $row['NOTF_FECHA_NOTIFICACION'],
				'RESPONSABLE' => $row['RESPONSABLE'],
				'NOMBRE_RESPONSABLE' => $row['NOMBRE_RESPONSABLE'],
				'NOTF_FECHA' => $row['NOTF_FECHA'],
				'ESTADO' => $row['ESTADO']
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
