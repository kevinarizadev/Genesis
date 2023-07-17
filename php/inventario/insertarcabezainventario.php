<?php
	require_once('../config/dbcon_prod.php');
	$postdata = file_get_contents("php://input");
	 $request = json_decode($postdata);
	 $empresa = $request->empresa;
	 $ubicacion = $request->ubicacion;
	 $cinventario = $request->cinventario;
	 $codPeriodo = $request->codPeriodo;
	 $cedula = $request->cedula;
	 $json = $request->json;
	 $ruta = $request->ruta;
	 $ubicacion_sol = $request->ubisol;
	$consulta = oci_parse($c,'begin PQ_GENESIS_IV.P_INSERTAR_INVENTARIO_CABEZA(:v_pempresa,:v_pubicacion,:v_pdocumento,:v_pcodigoperiodo,:v_pcedresponsable,:V_ubicacion_sol,:v_pjson,:v_pruta,:v_prespuesta); end;');

	oci_bind_by_name($consulta,':v_pempresa',$empresa);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  oci_bind_by_name($consulta,':v_pdocumento',$cinventario);
  oci_bind_by_name($consulta,':v_pcodigoperiodo',$codPeriodo);
  oci_bind_by_name($consulta,':v_pcedresponsable',$cedula);
	oci_bind_by_name($consulta,':V_ubicacion_sol',$ubicacion_sol);
	oci_bind_by_name($consulta,':v_pjson',$json);
	oci_bind_by_name($consulta,':v_pruta',$ruta);

  oci_bind_by_name($consulta,':v_prespuesta',$respuesta,50);

	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>
