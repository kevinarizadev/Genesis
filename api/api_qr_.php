<?php
header("Content-Type: text/html;charset=utf-8");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
header("Allow: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: *");
header("Content-Type: text/html;charset=utf-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_mostrar_detalle_autorizacion()
{
  global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_QR_AUTORIZA(:P_NUM_AUT,:P_COD_UBICCION,:P_NIT,:v_prespuesta); end;');
  oci_bind_by_name($consulta, ':P_NUM_AUT', $request->num_autorizacion);
  oci_bind_by_name($consulta, ':P_COD_UBICCION', $request->ubicacion);
  oci_bind_by_name($consulta, ':P_NIT', $request->nit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function p_mostrar_autorizacion()
{
  global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_COD_BARRA_AUT(:p_serial,:p_nit,:v_json); end;');
  oci_bind_by_name($consulta, ':p_serial', $request->serial);
  oci_bind_by_name($consulta, ':p_nit', $request->nit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

function p_descarga_soporte_aut()
{
  global $request;
  // $serial = '800101688595';
  // $nit = '900073223';
  // require('../php/config/dbcon_produccion.php');
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_SOPORTE_RUTA_AUT(:p_serial,:p_nit,:v_json); end;');
  // oci_bind_by_name($consulta, ':p_serial', $serial);
  // oci_bind_by_name($consulta, ':p_nit', $nit);
  oci_bind_by_name($consulta, ':p_serial', $request->serial);
  oci_bind_by_name($consulta, ':p_nit', $request->nit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  oci_close($c);
  // echo $json;
  $data = json_decode($json);



  if (!property_exists($data, 'ADJUNTO')) {
    echo '{"error":"Soporte no encontrado"}';
    exit;
  };

  if ($data->ADJUNTO) {
    $fileexists = false;
    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $data->ADJUNTO) == TRUE) {
      require_once('../php/config/sftp_con.php');
      $fileexists = true;
    }
    if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $data->ADJUNTO) == TRUE && $fileexists == false) {
      require_once('../php/config/sftp_con_2.php');
      $fileexists = true;
    }
    if (!$fileexists) {
      echo '{"error":"Soporte no encontrado"}';
      exit;
    };

    $name = uniqid();
    $ext = pathinfo($data->ADJUNTO, PATHINFO_EXTENSION);
    $name = $name . '.' . $ext;
    $local_file = '../temp/' . $name;
    $handle = fopen($local_file, 'w');
    if (ftp_fget($con_id, $handle, $data->ADJUNTO, FTP_ASCII, 0)) {
      $url = 'https://genesis.cajacopieps.com/temp/'.$name;
      echo '{"url":"'.$url.'"}';
      // echo $local_file;
    }
  }
  exit;
}


// p_descarga_soporte_aut();
