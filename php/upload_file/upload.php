<?php
	require_once('../config/ftpcon.php');
	session_start();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$db = $request->db;
	if ($request->ori == true) {
		$hoy = date("dmY");
		$tmpfile = $request->typefile.'_'.$hoy.'_'.$request->constutela.'_'.uniqid().'.'.$request->type;
		$b64img = $request->file;
		$path_of_storage = $request->path;
		list(, $b64img) = explode(';', $b64img);
		list(, $b64img) = explode(',', $b64img);
		$b64img = base64_decode($b64img);
		file_put_contents($tmpfile, $b64img);
		if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path_of_storage) == TRUE) {
			$subio=@ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
			if ($subio) {
				$db($path_of_storage.'/'.$tmpfile);
			}else{
				echo "0";
			}
		}else{
			if (ftp_mkdir($con_id, $path_of_storage)) {
				$subio=ftp_put($con_id, $path_of_storage.'/'.$tmpfile, $tmpfile, FTP_BINARY);
				if ($subio) {
					$db($path_of_storage.'/'.$tmpfile);
				}else{
					echo "0";
				}
			} else {
				echo "0";
			};
		}
		ftp_close($con_id);
		unlink($tmpfile);
	}else{
		$db('');
	}
	//Registro de tutela
	function GTUT01 ($ruta){
		require_once('../config/dbcon.php');
		global $request;
		$tipo = '1';
		$fecha = '';
		$falloimpugnacionfc = null;
		$mediofisico = null;
		$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
		oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		oci_bind_by_name($consulta,':v_pfecha_recibido',$fecha);
		oci_bind_by_name($consulta,':v_parchivo',$ruta);
		oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
		oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		$ex = oci_execute($consulta,OCI_DEFAULT);
		if (!$ex) {
			echo oci_error($stid);
		}else{
			$json = $clob->read($clob->size());
			echo $json;
		}
		oci_close($c);
	}
	//Recepcion de respuesta de tutela
	function RRT01 ($ruta){
		require_once('../config/dbcon.php');
		global $request;
		$tipo = '3';
		$falloimpugnacionfc = null;
		$mediofisico = null;
		$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
		oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_recepcion);
		oci_bind_by_name($consulta,':v_parchivo',$ruta);
		oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
		oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		$ex = oci_execute($consulta,OCI_DEFAULT);
		if (!$ex) {
			echo oci_error($stid);
		}else{
			$json = $clob->read($clob->size());
			echo $json;
		}
		oci_close($c);
	}
	// function uplRutaDb ($ruta){
	// 	require_once('../config/dbcon.php');
	// 	global $request;
	// 	//$tipo = '2';
	// 	$fecha = '';
	// 	$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_json_row); end;');
	// 	oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
	// 	oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
	// 	oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
	// 	oci_bind_by_name($consulta,':v_pfecha_recibido',$fecha);
	// 	oci_bind_by_name($consulta,':v_parchivo',$ruta);
	// 	oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
	// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
	// 	oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
	// 	$ex = oci_execute($consulta,OCI_DEFAULT);
	// 	if (!$ex) {
	// 		echo oci_error($stid);
	// 	}else{
	// 		$json = $clob->read($clob->size());
	// 		echo $json;
	// 	}
	// 	oci_close($c);
	// }
	function uplRutaDb ($ruta){
		require_once('../config/dbcon.php');
		global $request;
		//$tipo = '2';
		$fecha = '';
		$falloimpugnacionfc = null;
		$mediofisico = null;
		if($request->typefile == "14"){
			if($request->fallo_seg == true){
				$fecha = 'A';
			}else{
				$fecha = 'C';
			}
		}
		$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
		oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
		oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
		oci_bind_by_name($consulta,':v_pfecha_recibido',$fecha);
		oci_bind_by_name($consulta,':v_parchivo',$ruta);
		oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
		oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		$ex = oci_execute($consulta,OCI_DEFAULT);
		if (!$ex) {
			echo oci_error($stid);
		}else{
			$json = $clob->read($clob->size());
			echo $json;
		}
		oci_close($c);
	}
	function APRE01 ($ruta){
		require_once('../config/dbcon.php');
		global $request;
		$fecha = '';
		$consulta = oci_parse($c,'begin pq_genesis_tut.P_INS_DOC_APROBACION(:v_pnumero,
																								:v_pubicacion,
																								:v_ptipo,
																								:v_pfecha_recibido,
																								:v_parchivo,
																								:v_presponsable,
																								:v_observacion,
																								:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
		oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
		oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
		oci_bind_by_name($consulta,':v_pfecha_recibido',$fecha);
		oci_bind_by_name($consulta,':v_parchivo',$ruta);
		oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_observacion',$request->mensaje);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		$ex = oci_execute($consulta,OCI_DEFAULT);
		if (!$ex) {
			echo oci_error($stid);
		}else{
			$json = $clob->read($clob->size());
			echo $json;
		}
		oci_close($c);
	}
	//Cumplimiento mensual
		function CM01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '5';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_fechasegmen);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}

		//Fecha fallo impugnacion
		function FLI01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$falloimpugnacionfc = ($request->falloimpugnacionfc == true) ? 'S' : 'N';
			$tipo = '6';
			$medio = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_fechafallimp);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$medio);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
		//Fecha Requerimiento Previo
		function RP01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '7';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_reqpre);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}

		//Fecha Requerimiento Previo Respuesta
		function RPR01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '8';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_reqpreres);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}

		//Incidente de Desacato
		function PID01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '9';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_proincdes);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}

		//Incidente de Desacato respuesta
		function PID02 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '10';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_proincdesres);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}

		//Fallo de incidente de Desacato
		function PID03 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '11';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_fallincdes);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
		//Consulta incidente
		function PID04 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '12';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_conincdes);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
		//Cierre de incidente
		function PID05 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			$tipo = '13';
			$falloimpugnacionfc = null;
			$mediofisico = null;
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$tipo);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_cieincdes);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
		//Registro de Medios de Recepción CNVU
		function GMREC ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			// $tipo = '3';
			$falloimpugnacionfc = null;
			$medio = ($request->medio == true) ? 'S' : 'N';
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pfecha_recibido,:v_parchivo,:v_presponsable,:v_pfallo_impugnacion,:v_pfisico,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_reqpre);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfallo_impugnacion',$falloimpugnacionfc);
			oci_bind_by_name($consulta,':v_pfisico',$medio);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
        //ESTADO DE TUTELA CNVU CC ABRIL 2021
		function ET01 ($ruta){
			require_once('../config/dbcon.php');
			global $request;
			//$tipo = '48';
			$mediofisico = null;
			// echo ($_SESSION['codmunicipio']);
			// echo ($_SESSION['cedula']);
			$consulta = oci_parse($c,'begin pq_genesis_tut.p_ins_tutela_archivo_estado(:v_pnumero,
																				:v_pubicacion,
																				:v_ptipo,
																				:v_pfecha_recibido,
																				:v_pobservacion,
																				:v_pestado,
																				:v_parchivo,
																				:v_presponsable,
																				:v_pfisico,
																				:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pnumero',$request->constutela);
			oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
			oci_bind_by_name($consulta,':v_ptipo',$request->typefile);
			oci_bind_by_name($consulta,':v_pfecha_recibido',$request->fecha_estadotutela);
			oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);
			oci_bind_by_name($consulta,':v_pestado',$request->estado);
			oci_bind_by_name($consulta,':v_parchivo',$ruta);
			oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
			oci_bind_by_name($consulta,':v_pfisico',$mediofisico);
			$clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
			$ex = oci_execute($consulta,OCI_DEFAULT);
			if (!$ex) {
				echo oci_error($stid);
			}else{
				$json = $clob->read($clob->size());
				echo $json;
			}
			oci_close($c);
		}
?>