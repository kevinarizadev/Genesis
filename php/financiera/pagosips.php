<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obteneranno(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.P_CONS_ANNO(:v_json_row); end;');
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

  function obtenerperiodo(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $panno = $request->panno;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.P_CONS_PERIODO(:v_panno, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_panno',$panno);
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

	function obtenervalortotal(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$panno    = $request->panno;
    $pperiodo = $request->pperiodo;
    $ptercero = $request->ptercero;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.P_CONS_PAGO_TOTAL_TRAZA(:v_panno, :v_pperiodo, :v_ptercero, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_panno',$panno);
    oci_bind_by_name($consulta,':v_pperiodo',$pperiodo);
    oci_bind_by_name($consulta,':v_ptercero',$ptercero);
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

  function obtenerdocumento(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $panno    = $request->panno;
    $pperiodo = $request->pperiodo;
    $ptercero = $request->ptercero;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.P_CONS_PAGO_MAESTRO_TRAZA(:v_panno, :v_pperiodo, :v_ptercero, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_panno',$panno);
    oci_bind_by_name($consulta,':v_pperiodo',$pperiodo);
    oci_bind_by_name($consulta,':v_ptercero',$ptercero);
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

  function obtenerdocumentodet(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $panno    = $request->panno;
    $pperiodo = $request->pperiodo;
    $ptercero = $request->ptercero;
    $pdocumento = $request->pdocumento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.P_CONS_PAGO_DETALLE_TRAZA(:v_panno, :v_pperiodo, :v_ptercero, :v_pdocumento, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_panno',$panno);
    oci_bind_by_name($consulta,':v_pperiodo',$pperiodo);
    oci_bind_by_name($consulta,':v_ptercero',$ptercero);
    oci_bind_by_name($consulta,':v_pdocumento',$pdocumento);
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

  function obtenerdocumentodetdet(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $panno    = $request->panno;
    $pperiodo = $request->pperiodo;
    $ptercero = $request->ptercero;
    $pdocumento = $request->pdocumento;
    $pnumero = $request->pnumero;
    $pubicacion = $request->pubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_IPS.p_cons_pago_documento_traza(:v_panno, :v_pperiodo, :v_ptercero, :v_pdocumento, :v_pnumero, :v_pubicacion, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_panno',$panno);
    oci_bind_by_name($consulta,':v_pperiodo',$pperiodo);
    oci_bind_by_name($consulta,':v_ptercero',$ptercero);
    oci_bind_by_name($consulta,':v_pdocumento',$pdocumento);
    oci_bind_by_name($consulta,':v_pnumero',$pnumero);
    oci_bind_by_name($consulta,':v_pubicacion',$pubicacion);
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

  /*
	function obtenerconteo(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_CANTIDAD_ESTADO(:v_json_row); end;');
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

	function obtenerfases(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_OBTENER_FASES(:v_pid,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pid',$id);
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
*/
?>
