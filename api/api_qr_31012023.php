<?php
    header("Content-Type: text/html;charset=utf-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: text/html;charset=utf-8");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


   function p_mostrar_detalle_autorizacion()
    {
      global $request;
      require('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_QR_AUTORIZA(:P_NUM_AUT,:P_COD_UBICCION,:P_NIT,:v_prespuesta); end;');
      oci_bind_by_name($consulta, ':P_NUM_AUT', $request->num_autorizacion);
      oci_bind_by_name($consulta, ':P_COD_UBICCION', $request->ubicacion);
      oci_bind_by_name($consulta, ':P_NIT', $request->nit);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());

      oci_close($c);

      echo $json;
      exit;
    }

  function p_mostrar_autorizacion()
    {
      global $request;
      require('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_COD_BARRA_AUT(:p_serial,:p_nit,:v_json); end;');
      oci_bind_by_name($consulta, ':p_serial', $request->serial);
      oci_bind_by_name($consulta, ':p_nit', $request->nit);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());

      oci_close($c);

      echo $json;
      exit;
    }

?>
