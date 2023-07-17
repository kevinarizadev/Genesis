<?php
	
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function obtener_dato_aut_afiliados(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin PQ_GENESIS_TIC.cantidad_total(:v_pcantidad); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pcantidad', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function obtener_dato_aut_afiliados_por_fechas(){
		require_once('../../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_rechazadas(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
		oci_bind_by_name($consulta,':p_vfechaini',$request->fecha_inicio);
		oci_bind_by_name($consulta,':p_vfechafin',$request->fecha_fin);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	function obtener_dato_aut_afiliados_por_fechas_autorizadas(){
		require_once('../../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_procesadas(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
		oci_bind_by_name($consulta,':p_vfechaini',$request->fecha_inicio);
		oci_bind_by_name($consulta,':p_vfechafin',$request->fecha_fin);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	function obtener_dato_aut_afiliados_por_fechas_sin_autorizacion(){
		require_once('../../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.g_no_req_aut(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
		oci_bind_by_name($consulta,':p_vfechaini',$request->fecha_inicio);
		oci_bind_by_name($consulta,':p_vfechafin',$request->fecha_fin);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	function obtener_dato_aut_afiliados_por_fechas_por_gestionar(){
		require_once('../../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.cantidad_pendiente(:p_vfechaini,:p_vfechafin,:v_pcantidad); end;');
		oci_bind_by_name($consulta,':p_vfechaini',$request->fecha_inicio);
		oci_bind_by_name($consulta,':p_vfechafin',$request->fecha_fin);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pcantidad', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	function obtener_dato_aut_afiliados_por_fechas_Gestionadas(){
		require_once('../../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_total(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
		oci_bind_by_name($consulta,':p_vfechaini',$request->fecha_inicio);
		oci_bind_by_name($consulta,':p_vfechafin',$request->fecha_fin);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
