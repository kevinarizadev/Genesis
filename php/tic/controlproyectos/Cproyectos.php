<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function p_inserta_proyecto() {
		require_once('../../config/dbcon_prod.php');
		require_once('../../upload_file/subir_archivo.php');
		global $request;
		$proyecto = '['.$request->proyecto.']';
		$json_data = json_decode($request->proyecto);
	
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PROYECTOS.p_inserta_proyecto(:v_pjson_row_in,:v_pjson_row_out); end;');
		$jsonin = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
		$jsonin->writeTemporary($proyecto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		$bd_response = $clob->read($clob->size());
		$json_bd_response = json_decode($bd_response);	
			echo $bd_response;
	
		oci_close($c);
	}


