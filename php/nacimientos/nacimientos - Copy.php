<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    $function();
    function cantidadxseccional(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_cantidadxseccional(:v_anno,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

    }
    function cantidadxseccional_origen(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_cantidadxsecc_ori(:v_anno,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

    }
    function cantidadxmunicipio(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_cantidadxmunicipio(:v_anno,
                                                                                    :v_seccional,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
        oci_bind_by_name($consulta,':v_seccional',$request->depa);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}
	function totales_anuales(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_graficaprincipal(:v_anno,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                                
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
	}
	function graficaseccionales(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_graficaseccionales(:v_anno,
                                                                                    :v_seccional,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
        oci_bind_by_name($consulta,':v_seccional',$request->seccional);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}
	function tabla(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_datosseccionales(:v_anno,
                                                                                    :v_seccional,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
        oci_bind_by_name($consulta,':v_seccional',$request->municipio);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}
	//CNVU - PETICION CAMBIAR DE ESTADO
	function cambioestado(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_nac.p_marca_gestion(:v_documento,
																	   :v_ano,
																	   :v_estado,
																	   :v_respuesta); end;');
																	   
		// echo($request->estado);
        oci_bind_by_name($consulta,':v_documento',$request->doc);                                                               
        oci_bind_by_name($consulta,':v_ano',$request->ano);                                                               
        oci_bind_by_name($consulta,':v_estado',$request->estado);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
	}
	function modal_datos(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_datos_nacimiento(:v_tipodocumento,
                                                                                    :v_documento,
                                                                                    :v_origen,
                                                                                    :v_anno,
                                                                                    :v_json_row); end;');
        oci_bind_by_name($consulta,':v_tipodocumento',$request->tipoDoc);                                                               
        oci_bind_by_name($consulta,':v_documento',$request->doc);                                                               
        oci_bind_by_name($consulta,':v_origen',$request->orig);                                                               
        oci_bind_by_name($consulta,':v_anno',$request->anno);                                                                
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}
	function diagnosticos(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_lista_dx( :v_json_row); end;');                                                            
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}
?>