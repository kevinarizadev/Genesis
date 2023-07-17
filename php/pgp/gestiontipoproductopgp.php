<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Buscar_Ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_OBTENER_IPS_PGP (:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->Coinc);
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

function Obtener_Ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_CONTRATOS_MODIF_TIPO_PROD_PGP(:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->Nit);
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

function Obtener_Producto_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_DETALLE_MODIF_TIPO_PROD_PGP(:v_pempresa,:v_pdocumento,
	:v_pnumero,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $request->Empresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubicacion);
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

function Guardar_Producto_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_MODIFICACION_TIPO_PRODUCTO_PGP(:v_pempresa,:v_pdocumento,
												:v_pnumero,:v_pubicacion,:v_pproducto,:v_ptipo_producto,:v_pobservacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $request->Empresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubicacion);
	oci_bind_by_name($consulta, ':v_pproducto', $request->Producto);
	oci_bind_by_name($consulta, ':v_ptipo_producto', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Obs);
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
