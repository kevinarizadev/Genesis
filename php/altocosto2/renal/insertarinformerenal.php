<?php
	require_once('../../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	 $request = json_decode($postdata);
	 $json = $request->json;
	 $area = $request->area;
	$consulta = oci_parse($c,'begin PQ_GENESIS_CAC.P_INSERTA_CAC_ERC(:v_pjson,:v_parea,:v_prespuesta,:v_json_row,:v_pvalidacion); end;');

  oci_bind_by_name($consulta,':v_pjson',$json);
	oci_bind_by_name($consulta,':v_parea',$area);
	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);
	oci_bind_by_name($consulta,':v_pvalidacion',$validacion,50);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json2 = $clob->read($clob->size());
		echo '['.$json2.',{ "respuesta":'.$respuesta.'},{ "validacion":'.$validacion.'}]';
	}else{
		$num = 0;
		echo '[{"dato":'.$num.'},{ "respuesta":'.$respuesta.'},{ "validacion":'.$validacion.'}]';
	}

	oci_close($c);
?>
