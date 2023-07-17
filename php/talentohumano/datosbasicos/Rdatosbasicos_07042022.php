<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtnerubicaciones(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_UBICACIONES(:v_json_row_1); end;');

    $clob1 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row_1', $clob1,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob1)) {
      $json1 = $clob1->read($clob1->size());
      echo $json1;
    }else{
      echo 0;
    }
    oci_close($c);
  }

  function obtnernodependientes(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_SELECT_NO_DEPENDIENTE(:v_json_row); end;');

    $clob1 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob1)) {
      $json1 = $clob1->read($clob1->size());
      echo $json1;
    }else{
      echo 0;
    }
    oci_close($c);
  }

	function obtenerusuarios(){
    require_once('../../config/dbcon_prod.php');
    global $request;
		$coincidencia = $request->dato;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_BUSCAR_USUARIOS(:v_pcoincidencia,:v_json_row); end;');
		oci_bind_by_name($consulta, ':v_pcoincidencia', $coincidencia);
    $clob1 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob1)) {
      $json1 = $clob1->read($clob1->size());
      echo $json1;
    }else{
      echo 0;
    }
    oci_close($c);
  }

	function obtenernovedades(){
    require_once('../../config/dbcon_prod.php');
    global $request;
		$identificacion = $request->id;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_NOVEDADES(:v_tercero,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_tercero',$identificacion);
    $clob1 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob1)) {
				$json1 = $clob1->read($clob1->size());
	      echo $json1;
    }else{
      echo 0;
    }
    oci_close($c);
  }

	function obtenernovedadesdetalle(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$doc = $request->doc;
		$num = $request->num;
		$ubi = $request->ubi;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_NOVEDADES_DET(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$doc);
		oci_bind_by_name($consulta,':v_pnumero',$num);
		oci_bind_by_name($consulta,':v_pubicacion',$ubi);
		$clob1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob1)) {
			$json1 = $clob1->read($clob1->size());
			echo $json1;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	function obtnerselectestudio(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_SELECT_ESTUDIO(:v_json_row); end;');

    $clob1 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob1)) {
      $json1 = $clob1->read($clob1->size());
      echo $json1;
    }else{
      echo 0;
    }
    oci_close($c);
  }

  function obtenerinfoadicional(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$identificacion = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_LISTAS_ADICIONALES(:v_pid,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pid',$identificacion);

		$clob1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob1,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob1)) {
			$json1 = $clob1->read($clob1->size());
			echo $json1;
		}else{
			echo 0;
		}
		oci_close($c);
	}

  function obtenerselects(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $tipo = $request->tipo;
    $valor = $request->valor;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_SELECT_DEPENDIENTE(:v_ptipo,:v_pvalor,:v_json_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
    oci_bind_by_name($consulta,':v_pvalor',$valor);
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

	function obtnerinformacion(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$tipo = $request->tipo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_INFO_PERSONAL(:v_pid,:v_ptipoid,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pid',$id);
		oci_bind_by_name($consulta,':v_ptipoid',$tipo);
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
	function obtenerproteccion(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$tipo = $request->tipo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_PROTECCION(:v_ptipo,:v_pcedula,:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcedula',$id);
		oci_bind_by_name($consulta,':v_ptipo',$tipo);
		oci_bind_by_name($consulta, ':v_prespuesta', $respuesta,40);
		oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
		oci_close($c);
	}
//Jair Molina

function causalingresos(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_CAUSAL_ING(:v_json_row ); end;');
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
function causalegresos(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_OBTENER_CAUSAL_EGR(:v_json_row ); end;');
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



	//Jair Molina

?>
