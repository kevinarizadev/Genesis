<?php
    header("Content-Type: text/html;charset=utf-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    // header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: POST");
    // header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: text/html;charset=utf-8");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
     $function();
    // pq_webservices_ips.P_UI_CABEZA_AUT_WEB(v_pautorizacion => :v_pautorizacion,
    // v_pproductos => :v_pproductos,
    // v_pjson_row => :v_pjson_row);

   function inserta_registro_aut()
    {
      global $request;
      //require('../php/config/dbcon_qa.php');
      require_once('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_UI_CABEZA_AUT_WEB(
        :v_pautorizacion,:v_pproductos,
      :v_pjson_out); end;');
      oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
      oci_bind_by_name($consulta, ':v_pproductos', $request->productos);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());
      oci_close($c);
      echo $json;
      exit;
    }


?>
