<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

/////////////////////////////FUNCIONES DE CONSULTAS /////////////////////////////////////////////////////////////

function Consultas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_reporte_factura_caja(:p_vfactura,:p_vcaja,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':p_vfactura',$request->numero_factura);
	oci_bind_by_name($consulta,':p_vcaja',$request->numero_caja);
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

function Consulta_Factura()
{

	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_consulta_facturas(:v_pfactura,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_pfactura',$request->numero_factura);
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

//////////////////////////////////////////////FUNCION DE VALIDACION /////////////////////////////////////////////////////////////

function Datos_Caja()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_devuelve_caja(:v_p_caja,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_p_caja',$request->numero_caja);
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

//////////////////////////////////////////////FUNCION DE ACTUALIZACION /////////////////////////////////////////////////////////////

function Actualiza_Fact_Caja()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$json = json_encode($request->datos);
	//echo $json;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_actualiza_caja(:v_pjson_row_in,:v_pjson_row_out); end;');

	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta,':v_pjson_row_in',$json);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($json);


	//oci_bind_by_name($consulta,':v_pjson_row_in',$json);
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



function Actualiza_Fact_Caja2()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$json = json_encode($request->datos);
	//echo $json;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_INVENTARIO_CAJAS.p_actualiza_caja(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_pjson_row_in',$json);
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