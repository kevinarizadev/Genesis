<?php
	require_once('../../config/dbcon_prod.php');
	$empresa = 1;
	$documento = "EC";
	$type = $_GET['type'];
	$num = $_GET['id'];
	$novedad = "CFW";
	$fecha = date('d/m/Y');
	$data = "";
	$carne = "S";
	$motivo = "3";
	$consulta = oci_parse($c,'begin p_ins_novedad_sal_con(:v_pempresa,:v_pdocumento,:v_ptipo_doc_afiliado,:v_pafiliado,:v_pnovedad,:v_pfecha,
																			:v_pcampo1_nuevo,:v_pcampo2_nuevo,:v_pcampo3_nuevo,:v_pcampo4_nuevo,:v_pcampo5_nuevo,
																			:v_pcampo6_nuevo,:v_pcampo7_nuevo,:v_pmotivo); end;');
	oci_bind_by_name($consulta,':v_pempresa',$empresa);
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$type);
	oci_bind_by_name($consulta,':v_pafiliado',$num);
	oci_bind_by_name($consulta,':v_pnovedad',$novedad);
	oci_bind_by_name($consulta,':v_pfecha',$fecha);
	oci_bind_by_name($consulta,':v_pcampo1_nuevo',$data);
	oci_bind_by_name($consulta,':v_pcampo2_nuevo',$carne);
	oci_bind_by_name($consulta,':v_pcampo3_nuevo',$data);
	oci_bind_by_name($consulta,':v_pcampo4_nuevo',$data);
	oci_bind_by_name($consulta,':v_pcampo5_nuevo',$data);
	oci_bind_by_name($consulta,':v_pcampo6_nuevo',$data);
	oci_bind_by_name($consulta,':v_pcampo7_nuevo',$data);
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
	$res = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $res;
	oci_close($c);
?>