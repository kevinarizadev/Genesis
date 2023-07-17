<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function insertarurgencia(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$coddiag1          = $request->coddiag1;
		$coddiag2 		     = $request->coddiag2;
		$ubicacion 		     = $request->ubicacion;
		$docsolicitante    = $request->docsolicitante;
		$nitips    				 = $_SESSION['nit'];
		$tipodocpaciente   = $request->tipodocpaciente;
		$documentopaciente = $request->documentopaciente; 
		$observacion       = $request->observacion;
		$fechaingreso 		 = $request->fechaingreso;
		$rol							 = $request->rol;
		$hijo							 = $request->hijo;
		$ruta = $request->ruta;


		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_INSERTA_COD_URGENCIA(:v_pcoddiag1,:v_pcoddiag2,:v_pubicacion,:v_pdocsolicitante,:v_pnitips,:v_ptipodocpaciente,:v_pdocpaciente,:v_pobservacion,:v_pfechaingreso,:v_prol,:v_phijo,:v_pruta,:v_pinformacion); end;');
		oci_bind_by_name($consulta,':v_pcoddiag1',$coddiag1);
		oci_bind_by_name($consulta,':v_pcoddiag2',$coddiag2);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		oci_bind_by_name($consulta,':v_pdocsolicitante',$docsolicitante);
		oci_bind_by_name($consulta,':v_pnitips',$nitips);
		oci_bind_by_name($consulta,':v_ptipodocpaciente',$tipodocpaciente);
		oci_bind_by_name($consulta,':v_pdocpaciente',$documentopaciente);
		oci_bind_by_name($consulta,':v_pobservacion',$observacion);
		oci_bind_by_name($consulta,':v_pfechaingreso',$fechaingreso);
		oci_bind_by_name($consulta,':v_prol',$rol);
		oci_bind_by_name($consulta,':v_phijo',$hijo);
		oci_bind_by_name($consulta, ':v_pruta', $ruta);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pinformacion', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function validarips(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$ips =$_SESSION['nit'];
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_IPS(:v_pips,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pips',$ips);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function obtener_reporte(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$fechai = date('d/m/Y', strtotime($request->fechai));
		$fechaf = date('d/m/Y', strtotime($request->fechaf));
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_REPORTE_URGENCIA(:v_pnit,
																																							 :v_pfecha_inicial,
																																							 :v_pfecha_final,
																																							 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$request->nitips);
		oci_bind_by_name($consulta,':v_pfecha_inicial',$fechai);
		oci_bind_by_name($consulta,':v_pfecha_final',$fechaf);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function adjunto(){
		require_once('../../config/dbcon.php');
		require_once('../../config/ftpcon.php');
		include('../../upload_file/subir_archivo.php');
		global $request;
		// variables de parametros
		// otras variables
		$hoy = date('dmY');
		$path = '/cargue_ftp/Digitalizacion/Genesis/Siau/CodigoUrgencia/' . $hoy . '/';
		$name = $request->nombre;
		$subio = subirFTP($request->achivobase, $path, $name, $request->ext);
		$rutas = $subio;
		echo $rutas;
	}
?>
