<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
    $function();
    
	function obtenerDataReport(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_IPS(:v_json_row); end;');
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

    function obtenerConsolidadoIps(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_IPS_DPTO(:v_json_row); end;');
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

function obtenerConsolidadoIpsDetalle(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_IPS_DPTO_DETALLE(:v_pubicacion,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pubicacion', $request->codigo);
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

function obtenerConsolidadoIpsDetalleServicio(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_IPS_DPTO_DETALLE_SERVICIOS(:v_pnit,:v_pfecha,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_pfecha', $request->fecha);
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
function obtener_consolidadosacas(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_ACAS_IPS(:v_json_row); end;');
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

function obtener_consolidadosacasconcepto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_ACAS_IPS_CONCEPTO(:v_json_row); end;');
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



function obtener_consolidado_AcasDetalle(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_CONSOLIDADO_ACAS_IPS_DETALLE(:v_ptipo,:v_pmotivo,:v_pasunto,:v_pcedula,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptipo', $request->tipo); 
    oci_bind_by_name($consulta, ':v_pmotivo', $request->motivo); 
    oci_bind_by_name($consulta, ':v_pasunto', $request->asunto);    
    oci_bind_by_name($consulta, ':v_pcedula', $request->cedula); 
    
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
function obtener_personas_Acas(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_PERSONAS_W_ACAS(:v_json_row); end;');
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



