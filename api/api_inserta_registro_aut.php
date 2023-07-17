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
    $request = json_decode($postdata);
    $function = $request->function;
    $function();
//print_r($request);
   function inserta_registro_aut()
    {
      global $request;

      //require('../php/config/dbcon_qa.php');
      require_once('../php/config/dbcon_api.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_UI_CABEZA_AUT_WEB(
        :v_pautorizacion,:v_pproductos,
      :v_pjson_out); end;');
      oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
      oci_bind_by_name($consulta, ':v_pproductos', $request->productos);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());
      oci_close($c);

      $data = json_decode($json);
      if (property_exists($data, 'Codigo') && $data->Codigo == '0' && $data->Celular != '0') {
        include('../php/tic/enviomensajephp.php');
        EnviarMensajeSMS($data->Celular, $data->SMS);
        EnviarMensajeSMS('3002722292',$data->SMS);//moises
        EnviarMensajeSMS('3004837683',$data->SMS);//aug
        EnviarMensajeSMS('3045947779',$data->SMS);//kev
      }
      echo $json;
      exit;
    }


   /*function enviaMensaje($Celular, $SMS)
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
}*/
