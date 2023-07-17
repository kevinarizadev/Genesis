<?php
	require_once('../../config/dbcon_prod.php');
		global $request;
	    $consulta = oci_parse($c,'begin PQ_GENESIS_CH.P_OBTENER_CERTGLOSA(:v_pnumero,:v_pubicacion,:v_json_row); end;');
	  	oci_bind_by_name($consulta,':v_pnumero',$_GET["numerocenso"]);
	  	oci_bind_by_name($consulta,':v_pubicacion',$_GET["ubicacion"]);
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
?>