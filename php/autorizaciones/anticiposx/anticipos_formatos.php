<?php
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Obt_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_IMPRIMIR_ANTICIPO(:VP_NUMERO,:VP_TIPODOC,:VP_DOC,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_TIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':VP_DOC', $request->NumeroDoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function Obt_Pertinencia()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_IMPRIMIR_PERTINENCIA(:VP_NUMERO,:VP_TIPODOC,:VP_DOC,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_TIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':VP_DOC', $request->NumeroDoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obt_Certificacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_IMPRIMIR_CERTIFICACION(:VP_NUMERO,:VP_TIPODOC,:VP_DOC,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_TIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':VP_DOC', $request->NumeroDoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}






function Encry()
{

	// Decry();
	require_once('../../config/dbcon_prod.php');

	global $request;
	// $firma = $request->Imagen;
	$firma = $request->Imagen;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_JSON(:VP_JSON,:VP_JSON_ROW); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($firma);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	// $clob->writeTemporary($firma, OCI_TEMP_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function Encry2()
{

	// Decry();
	require_once('../../config/dbcon_prod.php');

	global $request;
	// $firma = $request->Imagen;
	// $firma = strigToBinary($request->Imagen);

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OJSON(:VP_JSON_ROW); end;');	
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	// $clob->writeTemporary($firma, OCI_TEMP_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		// $base = binaryToString($json);
		echo Base642($json);
	} else {
		echo 0;
	}
	oci_close($c);
}

function Base642($base)
{
	$name = uniqid();
	$base_to_php = explode(',', $base);
	$data = base64_decode($base_to_php[1]);
	// $data = base64_decode($base_to_php);
	$filepath = "../../../temp/" . $name . ".pdf";
	file_put_contents($filepath, $data);
	echo ("../../../temp/" . $name . ".pdf");
}


function strigToBinary($string)
{
	$characters = str_split($string);

	$binary = [];
	foreach ($characters as $character) {
		$data = unpack('H*', $character);
		$binary[] = base_convert($data[1], 16, 2);
	}
	return implode(' ', $binary);
}


function binaryToString($binary)
{
	$binaries = explode(' ', $binary);

	$string = null;
	foreach ($binaries as $binary) {
		$string .= pack('H*', dechex(bindec($binary)));
	}

	return $string;
}

function Decry()
{
	require_once('../../config/dbcon_prod.php');
	global $request;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_SIGNATURE(:VP_TIPO_DOC,:VP_DOCUMENTO,:VP_NUMERO,:VP_CARGO,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_TIPO_DOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':VP_DOCUMENTO', $request->NumDoc);
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_CARGO', $request->Cargo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		// echo $json;
		$base = binaryToString($json);
		echo Base64($base);
	} else {
		echo 0;
	}
	oci_close($c);
}


function Base64($base)
{
	$name = uniqid();
	$base_to_php = $base;
	$data = base64_decode($base_to_php);
	// $data = base64_decode($base_to_php);
	$filepath = "../../../temp/" . $name . ".jpg";
	file_put_contents($filepath, $data);
	echo ("../../../temp/" . $name . ".jpg");
}


// function Base64($base)
// {
// 	$name = uniqid();
// 	$base_to_php = explode(',', $base);
// 	$data = base64_decode($base_to_php[1]);
// 	// $data = base64_decode($base_to_php);
// 	$filepath = "../../../temp/" . $name . ".jpg";
// 	file_put_contents($filepath, $data);
// 	echo ("../../../temp/" . $name . ".jpg");
// }
