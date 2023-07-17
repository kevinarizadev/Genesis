<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtenerpendientes(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$responsable = $request->responsable;
		$consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_mostrar_pendientes(:v_pusuario,:v_json_row);end;');
		oci_bind_by_name($consulta,':v_pusuario',$responsable);
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

  function obtenerprocesados(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $responsable = $request->responsable;
    $consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_mostrar_procesados(:v_pusuario, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pusuario',$responsable);
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

	function obtenererror(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consecutivo = $request->consecutivo;
    $consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_mostrar_errores(:v_pconsecutivo, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
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

	function obtenerbusqueda(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $conincidencia = $request->conincidencia;
		$responsable = $request->responsable;
    $consulta = oci_parse($c,'BEGIN PQ_ESPERA_CONFIRMACION.p_mostrar_documento(:v_coincidencia, :v_pusuario, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_coincidencia',$conincidencia);
		oci_bind_by_name($consulta,':v_pusuario',$responsable);
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
