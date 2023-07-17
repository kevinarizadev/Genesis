<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);





$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function validarAfiliado()
{
  global $request;

  require_once('config/dbcon_prod.php');


  try {
    $consulta = oci_parse(
      $c,
      'begin PQ_GENESIS_DECLARACION.P_OBTENER_AFILIADO_COVID(
                  :v_tipo,
                  :v_numero,
                  :v_json_row
              ); end;'
    );
    oci_bind_by_name($consulta, ':v_tipo', $request->tipo);
    oci_bind_by_name($consulta, ':v_numero', $request->numero);
    $clob = oci_new_descriptor($c, OCI_D_LOB);

    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    oci_close($c);

    header('Content-Type: text/plain');

    $json = $clob->read($clob->size());

    $data = json_decode($json);

    if (count($data) > 0) {
      if ($data[0]->FECHA === $request->fechaNacimiento) {
        echo 'S';
      } else {
        echo 'N';
      }
    } else {
      echo 'N';
    }
    exit;
  } catch (Exception $e) {
    echo $e->getMessage();
    echo $e->getLine();
  }
}

function validarEncuesta()
{
  global $request;

  require_once('config/dbcon_prod.php');


  try {
    $consulta = oci_parse(
      $c,
      'begin PQ_GENESIS_DECLARACION.P_OBTENER_AFILIADO_COVID(
                  :v_tipo,
                  :v_numero,
                  :v_json_row
              ); end;'
    );
    oci_bind_by_name($consulta, ':v_tipo', $request->tipo);
    oci_bind_by_name($consulta, ':v_numero', $request->numero);
    $clob = oci_new_descriptor($c, OCI_D_LOB);

    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    oci_close($c);

    header('Content-Type: text/plain');

    $json = $clob->read($clob->size());

    $data = json_decode($json);

    if (count($data) > 0) {
      if ($data[0]->FECHA === $request->fechaNacimiento) {
        echo $data[0]->ENCUESTA;
      } else {
        echo 'N';
      }
    } else {
      echo 'N';
    }
    exit;
  } catch (Exception $e) {
    echo $e->getMessage();
    echo $e->getLine();
  }
}

function registrarEncuestaCovid()
{
  global $request;
  require_once('./config/dbcon_prod.php');

  $rows = [$request->encuesta];

  $consulta = oci_parse(
    $c,
    'begin PQ_GENESIS_DECLARACION.P_UI_COVID(
              :v_pjson_row_in,
              :v_pcantidad,
              :v_pjson_row_out
          ); end;'
  );
  $row_json = json_encode($rows);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $row_json);
  oci_bind_by_name($consulta, ':v_pcantidad', count($rows));
  $clob = oci_new_descriptor($c, OCI_D_LOB);

  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);

  oci_close($c);

  $json = $clob->read($clob->size());

  echo $json;
}


function p_mostrar_nucleo()
{
  global $request;

  $tipo_afiliado = 'AF';


  require('config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_nucleo (:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function p_obtener_soporte()
{
  global $request;


  require('config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_obtener_soporte (:v_pdocumento,:v_ptipodocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento);

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}


function p_mostrar_afiliado_ips()
{
  global $request;


  require('config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin PQ_SERVICIO_CONSU.p_mostrar_afiliado_ips (:v_ptipo_documento,:v_pdocumento,:v_prespuesta); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}



function insertarDatosPqr()
{
  require_once('dbcon_prod.php');
  require_once('subir_archivo.php');
  global $request;
  $jsonpqr = '[' . $request->pqr . ']';
  $jsonpqr_edit = json_decode($jsonpqr);
  $json_data = json_decode($request->pqr);
  $type = $request->action;
  $numero = $request->numero;
  $pqrFile = $request->pqrFile;
  $tipo_documento = $json_data->tipodocumento;
  $documento = $json_data->documento;
  $tipo_afiliado = 'AF';
  $json_data_afiliado = json_decode(obtenerDatosAfiliadosWeb($tipo_documento, $documento, $tipo_afiliado));
  $jsonpqr_edit[0]->email = $json_data_afiliado[0]->CORREO;
  $jsonpqr_edit[0]->telefono = $json_data_afiliado[0]->TELEFONO;
  $jsonpqr_edit[0]->regimen = $json_data_afiliado[0]->REGIMEN;
  $jsonpqr_edit[0]->direccion = $json_data_afiliado[0]->DIRECCION;
  $jsonpqr_edit[0]->ubicgeo = $json_data_afiliado[0]->UBICGEO;
  $jsonpqr = json_encode($jsonpqr_edit);

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_PQR(:v_pjson_row_in,:v_pnumero,:v_paccion,:v_pjson_row_out); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
  $jsonin->writeTemporary($jsonpqr);
  oci_bind_by_name($consulta, ':v_pnumero', $numero);
  oci_bind_by_name($consulta, ':v_paccion', $type);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  $bd_response = $clob->read($clob->size());
  $json_bd_response = json_decode($bd_response);
  if ($json_bd_response->Codigo == 0) {
    echo $bd_response;
  } else {
    if ($json_bd_response->RequireFile == 1) {
      $ext = $json_data->ext;
      $dia = date("dmY");
      // $day = date("dmY_His");
      $name = $json_bd_response->NombreArchivo . '.' . $ext;
      $file = $pqrFile;
      list(, $file) = explode(';', $file);
      list(, $file) = explode(',', $file);
      $base64 = base64_decode($file);
      file_put_contents('../temp/' . $name, $base64);

      $ruta = 'PQR/' . $dia;
      require('/sftp_cloud/UploadFile.php');
      $subio = UploadFile($ruta, $name);
      if (substr($subio, 0, 11) == '/cargue_ftp') {
        // echo $subio;
        echo $bd_response;
      } else {
        echo json_encode((object) [
          'codigo' => -1,
          'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
        ]);
      }

      // $file = $pqrFile;
      // $ext = $json_data->ext;
      // $subir = subirFTP($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
      // if ($subir != 0) {
      //     echo $bd_response;
      // }
      echo $bd_response;
    } else {
      echo $bd_response;
    }
  }
  oci_close($c);
}

function obtenerDatosAfiliadosWeb()
{
  global $request;

  $tipo_afiliado = 'AF';


  require('config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin pq_genesis_pqr.p_obtener_info_afiliado (:v_ptipo_documento,:v_pnumero_documento,:v_ptipo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_documento);
  oci_bind_by_name($consulta, ':v_pnumero_documento', $request->documento);
  oci_bind_by_name($consulta, ':v_ptipo', $tipo_afiliado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function generarCertificadoAfiliacionPDF()
{
  global $request;

  require_once('./_tcpdf/tcpdf.php');
  require_once('./config/dbcon_prod.php');

  $type = $request->tipo;
  $num =  $request->numero;
  $consulta = oci_parse($c, 'begin pq_genesis_ca.p_mostrar_certificado(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $type);
  oci_bind_by_name($consulta, ':v_pdocumento', $num);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = json_decode($clob->read($clob->size()), true);

  class CertificadoAfiliadoPDF extends TCPDF
  {

    //Page header
    public function Header()
    {
      // Logo
      //$image_file = K_PATH_IMAGES.'logo_example.jpg';
      //$this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
      // Set font
      //$this->SetFont('helvetica', 'B', 20);
      // Title
      //$this->Cell(0, 15, '<< TCPDF Example 003 >>', 0, false, 'C', 0, '', 0, false, 'M', 'M');
      $this->Image(K_PATH_IMAGES . 'cert_afiliacion.jpg', 0, 0, 200, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
    }
  }

  // create new PDF document
  $pdf = new CertificadoAfiliadoPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

  // set document information
  $pdf->SetCreator(PDF_CREATOR);
  $pdf->SetAuthor('Nicola Asuni');
  $pdf->SetTitle('TCPDF Example 003');
  $pdf->SetSubject('TCPDF Tutorial');
  $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

  // set default header data
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

  // set default monospaced font
  $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

  // set margins
  $pdf->SetMargins(22, 22, 22);

  // set auto page breaks
  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

  // set image scale factor
  $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

  // set font
  $pdf->SetFont('freesans', '', 11);

  // add a page
  $pdf->AddPage();

  // print a block of text using Write()
  $pdf->SetY(60);
  $pdf->Write(0, $json['TEXT1'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(76);
  $pdf->SetX(100);
  $pdf->Write(0, $json['NACIMIENTO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(81);
  $pdf->SetX(100);
  $pdf->Write(0, $json['SEXO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(86);
  $pdf->SetX(100);
  $pdf->Write(0, $json['REGIMEN'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(91);
  $pdf->SetX(100);
  $pdf->Write(0, $json['ESTADO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(97);
  $pdf->SetX(100);
  $pdf->Write(0, $json['TIPO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(102);
  $pdf->SetX(100);
  $pdf->Write(0, $json['DEPARTAMENTO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(108);
  $pdf->SetX(100);
  $pdf->Write(0, $json['MUNICIPIO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(113);
  $pdf->SetX(100);
  $pdf->Write(0, $json['FECHAAFILIACION'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(118);
  $pdf->SetX(100);
  $pdf->Write(0, $json['FECHARETIRO'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(123);
  $pdf->SetX(100);
  $pdf->Write(0, $json['NIVELSISBEN'], '', 0, 'L', true, 0, false, false, 0);

  $pdf->SetY(135);
  $pdf->Write(0, $json['TEXT2'], '', 0, 'L', true, 0, false, false, 0);

  // ---------------------------------------------------------

  //Close and output PDF document
  $pdf->Output('example_003.pdf', 'I');
}
