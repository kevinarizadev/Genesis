<?php
	require_once('config/dbcon_prod.php');
	require_once('config/ftpcon.php');
	//variables de recepcion
	$tipodoc 		 = $_POST['tipodocumento'];
 	$cedula		   = $_POST['documento'];
	$PATH_FILE   = '/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/DatosFuncionario/Beneficiario/';
	$name        = $_POST['nuevonombre'];
	$doct 	  	 = $_POST['doct'];
	$obs         = $_POST['obs'];

	//verificacion de la carpeta de almacenamiento / creacion de esta llamado a function que sube el archivo
	
	$day = date("dmY");
	$path_of_storage = $PATH_FILE.$day;
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
		subir($tipodoc,$cedula);
	}else{
		//echo $path_of_storage;
		if (@ftp_mkdir($con_id, $path_of_storage)) {
			//subir($tipodoc,$cedula);
			echo $con_id;
		}else {
			echo "lin23";
		}
	}

 	function registradb($rutat){
 		global $tipodoc;
 		global $cedula;
 		global $c;
		global $doct;
 		global $obs;
		$consulta = oci_parse($c,'begin pq_genesis_no.p_ins_doc_novedad(:v_pdocumento,
																																	  :v_ptipo_doc_afiliado,
																																	  :v_pafiliado,
																																	  :v_pruta,
																																	  :v_pobservacion); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$doct);
		oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodoc);
		oci_bind_by_name($consulta,':v_pafiliado',$cedula);
		oci_bind_by_name($consulta,':v_pruta',$rutat);
		oci_bind_by_name($consulta,':v_pobservacion',$obs);
		$idres = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		return $idres;
 	}
 	function subir($tipodoc,$cedula){
		global $PATH_FILE;
 		global $con_id;
 		global $path_of_storage;
		global $day;
		global $name;
 		if(isset($_FILES['adjunto']['name']))  {
	 		 $source_file = $_FILES['adjunto']['tmp_name'];
	 		 $subio=@ftp_put($con_id, $path_of_storage.'/'.$name, $source_file, FTP_BINARY);
 			 if ($subio) {
				 	$rutadb = $PATH_FILE.$path_of_storage.'/'.$name;
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
