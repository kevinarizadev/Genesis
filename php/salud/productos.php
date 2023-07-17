<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    $function();
    function obtener_listados(){  
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.p_lista_prod (:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c); 
	}
	function p_lista_productos(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.p_lista_productos( :v_pcodigo,
                                                                            :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }
    function detalles_productos(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.p_obtener_producto( :v_pcodigo,
                                                                            :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }
    function obtener_clasificacion(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.p_lista_clas( :v_pcodigo,
                                                                      :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c);
	}
	function carga_clasificacion_alterna_selecionada(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.P_OBTENER_CLAS_ALTERNA( :v_pcodigo,
                                                                      :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function p_valida_producto(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.P_VALIDA_PRODUCTO2( :v_pcodigo,
																			:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function p_valida_producto1(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.P_VALIDA_PRODUCTO( :v_pcodigo,
																			:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtener_clasificacion_alterna(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.p_lista_clas_alterna(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
    }
    function actualizar_productos(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$v_presponsable=32890483;
        $consulta = oci_parse($c,'begin pq_genesis_prod.p_ui_producto(  :v_pcodigo,
																		:v_pclasificacion,
																		:v_pcopago,
																		:v_pedad_inicial,
																		:v_pedad_final,
																		:v_psexo,
																		:v_pclase,
																		:v_palto_costo,
																		:v_ptipo,
																		:v_ppos,
																		:v_pcantidad_ano,
																		:v_pcantidad_mes,
																		:v_pestado,
																		:v_precobro,
																		:v_pnivel,
																		:v_pcant_min,
																		:v_pcant_max,
																		:v_presponsable, 
																		:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->v_pcodigo);
		oci_bind_by_name($consulta,':v_pclasificacion',$request->v_pclasificacion);
		oci_bind_by_name($consulta,':v_pcopago',$request->v_pcopago);
		oci_bind_by_name($consulta,':v_pedad_inicial',$request->v_pedad_inicial);
		oci_bind_by_name($consulta,':v_pedad_final',$request->v_pedad_final);
		oci_bind_by_name($consulta,':v_psexo',$request->v_psexo);
		oci_bind_by_name($consulta,':v_pclase',$request->v_pclase);
		oci_bind_by_name($consulta,':v_palto_costo',$request->v_palto_costo);
		oci_bind_by_name($consulta,':v_ptipo',$request->v_ptipo);
		oci_bind_by_name($consulta,':v_ppos',$request->v_ppos);
		oci_bind_by_name($consulta,':v_pcantidad_ano',$request->v_pcantidad_anno);
		oci_bind_by_name($consulta,':v_pcantidad_mes',$request->v_pcantidad_mes);
		oci_bind_by_name($consulta,':v_pestado',$request->v_pestado);
		oci_bind_by_name($consulta,':v_pnivel',$request->v_pnivel);
		oci_bind_by_name($consulta,':v_precobro',$request->v_precobro);
		oci_bind_by_name($consulta,':v_pcant_min',$request->v_pcant_minima);
		oci_bind_by_name($consulta,':v_pcant_max',$request->v_pcant_maxima);
		oci_bind_by_name($consulta,':v_presponsable',$v_presponsable);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function creacion_productos(){
        require_once('../config/dbcon_prod.php');
		global $request;

		$consulta = oci_parse($c,'begin pq_genesis_prod.p_inserta_producto(  :v_pcodigo,
																		:v_nombre,
																		:v_pclasificacion,
																		:v_pcopago,
																		:v_pedad_inicial,
																		:v_pedad_final,
																		:v_psexo,
																		:v_pclase,
																		:v_palto_costo,
																		:v_ptipo,
																		:v_ppos,
																		:v_pcantidad_ano,
																		:v_pcantidad_mes,
																		:v_pestado,
																		:v_precobro,
																		:v_pnivelcomplejidad,
																		:v_pcant_min,
																		:v_pcant_max,
																		:v_presponsable, 
																		:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->v_pcodigo);
		oci_bind_by_name($consulta,':v_nombre',$request->v_nombre);
		oci_bind_by_name($consulta,':v_pclasificacion',$request->v_pclasificacion);
		oci_bind_by_name($consulta,':v_pcopago',$request->v_pcopago);
		oci_bind_by_name($consulta,':v_pedad_inicial',$request->v_pedad_inicial);
		oci_bind_by_name($consulta,':v_pedad_final',$request->v_pedad_final);
		oci_bind_by_name($consulta,':v_psexo',$request->v_psexo);
		oci_bind_by_name($consulta,':v_pclase',$request->v_pclase);
		oci_bind_by_name($consulta,':v_palto_costo',$request->v_palto_costo);
		oci_bind_by_name($consulta,':v_ptipo',$request->v_ptipo);
		oci_bind_by_name($consulta,':v_ppos',$request->v_ppos);
		oci_bind_by_name($consulta,':v_pcantidad_ano',$request->v_pcantidad_anno);
		oci_bind_by_name($consulta,':v_pcantidad_mes',$request->v_pcantidad_mes);
		oci_bind_by_name($consulta,':v_pestado',$request->v_pestado);
		oci_bind_by_name($consulta,':v_pnivelcomplejidad',$request->v_pnivel);
		oci_bind_by_name($consulta,':v_precobro',$request->v_precobro);
		oci_bind_by_name($consulta,':v_pcant_min',$request->v_pcant_minima);
		oci_bind_by_name($consulta,':v_pcant_max',$request->v_pcant_maxima);
		oci_bind_by_name($consulta,':v_presponsable',$request->v_presponsable);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function P_UI_PRODUCTO(){
        require_once('../config/dbcon_prod.php');
		global $request;

		$consulta = oci_parse($c,'begin pq_genesis_prod.P_UI_PRODUCTO2(  :v_pcodigo,
																		:v_nombre,
																		:v_pclasificacion,
																		:v_pcopago,
																		:v_pedad_inicial,
																		:v_pedad_final,
																		:v_psexo,
																		:v_pclase,
																		:v_palto_costo,
																		:v_ptipo,
																		:v_ppos,
																		:v_pcantidad_ano,
																		:v_pcantidad_mes,
																		:v_pestado,
																		:v_precobro,
																		:v_pnivelcomplejidad,
																		:v_pcant_min,
																		:v_pcant_max,
																		:v_presponsable, 
																		:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->v_pcodigo);
		oci_bind_by_name($consulta,':v_nombre',$request->v_nombre);
		oci_bind_by_name($consulta,':v_pclasificacion',$request->v_pclasificacion);
		oci_bind_by_name($consulta,':v_pcopago',$request->v_pcopago);
		oci_bind_by_name($consulta,':v_pedad_inicial',$request->v_pedad_inicial);
		oci_bind_by_name($consulta,':v_pedad_final',$request->v_pedad_final);
		oci_bind_by_name($consulta,':v_psexo',$request->v_psexo);
		oci_bind_by_name($consulta,':v_pclase',$request->v_pclase);
		oci_bind_by_name($consulta,':v_palto_costo',$request->v_palto_costo);
		oci_bind_by_name($consulta,':v_ptipo',$request->v_ptipo);
		oci_bind_by_name($consulta,':v_ppos',$request->v_ppos);
		oci_bind_by_name($consulta,':v_pcantidad_ano',$request->v_pcantidad_anno);
		oci_bind_by_name($consulta,':v_pcantidad_mes',$request->v_pcantidad_mes);
		oci_bind_by_name($consulta,':v_pestado',$request->v_pestado);
		oci_bind_by_name($consulta,':v_pnivelcomplejidad',$request->v_pnivel);
		oci_bind_by_name($consulta,':v_precobro',$request->v_precobro);
		oci_bind_by_name($consulta,':v_pcant_min',$request->v_pcant_minima);
		oci_bind_by_name($consulta,':v_pcant_max',$request->v_pcant_maxima);
		oci_bind_by_name($consulta,':v_presponsable',$request->v_presponsable);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function actualizar_clasificacion_productos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$vector =$request->vector;

        $consulta = oci_parse($c,'begin pq_genesis_prod.P_ACTUALIZAR_CLAS_ALTERNA(	:v_pjson_clasificacion,
																					:v_pcups,
																					:v_pcantidad,
																					:v_respuesta); end;');
	
		// oci_bind_by_name($consulta, ':v_pjson_clasificacion', $vector, OCI_B_CLOB);
		$jsoncacin = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_clasificacion', $jsoncacin, -1, OCI_B_CLOB);
		$jsoncacin->writeTemporary($vector);

		// $json_parametros1->writeTemporary(json_encode($vector)); 
		oci_bind_by_name($consulta,':v_pcups',$request->codigo);
		oci_bind_by_name($consulta,':v_pcantidad',$request->cantidad);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);

	}
	function P_LISTA_PROD_NOPBS(){
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.P_LISTA_PROD_NOPBS( :v_pcodigo,
                                                                            :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->producto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
	}
	function P_LISTA_OBTENER_NOPBS(){ 
        require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_prod.P_LISTA_OBTENER_NOPBS( :v_pcodigo,
                                                                            :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->id);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
	}
	function P_UI_EXCLUSION(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.P_UI_EXCLUSION( :v_pcodigo,
																		:v_pestado,  
																		:v_paccion,   
																		:v_pdiagnostico, 
                                                                        :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->v_pcodigo);
		oci_bind_by_name($consulta,':v_pestado',$request->v_pestado);
		oci_bind_by_name($consulta,':v_paccion',$request->v_paccion);
		oci_bind_by_name($consulta,':v_pdiagnostico',$request->v_pdiagnostico);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }
	function P_LISTA_DX_EXCLUSION(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.P_LISTA_DX_EXCLUSION( 	:v_pcodigo,
																				:v_pdx, 
                                                                       			:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		oci_bind_by_name($consulta,':v_pdx',$request->producto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }

    function P_MOSTRAR_HIJOS_EPRO(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.P_MOSTRAR_HIJOS_EPRO(:v_pcodigo_cups,																															     :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo_cups',$request->codigo);		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }

    function P_INSERTA_HIJOS_EPRO(){
        require_once('../config/dbcon_prod.php');
		global $request;

		$consulta = oci_parse($c,'begin pq_genesis_prod.P_INSERTA_HIJOS_EPRO(:v_pcodigo_cups,
																		     :v_pnombre,
																			 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo_cups',$request->codigo);			
		oci_bind_by_name($consulta,':v_pnombre',$request->nombre);	
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }

   function P_ACTUALIZA_HIJOS_EPRO(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.P_ACTUALIZA_HIJOS_EPRO(:v_pcodigo_cups,
												                               :v_pnumero,
												                               :v_pnombre,
																			   :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo_cups',$request->codigo);
		oci_bind_by_name($consulta,':v_pnumero',$request->numero);			
		oci_bind_by_name($consulta,':v_pnombre',$request->nombre);	
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }
       function P_ELIMINA_HIJOS_EPRO(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_prod.P_ELIMINA_HIJOS_EPRO(:v_pcodigo_cups,
												                               :v_pnumero,												
												                               :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo_cups',$request->codigo);
		oci_bind_by_name($consulta,':v_pnumero',$request->numero);					
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json; 
		oci_close($c); 
    }

    function Obt_Permisos()
	{
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'begin PQ_GENESIS_PROD.P_OBTENER_PERMISO(:v_pcodigo,:v_json_row); end;');
		oci_bind_by_name($consulta, ':v_pcodigo', $request->Cedula);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
	}


	
