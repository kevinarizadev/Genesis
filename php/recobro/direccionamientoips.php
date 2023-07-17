<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//    PROCEDURE P_OBTENER_DIRECCIONAMIENTOS (v_tipodoc in varchar2, v_doc in varchar2, v_responsable in varchar2, v_json_row      out clob);
function consultadireccionamiento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_OBTENER_DIRECCIONAMIENTOS (:v_tipodoc, :v_doc, :v_responsable, :v_json_row); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	
	oci_bind_by_name($consulta,':v_tipodoc',$request->tipodoc);
	oci_bind_by_name($consulta,':v_doc',$request->doc);
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	
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
