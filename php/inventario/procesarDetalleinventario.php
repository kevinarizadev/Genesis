<?php
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	 $request = json_decode($postdata);
	 $numeroinv = $request->numero;
	 $ubicacion = $request->ubi;
	 $documento = $request->doc;

	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_PROCESA_INVENTARIO_DETALLE(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pnumero',$numeroinv);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);

	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $respuesta;
	oci_close($c);
?>
