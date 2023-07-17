<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();
 
	
	function subir_mesa_ayuda_ips(){
		require_once('../../config/dbcon.php');
		global $request;
		// $info = json_decode($request->data);
		$emisor=$_SESSION['cedula'];
		
		$consulta = oci_parse($c,'begin pq_genesis_mesa_ayuda_ips.p_insert_acas(:v_pubicacion, 
																				:v_pconcepto,
																				:v_pmotivo,
																				:v_padjunto,
																				:v_pobservacion,
																				:v_pemisor,
																				:v_pasunto,
																				:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
		oci_bind_by_name($consulta,':v_pconcepto',$request->v_pconceptom);
		oci_bind_by_name($consulta,':v_pmotivo',$request->v_pmotivo);
		oci_bind_by_name($consulta,':v_padjunto',$request->v_padjunto);
		oci_bind_by_name($consulta,':v_pobservacion',$request->v_pobservacion);
		oci_bind_by_name($consulta,':v_pemisor',$emisor);
		oci_bind_by_name($consulta,':v_pasunto',$request->v_pasunto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function carga_acas_ips(){
		require_once('../../config/dbcon.php');
		global $request;
		$cedula=$_SESSION['cedula'];
		//echo $cedula;
		$consulta = oci_parse($c,'begin pq_genesis_mesa_ayuda_ips.p_obtener_acas_ips(:v_ptercero,
																				:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_ptercero',$cedula);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);


	}
	function adjuntos_mesa_ayuda_ips(){
   	   require_once('../../config/dbcon.php');
	   require_once('../../config/ftpcon.php');
	   include('../../upload_file/subir_archivo.php');
	   global $request;
	   // variables de parametros
	   
	   // otras variables
	   $hoy = date('dmY');
	   $hora = date('h_i_s');
	   $path = '/cargue_ftp/Digitalizacion/Genesis/MesaAyuda/TIC/ips/mesaayuda/'.$hoy.'/';
	   $estado = 0;   
		$tipodoc = 'mesadeayuda';
		$cedula=$_SESSION['nit'];
		$name = $tipodoc.'_'.$cedula.'_'.$hora;
			$subio = subirFTP($request->achivobase,$path,$name,$request->ext);
			$rutas= $subio;
			
			echo $rutas;
	}
	function adjuntos_mesa_ayuda_ips_mensajes(){
   	   require_once('../../config/dbcon.php');
	   require_once('../../config/ftpcon.php');
	   include('../../upload_file/subir_archivo.php');
	   global $request;
	   // variables de parametros
	   
	   // otras variables
	   $hoy = date('dmY');
	     $hora = date('h_i_s');
	   $path = '/cargue_ftp/Digitalizacion/Genesis/MesaAyuda/TIC/ips/mesaayuda/'.$hoy.'/';
	   $estado = 0;   
			$tipodoc = 'mesadeayuda';
			$cedula=$_SESSION['nit'];
			$acas=$request->acas;
			$name = $tipodoc.'_'.$cedula."_".$acas."_".$hora;
			$subio = subirFTP($request->achivobase,$path,$name,$request->ext);
			$rutas= $subio;
			
			echo $rutas;
	}
	function enviar_respuesta(){
		require_once('../../config/dbcon.php');
		global $request;
		$cedula=$_SESSION['cedula'];
		$ruta=$request->v_pruta;
		$consulta = oci_parse($c,'begin pq_genesis_mesa_ayuda_ips.p_insert_gestion(:v_pnumero,
																					:v_pubicacion,
																					:v_ptercero,
																					:v_pobservacion,
																					:v_ruta,
																					:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
		oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
		oci_bind_by_name($consulta,':v_ptercero',$cedula);
		oci_bind_by_name($consulta,':v_pobservacion',$request->v_pobservacion);
		oci_bind_by_name($consulta,':v_ruta',$ruta);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}

	function listaConversacion(){
		require_once('../../config/dbcon.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mesa_ayuda_ips.p_obtener_comentario(:v_pradicado,
																					 :v_pubicacion,
																					:v_prespuesta);
																					 end;');
		oci_bind_by_name($consulta,':v_pradicado',$request->v_pradicado);
		oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function descargaAdjunto(){
		require_once('../../config/ftpcon.php');
		global $request;
		$name = uniqid();
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name.'.'.$ext;
		$local_file = '../../../temp/'.$name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
		 	echo $name;
		} else {
		 	echo "Error";
		}
		ftp_close($con_id);
		fclose($handle);
	}

 ?>