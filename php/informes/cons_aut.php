<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtener_reporte_seccional(){
		require_once('../config/dbcon_prod.php');
		global $request;
		//var_dump($request);
		$fecha					 = $request->pfecha;
		$departamento    = $request->pdepartamento;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_REPORTE_SECCIONAL(:v_pfecha, :v_pcoddep, :v_pjson_row); end;');
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pfecha',$fecha);
		oci_bind_by_name($consulta,':v_pcoddep',$departamento);
		oci_bind_by_name($consulta,':v_pjson_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function obtener_reporte_seccional_det(){
		require_once('../config/dbcon_prod.php');
		global $request;
		//var_dump($request);
		$fecha					 = $request->pfecha;
		$departamento    = $request->pdepartamento;
		$hora   				 = $request->phora;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUT.P_REPORTE_SECCIONAL_HOR(:v_pfecha, :v_pcoddep, :v_phora, :v_pjson_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pfecha',$fecha);
		oci_bind_by_name($consulta,':v_pcoddep',$departamento);
		oci_bind_by_name($consulta,':v_phora',$hora);
		oci_bind_by_name($consulta,':v_pjson_row', $clob,-1,OCI_B_CLOB);
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
