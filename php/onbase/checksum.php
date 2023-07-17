<?php

$url = $_GET["url"];

try {
  $soapClient = new SoapClient("https://onbase1.cajacopieps.com/OnBaseWebService/OnBaseWebService.asmx?wsdl");

  $info = $soapClient->__call("GenerarCheckSum", [
    [
      "queryString" => $url
    ]
  ]);
  if ($info->GenerarCheckSumResult->Error === false) {
    echo json_encode([
      "data" => $info->GenerarCheckSumResult->CheckSum
    ]);
  } else {
    http_response_code(400);
    echo json_encode([
      "data" => null
    ]);
  }
  // var_dump($info);
  // echo "REQUEST:\n" . $soapClient->__getLastRequest() . "\n";
} catch (SoapFault $e) {
  if ($e->getCode() === 0) {
    http_response_code(500);
    echo json_encode([
      "error" => [
        "message" => "No se pudo conectar con el servidor"
      ]
    ]);
  }
}
