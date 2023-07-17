<?php
	require_once('../../config/dbcon.php');
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_HELISOFT.p_listar_registro_afi(:v_fecha,
                                                                              :v_codigo,
                                                                              :v_proceso,
                                                                              :v_json_res); end;');
    oci_bind_by_name($consulta,':v_fecha',$_GET["fecha"]);
    oci_bind_by_name($consulta,':v_codigo',$_GET["codigo_asesor"]);
    oci_bind_by_name($consulta,':v_proceso',$_GET["tipo_proceso"]);
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
?>