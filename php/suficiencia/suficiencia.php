<?php
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();

    
    function p_obtenerdatos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_SUFICIENCIA.P_SUFICIENCIA(:v_p_fecha, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_p_fecha', $request->fecha);
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
    }

    function p_obtenerdatos_sec(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'BEGIN PQ_SUFICIENCIA.P_SUFICIENCIA_SEC(:v_p_fecha, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_p_fecha', $request->fecha);
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
    }

    function obtenerpromedios(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_SUFICIENCIA.P_OBTENER_PROM(:v_p_fecha, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_p_fecha', $request->fecha);
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
    }
    

    
?>