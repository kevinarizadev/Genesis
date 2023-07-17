<?php

function subirValidaciion()
{
  if (isset($_POST['archivo'])) {
    $name = $_POST['archivo'];
  } else {
    $name = $_POST['archivoAct'];
  }
  $ano = $_GET['ano'];
  // $periodo = $_GET['periodo'] < 10 ? '0' . $_GET['periodo'] : $_GET['periodo'];
  $periodo = strlen($_GET['periodo']) == 1 ? '0' . $_GET['periodo'] : $_GET['periodo'];
  // $periodo = $_GET['periodo'];
  $archiveName = explode('.', $name);
  if (isset($_FILES['MD'])) {
    $base64 = file_get_contents($_FILES['MD']['tmp_name']);
  } else if (isset($_FILES['MD_Act'])) {
    $base64 = file_get_contents($_FILES['MD_Act']['tmp_name']);
  }
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $ubicacion =   '../../../temp/';
  // $ruta = $ubicacion . $archiveName[0] . '.txt';

  //cargue_ftp/Digitalizacion/Genesis/Gestion_Medicamento/'||v_panno||'/'||lpad(v_pperiodo,2,0)||'/'||v_ptercero||'';
  // $ruta = 'Gestion_Medicamento/'
  // $ruta = $ubicacion . $archiveName[0] . '.txt';
  $x = explode('_', $archiveName[0])[0];
  $nit = explode('MD', $x)[1];
  //$ruta2 = 'cargue_ftp/digitalizacion/genesis/Gestion_Medicamento/' . $ano . '/' . $periodo . '/' . $nit;
  $ruta = 'Gestion_Medicamento/' . $ano . '/' . $periodo . '/' . $nit;
  $zip = new ZipArchive();
  $cantFiles = 0;
  $nameFiles = [];
  if ($zip->open($ubicacion . $name) === TRUE) {
    for ($i = 0; $i < $zip->numFiles; $i++) {
      $cantFiles = $zip->numFiles;
      array_push($nameFiles, $nombresFichZIP['name'][$i] = $zip->getNameIndex($i));
    }
    // echo $nameFiles[0].'=='.$archiveName[0] . '.txt';
    if ($cantFiles == 1 && $nameFiles[0] == $archiveName[0] . '.txt') {
      $estado = $zip->extractTo($ubicacion);
      if ($estado) {
        $arrErrors = ValidaStructura($name);
        if (count($arrErrors) > 0) {
          echo json_encode($arrErrors);
        } else {
          require('../../sftp_cloud/UploadFile.php');
          $subio = UploadFile($ruta, $archiveName[0] . '.txt');

          explode('-', $subio);
          if ($subio[0] != '0') {
            echo $subio;
          } else {
            echo '0';
          }
        }
      }
    } else {
      echo 1;
    }
  }

  $zip->close();
}

function ValidaStructura($nombre)
{
  $fp = fopen("../../../temp/" . explode('.', $nombre)[0] . '.txt', "r");
  $nit = substr(explode('_', explode('.', $nombre)[0])[0], 2);
  $i = 0;
  $array_errors = [];
  while (!feof($fp)) {
    if (count($array_errors) == 100) {
      break;
    }
    $linea = fgets($fp);
    $i++;
    if ($nit != '900073223') {
      $cols = explode(',', $linea);
      if (count($cols) != 32) {
        if (count($array_errors) == 100) {
          array_push($array_errors, (object)[
            'fila' => $i,
            'columna' => count($cols)
          ]);
        }
      }
    }
  }
  $errores[] = (object) [
    'nombre' => $nombre,
    'cantError' => count($array_errors),
    'errores' => $array_errors
  ];
  if (count($array_errors) == 0) {
    $errores = [];
  }
  return $errores;

  fclose($fp);
}

subirValidaciion();
