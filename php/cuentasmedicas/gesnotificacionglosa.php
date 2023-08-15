<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}


function obtenerCargues()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_notificacion_glosa_eps(:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NUMERO' => $row['NUMERO'],
				'UBICACION' => $row['UBICACION'],
				'FECHA' => $row['FECHA'],
				'ESTADO' => $row['ESTADO'],
				'ESTADO_NOTIFICACION' => $row['ESTADO_NOTIFICACION'],
				'COD_STATUS' => $row['COD_STATUS'],
				'REGIMEN' => $row['REGIMEN'],
				'NIT' => $row['NIT'],
				'NOMBRE' => $row['NOMBRE'],
				'RESPONSABLE' => $row['RESPONSABLE'],
				'NOTIFICACION' => $row['NOTIFICACION'],
				'FECHA_ENTREGA' => $row['FECHA_ENTREGA'],
				'GENESIS' => $row['GENESIS'],
				'DESCARGA' => $row['DESCARGA']
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

function DescargarNotificacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = '';
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_u_descarga_glosa(:v_pnumero,:v_pubicacion,:v_presponsable,:v_json_out); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

function Obtener_Cantidad_Glosas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_obtener_cantidad_glosas(:v_porigen,:v_pnit,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_porigen', $request->origen);
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'CODIGO' => $row['CODIGO'],
				'NOMBRE' => $row['DESCRIPCION'],
				'CANTIDAD' => $row['CANTIDAD']
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

function Obtener_Glosas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$Num='';
	$Ubi='';
	$F_Inicio='';
	$F_Fin='';
	$Nit='';
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin Pq_genesis_glosa.p_lista_glosas_estado_eps(:v_pestado,:v_pnumero,:v_pubicacion,:v_pfechaini,:v_pfechafin,:v_pnit,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta,':v_pestado',$request->Estado);
	oci_bind_by_name($consulta,':v_pnumero',$Num);
	oci_bind_by_name($consulta,':v_pubicacion',$Ubi);
	oci_bind_by_name($consulta,':v_pfechaini',$F_Inicio);
	oci_bind_by_name($consulta,':v_pfechafin',$F_Fin);
	oci_bind_by_name($consulta,':v_pnit',$Nit);
	oci_bind_by_name($consulta,':v_json_out', $json, 4000);
	oci_bind_by_name($consulta,':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}

function Obtener_Glosas_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_obtener_detalle_glosa_eps(:v_pnumero,:v_pubicacion,:v_renglon,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_renglon', $request->renglon);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}


function Obtener_Comentarios()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_GLOSA.p_lista_respuestas(:v_pnumero,:v_pubicacion,:v_renglon,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_renglon', $request->renglon);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}
function Inserta_Comentario()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GLOSA.p_i_inserta_respuesta(:v_pnumero,:v_pubicacion,:v_renglon,:v_prespuesta,:v_padjunto,
	:v_presponsable,:v_porigen,:v_pvalor_ratifica,:v_pfecha,:v_json_out); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_renglon', $request->renglon);
	oci_bind_by_name($consulta, ':v_prespuesta', $request->comentario);
	oci_bind_by_name($consulta, ':v_padjunto', $request->adjunto);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_porigen', $request->origen);
	oci_bind_by_name($consulta, ':v_pvalor_ratifica', $request->valorglosa);
	oci_bind_by_name($consulta, ':v_pfecha', $request->fecha);
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

function Obt_Control()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_USUARIO(:V_PCEDULA,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
