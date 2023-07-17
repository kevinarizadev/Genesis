<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
	// echo "1003380258";
}

function Obt_Nit()
{
	echo ($_SESSION["nit"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function P_OBTENER_TERCERO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_OBTENER_TERCERO(:V_PCOINCIDENCIA,:V_PJSON_OUT); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Nit);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function P_LISTA_CLASE_IPS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_LISTA_CLASE_IPS(:v_json_row); end;');
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

function P_UI_TERCERO_MINUTA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_UI_TERCERO_MINUTA(:v_pnit,:v_pprestador_salud,:v_pprestador_tecnologia,:v_pclase_ips,
  :v_pnaturaleza,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->Nit);
	oci_bind_by_name($consulta, ':v_pprestador_salud', $request->Prestador_salud);
	oci_bind_by_name($consulta, ':v_pprestador_tecnologia', $request->Prestador_tecnologia);
	oci_bind_by_name($consulta, ':v_pclase_ips', $request->Clase);
	oci_bind_by_name($consulta, ':v_pnaturaleza', $request->Naturaleza);
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
function Listado_Soportes()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_LISTA_SOPORTES_IPS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
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
function Cargar_Soportes_final()
{
	require_once('../config/dbcon_prod.php');
	global $request;
      $archivo = $request->adjunto;

      $path = 'Administrativa/ConsultaTercero';
      $day = date("dmY");
      $hora = date("His");
      $ext= 'pdf';
      $name= $day.'_'.$hora.'.'.$ext;
      $file= $archivo;
      list(, $file) = explode(';', $file);
      list(, $file) = explode(',', $file);
      $base64 = base64_decode($file);
      file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
      $ruta = $path.'/'.$day;
      require('../sftp_cloud/UploadFile.php');
      $subio = UploadFile($ruta, $name);
      if(substr($subio, 0,11) == '/cargue_ftp'){
		$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_UI_SOPRTES_TERCERO(:v_pnit,:v_prenglon,:v_pcod_numero,:v_pfecha_inicio,
		:v_pfecha_fin,:v_padjunto,:v_pestado,:v_json_row); end;');
		oci_bind_by_name($consulta, ':v_pnit', $request->nit);
		oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
		oci_bind_by_name($consulta, ':v_pcod_numero', $request->codigosoporte);
		oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->fecha_inicial);
		oci_bind_by_name($consulta, ':v_pfecha_fin', $request->fecha_final);
		oci_bind_by_name($consulta, ':v_padjunto', $subio);
		oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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
      } else{
          echo json_encode((object) [
              'codigo' => -1,
              'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
          ]);
      }
}

function descargararchivo (){  
	global $request;
	$fileexists = false;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../config/ftpcon.php'); $fileexists = true;
	  }
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
	  require_once('../config/sftp_con.php'); $fileexists = true;
	}

	if($fileexists) {
	  $file_size = ftp_size($con_id, $request->ruta);
	  if ($file_size != -1) {
		$ruta = $request->ruta;
		$name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name;
		$local_file = '../../temp/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
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
	  echo( DownloadFile($request->ruta) );
	  // echo( DownloadFile($request->ruta) );
	}


  }