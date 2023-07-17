<?php
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function obtenerreportes(){
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	global $request;
	$v_prol = $request->v_prol;
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS.p_obtener_procesos_especiales(:v_prol, :v_pjson_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_prol',$v_prol);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':v_pjson_row', $clob,-1,OCI_B_CLOB);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
}

function P_VALOR_RADICADO_CONTRATO(){

	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN P_VALOR_RADICADO_CONTRATO(:V_PFECHAINICIO,
																	:V_PFECHAFIN,
																	:V_PREGIMEN,
																	:V_PCONTRATO,
																	:V_PJSON_OUT); end;');

	oci_bind_by_name($consulta,':V_PFECHAINICIO',$request->V_PFECHAINICIO);
	oci_bind_by_name($consulta,':V_PFECHAFIN',$request->V_PFECHAFIN);
	oci_bind_by_name($consulta,':V_PREGIMEN',$request->V_PREGIMEN);
	oci_bind_by_name($consulta,':V_PCONTRATO',$request->V_PCONTRATO);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':V_PJSON_OUT', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}

	oci_close($c);
}

?>
