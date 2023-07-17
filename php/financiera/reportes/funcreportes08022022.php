<?php
	session_start();
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    // error_reporting(0);

	$function();



    function obtener_correo(){
        require_once('../../config/dbcon_prod.php');		
        global $request;
		$codigoc = $request ->codigoc;
        $consulta = oci_parse($c, 'begin P_OBTENER_CORREO_TERCERO(:V_PCODIGO,:v_pcorreo ); end;');
		oci_bind_by_name($consulta,':V_PCODIGO',$codigoc);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pcorreo', $clob,-1,OCI_B_CLOB);
        
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

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



	function generareporte(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$empresa = 1;
		$regimen = $request->regimen;
		$anno = $request->anno;
		$periodo = $request->periodo;
		$ciclo = $request->ciclo;
		$tercero = $request->tercero;
		$consulta = oci_parse($c,'begin p_n_circular_017(:v_pempresa,:v_pregimen,:v_panno,:v_pperiodo,:v_pciclo,:v_ptercero); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_pciclo',$ciclo);
		oci_bind_by_name($consulta,':v_ptercero',$tercero);
		$res = oci_execute($consulta,OCI_DEFAULT);
		echo $res;
		oci_close($c);
	}




		
	    //   // OBTENER TOKEN GO ANYWHERE ////////////////////////////////////////////////////////////////////
		
		function obtener_token(){
		$username =  'secureForm';
		$password = 'Cajacopi1#';		
		$curl = curl_init();		
		curl_setopt_array($curl, [
			CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_017/payload",
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
		
		function obtener_token01(){
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
		

		function obtener_token03(){
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
		  function enviar_goanywhere(){
			global $request;
			$tokens = $_SESSION['tokens'];

			echo $_SESSION['tokens'];


			$username =  'secureForm';
			$password = 'Cajacopi1#';
			$datos = $request->datos;
			$curl = curl_init();

			curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://192.168.215.2/rest/forms/v1/SP_Oracle_017/payload/'.$tokens.'/submit',
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

			

			function enviar_anexo1(){
				global $request;
				$tokens = $_SESSION['tokens01'];
	
				echo $_SESSION['tokens01'];
	
	
				$username =  'secureForm';
				$password = 'Cajacopi1#';
				$datos = $request->datos;
				$curl = curl_init();
	
				curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://192.168.215.2/rest/forms/v1/SP_Oracle_030_01/payload/'.$tokens.'/submit',
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
			

			function enviar_anexo3(){
				global $request;
				$tokens = $_SESSION['tokens03'];
	
				echo $_SESSION['tokens03'];
	
	
				$username =  'secureForm';
				$password = 'Cajacopi1#';
				$datos = $request->datos;
				$curl = curl_init();
	
				curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://192.168.215.2/rest/forms/v1/SP_Oracle_030_03/payload/'.$tokens.'/submit',
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
