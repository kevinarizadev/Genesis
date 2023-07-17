<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function actualizarprint(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_ACTUALIZA_IMPRESION(:v_pnumero,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_prespuesta',$respuesta,20);
		 oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}
	function cerrarimpresion(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_CIERRA_IMPRESION(:v_pnumero,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_prespuesta',$respuesta,20);
		 oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}

    function cerrarimpresionsinmanual(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_CIERRA_IMPRESION_SIN_MANUAL(:v_pnumero,:v_pubicacion,:v_prespuesta); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);  
        oci_bind_by_name($consulta,':v_prespuesta',$respuesta,20);
         oci_execute($consulta,OCI_DEFAULT);
        echo $respuesta;
        oci_close($c);
    }


	function ProcesaAnulaAutorizacion(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero    = $request->numero;
    $ubicacion = $request->ubicacion;
    $observacion =$request->observacion;
    $justificacion = $request->justificacion;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_REVERSA_AUT(:v_pnumero,:v_pubicacion,:v_pobservacion,:v_pjustificacion,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);   
    oci_bind_by_name($consulta,':v_pobservacion',$observacion);   
    oci_bind_by_name($consulta,':v_pjustificacion',$justificacion);  
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
  function ProcesaActivarAutorizacion(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $empresa    = '1';
    $documento = 'AS';
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;    
    $accion = $request->accion;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_confirma_aut_sal_json(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_poperacion,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pempresa',$empresa);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);   
    oci_bind_by_name($consulta,':v_pnumero',$numero); 
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);   
    oci_bind_by_name($consulta,':v_poperacion',$accion);  
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
 function p_u_estado_autorizacion_x(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $empresa    = '1';
    $documento = 'AS';
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;    
    $accion = $request->accion;
    $motivo  = $request->motivo;
    $justificacion = $request->justificacion;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.P_U_ESTADO_AUTORIZACION_X(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_paccion,:v_pmotivo,:v_pjustificacion,:v_json_row); end;');  
    oci_bind_by_name($consulta,':v_pnumero',$numero); 
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);   
    oci_bind_by_name($consulta,':v_pdocumento',$documento);   
    oci_bind_by_name($consulta,':v_paccion',$accion);  
    oci_bind_by_name($consulta,':v_pmotivo',$motivo);   
    oci_bind_by_name($consulta,':v_pjustificacion',$justificacion);  
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
