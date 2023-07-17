<?php
	// $postdata = file_get_contents("php://input");
 //  	$request = json_decode($postdata);
	require_once('../config/dbcon_prod.php');
	$type = $_POST['type'];
 	$id = $_POST['id'];
	$ruta = "ftp://192.168.0.4/ASEGURAMIENTO/";
	$ftp_server = "192.168.0.4";
	$con_id = ftp_connect($ftp_server);
	$lr = ftp_login($con_id, "adminwebepss","Cajacopi2018.");
	$ps = ftp_pasv($con_id, true);
	if ((!$con_id) || (!$lr)) {
 		echo "Fallo en la conexión"; die;
 	} else {
 		$day = date("dmY");
 		$path_of_storage = "ASEGURAMIENTO/". $day;
 		if (is_dir('ftp://adminwebepss:Cajacopi2018.@192.168.0.4/'.$path_of_storage) == TRUE) {
 			subir($type,$id);
 		}else{
 			if (ftp_mkdir($conn_id, $path_of_storage)) {
		 		subir($type,$id);
			} else {
		 		echo "0";
			}
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
 		global $ruta;
 		$day = date("dmY");
 		if (isset($_FILES['id']['name']))  {
 			$rutat = '';
 			$doct = '';
 			$doca = 12;
 			$doct = $doca;
 			$ext = pathinfo($_FILES['id']['name'], PATHINFO_EXTENSION);
	 		$nombre= $doca.'_'.$type.'_'.$id.'_'.$day.'.'.$ext;
	 		$rutat = $ruta.$day.'/'.$nombre;
 			$temp = explode(".", $_FILES['id']['name']);
	 		$source_file = $_FILES['id']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombre, $source_file, FTP_BINARY);
 			if ($subio) {
 				$idres = registradb($rutat,$doct);
 			}else{
 				$idres = 0;
 			}
 		}
 		// CARGUE DE SISBEN
 		if (isset($_FILES['sisben']['name']))  {
 			$rutat = '';
 			$doct = '';
 			$docs = 16;
 			$doct = $docs;
 			$exts = pathinfo($_FILES['sisben']['name'], PATHINFO_EXTENSION);
 			//echo $exts;
 			$nombres= $docs.'_'.$type.'_'.$id.'_'.$day.'.'.$exts;
 			$rutat = $ruta.$day.'/'.$nombres;
 			//echo $rutat.'--'.$doc;
 			$temp = explode(".", $_FILES['sisben']['name']);
	 		$source_file = $_FILES['sisben']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombres, $source_file, FTP_BINARY);
 			if ($subio) {
 				$sisbenres = registradb($rutat,$doct);

 			}else{
 				$sisbenres = 0;
 			}
 		}
 		// CARGUE DE FORMULARIO UNICO DE AFILIACION Y REGISTRO DE NOVEDADES
 		if (isset($_FILES['fuar']['name']))  {
 			//echo $_FILES['fuar']['name'];
 			$rutat = '';
 			$doct = '';
 			$docf = 14;
 			$doct = $docf;
 			$extf = pathinfo($_FILES['fuar']['name'], PATHINFO_EXTENSION);
 			$nombref= $docf.'_'.$type.'_'.$id.'_'.$day.'.'.$extf;
 			$rutat = $ruta.$day.'/'.$nombref;
 			$temp = explode(".", $_FILES['fuar']['name']);
	 		$source_file = $_FILES['fuar']['tmp_name'];
	 		$subio=@ftp_put($con_id, $path_of_storage.'/'.$nombref, $source_file, FTP_BINARY);
 			if ($subio) {
 				$fuarres = registradb($rutat,$doct);
 			}else{
 				$fuarres = 0;
 			}
 		}
 		ftp_close($con_id);
 		$arr = array('IDRES' => $idres, 'SISBENRES' => $sisbenres, 'FUARRES' => $fuarres);
		echo json_encode($arr);
 	}
 	oci_close($c);
?>