<?php

$factura = $_GET['factura'];
$nit = $_GET['nit'];
$recibo = $_GET['recibo'];

try {
  $soapClient = new SoapClient("https://onbase1.cajacopieps.com/OnBaseWebService/OnBaseWebService.asmx?wsdl");

  $info = $soapClient->__call('DocumentExist2', [
    [
      'docTypeId' => 114,
      'retreivalKeywords' => [
        'AlphaNumericKeywords' => [
          'AlphaNumKeyword' => [
            'Id' => 115,
            'Value' => $factura
          ],
          'AlphaNumKeyword' => [
            'Id' => 116,
            'Value' => $nit
          ]
        ],
        'NumericKeywords' => [
          'NumericKeyword' => [
            'Id' => 114,
            'Value' => $recibo
          ]
        ]
      ]
    ]
  ]);
  // var_dump($info);
  if ($info->DocumentExist2Result->Error === false) {
    echo json_encode([
      "data" => $info->DocumentExist2Result->Exist
    ]);
  } else {
    echo json_encode([
      "error" => [
        "message" => $info->DocumentExist2Result->ErrorMessage
      ]
    ]);
  }
  // echo "REQUEST:\n" . $soapClient->__getLastRequest() . "\n";
} catch (SoapFault $e) {
  // var_dump($e);
  // if ($e->getCode() === 0) {
  //   http_response_code(500);
  //   echo json_encode([
  //     'error' => [
  //       'message' => 'No se pudo conectar con el servidor'
  //     ]
  //   ]);
  // }
}
