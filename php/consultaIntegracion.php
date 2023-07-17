<?php
    header("Content-Type: text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Content-Type: text/html;charset=utf-8");
    $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

    require_once('../config/dbcon_prod.php');
    $tipodocumento = $request->tipodocumento;
    $documento     = $request->documento;

    $consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_afiliado_ips(:v_ptipo_documento,:v_pdocumento,:v_prespuesta); end;');
    oci_bind_by_name($consulta,':v_ptipo_documento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
    
?>

