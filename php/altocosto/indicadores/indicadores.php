<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenerindicadores(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$year = $request->year;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC.P_OBTENER_INDICADORES(:v_pyearreporte,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pyearreporte', $year);

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
	function obteneryear(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC.P_OBTENER_YEARS_VIGENTES(:v_json_row); end;');

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
?>
