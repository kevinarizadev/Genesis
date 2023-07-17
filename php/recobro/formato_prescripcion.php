<?php

	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	
    function p_imprimir_nopbs_formato_formula_medica()
    {
      require_once('../config/dbcon_prod.php');
      global $request;
      $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.p_imprimir_nopbs_formato_formula_medica(  :v_pautorizacion,
                                                                                    :v_json_row
                                                                                  ); end;');
      oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
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

    function p_imprimir_nopbs_formato_plan_manejo()
    {
      require_once('../config/dbcon_prod.php');
      global $request;
      $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.p_imprimir_nopbs_formato_plan_manejo(  :v_pautorizacion,
                                                                                    :v_json_row
                                                                                  ); end;');
      oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
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

    
	
?>