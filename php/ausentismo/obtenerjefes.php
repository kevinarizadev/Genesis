<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function obtenerjefes(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AU.P_OBTENER_JEFES(:v_json_row); end;');

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

?>
