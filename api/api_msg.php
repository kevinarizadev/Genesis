<?php
header("Content-Type: text/html;charset=utf-8");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
header("Allow: POST");
// header("Allow: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: *");
header("Content-Type: text/html;charset=utf-8");

$postdata = file_get_contents("php://input");
// $request = json_decode($postdata);
// $function = $request->function;
// $function();

$json = json_decode('{"Codigo":"0","Nombre":"Autorización procesada con exito.","Mensaje":"Autorización procesada con exito.","Numero":null,"Ubicacion":null,"Clase":"autprocesada","Print":"true","Estado":null,"Autorizacion":null,"Celular":3045947779,"SMS":"Sr. Usuario su autorización fue aprobada, diríjase por sus medicamentos a Logifarma Calle 56 No 13-60 Bquilla o comuníquese al Cel 3330333124"}');
// print_r($json);
// print_r($json->Celular);
// echo $json;
// echo gettype($json);
// echo array_search('Celular',$json);
// echo array_keys($array, "blue"));

if (property_exists($json, 'Codigo') && $json->Codigo == '0' && $json->Celular != '0') {
  enviaMensaje($json->Celular, $json->SMS);
  enviaMensaje('3002722292', $json->SMS);//moises
  //enviaMensaje('3004837683', $json->SMS);//aug
}
// if($json->Celular){

// }

// $mensaje = 'Señor(a) Afiliado, ya puede acercarse a reclamar su medicamente.';
// $url = 'https://api.infobip.com/sms/1/text/single';
// $data = array('from' => 'CajacopiEPS', 'to' => '57'.$json->Celular, 'text'  => $mensaje);
// $options = array(
//   'http' => array(
//     'method'  => 'POST',
//     'header'  =>
//     "Content-Type: application/x-www-form-urlencoded\r\n" .
//       "Authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==\n",
//     'content' => http_build_query($data)
//   )
// );
// $context  = stream_context_create($options);
// $result = file_get_contents($url, false, $context);
// if ($result === FALSE) {
//   echo(json_encode(array('Codigo' => '1', 'Nombre' => 'Error al enviar codigo, por favor intente nuevamente')));
// }
function enviaMensaje($Celular, $SMS)
{
  // $mensaje = 'Señor(a) Afiliado, ya puede acercarse a reclamar su medicamente.';
  $url = 'https://api.infobip.com/sms/1/text/single';
  $data = array('from' => 'CajacopiEPS', 'to' => '57' . $Celular, 'text'  => $SMS);
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
    echo (json_encode(array('Codigo' => '1', 'Nombre' => 'Error al enviar codigo, por favor intente nuevamente')));
  }
}
