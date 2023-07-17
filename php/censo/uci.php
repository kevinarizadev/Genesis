<?php

	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();

    
  function obtener_cabeza(){
		require_once('../config/dbcon_prod.php');
		global $request;
			$cursor = oci_new_cursor($c);
		$coincidencia = $request->coincidencia;

	    $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_obtener_cabeza_prestador(:v_pcoincidencia ,:v_response); end;');
	  	oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
		oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);

	}
    
  function actualizar_estado(){
		require_once('../config/dbcon_prod.php');
		global $request;
						
	    $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_ui_prestador_ips(:v_pnit, :v_estado, :v_responsable, :v_json_row); end;');
	  	oci_bind_by_name($consulta,':v_pnit',$request->nit);
		oci_bind_by_name($consulta,':v_estado',$request->estado);		  	  
		oci_bind_by_name($consulta,':v_responsable',$request->responsable);

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

    
  function obtener_sedes(){
		require_once('../config/dbcon_prod.php');
		global $request;
			$cursor = oci_new_cursor($c);
		$coincidencia = $request->coincidencia;

	    $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_obtener_reps_sede(:v_pcoincidencia ,:v_response); end;');
	  	oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
		oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);

	}


  function obtener_uci(){
		require_once('../config/dbcon_prod.php');
		global $request;
		

	    $consulta = oci_parse($c,'begin  pq_genesis_censo_hospitalario.p_obtener_informacion_reps(:v_pnit, :v_psede,:v_pubicacion, :v_json_row); end;');
	  	oci_bind_by_name($consulta,':v_pnit',$request->nit);
	  	oci_bind_by_name($consulta,':v_psede',$request->sede);
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

  function historico_sede(){
		require_once('../config/dbcon_prod.php');
		global $request;
		

		$cursor = oci_new_cursor($c);
	    $consulta = oci_parse($c,'begin  pq_genesis_censo_hospitalario.p_listar_historial_capacidad(:v_pnit, :v_psede, :v_response ); end;');
	  	oci_bind_by_name($consulta,':v_pnit',$request->nit);
		  oci_bind_by_name($consulta,':v_psede',$request->sede);
		  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		
		  oci_execute($consulta);
		  oci_execute($cursor, OCI_DEFAULT);
		  $datos = null;
		  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		  oci_free_statement($consulta);
		  oci_free_statement($cursor);
  
		  echo json_encode($datos);
  
	
	}


function actualiza_uci(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$json_in = json_encode($request->json);
	    $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.P_UI_CAPACIDAD(:v_pjson_row_in, :v_pcantidad,               
                         :v_json_res); end;');
	    //oci_bind_by_name($consulta, ':v_pjson_row_in', $request->json,-1,OCI_B_CLOB);

	  	oci_bind_by_name($consulta,':v_pjson_row_in',$json_in);
	  	oci_bind_by_name($consulta,':v_pcantidad',$request->longitud);
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
/*procedure p_ui_capacidad_new(v_pnit         in varchar2,
                                 v_psede        in varchar2,
                                 v_presponsable in varchar2,
                                 v_pjson_in     in clob,
                                 v_pcantidad    in varchar2,
                                 v_json_res     out clob)*/
function actualiza_uci_new(){
		require_once('../config/dbcon_prod.php');
		global $request;
	
	    $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_ui_capacidad_new(:v_pnit,
		:v_psede,
		:v_presponsable,
		:v_pubicacion,
		:v_pjson_in,
		:v_pcantidad,
		:v_json_res); end;');
	    //oci_bind_by_name($consulta, ':v_pjson_row_in', $request->json,-1,OCI_B_CLOB);
		 oci_bind_by_name($consulta,':v_pnit',$request -> nit);
		 oci_bind_by_name($consulta,':v_psede',$request -> sede);
		 oci_bind_by_name($consulta,':v_pubicacion',$request -> ubicacion);
		 oci_bind_by_name($consulta,':v_presponsable',$request -> responsable);
		
		 $row_json = json_encode($request->json_in);
		 oci_bind_by_name($consulta,':v_pjson_in',$row_json);
		 
		 oci_bind_by_name($consulta,':v_pcantidad',$request -> cantidad);
		 
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

    
    

?>
