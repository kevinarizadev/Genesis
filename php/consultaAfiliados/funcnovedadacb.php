<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function cargaDepartamentos(){
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c,"select case when length(b.ubgn_ubicacion)=5 then substr(b.ubgn_ubicacion,1,2) else substr(b.ubgn_ubicacion,1,1) end codigo,b.ubgc_nombre nombre
		from bubg_ubicacion_geografica b
		where ubgn_nivel = 2
		and ubgn_ubicacion <> 0 
		order by 2");
	oci_execute($consulta);	
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function Municipios(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,"select ubgn_codigo codigo,ubgc_nombre nombre from bubg_ubicacion_geografica where ubgn_nivel = 3 and case when length(ubgn_ubicacion)=5 then substr(ubgn_ubicacion,1,2) else substr(ubgn_ubicacion,1,1) end = :departamento order by 2");
	oci_bind_by_name($consulta,':departamento',$request->depa);
	oci_execute($consulta);	
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
	$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function cargaMunicipios(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,"select ubgn_codigo codigo,ubgc_nombre nombre from bubg_ubicacion_geografica where ubgn_nivel = 3 and case when length(ubgn_ubicacion)=5 then substr(ubgn_ubicacion,1,2) else substr(ubgn_ubicacion,1,1) end = :departamento order by 2");
	oci_bind_by_name($consulta,':departamento',$request->depa);
	oci_execute($consulta);	
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
	$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}



	        //funciones nuevo
function actualizar_pass(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_actualiza_password (:v_documento,:v_clave,:v_res); end;');
	oci_bind_by_name($consulta,':v_documento',$request->v_nit);
	oci_bind_by_name($consulta,':v_clave',$request->v_password);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function contratoAsignamiento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_ca.p_contrato_asignamiento (:v_documento,:v_res); end;');
	oci_bind_by_name($consulta,':v_documento',$request->v_doc);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}






?>