<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
global $token_prod;
$token_prod = "30933765-dc2d-4896-9ebe-3a9f794a7c35";


$function();


function valida_archivo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN p_cargue_vacunacion(:v_pjson_row); end;');	
	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
		}


		function detalle_cargue_vacunacion(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN pq_genesis_salud_publica.p_detalle_cargue_vacunacion(:v_pid_cargue, :v_pjson_row); end;');	
	
    oci_bind_by_name($consulta, ':v_pid_cargue', $request-> v_pid_cargue);

	$clob = oci_new_descriptor($c,OCI_D_LOB);	
	oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}


function get_consecutivos(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);

    $consulta = oci_parse($c,'BEGIN pq_genesis_salud_publica.p_lista_id_gestion(:v_response); end;');	

    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode($datos) ;	
}

function cargue_asignamiento_bd(){


	
	require_once('../config/dbcon_prod.php');
	global $request;

	$arreglo = $request->data;
	$longitud = count($arreglo);
	$responsable = '1143154617';

	$consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_inserta_masivo_asignacion(:v_pjson_row_in,
	:v_pcantidad_reg,
	:v_presponsable,
	:v_pjson_row_out);
  end;
  
  ');
	$json = oci_new_descriptor($c, OCI_D_LOB);

	
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $json, -1, OCI_B_CLOB);
	$json->writeTemporary(json_encode($arreglo));
	oci_bind_by_name($consulta,':v_pcantidad_reg',$longitud);
	oci_bind_by_name($consulta,':v_presponsable',$responsable);
	//oci_bind_by_name($consulta,':v_presponsable',$request->responsable);
		
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

function confirma_asignamiento_bd(){	
	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_valida_masivo_asignacion(:v_ptip_documento,
	:v_pnum_documento,
	:v_pnum_cargue,
	:v_presponsable, 
	:v_pestado,
	:v_pnum_asignacion, 
	:v_pcod_prestador, 
	:v_pjson_row_out); 
	 end; ');
	
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta,':v_ptip_documento', $request->tip_documento);
	oci_bind_by_name($consulta,':v_pnum_documento',$request->num_documento);
	oci_bind_by_name($consulta,':v_pnum_cargue',$request->num_cargue);
	oci_bind_by_name($consulta,':v_presponsable',$request->responsable);
	oci_bind_by_name($consulta,':v_pestado',$request->estado);
	oci_bind_by_name($consulta,':v_pnum_asignacion',$request->num_asignacion);
	oci_bind_by_name($consulta,':v_pcod_prestador',$request->cod_prestador);

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


function cargue_asignamiento_api(){
	global $request;	
	$json = $request->data;
	obtener_token();
	
	$resumen  = [];
	foreach ($json as $item) {
		
		
		$resumen []= [
			"CodPrestador"=>$item[0]->CodPrestador,
			"NoIDPaciente"=>$item[0]->NoIDPaciente,
			"TipoIDPaciente"=>$item[0]->TipoIDPaciente,
			"respuesta"=>  cargue_indiv(json_encode($item[0]))
		];	
	}
	echo json_encode($resumen);	
}



//registro_suministro
function cargue_indiv($Data){


    	global $request;
        $nit =  '890102044';
        $aut = $_SESSION['token_vacunacion'];        
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/RegistrarAsignacion/".$nit,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "PUT",
        CURLOPT_POSTFIELDS => $Data,
        CURLOPT_HTTPHEADER => array( "authorization:".$aut."", "cache-control: no-cache", "content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
        return json_decode($response);
        }
}


function obtener_token(){
	global $request;
	global $token;
	$datos = '{
		"nit": "890102044",
		"tipoEntidad": 2,
		"token":"30933765-dc2d-4896-9ebe-3a9f794a7c35"
	  }';
	$curl = curl_init();
	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/login/autenticar",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => $datos,
	  CURLOPT_HTTPHEADER => array(
		"cache-control: no-cache",
		"content-type: application/json"
	  ),
	  CURLOPT_SSL_VERIFYHOST =>0,
	  CURLOPT_SSL_VERIFYPEER =>0
	));
  
	$response = curl_exec($curl);
	$err = curl_error($curl);
  
	curl_close($curl);
  
	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {	
	    $_SESSION['token_vacunacion'] =  substr($response,1,strlen($response)-2);
	//  	echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
	// echo $_SESSION['token_vacunacion'];
	}
  }