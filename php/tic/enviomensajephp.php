<?php
function EnviarMensajeSMS($celular,$mensaje)
{
  $datos = array(
  'user'=>'cajacopi',
	'password'=>'Colombia2023@',
	'destination'=> '+57'.$celular,// $request->celular;
	'message'=> $mensaje,// $request->mensaje;
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
		return $err;
	} else {
		return $response;
	}
}