<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function obtenerServicios(){
    require_once('../../config/dbcon.php');
    global $request;
		$contrato = $request->contrato;
    $tipo = $request->tipo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_SERVICIO(:v_pcontrato,:v_ptipo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
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
  function obtenerContratos(){
    require_once('../../config/dbcon.php');
    global $request;
    $nit = $request->nit;
    $regimen = $request->regimen;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_CONTRATO(:v_ptercero,:v_pregimen,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptercero',$nit);
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
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
  function obtenerDiagnostico(){
    require_once('../../config/dbcon.php');
    global $request;
    $codigo = $request->codigo;
    $sexo = $request->sexo;
    $edad = $request->edad;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcie10',$codigo);
    oci_bind_by_name($consulta,':v_psexo',$sexo);
    oci_bind_by_name($consulta,':v_pedad',$edad);
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
  function obtenerNombreIps(){
    require_once('../../config/dbcon.php');
    global $request;
    $ips = $request->ips;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_IPS(:v_pips,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pips',$ips);
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
  // function obtenerProducto(){   
  //   require_once('../../config/dbcon.php');
  //   global $request;
  //   $regimen = $request->regimen;
  //   $contrato = $request->contrato;
  //   $producto = $request->producto;
  //   $clasificacion = $request->clasificacion;
  //   $ubicacion = $request->ubicacion;
  //   $tipo = $request->tipo;
  //   $edad = $request->edad;
  //   $sexo = $request->sexo;
  //   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO(:v_pcodigo,:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_pprogramada,:v_pedad, :v_psexo,:v_json_row); end;');
  //   oci_bind_by_name($consulta,':v_pregimen',$regimen);
  //   oci_bind_by_name($consulta,':v_pcontrato',$contrato);
  //   oci_bind_by_name($consulta,':v_pcodigo',$producto);
  //   oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);
  //   oci_bind_by_name($consulta,':v_pprogramada',$tipo);
  //   oci_bind_by_name($consulta,':v_pedad',$edad);
  //   oci_bind_by_name($consulta,':v_psexo',$sexo); 
  //   //oci_bind_by_name($consulta,':v_pubicacion_solicitud',$ubicacion);
  //   $clob = oci_new_descriptor($c,OCI_D_LOB);
  //   oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  //   oci_execute($consulta,OCI_DEFAULT);
  //   if (isset($clob)) {
  //     $json = $clob->read($clob->size());
  //     echo $json;
  //   }else{
  //     echo 0;
  //   }
  //   oci_close($c);
    
  // }
  function obtenerProducto(){   
    require_once('../../config/dbcon.php');
    global $request;
    $regimen = $request->regimen;
    $contrato = $request->contrato;
    $producto = $request->producto;
    $clasificacion = $request->clasificacion;
    $ubicacion = $request->ubicacion;
    $tipo = $request->tipo;
    $edad = $request->edad;
    $sexo = $request->sexo;
    $tipodocumentoafiliado = isset($request->tipodocumentoafiliado) ? $request->tipodocumentoafiliado : '';
    $documentoafiliado = isset($request->documentoafiliado) ? $request->documentoafiliado : '';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO(:v_pcodigo,:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_pprogramada,:v_pedad, :v_psexo,:v_ptipodocumento,:v_pnumerodocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_pcodigo',$producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);
    oci_bind_by_name($consulta,':v_pprogramada',$tipo);
    oci_bind_by_name($consulta,':v_pedad',$edad);
    oci_bind_by_name($consulta,':v_psexo',$sexo); 
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumentoafiliado);
    oci_bind_by_name($consulta,':v_pnumerodocumento',$documentoafiliado);
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
	function ConsultarAfiliado(){
		require_once('../../config/dbcon.php');
		global $request;
		$tipo = $request->tipo;
		$numero = $request->numero;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_INFORMACION_BASICA_AFILIADO(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipodocumento',$tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$numero);
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
  function obtenerafiliados(){
      require_once('../../config/dbcon.php');
      global $request;
      $tipodocumento = $request->tipodocumento;
      $documento     = $request->documento;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
      oci_bind_by_name($consulta,':v_pdocumento',$documento);
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
  function obtenerTutelas(){
      require_once('../../config/dbcon.php');
      global $request;
      $tipodocumento = $request->tipodocumento;
      $documento     = $request->documento;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_TUTELA(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
      oci_bind_by_name($consulta,':v_pdocumento',$documento);
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
  function obtenerSiniestro(){
      require_once('../../config/dbcon.php');
      global $request;
      $tipodocumento = $request->tipodocumento;
      $documento     = $request->documento;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_SINIESTRO(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
      oci_bind_by_name($consulta,':v_pdocumento',$documento);
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
  function obtenerAutorizaciones(){
      require_once('../../config/dbcon.php');
      global $request;
      $documento = $request->documento;
      $numero     = $request->numero;
      $ubicacion     = $request->ubicacion;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUTORIZACIONES_DEMO(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pdocumento',$documento);
      oci_bind_by_name($consulta,':v_pnumero',$numero);
      oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
  function ProcesaAnulaAutorizacion(){
      require_once('../../config/dbcon.php');
      global $request;
      $documento = 'AS';
      $numero    = $request->numero;
      $ubicacion = $request->ubicacion;
      $empresa   = 1;
      $operacion = $request->operacion;
      $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_confirma_aut_sal_json(:v_pempresa,
                                                                                 :v_pdocumento,
                                                                                 :v_pnumero,
                                                                                 :v_pubicacion,
                                                                                 :v_poperacion,
                                                                                 :v_pjson_row); end;');
      oci_bind_by_name($consulta,':v_pempresa',$empresa);
      oci_bind_by_name($consulta,':v_pdocumento',$documento);
      oci_bind_by_name($consulta,':v_pnumero',$numero);
      oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
      oci_bind_by_name($consulta,':v_poperacion',$operacion);
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

  function BuscarProducto(){
    require_once('../../config/dbcon.php');
    global $request;
    $coincidencia   = $request->coincidencia;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_BUSCAR_PRODUCTOS(:v_pcoincidencia,
                                                                          :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
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
  function ObtenerEspecialidades(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_ESPECIALIDADES(:v_json_row); end;');
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
  function insertarDetalleAut(){
    require_once('../../config/dbcon.php');
    global $request;
    $productos = $request->productos;
    $cantidad = $request->cantidad;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $documento = 'AS';
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_UI_DETALLE_AUT_WEB(:v_pproductos,
                                                                                :v_pcantidad,
                                                                                :v_pdocumento,
                                                                                :v_pnumero,
                                                                                :v_pubicacion,
                                                                                :v_pjson_row); end;');
    $jsonproductos = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pproductos', $jsonproductos, -1, OCI_B_CLOB);
    $jsonproductos->writeTemporary($productos);
    oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }


  
  function insertarAutorizacion(){
    require_once('../../config/dbcon.php');
    global $request;
    $data = json_decode($request->autorizacion);
    $documento  = 'AS';
    $valdefecto = 0;
    $ubicacion="";
    $fuente='G';
    $data->hostname =   gethostbyaddr($_SERVER['REMOTE_ADDR']);  
     if($data->numero=='0') {
        $valdefecto = 0;
     }else{
        $valdefecto = $data->numero;
    }

    $data = json_encode($data);

    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_UI_CABEZA_AUT_WEB(:v_pautorizacion,
                                                                          :v_pjson_row); end;');

    $jsonin = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
    $jsonin->writeTemporary($request->autorizacion);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }
  function insertarAutorizacionEntregas(){
    require_once('../../config/dbcon.php');
    global $request;
    $data = json_decode($request->autorizacion);
    $jsonproductos = json_decode($request->productos);
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_INSERTAR_PRODUCTO_MED(:v_pautorizacion,
                                                               :v_pproductos,
                                                               :v_pcantproducto,                                                                                                                                                                                                                                                           
                                                               :v_pjson_row); end;');
    $aut = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pautorizacion', $aut, -1, OCI_B_CLOB);
    $aut->writeTemporary($request->autorizacion);     
    $jsonproductos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pproductos', $jsonproductos, -1, OCI_B_CLOB);
		$jsonproductos->writeTemporary($request->productos);     
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    
    oci_bind_by_name($consulta,':v_pcantproducto',$request->cantidad);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }
  


  //=================== NUEVO =================//

  function obtener_Uautorizaciones(){
		require_once('../../config/dbcon.php');
		global $request;
		$numero = $request->numero;
    $ubicacion = $request->ubicacion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_AUTORIZACIONES(:v_pnumero,:v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
  function obtener_novedades(){
		require_once('../../config/dbcon.php');
		global $request;
		$documento = $request->documento;
    $tipodocumento = $request->tipodocumento;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_NOVEDADES(:v_pdocumento,:v_ptipodocumento,:v_pjson_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
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

  function obtener_capita (){
    require_once('../../config/dbcon.php');
		global $request;
		$tipo = $request->tipodocumento;
    $documento = $request->documento;
		$consulta = oci_parse($c,'BEGIN pq_genesis_ca.p_mostrar_escenarios(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipo);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
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
  function obtener_especialidad (){
    require_once('../../config/dbcon.php');
		global $request;
		$nit = $request->nit;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_ESPECIALIDAD(:v_pnit,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
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
  function obtener_soportes(){
    require_once('../../config/dbcon.php');
		global $request;
    $tipo = $request->tipodocumento;
    $documento = $request->documento;
		$consulta = oci_parse($c,'BEGIN pq_genesis_ca.p_mostrar_soporte_doc(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptipo_documento',$tipo);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    
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


  function subirArchivoAut(){
    //echo 1;
    
    require('../../config/dbcon_prod.php');
     require('../../upload_file/subir_archivo.php');
    $subir="";
    //aisjdaoisd
    global $request;	
        if ($request->ext) {
          $file = $request->file;
          $ext = $request->ext;
          $numero = $request->num;
          $ubicacion = $request->ubicacion;                    
          $arhivo =  'AUT'.'-'. $numero .'-'. $ubicacion;		
          $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Web/';  

          $subir = subirFTP3($file,$path,$arhivo,$ext);
          
          
          	// $subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);

          //  $ext= $json_data->ext;
            // $dia = date("dmY");
            // $day = date("dmY_His");
         /* $name= $arhivo.'.'.$ext;
          // $file=$request->pqrFile;
          list(, $file) = explode(';', $file);
          list(, $file) = explode(',', $file);
          $base64 = base64_decode($file);
          file_put_contents('../../../temp/'.$name, $base64); 
        
          $ruta = 'Autorizaciones/Web';
          require('../../sftp_cloud/UploadFile.php');
          $subio = UploadFile($ruta, $name);
          if(substr($subio, 0,11) == '/cargue_ftp'){
             echo $subio;
            //echo $bd_response;
          } else{
            echo json_encode((object) [
              'codigo' => -1,
              'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
            ]);
          }*/

    
        }else{
         echo 'Extension vacia';
        }
        if ($subir) {
          echo $subir;
        }         
  }  


  function subirArchivoAutPro(){
    require_once('../../config/dbcon_prod.php');
    require_once('../../upload_file/subir_archivo.php');
    global $request;	
        if ($request->ext) {
          $file = $request->file;
          $ext = $request->ext;
          $numero = $request->num;
          $ubicacion = $request->ubicacion;                    
          $arhivo =  'PRO'.'-'. $numero .'-'. $ubicacion;		
          $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Pro/';
          $subir = subirFTP3($file,$path,$arhivo,$ext);          
        }else{
         echo 'Extension vacia';
        }
        if ($subir) {
          echo $subir;
        }         
  }  

  function insertarAdjunto(){
    require_once('../../config/dbcon.php');
    global $request;
    $documento  = 'AS';  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_I_ADJUNTO_EAUT(:v_pdocumento,
                                                                      :v_pnumero,        
                                                                      :v_pubicacion,
                                                                      :v_padjunto, 
                                                                      :v_pcantidad,
                                                                      :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->num);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    $adjuntoaut = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_padjunto', $adjuntoaut, -1, OCI_B_CLOB);
    $adjuntoaut->writeTemporary($request->file); 
    oci_bind_by_name($consulta,':v_pcantidad',$request->cantidad);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }
  function insertarAdjuntoPro(){
    require_once('../../config/dbcon.php');
    global $request;
    $documento  = 'AZ';  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_I_ADJUNTO_EAUT_PROG(:v_pdocumento,
                                                                      :v_pnumero,        
                                                                      :v_pubicacion,
                                                                      :v_padjunto, 
                                                                      :v_pcantidad,
                                                                      :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->num);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    $adjuntoaut = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_padjunto', $adjuntoaut, -1, OCI_B_CLOB);
    $adjuntoaut->writeTemporary($request->file); 
    oci_bind_by_name($consulta,':v_pcantidad',$request->cantidad);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }
  function acualizarAdjunto(){
    require_once('../../config/dbcon.php');
    global $request;
    $documento  = 'AS';  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_ADJUNTO_EAUT(:v_pdocumento,
                                                                       :v_pnumero,         
                                                                       :v_pubicacion,
                                                                       :v_pcodigo_adj,
                                                                       :v_pruta_adj,
                                                                       :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->num);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
		oci_bind_by_name($consulta,':v_pcodigo_adj',$request->codadjunto);    
    oci_bind_by_name($consulta,':v_pruta_adj',$request->ruta);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }

  function acualizarAdjuntopro(){
    require_once('../../config/dbcon.php');
    global $request;
    $documento  = 'AS';  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_ADJUNTO_EAUT_PROG(:v_pdocumento,
                                                                       :v_pnumero,         
                                                                       :v_pubicacion,
                                                                       :v_pcodigo_adj,
                                                                       :v_pruta_adj,
                                                                       :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->num);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
		oci_bind_by_name($consulta,':v_pcodigo_adj',$request->codadjunto);    
    oci_bind_by_name($consulta,':v_pruta_adj',$request->ruta);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo $clob;
    }
    oci_close($c);
  }

  function obtener_aut_anuladas (){
    require_once('../../config/dbcon.php');
    global $request;
    $tipo = $request->tipodocumento;  
    $documento = $request->documento; 
    $nit = $request->nit;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_AUTORIZACIONES_ANULADAS(:v_ptipodocumento,:v_pdocumento,:v_pnit,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipo);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnit',$nit);
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

 
  function listaProducto(){   
    require_once('../../config/dbcon.php');
    global $request;
    $regimen = $request->regimen;
    $contrato = $request->contrato;
    $clasificacion = $request->clasificacion;
    $edad = $request->edad;
    $sexo = $request->sexo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_lista_productos(:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_pedad, :v_psexo,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);  
    oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);    
    oci_bind_by_name($consulta,':v_pedad',$edad);
    oci_bind_by_name($consulta,':v_psexo',$sexo);     
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

  
  function obtenerServiciosips(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $contrato = $request->contrato;
    $tipo  = $request->tipo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_SERVICIO_PRO(:v_pcontrato,:v_ptipo,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcontrato',$contrato);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
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

  function obtener_detalle_programada(){
		require_once('../../config/dbcon.php');
		global $request;
		$numero = $request->numero;
    $ubicacion = $request->ubicacion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_AUT_PROG(:v_pnumero,:v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
  function p_obtener_departamentos_pro(){
		require_once('../../config/dbcon.php');
		global $request;		
    $ubicacion = $request->sessional;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_obtener_departamentos_pro(:v_ubicacion,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);
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
  function p_obtener_municipios_pro(){
		require_once('../../config/dbcon.php');
		global $request;		
    $ubicacion = $request->sessional;
    $estado = $request->estado;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_obtener_municipios_pro(:v_departamento,:v_estado,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_departamento',$ubicacion);
    oci_bind_by_name($consulta,':v_estado',$estado);
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
  function p_obtener_detalle_municipio_pro(){
		require_once('../../config/dbcon.php');
		global $request;		
    $ubicacion = $request->sessional;   
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_obtener_detalle_municipio_pro(:v_municipio,:v_json_res); end;');
    oci_bind_by_name($consulta,':v_municipio',$ubicacion);    
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

  function BuscarProductoIps(){
    require_once('../../config/dbcon.php');
    global $request;
    $coincidencia   = $request->coincidencia;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_BUSCAR_PRODUCTOS_AUD(:v_pcoincidencia,
                                                                          :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
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
  function obtener_seccionales_pro_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MUN_AUTORIZACIONESPRO_ACTIVAS(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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

  function obtener_pro_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_SOLPROGRAMADAS(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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

  function obtener_solicitudes_pro (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
    $estado = $request->estado;
    $nit = $request->nit;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LLAMAR_SOLPROGRAMADAS(:v_pseccional,:vp_estado,:vp_nit, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
    oci_bind_by_name($consulta,':vp_estado',$estado);
    oci_bind_by_name($consulta,':vp_nit',$nit);
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

  function liberar_solicitud_pro (){
    require_once('../../config/dbcon.php');
    global $request;
    $numero = $request->numero;  
    $ubicacion = $request->ubicacion;    
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LIBERAR_PROGRAMADA(:v_numero,:v_ubicacion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_numero',$numero);
    oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);    
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
  
  function anular_aut_programda (){
    require_once('../../config/dbcon.php');
    global $request;     
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_ANULAR_AUTPRO(:v_pnumero, :v_pubicacion, :v_pobservacion, :v_pjustificacion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);
    oci_bind_by_name($consulta,':v_pjustificacion',$request->justificacion);
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

  function save_aut_pertinenciaprog (){
    require_once('../../config/dbcon.php');
    global $request;     
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_MARCAR_PERTINENCIA_AUTPRO(:v_pnumero, :v_pubicacion, :v_pertinencia, :v_justificacion_pert,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    oci_bind_by_name($consulta,':v_pertinencia',$request->pertinencia);
    oci_bind_by_name($consulta,':v_justificacion_pert',$request->justificacion);
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

  function obtener_aut_ips (){
    require_once('../../config/dbcon.php');
    global $request;     
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUT_IPS(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ips, :v_json_row); end;');    
    oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
    oci_bind_by_name($consulta,':v_ips',$request->nit);
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


  function obtener_aut_auditor (){
    require_once('../../config/dbcon.php');
    global $request;     
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUTORIZACIONES_PROGRAMADAS(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pnit,:v_pusuario_ubicacion, :v_json_row); end;');    
    oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);    
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    oci_bind_by_name($consulta,':v_pusuario_ubicacion',$request->usu_ubicacion);
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
  //techo
  function obtener_techo (){
    require_once('../../config/dbcon.php');
		global $request;
    $anno = $request->anno;
    $periodo = $request->periodo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_TECHO(:v_panno,:v_pperiodo,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
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
  function actualizar_techo (){
    require_once('../../config/dbcon.php');
		global $request;
    $seccional = $request->seccional;
    $anno = $request->anno;
    $valor = $request->valor;
    $accion = $request->accion;
    $periodo = $request->periodo;
    $opcion = $request->opcion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_ACTUALIZA_TECHO(:v_pseccional,:v_panno,:v_pperiodo,:v_pvalor, :v_paccion,:v_popcion,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
    oci_bind_by_name($consulta,':v_pvalor',$valor);
    oci_bind_by_name($consulta,':v_paccion',$accion);
    oci_bind_by_name($consulta,':v_popcion',$opcion);
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

  function obtener_detalle_techo (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->seccional;
    $tipo = (int)$request->tipo;
    $anno = $request->anno;
    $periodo = $request->periodo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_AUD_TECHO(:v_pseccional,:v_ptipo,:v_panno,:v_pperiodo,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
    oci_bind_by_name($consulta,':v_panno',$anno);      
    oci_bind_by_name($consulta,':v_pperiodo',$periodo);
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

  
  

  function obtener_seccionales_aut_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MUN_AUTORIZACIONES_ACTIVAS_2(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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
  function obtener_aut_activas (){
    require_once('../../config/dbcon.php');
    global $request;
    $seccional = $request->sessional;  
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_AUTORIZACIONES_ACTIVAS_2(:v_pseccional,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pseccional',$seccional);
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
  //Inserts
  function insertarSolicitudaut(){
    require_once('../../config/dbcon.php');
    global $request;
    $data = json_decode($request->solicitud);  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_UI_AUTPRO(:v_pubicacion,
                                                                  :v_pnumero,
																					                        :v_ptipo_documento_afiliado,
																					                        :v_pdocumento_afiliado,
																																	:v_pcorreo_afiliado,
																																	:v_pcelular_afiliado,
																					                        :v_pdiagnostico_ppal,
																					                        :v_pdiagnostico_sec,
																					                        :v_pcod_servicio,
																					                        :v_pfecha_orden,
                                                                  :v_pjustificacion,
                                                                  :v_pobservacion,
                                                                  :v_pnit,
                                                                  :v_paccion,
																					                        :v_pnit_solicitante,
																					                        :v_presponsable,
																																	:v_pcontrato,
																																	:v_pcontratodocumento,
                                                                  :v_pcontratoubicacion,
                                                                  :v_pfecha_programacion,
                                                                  :v_pdireccion,
                                                                  :v_porigen,
                                                                  :v_ppron_direccion,
                                                                  :v_pftp,
                                                                  :v_palto_costo,
                                                                  :v_pnombre_medico,
                                                                  :v_pespecialidad,
                                                                  :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$data->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$data->ubicacion);
    oci_bind_by_name($consulta,':v_ptipo_documento_afiliado',$data->tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento_afiliado',$data->documento);
		oci_bind_by_name($consulta,':v_pcorreo_afiliado',$data->email);
		oci_bind_by_name($consulta,':v_pcelular_afiliado',$data->celular);
    oci_bind_by_name($consulta,':v_pdiagnostico_ppal',$data->diagcod1);
    oci_bind_by_name($consulta,':v_pdiagnostico_sec',$data->diagcod2);
    oci_bind_by_name($consulta,':v_pcod_servicio',$data->codservicio);
    oci_bind_by_name($consulta,':v_pfecha_orden',$data->fecsolicitudparseada);
    oci_bind_by_name($consulta,':v_pjustificacion',$data->justificacion);
    oci_bind_by_name($consulta,':v_pobservacion',$data->observacion);
    oci_bind_by_name($consulta,':v_pnit',$data->ipscodasignada);
    oci_bind_by_name($consulta,':v_paccion',$data->accion);
    oci_bind_by_name($consulta,':v_pnit_solicitante',$data->ipscodsolicitante);
    oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pcontrato',$data->contrato);
		oci_bind_by_name($consulta,':v_pcontratodocumento',$data->contratoDocumento);
    oci_bind_by_name($consulta,':v_pcontratoubicacion',$data->contratoUbicacion);
    oci_bind_by_name($consulta,':v_pfecha_programacion',$data->fecprogramacionparseada);
    oci_bind_by_name($consulta,':v_pdireccion',$data->direccion);
    oci_bind_by_name($consulta,':v_porigen',$data->origen);
    oci_bind_by_name($consulta,':v_ppron_direccion',$data->pron_direccion);   
    oci_bind_by_name($consulta,':v_pftp',$data->ftp);  
    oci_bind_by_name($consulta,':v_palto_costo',$data->altocosto);  
    oci_bind_by_name($consulta,':v_pnombre_medico',$data->nombremedico);  
    oci_bind_by_name($consulta,':v_pespecialidad',$data->especialidadmedico); 
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }

  function insertarDetalle(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$productos = $request->productos;
		$cantidad = $request->cantidad;
		$numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $accion = $request->accion;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_INSERTAR_PRODUCTO(:v_pproductos,
																																	 				 :v_pcantidad,
																																	 				 :v_pnumero,
                                                                            :v_pubicacion,
                                                                            :v_paccion,
																																	 				 :v_pjson_row); end;');
		$jsonproductos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pproductos', $jsonproductos, -1, OCI_B_CLOB);
		$jsonproductos->writeTemporary($productos);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_paccion',$accion);    
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }
  function p_levanta_frecuencia_anual(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.p_levanta_frecuencia_anual(:v_pnumero,
                                                                            :v_pubicacion,
                                                                            :v_autn_motivo_lev_frec,
																																	 				  :v_autc_observacion_frec,
                                                                            :v_autv_usuario_frec,
                                                                            :v_pjson_row); end;');		
		oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
    oci_bind_by_name($consulta,':v_autn_motivo_lev_frec',$request->motivo);
    oci_bind_by_name($consulta,':v_autc_observacion_frec',$request->observacion);  
    oci_bind_by_name($consulta,':v_autv_usuario_frec',$request->responsable);    
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }

  function p_lista_motivosfrecuencia(){
    require_once('../../config/dbcon.php');
    global $request;		
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_MOTIVOSFRECUENCIA(:v_json_row); end;');
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

  function p_mostrar_hijos_epro(){
    require_once('../../config/dbcon.php');
    global $request;    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_MOSTRAR_HIJOS_EPRO(:v_pcodigo_cups,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo_cups',$request->cups);
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

   
  function f_validar_mipres(){
    require_once('../../config/dbcon.php');
    global $request;    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.f_validar_mipres(:p_tipo_doc,:p_doc_afiliado,:p_num_mipres,:v_json_row); end;');
    oci_bind_by_name($consulta,':p_tipo_doc',$request->tipodocumento);
    oci_bind_by_name($consulta,':p_doc_afiliado',$request->documento);
    oci_bind_by_name($consulta,':p_num_mipres',$request->valormipres);
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
  function p_mostrar_cups_vs_dx(){
    require_once('../../config/dbcon.php');
    global $request;    
    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_MOSTRAR_CUPS_VS_DX(:v_pcodigo_cups,:v_filtro_letra,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo_cups',$request->cups);
    oci_bind_by_name($consulta,':v_filtro_letra',$request->letra);    
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


   function p_consulta_autorizaciones(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES(:v_pdocumento,:v_pnumero,:v_pips,:v_pubicacion,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
      oci_bind_by_name($consulta,':v_pnumero',$request->numero);
      oci_bind_by_name($consulta,':v_pips',$request->ips);
      oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
   function p_consulta_autorizaciones_nopbs(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES_NOPBS(:v_pdocumento,:v_pnumero,:v_pips,:v_pubicacion,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
      oci_bind_by_name($consulta,':v_pnumero',$request->numero);
      oci_bind_by_name($consulta,':v_pips',$request->ips);
      oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
function p_obtener_censo(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_CENSO(:v_pafiliado,:v_pprestador,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pafiliado', $request->documento);
      oci_bind_by_name($consulta,':v_pprestador',$request->prestador);      
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

  function p_consulta_autorizaciones_avanzado(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES_AVANZADO(:v_pautorizacion,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->autorizacion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}

  function p_mostrar_hijos_epro_valor(){
    require_once('../../config/dbcon.php');
    global $request;    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_MOSTRAR_HIJOS_EPRO_VALOR(:v_pcodigo_cups,:v_pregimen,:v_pcontrato,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo_cups',$request->cups);
    oci_bind_by_name($consulta,':v_pregimen',$request->regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
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

  
  function p_lista_ips_en_programadas(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_lista_ips_en_programadas(:v_pempresa,:v_json_row); end;');          
      oci_bind_by_name($consulta,':v_pempresa',$request->empresa);
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
function p_lista_cups_ips_en_programadas(){
      require_once('../../config/dbcon.php');
      global $request;
      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_lista_cups_ips_en_programadas(:v_pnit,:v_json_row); end;');          
      oci_bind_by_name($consulta,':v_pnit',$request->ips);
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

  function p_ui_cups_ips_en_programadas(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_UI_CUPS_IPS_EN_PROGRAMADAS(:v_pips_en_programadas,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pips_en_programadas', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->cups);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}


function p_obtener_producto_adm_prog(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO_ADM_PROG(:v_pcodigo,:v_pnit,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);  
  oci_bind_by_name($consulta,':v_pnit',$request->nit);   
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

function p_u_cambia_contrato_ips_programadas(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_CAMBIA_CONTRATO_IPS_PROGRAMADAS(:v_pips_en_programadas,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pips_en_programadas', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->cups);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}

function p_lista_historico_cups_en_programadas(){   
  require_once('../../config/dbcon.php');
  global $request;  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_lista_historico_cups_en_programadas(:v_pnit,:v_pcod_producto,:v_json_row); end;');  
  oci_bind_by_name($consulta,':v_pnit',$request->nit);   
  oci_bind_by_name($consulta,':v_pcod_producto',$request->cod_producto);  
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

function p_consulta_autorizaciones_avanzado_nopbs(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES_AVANZADO_NOPBS(:v_pautorizacion,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->autorizacion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}

function p_consulta_autorizaciones_usuario_avanzado(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES_USUARIO_AVANZADO(:v_pautorizacion,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->autorizacion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}

function p_reversa_aut_nopbs (){
  require_once('../../config/dbcon.php');
  global $request;     
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_REVERSA_AUT(:v_pnumero, :v_pubicacion, :v_pobservacion, :v_pjustificacion,:v_json_row); end;');
  /*$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_REVERSA_AUT_NOPBS(:v_pnumero, :v_pubicacion, :v_pobservacion, :v_pjustificacion,:v_json_row); end;');*/
  oci_bind_by_name($consulta,':v_pnumero',$request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
  oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);
  oci_bind_by_name($consulta,':v_pjustificacion',$request->justificacion);
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

function p_consulta_autorizaciones_gestionadas(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_CONSULTA_AUTORIZACIONES_GESTIONADAS(:v_pautorizacion,
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


function p_gestiona_egreso_aut(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_GESTIONA_EGRESO_AUT(:v_pnumero,:v_pubicacion,:v_pfecha,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnumero', $request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);      
  oci_bind_by_name($consulta,':v_pfecha',$request->fecha);      
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

function p_lista_excepcion_mipres(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.p_lista_excepcion_mipres(:v_json_row); end;');
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


function p_ui_excepcion_mipres(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_UI_EXCEPCION_MIPRES(:v_pexcepcion_mipres,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pexcepcion_mipres', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->mipres);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}


function p_buscar_mipres_procesar(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_AUT_NOPBS.p_buscar_mipres_procesar(:v_pcodigomipres,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pcodigomipres', $request->mipres);  
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
function p_eaut_manual_mipres_nopbs_tecnologia(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MIPRES_AUT_NOPBS.p_eaut_manual_mipres_nopbs_tecnologia(:v_mipres,:v_pnroentrega,:v_tecnologia,:v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_mipres', $request->mipres);  
  oci_bind_by_name($consulta,':v_pnroentrega', $request->nroentrega);  
  oci_bind_by_name($consulta,':v_tecnologia', $request->tecnologia);  
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

function p_registra_traza (){
  require_once('../../config/dbcon.php');
  global $request; 
  $documento = 'AS';    
  $request->host =   gethostbyaddr($_SERVER['REMOTE_ADDR']); 

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_REGISTRA_TRAZA(:v_pdocumento,:v_pnumero, :v_pubicacion, :v_host, :v_ip, :v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_pdocumento',$documento);
  oci_bind_by_name($consulta,':v_pnumero',$request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
  oci_bind_by_name($consulta,':v_host',$request->host);
  oci_bind_by_name($consulta,':v_ip',$request->ip);
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

function p_validar_permisos(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_VALIDAR_PERMISOS(:v_prol,:v_popcion,:v_prespuesta); end;');
  oci_bind_by_name($consulta,':v_prol',$request->rol);
  oci_bind_by_name($consulta,':v_popcion',$request->opcion);  
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

function p_lista_excepcion_error50(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUT.p_lista_excepcion_error50(:v_json_row); end;');
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
function p_ui_excepcion_error50(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_UI_EXCEPCION_ERROR50(:v_pexcepcion_error50,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pexcepcion_error50', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->mipres);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}


function p_obtener_producto_dir(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  $producto = $request->producto;      
  $edad = $request->edad;
  $sexo = $request->sexo;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO_DIR(:v_pcodigo,:v_pedad, :v_psexo,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pcodigo',$producto);
  oci_bind_by_name($consulta,':v_pedad',$edad);
  oci_bind_by_name($consulta,':v_psexo',$sexo);   
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


function p_direccionamiento_autorizaciones(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  
  $consulta = oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_DIRECCIONAMIENTO_AUTORIZACIONES(:V_PPRODUCTO,:V_PTIPO_DOC, :V_PDOCUMENTO,:V_PJSON_OUT); end;');
  oci_bind_by_name($consulta,':V_PPRODUCTO', $request->producto);
  oci_bind_by_name($consulta,':V_PTIPO_DOC', $request->tipodocumento);
  oci_bind_by_name($consulta,':V_PDOCUMENTO',$request->documento);   
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
  
}
function p_obtener_ips_dir(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_IPS_DIR(:v_pnit,:v_pcod_municipio_destino, :v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnit', $request->nit);  
  oci_bind_by_name($consulta,':v_pcod_municipio_destino',$request->municipio);   
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
function p_obtener_soporte_aut(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_OBTENER_SOPORTE_AUT(:v_pnumero,:v_pubicacion, :v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnumero', $request->numero);  
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);   
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

function p_lista_autorizaciones_adjunto(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_AUTORIZACIONES_ADJUNTO(:v_ptipodocumento,:v_pdocumento, :v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipodocumento', $request->tipodocumento);  
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



function p_consulta_autorizaciones_avanzado_eps_ips(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_CONSULTA_AUTORIZACIONES_AVANZADO_EPS_IPS(:v_pautorizacion,
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


function p_u_actualiza_fecha_prestacion_eps_ips(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_U_ACTUALIZA_FECHA_PRESTACION_EPS_IPS(:v_pautorizacion,
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


function p_valida_diagnostico_aut(){   
  require_once('../../config/dbcon.php');
  global $request;
  
  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ACGS.P_VALIDA_DIAGNOSTICO_AUT(:v_pdiagno,:v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_pdiagno', $request->diagno);    
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

function P_CONSULTA_AUTORIZACIONES_GESTIONADAS_UNICA(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_CONSULTA_AUTORIZACIONES_GESTIONADAS_UNICA(:v_pautorizacion,:v_json_row); end;');
  //$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ANTICIPO.P_CONSULTA_AUTORIZACIONES_GESTIONADAS_UNICA(:v_pautorizacion,:v_json_row); end;');
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

// function Generar_Agenda()
// {
//   global $request;
//   $data = json_decode($request->datos, true);
//   $url = 'https://www.curelatam.com/api/private/Aurora/agendar_cita_automatica';
//   // $url = 'https://healthgroup-test-6798383.dev.odoo.com/api/private/Aurora/agendar_cita_automatica';
//   $arrayx = array(
//     'API-KEY: 2VwtfEVxx4dxmql8D?jOvazsUx1pHeYwlS8NlMotBV3',
//     // 'API-KEY: 7K5NMf9i589aU3Ya88KapY6TfmrqX7icLN6MT',
//     'accept: */*'
//   );
//   $curl = curl_init();
   
//   curl_setopt($curl, CURLOPT_POST, 1);
//   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
//   $url = sprintf("%s?%s", $url, http_build_query($data));
//   // OPTIONS:
//   curl_setopt($curl, CURLOPT_URL, $url);
//   curl_setopt($curl, CURLOPT_HTTPHEADER, $arrayx);
//   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//   // EXECUTE:
//   $result = curl_exec($curl);
//   if(!$result){die("Connection Failure");}
//   curl_close($curl);
//   echo $result;
// }

function Generar_Agenda()
{
	global $request;
	$datos = json_decode($request->datos, true);
	// $username =  'secureForm';
	// $password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://www.curelatam.com/api/private/Aurora/agendar_cita_automatica',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		// CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'API-KEY: 2VwtfEVxx4dxmql8D?jOvazsUx1pHeYwlS8NlMotBV3',
			'Content-Type: application/json',
      'accept: */*'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}

function Seguimiento_Detencion()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_AUTPRO.P_seguimineto_detencion_ca(:v_ptipo_doc,:v_pnumero_doc,:V_penvia_json,:v_pRespusta,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_ptipo_doc', $request->tipodocumento);
  oci_bind_by_name($consulta, ':v_pnumero_doc', $request->numerodocumento);
  oci_bind_by_name($consulta, ':V_penvia_json', $request->datosenviados);
  oci_bind_by_name($consulta, ':v_pRespusta', $request->respuestarecibida);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function obtener_techo_consulta(){
  require_once('../../config/dbcon.php');
  global $request;
  $anno = $request->anno;
  $periodo = $request->periodo;
  $consulta = oci_parse($c,'BEGIN oasis.PQ_GENESIS_AUTPRO.P_OBTENER_TECHO_REGIONAL_2023(:v_panno,:v_pperiodo,:v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_panno',$anno);
  oci_bind_by_name($consulta,':v_pperiodo',$periodo);
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
function actualizar_techo_consulta (){
  require_once('../../config/dbcon.php');
  global $request;
  $seccional = $request->seccional;
  $tipo = $request->tipo;
  $anno = $request->anno;
  $valor = $request->valor;
  $accion = $request->accion;
  $periodo = $request->periodo;
  $opcion = $request->opcion;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_ACTUALIZA_TECHO(:v_pseccional,:v_ptipo,:v_panno,:v_pperiodo,:v_pvalor, :v_paccion,:v_popcion,:v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_pseccional',$seccional);
  oci_bind_by_name($consulta,':v_ptipo',$tipo);
  oci_bind_by_name($consulta,':v_panno',$anno);
  oci_bind_by_name($consulta,':v_pperiodo',$periodo);
  oci_bind_by_name($consulta,':v_pvalor',$valor);
  oci_bind_by_name($consulta,':v_paccion',$accion);
  oci_bind_by_name($consulta,':v_popcion',$opcion);
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
