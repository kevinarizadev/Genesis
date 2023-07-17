<?php
// Se abre la conexion a la base de datos 
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="TRAZABILIDAD_FACTURA.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$dpto = $_GET['dpto']; //08
		$mun = $_GET['mun']; //2017
		$fecha_inicio = $_GET['fecha_inicio']; 
		$fecha_final = $_GET['fecha_final']; 
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT documento_fs,  numero_fs,  ubicacion_fs,  concepto_fs,  renglon,  radicacion_fs,  contabilizacion_fecha_fs,  fecha_factura_fs,  
    fecha_pss,  afin_ubicacion_geografica,  facv_tercero,  t.terc_nombre,  t.tern_ubicacion_geografica,  t.tern_nivel_autorizacion,  
    t.terc_publico,  prefijo_fs,  facc_factura,  sum(facv_total_factura),  sum(cuov_saldo_fs),  documento_fd,  numero_fd,  ubicacion_fd,  
    concepto_fd,  sum(facv_total_glosa),  radicacion_fd,  confirmacion_fd,  tipo_doc_afiliado,  doc_afiliado,  datos_afiliado,  numero_contrato,  
    cntc_concepto,  hauc_codigo_super,  documento_cr,  numero_cr,  
    ubicacion_cr,  concepto_cr,  sum(facv_total_pago),  facf_fecha_cr,  autn_autorizacion,  autf_fecha,  documento_fl,  numero_fl,  ubicacion_fl,  
    facf_fecha_fl,  sum(facv_total_levantamiento),  sum(cuov_saldo_fl),  documento_cr_fl,  numero_cr_fl,  ubicacion_cr_fl,  concepto_cr_fl,  
    sum(facv_total_pago_cr_fl),  facf_fecha_cr_fl 
    FROM r_traza_fact r
					    INNER JOIN bter_tercero t on (terv_codigo = facv_tercero)
					    INNER JOIN bubg_ubicacion_geografica ba on (ba.ubgn_codigo = afin_ubicacion_geografica)
					    INNER JOIN bubg_ubicacion_geografica bb on (ba.ubgn_pais||'000' = bb.ubgn_codigo)    
    WHERE radicacion_fs between :fecha_inicio AND :fecha_final
    AND bb.ubgn_codigo = :DPTO
    AND ((ba.ubgn_codigo = :MUN) or (0=:MUN))
    group by documento_fs,  numero_fs,  ubicacion_fs,  concepto_fs,  renglon,  radicacion_fs,  contabilizacion_fecha_fs,  fecha_factura_fs,  
    fecha_pss,  afin_ubicacion_geografica,  facv_tercero,  t.terc_nombre,  t.tern_ubicacion_geografica,  t.tern_nivel_autorizacion,  
    t.terc_publico,  prefijo_fs,  facc_factura, documento_fd,  numero_fd,  ubicacion_fd,  
    concepto_fd,  radicacion_fd,  confirmacion_fd,  tipo_doc_afiliado,  doc_afiliado,  datos_afiliado,  numero_contrato,  
    cntc_concepto,  hauc_codigo_super,  documento_cr,  numero_cr,  
    ubicacion_cr,  concepto_cr,  facf_fecha_cr,  autn_autorizacion,  autf_fecha,  documento_fl,  numero_fl,  ubicacion_fl,  
    facf_fecha_fl,  documento_cr_fl,  numero_cr_fl,  ubicacion_cr_fl,  concepto_cr_fl, facf_fecha_cr_fl	 "
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':DPTO',$dpto);
oci_bind_by_name($consulta,':MUN',$mun);
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_final',$fecha_final);



oci_execute($consulta);	
// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas
$row = array();
	echo 	'DOCUMENTO_FS'.'|'.
			'NUMERO_FS'.'|'.
			'UBICACION_FS'.'|'.
			'CONCEPTO_FS'.'|'.
			'RENGLON'.'|'.
			'RADICACION_FS'.'|'.
			'CONTABILIZACION_FECHA_FS'.'|'.
			'FECHA_FACTURA_FS'.'|'.
			'FECHA_PSS'.'|'.
			'AFIN_UBICACION_GEOGRAFICA'.'|'.
			'FACV_TERCERO'.'|'.
			'TERC_NOMBRE'.'|'.
			'TERN_UBICACION_GEOGRAFICA'.'|'.
			'TERN_NIVEL_AUTORIZACION'.'|'.
			'TERC_PUBLICO'.'|'.
			'PREFIJO_FS'.'|'.
			'FACC_FACTURA'.'|'.
			'SUM(FACV_TOTAL_FACTURA)'.'|'.
			'SUM(CUOV_SALDO_FS)'.'|'.
			'DOCUMENTO_FD'.'|'.
			'NUMERO_FD'.'|'.
			'UBICACION_FD'.'|'.
			'CONCEPTO_FD'.'|'.
			'SUM(FACV_TOTAL_GLOSA)'.'|'.
			'RADICACION_FD'.'|'.
			'CONFIRMACION_FD'.'|'.
			'TIPO_DOC_AFILIADO'.'|'.
			'DOC_AFILIADO'.'|'.
			'DATOS_AFILIADO'.'|'.
			'NUMERO_CONTRATO'.'|'.
			'CNTC_CONCEPTO'.'|'.
			'HAUC_CODIGO_SUPER'.'|'.
			'DOCUMENTO_CR'.'|'.
			'NUMERO_CR'.'|'.
			'UBICACION_CR'.'|'.
			'CONCEPTO_CR'.'|'.
			'SUM(FACV_TOTAL_PAGO)'.'|'.
			'FACF_FECHA_CR'.'|'.
			'AUTN_AUTORIZACION'.'|'.
			'AUTF_FECHA'.'|'.
			'DOCUMENTO_FL'.'|'.
			'NUMERO_FL'.'|'.
			'UBICACION_FL'.'|'.
			'FACF_FECHA_FL'.'|'.
			'SUM(FACV_TOTAL_LEVANTAMIENTO)'.'|'.
			'SUM(CUOV_SALDO_FL)'.'|'.
			'DOCUMENTO_CR_FL'.'|'.
			'NUMERO_CR_FL'.'|'.
			'UBICACION_CR_FL'.'|'.
			'CONCEPTO_CR_FL'.'|'.
			'SUM(FACV_TOTAL_PAGO_CR_FL)'.'|'.
			'FACF_FECHA_CR_FL';


echo "\n";
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) 
{
	echo 	$rows['DOCUMENTO_FS']. '|' .
			$rows['NUMERO_FS']. '|' .
			$rows['UBICACION_FS']. '|' .
			$rows['CONCEPTO_FS']. '|' .
			$rows['RENGLON']. '|' .
			$rows['RADICACION_FS']. '|' .
			$rows['CONTABILIZACION_FECHA_FS']. '|' .
			$rows['FECHA_FACTURA_FS']. '|' .
			$rows['FECHA_PSS']. '|' .
			$rows['AFIN_UBICACION_GEOGRAFICA']. '|' .
			$rows['FACV_TERCERO']. '|' .
			$rows['TERC_NOMBRE']. '|' .
			$rows['TERN_UBICACION_GEOGRAFICA']. '|' .
			$rows['TERN_NIVEL_AUTORIZACION']. '|' .
			$rows['TERC_PUBLICO']. '|' .
			$rows['PREFIJO_FS']. '|' .
			$rows['FACC_FACTURA']. '|' .
			$rows['SUM(FACV_TOTAL_FACTURA)']. '|' .
			$rows['SUM(CUOV_SALDO_FS)']. '|' .
			$rows['DOCUMENTO_FD']. '|' .
			$rows['NUMERO_FD']. '|' .
			$rows['UBICACION_FD']. '|' .
			$rows['CONCEPTO_FD']. '|' .
			$rows['SUM(FACV_TOTAL_GLOSA)']. '|' .
			$rows['RADICACION_FD']. '|' .
			$rows['CONFIRMACION_FD']. '|' .
			$rows['TIPO_DOC_AFILIADO']. '|' .
			$rows['DOC_AFILIADO']. '|' .
			$rows['DATOS_AFILIADO']. '|' .
			$rows['NUMERO_CONTRATO']. '|' .
			$rows['CNTC_CONCEPTO']. '|' .
			$rows['HAUC_CODIGO_SUPER']. '|' .
			$rows['DOCUMENTO_CR']. '|' .
			$rows['NUMERO_CR']. '|' .
			$rows['UBICACION_CR']. '|' .
			$rows['CONCEPTO_CR']. '|' .
			$rows['SUM(FACV_TOTAL_PAGO)']. '|' .
			$rows['FACF_FECHA_CR']. '|' .
			$rows['AUTN_AUTORIZACION']. '|' .
			$rows['AUTF_FECHA']. '|' .
			$rows['DOCUMENTO_FL']. '|' .
			$rows['NUMERO_FL']. '|' .
			$rows['UBICACION_FL']. '|' .
			$rows['FACF_FECHA_FL']. '|' .
			$rows['SUM(FACV_TOTAL_LEVANTAMIENTO)']. '|' .
			$rows['SUM(CUOV_SALDO_FL)']. '|' .
			$rows['DOCUMENTO_CR_FL']. '|' .
			$rows['NUMERO_CR_FL']. '|' .
			$rows['UBICACION_CR_FL']. '|' .
			$rows['CONCEPTO_CR_FL']. '|' .
			$rows['SUM(FACV_TOTAL_PAGO_CR_FL)']. '|' .
			$rows['FACF_FECHA_CR_FL']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>