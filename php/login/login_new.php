<?php
// error_reporting(0);
session_start();
$postdata = file_get_contents("php://input");
$param = json_decode($postdata);
if(!isset($param->function)){
  return;
}
$function = $param->function;
$function();

function obtener_ip()
{
  @$dato = file_get_contents("https://ipecho.net/plain");
  if ($dato === FALSE) {
    return "0";
  } else {
    return $dato;
  }
}

// $sessionId = session_id();

// // Imprimir el ID de sesión
// echo "El ID de sesión es: $sessionId";

function autenticacion()
{
  global $param;
  $datos = json_decode($param->json);
  $nit = $datos->nit;
  $user = $datos->user;
  $pass = $datos->pass;
  if ($nit == '0' && !preg_match('/^[a-zA-ZñÑ]{1,20}.{0,1}[a-zA-ZñÑ]{0,20}$/', $user)) {
    echo '{"Codigo":"1","Mensaje":"Usuario y/o contraseña incorrectox"}';
    return;
  }

  require_once('../config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin pq_genesis_login.P_AUTORIZACION_FUNCIONARIOS(:v_pnit,:v_pusuario,:v_pclave,:v_prespuesta); end;');
  oci_bind_by_name($consulta, ':v_pnit', $nit);
  oci_bind_by_name($consulta, ':v_pusuario', $user);
  oci_bind_by_name($consulta, ':v_pclave', $pass);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $data = json_decode($json);
    if ($data->Codigo == "0") {
      $Sesion = json_decode($data->Sesion);
      if (isset($Sesion) && $nit == "0") {
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
        //$_SESSION['isdirect_nomina'] = $Sesion->{'tiponomina'};
        $_SESSION['imagen'] = $Sesion->{'imagen'};
        $_SESSION['tipo_sidebar'] = "0";
        $_SESSION['cambioclave'] = $data->CambioClave;
        //$_SESSION['ip_pub'] = obtener_ip();
      } else if (isset($Sesion) && $nit != "0") {
        // inicio como ips
        $_SESSION['nombre'] = $Sesion->nombreips . " - " . $Sesion->{'nombre'};
        $_SESSION['nomips'] = $Sesion->nombreips;
        $_SESSION['ente_territorial'] = $Sesion->ente_territorial;
        $_SESSION['tipo'] = $Sesion->{'tipo'};
        $_SESSION['cedula'] = $Sesion->{'documento'};
        $_SESSION['rol'] = 'IPS';
        $_SESSION['nit'] = strval(intval($nit));
        $_SESSION['rolcod'] = $Sesion->{'rolcod'};
        $_SESSION['usu'] = $user;
        $_SESSION['acc'] = $pass;
        $_SESSION['tipo_sidebar'] = "1";
      }
      echo $json;
    } else if ($data->Codigo == "3") {
      $_SESSION['Codigo_Desbloqueo'] = $data->{'Codigo_Desbloqueo'};
      echo $json;
    } else {
      echo $json;
    }
  }
  oci_close($c);
}

function verificacion_IPS()
{
  require_once('../config/dbcon_login.php');
  global $param;
  $datos = json_decode($param->json);
  $nit = $datos->nit;
  $user = $datos->user;
  $pass = $datos->pass;
  $codigo = $datos->codigo;
  $consulta = oci_parse($c, 'begin pq_genesis_login.P_VERIFICACION_CODIGO_IPS (:v_pnit,:v_pusuario,:v_pclave,:v_pcodigo,:v_prespuesta); end;');
  oci_bind_by_name($consulta, ':v_pnit', $nit);
  oci_bind_by_name($consulta, ':v_pusuario', $user);
  oci_bind_by_name($consulta, ':v_pclave', $pass);
  oci_bind_by_name($consulta, ':v_pcodigo', $codigo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $data = json_decode($json);
    if ($data->Codigo == "0") {
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
function enviarMensajeAlMovil()
{
  global $param;
  $datos = json_decode($param->json);
  // echo  "Cedular: ".$datos->movil." - Nombre: ".$datos->nombre." - Codigo: ".$_SESSION['Codigo_Desbloqueo'];
  if ($_SESSION['Codigo_Desbloqueo'] != "0") {
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
      'to' => "57" . $movil,
      'text' => 'Sr(a). ' . $nombre . ' su codigo de desbloqueo es ' . $codigo
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
function desbloquear_usuario()
{
  require_once('../config/dbcon_login.php');
  global $param;
  $datos = json_decode($param->json);
  $nit = $datos->nit;
  $cedula = $datos->cedula;
  $codigo = $datos->codigo;
  $consulta = oci_parse($c, 'begin pq_genesis_login.P_VERIFICAR_CODIGO_DESBLOQUEO (:v_pnit,:v_pcedula,:v_pcodigo,:v_prespuesta); end;');
  oci_bind_by_name($consulta, ':v_pnit', $nit);
  oci_bind_by_name($consulta, ':v_pcedula', $cedula);
  oci_bind_by_name($consulta, ':v_pcodigo', $codigo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $data = json_decode($json);
    if ($data->Codigo == "0") {
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
function desbloquear_funcionario()
{
  require_once('../config/dbcon_unlock.php');
  global $param;
  $usuario = $param->usuario;
  if (!preg_match('/^[a-z]{1,12}.{0,1}[a-z]{0,12}$/', $param->usuario)) {
    echo '{"codigo":"1","mensaje":"Usuario incorrecto"}';
    return;
  }
  $consulta = oci_parse($c, 'begin pq_genesis_login.p_desloquear_usuario(:v_pusuario,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pusuario', $usuario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $data = json_decode($json);
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function Obtener_Tipos_Documentos()
{
  require_once('../config/dbcon_login.php');
  $cursor = oci_new_cursor($c);
  $Tipo = 'S';
  $consulta = oci_parse($c, 'begin pq_genesis.p_obtener_tipo_documento(:v_tipo,:v_response); end;');
  oci_bind_by_name($consulta, ':v_tipo', $Tipo);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function enviarPass()
{
  echo '{"Codigo":"0","Mensaje":"¡Mensaje enviado, por favor revise su celular!","userPass": "'.$_SESSION['expedicion'].'" }';
  return;

  include('../tic/enviomensajephp.php');
  global $param;
  $movil = $param->movil;
    // $url = 'https://api.infobip.com/sms/1/text/single';
    // //inicializamos el objeto CUrl
    // $ch = curl_init($url);
    // print_r($_SESSION);
    // $_SESSION['f_expedicion'] <- variable se crea en el archivo recuperarpass.php, funcion verificapass()
  if (!isset($_SESSION['expedicion'])) {
    echo '{"Codigo":"1","Mensaje":"¡Error al enviar el codigo!"}';
    return;
  }
  $mensaje = 'Su contraseña para el Portal Genesis de CajacopiEPS es: ' . $_SESSION['expedicion'];
  $enviomensaje = EnviarMensajeSMS($movil,$mensaje);
  echo $enviomensaje;
  // $jsonData = array(
  //   'from' => 'CajacopiEPS',
  //   'to' => '+57' . $movil,
  //   'text' => 'Su contraseña para el Portal Genesis de CajacopiEPS es: ' . $_SESSION['expedicion']
  // );
  // $header = array(
  //   'Content-Type: application/json',
  //   'authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
  //   'accept: application/json'
  // );
  // //creamos el json a partir de nuestro arreglo
  // $jsonDataEncoded = json_encode($jsonData);
  // //Indicamos que nuestra petición sera Post
  // curl_setopt($ch, CURLOPT_POST, 1);
  // //para que la peticion no imprima el resultado como un echo comun, y podamos manipularlo
  // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  // //Adjuntamos el json a nuestra petición
  // curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
  // //Agregamos los encabezados del contenido
  // curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
  // //ignorar el certificado, servidor de desarrollo
  // //utilicen estas dos lineas si su petición es tipo https y estan en servidor de desarrollo
  // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
  // //Ejecutamos la petición
  // $result = curl_exec($ch);
  echo '{"Codigo":"0","Mensaje":"¡Mensaje enviado, por favor revise su celular!","userPass": "'.$_SESSION['expedicion'].'" }';
}

function log_de_acceso_funcionario(){
  require_once('../config/dbcon_login.php');
  global $param;
$consulta = oci_parse($c,'begin PQ_GENESIS_TIC.aud_login_genesis(:v_pusuario,:v_pippublica,:v_pipprivada,:p_json_out); end;');
oci_bind_by_name($consulta,':v_pusuario',$param->usuario);
oci_bind_by_name($consulta,':v_pippublica',$param->ip_dispositivo);
oci_bind_by_name($consulta,':v_pipprivada',$param->ip_privada);
$clob = oci_new_descriptor($c,OCI_D_LOB);
oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
oci_execute($consulta,OCI_DEFAULT);
if (isset($clob)) {
$json = $clob->read($clob->size());
echo $json;
} else {
echo 0;
}
oci_close($c);
}

function log_de_acceso()
{
  global $param;
  $currentDateTime = date('Y-m-d H:i:s');
  //echo ;
  $file = @fopen("log_user.txt", "a");
  fwrite($file, "Usuario: $param->usuario, Tipo usuario: $param->tipousuario, Navegador: $param->navegador, IP solicitud: $param->ip_dispositivo, Fecha (Y-m-d H:i:s): $currentDateTime, Tipo Dispositivo: $param->tipo_dispositivo." . PHP_EOL);
  fclose($file);
}



function autenticacion_R4()
{
  global $param;
  $datos = json_decode($param->json);
  $nit = $datos->nit;
  $user = $datos->user;
  $pass = $datos->pass;
  if ($nit == '0' && !preg_match('/^[a-z]{1,12}.{0,1}[a-z]{0,12}$/', $user)) {
    echo '{"Codigo":"1","Mensaje":"Usuario y/o contraseña incorrecto"}';
    return;
  }
  $tipo = '0';
  require_once('../config/dbcon_login_R4.php');
  $consulta = oci_parse($c, 'begin PQ_GENESIS_LOGIN_R4.P_OBTENER_LOGIN(:v_usuario,:v_password,:v_ptipo,:v_res); end;');
  oci_bind_by_name($consulta, ':v_usuario', $user);
  oci_bind_by_name($consulta, ':v_password', $pass);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
    // $data = json_decode($json);
    // if ($data->Codigo == "0") {
      // $Sesion = json_decode($data->Sesion);
      // if (isset($Sesion) && $nit == "0") {
      //   // inicio como funcionario
      //   $_SESSION['nombre'] = $Sesion->{'nombre'};
      //   $_SESSION['tipo'] = $Sesion->{'tipo'};
      //   $_SESSION['cedula'] = $Sesion->{'cedula'};
      //   $_SESSION['rol'] = 'Funcionario';
      //   $_SESSION['rolcod'] = $Sesion->{'rolcod'};
      //   $_SESSION['codmunicipio'] =  $Sesion->{'codmunicipio'};
      //   $_SESSION['usu'] = $user;
      //   $_SESSION['acc'] = $pass;
      //   $_SESSION['isdirect'] = $Sesion->{'tipocontrato'};
      //   //$_SESSION['isdirect_nomina'] = $Sesion->{'tiponomina'};
      //   $_SESSION['imagen'] = $Sesion->{'imagen'};
      //   $_SESSION['tipo_sidebar'] = "0";
      //   //$_SESSION['ip_pub'] = obtener_ip();
      // } else if (isset($Sesion) && $nit != "0") {
      //   // inicio como ips
      //   $_SESSION['nombre'] = $Sesion->nombreips . " - " . $Sesion->{'nombre'};
      //   $_SESSION['nomips'] = $Sesion->nombreips;
      //   $_SESSION['ente_territorial'] = $Sesion->ente_territorial;
      //   $_SESSION['tipo'] = $Sesion->{'tipo'};
      //   $_SESSION['cedula'] = $Sesion->{'documento'};
      //   $_SESSION['rol'] = 'IPS';
      //   $_SESSION['nit'] = strval(intval($nit));
      //   $_SESSION['rolcod'] = $Sesion->{'rolcod'};
      //   $_SESSION['usu'] = $user;
      //   $_SESSION['acc'] = $pass;
      //   $_SESSION['tipo_sidebar'] = "1";
      // }
    //   echo $json;
    // } else if ($data->Codigo == "3") {
    //   $_SESSION['Codigo_Desbloqueo'] = $data->{'Codigo_Desbloqueo'};
    //   echo $json;
    // } else {
    //   echo $json;
    // }
  }
  oci_close($c);
}
