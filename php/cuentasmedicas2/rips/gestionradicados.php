<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function P_OBTENER_INDICADOR_RIPS(){
  require_once('../../config/dbcon_prod.php');
  global $request;
  $v_pfechaini = date('d/m/Y', strtotime($request->v_pfechaini));
  $v_pfechafin = date('d/m/Y', strtotime($request->v_pfechafin));
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS.P_OBTENER_INDICADOR_RIPS(:v_pfechaini, 
                                                                           :v_pfechafin,
                                                                           :v_pjson_row  
                                                                          ); end;');
 
  oci_bind_by_name($consulta,':v_pfechaini',$v_pfechaini);
  oci_bind_by_name($consulta,':v_pfechafin',$v_pfechafin);
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

