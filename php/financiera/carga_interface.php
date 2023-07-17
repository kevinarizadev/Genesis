<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtenerconcepto(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$documento = 'NK';
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_KMOV.P_OBTENER_CONCEPTO(:v_documento,:v_json_row); end;');
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_documento',$documento);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	  function p_ins_kmov(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$concepto          = $request->concepto;
		$fecha             = $request->fecha;
		$observacion       = $request->observacion;
		$responsable       = $request->cedula;
		$v_pcantidad_json  = $request->v_pcantidad_json;
		// $v_pjson_detalle   = $request->v_pjson_detalle;
		// echo    $v_pjson_detalle  ;
		$consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_ins_kmov(  :v_pconcepto,
																	 :v_pfecha,
																	 :v_pobservacion,
																	 :v_presponsable,
																	 :v_pcantidad_json,
																	 :v_pjson_detalle,
																	 :v_json_row); end;');
		$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pconcepto',$concepto);
		oci_bind_by_name($consulta,':v_pfecha',$fecha);
		oci_bind_by_name($consulta,':v_pobservacion',$observacion);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_pcantidad_json',$v_pcantidad_json);
		oci_bind_by_name($consulta,':v_pjson_detalle',$json_parametros, -1, OCI_B_CLOB);
		$json_parametros->writeTemporary($request->v_pjson_detalle);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		// echo $consulta
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }

  function guardar_kmov(){
		require_once('../config/dbcon_prod.php');
    global $request;
		$concepto          = $request->concepto;
		$fecha          	 = $request->fecha;
		$observacion       = $request->observacion;
    $responsable 			 = $request->cedula;

    $consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_ins_kmov(:v_pconcepto, :v_pfecha, :v_pobservacion, :v_presponsable, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_pconcepto',$concepto);
    oci_bind_by_name($consulta,':v_pfecha',$fecha);
    oci_bind_by_name($consulta,':v_pobservacion',$observacion);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }

	function eliminar_kmov(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$numero         = $request->numero;

		$consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_del_kmvd(:v_pnumero, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo 0;
		}else{
			echo 1;
		}
		oci_close($c);
	}

	function procesa_kmov(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$numero         = $request->numero;
		$empresa        = 1;
		$documento      = 'NK';
		$ubicacion      = 1;
		$estado      	  = 'P';

		$consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_confirma_con_pq(:v_pempresa, :v_pdocumento, :v_pnumero, :v_pubicacion, :v_poperacion, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
		oci_bind_by_name($consulta,':v_poperacion',$estado);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
  	oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function reversa_kmov(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$numero         = $request->numero;

		$consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_ins_reversa_kmov(:v_pnumero, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
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
