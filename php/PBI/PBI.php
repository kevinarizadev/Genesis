<?php

	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();


function inserta_auditoria(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin PQ_GENESIS_TIC.p_log_acceso_modelosbi(:v_presponsable, :v_pmdodelo);
  end;
  
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
	oci_bind_by_name($consulta,':v_pmdodelo',$request->modelo);
		

	oci_execute($consulta,OCI_DEFAULT);
	
	oci_close($c);
}
	
?>