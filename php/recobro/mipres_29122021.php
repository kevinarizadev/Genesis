<?php

	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	$Nit = '890102044';

function consulta_regimen(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_OBTENER_REGIMEN_POR_DOCUMENTO( :v_ptipodoc,
	 :v_pdocumento,
	 :v_json_row);
  end;
  
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);

	oci_bind_by_name($consulta,':v_ptipodoc',$request->tipo_doc);
	oci_bind_by_name($consulta,':v_pdocumento',$request->doc);
		
    // var_dump($request->v_pjson_row_adj);
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

function obtener_nombre_prestador(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin
  -- Call the procedure
  oasis.pq_genesis_mipres_direccionamiento.p_obtener_prestador_mipres(:v_pnopres,
                                                                      :v_pcontec,
                                                                      :v_ptipotec,
                                                                      :v_json_row);
end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);

	
	
	oci_bind_by_name($consulta,':v_pnopres',$request->nopres);
	oci_bind_by_name($consulta,':v_pcontec',$request->contec);
	oci_bind_by_name($consulta,':v_ptipotec',$request->tipotec);
		
    // var_dump($request->v_pjson_row_adj);
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
function consulta_mipres_afi(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin
	-- Call the procedure
	oasis.pq_genesis_mipres_direccionamiento.p_obtener_dir_cabeza_por_documento(:v_ptipodoc,
																				:v_pdocumento,
																				:v_json_row);
  end;
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);

	oci_bind_by_name($consulta,':v_ptipodoc',$request->tipo_doc);
	oci_bind_by_name($consulta,':v_pdocumento',$request->doc);
	
    // var_dump($request->v_pjson_row_adj);
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


//consulta_mipres_afi_detalle
function consulta_mipres_afi_detalle(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin
	-- Call the procedure
	oasis.pq_genesis_mipres_direccionamiento.p_obtener_dir_detalle_por_documento(:v_ptipodoc,
																				 :v_pdocumento,
																				 :v_pnoprescripcion,
																				 :v_json_row);
  end;
  
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);

	oci_bind_by_name($consulta,':v_ptipodoc',$request->tipo_doc);
	oci_bind_by_name($consulta,':v_pdocumento',$request->doc);
	oci_bind_by_name($consulta,':v_pnoprescripcion',$request->no_pres);
	
    // var_dump($request->v_pjson_row_adj);
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

function insertar_anular(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_UI_ANULACION_DI(:v_pjson_row_adj, :v_len, :v_estado, :v_pjson_row_out); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_adj', $json, -1, OCI_B_CLOB);
	$json->writeTemporary(json_encode($request->v_pjson_row_adj));
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

function P_UI_DIRANULA(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_UI_DIRANULA(:v_pjson_row_adj, :v_len, :v_estado, :v_pjson_row_out); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_adj', $json, -1, OCI_B_CLOB);
	$json->writeTemporary(json_encode($request->v_pjson_row_adj));
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





function get_cargue_anulados(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin	oasis.pq_genesis_mipres_direccionamiento.P_OBTENER_ANULACION_MASIVA(:v_idcargue,:v_json_row);  end;');
	oci_bind_by_name($consulta,':v_idcargue',$request->v_consecutivo);
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
function actualiza_estado_dir(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_ANULA_DIR( :v_nomipres, :v_responsable, :v_pjson_row_out); end;');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_nomipres',$request->v_nomipres);
	oci_bind_by_name($consulta,':v_responsable',$request->v_responsable);
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
     return $afic_regimen;
    //echo $afic_regimen;
   // return "S";
}

function obtener_token($regimen){
	// global $Nit;
	$Nit = '890102044';
	//  $Token = $regimen === "C" ? "TOKEN_EPS" : "TOKEN_EPS_SUB";
	$Token = $regimen === "C" ? "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449";

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
	$Token = ( $request->regimen === "C" ?  "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
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
	$Token = ($request->regimen === "C" ? "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
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
	$Token = ($request->regimen === "C" ?  "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
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
	$Token = ($request->regimen === "C" ?  "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
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


	function ins_auditoria(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_INS_AUDITORIA(:v_usuario , :v_descripcion,:v_pdocumento ,:v_pevento, :v_prespuesta,:v_pcodigo); end;');
		oci_bind_by_name($consulta,':v_usuario',$request->usuario);
		oci_bind_by_name($consulta,':v_descripcion',$request->descripcion);
		oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
		oci_bind_by_name($consulta,':v_pevento',$request->evento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_bind_by_name($consulta, ':v_pcodigo', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
			if (isset($clob)) {
				$json = $clob->read($clob->size());
				echo $json;
			}else{
				echo 0;
			}
			oci_close($c);
	}

	
	
function inserta_prescripcion(){

	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_INSERTAR_JSON_DIRECCIONAMIENTO(:v_prescripcion, :v_json_row);  end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prescripcion', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary(json_encode($request->prescripcion)); 
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


function inserta_prescripcion_detalle_real_i($arreglo){
	//var_dump($arreglo);
	
	include('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_INSERTAR_JSON_DIRECCIONAMIENTO(:v_prescripcion, :v_json_row);  end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prescripcion', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary(json_encode($arreglo)); 
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

function inserta_prescripcion_detalle(){
	//require_once('../config/dbcon_prod.php');
	global $request;
	$prescripcion = $request->prescripcion[0];
 	$longitud  = 0;
	$prescripcion_i =  json_decode(json_encode($prescripcion),true);
	$prescripcion_array = [];
	$medicamento = [	
		"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
		"renglon"=>'',
		"cups"=>'',
		"cantidad"=>'',
		"valor"=>'',
		"tecnologia"=>'',
		"fecha_registro"=>'',
		"utilidad"=>'',
		"opdn_autorizacion_manual"=>'',
		"tipo_prest"=>'',
		"indicaciones"=>'',
		"nofreadmon"=>'',
		"codfreadmon"=>'',
		"duracion"=>'',
		"cantidad_duracion"=>'',
		"no_freadmon"=>'',
		"cod_fre_admon"=>'',
		"codva"=>'',
		"ind_esp"=>'',
		"cant_dosis"=>'',
		"cod_dosisum"=>'',
		"contec"=>'',
		"canttotaentregar"=>'',
		"utilidad_dup"=>''
	];
	$procedimiento = [	
		"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
		"renglon"=>'',
		"cups"=>'',
		"cantidad"=>'',
		"valor"=>'',
		"tecnologia"=>'',
		"fecha_registro"=>'',
		"utilidad"=>'',
		"opdn_autorizacion_manual"=>'',
		"tipo_prest"=>'',
		"indicaciones"=>'',
		"nofreadmon"=>'',
		"codfreadmon"=>'',
		"duracion"=>'',
		"cantidad_duracion"=>'',
		"no_freadmon"=>'',
		"cod_fre_admon"=>'',
		"codva"=>'',
		"ind_esp"=>'',
		"cant_dosis"=>'',
		"cod_dosisum"=>'',
		"contec"=>'',
		"canttotaentregar"=>'',
		"utilidad_dup"=>''
	];
	$nutricional = [	
		"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
		"renglon"=>'',
		"cups"=>'',
		"cantidad"=>'',
		"valor"=>'',
		"tecnologia"=>'',
		"fecha_registro"=>'',
		"utilidad"=>'',
		"opdn_autorizacion_manual"=>'',
		"tipo_prest"=>'',
		"indicaciones"=>'',
		"nofreadmon"=>'',
		"codfreadmon"=>'',
		"duracion"=>'',
		"cantidad_duracion"=>'',
		"no_freadmon"=>'',
		"cod_fre_admon"=>'',
		"codva"=>'',
		"ind_esp"=>'',
		"cant_dosis"=>'',
		"cod_dosisum"=>'',
		"contec"=>'',
		"canttotaentregar"=>'',
		"utilidad_dup"=>''
	];
	$complementario = [	
		"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
		"renglon"=>'',
		"cups"=>'',
		"cantidad"=>'',
		"valor"=>'',
		"tecnologia"=>'',
		"fecha_registro"=>'',
		"utilidad"=>'',
		"opdn_autorizacion_manual"=>'',
		"tipo_prest"=>'',
		"indicaciones"=>'',
		"nofreadmon"=>'',
		"codfreadmon"=>'',
		"duracion"=>'',
		"cantidad_duracion"=>'',
		"no_freadmon"=>'',
		"cod_fre_admon"=>'',
		"codva"=>'',
		"ind_esp"=>'',
		"cant_dosis"=>'',
		"cod_dosisum"=>'',
		"contec"=>'',
		"canttotaentregar"=>'',
		"utilidad_dup"=>''
	];

if (!empty($prescripcion_i['medicamentos'])){          
	for ($i=0; $i < sizeof($prescripcion_i['medicamentos']) ; $i++) { 
		$indice = $i+1;
		$medicamento = [
			"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
			"renglon"=> $indice,	
			"cups"=>'',
			"cantidad"=>$prescripcion_i['medicamentos'][$i]['CantTotalF'],
			"valor"=>'',
			"tecnologia"=>'M',
			"fecha_registro"=>'',
			"utilidad"=>$prescripcion_i['medicamentos'][$i]['DescMedPrinAct'],
			"opdn_autorizacion_manual"=>'',
			"tipo_prest"=>$prescripcion_i['medicamentos'][$i]['TipoPrest'],
			"indicaciones"=>$prescripcion_i['medicamentos'][$i]['IndRec'],
			"nofreadmon"=>$prescripcion_i['medicamentos'][$i]['NoFAdmon'],
			"codfreadmon"=>$prescripcion_i['medicamentos'][$i]['CodFreAdmon'],
			"duracion"=>   $prescripcion_i['medicamentos'][$i]['DurTrat'],
			"cantidad_duracion"=>$prescripcion_i['medicamentos'][$i]['CanTrat'],
			"no_freadmon"=>$prescripcion_i['medicamentos'][$i]['NoFAdmon'],
			"cod_fre_admon"=>$prescripcion_i['medicamentos'][$i]['CodFreAdmon'],
			"codva"=>$prescripcion_i['medicamentos'][$i]['CodVA'],
			"ind_esp"=>$prescripcion_i['medicamentos'][$i]['IndEsp'],
			"cant_dosis"=>$prescripcion_i['medicamentos'][$i]['Dosis'],
			"cod_dosisum"=>$prescripcion_i['medicamentos'][$i]['DosisUM'],
			"contec"=>$indice,
			"canttotaentregar"=>'',
			"utilidad_dup"=> $prescripcion_i['medicamentos'][$i]['CodFF']
		];

		
		array_push( $prescripcion_array, $medicamento);


	}
	$longitud =  $longitud + sizeof($prescripcion_i['medicamentos']);
	
}
if(!empty($prescripcion_i['procedimientos'])){
	         
	for ($i=0; $i < sizeof($prescripcion_i['procedimientos']) ; $i++) { 
		$indice = $i+1;
		$procedimiento = [
			"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
			"renglon"=> $indice,	
			"cups"=>$prescripcion_i['procedimientos'][$i]['CodCUPS'],
			"cantidad"=>$prescripcion_i['procedimientos'][$i]['CantTotal'],
			"valor"=>'',
			"tecnologia"=>'P',
			"fecha_registro"=>'',
			"utilidad"=>'',
			"opdn_autorizacion_manual"=>'',
			"tipo_prest"=>$prescripcion_i['procedimientos'][$i]['TipoPrest'],
			"indicaciones"=>$prescripcion_i['procedimientos'][$i]['IndRec'],
			"nofreadmon"=>'',
			"codfreadmon"=>'',
			"duracion"=> $prescripcion_i['procedimientos'][$i]['CodPerDurTrat'],

			"cantidad_duracion"=>	$prescripcion_i['procedimientos'][$i]['Cant'],
			"no_freadmon"=>'',
			"cod_fre_admon"=>'',
			"codva"=>'',
			"ind_esp"=>'',
			"cant_dosis"=>'',
			"cod_dosisum"=>'',
			"contec"=>$indice,
			"canttotaentregar"=>'',
			"utilidad_dup"=> ''
		];

		
		array_push( $prescripcion_array, $procedimiento);


	}
	$longitud =  $longitud +  sizeof($prescripcion_i['procedimientos']);
	
	
}
if(!empty($prescripcion_i['productosnutricionales'])){
	         
	for ($i=0; $i < sizeof($prescripcion_i['productosnutricionales']) ; $i++) { 
		$indice = $i+1;
		$nutricional = [
			"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
			"renglon"=> $indice,	
			"cups"=>$prescripcion_i['productosnutricionales'][$i]['DescProdNutr'],
			"cantidad"=>$prescripcion_i['productosnutricionales'][$i]['CantTotalF'],
			"valor"=>'',
			"tecnologia"=>'N',
			"fecha_registro"=>'',
			"utilidad"=>'',
			"opdn_autorizacion_manual"=>'',
			"tipo_prest"=>$prescripcion_i['productosnutricionales'][$i]['TipoPrest'],
			"indicaciones"=>$prescripcion_i['productosnutricionales'][$i]['IndRec'],
			"nofreadmon"=>$prescripcion_i['productosnutricionales'][$i]['NoFAdmon'],
			"codfreadmon"=>$prescripcion_i['productosnutricionales'][$i]['CodFreAdmon'],
			"duracion"=>   $prescripcion_i['productosnutricionales'][$i]['DurTrat'],
			"cantidad_duracion"=>$prescripcion_i['productosnutricionales'][$i]['CanTrat'],
			"no_freadmon"=>$prescripcion_i['productosnutricionales'][$i]['NoFAdmon'],
			"cod_fre_admon"=>$prescripcion_i['productosnutricionales'][$i]['CodFreAdmon'],
			"codva"=>$prescripcion_i['productosnutricionales'][$i]['CodViaAdmon'],
			"ind_esp"=>$prescripcion_i['productosnutricionales'][$i]['IndEsp'],
			"cant_dosis"=>$prescripcion_i['productosnutricionales'][$i]['Dosis'],
			"cod_dosisum"=>$prescripcion_i['productosnutricionales'][$i]['DosisUM'],
			"contec"=> $indice,
			"canttotaentregar"=>'',
			"utilidad_dup"=> ''
		];

		
		array_push( $prescripcion_array, $nutricional);


	}
	$longitud = $longitud + sizeof($prescripcion_i['productosnutricionales']);
	
	}
if(!empty($prescripcion_i['serviciosComplementarios'])){
	         
	for ($i=0; $i < sizeof($prescripcion_i['serviciosComplementarios']) ; $i++) { 
		$indice = $i+1;
		$complementario = [
			"no_prescripcion"=>$prescripcion_i['prescripcion']['NoPrescripcion'],
			"renglon"=> $indice,	
			"cups"=>$prescripcion_i['serviciosComplementarios'][$i]['CodSerComp'],
			"cantidad"=>$prescripcion_i['serviciosComplementarios'][$i]['CantTotal'],
			"valor"=>'',
			"tecnologia"=>'S',
			"fecha_registro"=>'',
			"utilidad"=>'',
			"opdn_autorizacion_manual"=>'',
			"tipo_prest"=>$prescripcion_i['serviciosComplementarios'][$i]['TipoPrest'],
			"indicaciones"=>$prescripcion_i['serviciosComplementarios'][$i]['IndRec'],
			"nofreadmon"=>$prescripcion_i['serviciosComplementarios'][$i]['CadaFreUso'],
			"codfreadmon"=>$prescripcion_i['serviciosComplementarios'][$i]['CodFreUso'],
			"duracion"=>  $prescripcion_i['serviciosComplementarios'][$i]['CodPerDurTrat'],
			"cantidad_duracion"=>$prescripcion_i['serviciosComplementarios'][$i]['Cant'],
			"no_freadmon"=>$prescripcion_i['serviciosComplementarios'][$i]['CadaFreUso'],
			"cod_fre_admon"=>$prescripcion_i['serviciosComplementarios'][$i]['CodFreUso'],
			"codva"=>'',
			"ind_esp"=>'',
			"cant_dosis"=>$prescripcion_i['serviciosComplementarios'][$i]['CanForm'],
			"cod_dosisum"=>'',
			"contec"=>$indice,
			"canttotaentregar"=>'',
			"utilidad_dup"=> ''
		];

		
		array_push( $prescripcion_array, $complementario);


	}
	$longitud = $longitud + sizeof($prescripcion_i['serviciosComplementarios']);
	
	
}
inserta_prescripcion_detalle_real($prescripcion_array, $longitud);

}

function procesa_dir(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'
	begin
	oasis.pq_genesis_mipres_direccionamiento.p_procesar_direccionamiento(:v_no_pres,
																			:v_no_entrega,
																			:v_iddireccionamiento,
																			:v_id,
																			:v_tecnologia,
																			:V_RESPONSABLE,
																			:v_json_row);end;
  ');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_no_pres',$request->v_no_pres);
	oci_bind_by_name($consulta,':v_no_entrega',$request->v_no_entrega);
	oci_bind_by_name($consulta,':V_RESPONSABLE',$request->v_responsable);
	oci_bind_by_name($consulta,':v_tecnologia',$request->v_tipotec);
	oci_bind_by_name($consulta,':v_iddireccionamiento',$request->v_iddireccionamiento);
	oci_bind_by_name($consulta,':v_id',$request->v_id);
	
	
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


function actualizafechas(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'
	begin
	oasis.PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_ACTUALIZAR_FECHA_DIRECCIONAMIENTO(:v_no_pres,
                                                                               :v_no_entrega,
                                                                               :v_tecnologia,
                                                                               :v_responsable,
                                                                               :v_json_row);end;
  ');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	

	oci_bind_by_name($consulta,':v_no_pres',$request->no_pres);
	oci_bind_by_name($consulta,':v_no_entrega',$request->no_entrega);
	oci_bind_by_name($consulta,':v_tecnologia',$request->tecnologia);
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	
	
	
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

function obtener_tecnologias(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'
	begin
	oasis.pq_genesis_mipres_direccionamiento.P_OBTENER_TECNOLOGIAS(:v_pmipres, :v_json_row);end;
  ');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_pmipres',$request->no_pres);
	
	
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

function procesa_dir_prestador(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'
	begin
	oasis.PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_PROCESAR_DIRECCIONAMIENTO_PRESTADOR( :v_no_pres,
                                                                                  :v_no_entrega,
                                                                                  :v_idDireccionamiento,
                                                                                  :v_id,
                                                                                  :v_tecnologia,
                                                                                  :v_prestador,
                                                                                  :v_fecha_dir,
                                                                                  :v_responsable,
                                                                                  :v_json_row);end;
  ');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_no_pres',$request->v_no_pres);
	oci_bind_by_name($consulta,':v_no_entrega',$request->v_no_entrega);
	oci_bind_by_name($consulta,':V_RESPONSABLE',$request->v_responsable);
	oci_bind_by_name($consulta,':v_tecnologia',$request->v_tipotec);
	oci_bind_by_name($consulta,':v_prestador',$request->prestador);
	oci_bind_by_name($consulta,':v_fecha_dir',$request->fecha_dir);
	
	
	oci_bind_by_name($consulta,':v_iddireccionamiento',$request->v_iddireccionamiento);
	oci_bind_by_name($consulta,':v_id',$request->v_id);
	
	
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

function RECHAZA_DIR(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'
	begin
  -- Call the procedure
  oasis.pq_genesis_mipres_direccionamiento.p_rechazar_direccionamiento(:v_no_pres,
                                                                       :v_no_entrega,
                                                                       :v_error,
                                                                       :v_tecnologia,
                                                                       :v_responsable,
                                                                       :v_json_row);
	end;
	
  ');

	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_no_pres',$request->v_no_pres);
	oci_bind_by_name($consulta,':v_no_entrega',$request->v_no_entrega);
	oci_bind_by_name($consulta,':v_tecnologia',$request->v_tipotec);
	oci_bind_by_name($consulta,':V_RESPONSABLE',$request->v_responsable);
	oci_bind_by_name($consulta,':v_error',$request->v_error);	
	
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

function get_direccionamientos_posibles(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin
	-- Call the procedure
	oasis.pq_genesis_mipres_direccionamiento.p_obtener_direccionamientos_posibles(:v_no_pres,
																				  :v_con_tec,
																				  :v_tipo_tec,
																				  :v_json_row);
  end;
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_no_pres',$request->NoPrescripcion);
	oci_bind_by_name($consulta,':v_con_tec',$request->con_tec);
	oci_bind_by_name($consulta,':v_tipo_tec',$request->v_tipo_tec);
	
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

function inserta_prescripcion_detalle_real($arreglo,$largo){
	global $request;
	//print_r($arreglo);
	include('../config/dbcon_prod.php');

	$consulta = oci_parse($c,'begin
	pq_genesis_mipres_direccionamiento.p_insertar_json_prescripcion_detalle(:v_prescripcion,
																				  :v_pcantidad,
																				  :v_json_row);  end;  ');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);		

	oci_bind_by_name($consulta, ':v_prescripcion', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary(json_encode($arreglo)); 
	oci_bind_by_name($consulta, ':v_pcantidad', $largo);
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
	$Token = ($request->regimen === "C" ?  "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
	$no = $request->dato;
	// echo $Token;
	// echo $no;
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