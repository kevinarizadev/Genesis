<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenerinventario(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$doc= $request->doc;
		$per= $request->per;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_IV.P_OBTENER_INVENTARIO_CONS(:v_pid,:v_pper,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pid',$doc);
		oci_bind_by_name($consulta,':v_pper',$per);
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
	function obtenerperiodos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_IV.P_OBTENER_PERIODOS(:v_json_row); end;');
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
?>
