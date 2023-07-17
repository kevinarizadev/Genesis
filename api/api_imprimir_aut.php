<?php
  header("Content-Type: text/html;charset=utf-8");
  // header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET");
  header("Allow: GET");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: text/html;charset=utf-8");

  $numero = $_GET['numero'];
  $ubicacion = $_GET['ubicacion'];

  if(strlen($numero) == 0 || strlen($ubicacion) == 0){
    echo '{"mensaje":"Debe enviar el numero y la ubicacion"}';
    return;
  }

  require_once('../php/config/dbcon_login.php');
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_OBTENER_AUTORIZACION_WEB(:v_pnumero, :v_pubicacion,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnumero',$numero);
  oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
