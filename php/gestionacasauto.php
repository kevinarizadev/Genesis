<?php
	$postdata = file_get_contents("php://input");
	$param = json_decode($postdata);
	$function = $param->function;
    $function();
    
    function obtener_gestionacasauditores(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRUEBAS.p_obtener_acas_autorizaciones(:v_jsonout_eps, :v_jsonout_ips); end;');
        oci_bind_by_name($consulta, ':v_jsonout_eps', $respuesta,4000);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_jsonout_ips', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json2 = $clob->read($clob->size());
			echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
		}else{
			echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
		}
		oci_close($c);
    }
    


    function obteneracasmotivo_responsable(){
        require_once('../config/dbcon_prod.php');
        global $param;  
        $consulta = oci_parse($c, 'begin PQ_GENESIS_PRUEBAS.p_obtener_acas_concepto(:v_pconcepto,
                                                                                        :v_ptipo,
                                                                                        :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_pconcepto', $param->concepto);
        oci_bind_by_name($consulta, ':v_ptipo', $param->tipo);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
        
        
        
    }


    function obteneracasconcepto(){
        require_once('../config/dbcon_prod.php');
        global $param;  
        $consulta = oci_parse($c, 'begin PQ_GENESIS_PRUEBAS.p_obtener_aut_persona(:v_pconcepto,
                                                                                        :v_pestado,
                                                                                        :v_ptipo,
                                                                                        :v_pcedula,
                                                                                        :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_pconcepto', $param->concepto);
        oci_bind_by_name($consulta, ':v_pestado', $param->estado);
        oci_bind_by_name($consulta, ':v_ptipo', $param->tipo);
        oci_bind_by_name($consulta, ':v_pcedula', $param->cedula);


        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

    ?>