<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


    function p_consulta_autorizaciones_avanzado_eps_ips(){
        require_once('../../config/dbcon.php');
        global $request;
      
        $consulta = oci_parse($c,'BEGIN PQ_AUT_PRESTACION.P_CONSULTA_AUTORIZACIONES_AVANZADO_EPS_IPS(:v_pautorizacion,
                                                                              :v_json_row); end;');
      
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
        $jsonin->writeTemporary($request->autorizacion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
          $json = $clob->read($clob->size());
          echo $json;
        }else{
          echo $clob;
        }
        oci_close($c);
      }

      function Subiradjunto(){
        global $request;
        $path = $request->dir;
        $name= $request->file;
        list(, $request->base64) = explode(';', $request->base64);
        list(, $request->base64) = explode(',', $request->base64);
        $base64 = base64_decode($request->base64);
        file_put_contents('../../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
        $ruta = $path;
        require('../../sftp_cloud/UploadFile.php');
        $subio = UploadFile($ruta, $name);
        if(substr($subio, 0,11) == '/cargue_ftp'){
            echo $subio;
        } else{
            echo json_encode((object) [
                'codigo' => -1,
                'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
            ]);
        }
    }
    function p_u_actualiza_fecha_prestacion_eps_ips(){
        require_once('../../config/dbcon.php');
          global $request;
          if(isset($request->soporte_ips)){
            $hoy = date('dmY');
            $hora = date('h_i_s');
            $path = 'GestionPrestacion/'.$hoy;
            $name= $hoy.$hora.'.'.$request->extension;
            list(, $request->soporte_ips) = explode(';', $request->soporte_ips);
            list(, $request->soporte_ips) = explode(',', $request->soporte_ips);
            $base64 = base64_decode($request->soporte_ips);
            file_put_contents('../../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
            $ruta = $path;
            require('../../sftp_cloud/UploadFile.php');
            $subio = UploadFile($ruta, $name);
          }else{
            $subio = "";
          }
        $consulta = oci_parse($c,'BEGIN PQ_AUT_PRESTACION.P_U_ACTUALIZA_FECHA_PRESTACION_EPS_IPS(
                                                                              :v_pruta,
                                                                              :v_pautorizacion,
                                                                              :v_json_row); end;');
        oci_bind_by_name($consulta,':v_pruta', $subio);   
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
        $jsonin->writeTemporary($request->autorizacion);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
          $json = $clob->read($clob->size());
          echo $json;
        }else{
          echo $clob;
        }
        oci_close($c);
      }


    function GestionIps(){   
        require_once('../../config/dbcon.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_AUT_PRESTACION.P_LISTA_GESTION_IPS(:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit', $request->nitips);    
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

    function GestionPrestacionIps(){   
        require_once('../../config/dbcon.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_AUT_PRESTACION.P_LISTA_GESTION_PRESTACION_IPS(:v_pnit,:v_pinicial,:v_pfinal,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit', $request->nitips);    
        oci_bind_by_name($consulta,':v_pinicial', $request->fechainicio);    
        oci_bind_by_name($consulta,':v_pfinal', $request->fechafin);    
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


    function ListarAutPss(){   
        require_once('../../config/dbcon.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_AUT_PRESTACION.p_lista_aut_pss(:v_pnit,:v_pinicial,:v_pfinal,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit', $request->nitips);    
        oci_bind_by_name($consulta,':v_pinicial', $request->fechainicio);    
        oci_bind_by_name($consulta,':v_pfinal', $request->fechafin);    
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