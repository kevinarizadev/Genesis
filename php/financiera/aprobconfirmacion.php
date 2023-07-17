<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtenerpendientes(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_mostrar_pendientes_aprob(:v_json_row); end;');
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

	function aprobarpendientes(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consecutivo = $request->consecutivo;
		$aprobar = $request->aprobar;
		$consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_aprobar_pendientes(:v_pconsecutivo, :v_aprobado, :v_psalida); end;');
		oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
		oci_bind_by_name($consulta,':v_aprobado',$aprobar);
		oci_bind_by_name($consulta, ':v_psalida', $respuesta,1);
		oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}

	function aprobartodaspendientes(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$aprobar = $request->aprobar;
		$consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_aprobar_todas_pendientes(:v_aprobado, :v_psalida); end;');
		oci_bind_by_name($consulta,':v_aprobado',$aprobar);
		oci_bind_by_name($consulta, ':v_psalida', $respuesta,1);
		oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}


?>
