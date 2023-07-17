<?php
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RES.P_OBTENER_USUARIOS(:v_pnit,:v_pjson_row); end;');
  oci_bind_by_name($consulta,':v_pnit',$_SESSION["nit"]);
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
?>
