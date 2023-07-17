<?php
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	 $request = json_decode($postdata);
	 $numeroinv = $request->numero;
	 $ubicacion = $request->ubi;
	 $cedula = $request->cedula;
	 $documento = $request->doc;
	 $documentoapp = $request->documento;
	 $concepto = $request->concepto;
	 $existencia = $request->existencia;
	 $estadocod = $request->estadocod;
	 $obligatorio = $request->obligatorio;
	 $obs = $request->obs;
	 $pregunta = $request->pregunta;
	 $estado = $request->estado;
	 $existencianombre = $request->existencianombre;
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_INSERTAR_INVENTARIO_DETALLE(:v_pdocumento,:v_pubicacion,:v_pnumero,:v_pcedula,:v_pdocumentoapp,
	                                        																		:v_pconcepto,:v_pexistencia,:v_pestadocod,:v_pobligatorio,:v_pobservacion,
	                                        																		:v_ppregunta,:v_pestado,:v_pexistencianombre,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  oci_bind_by_name($consulta,':v_pnumero',$numeroinv);
  oci_bind_by_name($consulta,':v_pcedula',$cedula);
	oci_bind_by_name($consulta,':v_pdocumentoapp',$documentoapp);
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
	oci_bind_by_name($consulta,':v_pexistencia',$existencia);
	oci_bind_by_name($consulta,':v_pestadocod',$estadocod);
	oci_bind_by_name($consulta,':v_pobligatorio',$obligatorio);
	oci_bind_by_name($consulta,':v_pobservacion',$obs);
	oci_bind_by_name($consulta,':v_ppregunta',$pregunta);
	oci_bind_by_name($consulta,':v_pestado',$estado);
	oci_bind_by_name($consulta,':v_pexistencianombre',$existencianombre);

	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $respuesta;
	oci_close($c);
?>
