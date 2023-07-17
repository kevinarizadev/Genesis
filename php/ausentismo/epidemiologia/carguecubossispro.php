<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


// function cargarSoporte()
// {
//   // require_once('../config/dbcon.php');
//   require('../sftp_cloud/UploadFile.php');
//   global $request;
//   // $archivos = json_decode($request->archivos);
//   $archivo = $request->base64;
//   $path = 'Epidemiologia/Cubos_SISPRO/' . $request->nombreCarpeta;
//   $hoy = date('dmY_His');
//   $name = $request->nombreArchivo .  '_' . $hoy . '.txt';
//   list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
//   list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
//   $base64 = base64_decode($archivo); // Proceso para traer el Base64
//   file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
//   $subio = UploadFile($path, $name);
//   echo $subio;
// }

function cargarSoporte()
{
  require_once('../config/sftp_con.php');
  global $request;
  // $hoy = date("dmY");
  $path_of_storage = '/cargue_ftp/Digitalizacion/Genesis/Epidemiologia/Cubos_SISPRO/' . $request->nombreCarpeta;
  $hoy = date('dmY_His');
  $tmpfile = $request->nombreArchivo .  '_' . $hoy . '.txt';
  $b64img = $request->base64;
  list(, $b64img) = explode(';', $b64img);
  list(, $b64img) = explode(',', $b64img);
  $b64img = base64_decode($b64img);
  file_put_contents($tmpfile, $b64img);
  if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $path_of_storage) == TRUE) {
    $subio = @ftp_put($con_id, $path_of_storage . '/' . $tmpfile, $tmpfile, FTP_BINARY);
    if ($subio) {
      echo($path_of_storage . '/' . $tmpfile);
    } else {
      echo "0";
    }
  } else {
    if (ftp_mkdir($con_id, $path_of_storage)) {
      $subio = ftp_put($con_id, $path_of_storage . '/' . $tmpfile, $tmpfile, FTP_BINARY);
      if ($subio) {
        echo($path_of_storage . '/' . $tmpfile);
      } else {
        echo "0";
      }
    } else {
      echo "0";
    };
  }
  ftp_close($con_id);
  unlink($tmpfile);
}

function p_ui_cargue()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_cubos_sispro.p_insertar_registros_sispro(:v_pjson_in,:v_pjson_out); end;');
  oci_bind_by_name($consulta, ':v_pjson_in', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_ver_permisos_funcs()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_cubos_sispro.p_ver_permisos_funcs(:v_pcedula,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_listar_funcs()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_cubos_sispro.p_listar_funcs(:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_ui_funcs()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_cubos_sispro.p_ui_funcs(:v_pcedula,:v_paccion,:v_pestado,:v_pjson_out); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function p_consulta_cargue()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_cubos_sispro.p_consulta_cargue(:v_pjson_out); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
