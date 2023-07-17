<?php 
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function(); 



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


    function  adjuntos_ftp(){
        require_once('../../config/dbcon.php');
        // require_once('../../config/ftpcon.php');
        // include('../../upload_file/subir_archivo.php');
        include('../../sftp_cloud/UploadFile.php');

        global $request;
        // variables de parametros
        // otras variables
        $hoy = date('dmY');
        $hora = date('h_i_s');
        // $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/ESAA/'.$hoy.'/';  
        $path = 'Autorizaciones/ESAA/'.$hoy.'/';  
       
        list(, $request->achivobase) = explode(';', $request->achivobase); // Proceso para traer el Base64
        list(, $request->achivobase) = explode(',', $request->achivobase); // Proceso para traer el Base64
        $base64 = base64_decode($request->achivobase); // Proceso para traer el Base64
        $file = 'solicitud_aut_afiliado'.'_'.$request->tipodocumento.'_'.$request->documento.'_'.$hora.'.'.$request->ext;
        // file_put_contents('../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
        file_put_contents('../../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    

         $subio = UploadFile($path,$file);          
        //  $subio = subirFTP3($request->achivobase,$path,$name,$request->ext);          
         echo $subio;
      }

      
	
  function p_ui_esaa(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $data = json_decode($request->data);
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_UI_ESAA(:v_psolicitudesoa, :v_json_row); end;');
    $jsonsolcitud = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_psolicitudesoa', $jsonsolcitud, -1, OCI_B_CLOB);
    $jsonsolcitud->writeTemporary($request->data);
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
  
 
  function p_obtener_solicitud_esaa(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $data = json_decode($request->data);
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SOLICITUD_AFILIADO(:v_psolicitudesaa, 
                                                              :v_json_row); end;');
    $jsonsolcitud = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_psolicitudesaa', $jsonsolcitud, -1, OCI_B_CLOB);
    $jsonsolcitud->writeTemporary($request->data);
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
  
  
  function p_obtener_departamentos_sol_aut (){
    require_once('../../config/dbcon_prod.php');
    global $request;    
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_obtener_departamentos_sol_aut(:v_ubicacion,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);
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

  function p_obtener_municipios_sol_aut (){
    require_once('../../config/dbcon_prod.php');
    global $request;    
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_obtener_municipios_sol_aut(:v_departamento,:v_estado,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_departamento',$request->departamento);
    oci_bind_by_name($consulta,':v_estado',$request->estado);
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

  function p_obtener_detalle_municipio_sol_aut (){
    require_once('../../config/dbcon_prod.php');
    global $request;    
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_obtener_detalle_municipio_sol_aut(:v_municipio,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_municipio',$request->municipio);    
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

  function p_llamar_sol_aut_afiliados (){    
      require_once('../../config/dbcon_prod.php');
      global $request;    
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_llamar_sol_aut_afiliados(:v_pseccional,:vp_estado,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pseccional',$request->seccional);
      oci_bind_by_name($consulta,':vp_estado',$request->estado);
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

    
    function p_liberar_sol_aut_afiliados (){
      require_once('../../config/dbcon.php');
      global $request;
      $numero = $request->numero;  
      // $ubicacion = $request->ubicacion;    
      // :v_ubicacion,
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.p_liberar_sol_aut_afiliados(:v_numero,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_numero',$numero);
      // oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);    
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
    

  function p_obtener_datos_basicos_afi (){    
      require_once('../../config/dbcon_prod.php');
      global $request;    
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DATOS_BASICOS_AFI(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_ptipodocumento',$request->tipodocumento);
      oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
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

    function descargarfile (){  
      global $request;
      $fileexists = false;
      if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
          require_once('../config/ftpcon.php'); $fileexists = true;
        }
      if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
        require_once('../config/sftp_con.php'); $fileexists = true;
      }

      if($fileexists) {
        $file_size = ftp_size($con_id, $request->ruta);
        if ($file_size != -1) {
          $ruta = $request->ruta;
          $name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
          $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
          $name = $name . '.' . $ext;
          $local_file = '../../temp/' . $name;
          $handle = fopen($local_file, 'w');
          if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
            echo $name;
          } else {
            echo "0 - Error Al descargar el archivo";
          }
          ftp_close($con_id);
          fclose($handle);
        } else {
          echo "0 - Error Archivo no existe";
        }
      } else {
        require('../../sftp_cloud/DownloadFile.php');
        echo( DownloadFile($request->ruta) );
        // echo( DownloadFile($request->ruta) );
      }


    }


    function lista_departamento() {
      global $request;
      require_once('../../config/dbcon_prod.php');
      $coincidencia = $request->coincidencia;
      $cursor = oci_new_cursor($c);
      $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_departamento(:v_coincidencia, :v_response); end;');
      oci_bind_by_name($consulta,':v_coincidencia',$coincidencia);
      oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
      oci_execute($consulta);
      oci_execute($cursor, OCI_DEFAULT);
      $datos = null;
      oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
      oci_free_statement($consulta);
      oci_free_statement($cursor);
      $formatted = [];
      echo json_encode(count($datos) === 0 ? null : $datos);
      exit;
  }
  function lista_municipio () {
      global $request;
      require_once('../../config/dbcon_prod.php');
      $departamento = $request->departamento;
      $coincidencia = $request->coincidencia;
      $cursor = oci_new_cursor($c);
      $consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_lista_municipio(:v_departamento, :v_coincidencia, :v_response); end;');
      oci_bind_by_name($consulta,':v_departamento',$departamento);
      oci_bind_by_name($consulta,':v_coincidencia',$coincidencia);
      oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
      oci_execute($consulta);
      oci_execute($cursor, OCI_DEFAULT);
      $datos = null;
      oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
      oci_free_statement($consulta);
      oci_free_statement($cursor);
      $formatted = [];
      echo json_encode(count($datos) === 0 ? null : $datos);
      exit;
  }

  function Obtener_Seguimiento (){
    require_once('../../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.g_semaforo_municipio(:p_vmunicipio,:v_json_row); end;');
    oci_bind_by_name($consulta,':p_vmunicipio', $request->municipio);
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
?>
