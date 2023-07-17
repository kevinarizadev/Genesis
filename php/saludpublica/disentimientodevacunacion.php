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
      $responsable = $request->responsable;
      $tipodocumento = $request->tipodocumento;
      $documento  = $request->documento;
      
  
      $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_listado_sinvacuna(:v_presponsable,:v_ptipo_doc,:v_pnum_doc,:v_pjson_row ); end;');
      oci_bind_by_name($consulta,':v_presponsable',$responsable);
      oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
      oci_bind_by_name($consulta,':v_pnum_doc',$documento);
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







    function p_listar_disentimiento(){
      require_once('../config/dbcon_prod.php');
      global $request;
      $responsable = $request->responsable;
      $tipodocumento = $request->tipodocumento;
      $documento  = $request->documento;
      
  
      $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_listar_disentimiento(:v_presponsable,:v_ptipo_doc,:v_pnum_doc,:v_pjson_row ); end;');
      oci_bind_by_name($consulta,':v_presponsable',$responsable);
      oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
      oci_bind_by_name($consulta,':v_pnum_doc',$documento);
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

    function descargaAdjunto(){
        require_once('../config/sftp_con.php');
        global $request;
        $name = uniqid();
        $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
        $name = $name.'.'.$ext;
        $local_file = '../../temp/'.$name;
        $handle = fopen($local_file, 'w');
        if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
             echo $name;
        } else {
             echo "Error";
        }
        ftp_close($con_id);
        fclose($handle);
    }

    function descargaAdjunto2(){
      require_once('../config/sftp_con.php');
      global $request;
      $name = uniqid();
      $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
      $name = $name.'.'.$ext;
      $local_file = '../../temp/'.$name;
      $handle = fopen($local_file, 'w');
      if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
           echo $name;
      } else {
           echo "Error";
      }
      ftp_close($con_id);
      fclose($handle);
  }


    function p_procesa_disentimiento(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $responsable = $request->responsable;
        $pafiliado = $request->pafiliado;
        $tipodocumento = $request->tipodocumento;
        $documento  = $request->documento;
        $soporte  = $request->soporte;
        $motivo  = $request->motivo;
        
    
        $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_procesa_disentimiento(:v_presponsable,
                                                                                        :v_pafilid,
                                                                                        :v_ptipo_doc,
                                                                                        :v_pnum_doc,
                                                                                        :v_soporte,
                                                                                        :v_motivo,  
                                                                                        :v_pjson_row ); end;');
        oci_bind_by_name($consulta,':v_presponsable',$responsable);
        oci_bind_by_name($consulta,':v_pafilid',$pafiliado);
        
        oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
        oci_bind_by_name($consulta,':v_pnum_doc',$documento);
        oci_bind_by_name($consulta,':v_soporte',$soporte);
        oci_bind_by_name($consulta,':v_motivo',$motivo);
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



    function p_procesa_consentimiento(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $responsable = $request->responsable;
        $pafiliado = $request->pafiliado;
        $tipodocumento = $request->tipodocumento;
        $documento  = $request->documento;
        $soporte  = $request->soporte;
        $motivo  = $request->motivo;
        $ftp  = $request->ftp;
        
    
        $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_procesa_consentimiento(:v_presponsable,
                                                                                        :v_pafilid,
                                                                                        :v_ptipo_doc,
                                                                                        :v_pnum_doc,
                                                                                        :v_soporte,
                                                                                        :v_motivo,
                                                                                        :v_pftp,
                                                                                        :v_pjson_row ); end;');
        oci_bind_by_name($consulta,':v_presponsable',$responsable);
        oci_bind_by_name($consulta,':v_pafilid',$pafiliado);
        
        oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
        oci_bind_by_name($consulta,':v_pnum_doc',$documento);
        oci_bind_by_name($consulta,':v_soporte',$soporte);
        oci_bind_by_name($consulta,':v_motivo',$motivo);
        oci_bind_by_name($consulta,':v_pftp',$ftp);
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



    ?>


