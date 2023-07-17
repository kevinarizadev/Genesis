<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();



function p_obtener_area()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  // $id = $request->id;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_area(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_tipop()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_tipop(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_proceso()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_proceso(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_estado()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_estado(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_fases()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_etapas(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_medios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_medios(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function p_obtener_recurso()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_recurso(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_obtener_rol()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_rol(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}




function p_listar_proyecto()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_listar_proyecto(:v_pjson_row_out); end;');
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

function p_obtener_motivo()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_motivo(:v_pproceso,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->proceso);
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


function p_crea_proyecto()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../upload_file/subir_archivo.php');
  global $request;
  // $proyecto = '[' . $request->proyecto . ']';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_crea_proyecto(:v_pjson_row_in,:v_pjson_row_out); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
  $jsonin->writeTemporary($request->v_pjson_row_in);
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

function p_actualiza_proyecto()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $json_cabeza = json_encode($request->json_cabeza);
  $json_responsables = json_encode($request->json_responsables);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_actualiza_proyecto(:v_pjson_cabeza,:v_pjson_responsables,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pjson_cabeza', $json_cabeza);
  oci_bind_by_name($consulta, ':v_pjson_responsables', $json_responsables);
  // $v_pjson_adjuntos = oci_new_descriptor($c, OCI_D_LOB);
  // oci_bind_by_name($consulta, ':v_pjson_adjuntos', $v_pjson_adjuntos, -1, OCI_B_CLOB);
  // $v_pjson_adjuntos->writeTemporary($request->v_pjson_adjuntos);
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

function p_adjunto()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../upload_file/subir_archivo.php');
  global $request;
  // $proyecto = '[' . $request->proyecto . ']';
  $archivos = json_encode($request->archivos);

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_adjunto(:v_pproyecto,:v_petapa,:p_vjson_in,:p_vjson_out); end;');
  oci_bind_by_name($consulta, ':v_pproyecto', $request->proyecto);
  oci_bind_by_name($consulta, ':v_petapa', $request->etapa);
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':p_vjson_in', $jsonin, -1, OCI_B_CLOB);
  $jsonin->writeTemporary($archivos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':p_vjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function cargarSoportes()
{
  // require_once('../config/dbcon.php');
  require('../sftp_cloud/UploadFile.php');
  global $request;
  // $archivos = json_decode($request->archivos);
  $archivos = $request->archivos;
  $path = 'TIC/Proyectos/' . $request->proyecto;
  $estado = 0;
  $rutas = [];
  $hoy = date('dmY_His');
  for ($i = 0; $i < count($archivos); $i++) {
    $name = $archivos[$i]->nombre .  '_' . $hoy . '.' . $archivos[$i]->extension;
    list(, $archivos[$i]->base64) = explode(';', $archivos[$i]->base64); // Proceso para traer el Base64
    list(, $archivos[$i]->base64) = explode(',', $archivos[$i]->base64); // Proceso para traer el Base64
    $base64 = base64_decode($archivos[$i]->base64); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $subio = UploadFile($path, $name);
    // $subio = UploadFile($path, $name);
    if (substr($subio, 0, 11) == '/cargue_ftp') {
      array_push($rutas, (object)[
        'ruta' => $subio,
      ]);
    } else {
      $estado = $estado + 1;
    }
  }
  if ($estado == 0) {
    echo json_encode($rutas);
  } else {
    echo '0';
  }
}

function p_listar_adjuntos()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../upload_file/subir_archivo.php');
  global $request;

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_listar_adjuntos(:v_pproyecto,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pproyecto', $request->proyecto);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function descargaAdjunto()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}

// 1045669272
// 1045693360

function p_usuario_autorizado()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_usuario_autorizado(:v_pcedula,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
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
function Veretapas()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_etapas_lista_dependiente(:v_pestado,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pestado', $request->etapa);
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
function VerProyecto()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PROYECTOS.p_obtener_proyecto(:v_pcodigo,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->id_proyecto);
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
function VerFuncionarios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PROYECTOS.p_obtener_proyecto_responsable(:v_pcodigo,:v_pjson_row_out); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->id_proyecto);
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
function VerHorasDisponibles()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PROYECTOS.P_CALCULO_DISPONIBILIDAD_FUNCIONARIO(:v_pfecha_inicio,:v_pfecha_final,:v_ptercero,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->pfecha_inicio);
  oci_bind_by_name($consulta, ':v_pfecha_final', $request->pfecha_fin);
  oci_bind_by_name($consulta, ':v_ptercero', $request->cedula);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
// function Generar_Agenda()
// {
//   global $request;
//   $data = json_decode($request->datos, true);
//   $url = 'https://healthgroup-test2-7651585.dev.odoo.com/api/private/Aurora/agendar_cita_automatica';
//   $arrayx = array(
//     'API-KEY: 7K5NMf9i589aU3Ya88KapY6TfmrqX7icLN6MT',
//     'accept: */*'
//   );
//   $curl = curl_init();
   
//   curl_setopt($curl, CURLOPT_POST, 1);
//   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
//   $url = sprintf("%s?%s", $url, http_build_query($data));
//   // OPTIONS:
//   curl_setopt($curl, CURLOPT_URL, $url);
//   curl_setopt($curl, CURLOPT_HTTPHEADER, $arrayx);
//   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//   // EXECUTE:
//   $result = curl_exec($curl);
//   if(!$result){die("Connection Failure");}
//   curl_close($curl);
//   echo $result;
// }

// function Generar_Agenda()
// {
//   global $request;
//   $data = json_decode($request->datos, true);
//   $url = 'https://www.curelatam.com/api/private/Aurora/agendar_cita_automatica';
//   // $url = 'https://healthgroup-test-6798383.dev.odoo.com/api/private/Aurora/agendar_cita_automatica';
//   $arrayx = array(
//     'API-KEY: 2VwtfEVxx4dxmql8D?jOvazsUx1pHeYwlS8NlMotBV3',
//     // 'API-KEY: 7K5NMf9i589aU3Ya88KapY6TfmrqX7icLN6MT',
//     'accept: */*'
//   );
//   $curl = curl_init();
   
//   curl_setopt($curl, CURLOPT_POST, 1);
//   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
//   $url = sprintf("%s?%s", $url, http_build_query($data));
//   // OPTIONS:
//   curl_setopt($curl, CURLOPT_URL, $url);
//   curl_setopt($curl, CURLOPT_HTTPHEADER, $arrayx);
//   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//   // EXECUTE:
//   $result = curl_exec($curl);
//   if(!$result){die("Connection Failure");}
//   curl_close($curl);
//   echo $result;
// }

// function Generar_Agenda()
// {
// 	global $request;
// 	$datos = json_decode($request->datos, true);
// 	// $username =  'secureForm';
// 	// $password = 'Cajacopi1#';
// 	$curl = curl_init();

// 	curl_setopt_array($curl, array(
// 		CURLOPT_URL => 'https://www.curelatam.com/api/private/Aurora/agendar_cita_automatica',
// 		CURLOPT_RETURNTRANSFER => true,
// 		CURLOPT_ENCODING => '',
// 		CURLOPT_MAXREDIRS => 10,
// 		CURLOPT_TIMEOUT => 30,
// 		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
// 		CURLOPT_SSL_VERIFYHOST => false,
// 		CURLOPT_SSL_VERIFYPEER => false,
// 		// CURLOPT_USERPWD => $username . ":" . $password,
// 		CURLOPT_CUSTOMREQUEST => "POST",
// 		CURLOPT_POSTFIELDS => json_encode($datos),
// 		CURLOPT_HTTPHEADER => array(
// 			'API-KEY: 2VwtfEVxx4dxmql8D?jOvazsUx1pHeYwlS8NlMotBV3',
// 			'Content-Type: application/json',
//       'accept: */*'
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
// function EnviarMensajeSMS()
// {
//   global $request;
//   $data = array(
//   'user'=>'cajacopi',
// 	'password'=>'Colombia2023@',
// 	'destination'=>'3007836213',// $request->celular;
// 	'message'=>'Esto es una prueba Cajacopieps desde la api lunes 17/03/2023',// $request->mensaje;
// 	'concatMsg'=>true
//   );
 
// $url = 'https://contactalos.com/services/rs/sendsms.php';
// $curl = curl_init($url);
// curl_setopt($curl, CURLOPT_POST, true);
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
// $result = curl_exec($curl);
// curl_close($curl);
// echo $result;
// }
function Seguimiento_Detencion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_AUTPRO.P_seguimineto_detencion_ca(:v_ptipo_doc,:v_pnumero_doc,:V_penvia_json,:v_pRespusta,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_doc', $request->tipodocumento);
  oci_bind_by_name($consulta, ':v_pnumero_doc', $request->numerodocumento);
  oci_bind_by_name($consulta, ':V_penvia_json', $request->datosenviados);
  oci_bind_by_name($consulta, ':v_pRespusta', $request->respuestarecibida);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
