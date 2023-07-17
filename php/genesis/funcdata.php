<?php
	Session_start();
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	
	function Save_Data(){
		global $request;
		$_SESSION['ip_pub'] = $request->data;
		if($request->data == '1'){
			$mensaje = 'Error al obtener la ip publica, favor revisar.';
			$url = 'https://api.infobip.com/sms/1/text/single';
			$data = array('from' => 'CajacopiEPS', 'to' => '573045947779', 'text'  => $mensaje);
			$options = array(
				'http' => array(
					'method'  => 'POST',
					'header'  =>
					"Content-Type: application/x-www-form-urlencoded\r\n" .
						"Authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==\n",
					'content' => http_build_query($data)
				)
			);
			$context  = stream_context_create($options);
			$result = file_get_contents($url, false, $context);
			if ($result === FALSE) {
				echo(json_encode(array('Codigo' => '1', 'Nombre' => 'Error al enviar codigo, por favor intente nuevamente')));
			}
		}
	}
?>