<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function subirAdjunto(){
	require_once('../config/dbcon_prod.php');
	require_once('../upload_file/subir_directory.php');
	global $request;
	$file = $request->file;
  $ext = $request->ext;
  $nit = $request->nit;
  $hoy = date('dmY');
  $path = '/externos/base_res/'.$nit.'/' ;
	$name = 'TE_'.$hoy.'_'.$nit.'_'.uniqid();
  echo $path.$name.'.'.$ext;
  // $subir = subirDirectory($file,$path,$name,$ext);
 
}

function subirDirectoryCAC(){
  require_once('../config/ftpdirect.php');
  global $request;
  $hoy = date('dmY');
  $file = $request ->file;
  $nit = $request ->nit;
  $ext = $request ->ext; 
  $path = '/externos/base_res/'.$nit.'/' ;
  $name = $request ->name;
  // 'TE_'.$hoy.'_'.$nit.'_'.uniqid();

  $db_name = $path.$name;
  $tmpfile = $name;
  list(, $file) = explode(';', $file);
  list(, $file) = explode(',', $file);
  $file = base64_decode($file);
  file_put_contents($tmpfile, $file);
  if (is_dir('ftp://oracle:yQtev!2017.@192.168.50.12/'.$path) == TRUE) {
    $subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
    if ($subio) {
      unlink($tmpfile);
      return $db_name;
    }else{
      unlink($tmpfile);
      return '0 - Error';
    }
  }else{
    if (ftp_mkdir($con_id, $path)) {
      $subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
      if ($subio) {
        unlink($tmpfile);
        chmod ($path.'/'.$tmpfile,0777);
        return $db_name;
      }else{
        unlink($tmpfile);
        return '0 - Error';
      }
    }else{
             return '0';
          }
  }
  ftp_close($con_id);
}



//obtener_periodo
function obtener_ips(){
  require_once('../config/dbcon_prod.php');
  global $request;
/*P_OBTENER_IPS( v_pdata         varchar2,
                           v_json_row     out clob)*/
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_OBTENER_IPS(:v_pdata, :v_pubicacion, :v_json_row); end;');
  oci_bind_by_name($consulta,':v_pdata',$request->datos);
  //v_pubicacion
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
} 
//obtener_periodo
function obtener_periodo(){
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_obtener_periodo(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

function leer_file(){
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN leer_file(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

//P_OBTENER_CANT_USUARIO
function OBTENER_CANT_USUARIO(){
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_OBTENER_CANT_USUARIO(:v_pnit,:v_pjson_row); end;');
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta,':v_pnit',$_SESSION["nit"]);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

function INSERTA_ARCHIVOS(){
	require_once('../config/dbcon_prod.php');
  global $request;
  $ruta = $request->ruta;

  // subirDirectory($file,$path,$name,$ext);
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_INSERTA_ARCHIVOS(:v_pnit,
	:v_parchivo,
	:v_pperiodo,
	:v_pruta,
	:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pnit',$request->nit);
	oci_bind_by_name($consulta,':v_parchivo',$request->archivo);
	oci_bind_by_name($consulta,':v_pperiodo',$request->periodo);
	oci_bind_by_name($consulta,':v_pruta', $ruta);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

//pj_res_validacion
function PJ_RES_VALIDACION(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_J_RES_VALIDACION(:v_pnit); end;');
	oci_bind_by_name($consulta,':v_pnit',$_SESSION["nit"]);


	oci_execute($consulta,OCI_DEFAULT);

	oci_close($c);
}

//P_OBTENER_VALIDACIONES     ( v_json_row
function OBTENER_VALIDACIONES(){
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_OBTENER_VALIDACIONES(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}
?>
