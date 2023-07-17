<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function listarAreas(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$sede = $request->sede;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_AREAS(:v_psede,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_psede',$sede);
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
	function listarSedes(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_SEDES(:v_json_row); end;');
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
	function listarLugares(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_LUGAR(:v_json_row); end;');
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
	function listarAsistentes(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_ASISTENTES(:v_psede,:v_parea,:v_pcantidad,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_parea',$request->area);
		oci_bind_by_name($consulta,':v_psede',$request->sede);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad,50);
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
	function listarAsistentesInd(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_ASISTENTES_IND(:v_json_row); end;');
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
	
	function listarObjetivosEstrategicos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_OBJETIVO_ESTRATEGICO(:v_json_row); end;');
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
	function listarTipoActividad(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_TIPO_ACTIVIDAD(:v_json_row); end;');
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
	function listarObjetivoActividad(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_OBJETIVO_ACTIVIDAD(:v_pactividad,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pactividad',$request->actividad);
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
	function listarResumen(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		$ubicacion = $request->ubicacion;
		$paginacion = $request->paginacion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_RESUMEN(:v_pnumero,:v_pubicacion,:v_ppaginacion,:v_respuesta,:v_respuesta2); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		oci_bind_by_name($consulta,':v_ppaginacion',$paginacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		$clob2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta2', $clob2,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob) && isset($clob2)) {
		//if (isset($clob)) {
			$json = $clob->read($clob->size());
			$json2 = $clob2->read($clob2->size());
			echo '{"info":['.$json.','.$json2.']}';
			//echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function listarAgenda(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PC.P_OBTENER_AGENDA(:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
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
