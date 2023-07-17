<?php

$recibo = $_GET["recibo"];
$nit = $_GET["nit"];
$codigo = $_GET["codigo"];
$verificacion = $_GET["verificacion"];

function obtenerInfoActa($nit, $recibo, $codigo, $verificacion)
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS.P_OBTENER_INFO_ACTA(:v_pproceso,
                                     :v_pcodigo,
                                          :v_pprestador,
                                          :v_precibo,
                                          :v_json_row_1); end;');

  oci_bind_by_name($consulta, ':v_pproceso', $codigo);
  oci_bind_by_name($consulta, ':v_pcodigo', $verificacion);
  oci_bind_by_name($consulta, ':v_pprestador', $nit);
  oci_bind_by_name($consulta, ':v_precibo', $recibo);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row_1', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    $response = json_decode($json, true);
  } else {
    $response = null;
  }
  oci_close($c);
  return $response;
}

// var_dump(obtenerInfoActa((int) $nit, (int) $recibo, (int) $codigo, $verificacion));

$json = obtenerInfoActa((int) $nit, (int) $recibo, (int) $codigo, $verificacion);

// $json = json_decode('{"Tipo_acta":"Acta de Validacion","Estado":"V","Fecha":"Enero 30 de 2021","nit":900465319,"Ubicacion":"Barranquilla - Atlantico","Ips":"Srs. Oinsamed Sas","Texto":"Cajacopi EPS a través de su portal web Genesis hace entrega del acta de validación de Rips de EVENTO -  EVENTO con codigo de proceso 196623 que da certeza de la validación exitosa de los archivos RIPS cargados con el recibo 13111  en la fecha de Enero 30 de 2021 ","Facturas":10,"Valor":"$2,136,986","Facturas2":0,"Valor2":"$0","Coordinador":null,"Error":0}', true);

require_once('../_tcpdf/tcpdf.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'LETTER', true, 'UTF-8', false);

$pdf->SetMargins(0, 0, 0, true);
$pdf->SetAutoPageBreak(true, 0);

$pdf->AddPage();

$pdf->Image(__DIR__ . '/plantilla.png', 0, 0, 229.4, 290, '', '', '', true);

$pdf->write2DBarcode(json_encode([
  'recibo' => $recibo,
  'nit' => $nit,
  'codigo' => $codigo,
  'verificacion' => $verificacion
]), 'QRCODE,H', 72, 52, 70, 70, [], 'N');

$pdf->SetFont('times', '', 12);

$pdf->Text(182, 34.5, $json['Fecha'], false, false, true, 0, 0, '');

$pdf->SetFont('times', 'B', 10);

$pdf->Text(175, 40, $json['Ubicacion']);

$pdf->SetFont('times', 'B', 12);
$pdf->Text(6, 132, $json['Ips']);
$pdf->Text(14, 137.25, $nit);

$pdf->SetFont('times', '', 12);

$pdf->MultiCell(202, 100, $json['Texto'], 0, 'J', false, 1, 6, 147);

$pdf->SetFont('times', 'B', 12);

$pdf->Text(6, 176, $json['Facturas'] . ' Facturas');
$pdf->Text(172, 176, $json['Valor']);

$name = sha1(json_encode($json)) . ' gen.pdf';
$path = __DIR__ . '/' . $name;


$pdf->Output($path, 'F');

try {
  $soapClient = new SoapClient("https://onbase1.cajacopieps.com/OnBaseWebService/OnBaseWebService.asmx?wsdl");

  $info = $soapClient->__call("ImportDocument2Base64", [
    [
      'docTypeId' => 146,
      'fileTypeId' => 16,
      'setOfKeywords' => [
        'AlphaNumericKeywords' => [
          'AlphaNumKeyword' => [
            'Id' => 116,
            'Value' => $nit
          ]
        ],
        'Numeric9Keywords' => [
          "Numeric9Keyword" => [
            'Id' => 114,
            'Value' => (int) $recibo
          ]
        ],
        'Numeric20Keywords' => [],
        'CurrencyKeywords' => [],
        'DateTimeKeywords' => [],
      ],
      'fileContentBase64' => base64_encode(file_get_contents($path)),
      'filename' => $name
    ]
  ]);
  echo json_encode([
    "data" => $info->ImportDocument2Base64Result
  ]);
  unlink($path);
} catch (SoapFault $e) {
  http_response_code(500);
  echo json_encode([
    "error" => [
      "message" => $e->getMessage()
    ]
  ]);
}
