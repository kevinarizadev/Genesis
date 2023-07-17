<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function ObtenerAcasXUsuarioyCantidad(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ASEG.P_OBTENER_DPTO_ASEGURAMIENTO(:v_json_row); end;');
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
function obtenerAcasXPersona(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$estado = $request->estado;
	$cedula = $request->cedula;	
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG.P_OBTENER_OBTENERACASXPERSONA(:estado,:cedula,:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	 oci_bind_by_name($consulta,':estado',$estado);
	 oci_bind_by_name($consulta,':cedula',$cedula);
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
function obtenerAcasDetalleXticket(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$ticket = $request->ticket;
	$ubicacion = $request->ubicacion;
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG.P_OBTENER_OBTENERACASDETALLESXTICKET(:ticket,:ubicacion,:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':ticket',$ticket);
	oci_bind_by_name($consulta,':ubicacion',$ubicacion);
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
function obtenerAcas(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$keyword = $request->keyword;
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG.P_OBTENER_BUSCARACAS(:keyword,:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':keyword',$keyword);
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