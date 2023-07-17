
<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
$Nit = '890102044';

//aprobar_tickets
function insertar_suministro(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_mipres_direccionamiento.p_ui_suministro(:v_responsable, :v_pjson_row_adj, :v_len, :v_estado, :v_pjson_row_out);  end;');
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

//Consulta Suministro
// function rango__fecha(){
// 	global $request;
// 	// $Token = $_REQUEST["Token"];
// 	$Token = obtener_token( $request->regimen);
// 	//  ( $request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
// 	// $Nit ='890102044';
// 	$fecha_inicio = $request->fecha_i;
// 	$fecha_fin = $request->fecha_f;
// 	// echo $fecha_inicio;
// 	// echo $fecha_fin;
// 	$date = $fecha_inicio;
// 	$end_date = $fecha_fin;
// 	$json = ($request->tipo=='T') ?  tutela_diaria($date,$Token) :  entrega_diaria($date,obtener_token($Token));
// 	// $json = tutela_diaria($date,$Token);
  
// 	while (strtotime($date) <= strtotime($end_date)) {
// 		// $var= $var .","."1";
// 		$date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
// 		$info = ($request->tipo=='T') ?  tutela_diaria($date,$Token) :  entrega_diaria($date,obtener_token($Token));
// 		if($info===0){
// 			echo 0;
// 			exit();
// 		}else{
// 			// if (isset($info) && $info !== null && count($info) > 0) {
// 				$json  = $info.",".$json;
// 			// } else {

// 			// }
			
			
// 		}
// 	}
// 	echo "[".$json."]";
// }

function rango__fecha(){
	
	global $request;
	$fecha_inicio = $request->fecha_i;
	$fecha_fin = $request->fecha_f;
	$Token = obtener_token( $request->regimen);
	// $Token = ( $request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	$json = [];
	do{
		 $info = getSuministrosDate($fecha_inicio,$Token);
		//  var_dump($info);
		//  $info = '{"'.$fecha_inicio.'":'.$info.'}';
		 $count = count($json);
		 if($count > 0){
			$json = $json.",".$info;
		 }else{
			$json = $info;
		 }
		 $fecha_inicio = date("Y-m-d", strtotime("+1 day", strtotime($fecha_inicio)));
	} while(strtotime($fecha_inicio) <= strtotime($fecha_fin));
	echo '['.$json.']';
}

function getSuministrosDate($fecha,$Token){
	
	stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    set_time_limit(0);
    $curl = curl_init();
// echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/SuministroXFecha/890102044/$Token/$fecha";
	curl_setopt_array($curl, array(
		CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/SuministroXFecha/890102044/$Token/$fecha",
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
        echo "cURL Error #:" . $err;
    } else {
       return $response;
    }
}


function get_suministro_pres(){

	global $request;
	$no = $request->no;
	$Token = obtener_token( $request->regimen);
	// ($request->regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7");
	
	// echo "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/ReporteEntregaXPrescripcion/890102044/$Token/$no";
	stream_context_set_default([
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
		]
	]);
	//echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/SuministroXPrescripcion/890102044/$Token/$no";
	$curl = curl_init();

	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/SuministroXPrescripcion/890102044/$Token/$no",
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

//envia data
function envia_data(){ 
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_ENVIA_DATA(:v_consecutivos,:v_tipo, :v_responsable, :v_len, :v_pjson_row_out); end;');
	oci_bind_by_name($consulta,':v_consecutivos',$request-> v_consecutivo);
	oci_bind_by_name($consulta,':v_responsable', $request-> v_responsable);
	oci_bind_by_name($consulta,':v_tipo', $request-> v_tipo);
	oci_bind_by_name($consulta,':v_len',$request-> v_len);

	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
			echo 1;
	}else{
		echo 0;
	}
	oci_close($c);
	
}


//obtener_dir
function obtener_suministro(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_OBTENER_SUMINISTRO (:v_consecutivo, :v_json_row); end;');
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
			"idprescripcion"=>$item->noprescripcion,
			"noentrega"=>$item->noentrega,
			"respuesta"=>  cargue_indiv(obtener_token('S'),json_encode($item))
		];
		
		// exit;
	}

	 echo json_encode($resumen);
}
//registro_suministro

// historico_dir
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
//Obtener Regimen
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
//obtener_token
function obtener_token($regimen){
	// global $Nit;
	$Nit = '890102044';
	//  $Token = $regimen === "C" ? "TOKEN_EPS" : "TOKEN_EPS_SUB";

	//$Token = $regimen === "C" ? "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449";
	$Token = $regimen === "C" ? "F1074210-3904-4BBB-A264-03176735C0B5" : "92B0D535-18BB-411D-A8A4-5297F67A3F70";

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
	stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    set_time_limit(0);
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Suministro/890102044/$Token",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_SSL_VERIFYPEER => 0,    
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "PUT",
      CURLOPT_POSTFIELDS =>$Data,
      CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json"
    ),
  ));
    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);


    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return json_decode($response);
    }
}


?>
