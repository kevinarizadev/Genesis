<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

function cosmayudaaut(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$annos          = $request->annos;
	$periodo          = $request->periodo;


	$consulta = oci_parse($c,"SELECT * FROM view_repor_mesa_ayu_aut
																	WHERE TO_NUMBER(TO_CHAR(DIA,'MM')) = :periodo
																	AND TO_NUMBER(TO_CHAR(DIA,'YYYY'))= :anno
																	ORDER BY TO_DATE(DIA,'DD/MM/YYYY') DESC");

	oci_bind_by_name($consulta,':anno',$annos);
	oci_bind_by_name($consulta,':periodo',$periodo);


	oci_execute($consulta);


	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
	$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function p_lista_actividad_pyp()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'begin PQ_GENESIS_REP_INTERNOS.p_lista_actividad_pyp(   :v_pnit,
																						:v_pinicial,
																						:v_pfinal,
																						:v_json_out); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
	oci_bind_by_name($consulta, ':v_pinicial', $request->fecha_inicio);
	oci_bind_by_name($consulta, ':v_pfinal', $request->fecha_final);
	oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


?>
