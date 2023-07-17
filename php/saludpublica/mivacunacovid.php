<?php
	session_start();
    $postdata = file_get_contents("php://input");
    // error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();



    function obtenerafiliados(){
      require_once('../config/dbcon_prod.php');
      global $request;
      $tipodocumento = $request->tipodocumento;
      $documento 		 = $request->documento;
      
  
      $consulta = oci_parse($c,'begin pq_genesis_plan_vacunacion.p_consulto_afiliado(:v_tipo_documento,:v_documento,:v_json_res ); end;');
      
      oci_bind_by_name($consulta,':v_tipo_documento',$tipodocumento);
      oci_bind_by_name($consulta,':v_documento',$documento);
      $clob = oci_new_descriptor($c,OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
      oci_execute($consulta,OCI_DEFAULT);
      if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
      }else{
        echo 0;
      }
      oci_close($c);
    }


  function guardar_respuesta(){    
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento = $request->tipodocumento;
    $documento = $request->documento;
    $nitprestador = $request->nitprestador;
    $idasignacion = $request->idasignacion;
    $idagendamiento = $request->idagendamiento;        
    $tipo_asig = $request->tipo_asig;  
    $tipo_origen = $request->tipo_origen;
    $direccion = $request->direccion;
    $telefono = $request->telefono;
    $celular1 = $request->celular1;
    $celular2 = $request->celular2;
    $correo = $request->correo;
    $barrio = $request->barrio;
    $desplazamiento = $request->desplazamiento;



    $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_marca_mivacuna(:v_tipo_documento,
                                          :v_documento,
                                          :v_nit_prestador,
                                          :v_id_asignacion,
                                          :v_id_agendamiento,
                                          :v_tipo,
                                          :v_origen,                                          
                                          :v_direccion,
                                          :v_telefono,
                                          :v_celular1,
                                          :v_celular2,
                                          :v_correo,
                                          :v_barrio,
                                          :v_desplazamiento,


                                          :v_response ); end;');        
    oci_bind_by_name($consulta,':v_tipo_documento',$tipodocumento);
    oci_bind_by_name($consulta,':v_documento',$documento);
    oci_bind_by_name($consulta,':v_nit_prestador',$nitprestador);
    oci_bind_by_name($consulta,':v_id_asignacion',$idasignacion);
    oci_bind_by_name($consulta,':v_id_agendamiento',$idagendamiento);
    oci_bind_by_name($consulta,':v_tipo',$tipo_asig);
    oci_bind_by_name($consulta,':v_origen',$tipo_origen);


    oci_bind_by_name($consulta,':v_direccion',$direccion);
    oci_bind_by_name($consulta,':v_telefono',$telefono);
    oci_bind_by_name($consulta,':v_celular1',$celular1);
    oci_bind_by_name($consulta,':v_celular2',$celular2);
    oci_bind_by_name($consulta,':v_correo',$correo);
    oci_bind_by_name($consulta,':v_barrio',$barrio);
    oci_bind_by_name($consulta,':v_desplazamiento',$desplazamiento);



    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }



	function listaIps(){
        require_once('../config/dbcon_prod.php');
        		
        global $param;
        global $request;
        // $codigo =  '8000';
        // echo $_SESSION['codmunicipio']; 
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c, 'BEGIN pq_genesis_plan_vacunacion.p_prestadores_vacuna(:v_ubicacion,:v_pcoincidencia,:v_response); end;');
        oci_bind_by_name($consulta,':v_ubicacion',$_SESSION['codmunicipio']);
        // oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacionq );
		oci_bind_by_name($consulta,':v_pcoincidencia',$request->keyword);	
		oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
	
		echo json_encode($datos) ;	
	}


    // OBTENER TOKEN PRUEBA////////////////////////////////////////////////////////////////////
    // function obtener_token(){
    //     global $request;
    //     $datos = $request->datos;
    //     $curl = curl_init();
    //     curl_setopt_array($curl, array(
    //       CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/login/autenticar",
    //       CURLOPT_RETURNTRANSFER => true,
    //       CURLOPT_ENCODING => "",
    //       CURLOPT_MAXREDIRS => 10,
    //       CURLOPT_TIMEOUT => 30,
    //       CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    //       CURLOPT_CUSTOMREQUEST => "POST",
    //       CURLOPT_POSTFIELDS => json_encode($datos),
    //       CURLOPT_HTTPHEADER => array(
    //         "cache-control: no-cache",
    //         "content-type: application/json"
    //       ),
    //       CURLOPT_SSL_VERIFYHOST =>0,
    //       CURLOPT_SSL_VERIFYPEER =>0
    //     ));
      
    //     $response = curl_exec($curl);
    //     $err = curl_error($curl);
      
    //     curl_close($curl);
      
    //     if ($err) {
    //       echo "cURL Error #:" . $err;
    //     } else {
    //         // echo $response;
    //         // echo '<br>';
    //         // echo substr($response,1,count($response)-2);
    //         $_SESSION['token_vacunacion'] = substr($response,1,count($response)-2);
    //       echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
    //     //   echo $_SESSION['token_vacunacion'];
    //     }
    //   }


      // OBTENER TOKEN PRODUCCION ////////////////////////////////////////////////////////////////////
      function obtener_token(){
        global $request;
        $datos = $request->datos;
        $curl = curl_init();
        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/login/autenticar",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode($datos),
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
            // echo $response;
            // echo '<br>';
            // echo substr($response,1,count($response)-2);
          //echo ($response);
           //echo '<br>';
          //echo substr($response,1,strlen($response)-2);
            $_SESSION['token_vacunacion'] = substr($response,1,strlen($response)-2);
          echo json_encode(["Codigo" => "0","Nombre" => "Token Guardado"]);
        //   echo $_SESSION['token_vacunacion'];
        }
      }
      

      function RegistrarAgenda(){
        global $request;
        $nit =  '890102044';
        $token = $_SESSION['token_vacunacion'];
        $datos = $request->datos;
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/RegistrarAgendamiento/".$nit."",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "PUT",
        CURLOPT_POSTFIELDS => json_encode($datos),
        CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
        echo $response;
        }
      }

      // function RegistrarAsignacion(){
      //   global $request;
      //   $nit =  '890102044';
      //   $token = $_SESSION['token_vacunacion'];
      //   $datos = $request->datos;
      //   $curl = curl_init();
      //   curl_setopt_array($curl, array(
      //   CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/RegistrarAsignacion/".$nit."",
      //   CURLOPT_RETURNTRANSFER => true,
      //   CURLOPT_ENCODING => "",
      //   CURLOPT_MAXREDIRS => 10,
      //   CURLOPT_TIMEOUT => 30,
      //   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      //   CURLOPT_CUSTOMREQUEST => "PUT",
      //   CURLOPT_POSTFIELDS => json_encode($datos),
      //   CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
      //   CURLOPT_SSL_VERIFYHOST =>0,
      //   CURLOPT_SSL_VERIFYPEER =>0 ));
      //   $response = curl_exec($curl);
      //   $err = curl_error($curl);
      //   $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
      //   curl_close($curl);
      //   if ($err) {
      //     echo "cURL Error #:" . $err;
      //   } else {
      //   echo $response;
      //   }
      // }


      function RegistrarAsignacion(){
        global $request;
        $nit =  '890102044';
        $token = $_SESSION['token_vacunacion'];
        //echo $token;
        $datos = $request->datos;
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/RegistrarAsignacion/".$nit."",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "PUT",
        CURLOPT_POSTFIELDS => json_encode($datos),
        CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
        echo $response;
        }
      }

      function ConsultaxTipo(){
        global $request;        
        $nit = $request->nit;
        // $datainfo = $request->datainfo;
        $tipo = $request->tipo;
        $documento = $request->documento;
        $token = $_SESSION['token_vacunacion'];                
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/ConsultarAsignacionXIdentificacion/".$nit."/tipoIdentificacion/numeroIdentificacion?tipoIdentificacion=".$tipo."&numeroIdentificacion=".$documento,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array( "authorization:".$token."","cache-control: no-cache","content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
      
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
      }


  function ConsultaxTipo_agend(){
        global $request;        
        $nit = $request->nit;
        // $datainfo = $request->datainfo;
        $tipo = $request->tipo;
        $documento = $request->documento;
        $token = $_SESSION['token_vacunacion'];                
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/ConsultarAgendamientoXIdentificacion/".$nit."/tipoIdentificacion/numeroIdentificacion?tipoIdentificacion=".$tipo."&numeroIdentificacion=".$documento,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array( "authorization:".$token."","cache-control: no-cache","content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
      
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
      }


      function ConsultaxFecha(){
        global $request;        
        $nit = $request->nit;
        $fecha = $request->fecha;
        $token = $_SESSION['token_vacunacion'];                
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/ConsultarAsignacionXFechaReg/".$nit."/".$fecha,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array( "authorization:".$token."","cache-control: no-cache","content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));      
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
      }



      function ConsultaxFecha_agend(){
        global $request;        
        $nit = $request->nit;
        $fecha = $request->fecha;
        $token = $_SESSION['token_vacunacion'];                
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmivacuna.sispro.gov.co/WSAgendamiento/api/ConsultarAgendamientoXFechaReg/".$nit."/".$fecha,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array( "authorization:".$token."","cache-control: no-cache","content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));      
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
      }


      function ConsultarAsignacion(){
        global $request;
        $nit =  '890102044';
        $tipoIdentificacion = $request->tipoIdentificacion;
        $numeroIdentificacion = $request->numeroIdentificacion;
        $token = $_SESSION['token_vacunacion'];        
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/RegistrarAsignacion/".$nit."",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        // CURLOPT_POSTFIELDS => json_encode($datos),
        CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
        echo $response;
        }
      }

      function AnularAgendamiento(){
        global $request;
        $nit = $request->nit;
        $token = $request->token;
        $datos = $request->datos;
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/AnularAgendamiento/".$nit."",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "PUT",
        CURLOPT_POSTFIELDS => json_encode($datos),
        CURLOPT_HTTPHEADER => array( "authorization:".$token."", "cache-control: no-cache", "content-type: application/json" ),
        CURLOPT_SSL_VERIFYHOST =>0,
        CURLOPT_SSL_VERIFYPEER =>0 ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
        echo $response;
        }
      }

    
    function obtener_tokenss(){
        global $request;
        $Data = $request->Data;
        set_time_limit(0);
        $curl = curl_init();
      
    
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://tablas.sispro.gov.co/WSAgendamiento/api/login/autenticar",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER=> false,
            CURLOPT_SSL_VERIFYHOST=>false,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
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
  
  
    ?>

