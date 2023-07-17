<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	
	function obtenersalasvideo(){
	   require_once('../config/dbcon_prod.php');
			global $request;
		$cursor = oci_new_cursor($c);

			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_VC.p_obtener_salas_virtuales(:v_tipo,:v_response); end;');
			// $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_tipo',$request->tab);

			oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

			// oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
			oci_execute($consulta);
			oci_execute($cursor, OCI_DEFAULT);
			$datos = null;
			oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
			oci_free_statement($consulta);
			oci_free_statement($cursor);
	
			echo json_encode($datos);
	}


  function insertar_acas_vc(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $ubicacion = $request->ubicacion;
    $problema = $request->problema;
    $motivo = $request->motivo;
    $emisor = $request->emisor;
    $fechainicio = $request->fechainicio;
    $fechaterminacion = $request->fechaterminacion;
    $v_logged_user = $request->v_logged_user;
    // Preparamos la consulta para ser ejecutada y enlazamos los parametros
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_VC.p_agendar_sala_virtuales(:v_pubicacion,
	:v_pproblema,
	:v_pmotivo,
	:v_pemisor,
	:v_pfechainicio,
	:v_pfechaterminacion,
	:v_logged_user,
	:v_json_row); end;');
    // Asignamos los valores a los parametros
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_pproblema',$problema);
    oci_bind_by_name($consulta,':v_pmotivo',$motivo);
    oci_bind_by_name($consulta,':v_pemisor',$emisor);
    oci_bind_by_name($consulta,':v_pfechainicio',$fechainicio);
    oci_bind_by_name($consulta,':v_pfechaterminacion',$fechaterminacion);
    oci_bind_by_name($consulta,':v_logged_user',$v_logged_user);

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

	function eliminar_agenda(){
	  require_once('../config/dbcon_prod.php');

		global $request;
		$v_pdocumento = $request->documento; //
		$v_pnumero= $request->numero;	// numero
		$v_pubicacion=$request->ubicacion; // 8001
		$v_pestado=$request->estado; //X
		$v_pmotivo = $request->motivo; //
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_VC.P_MODIFICA_ESTADO_VIDEO(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pestado,:v_pmotivo,:v_pjson_row); end;');
		// Asignamos los valores a los parametros
    oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
    oci_bind_by_name($consulta,':v_pnumero',$v_pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$v_pubicacion);
    oci_bind_by_name($consulta,':v_pestado',$v_pestado);
    oci_bind_by_name($consulta,':v_pmotivo',$v_pmotivo);

	  $clob = oci_new_descriptor($c,OCI_D_LOB);
	  oci_bind_by_name($consulta,':v_pjson_row', $clob,-1,OCI_B_CLOB);
	  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	  if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}



?>
