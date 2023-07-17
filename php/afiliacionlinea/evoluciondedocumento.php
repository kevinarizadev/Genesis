<?php

	$postdata = file_get_contents("php://input");
    // error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


    function visualizardatos(){
        require_once('../config/dbcon_prod.php');
        global $request;  
        $consulta = oci_parse($c, 'BEGIN pq_genesis_ca.p_obtener_evolucion(:v_ptipo_doc,:v_pdocumento,:v_json_out); end;');
	    oci_bind_by_name($consulta,':v_ptipo_doc',$request->tipodoc);        
	    oci_bind_by_name($consulta,':v_pdocumento',$request->documento);        

        $clob = oci_new_descriptor($c, OCI_D_LOB);

        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
      }


    ?>