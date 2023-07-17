<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function descargaAdjunto()
{
	global $request;
	$fileexists = false;
	/*if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
    	require_once('../config/ftpcon.php'); $fileexists = true;
  	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con.php'); $fileexists = true;
	}*/
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
	    require_once('../config/ftpcon.php');
	    $fileexists = true;
	  }
	  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
	    require_once('../config/sftp_con.php');
	    $fileexists = true;
	  }
	  if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE) {
	    require_once('../config/sftp_con_2.php');
	    $fileexists = true;
	  }
	  if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $request->ruta) == TRUE) {
	    require_once('../config/l_ftpcon.php');
	    $fileexists = true;
	  }

	if($fileexists) {
		$file_size = ftp_size($con_id, $request->ruta);
		if ($file_size != -1) {
			$ruta = $request->ruta;
			$name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
			$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
			$name = $name . '.' . $ext;
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

// function DownloadFile($ruta /* Ruta del soporte */)
// {
// 	require_once('../config/scp_oracle_con.php'); // Conexion SFTP ORACLE
// 	// require_once('../../config/scp_oracle_con.php'); // Conexion SFTP ORACLE
// 	// $ruta = $ruta;
// 	$name_file = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
// 	$local_file = '../../temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
// 	// $local_file = '../../../temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
// 	$sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
// 	$ruta = '/data/sftpuser'.$ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
// 	if(!file_exists("ssh2.sftp://$sftp$ruta")){ return '0 - Archivo no encontrado'; } //Validamos si el archivo existe en el servidor Oracle
// 	ssh2_scp_recv($con_id, $ruta, $local_file);// Traemos el archivo del servidor y lo enviamos a la carpeta temp de Genesis
// 	$con_id = null; unset($con_id); //Cerrar Conex
// 	return ($name_file); // Imprimimos el nombre del archivo para que se genere la descarga del mismo
// }

function Obt_Acas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_OBTENER_ACAS_2(:v_pjson_row_in,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pjson_row_in', $request->xdata);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obt_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_obtener_funcionario(:v_pdato,:v_json_out,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdato', $request->Coincidencia);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NOMBRE' => $row['NOMBRE'],
			));
		}
		echo json_encode($array);
	} else {
		echo json_encode($json);
	}
	oci_free_statement($consulta);
	oci_free_statement($curs);
	oci_close($c);
}
?>
