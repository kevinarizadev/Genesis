<?php
session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
// error_reporting(0);
$function();
function obtener_correo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$codigoc = $request->codigoc;
	$consulta = oci_parse($c, 'begin P_OBTENER_CORREO_TERCERO(:V_PCODIGO,:v_pcorreo ); end;');
	oci_bind_by_name($consulta, ':V_PCODIGO', $codigoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcorreo', $clob, -1, OCI_B_CLOB);

	oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {

		echo 0;
	}
	oci_close($c);
}
// function buscaafiliado(){
// 	require_once('../../config/dbcon_prod.php');
// 	global $request;
// 	$type = $request->type;
// 	$num = $request->id;
// 	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_INFORMACION_BASICA(:v_tipodoc,:v_documento,:v_json_row); end;');
// 	oci_bind_by_name($consulta,':v_tipodoc',$type);
// 	oci_bind_by_name($consulta,':v_documento',$num);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
// 	oci_execute($consulta,OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	}else{
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function generareporte()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$empresa = 1;
	$regimen = $request->regimen;
	$anno = $request->anno;
	$periodo = $request->periodo;
	$ciclo = $request->ciclo;
	$tercero = $request->tercero;
	$consulta = oci_parse($c, 'begin p_n_circular_017(:v_pempresa,:v_pregimen,:v_panno,:v_pperiodo,:v_pciclo,:v_ptercero); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $empresa);
	oci_bind_by_name($consulta, ':v_pregimen', $regimen);
	oci_bind_by_name($consulta, ':v_panno', $anno);
	oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
	oci_bind_by_name($consulta, ':v_pciclo', $ciclo);
	oci_bind_by_name($consulta, ':v_ptercero', $tercero);
	$res = oci_execute($consulta, OCI_DEFAULT);
	echo $res;
	oci_close($c);
}
//   // OBTENER TOKEN GO ANYWHERE ////////////////////////////////////////////////////////////////////
function obtener_token()
{
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL => "https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_017/payload",
		//CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_017/payload",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_POSTFIELDS => ""
	]);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		// $_SESSION['token_vacunacion'] = substr($response,1,strlen($response)-2);
		// echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
		// print_r($response->data['payloadId']);
		// echo($response['data']);
		$json = json_decode($response);
		$_SESSION['tokens'] = ($json->data->payloadId);
		// echo $response->data['payloadId'];
		// echo $_SESSION['tokens'];
	}
}
//   // OBTENER TOKEN GO ANYWHERE  ANEXO1 ////////////////////////////////////////////////////////////////////
function obtener_token01()
{
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_030_01/payload",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_POSTFIELDS => ""
	]);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		// $_SESSION['token_vacunacion'] = substr($response,1,strlen($response)-2);
		// echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
		// print_r($response->data['payloadId']);
		// echo($response['data']);
		$json = json_decode($response);
		$_SESSION['tokens01'] = ($json->data->payloadId);
		// echo $response->data['payloadId'];
		// echo $_SESSION['tokens'];
	}
}
function obtener_token03()
{
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_030_03/payload",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_POSTFIELDS => ""
	]);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		// $_SESSION['token_vacunacion'] = substr($response,1,strlen($response)-2);
		// echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
		// print_r($response->data['payloadId']);
		// echo($response['data']);
		$json = json_decode($response);
		$_SESSION['tokens03'] = ($json->data->payloadId);
		// echo $response->data['payloadId'];
		// echo $_SESSION['tokens'];
	}
}
// ENVIAR A GO  anywhere ////////////////////////////////////////////////////////////////////
function enviar_goanywhere()
{
	global $request;
	$tokens = $_SESSION['tokens'];
	echo $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$datos = $request->datos;
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_017/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,

		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,

		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		//   CURLOPT_POSTFIELDS =>'{
		//    "regimen" : "C",
		//    "anno" : "2021",
		//    "mes" : "5",
		//    "ciclo" : "M",
		//    "nit" : "900600256",
		//    "correo" : "jefferson.iglesia@cajacopieps.com"
		// }',

		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
		//echo "1";
	} else {
		echo $response;
	}
}
function enviar_anexo1()
{
	global $request;
	$tokens = $_SESSION['tokens01'];

	echo $_SESSION['tokens01'];


	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$datos = $request->datos;
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://192.168.215.2/rest/forms/v1/SP_Oracle_030_01/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,

		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,

		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),


		//   CURLOPT_POSTFIELDS =>'{
		//    "regimen" : "C",
		//    "anno" : "2021",
		//    "mes" : "5",
		//    "ciclo" : "M",
		//    "nit" : "900600256",
		//    "correo" : "jefferson.iglesia@cajacopieps.com"
		// }',

		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
		//echo "1";
	} else {
		echo $response;
	}
}
function enviar_anexo3()
{
	global $request;
	$tokens = $_SESSION['tokens03'];
	echo $_SESSION['tokens03'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$datos = $request->datos;
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://192.168.215.2/rest/forms/v1/SP_Oracle_030_03/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,

		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,

		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),


		//   CURLOPT_POSTFIELDS =>'{
		//    "regimen" : "C",
		//    "anno" : "2021",
		//    "mes" : "5",
		//    "ciclo" : "M",
		//    "nit" : "900600256",
		//    "correo" : "jefferson.iglesia@cajacopieps.com"
		// }',

		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));



	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
		//echo "1";
	} else {
		echo $response;
	}
}
function Proceso_Anexo1_030()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_030_01/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
function Proceso_Anexo3_030()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_030_03/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
// function Cargue_BDUA()
// {
// 	global $request;
// 	$datos = $request->datos;
// 	$tokens = $_SESSION['tokens'];
// 	$username =  'secureForm';
// 	$password = 'Cajacopi1#';
// 	$curl = curl_init();

// 	curl_setopt_array($curl, array(
// 		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Cargue_BDUA/payload/' . $tokens . '/submit',
// 		CURLOPT_RETURNTRANSFER => true,
// 		CURLOPT_ENCODING => '',
// 		CURLOPT_MAXREDIRS => 10,
// 		CURLOPT_TIMEOUT => 30,
// 		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
// 		CURLOPT_SSL_VERIFYHOST => false,
// 		CURLOPT_SSL_VERIFYPEER => false,
// 		CURLOPT_USERPWD => $username . ":" . $password,
// 		CURLOPT_CUSTOMREQUEST => "POST",
// 		CURLOPT_POSTFIELDS => json_encode($datos),
// 		CURLOPT_HTTPHEADER => array(
// 			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
// 			'Content-Type: application/json'
// 		),
// 	));
// 	$response = curl_exec($curl);
// 	$err = curl_error($curl);
// 	curl_close($curl);
// 	if ($err) {
// 		echo $err;
// 	} else {
// 		echo $response;
// 	}
// } 
function Cargue_BDUA_contributivo()
{
	if(!isset($_SESSION)) session_start();
	obtener_token();
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Cargue_BDUA_con/payload/' . $tokens . '/submit',
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function Cargue_BDUA_subsidiado()
{
	if(!isset($_SESSION)) session_start();
	obtener_token();
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Cargue_BDUA_sub/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function Cargue_LMA()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Cargue_LMA/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
function Cargue_017()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_017/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
function Recalculo_contable()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Kprecal/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
function Autorizaciones_Venc_12_meses()
{
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_AutVenc12Meses/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));



	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
} 
// Esta funcion sirve para colocar en un array la informacion de un archivo txt ****.
function Cargue_Analisis_Autorizaciones()
{
	global $request;
	$array = array();
	$datos = $request->datos;
	// echo json_encode($datos->archivo);

	$name = uniqid();
	$base_to_php = explode(',', $datos->archivo);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".txt";
	file_put_contents($filepath, $data);
	$ruta = "../../../temp/" . $name . ".txt";

	$txt_file = fopen($ruta, 'r');
	$a = 1;
	while ($line = fgets($txt_file)) {
		// echo ($a . " " . $line) . "<br>";
		array_push($array, $line);
		$a++;
	}
	// print_r($array);
	fclose($txt_file);
	$prueba = [];
	foreach ($array as $fila_v) {
		$columnas = explode("|", $fila_v);
		$informacion = explode("\r\n", $columnas[10]);
		$object = (object) [
			'DOC_PMOV' => $columnas[0],
			'NUM_PMOV' => $columnas[1],
			'UBI_PMOV' => $columnas[2],
			'CUENTA' => $columnas[3],
			'NATURALEZA' => $columnas[4],
			'VALOR' => $columnas[5],
			'TERCERO' => $columnas[6],
			'CENTRO_DE_COSTO' => $columnas[7],
			'DOC_AUT' => $columnas[8],
			'NUM_AUT' => $columnas[9],
			'UBI_AUT' => $informacion[0]
		];
		$prueba[] = $object;
	};
	$info = json_encode($prueba);
	$empresa = 1;
	// $contadordelineas = count($prueba);
	// echo count($prueba);
	 //echo $info; // Para ver la el Json enviado
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_KMOV.p_ins_movimiento_pmov(:v_pempresa,:v_panno,:v_pperiodo,:v_pfecha,
	:v_json_row_in,:v_json_row_out); end;');
	oci_bind_by_name($consulta, ':v_pempresa',$empresa);
	oci_bind_by_name($consulta, ':v_panno',$datos->anno);
	oci_bind_by_name($consulta, ':v_pperiodo',$datos->mes);
	oci_bind_by_name($consulta, ':v_pfecha',$datos->fecha);
	// oci_bind_by_name($consulta, ':v_pcantidad', $contadordelineas);
	oci_bind_by_name($consulta, ':v_json_row_in', $info);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		$data = json_decode($json);

		if ($data->Codigo != 1) {
			$segunda_function = Cargue_Analisis_Autorizaciones_venc_12meses($datos->correo, $datos->anno, $datos->mes, $datos->fecha, $datos->responsable, $data->Numero1, $data->Numero2, $data->Numero3, $data->Numero4);
			$datos1 = json_decode($segunda_function);
			$datos2 = $datos1->error;
			if ($datos2->code == 500) {
				$respuesta1 = array('Codigo' => 0, 'msg' => 'Datos correctos');
			} else {
				$respuesta1 = array('Codigo' => 1, 'msg' => $datos2->message);
			}
			echo json_encode($respuesta1);
		} else {
			$respuesta = array('Codigo' => 1, 'msg' => $data->Nombre);
		}
		echo json_encode($respuesta);
	} else {
		echo 1;
	}
	oci_close($c);
}
function Cargue_Analisis_Autorizaciones_venc_12meses($correo, $anno, $mes, $fecha, $responsable, $Numero1, $Numero2, $Numero3, $Numero4)
{
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	$datos_final = (object) [
		'correo' => $correo,
		'anno' => $anno,
		'mes' => $mes,
		'fecha' => $fecha,
		'responsable' => $responsable,
		'numero1' => $Numero1,
		'numero2' => $Numero2,
		'numero3' => $Numero3,
		'numero4' => $Numero4
	];

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_AutVenc12MesesII/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos_final),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		return $err;
	} else {
		return  $response;
	}
}
function Cruce_de_Cartera_ips()
{
	global $request;
	$array = array();
	$zip = new ZipArchive();
	$datos = $request->datos;
	$cantFiles = 0;
	$nameFiles = [];
	// echo json_encode($datos->archivo);
	$name = uniqid();
	$nameFile = '';
	$base_to_php = explode(',', $datos->archivo);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".zip";
	file_put_contents($filepath, $data);
	$ruta = "../../../temp/" . $name . ".zip";
	$ruta2 = "../../../temp/";
	// echo $ruta;
	if ($zip->open($ruta) === TRUE) {
		for ($i = 0; $i < $zip->numFiles; $i++) {
			$cantFiles = $zip->numFiles;
			array_push($nameFiles, $nombresFichZIP['name'][$i] = $zip->getNameIndex($i));
			$nameFiles = $nombresFichZIP['name'][$i];
		}
	}
	if ($cantFiles == 1) {
		// echo $nameFiles;
		$estado = $zip->extractTo($ruta2);
	}
	if($estado != 1){
		print_r("No hay archivo");
	}else{
		$txt_file = fopen($ruta2.$nameFiles, 'r');
		$a = 1;
		while ($line = fgets($txt_file)) {
			// echo ($a . " " . $line) . "<br>";
			array_push($array, $line);
			$a++;
		}
		// print_r($array);
		fclose($txt_file);
		$prueba = [];
		foreach ($array as $fila_v) {
			$columnas = explode("|", $fila_v);
			$informacion = explode("\r\n", $columnas[17]);
			$object = (object) [
				'IPSNROID' => $columnas[0],
				'PREFIJOFACTURA' => $columnas[1],
				'NUMEROFACTURA' => $columnas[2],
				'TIPOCOBRO' => $columnas[3],
				'FECHAEMISIONFACTURA' => $columnas[4],
				'FECHAPRESENTACIONFACTURA' => $columnas[5],
				'FECHADEVOLUCIONFACTURA' => $columnas[6],
				'VALORFACTURA' => $columnas[7],
				'VALORTOTALPAGOSXFACTURA' => $columnas[8],
				'VALORGLOSAACEPTADA' => $columnas[9],
				'GLOSARESPONDIDO' => $columnas[10],
				'SALDOFACTURA' => $columnas[11],
				'FACTURAENCOBROJURIDICO' => $columnas[12],
				'ETAPAPROCESODESCRIPCION' => $columnas[13],
				'CONSECUTIVO' => $columnas[14],
				'FECHACORTE' => $columnas[15],
				'FECHACARGUE' => $columnas[16],
				'NOMBREARCHIVO' => $informacion[0]
			];
			$prueba[] = $object;
		};
// print_r($prueba);
	}
	$info = json_encode($prueba);
	// $empresa = 1;
	$contadordelineas = count($prueba);
	// echo count($prueba);
	// echo $info; // Para ver la el Json enviado
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CARTERA_FINANCIERA.p_cargue_cartera(:v_presponsable,:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $datos->responsable);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $info);
	// $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta,':v_pjson_row_in',$json);
	// oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
	// $json_parametros->writeTemporary($info);
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
		//   function RegistrarAgenda(){
		// 	global $request;
		// 	// $nit =  '890102044';
		// 	// $token = $_SESSION['token_vacunacion'];
		// 	$datos = $request->datos;
		// 	$curl = curl_init();
		// 	curl_setopt_array($curl, array(
		// 	CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/RegistrarAgendamiento/".$nit."",
		// 	CURLOPT_RETURNTRANSFER => true,
		// 	CURLOPT_ENCODING => "",
		// 	CURLOPT_MAXREDIRS => 10,
		// 	CURLOPT_TIMEOUT => 30,
		// 	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		// 	CURLOPT_CUSTOMREQUEST => "PUT",
		// 	CURLOPT_POSTFIELDS => json_encode($datos),
		// 	CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
		// 	CURLOPT_SSL_VERIFYHOST =>0,
		// 	CURLOPT_SSL_VERIFYPEER =>0 ));
		// 	$response = curl_exec($curl);
		// 	$err = curl_error($curl);
		// 	$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		// 	curl_close($curl);
		// 	if ($err) {
		// 	  echo "cURL Error #:" . $err;
		// 	} else {
		// 	echo $response;
		// 	}
		//   }
