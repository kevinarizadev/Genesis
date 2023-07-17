<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
  global $request;
  $fileexists = false;
  $requestruta = $request->ruta;
  if(substr($requestruta, 0, 36)  == '/cargue_ftp/Digitalizacion/Genesis//') {
    $requestruta = substr($request->ruta, 35, strlen($request->ruta)-1);
  }

  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $requestruta) == TRUE) {
      require_once('../config/ftpcon.php'); $fileexists = true;
    }
  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $requestruta) == TRUE) {
    require_once('../config/sftp_con.php'); $fileexists = true;
  }
  if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $requestruta) == TRUE) {
    require_once('../config/sftp_con_2.php'); $fileexists = true;
  }
  if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $requestruta) == TRUE) {
    require_once('../config/l_ftpcon.php'); $fileexists = true;
  }

  if($fileexists) {
    $file_size = ftp_size($con_id, $requestruta);
    if ($file_size != -1) {
      $ruta = $requestruta;
      $name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
      $ext = pathinfo($requestruta, PATHINFO_EXTENSION);
      $name = $name . '.' . $ext;
      $local_file = '../../temp/' . $name;
      $handle = fopen($local_file, 'w');
      if (ftp_fget($con_id, $handle, $requestruta, FTP_ASCII, 0)) {
        echo $name;
      } else {
        echo "0 - Error Al descargar el archivo";
      }
      ftp_close($con_id);
      fclose($handle);
    } else {
      echo "0 - Error Archivo no existe";
    }
  } else {
    require('../sftp_cloud/DownloadFile.php');
    echo( DownloadFile($requestruta) );
  }
}


function obtenercodigo()
{
  echo $_SESSION["codmunicipio"];
}

function obtenerdptos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cod = $request->cod;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_SECCIONALES(:vp_cod,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_cod', $cod);
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
function obtenermunis()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $dpto = $request->dpto;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_MUNIS(:vp_dpto,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_dpto', $dpto);
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
//////////////////////OBTENER USUARIOS/////////////////////////////
function obtenerusuarios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cedula = $_SESSION["cedula"];
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.OBTENER_USUARIO(:vp_cedula,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_cedula', $cedula);
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
//////////////////////OBTENER USUARIO REPORTE/////////////////////////////
function obtenerreporte()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cedula = $_SESSION["cedula"];
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.p_valida_funcionario(:v_documento,:v_response); end;');
  oci_bind_by_name($consulta, ':v_documento', $cedula);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
//////////////////////////OBTENER///////////////////////
function obtenersdocs()
{
  require_once('../config/dbcon_prod.php');
  // global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.p_obtener_tiposdocumentos(:v_json_row); end;');
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

function searchdocs()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_OBTENER_DOCS(:V_UBICACION,:V_DOC,:V_PERIODO,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':V_UBICACION', $request->cod_ubicacion);
  oci_bind_by_name($consulta, ':V_DOC', $request->nombre);
  oci_bind_by_name($consulta, ':V_PERIODO', $request->periodo);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function generar_excel()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_GENERAR_EXCEL(:V_UBICACION,:V_FECHA_INI,:V_FECHA_FIN,:V_DOC,:V_PERIODO,:V_RESULT); end;');
  oci_bind_by_name($consulta, ':V_UBICACION', $request->cod_ubicacion);
  oci_bind_by_name($consulta, ':V_FECHA_INI', $request->periodo_ini);
  oci_bind_by_name($consulta, ':V_FECHA_FIN', $request->periodo_fin);
  oci_bind_by_name($consulta, ':V_DOC', $request->nombre);
  oci_bind_by_name($consulta, ':V_PERIODO', $request->periodo);
  oci_bind_by_name($consulta, ':V_RESULT', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = null;
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function updatedoc()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_ACTUALIZAR_DOC(:vp_ubicacion,:vp_tipodocumento,:vp_periodo,:vp_ruta,:vp_codigo,
  :vp_observacion,:vp_estado,:vp_responsable,:vp_fecha_rad,:vp_num_afi,:vp_obs_doc,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_ubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':vp_tipodocumento', $request->tipodocumento);
  oci_bind_by_name($consulta, ':vp_periodo', $request->periodo);
  oci_bind_by_name($consulta, ':vp_ruta', $request->ruta);
  oci_bind_by_name($consulta, ':vp_codigo', $request->codigo);
  oci_bind_by_name($consulta, ':vp_observacion', $request->observacion);
  oci_bind_by_name($consulta, ':vp_estado', $request->estado);
  oci_bind_by_name($consulta, ':vp_responsable', $_SESSION["usu"]);
  oci_bind_by_name($consulta, ':vp_fecha_rad', $request->fecha_rad);
  oci_bind_by_name($consulta, ':vp_num_afi', $request->num_afi);
  oci_bind_by_name($consulta, ':vp_obs_doc', $request->obs_doc);
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

function subir()
{
  global $request;
  // variables de parametros

  $archivos =  $request->BaseArchivo;
  $hoy = date('dmY');
  $path = $request->path . $hoy;
  $name = $request->nomadj . '.' . $request->ext;
  list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
  list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
  $base64 = base64_decode($archivos); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  require('../sftp_cloud/UploadFile.php');
  $subio = UploadFile($path, $name);
  explode('-',$subio);
  if ($subio[0] != '0') {
    echo $subio;
  }
}

