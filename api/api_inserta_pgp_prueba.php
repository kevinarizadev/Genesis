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


   function inserta_registro_pgp()
    {
      global $request;
      require('../php/config/dbcon_qa.php');
      // require('../php/config/dbcon_login.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.P_INSERTA_REGISTRO_PGP(:v_ptercero,:v_ptipodocumento,:v_pdocumento,
      :v_pnumero,:v_pproducto,:v_pcantidad,:v_pfecha_prestacion,:v_pambito,:v_pdiagnostico,
      :v_pjson_out); end;');
      oci_bind_by_name($consulta, ':v_ptercero', $request->tercero);
      oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_doc);
      oci_bind_by_name($consulta, ':v_pdocumento', $request->numero_doc);
      oci_bind_by_name($consulta, ':v_pnumero', $request->numero_contrato);
      oci_bind_by_name($consulta, ':v_pproducto', $request->producto);
      oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
      oci_bind_by_name($consulta, ':v_pfecha_prestacion', $request->fecha_prestacion);
      oci_bind_by_name($consulta, ':v_pambito', $request->ambito);
      oci_bind_by_name($consulta, ':v_pdiagnostico', $request->diagnostico);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());

      oci_close($c);

      echo $json;
      exit;
    }




?>
