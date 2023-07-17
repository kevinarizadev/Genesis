<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    $function();
    function lista_solicitudes_afiliacion(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $responsable = $_SESSION["cedula"];
        // echo $responsable;
        $consulta = oci_parse($c,'begin PQ_GENESIS_PRUEBAS_SP.p_cantidad_municipio(:v_presponsable, 
                                                                                   :v_departamento, 
                                                                                   :v_municipio, 
                                                                                   :v_pjson_row_out); end;');                                                   
        $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
        oci_bind_by_name($consulta,':v_departamento',$request->departamento);
		oci_bind_by_name($consulta,':v_municipio',$request->municipio);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
    }

    function p_listar_departamentos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis.p_listar_departamentos(:v_json_row); end;');		
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
    
	function p_listar_municipios(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN pq_genesis.p_listar_municipios(:v_pdepartamento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdepartamento',$request->departamento);		
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