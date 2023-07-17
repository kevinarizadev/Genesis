<?php

	switch ($_REQUEST["op"]) {

        case 'rango_fecha':
    $Token = $_REQUEST["Token"];
    $Nit = $_REQUEST["Nit"];
        // $estado = $_REQUEST["url"];

    $fecha_inicio = $_REQUEST["fecha_i"];
    $fecha_fin = $_REQUEST["fecha_f"];
    $date = $fecha_inicio;
    $end_date = $fecha_fin;
    $json = ($_REQUEST["tipo"]=='P') ?  get_prescripcion_dia($date,$Token,$Nit,"false") :  get_direccionamiento_dia($date,$Token);
    while (strtotime($date) <= strtotime($end_date)) {
            // $var= $var .","."1";
        $date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
        $info = ($_REQUEST["tipo"]=='P') ?  get_prescripcion_dia($date,$Token,$Nit,"false") :  get_direccionamiento_dia($date,$Token);
        if($info===0){
            echo 0;
            exit();
        }else{
            $json  = $info.",".$json;
        }


    }
    echo "[".$json."]";
    break;    

case 'rango_f':
        // global $request;
        $fecha_inicio = $request->finicio;
        $fecha_fin = $request->ffin;
        $nit = $request->nit;
        $tipo = $request->tipo;
        $token = getToken($nit,'TOKEN_PROV');
        $json = [];
        do{
             $info = ($_REQUEST["tipo"]=='P') ?  get_prescripcion_dia($date,$Token,$Nit,"false") :  get_direccionamiento_dia($date,$Token);
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
    break;
	
	case 'ObtenerSisben': 
         
        $Token = $_REQUEST["Token"];
        $TipoDoc = $_REQUEST["TipoDoc"];
        $NumDoc = $_REQUEST["NumDoc"];
       
    //$url = "http:// www.personaldataextractor.com/DataExtractor.svc/Json/ObtenerSisben/$Token/$TipoDoc/$NumDoc";
    $url = "http://www.personaldataextractor.com/DataExtractor.svc/Json/ObtenerSisben/$Token/$TipoDoc/$NumDoc";
        $contents = file_get_contents($url, true);
        
        $contents = str_replace('{"ObtenerSisbenResult":', '', $contents);		
        $contents = substr($contents, 0, strlen($contents)-1); 
        		
        $objSisben = json_encode($contents);
        echo json_decode($objSisben);				
    break;
    
 case 'obtener_por_no':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $Numero = $_REQUEST["Numero"];
    $Token = $_REQUEST["Token"];
    $Nit = $_REQUEST["Nit"];
    $estado = $_REQUEST["url"];
    if ($estado == "true") {
        $url = 'DireccionamientoXPrescripcion';
    } else {
        $url = 'NODireccionamientoXPrescripcion';
    }
            // echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Numero";

    set_time_limit(0);

    $curl = curl_init();
    curl_setopt_array($curl, array(

        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Numero",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
            "User-Agent: PostmanRuntime/7.15.2",
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
    }
    break;

case 'consultardirxfecha':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $Token = $_REQUEST["Token"];
    $Fecha = $_REQUEST["Fecha"];
    $Nit = $_REQUEST["Nit"];
    $estado = $_REQUEST["url"];

    if ($estado == "false") {
        $url = 'DireccionamientoXFecha';
    } else {
        $url = 'NODireccionamientoXFecha';
    }
        // var_dump ($url);
        // echo "https://tablas.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Fecha";


    set_time_limit(0);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Fecha",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: 2c68a155-769b-4b03-9409-f55986b60ff4,192b6cc8-285a-4382-b018-5883299f33c4",
            "User-Agent: PostmanRuntime/7.19.0",
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
    }

    break;



case 'buscar_pres_x_doc':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);


    $Nit = $_REQUEST["nit"];
    $Token = $_REQUEST["token"];
    $tipodoc = $_REQUEST["tipodoc"];
    $doc = $_REQUEST["doc"];
    $regimen = $_REQUEST["regimen"];
    $fecha = $_REQUEST["fecha"];

    set_time_limit(0);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/PrescripcionPaciente/$Nit/$fecha/$Token/$tipodoc/$doc",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
            "User-Agent: PostmanRuntime/7.15.2",
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
    }
    break;
    
    
case 'consultarpresxfecha':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $Token = $_REQUEST["Token"];
    $Fecha = $_REQUEST["Fecha"];
    $Nit = $_REQUEST["Nit"];
    set_time_limit(0);
    $curl = curl_init();
    curl_setopt_array($curl, array(
                ///api/Prescripcion/{nit}/{fecha}/{token} 

                CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Prescripcion/$Nit/$Fecha/$Token", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/Prescripcion/$Nit/$Fecha/$Token",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_TIMEOUT => 0,
                CURLOPT_HTTPHEADER => array(
                    "Accept: application/json",
                    "Accept-Encoding: gzip, deflate",
                    "Cache-Control: no-cache",
                    "Connection: keep-alive",
                    "Host: wsmipres.sispro.gov.co",
                    "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
                    "User-Agent: PostmanRuntime/7.15.2",
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
    }
    break;
    

    
case 'buscar_pres_x_num':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    

    $Nit = $_REQUEST["nit"];
    $Token = $_REQUEST["token"];
    $Nop = $_REQUEST["no_pres"];

                // echo "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/PrescripcionXNumero/890102044/".$Token."/".$Nop;

    set_time_limit(0);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/PrescripcionXNumero/890102044/$Token/$Nop",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
            "User-Agent: PostmanRuntime/7.15.2",
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
    }
    break;

    case 'putsuministro':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    $Nit = $_REQUEST["Nit"];
    $Token = $_REQUEST["Token"];
    // $Data = "[".$_REQUEST["Data"]."]";
    $Data = $_REQUEST["Data"];
        // $json = json_decode($_REQUEST["Data"]);
        // // $jsonConsulta = [
        // //     $json
        // // ];
        // echo "[".$Data."]";
        // echo $Nit."--".$Token."--".$Data;
        // echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Direccionamiento/$Nit/$Token";


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
        echo $response;
    }
    break;

case 'putdireccionamiento':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

    $Nit = $_REQUEST["Nit"];
    $Token = $_REQUEST["Token"];
    $Data = $_REQUEST["Data"];
        // echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Direccionamiento/$Nit/$Token";
    set_time_limit(0);
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/Direccionamiento/890102044/$Token",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "PUT",
      CURLOPT_POSTFIELDS => $Data,
      CURLOPT_HTTPHEADER => array(
        "Accept: */*",
        "Accept-Encoding: gzip, deflate",
        "Cache-Control: no-cache",
        "Connection: keep-alive",
        sprintf("Content-Length: %s", strlen($Data)),
        "Content-Type: application/json",
        "Cookie: cookiesession1=16DA3EFEJ09LNQXZ7XMHPDPI1I6J9194",
        "Host: wsmipres.sispro.gov.co",
        "Postman-Token: bfb4e5ad-dd2a-4e12-bbbb-fe58f8382214,e6d72acc-73f2-4874-a832-0fb3d39173f7",
        "User-Agent: PostmanRuntime/7.20.1",
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
    }
    break;

case 'putnodireccionamiento':
     
            stream_context_set_default([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
    
        $Nit = $_REQUEST["Nit"];
        $Token = $_REQUEST["Token"];
        $Data = $_REQUEST["Data"];
        
        set_time_limit(0);
        $curl = curl_init();
    
        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/NODireccionamiento/890102044/$Token",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_SSL_VERIFYHOST => 0,
          CURLOPT_SSL_VERIFYPEER => 0,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "PUT",
          CURLOPT_POSTFIELDS => $Data,
          CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            sprintf("Content-Length: %s", strlen($Data)),
            "Content-Type: application/json",
            "Cookie: cookiesession1=16DA3EFEJ09LNQXZ7XMHPDPI1I6J9194",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: bfb4e5ad-dd2a-4e12-bbbb-fe58f8382214,e6d72acc-73f2-4874-a832-0fb3d39173f7",
            "User-Agent: PostmanRuntime/7.20.1",
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
        }
        break;
    
    case 'p_detalledir':
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $Token = $_REQUEST["Token"];
    $Dir = $_REQUEST["direccionamiento"];
    $Nit = $_REQUEST["Nit"];
    set_time_limit(0);
    $curl = curl_init();
    curl_setopt_array($curl, array(

        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/SuministroXPrescripcion/$Nit/$Token/$Dir",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
            "User-Agent: PostmanRuntime/7.15.2",
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
    }
    break;

    case 'obtenerToken':
        stream_context_set_default([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
        $Token = $_REQUEST["Token"];
        $Nit = $_REQUEST["Nit"];

        $url = "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/GenerarToken/$Nit/$Token";
        $contents = str_replace("\"", "", file_get_contents($url, true));
        echo $contents;
        break;
     
        //OBTENERDIRECCIONAMIENTOSPORPRESCRIPCION
        case 'obtener_por_no':
        stream_context_set_default([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
        $Numero = $_REQUEST["Numero"];
        $Token = $_REQUEST["Token"];
        $Nit = $_REQUEST["Nit"];
        
        set_time_limit(0);
        $curl = curl_init();
        curl_setopt_array($curl, array(
        
            CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/DireccionamientoXPrescripcion/$Nit/$Token/$Numero",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_TIMEOUT => 300000,
            CURLOPT_HTTPHEADER => array(
                "Accept: */*",
                "Accept-Encoding: gzip, deflate",
                "Cache-Control: no-cache",
                "Connection: keep-alive",
                "Host: wsmipres.sispro.gov.co",
                "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
                "User-Agent: PostmanRuntime/7.15.2",
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
        }
        break;
           
    
    
    case 'ObtenerFosyga':
        
		$Token = $_REQUEST["Token"];
        $TipoDoc = $_REQUEST["TipoDoc"];
        $NumDoc = $_REQUEST["NumDoc"];
        //$url = "http://52.34.159.170:8080/DataExtractor.svc/Json/ObtenerFosyga/$Token/$TipoDoc/$NumDoc";
        $url = "http://www.personaldataextractor.com/DataExtractor.svc/Json/ObtenerFosyga/$Token/$TipoDoc/$NumDoc";
        $contents = file_get_contents($url, true);
        
        $contents = str_replace('{"ObtenerFosygaResult":', '', $contents);		
        $contents = substr($contents, 0, strlen($contents)-1); 
        		
        $objFosyga = json_encode($contents);               
        echo json_decode($objFosyga);				
	break;
 case 'ObtenerMipres':
        stream_context_set_default([
            'ssl' =>[
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
        $Token = $_REQUEST["Token"];
        $NumPre = $_REQUEST["NumPre"];
        $Nit = $_REQUEST["Nit"];
        
        $url = "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/PrescripcionXNumero/$Nit/$Token/$NumPre";
        $contents = file_get_contents($url, true);
        $objmipres = json_encode($contents);               
        echo json_decode($objmipres);
    break;
    case 'ObtenerProcuraduria':

            $Token = $_REQUEST["Token"];
            $TipoDoc = $_REQUEST["TipoDoc"];
            $NumDoc = $_REQUEST["NumDoc"];

            $url = "http://52.34.159.170:8080/DataExtractor.svc/Json/ObtenerProcuraduria/$Token/$TipoDoc/$NumDoc";
            $contents = file_get_contents($url, true);

            $contents = str_replace('{"ObtenerProcuraduriaResult":', '', $contents);
            $contents = substr($contents, 0, strlen($contents)-1);

            $objProcuraduria = json_encode($contents);
            echo json_decode($objProcuraduria);
    break;

    case 'obtener_por_no':
        stream_context_set_default([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);
        $Numero = $_REQUEST["Numero"];
        $Token = $_REQUEST["Token"];
        $Nit = $_REQUEST["Nit"];
        $estado = $_REQUEST["url"];
        if ($estado == "true") {
            $url = 'DireccionamientoXPrescripcion';
        } else {
            $url = 'NODireccionamientoXPrescripcion';
        }
        // echo "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Numero";
       
        set_time_limit(0);
        
        $curl = curl_init();
        curl_setopt_array($curl, array(

            CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Numero",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTPHEADER => array(
                "Accept: */*",
                "Accept-Encoding: gzip, deflate",
                "Cache-Control: no-cache",
                "Connection: keep-alive",
                "Host: wsmipres.sispro.gov.co",
                "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
                "User-Agent: PostmanRuntime/7.15.2",
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
        }
        break;

}

function get_prescripcion_dia($fecha,$Token,$Nit,$estado){
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
            ///api/Prescripcion/{nit}/{fecha}/{token} 

            CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Prescripcion/890102044/$fecha/$Token", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/Prescripcion/$Nit/$Fecha/$Token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Accept-Encoding: gzip, deflate",
                "Cache-Control: no-cache",
                "Connection: keep-alive",
                "Host: wsmipres.sispro.gov.co",
                "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
                "User-Agent: PostmanRuntime/7.15.2",
                "cache-control: no-cache"
            ),
        ));
    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return "cURL Error #:" . $err;
    } else {
        json_decode($response);
        if(json_last_error()!== JSON_ERROR_NONE){
            return 0;
        }else {
            return $response;
        }

    }
}
function get_direccionamiento_dia($fecha,$Token){
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);

        // if ($estado == "false") {
        //     $url = 'DireccionamientoXFecha';
        // } else {
        //     $url = 'NODireccionamientoXFecha';
        // }

        // // var_dump ($url);
        // echo "https://tablas.sispro.gov.co/WSSUMMIPRESNOPBS/api/$url/890102044/$Token/$Fecha";
        // return $fecha;       

    set_time_limit(0);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/DireccionamientoXFecha/890102044/$Token/$fecha",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: 2c68a155-769b-4b03-9409-f55986b60ff4,192b6cc8-285a-4382-b018-5883299f33c4",
            "User-Agent: PostmanRuntime/7.19.0",
            "cache-control: no-cache"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return "cURL Error #:" . $err;
    } else {
        json_decode($response);
        if(json_last_error()!== JSON_ERROR_NONE){
            return 0;
        }else {
            return $response;
        }
    }
}
?>