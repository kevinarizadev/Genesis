<?php
	require_once('../config/dbcon_prod.php');
	//require_once('config/ftpcon.php');
	//$path_login = 'ftp://ftp_genesis:Senador2019!@192.168.50.10/';
	// require_once('config/sftp_con.php');
	// $path_login = 'ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/';
	//variables de recepcion
	$tipodoc 		 = $_POST['tipodocumento'];
 	$cedula		   = $_POST['documento'];
	//$PATH_FILE   = $_POST['ftp'];
	$folder 	   = $_POST['folder'];
	$name        = $_POST['nuevonombre'];
	$doct 	  	 = $_POST['doct'];
	$obs         = $_POST['obs'];
	$conc        = $_POST['conc'];
	$mot		 = $_POST['mot'];
	$doc         = 'RE';
	$asunto      = $_POST['asunto'];
	$priori		 = $_POST['priori']; 
	$barrio		 = $_POST['barrio'];
	if(isset($_POST['tipoaportante'])){$tipo_doc_apor =  $_POST['tipoaportante'];}else{$tipo_doc_apor =  '';}
	if(isset($_POST['numaportante'])){$doc_aportante =  $_POST['numaportante'];}else{$doc_aportante =  '';}
	
	//variables de construccion
	//$ruta = $PATH_FILE.$folder;

	//verificacion de la carpeta de almacenamiento / creacion de esta llamado a function que sube el archivo

	/* // 22/11/2021
	if ((!$con_id) || (!$lr)) {
 		echo "Fallo en la conexión"; die;
 	}
	else {
 		$day = date("dmY");
 		$path_of_storage = '/cargue_ftp/Digitalizacion/Genesis/'.$folder.$day;
 		if (is_dir($path_login.$path_of_storage) == TRUE) {
 					subir($tipodoc,$cedula);
 		}else{
 			if (ftp_mkdir($con_id, $path_of_storage)) {
		 				subir($tipodoc,$cedula);
			}else {
		 		echo "0";
			}
 		}
 	}// 22/11/2021
	*/
	 

 	function registradb($rutat){
		//  echo ($rutat);
 		global $tipodoc;
 		global $cedula;
 		global $c;
		global $doct;
 		global $obs;
 		global $doc ;
 		global $doct;
 		global $conc;
 		global $mot;
 		global $asunto;
 		global $priori;
		 global $barrio;
		 global $tipo_doc_apor;
		 global $doc_aportante;
		$consulta = oci_parse($c,'begin pq_genesis_acas.P_INSERT_ACAS(:v_pdocumento,
																		:v_pubicacion,
																		:v_pconcepto,
																		:v_pmotivo,
																		:v_padjunto,
																		:v_pobservacion,
																		:v_pemisor,
																		:v_pasunto,
																		:v_pprioridad,
																		:v_pbarrio,
																		:v_ptipo_doc_apor,
																		:v_pdoc_aportante,
																		:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$doc);
		oci_bind_by_name($consulta,':v_pubicacion',$doct);
		oci_bind_by_name($consulta,':v_pconcepto',$conc);
		oci_bind_by_name($consulta,':v_pmotivo',$mot);
		oci_bind_by_name($consulta,':v_padjunto',$rutat);
		oci_bind_by_name($consulta,':v_pobservacion',$obs);
		oci_bind_by_name($consulta,':v_pemisor',$cedula);
		oci_bind_by_name($consulta,':v_pasunto',$asunto);
		oci_bind_by_name($consulta,':v_pprioridad',$priori);
		oci_bind_by_name($consulta,':v_pbarrio',$barrio);
		oci_bind_by_name($consulta,':v_ptipo_doc_apor',$tipo_doc_apor);
		oci_bind_by_name($consulta,':v_pdoc_aportante',$doc_aportante);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);		
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
		$json = $clob->read($clob->size());
		}else{
		$json = 0;
		}
		return $json;
 	}

	 /* // 22/11/2021
 	function subir($tipodoc,$cedula){
		//global $PATH_FILE;
 		global $con_id;
 		global $path_of_storage;
 		//global $ruta;
		global $day;
		global $name;
 		if(isset($_FILES['adjunto']['name']))  {
	 		 $source_file = $_FILES['adjunto']['tmp_name'];
	 		 $subio=@ftp_put($con_id, $path_of_storage.'/'.$name, $source_file, FTP_BINARY);
 			 if ($subio) {
				 	$rutadb = $path_of_storage.'/'.$name;
 			  		$yasubio = registradb($rutadb);
					echo $yasubio;
 			 }else{
 				   echo "0";
 			 }
 		}
 		ftp_close($con_id);
 	}
	 */ // 22/11/2021
	// echo($folder);
	// echo('<br>');
	
	
	// echo(filesize($_FILES['adjunto']['tmp_name']));
	// echo($file);
	$base64 = file_get_contents($_FILES['adjunto']['tmp_name']);
    file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp

	$day = date("dmY");
	$ruta = $folder.$day;
	require('../sftp_cloud/UploadFile.php');
	$subio = UploadFile($ruta, $name);
	// $subio = UploadFile($ruta, $name);
	if(substr($subio, 0,11) == '/cargue_ftp'){
		echo registradb($subio);
    } else{
		echo json_encode((object) [
			'codigo' => -1,
			'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
		]);
	}

	// function UploadFile($dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
	// 	$file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
	// // function UploadFile($base64 /*Base 64*/, $dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
	// // $file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
	// {
	// 	require_once('../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
	// 	// require_once('../../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
	// 	$host_path = '/data/sftpuser/cargue_ftp/Digitalizacion/Genesis/';//Ruta Host

	// 	// list(, $base64) = explode(';', $base64); // Proceso para traer el Base64
	// 	// list(, $base64) = explode(',', $base64); // Proceso para traer el Base64
	// 	// $base64 = base64_decode($base64); // Proceso para traer el Base64
	// 	// file_put_contents('../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
	// 	// file_put_contents('../../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
		
	// 	$sftp = ssh2_sftp($con_id); // Abrimos la conexion sftp
		
	// 	$parts = explode('/',$dir); // Calculamos cuantos directorios existen
	// 	foreach($parts as $part){ // Iniciamos el recorrido para crear los directorios si es que no existen algunos
	// 		$host_path = $host_path.$part.'/'; // Concatenamos la ruta $host_path con la carpeta del proyecto
	// 		if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Usamos la conexion sftp creada para Validar si el directorio existe
	// 			mkdir("ssh2.sftp://$sftp$host_path"); // Crea el directorio
	// 		}
	// 	}

	// 	if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Validamos si se crearon los directorios
	// 		return '0 - Error al subir el archivo, no se crearon los directorios';
	// 	} else {
	// 		$host_path = $host_path.$file; // Concatenamos la ruta del directorio con el nombre del archivo
	// 		$subio = ssh2_scp_send($con_id, '../../temp/'.$file, $host_path); // Subimos el archivo al servidor
	// 		// $subio = ssh2_scp_send($con_id, '../../../temp/'.$file, $host_path); // Subimos el archivo al servidor
	// 	}

	// 	if((!$subio) || (filesize("ssh2.sftp://$sftp$host_path") == 0 )){ return '0 - Archivo no subido correctamente';} // Validamos que se subio el archivo y que el peso sea diferente de 0

	// 	ssh2_exec($con_id, 'exit'); // Cerramos la conexion
	// 	return (substr($host_path, 14, strlen($host_path)-1)); // Recortamos la ruta para que solo muestre desde /cargue_ftp/...
	// }



  	oci_close($c);

?>
