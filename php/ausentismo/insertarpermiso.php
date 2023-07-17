<?php

$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function insertarpermiso(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $datos = $request->datos;
    $ubicacion =$datos->ubicacion;
    $problema =$datos->problema;
    $motivo =$datos->motivo;
    $emisor =$datos->emisor;
    $fechainicio =$datos->fechainicio;
    $fechaterminacion =$datos->fechaterminacion;
    $nombreadjunto =$datos->nombreadjunto;
    $ruta =$datos->ruta;
    if (empty($datos->zdocumentopermiso)){
      
    }else {
      $archivo = $datos->zdocumentopermiso;

      $path = 'TalentoHumano/Ausentismo';
      $day = date("dmY");
      $hora = date("His");
      $ext= 'pdf';
      $name= $emisor.'_'.$day.'_'.$hora.'.'.$ext;
      $file= $archivo;
      list(, $file) = explode(';', $file);
      list(, $file) = explode(',', $file);
      $base64 = base64_decode($file);
      file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
      $ruta = $path.'/'.$day;
      require('../sftp_cloud/UploadFile.php');
      $subio = UploadFile($ruta, $name);
      if(substr($subio, 0,11) == '/cargue_ftp'){
          // echo $subio;
      } else{
          echo json_encode((object) [
              'codigo' => -1,
              'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
          ]);
      }
    }

  
    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AU.P_INSERTAR_SOLICITUD_ACAS(:v_pubicacion,:v_pproblema,:v_pmotivo,:v_pemisor,:v_pfechainicio,:v_pfechaterminacion,:v_pnombrearchivo,:v_pruta,:v_json_row); end;');
    // Asignamos los valores a los parametros
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_pproblema',$problema);
    oci_bind_by_name($consulta,':v_pmotivo',$motivo);
    oci_bind_by_name($consulta,':v_pemisor',$emisor);
    oci_bind_by_name($consulta,':v_pfechainicio',$fechainicio);
    oci_bind_by_name($consulta,':v_pfechaterminacion',$fechaterminacion);
    oci_bind_by_name($consulta,':v_pnombrearchivo',$nombreadjunto);
    oci_bind_by_name($consulta,':v_pruta',$subio);
  
  
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo '['.$json.']';
    }else{
      echo 0;
    }
    oci_close($c);

  }

 



  



  
?>
