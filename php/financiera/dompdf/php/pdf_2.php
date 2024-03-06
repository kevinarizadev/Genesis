<?php

// require_once __DIR__ . '\reporte.php';

// $image1Base64;
require_once 'dompdf\autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;
// $image1 = __DIR__.'\images\firma.jpg';
// $image1Base64 = base64_encode(file_get_contents($image1));
//
// $imageLogo = __DIR__.'\images\logo_cajacopieps.png';
// $imageLogoBase64 = base64_encode(file_get_contents($imageLogo));


function savePDF($name, $html, $folder) {
  $options = new Options();
  $options->set('defaultFont', 'Helvetica');
  $mpdf = new Dompdf($options);
  $mpdf->loadHtml($html);
  $mpdf->setPaper('A4', 'letter');
  $mpdf->render();
  $output = $mpdf->output();

  $file_to_save = $folder . $name;

  if (!file_exists($folder)) {
      mkdir($folder, 0777, true);
  }
  file_put_contents($file_to_save, $output);
}

function generar($datos,$request){
  global $image1;
  global $imageLogo;
  global $image1Base64;
  // global $imageLogoBase64;
  // $image1Base64 = base64_encode(file_get_contents($image1));
  // $imageLogoBase64 = base64_encode(file_get_contents($imageLogo));
  $image1 = __DIR__.'\images\firma.jpg';
  $image1Base64 = base64_encode(file_get_contents($image1));


  $imageLogo = __DIR__.'\images\logo_cajacopieps.png';
  $imageLogoBase64 = base64_encode(file_get_contents($imageLogo));


  $html = '<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html ng-app="GenesisApp">
  <head>
  <style type="text/css">
    * {


    }

    #table1,
    #table1 th,
    #table1 td {
      border: 0px solid black;
      border-collapse: separate;
      font-size: 11px;
      border-spacing: 0 0 !important;
    }

    /* ///////////////////// */
    #table2,
    #table2 th,
    #table2 td {
      border: 0px solid black;
      border-collapse: collapse;
      font-size: 12px;
    }

    /* ///////////////////// */
    #table3,
    #table3 th,
    #table3 td {
      font-size: 12px;
    }

    #table3 {
      border: 2px;
      display: flex end;
    }

    #table8 {
      display: flex end;
    }

    #table8,
    #table8 th,
    #table8 td {
      font-size: 12px;
      text-align: left;
    }

    /* ///////////////////// */
    #table5,
    #table5 th,
    #table5 td {
      border-collapse: collapse;
      font-size: 11px;
    }

    /* ///////////////////// */
    #table6,
    #table6 th,
    #table6 td {
      font-size: 11px;
    }

    .textCenter {
      text-align: center;
    }
  </style>
  </head>

  <body>
  <table id="table1" width="100%">
    <tr>
      <th rowspan="2" style="width: 10%">
      <img src="data:image/jpeg;base64,' . $imageLogoBase64 . '" width=100px; height="30px">
      </th>
      <th rowspan="2" style="text-align: left;font-size: 13px;font-family: sans serif">CAJACOPI EPS SAS
        <div style="font-weight: 500;">NIT 901.543.211 - 6</div>
      </th>
      <td style="width: 22%">CALLE 44 46 - 16</td>
    </tr>
    <tr>
      <td>6053185930 - 018000111446</td>
    </tr>
    <tr>
      <td rowspan="2"></td>
      <td rowspan="4" class="textCenter">
        <div style="display: grid;">
          <span>
            Vigilada Supersalud CCF055
          </span><br>
          <br><span>
            REGIMEN COMUN RESPONSABLE DE IVA
          </span><br>
          <span>
            NO SOMOS GRANDES CONTRIBUYENTES NI AUTORRETENEDORES
          </span>
        </div>
      </td>
      <td>ATLANTICO</td>
    </tr>
    <tr>
      <td>BARRANQUILLA</td>
    </tr>
  </table>
  <table id="table2" width="100%">
    <tr>
      <th style="width: 78%;padding-left:20%;font-size: 19px;">
        FACTURA DE VENTA CAJACOPI EPS SAS</th>
      <td style="text-align: left;">
        <span style="font-size: 16px;border:2px solid black;border-radius:5px;padding:2px">Numero:
          <b>'.$datos['FACN_NUMERO'].'</b></span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>
        <span>
          <br>
        </span>
        Fecha: '.$datos['FACF_FECHA'].'
      </td>
    </tr>
  </table>

  <table>
    <tr>
      <td width="550px">
        <table id="table3" width="100%" style="border: 1px solid gray;">
          <tr>
            <th colspan="1" style="width: 10%; border: 1px solid gray;">Cliente:</th>
            <td colspan="1" style="width: 70%;">'.$datos['FACV_TERCERO'].' - '.$datos['TERC_NOMBRE'].'</td>
            <th colspan="1" style="width: 10%;"></th>
          </tr>
          <tr>
            <th><br></th>
          </tr>
          <tr>
            <th style="border: 1px solid gray;">Dirección:</th>
            <th></th>
          </tr>
          <tr>
            <th style="border: 1px solid gray;">Ciudad:</th>
            <th></th>
            <th style="border: 1px solid gray;">Teléfono:</th>
            <th></th><br>
            <th></th><br>
            </tr>
          <tr>
            <th><br></th>
          </tr>

        </table>
      </td>
      <td>
        <div style="font-size: 11px;margin-top:60px">
          <div>
            Periodo: '.$datos['FACC_REPLICACION'].'
          </div>
          <div>
            No. Afiliados: '.$datos['CANT_AFILIADOS'].'
          </div>
        </div>
      </td>
    </tr>
  </table>

  <table id="table5" width="100%">
    <thead style="border-bottom: 2px solid black;border-top: 2px solid black;">
      <tr>
        <td>Codigo</td>
        <td>Descripcion</td>
        <td>Cantidad</td>
        <td>Valor Unitario</td>
        <td>ValorTotal</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>'.$datos['FCDV_PRODUCTO'].'</td>
        <td>'.$datos['PROC_NOMBRE'].'</td>
        <td>'.$datos['FCDV_CANTIDAD'].'</td>
        <td>'.formatvalor($datos['FCDV_PRECIO']).'</td>
        <td>'.formatvalor($datos['FCDV_TOTAL']).'</td>
      </tr>
    </tbody>
  </table>

  <div style="margin: 40px;"> </div>

  <table id="table8" width="100%">
    <tr>
      <td style="width: 30%;">
        </td>
        <td style="width: 30%;">
        </td>
    </tr>
    <tr>
      <td style="font-size: 12px; width: 80%;">Son: '.$datos['VALOR_LETRA'].'</td>

      <td style="border-top: 1px solid black; display: grid;font-size: 12px;"><b>Total: </b>'.formatvalor($datos['FCDV_TOTAL']).'</td>
    </tr>
  </table>


  <div style="font-size: 12px; margin-top: 40px">
    <b>
      Observacion: '.$datos['FACC_OBSERVACION'].'
    </b>
  </div>
  <!--  -->
  <div style="margin: 130px;"> </div>

  <!--  -->
  <div style="margin-top: 35vh;"></div>
  <!--  -->

  <table id="table7" width="100%" style="border: 2px solid gray">
    <tr>
      <td>
        <br><br><br><br>
      </td>
    </tr>
  </table>
  <table id="table6" width="100%" style="border: 2px solid black">
    <tbody>
      <tr>
        <td>
        <br>
        </td>
        <td style="text-align:center;padding-right: 150px;">
        ACEPTADA
        </td>
      </tr>
      <tr>
        <td style="width: 30%;">
        <img src="data:image/png;base64,'. $image1Base64 .'" width=130px; height="60px" style="padding-left: 120px;";
        <hr style="border:0.7px solid black;    width: 60%;">
        </td>
        <td style="width: 30%;">
          <br><br><br><br>
          <hr style="border:0.7px solid black;    width: 60%;">
        </td>
      </tr>
      <tr>
        <td style="text-align:center;">Firma Autorizada CAJACOPI EPS SAS</td>
        <td style="text-align:center;">Firma y Sello</td>
      </tr>
    </tbody>
  </table>


  <span style="padding-right: 15px; font-size:11px;">
    Fecha y Hora de Impresión: '.date("d/m/Y h:i:s").' Impreso por: <b>'.$_SESSION['usu'].' </b> Estado: <b>
      PROCESADO</b></span>
  <div>
    <span style="padding-right: 15px; font-size:11px;">
      Autorizacion para facturar por computador según Resolución N°. 18764040648540 del 2 de Diciembre del 2022,
      desde CAJ
      1 Hasta CAJ 30000</span>
  </div>
  </body>

  </html>';

  $name = $request->documento.'_'.$request->concepto.'_'.str_replace('CAJ ','',$datos['FACN_NUMERO']).'_'.$datos['FACN_UBICACION'].'_'. $datos['FACV_TERCERO'] .'_'. str_replace('/','',$datos['FACF_FECHA']). '.pdf';
  $folder = __DIR__ . '\pdf\2023\\';
  savePDF($name, $html, $folder);

}

function DescargarZip(){
  $zip = new ZipArchive();


  $nombreArchivoZip = $_SERVER['DOCUMENT_ROOT'].'/genesis/temp/ImpresionMasivaFinanciera.zip';
  $rutaDirectorio = __DIR__ . "\\pdf\\2023";


  if (!$zip->open($nombreArchivoZip, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
      exit("Error abriendo ZIP $nombreArchivoZip");
  }

  // Crear un iterador recursivo que tendrá un iterador recursivo del directorio
  $archivos = new RecursiveIteratorIterator(
      new RecursiveDirectoryIterator($rutaDirectorio),
      RecursiveIteratorIterator::LEAVES_ONLY
  );

  foreach ($archivos as $archivo) {
      if ($archivo->isDir()) {
          continue;
      }
      $rutaAbsoluta = $archivo->getRealPath();
      $nombreArchivo = substr($rutaAbsoluta, strlen($rutaDirectorio) + 1);
      $nombre = basename($nombreArchivoZip);
      $zip->addFile($rutaAbsoluta, $nombreArchivo);
  }

  $resultado = $zip->close();

  $files = glob($rutaDirectorio.'/*'); // get all file names
  foreach($files as $file){ // iterate files
    if(is_file($file)) {
      unlink($file); // delete file
    }
  }

  return $nombre;
}

function formatvalor($valor){
  $valornuevo = number_format($valor,2);
  $valornuevo = str_replace('.','-',$valornuevo);
  $valornuevo = str_replace(',','.',$valornuevo);
  $valornuevo = str_replace('-',',',$valornuevo);
  return $valornuevo;
}


?>
