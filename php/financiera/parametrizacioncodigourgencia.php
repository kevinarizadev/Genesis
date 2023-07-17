<?php
	
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function obtener_Listado(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin PQ_GENESIS_CD.P_OBTENER_IPS_CU(:v_pcodigo,:v_json_row); end;');
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
	function Cambiar_el_Contrato(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CD.P_UI_IPS_CU(:v_pcodigo,:v_paccion,:v_pclasificacion,:v_pdia,:v_phora,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->nitips);
		oci_bind_by_name($consulta,':v_paccion',$request->accion);
		oci_bind_by_name($consulta,':v_pclasificacion',$request->cambiar_contrato);
		oci_bind_by_name($consulta,':v_pdia',$request->dia);
		oci_bind_by_name($consulta,':v_phora',$request->hora);
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
	function obtener_Listado_ips_Gris(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CD.P_LISTA_IPS_CU(:v_json_row); end;');
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
