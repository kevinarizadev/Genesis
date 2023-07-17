<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function EnviarMensajeSMS()
{
	global $request;
  global $request;
  $dato = $request->data;
  $datos = array(
  'user'=>'cajacopi',
	'password'=>'Colombia2023@',
	'destination'=> $dato->celular,// $request->celular;
	'message'=> $dato->mensaje,// $request->mensaje;
	'concatMsg'=>true
  );
	$curl = curl_init();

	curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://contactalos.com/services/rs/sendsms.php',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => $datos,
		CURLOPT_HTTPHEADER => $datos,
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