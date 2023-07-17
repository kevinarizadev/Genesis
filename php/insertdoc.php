<?php
	require_once('config/ftpcon.php');
	session_start();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$hoy = date("dmY");
	$tmpfile = $request->typefile.'_'.$request->tipo_doc.'_'.$request->id.'_'.$hoy.'.'.$request->type;
	$b64img = $request->file;
	$path_of_storage = $request->path.$hoy;
	list(, $b64img) = explode(';', $b64img);
	list(, $b64img) = explode(',', $b64img);
	$b64img = base64_decode($b64img);
	file_put_contents($tmpfile, $b64img);
	if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
		$subio=@ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
		if ($subio) {
			subir($path_of_storage.'/'.$tmpfile);
		}else{
			echo "0";
		}
	}else{
		if (ftp_mkdir($con_id, $path_of_storage)) {
			$subio=ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				subir($path_of_storage.'/'.$tmpfile);
			}else{
				echo "0";
			}
		} else {
			echo "0";
		};
	}
	ftp_close($con_id);
	unlink($tmpfile);
	function subir($ruta){
		global $request;
		require_once('config/dbcon_prod.php');
		$obs = 'ADJUNTO CARGADO EN EL PORTAL GENESIS - CONSULTA DE AFILIADOS';
		$consulta = oci_parse($c,'begin pq_genesis_no.p_ins_doc_novedad(:v_pdocumento,
																							 :v_ptipo_doc_afiliado,
																							 :v_pafiliado,
																							 :v_pruta,
																							 :v_pobservacion); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$request->typefile);
		oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$request->tipo_doc);
		oci_bind_by_name($consulta,':v_pafiliado',$request->id);
		oci_bind_by_name($consulta,':v_pruta',$ruta);
		oci_bind_by_name($consulta,':v_pobservacion',$obs);
		$idres = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $idres;
		oci_close($c);
	}
?>