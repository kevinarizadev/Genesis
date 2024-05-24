<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();

    function Cantidadpendientes(){
        require_once('../config/dbcon_prod.php');
        $nit = '';
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.p_obtener_pendientes(:v_json_row); end;');
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
    function p_llamar_cod_urgencia(){
        require_once('../config/dbcon_prod.php');
        $nit = '';
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.p_llamar_cod_urgencia(:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit',$nit);
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
    function p_llamar_cod_urgencia_especifico(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.p_llamar_cod_urgencia_especifico(:v_pcodigo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
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
	function p_u_codigo_urgencia(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.p_u_codigo_urgencia(:v_pcodigo,
                                                                            :v_pubicacion,
                                                                            :v_pafiliado,
                                                                            :v_paccion,
                                                                            :v_pnegacion,
                                                                            :v_pmotivo_rechazo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->v_pcodigo);
		oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
		oci_bind_by_name($consulta,':v_pafiliado',$request->v_pafiliado);
		oci_bind_by_name($consulta,':v_paccion',$request->v_paccion);
		oci_bind_by_name($consulta,':v_pnegacion',$request->v_pnegacion);
		oci_bind_by_name($consulta,':v_pmotivo_rechazo',$request->v_pmotivo_rechazo);
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
