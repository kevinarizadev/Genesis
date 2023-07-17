<?php
	// $postdata = file_get_contents("php://input");
 //  	$request = json_decode($postdata);
	require_once('../config/dbcon_prod.php');
	require_once('../config/ftpcon.php');
	$type = $_POST['type'];
 	$id = $_POST['id'];
	$path_login = 'ftp://ftp_genesis:Senador2019!@192.168.50.10/';
	$day = date("dmY");
	$path_of_storage = "/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/". $day."/";
	if (is_dir($path_login.$path_of_storage) == TRUE) {
		subir($type,$id);
	}else{
		if (ftp_mkdir($con_id, $path_of_storage)) {
 			subir($type,$id);
		} else {
	 		echo "0" . $path_login . $path_of_storage;
		}
	}

 	function registradb($rutat,$doct){
 		global $type;
 		global $id;
 		global $c;
 		$obs = 'Novedad';
		$consulta = oci_parse($c,'begin pq_genesis_no.p_ins_doc_novedad(:v_pdocumento,
																							 :v_ptipo_doc_afiliado,
																							 :v_pafiliado,
																							 :v_pruta,
																							 :v_pobservacion); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$doct);
		oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$type);
		oci_bind_by_name($consulta,':v_pafiliado',$id);
		oci_bind_by_name($consulta,':v_pruta',$rutat);
		oci_bind_by_name($consulta,':v_pobservacion',$obs);
		$idres = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		return $idres;
 	}
 	function subir($type,$id){
 		global $con_id;
 		global $path_of_storage;
 		$day = date("dmY");
 		if (isset($_FILES['id']['name']))  {
 			$rutat = '';
 			$doca = 12;
 			$ext = pathinfo($_FILES['id']['name'], PATHINFO_EXTENSION);
	 		$nombre= $doca.'_'.$type.'_'.$id.'_'.$day.'.'.$ext;
	 		$rutat = $path_of_storage.$nombre;
 			$temp = explode(".", $_FILES['id']['name']);
	 		$source_file = $_FILES['id']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
 			if ($subio) {
 				$idres = registradb($rutat,$doca);
 			}else{
 				$idres = 0;
 			}
 		}
 		// CARGUE DE SISBEN
 		if (isset($_FILES['sisben']['name']))  {
 			$docs = 16;
 			$exts = pathinfo($_FILES['sisben']['name'], PATHINFO_EXTENSION);
 			$nombre= $docs.'_'.$type.'_'.$id.'_'.$day.'.'.$exts;
 			$rutat = $path_of_storage.$nombre;
 			$temp = explode(".", $_FILES['sisben']['name']);
	 		$source_file = $_FILES['sisben']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
 			if ($subio) {
 				$sisbenres = registradb($rutat,'16');
 			}else{
 				$sisbenres = $subio;
 			}
 		}else{
 			$sisbenres = false;
 		}
 		//
 		if (isset($_FILES['sisben2']['name']))  {
 			$rutat = '';
 			$docs = 16;
 			$exts2 = pathinfo($_FILES['sisben2']['name'], PATHINFO_EXTENSION);
 			$nombres= $docs.'_'.$type.'_'.$id.'_'.$day.'.'.$exts2;
 			$rutat = $path_of_storage.$nombres;
 			$temp = explode(".", $_FILES['sisben2']['name']);
	 		$source_file = $_FILES['sisben2']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombres, $source_file, FTP_BINARY);
 			if ($subio) {
 				$sisbenres2 = registradb($rutat,$docs);
 			}else{
 				$sisbenres2 = 0;
 			}
 		}else{
 			$sisbenres2 = false;
 		}
 		// CARGUE DE FORMULARIO UNICO DE AFILIACION Y REGISTRO DE NOVEDADES
 		if (isset($_FILES['fuar']['name']))  {
 			//echo $_FILES['fuar']['name'];
 			$rutat = '';
 			$docf = 14;
 			$extf = pathinfo($_FILES['fuar']['name'], PATHINFO_EXTENSION);
 			$nombref= $docf.'_'.$type.'_'.$id.'_'.$day.'.'.$extf;
 			$rutat = $path_of_storage.$nombref;
 			$temp = explode(".", $_FILES['fuar']['name']);
	 		$source_file = $_FILES['fuar']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombref, $source_file, FTP_BINARY);
 			if ($subio) {
 				$fuarres = registradb($rutat,$docf);
 			}else{
 				$fuarres = 0;
 			}
 		}else{
 			$fuarres = false;
 		}

 		if (isset($_FILES['certmedico']['name']))  {
 			//echo $_FILES['certmedico']['name'];
 			$rutat = '';
 			$doct = '';
 			$docm = 7;
 			$doct = $docm;
 			$extf = pathinfo($_FILES['certmedico']['name'], PATHINFO_EXTENSION);
 			$nombrecertmed= $docm.'_'.$type.'_'.$id.'_'.$day.'.'.$extf;
 			$rutat = $path_of_storage.$nombrecertmed;
 			$temp = explode(".", $_FILES['certmedico']['name']);
	 		$source_file = $_FILES['certmedico']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombrecertmed, $source_file, FTP_BINARY);
 			if ($subio) {
 				$certmedicores = registradb($rutat,$doct);
 			}else{
 				$certmedicores = 0;
 			}
 		}else{
 			$certmedicores = false;
 		}

 		if (isset($_FILES['certafilreg']['name']))  {
 			//echo $_FILES['certmedico']['name'];
 			$rutat = '';
 			$doct = '';
 			$doccertafilreg = 20;
 			$doct = $doccertafilreg;
 			$extf = pathinfo($_FILES['certafilreg']['name'], PATHINFO_EXTENSION);
 			$nombrecertmed= $doccertafilreg.'_'.$type.'_'.$id.'_'.$day.'.'.$extf;
 			$rutat = $path_of_storage.$nombrecertmed;
 			$temp = explode(".", $_FILES['certafilreg']['name']);
	 		$source_file = $_FILES['certafilreg']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombrecertmed, $source_file, FTP_BINARY);
 			if ($subio) {
 				$certafilreg = registradb($rutat,$doct);
 			}else{
 				$certafilreg = 0;
 			}
 		}else{
 			$certafilreg = false;
 		}

 		if (isset($_FILES['certdefuncion']['name']))  {
 			//echo $_FILES['certmedico']['name'];
 			$rutat = '';
 			$doct = '';
 			$docdefuncion = 19;
 			$doct = $docdefuncion;
 			$extf = pathinfo($_FILES['certdefuncion']['name'], PATHINFO_EXTENSION);
 			$nombrecertmed= $docdefuncion.'_'.$type.'_'.$id.'_'.$day.'.'.$extf;
 			$rutat = $path_of_storage.$nombrecertmed;
 			$temp = explode(".", $_FILES['certdefuncion']['name']);
	 		$source_file = $_FILES['certdefuncion']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombrecertmed, $source_file, FTP_BINARY);
 			if ($subio) {
 				$certdefuncion = registradb($rutat,$doct);
 			}else{
 				$certdefuncion = 0;
 			}
 		}else{
 			$certdefuncion = false;
 		}
 		ftp_close($con_id);
 		$arr = array('IDRES' => $idres, 'SISBENRES' => $sisbenres, 'FUARRES' => $fuarres,'CERTMEDICORES' => $certmedicores,'CERTAFILREG' => $certafilreg,
 						 'CERTDEFUNCIONRES' => $certdefuncion, 'SISBENRES2' => $sisbenres2);
		echo json_encode($arr);
 	}
 	oci_close($c);
?>