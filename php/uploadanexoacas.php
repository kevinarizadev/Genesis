<?php
	require_once('config/dbcon_prod.php');
	//require_once('config/ftpcon.php');
	//$path_login = 'ftp://ftp_genesis:Senador2019!@192.168.50.10/';
	require_once('config/sftp_con.php');
	$path_login = 'ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/';
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
 	}

	 

 	function registradb($rutat){
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
  	oci_close($c);
?>
