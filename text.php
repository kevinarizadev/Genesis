<?php

$ruta = 'cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Web/AUT-575716-70001.pdf';
// $ruta = '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/01012018/12_CC_1073829025_01012018.pdf';
  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.15/' . $ruta) == TRUE) {
    require_once('./php/config/sftp_con_15.php');
// if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $ruta) == TRUE) {
//   require_once('./php/config/l_ftpcon.php');
  $fileexists = true;
  echo 'Encontrado';
}else{
  echo 'No encontrado';
  exit;
}

$ps = ftp_pasv($con_id, true);
if ($fileexists) {
  //echo '{"error":"Soporte no encontrado"}';
  //exit;

  $name = 'XXXXXXXMMMMMMMMMMMMXXXXXXXXXXXX';
  // $name = uniqid();
  $ext = pathinfo($ruta, PATHINFO_EXTENSION);
  $name = $name . '.' . $ext;
  $local_file = './temp/' . $name;
  $handle = fopen($local_file, 'w');
  if (ftp_fget($con_id, $handle, $ruta, FTP_ASCII, 0)) {
    // $url = 'https://genesis.cajacopieps.com/temp/'.$name;
    // $data->ARCHIVO = $url;
    // echo '{"url":"'.$url.'"}';
    echo $url;
    // echo json_encode($data);
  }
}
