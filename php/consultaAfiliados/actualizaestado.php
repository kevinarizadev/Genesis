<?php
	require_once('../config/dbcon_prod.php');
	$ruta = $_GET['ruta'];
	$observacion = $_GET['observacion'];
	$nuevo = $_GET['nuevo'];
	$responsable = $_SESSION["cedula"];
	$consulta = oci_parse($c,'UPDATE esdc_soporte_doc SET sdcc_estado=:nuevo , sdcc_observaciones=:observacion, SDCV_RESPONSABLE_REVISION=:responsable
							WHERE sdcc_ruta = :ruta ');
	oci_bind_by_name($consulta,':ruta',$ruta);
	oci_bind_by_name($consulta,':observacion',$observacion);
	oci_bind_by_name($consulta,':nuevo',$nuevo);
	oci_bind_by_name($consulta,':responsable',$responsable);

	$result = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (!$result) {
	  	echo oci_error();   
	}else{
		echo $result;
		$mod = "gnss";
		$empresa = 1;
		$des = 'Cambio de estado para anexo del afiliado ';
		$audit = oci_parse($c,'begin p_audit(:v_pempresa,:v_pproceso,:v_pdescripcion); end;');
		oci_bind_by_name($audit,':v_pempresa',$empresa);
		oci_bind_by_name($audit,':v_pproceso',$mod);
		oci_bind_by_name($audit,':v_pdescripcion',$des);
		@oci_execute($audit,OCI_COMMIT_ON_SUCCESS);
	}
	oci_close($c);
?>