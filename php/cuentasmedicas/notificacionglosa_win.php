<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function ObtenerInformeNotificacionGlosaWin()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_obtener_glosas_win(:v_pnumero,:v_pubicacion,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'NOMBRE_IPS' => $row['NOMBRE_IPS'],
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NUMERO' => $row['NUMERO'],
				'UBICACION' => $row['UBICACION'],
				'RENGLON' => $row['RENGLON'],
				'FACTURA' => $row['FACTURA'],
				'RECIBO' => $row['RECIBO'],
				// 'ESTADO' => $row['ESTADO'],
				// 'FECHA' => $row['FECHA'],
				// 'NUM_FACTURA' => $row['NUM_FACTURA'],
				'OBSERVACION' => $row['DETALLE_GLOSA'],
				'VALOR_FACTURA' => $row['TOTAL_FACTURA'],
				'VALOR_GLOSADO' => $row['TOTAL_GLOSA'],
				'CODIGO_GLOSA' => $row['COD_GLOSA'],
				'CODIGO_PRODUCTO' => $row['PRODUCTO'],
				'PRODUCTO' => $row['NOMBRE_PRODUCTO'],
				'VALOR_GLOSA' => $row['TOTAL_GLOSA'],
				'TIPO_GLOSA' => $row['DECRIPCION_GLOSA']
				// 'VALOR_GLOSADO' => $row['TOTAL_GLOSA']
			));
		}
		echo json_encode($array);
	}else{
		echo json_encode($json);
	}
	oci_free_statement($consulta);
	oci_free_statement($curs);
	oci_close($c);
}

function p_obtener_glosas_win()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pstatus = $request->v_pstatus;
	$v_cedula = $request->v_cedula;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_glosa_win(:v_pstatus,
																		:v_cedula,
																		:v_json_out,
																		:v_result); end;');
	oci_bind_by_name($consulta, ':v_pstatus', $v_pstatus);
	oci_bind_by_name($consulta, ':v_cedula', $v_cedula);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0
	) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'CONS' =>$row['CONS'],
				'EMPRESA' => $row['EMPRESA'],
				'EMPRESA' => $row['EMPRESA'],
				'DOCUMENTO' =>$row['DOCUMENTO'],
				'NUMERO' =>$row['NUMERO'],
				'UBICACION' =>$row['UBICACION'],
				'SECCIONAL' =>$row['SECCIONAL'],
				'FECHA' =>$row['FECHA'],
				'ESTADO' =>$row['ESTADO'],
				'ESTATUS_COD' =>$row['COD_STATUS'],
				'ESTATUS' => $row['STATUS'],
				'REGIMEN' =>$row['REGIMEN'],
				'NIT' =>$row['NIT'],
				'NOMBRE' =>$row['NOMBRE'],
				'RESPONSABLE' =>$row['RESPONSABLE'],
				'NOMBRE_RESPONSABLE' =>$row['NOMBRE_RESPONSABLE'],
				'NOTIFICACION' =>$row['NOTIFICACION'],
				'FECHA_ENTREGA' =>$row['FECHA_ENTREGA']
			));
		}
		echo json_encode($array);
	} else {
		echo json_encode($json);
	}
	oci_free_statement($consulta);
	oci_free_statement($curs);
	oci_close($c);
}

function p_u_descarga_notificacion()
 {
	// 	function: "p_u_descarga_notificacion"
	// v_pnumero: "7449"
	// v_presponsable: "1143163517"
	// v_pubicacion: "8001"
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero = $request->v_pnumero;
	$v_pubicacion = $request->v_pubicacion;
	$v_presponsable = $request->v_presponsable;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_u_descarga_notificacion(:v_pnumero,
																		:v_pubicacion,
																		:v_presponsable,
																		:v_json_out); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_presponsable', $v_presponsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);

}

function p_u_radica_notificacion()
{
// 	function: "p_u_radica_notificacion"
// v_padjunto: "/cargue_ftp/Digitalizacion/Genesis/Cuentasmedicas/Notificacionglosa/NACIONAL/NG-201-1..pdf"
// v_pfecha_rad_ips: "2020-07-01T05:00:00.000Z"
// v_pnumero: "201"
// v_presponsable: "1143163517"
// v_pubicacion: "1"
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero = $request->v_pnumero;
	$v_pubicacion = $request->v_pubicacion;
	$v_presponsable = $request->v_presponsable;
	$v_padjunto = $request->v_padjunto;
	$v_pfecha_rad_ips =date('d/m/Y', strtotime($request->v_pfecha_rad_ips));
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_u_radica_notificacion(	:v_pnumero,
																				:v_pubicacion,
																				:v_presponsable,
																				:v_padjunto,
																				:v_pfecha_rad_ips,
																				:v_json_out); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_presponsable', $v_presponsable);
	oci_bind_by_name($consulta, ':v_padjunto', $v_padjunto);
	oci_bind_by_name($consulta, ':v_pfecha_rad_ips', $v_pfecha_rad_ips);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function subir_adjuntos()
{
	require_once('../config/dbcon.php');
	require_once('../config/ftpcon.php');
	include('../movilidad/subir_archivo.php');
	global $request;
	// variables de parametros
	$seccional =	$request->seccional;
	$hoy = date('Ymd');
	$path = 'Cuentasmedicas/Notificacionglosa/'. $seccional.'/'.$hoy;
	// $path = '/cargue_ftp/Digitalizacion/Genesis/Cuentasmedicas/Notificacionglosa/'. $seccional.'/';
	// $subio = subirFTP($archivo_base, $path, $name, $ext);
	$name =	$request->nombre.'.'.$request->ext;
  list(, $request->archivo_base) = explode(';', $request->archivo_base); // Proceso para traer el Base64
  list(, $request->archivo_base) = explode(',', $request->archivo_base); // Proceso para traer el Base64
  $base64 = base64_decode($request->archivo_base); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  include('../sftp_cloud/UploadFile.php');
  $subio = UploadFile($path, $name);

	echo $subio;
}
