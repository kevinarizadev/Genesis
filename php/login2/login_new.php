<?php
	session_start();
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
	$function();

	function obtener_ip(){
		@$dato = file_get_contents("https://ipecho.net/plain");
		if($dato === FALSE) {
			return "0"; 
		} else {
			return $dato;
		}
	}

    function autenticacion(){
		require_once('../config/dbcon_prod.php');
		global $param;
        $datos = json_decode($param->json);
		$nit = $datos->nit;
		$user = $datos->user;
		$pass = $datos->pass;
		$consulta = oci_parse($c,'begin pq_genesis_login.P_AUTORIZACION_FUNCIONARIOS(:v_pnit,:v_pusuario,:v_pclave,:v_prespuesta); end;');
	  	oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pusuario',$user);
		oci_bind_by_name($consulta,':v_pclave',$pass);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			$data = json_decode($json);
			if($data->Codigo == "0"){
				$Sesion = json_decode($data->Sesion);
				if (isset($Sesion) && $nit=="0") {
					// inicio como funcionario
					$_SESSION['nombre'] = $Sesion->{'nombre'};
					$_SESSION['tipo'] = $Sesion->{'tipo'};
					$_SESSION['cedula'] = $Sesion->{'cedula'};
					$_SESSION['rol'] = 'Funcionario';
					$_SESSION['rolcod'] = $Sesion->{'rolcod'};
					$_SESSION['codmunicipio'] =  $Sesion->{'codmunicipio'};
					$_SESSION['usu'] = $user;
					$_SESSION['acc'] = $pass;
					$_SESSION['isdirect'] = $Sesion->{'tipocontrato'};
					$_SESSION['imagen'] = $Sesion->{'imagen'};
					$_SESSION['tipo_sidebar'] = "0";
					//$_SESSION['ip_pub'] = obtener_ip();
				}else if(isset($Sesion) && $nit!="0") {
					// inicio como ips
					$_SESSION['nombre'] = $Sesion->nombreips." - ".$Sesion->{'nombre'};
					$_SESSION['nomips'] = $Sesion->nombreips;
					$_SESSION['ente_territorial'] = $Sesion->ente_territorial;
					$_SESSION['tipo'] = $Sesion->{'tipo'};
					$_SESSION['cedula'] = $Sesion->{'documento'};
					$_SESSION['rol'] = 'IPS';
					$_SESSION['nit'] = $nit;
					$_SESSION['rolcod'] = $Sesion->{'rolcod'};
					$_SESSION['usu'] = $user;
					$_SESSION['acc'] = $pass;
					$_SESSION['tipo_sidebar'] = "1";
				}
				echo $json;
			} else if($data->Codigo == "3") {
				$_SESSION['Codigo_Desbloqueo'] = $data->{'Codigo_Desbloqueo'};
				echo $json;
			} else {
				echo $json;
			}
		}
		oci_close($c);
    }
    function verificacion_IPS(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $datos = json_decode($param->json);
		$nit = $datos->nit;
		$user = $datos->user;
		$pass = $datos->pass;
		$codigo = $datos->codigo;
		$consulta = oci_parse($c,'begin pq_genesis_login.P_VERIFICACION_CODIGO_IPS (:v_pnit,:v_pusuario,:v_pclave,:v_pcodigo,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pusuario',$user);
		oci_bind_by_name($consulta,':v_pclave',$pass);
		oci_bind_by_name($consulta,':v_pcodigo',$codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			$data = json_decode($json);
			if($data->Codigo == "0"){
				$data->Sesion = json_decode($data->Sesion);
				$data->Sesion->cedula = $data->Sesion->documento;
				unset($data->Sesion->documento);
				$data->Sesion->rol = "IPS";
				$data->Sesion->nit = $nit;
				$data->Sesion->usu = $user;
				$data->Sesion->acc = $pass;
				$Sesion = $data->Sesion;
				if (isset($Sesion)) {
					// inicio por codigo de verificacion ips
					$_SESSION['nombre'] = $Sesion->nombre;
					$_SESSION['tipo'] = $Sesion->tipo;
					$_SESSION['cedula'] = $Sesion->cedula;
					$_SESSION['nomips'] = $Sesion->nombreips;
					$_SESSION['rol'] = $Sesion->rol;
					$_SESSION['nit'] = $Sesion->nit;
					$_SESSION['rolcod'] = $Sesion->rolcod;
					$_SESSION['usu'] = $Sesion->usu;
					$_SESSION['acc'] = $Sesion->acc;
					$_SESSION['tipo_sidebar'] = "2";
				}
				echo json_encode($data);
			} else {
				echo $json;
			}
		} else {
			echo 0;
		}
		oci_close($c);
	}
	function enviarMensajeAlMovil(){
		global $param;
		$datos = json_decode($param->json);
		// echo  "Cedular: ".$datos->movil." - Nombre: ".$datos->nombre." - Codigo: ".$_SESSION['Codigo_Desbloqueo'];
		if ($_SESSION['Codigo_Desbloqueo']!="0") {
			$movil = $datos->movil;
			$nombre = $datos->nombre;
			$codigo = $_SESSION['Codigo_Desbloqueo'];
			//url de la petición
			$url = 'https://api.infobip.com/sms/1/text/single';
			//inicializamos el objeto CUrl
			$ch = curl_init($url);
			//el json simulamos una petición de un login
			$jsonData = array(
				'from' => 'CajacopiEPS',
				'to' => "57".$movil,
				'text' => 'Sr(a). '.$nombre.' su codigo de desbloqueo es '.$codigo
			);
			$header = array(
				'Content-Type: application/json',
				'authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
				'accept: application/json'
			);
			//creamos el json a partir de nuestro arreglo
			$jsonDataEncoded = json_encode($jsonData);

			//Indicamos que nuestra petición sera Post
			curl_setopt($ch, CURLOPT_POST, 1);

			//para que la peticion no imprima el resultado como un echo comun, y podamos manipularlo
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			//Adjuntamos el json a nuestra petición
			curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

			//Agregamos los encabezados del contenido
			curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
			//ignorar el certificado, servidor de desarrollo
			//utilicen estas dos lineas si su petición es tipo https y estan en servidor de desarrollo
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

			//Ejecutamos la petición
			$result = curl_exec($ch);
			$_SESSION['Codigo_Desbloqueo'] = "0";
			echo $result;
		} else {
			echo $_SESSION['Codigo_Desbloqueo'];
		}
	}
	function desbloquear_usuario(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $datos = json_decode($param->json);
		$nit = $datos->nit;
		$cedula = $datos->cedula;
		$codigo = $datos->codigo;
		$consulta = oci_parse($c,'begin pq_genesis_login.P_VERIFICAR_CODIGO_DESBLOQUEO (:v_pnit,:v_pcedula,:v_pcodigo,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pcedula',$cedula);
		oci_bind_by_name($consulta,':v_pcodigo',$codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			$data = json_decode($json);
			if($data->Codigo == "0"){
				// $data->Sesion = json_decode($data->Sesion);
				// $data->Sesion->cedula = $data->Sesion->documento;
				// unset($data->Sesion->documento);
				// $data->Sesion->rol = "IPS";
				// $data->Sesion->nit = $nit;
				// $data->Sesion->usu = $user;
				// $data->Sesion->acc = $pass;
				// $Sesion = $data->Sesion;
				// if (isset($Sesion)) {
				// 	// inicio por codigo de verificacion ips
				// 	$_SESSION['nombre'] = $Sesion->nombre;
				// 	$_SESSION['tipo'] = $Sesion->tipo;
				// 	$_SESSION['cedula'] = $Sesion->cedula;
				// 	$_SESSION['nomips'] = $Sesion->nombreips;
				// 	$_SESSION['rol'] = $Sesion->rol;
				// 	$_SESSION['nit'] = $Sesion->nit;
				// 	$_SESSION['rolcod'] = $Sesion->rolcod;
				// 	$_SESSION['usu'] = $Sesion->usu;
				// 	$_SESSION['acc'] = $Sesion->acc;
				// 	$_SESSION['tipo_sidebar'] = "2";
				// }
				echo $json;
			} else {
				echo $json;
			}
		} else {
			echo 0;
		}
		oci_close($c);
	}
	function desbloquear_funcionario(){
        require_once('../config/dbcon_prod.php');
        global $param;
		$usuario = $param->usuario;
		$consulta = oci_parse($c,'begin pq_genesis_login.p_desloquear_usuario(:v_pusuario,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pusuario',$usuario);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			$data = json_decode($json);
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
    }
?>