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
  // $serial = '800101688595';//Tiene
  // $serial = '4700100581813';//No
  // $nit = '900073223';
  // require('../php/config/dbcon_produccion.php');
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_COD_BARRA_AUT(:p_serial,:p_nit,:v_json); end;');
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
  //echo $data->ARCHIVO;
  if (!property_exists($data, 'ARCHIVO')) {
    echo $json;
    exit;
  };
  if ($data->ARCHIVO != '') {
    $fileexists = false;
    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $data->ARCHIVO) == TRUE) {
      require_once('../php/config/sftp_con.php');
      $fileexists = true;
    }
    if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $data->ARCHIVO) == TRUE && $fileexists == false) {
      require_once('../php/config/ftpcon.php');
      $fileexists = true;
    }
    if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $data->ARCHIVO) == TRUE && $fileexists == false) {
      require_once('../php/config/sftp_con_2.php');
      $fileexists = true;
    }
    if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $data->ARCHIVO) == TRUE && $fileexists == false) {
      require_once('../php/config/l_ftpcon.php');
      $fileexists = true;
    }

    if ($fileexists) {
      //echo '{"error":"Soporte no encontrado"}';
      //exit;

      $name = uniqid();
      $ext = pathinfo($data->ARCHIVO, PATHINFO_EXTENSION);
      $name = $name . '.' . $ext;
      $local_file = '../temp/' . $name;
      $handle = fopen($local_file, 'w');
      if (ftp_fget($con_id, $handle, $data->ARCHIVO, FTP_ASCII, 0)) {
        $url = 'https://genesis.cajacopieps.com/temp/'.$name;
        $data->ARCHIVO = $url;
        // echo '{"url":"'.$url.'"}';
        echo json_encode($data);
      }
    }else {
      require('../php/sftp_cloud/DownloadFile.php');
      //echo( DownloadFile($data->ARCHIVO) );
      $url = 'https://genesis.cajacopieps.com/temp/'.DownloadFile($data->ARCHIVO);
      $data->ARCHIVO = $url;
      echo json_encode($data);
    }
  }else{
    echo $json;
  }
  exit;
}

// p_mostrar_autorizacion();

function p_descarga_soporte_aut()
{
  global $request;
  // $serial = '800101688595';
  // $nit = '900073223';
  require('../php/config/dbcon_produccion.php');
  // require('../php/config/dbcon_login.php');
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

function p_inserta_factura_aut()
{
  global $request;
  require('../php/config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin oasis.pq_webservices_ips.p_inserta_factura_aut(:p_factura,:p_valor_facrura,:p_autorizacion,:v_json); end;');
  oci_bind_by_name($consulta, ':p_factura', $request->factura);
  oci_bind_by_name($consulta, ':p_valor_facrura', $request->valorFactura);
  oci_bind_by_name($consulta, ':p_autorizacion', $request->autorizacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());

  oci_close($c);

  echo $json;
  exit;
}

