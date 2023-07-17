<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenerproyectos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$estado = $request->estado;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_PROYECTOS(:v_pestado,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pestado',$estado);
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

	function obtenerproyectoseliminar(){
			require_once('../../config/dbcon_prod.php');
			global $request;
			$estado = $request->estado;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_PROYECTOS_ESTADOS(:v_pestado,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pestado',$estado);
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
	function obtenerareas(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$tipo = $request->tipo;
		$cod = $request->cod;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_SELECTS(:v_pcod,:v_ptipo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcod',$cod);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
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
	function obtenerconteo(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_CANTIDAD_ESTADO(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo '['.$json.']';
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function obtenerfases(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_FASES(:v_pid,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pid',$id);
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

	
	//Nuevo
	function p_obtener_tipop(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_tipop(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function p_obtener_area(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		// $id = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_area(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function p_obtener_recurso(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_recurso(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	
	function p_obtener_rol(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_rol(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function p_obtener_estado(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_estado(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	function p_obtener_proceso(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_proceso(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	
	function p_listar_proyecto(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_listar_proyecto(:v_pjson_row_out); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function p_obtener_proyecto(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_proyecto(:v_pcodigo,:v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function p_obtener_motivo(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_motivo(:v_pproceso,:v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pproceso',$request->proceso);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
		
	function p_obtener_fases(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_fases(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

		function p_obtener_kpi(){
		require_once('../../config/dbcon_prod.php');
		global $request;		
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PROYECTOS.p_obtener_kpi(:v_pjson_row); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
?>
