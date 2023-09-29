<?php
	$postdata = file_get_contents("php://input");
	$param = json_decode($postdata);
	$function = $param->function;
    $function();
    
    function obtener_gestionacasjuridica(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_JURIDICA.P_OBTENER_USUARIOS_JURIDICA(:v_parea, :v_json_row); end;');
        oci_bind_by_name($consulta, ':v_parea', $param->area);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    



    function obtener_detalle_acas_juridica(){
		require_once('../config/dbcon_prod.php');
		global $param;
		$estado = $param->estado;
		$cedula = $param->cedula;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_JURIDICA.P_OBTENER_DETALLE_ACAS_JURIDICA(:v_estado,:v_cedula,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_estado',$estado);
		oci_bind_by_name($consulta,':v_cedula',$cedula);
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
