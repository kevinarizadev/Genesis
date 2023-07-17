<?php
	require_once('../config/dbcon_prod.php');// Recibimos los parametros enviados desde servicio de consulta
	$factura = $_GET['factura'];
	$proveedor = $_GET['proveedor'];
	$recibo = $_GET['recibo'];
	$documento = $_GET['documento'];
	$usu = $_SESSION['usu'];
	$comodin = 'REVISION';
	$consulta = oci_parse($c,'update r_traza_rips_20162_facdn set diagnostico_homologado = :v_pcomodin
							  where fcdc_factura = :v_pfactura
							  and fcdv_proveedor = :v_pproveedor
							  and fcdn_recibo = :v_precibo
							  and afic_documento = :v_pdocumento');
	oci_bind_by_name($consulta,':v_pcomodin',$comodin);
	oci_bind_by_name($consulta,':v_pfactura',$factura);
	oci_bind_by_name($consulta,':v_pproveedor',$proveedor);
	oci_bind_by_name($consulta,':v_precibo',$recibo);
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (!$result) {
	  	echo oci_error();   
	}else{
		echo $result;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>