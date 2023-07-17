<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$empresa = '1' ;
	$documento = $_GET['documento'];
	$sexo = $_GET['sexo'];
	$producto = $_GET['producto'];
	$nombreproducto = $_GET['nombreproducto'];
	$factura = $_GET['factura'];
	$proveedor = $_GET['proveedor'];
	$recibo = $_GET['recibo'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin pq_suficiencia.p_valida_procedimiento(:v_pempresa,:v_pdocumento,:v_psexo,:v_producto,:v_pnombre_producto,:v_pfactura,:v_pproveedor,:v_precibo,:v_mensaje); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_psexo',$sexo);
	oci_bind_by_name($consulta,':v_producto',$producto);
	oci_bind_by_name($consulta,':v_pnombre_producto',$nombreproducto);
	oci_bind_by_name($consulta,':v_pfactura',$factura);
	oci_bind_by_name($consulta,':v_pproveedor',$proveedor);
	oci_bind_by_name($consulta,':v_precibo',$recibo);
	oci_bind_by_name($consulta,':v_mensaje',$mensaje,200);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	echo $mensaje;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>