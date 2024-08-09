<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


  function P_OBTENER_ADMIN_FACTURAS_DIGITALES(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_ADMIN_FACTURAS_DIGITALES(:v_pestado,:v_pdetalle,:v_result); end;');
    oci_bind_by_name($consulta,':v_pestado',$request->estado);
    oci_bind_by_name($consulta,':v_pdetalle',$request->ips);
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

	function P_OBTENER_FACTURAS_DIGITALES(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURAS_DIGITALES(:v_presponsable,:v_pestado,:v_result); end;');
    oci_bind_by_name($consulta,':v_presponsable',$request->cedula);
    oci_bind_by_name($consulta,':v_pestado',$request->estado);
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

  function P_UI_FACTURAS_DIGITALES()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_UI_FACTURAS_DIGITALES(:v_pnit,:v_precibo,:v_pfactura,:v_presponsable,:v_pestado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
    oci_bind_by_name($consulta, ':v_pfactura', $request->factura);
    oci_bind_by_name($consulta, ':v_presponsable', $request->cedula);
    oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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



  function P_CONSULTA_PERMISOS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_CONSULTA_PERMISOS(:v_pcedula,:v_result); end;');
    oci_bind_by_name($consulta,':v_pcedula',$request->cedula);
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

  function P_INSERTAR_USUARIO()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_INSERTAR_USUARIO(:v_pcedula,:v_presponsable,:v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
    oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

  function P_ACTUALIZA_USUARIO()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_USUARIO(:v_pcedula,:v_pcolumna,:v_pestado,:v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
    oci_bind_by_name($consulta, ':v_pcolumna', $request->columna);
    oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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



  function P_CONSULTA_PERMISOS_IPS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_CONSULTA_PERMISOS_IPS(:v_result); end;');
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

  function P_INSERTAR_USUARIO_IPS()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_INSERTAR_USUARIO_IPS(:v_pnit,:v_presponsable,:v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

  function P_ACTUALIZA_USUARIO_IPS()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_USUARIO_IPS(:v_pnit,:v_pcolumna,:v_pestado,:v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_pcolumna', $request->columna);
    oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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




  function P_ACTUALIZA_RESP_FACTURAS_DIGITALES()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_RESP_FACTURAS_DIGITALES(:v_presp_anterior,:v_presp_nuevo,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_presp_anterior', $request->resp_anterior);
    oci_bind_by_name($consulta, ':v_presp_nuevo', $request->resp_nuevo);
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

