<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
$Nit = '890102044';

//aprobar_tickets
function insertar_dir(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_UI_DIRECCIONAMIENTO(:v_responsable, :v_pjson_row_adj, :v_len,:v_estado, :v_pjson_row_out ); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_adj', $json, -1, OCI_B_CLOB);
	$json->writeTemporary(json_encode($request->v_pjson_row_adj));
	oci_bind_by_name($consulta,':v_responsable',$request->v_responsable);
	// v_estado
	oci_bind_by_name($consulta,':v_estado',$request->v_estado);
	oci_bind_by_name($consulta,':v_len',$request->v_len);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function insertar_sum(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_UI_SUMINISTRO(:v_responsable, :v_pjson_row_adj, :v_len,:v_estado, :v_pjson_row_out ); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_adj', $json, -1, OCI_B_CLOB);
	$json->writeTemporary(json_encode($request->v_pjson_row_adj));
	oci_bind_by_name($consulta,':v_responsable',$request->v_responsable);
	oci_bind_by_name($consulta,':v_estado',$request->v_estado);
	oci_bind_by_name($consulta,':v_len',$request->v_len);
    // var_dump($request->v_pjson_row_adj);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function get_no_entregas(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin	oasis.pq_genesis_mipres_direccionamiento.p_obtener_causas_ne(:v_json_row);  end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtener_dir(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_OBTENER_DIRECCIONAMIENTO (:v_consecutivo, :v_json_row); end;');
	oci_bind_by_name($consulta,':v_consecutivo',$request->v_consecutivo);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = json_decode($clob->read($clob->size()));
		// echo $json;
	}else{
		// echo 0;
	}
	oci_close($c);
	$resumen  = [];
	foreach ($json as $item) {
		// cargue_indiv(obtener_token('S'),json_encode($item));
		$resumen []= [
			"idprescripcion"=>$item->NoPrescripcion,
			"noentrega"=>$item->NoEntrega,
			"respuesta"=>  cargue_indiv(obtener_token(obtener_afilregimen($item->TipoIDPaciente,$item->NoIDPaciente)),json_encode($item))
		];
		
		// exit;
	}

	 echo json_encode($resumen);
}

function historico_dir(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_mipres_direccionamiento.p_obtener_direccionamientos_procesados(:v_presponsable, :v_json_row); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	
	oci_bind_by_name($consulta,':v_presponsable',$request->v_presponsable);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function get_datos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_mipres_direccionamiento.P_OBTENER_DATOS(:v_tipodoc, :v_doc , :v_json_row); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_tipodoc',$request->v_tipoidpaciente);
	oci_bind_by_name($consulta,':v_doc',$request->v_nroidpaciente);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtener_afilregimen($tipo_doc,$doc){
	require('../config/dbcon_prod.php');
    $consulta = oci_parse($c,'SELECT afic_regimen
                                from EAFI_AFILIADO
								where afic_documento = :v_doc
								and afic_tipo_documento = :v_tipo_doc');
    
	oci_bind_by_name($consulta,':v_doc',$doc);
	oci_bind_by_name($consulta,':v_tipo_doc',$tipo_doc);
    
    oci_execute($consulta);
  
    while($row = oci_fetch_assoc($consulta))
    {
        $afic_regimen = $row['AFIC_REGIMEN'];
    }
       
    oci_close($c);
    return "S";
}

function obtener_token($regimen){
	// global $Nit;
	$Nit = '890102044';
	//  $Token = $regimen === "C" ? "TOKEN_EPS" : "TOKEN_EPS_SUB";
	$Token = $regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";

	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);
	
	// $Token = $_REQUEST["Token"];
	
	//  $url = "https://tablas.sispro.gov.co/WSSUMMIPRESNOPBS/api/GenerarToken/$Nit/$Token";
	$url = "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/GenerarToken/$Nit/$Token";
	$contents = str_replace("\"", "", file_get_contents($url, true));
	return $contents;
	// echo $contents;
}

function cargue_indiv($Token,$Data){
	// global $Nit;
	// header('content-type: application/json');
	// echo('[{"idprescripcion":"20191010154014922989","noentrega":1,"respuesta":[{"Id":12066187,"IdDireccionamiento":11741121}]}]');
	// exit();
	$Nit = '890102044';
	// var_dump($Data);
	// echo "\n";
	// echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Direccionamiento/$Nit/$Token";
	// echo "\n";

	set_time_limit(0);
  $curl = curl_init();
  

	curl_setopt_array($curl, array(
		CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Direccionamiento/890102044/$Token",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_SSL_VERIFYPEER=> false,
		CURLOPT_SSL_VERIFYHOST=>false,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_POSTFIELDS =>$Data,
		CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		sprintf("Content-Length: %s", strlen($Data)),
		"Content-Type: application/json",
		"Cookie: cookiesession1=15490976XUESTTFWMUBUNOEB3LH00AE1",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: 8a9395ef-10ef-447d-804d-ffc6f55f5102,8af140f3-da54-4566-8c75-8fce259cb03b",
		"User-Agent: PostmanRuntime/7.17.1",
		"cache-control: no-cache"
		)
  ));
  

  
  $response = curl_exec($curl);
  $err = curl_error($curl);
  
  curl_close($curl);
  
  if ($err) {
	echo "cURL Error #:" . $err;
  } else {
	// echo $response;
	return json_decode($response);
  }
}

function rango__fecha(){
	global $request;
	// $Token = $_REQUEST["Token"];
	$Token = ( $request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	// $Nit ='890102044';
	$fecha_inicio = $request->fecha_i;
	$fecha_fin = $request->fecha_f;
	// echo $fecha_inicio;
	// echo $fecha_fin;
	$date = $fecha_inicio;
	$end_date = $fecha_fin;
	$json = ($request->tipo=='T') ?  tutela_diaria($date,$Token) :  entrega_diaria($date,obtener_token($Token));
	// $json = tutela_diaria($date,$Token);
  
	while (strtotime($date) <= strtotime($end_date)) {
		// $var= $var .","."1";
		$date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
		$info = ($request->tipo=='T') ?  tutela_diaria($date,$Token) :  entrega_diaria($date,obtener_token($Token));
		if($info===0){
			echo 0;
			exit();
		}else{
			// if (isset($info) && $info !== null && count($info) > 0) {
				$json  = $info.",".$json;
			// } else {

			// }
			
			
		}
		
		
	}
	echo "[".$json."]";
}

function get_entrega_no(){

	global $request;
	$Token = obtener_token($request->regimen);
	// ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$no = $request-> no_entrega;
	// echo "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/ReporteEntregaXPrescripcion/890102044/$Token/$no";
	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);

	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/ReporteEntregaXPrescripcion/890102044/$Token/$no",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		echo "1";
	} else {
		echo $response;
	}
} 

function tutela_diaria($fecha,$Token){
	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);
	// $Token = $_REQUEST["Token"];
	// $Fecha = $_REQUEST["Fecha"];
	// $Nit = $_REQUEST["Nit"];
	set_time_limit(0);
	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Tutelas/890102044/$fecha/$Token",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		return "1";
	} else {
		return $response;
	}
}

function get_tutelas(){
	global $request;
	$Token = ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$Fecha = $request-> dato;

	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);

	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Tutelas/890102044/$Fecha/$Token",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		echo "1";
	} else {
		echo $response;
	}
}


//Junta Profesional
function get_jp(){
	global $request;
	$Token = ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$Fecha = $request-> dato;

	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);

	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/JuntaProfesionalXFecha/890102044/$Token/$Fecha",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		echo "1";
	} else {
		echo $response;
	}
}

function get_jp_no(){
	global $request;
	$Token = ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$no = $request-> dato;

	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);

	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/JuntaProfesional/890102044/$Token/$no",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		echo "1";
	} else {
		echo $response;
	}
}

function anula_dir(){
	global $request;
	$IdDireccionamiento = $request->v_iddir;
	$Nit = '890102044';
	$Token = obtener_token('S');
	set_time_limit(0);
	  $curl = curl_init();
	
	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/AnularDireccionamiento/$Nit/$Token/$IdDireccionamiento",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_SSL_VERIFYPEER=> false,
		CURLOPT_SSL_VERIFYHOST=>false,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_HTTPHEADER => array(
		  "Accept: */*",
		  "Accept-Encoding: gzip, deflate",
		  "Cache-Control: no-cache",
		  "Connection: keep-alive",
		  "Content-Length: 0",
		  "Cookie: cookiesession1=1549097DRMETGZTNGM1XBZFR958H1EF9",
		  "Host: wsmipres.sispro.gov.co",
		  "Postman-Token: a38d537f-f79a-483e-8126-cd2112654230,021e904b-7542-45fd-8f03-771620a8e3b3",
		  "User-Agent: PostmanRuntime/7.18.0",
		  "cache-control: no-cache"
		),
	  ));
	  
  
  $response = curl_exec($curl);
  $err = curl_error($curl);
  
  curl_close($curl);
  
  if ($err) {
	echo "cURL Error #:" . $err;
  } else {
	echo $response;
	// return json_decode($response);
  }
}

function anula_sum(){
	global $request;
	$IdSuministro = $request->v_idsum;
	$Nit = '890102044';
	$Token = obtener_token('S');
	set_time_limit(0);
	  $curl = curl_init();
	
	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/AnularSuministro/$Nit/$Token/$IdSuministro",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_SSL_VERIFYPEER=> false,
		CURLOPT_SSL_VERIFYHOST=>false,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_HTTPHEADER => array(
		  "Accept: */*",
		  "Accept-Encoding: gzip, deflate",
		  "Cache-Control: no-cache",
		  "Connection: keep-alive",
		  "Content-Length: 0",
		  "Cookie: cookiesession1=1549097DRMETGZTNGM1XBZFR958H1EF9",
		  "Host: wsmipres.sispro.gov.co",
		  "Postman-Token: a38d537f-f79a-483e-8126-cd2112654230,021e904b-7542-45fd-8f03-771620a8e3b3",
		  "User-Agent: PostmanRuntime/7.18.0",
		  "cache-control: no-cache"
		),
	  ));
	  
  
  $response = curl_exec($curl);
  $err = curl_error($curl);
  
  curl_close($curl);
  
  if ($err) {
	echo "cURL Error #:" . $err;
  } else {
	echo $response;
	// return json_decode($response);
  }
}

function entrega_diaria($date,$Token){
	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);
	// $Token = $_REQUEST["Token"];
	// $Fecha = $_REQUEST["Fecha"];
	// $Nit = $_REQUEST["Nit"];
	set_time_limit(0);
	
	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/ReporteEntregaXFecha/890102044/$Token/$date",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 0,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		return "1";
	} else {
		return $response;
	}
}
function obtener_dir_det(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN pq_genesis_mipres_direccionamiento.p_obtener_direccionamiento_det (:v_pnopres, :v_pnoentrega, :v_json_row); end;');
	
	oci_bind_by_name($consulta,':v_pnopres',$request->v_pnopres);
	oci_bind_by_name($consulta,':v_pnoentrega',$request->v_pnoentrega);
	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
		}


function get_tutelas_no(){
	global $request;
	$Token = ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$no = $request-> dato;

	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);

	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/TutelaXNumero/890102044/$Token/$no",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_SSL_VERIFYHOST => 0,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
		"Accept: */*",
		"Accept-Encoding: gzip, deflate",
		"Cache-Control: no-cache",
		"Connection: keep-alive",
		"Host: wsmipres.sispro.gov.co",
		"Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
		"User-Agent: PostmanRuntime/7.19.0",
		"cache-control: no-cache"
	)
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);


	if ($err) {
		echo "1";
	} else {
		echo $response;
	}
} 
?>
