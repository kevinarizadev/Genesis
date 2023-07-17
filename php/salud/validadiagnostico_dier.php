<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$empresa = 1;
	$documento = $_GET['documento'];
	$edad = $_GET['edad'];
	$sexo = $_GET['sexo'];
	$diagnostico = $_GET['diagnostico'];
	$factura = $_GET['factura'];
	$proveedor = $_GET['proveedor'];
	$recibo = $_GET['recibo'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin PQ_SUFICIENCIA.P_VALIDA_DIAGNOSTICO2(:v_pempresa,:v_pdocumento,:v_pedad,:v_psexo,:v_pdiagnostico,
																		:v_pfactura,:v_pproveedor,:v_precibo,:v_mensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pedad',$edad);
	oci_bind_by_name($consulta,':v_psexo',$sexo);
	oci_bind_by_name($consulta,':v_pdiagnostico',$diagnostico);
	oci_bind_by_name($consulta,':v_pfactura',$factura);
	oci_bind_by_name($consulta,':v_pproveedor',$proveedor);
	oci_bind_by_name($consulta,':v_precibo',$recibo);
	oci_bind_by_name($consulta,':v_mensaje',$respuesta,200);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	// Devolvemos los resultados en formato JSON
	if ($respuesta == "1") {
		echo "1";
	}else{
		echo $respuesta;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>