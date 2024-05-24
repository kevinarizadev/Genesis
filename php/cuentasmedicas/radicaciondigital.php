<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


	function P_OBTENER_CARGUES_RADICADOS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_CARGUES_RADICADOS(:v_pnit,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }

	function P_OBTENER_FACTURAS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURAS(:v_pnit,:v_recibo,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    oci_bind_by_name($consulta,':v_recibo',$request->recibo);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }


  function P_ACTUALIZA_ESTADO_VAL()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_ESTADO_VAL(:v_pnit,:v_precibo,:v_pfacturas,:v_pcantidad,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
    oci_bind_by_name($consulta, ':v_pfacturas', $request->facturas);
    oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }


  function P_ACTUALIZA_ESTADO_VAL_UNICAS()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_ESTADO_VAL_UNICAS(:v_pnit,:v_precibo,:v_pfactura,:v_pcantidad,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
    oci_bind_by_name($consulta, ':v_pfactura', $request->factura);
    oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }
