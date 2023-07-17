<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function enviaMensaje($number, $message)
{
    $curl = curl_init();
    $data = [
        "from" => "CajacopiEPSNotificacionRC",
        "to" => strpos('57', $number) === 0 ? $number : '57' . $number,
        "text" => $message
    ];

    $json = json_encode($data);

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.infobip.com/sms/2/text/single",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_HTTPHEADER => array(
            "Accept: application/json",
            "Accept-Encoding: gzip, deflate",
            "Authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Content-Length: " . strlen($json),
            "Content-Type: application/json",
            "Host: api.infobip.com",
        ),
    ));

    $response = curl_exec($curl);

    echo $response;

    echo curl_error($curl);

    // $jsonResponse = json_decode($response, true);

//     if (\json_last_error() !== JSON_ERROR_NONE) {
//         http_response_code(500);
//         echo json_encode([
//             "error" => [
//                 "message" => "La respuesta del proveedor no es valida"
//             ],
//             "code" => 500
//         ]);
//     }
}




$c = oci_connect('jair.molina','Jmolina24', '192.168.50.17/OASIS','AL32UTF8');
if (!$c) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
} 


$cursor = oci_new_cursor($c);
$consulta = oci_parse($c,'begin pq_genesis_cartera.p_envia_mensaje (:v_response); end;');

oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);
$datos = null;
oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
oci_free_statement($consulta);
oci_free_statement($cursor);

if (count($datos) > 0) {
    foreach ($datos as $dato) {
        enviaMensaje($dato['NUMERO'], $dato['SMS']);

        echo count($datos);
        //enviaMensaje('3007502735', $dato['SMS']);
    //break;
    }
}