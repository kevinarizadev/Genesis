
<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    $function();


    function lista_departamentos(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'begin Pq_genesis_salud_publica.p_cantidad_seccional(:v_presponsable,
                                                                            :v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_presponsable',$request->responsable);                                                               
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    
    }

    function cantidadxmunicipio(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin Pq_genesis_salud_publica.p_cantidad_municipio(:v_presponsable ,
                                                                            :v_departamento,
                                                                            :v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_presponsable',$request->responsable);                                                               
        oci_bind_by_name($consulta,':v_departamento',$request->departamento);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

    }

	function actualizardatos(){
		require_once('../config/dbcon_prod.php');		
		global $request;
		$consulta = oci_parse($c, 'BEGIN Pq_genesis_salud_publica.p_procesa_gestionc(:v_pjson_row_in,
																					 :v_pjson_row_ou); end;');
		oci_bind_by_name($consulta,':v_pjson_row_in',$request->datos);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_ou', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

		function descargar_planvacunacion(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_descarga_registro(:v_pnit,
																					:v_pfase,
																					:v_presponsable,
																					:v_pubicacion,
																					:v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pnit',$request->nit);                                                               
        oci_bind_by_name($consulta,':v_pfase',$request->fase);                                                               
		oci_bind_by_name($consulta,':v_presponsable',$request->responsable);
		oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}




function mostrar_subgrupo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$fase = $request->fase;
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_lista_subgrupo(:v_pfase,:v_pjson_row_out); end;');
	oci_bind_by_name($consulta, ':v_pfase', $fase);
	$clob = oci_new_descriptor($c, OCI_D_LOB);

	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_lista_fase()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_lista_fase(:v_response); end;');
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}


function p_lista_etapa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN pq_genesis_salud_publica.p_lista_etapa(:v_fase,:v_response); end;');
	oci_bind_by_name($consulta, ':v_fase', $request->fase);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}

function p_lista_subgrupo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN pq_genesis_salud_publica.p_lista_subgrupo(:v_fase,:v_etapa,:v_response); end;');
	oci_bind_by_name($consulta, ':v_fase', $request->fase);
	oci_bind_by_name($consulta, ':v_etapa', $request->etapa);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);
}


	
	

	function ver_motivosrechazo(){
		require_once('../config/dbcon_prod.php');		
		global $request;
		$consulta = oci_parse($c, 'BEGIN Pq_genesis_salud_publica.p_motivo_rechazo(:v_presponsable,
																					 :v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_presponsable',$request->datos);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}



	function total_gestiones(){
		require_once('../config/dbcon_prod.php');		
		global $request;
		$consulta = oci_parse($c, 'BEGIN Pq_genesis_salud_publica.p_total_gestiones(:v_pjson_row_out ); end;');		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}



	// function obtenerViaPrincipal(){

    //     require_once('../config/dbcon.php');

    //     $cursor = oci_new_cursor($c);
    //     $consulta = oci_parse($c,'begin  oasis.pq_genesis_plan_vacunacion.p_listar_nomenclatura(:v_response); end;');
        
    //    	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	// 	oci_execute($consulta);
	// 	oci_execute($cursor, OCI_DEFAULT);
	// 	$datos = null;
	// 	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	// 	oci_free_statement($consulta);
	// 	oci_free_statement($cursor);
	
	// 	echo json_encode($datos) ;	
	// }
	
	
	function ver_viaprincipal(){
		require_once('../config/dbcon_prod.php');		
		global $param;
        $cursor = oci_new_cursor($c);
		$consulta = oci_parse($c, 'BEGIN pq_genesis_plan_vacunacion.p_listar_nomenclatura(:v_response); end;');
		
 
		oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
	
		echo json_encode($datos) ;	
	}

	
	function grafica_seccional(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_porcentaje_s(:v_departamento,
                                                                                :v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_departamento',$request->departamento);                                                                                                                            
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}

	function grafica_general(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_porcentaje_g(:v_pjson_row_out); end;');                                                                                                                                    
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}


	


    function tabla(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin Pq_genesis_salud_publica.p_detalle_municipio(:v_presponsable,
                                                                           :v_municipio,
                                                                           :v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_presponsable',$request->responsable);                                                               
        oci_bind_by_name($consulta,':v_municipio',$request->municipio);                                                               
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);

	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    // function cantidadxmunicipio(){
    //     require_once('../config/dbcon_prod.php');
	// 	global $request;
    //     $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_cantidadxmunicipio(:v_anno,
    //                                                                                 :v_seccional,
    //                                                                                 :v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
    //     oci_bind_by_name($consulta,':v_seccional',$request->depa);                                                               
	// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
	// 	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	// 	oci_execute($consulta,OCI_DEFAULT);
	// 	$json = $clob->read($clob->size());
	// 	echo $json;
    //     oci_close($c);

	// }
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
	// function tabla(){
    //     require_once('../config/dbcon_prod.php');
	// 	global $request;
    //     $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_datosseccionales(:v_anno,
    //                                                                                 :v_seccional,
    //                                                                                 :v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_anno',$request->anno);                                                               
    //     oci_bind_by_name($consulta,':v_seccional',$request->municipio);                                                               
	// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
	// 	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	// 	oci_execute($consulta,OCI_DEFAULT);
	// 	$json = $clob->read($clob->size());
	// 	echo $json;
    //     oci_close($c);

	// }
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