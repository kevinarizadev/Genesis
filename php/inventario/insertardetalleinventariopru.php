<?php
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	 $request = json_decode($postdata);
	 $empresa = $request->empresa;
	 $numeroinv = $request->numeroinv;
	 $ubicacion = $request->ubicacion;
	 $cedula = $request->cedula;
	 $json = $request->json;
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV_P.P_INSERTAR_INVENTARIO_DETOP(:v_pempresa,:v_pubicacion,:v_pnumero,:v_pcedula,:v_pjson,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  oci_bind_by_name($consulta,':v_pnumero',$numeroinv);
  oci_bind_by_name($consulta,':v_pcedula',$cedula);
  oci_bind_by_name($consulta,':v_pjson',$json);
	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	oci_close($c);
?>
