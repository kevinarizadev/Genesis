<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
  function P_LISTA_PRODUCTO(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo = $request->id;
    // $codigo ="S11101";
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_PRODUCTO(    :v_pcodigo,
                                                                                    :v_json_row
                                                                                ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
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
  function P_LISTA_TARIFA(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_TARIFA(   :v_pcodigo,
                                                                                  :v_producto,
                                                                                  :v_json_row
                                                                              ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$request->codigo); 
    oci_bind_by_name($consulta,':v_producto',$request->producto);
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
  function P_LISTA_TARIFA_PRODUCTO(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_TARIFA_PRODUCTO(   :v_pcodigo,
                                                                                          :v_producto,
                                                                                          :v_json_row
                                                                                      ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
    oci_bind_by_name($consulta,':v_producto',$request->producto);
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
  function P_UID_TARIFA(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_UID_TARIFA(   :v_TRDN_TARIFA,
                                                                                :v_TRDC_PRODUCTO,
                                                                                :v_TRDV_VALOR,
                                                                                :v_paccion,
                                                                                :v_TRDC_ESTADO,
                                                                                :v_json_row     
                                                                              ); end;');
    oci_bind_by_name($consulta,':v_TRDN_TARIFA',$request->v_TRDN_TARIFA);
    oci_bind_by_name($consulta,':v_TRDC_PRODUCTO',$request->v_TRDC_PRODUCTO);
    oci_bind_by_name($consulta,':v_TRDV_VALOR',$request->v_TRDV_VALOR);
    oci_bind_by_name($consulta,':v_paccion',$request->v_paccion);
    oci_bind_by_name($consulta,':v_TRDC_ESTADO',$request->v_TRDC_ESTADO);
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
