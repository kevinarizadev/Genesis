<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function obtenerdocumento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS.P_OBTENER_DOCUMENTO(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function actualizacion_consulta_lma_Sqlsrv()
{
  require_once('../config/dbcon_etl.php');
  // global $request;
  $consulta = "select  count(1) cantidad from [softeps]..[LMA_TEMPO_CONFIRMACION] lm  where FORMAT(getdate(), 'MM/yyyy') = SUBSTRING(mesentrega, 4, 7)";
  $stmt = sqlsrv_query($conn, $consulta);
  $row = array();
  $rows = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}

function actualizacion_estado_LMA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_operaciones_lma.p_lma_actual(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function lista_tabla_LMA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_operaciones_lma.p_lista_ults_elma(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function resumen_lista_tabla_LMA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_operaciones_lma.p_lista_lma_cargadas(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function lista_tabla_BDUA_subsidiado()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN oasis.pq_operaciones_bdua.p_lista_ults_bdua_rs(:v_pjson_row_rs); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_rs', $clob, -1, OCI_B_CLOB);
	// oci_bind_by_name($consulta,':v_pjson_row_rc',$validacion,4000);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
		// echo '{"json1":'.$json.',"json2":'.$validacion.'}';
	}else{
		echo 0;
	}
		oci_close($c);
}
function lista_tabla_BDUA_contributivo()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN oasis.pq_operaciones_bdua.p_lista_ults_bdua_rc(:v_pjson_row_rc); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_rc', $clob, -1, OCI_B_CLOB);
	// oci_bind_by_name($consulta,':v_pjson_row_rc',$validacion,4000);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
		// echo '{"json1":'.$json.',"json2":'.$validacion.'}';
	}else{
		echo 0;
	}
		oci_close($c);
}
function obtenerconcepto()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento; 
	// print_r($request);//para ver lo que esta cargando el documento
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS.P_OBTENER_CONCEPTO(:v_pdocumento, :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function cargaannos()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo where pern_anno >= 2011 order by 1 desc");
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function cargaciclos()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT distinct cicc_tipo IDE, case when cicc_tipo = 'M' then 'MENSUAL'
											                                when cicc_tipo = 'T' then 'TRIMESTRAL'
											                                when cicc_tipo = 'S' then 'SEMESTRAL'
											                                when cicc_tipo = 'A' then 'ANUAL' end AS NOMBRE
											from bcic_ciclo
											where cicn_anno = :v_anno");
	//and cicc_tipo = 'M'");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function cargatrimestre()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT distinct cicn_numero
															from bcic_ciclo
															where cicn_anno = :v_anno
															and cicc_tipo = 'T'");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function cargaperiodos()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT pern_numero IDE, perf_inicial, perf_final,
		case when pern_numero = 1 then 'ENERO'
			  when pern_numero = 2 then 'FEBRERO'
			  when pern_numero = 3 then 'MARZO'
			  when pern_numero = 4 then 'ABRIL'
			  when pern_numero = 5 then 'MAYO'
			  when pern_numero = 6 then 'JUNIO'
			  when pern_numero = 7 then 'JULIO'
			  when pern_numero = 8 then 'AGOSTO'
			  when pern_numero = 9 then 'SEPTIEMBRE'
			  when pern_numero = 10 then 'OCTUBRE'
			  when pern_numero = 11 then 'NOVIEMBRE'
			  when pern_numero = 12 then 'DICIEMBRE'
end as NOMBRE
from bper_periodo
where pern_anno = :v_anno
and pern_numero not in (0,99) order by perf_final asc");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}


function lista_tabla_LMA_2()
{
  require_once('../config/dbcon_etl.php');
  // global $request;
  $consulta = "select id, archivo, Registros, Total_UPC from LMA_TEMPO_CONFIRMACION";
  $stmt = sqlsrv_query($conn, $consulta);
  $row = array();
  $rows = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}

// function confirmarLMA()
// {
//   require_once('../config/dbcon_etl.php');
//   global $request;
//   $myparams['USUARIO'] = $request->usuario;
//   $myparams['FECHAMOV'] = $request->fechamov;
//   $procedure_params = array(
//     array(&$myparams['USUARIO'], SQLSRV_PARAM_IN),
//     array(&$myparams['FECHAMOV'], SQLSRV_PARAM_IN)
//   );
//   $consulta = "EXEC dbo.SP_INSERT_LMA_TEMPO @USUARIO=?,@FECHAMOV =?";
//   $stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
//   if (!$stmt) {
//     die(print_r(sqlsrv_errors(), true));
//   }
//   if (sqlsrv_execute($stmt)) {
//     while ($res = sqlsrv_next_result($stmt)) { }
//     print_r($myparams['json_row']);
//   } else {
//     die(print_r(sqlsrv_errors(), true));
//   }
//   sqlsrv_close($conn);
// }

function obtener_fechaConfirmacionLMA()
{
  require_once('../config/dbcon_etl.php');
  // global $request;
  $consulta = "select distinct año, mes, mesentrega from [softeps]..[LMA_TEMPO_CONFIRMACION]";
  $stmt = sqlsrv_query($conn, $consulta);
  $row = array();
  $rows = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}


function obtener_token()
{
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL => "https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_017/payload",
		//CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_017/payload",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_POSTFIELDS => ""
	]);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		// $_SESSION['token_vacunacion'] = substr($response,1,strlen($response)-2);
		// echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
		// print_r($response->data['payloadId']);
		// echo($response['data']);
		$json = json_decode($response);
		$_SESSION['tokens'] = ($json->data->payloadId);
		// echo $response->data['payloadId'];
		// echo $_SESSION['tokens'];
	}
}

function confirmarLMA()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_Cargue_LMA/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}