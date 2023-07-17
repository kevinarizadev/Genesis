<?php
	header("Content-Type: text/html;charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: text/xml');
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();
	
	function record_token(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESAPP_APP.p_record_token(:v_tipo_user,:v_id,:v_token,:v_prespuesta); end;');
        oci_bind_by_name($consulta,':v_tipo_user',$request->tipo_user);
        oci_bind_by_name($consulta,':v_id',$request->id);
        oci_bind_by_name($consulta,':v_token',$request->token);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
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