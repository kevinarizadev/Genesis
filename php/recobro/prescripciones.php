<?php

$contributivo = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";
$subsidiado = "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
$hoy = new DateTime();
$fecha = $hoy->format("Y-m-d");
$prescripciones_dia = "";

//SUBSIDIADO
 stream_context_set_default([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
        // $Token = $_REQUEST["Token"];
        // $Fecha = $_REQUEST["Fecha"];
        // $Nit = $_REQUEST["Nit"];
        set_time_limit(0);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            ///api/Prescripcion/{nit}/{fecha}/{token} 

            CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Prescripcion/890102044/$fecha/$subsidiado", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/Prescripcion/$Nit/$Fecha/$Token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Accept-Encoding: gzip, deflate",
                "Cache-Control: no-cache",
                "Connection: keep-alive",
                "Host: wsmipres.sispro.gov.co",
                "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
                "User-Agent: PostmanRuntime/7.15.2",
                "cache-control: no-cache"
            ),
        ));
        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            json_decode($response);
            if(json_last_error()!== JSON_ERROR_NONE){
                echo 0;
            }else {
                $prescripciones_dia = $response;
            }
            
        }
//CONTRIBUTIVO


//SUBSIDIADO
stream_context_set_default([
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ]
]);
// $Token = $_REQUEST["Token"];
// $Fecha = $_REQUEST["Fecha"];
// $Nit = $_REQUEST["Nit"];
set_time_limit(0);
$curl = curl_init();
curl_setopt_array($curl, array(
    ///api/Prescripcion/{nit}/{fecha}/{token} 

    CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Prescripcion/890102044/$fecha/$contributivo", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/Prescripcion/$Nit/$Fecha/$Token",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_TIMEOUT => 0,
    CURLOPT_HTTPHEADER => array(
        "Accept: application/json",
        "Accept-Encoding: gzip, deflate",
        "Cache-Control: no-cache",
        "Connection: keep-alive",
        "Host: wsmipres.sispro.gov.co",
        "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
        "User-Agent: PostmanRuntime/7.15.2",
        "cache-control: no-cache"
    ),
));
$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    return "cURL Error #:" . $err;
} else {
    json_decode($response);
    if(json_last_error()!== JSON_ERROR_NONE){
        echo 0;
    }else {
        $prescripciones_dia = $prescripciones_dia.",".$response;
    }    
}

    echo "[".$prescripciones_dia."]";
    
?>