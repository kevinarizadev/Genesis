<?php
		require_once('../../config/dbcon_prod.php');
		$type = $_GET['type'];
		$num = $_GET['id'];

		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtiene_empresa (:v_tipo_documento,:v_documento,:v_json_empresa,:v_json_archivos,:v_json_asesores,:v_json_sedes,:v_json_novedades); end;');
		oci_bind_by_name($consulta,':v_tipo_documento',$type);
		oci_bind_by_name($consulta,':v_documento',$num);
		$clob1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_empresa', $clob1,-1,OCI_B_CLOB);
		$clob2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_archivos', $clob2,-1,OCI_B_CLOB);
		$clob3 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_asesores', $clob3,-1,OCI_B_CLOB);
		$clob4 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_sedes', $clob4,-1,OCI_B_CLOB);
		$clob5 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_novedades', $clob5,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json1 = $clob1->read($clob1->size());
		$json2 = $clob2->read($clob2->size());
		$json3 = $clob3->read($clob3->size());
		$json4 = $clob4->read($clob4->size());
		$json5 = $clob5->read($clob5->size());
		$var = '{"info_empresa":'.$json1.',"lista_archivos":'.$json2.',"lista_responsables":'.$json3.',"lista_sucursales":'.$json4.',"lista_novedades":'.$json5.'}';
		echo($var);
		oci_close($c);
?>