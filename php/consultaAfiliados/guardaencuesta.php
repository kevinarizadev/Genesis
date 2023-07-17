<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$empresa = 1;
	$anno = date("Y");
	$mes = date("m");
	$tipo = $_GET['tipo'];
	$numero = $_GET['numero'];
	$formato = "2";
	$renglon = $_GET['renglon'];
	$descripcion = $_GET['desc'];
	$res = $_GET['res'];
	$respuesta1 = "N";
	$respuesta2 = "N";
	$respuesta3 = "N";
	$respuesta4 = "N";
	$respuesta5 = "N";
	if ($res == "E") {
		$respuesta1 = "S";
	}else if ($res == "B") {
		$respuesta2 = "S";
	}else if ($res == "A") {
		$respuesta3 = "S";
	}else if ($res == "M") {
		$respuesta4 = "S";
	}else if ($res == "N") {
		$respuesta5 = "S";
	}
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'INSERT INTO EAED_ENCUESTA_SAT_DETALLE(AEDN_EMPRESA,AEDN_ANNO,AEDN_PERIODO,AEDC_TIPO_DOCUMENTO,AEDC_AFILIADO,AEDN_FORMATO,
                                      AEDN_RENGLON,AEDC_DESCRIPCION,AEDC_TIPO_1,AEDC_TIPO_2,AEDC_TIPO_3,AEDC_TIPO_4,AEDC_TIPO_5)

							VALUES (:empresa,:anno,:mes, :tipo, :numero, :formato, :renglon, :descripcion, :respuesta1, :respuesta2, :respuesta3, :respuesta4, :respuesta5)');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':empresa',$empresa);
	oci_bind_by_name($consulta,':anno',$anno);
	oci_bind_by_name($consulta,':mes',$mes);
	oci_bind_by_name($consulta,':tipo',$tipo);
	oci_bind_by_name($consulta,':numero',$numero);
	oci_bind_by_name($consulta,':formato',$formato);
	oci_bind_by_name($consulta,':renglon',$renglon);
	oci_bind_by_name($consulta,':descripcion',$descripcion);
	oci_bind_by_name($consulta,':respuesta1',$respuesta1);
	oci_bind_by_name($consulta,':respuesta2',$respuesta2);
	oci_bind_by_name($consulta,':respuesta3',$respuesta3);
	oci_bind_by_name($consulta,':respuesta4',$respuesta4);
	oci_bind_by_name($consulta,':respuesta5',$respuesta5);
	// Ejecutamos la consulta
	$res = oci_execute($consulta);
	echo $res;
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>