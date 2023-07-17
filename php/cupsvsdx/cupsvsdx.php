<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function p_lista_productos (){
    require_once('../config/dbcon.php');
    global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis_prod.p_lista_cups(:v_pcodigo,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo', $request->codigo);
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

function p_lista_dx (){
    require_once('../config/dbcon.php');
    global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis_prod.p_lista_dx(:v_codigo_cups,:v_pcodigo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_codigo_cups', $request->cups);
        oci_bind_by_name($consulta,':v_pcodigo', $request->codigo);
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
function p_inserta_cups (){
    require_once('../config/dbcon.php');
    global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis_prod.P_INSERTA_CUPS(:v_codigo_cups ,:v_codigo_dx, :v_responsable,:v_json_out); end;');  
	    oci_bind_by_name($consulta,':v_codigo_cups', $request->cod_cups);
	    oci_bind_by_name($consulta,':v_codigo_dx', $request->cod_dx);
	    oci_bind_by_name($consulta,':v_responsable',$request->responsable);    	
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	
  
}
function p_valida_cups (){
    require_once('../config/dbcon.php');
    global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis_prod.P_VALIDA_CUPS(:v_codigo_cups, :v_json_res); end;');  
	    oci_bind_by_name($consulta,':v_codigo_cups', $request->cod_cups);
	    
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
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
