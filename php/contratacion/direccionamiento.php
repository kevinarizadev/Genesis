<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


    function P_MODIFICACION_DIRECCIONAMIENTO(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_MODIFICACION_DIRECCIONAMIENTO( :V_PJSON_IN,
                                                                                                        :V_PCANTIDAD_ESC,
                                                                                                        :v_pjson_out ); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta,':V_PJSON_IN',$request->V_PJSON_IN);
        oci_bind_by_name($consulta,':V_PCANTIDAD_ESC',$request->V_PCANTIDAD_ESC);
        oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }
    function P_MODIFICACION_ESTRATEGIA(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_MODIFICACION_ESTRATEGIA    ( :V_PJSON_IN,
                                                                                                        :V_PCANTIDAD_ESC,
                                                                                                        :v_pjson_out ); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta,':V_PJSON_IN',$request->V_PJSON_IN);
        oci_bind_by_name($consulta,':V_PCANTIDAD_ESC',$request->V_PCANTIDAD_ESC);
        oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }


    function P_OBTENER_PRUEBA(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_OBTENER_PRUEBA(:v_pjson_out); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        //oci_bind_by_name($consulta,':v_pcoincidencia',$request->v_pcoincidencia);
        oci_bind_by_name($consulta, ':v_pjson_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }
    function P_INSERTA_PRUEBA(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_INSERTA_PRUEBA(
                                                                                        :v_pdocumento,
                                                                                        :v_pcups,
                                                                                        :v_pcontrato,
                                                                                        :v_pnit,
                                                                                        :v_pobservacion,
                                                                                        :v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta,':v_pdocumento',$request->v_pdocumento);
        oci_bind_by_name($consulta,':v_pcups',$request->v_pcups);
        oci_bind_by_name($consulta,':v_pcontrato',$request->v_pcontrato);
        oci_bind_by_name($consulta,':v_pnit',$request->v_pnit);
        oci_bind_by_name($consulta,':v_pobservacion',$request->v_pobservacion);
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

	function P_LISTA_DPTO_ORIGEN(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_DPTO_ORIGEN(:v_pcoincidencia,:v_pjson_out); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcoincidencia',$request->v_pcoincidencia);
		oci_bind_by_name($consulta, ':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function P_LISTA_DPTO(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_DPTO(:v_pcoincidencia,:v_pjson_out); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcoincidencia',$request->v_pcoincidencia);
		oci_bind_by_name($consulta, ':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function P_LISTA_MPIO_ORIGEN(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_MPIO_ORIGEN(:v_pcoincidencia,
                                                                                    :v_pdpto,
                                                                                    :v_pjson_out ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcoincidencia',$request->v_pcoincidencia);
		oci_bind_by_name($consulta,':v_pdpto',$request->v_pdpto);
		oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
    function P_LISTA_MPIO(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_MPIO(:v_pcoincidencia,
                                                                                    :v_pdpto,
                                                                                    :v_pjson_out ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcoincidencia',$request->v_pcoincidencia);
		oci_bind_by_name($consulta,':v_pdpto',$request->v_pdpto);
		oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
    function P_LISTA_IPS_ESTRATEGIA(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_IPS_ESTRATEGIA(  :v_pcod_mpio,
																								:v_pregimen,
                                                                                                :v_pjson_out ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcod_mpio',$request->v_pcod_mpio);
		oci_bind_by_name($consulta,':v_pregimen',$request->v_pregimen);
		oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
    function P_REGISTRO_UBIC_ESCENARIOS(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_REGISTRO_UBIC_ESCENARIOS(  :v_pjson_in,
                                                                                                    :v_pcantidad_esc,
                                                                                                    :v_pjson_out ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pjson_in',$request->v_pjson_in);
		oci_bind_by_name($consulta,':v_pcantidad_esc',$request->v_pcantidad_esc);
		oci_bind_by_name($consulta,':v_pjson_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	
	//nuevo
	function P_OBTENER_IPS()
	{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_OBTENER_IPS(  :v_pcoindicencia,
                                                                                    :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pcoindicencia', $request->v_pcoindicencia);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_LISTA_CONTRATO_IPS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_CONTRATO_IPS(   :v_pregimen,
                                                                                            :v_ptercero,
                                                                                            :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
    oci_bind_by_name($consulta, ':v_ptercero', $request->v_ptercero);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function p_lista_productos_contrato()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_PRODUCTOS_CONTRATO( :v_pdocumento,
                                                                                                :v_pnumero,
                                                                                                :v_pubicacion,
                                                                                                :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

                                      
function P_OBTENER_AFILIADO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_OBTENER_AFILIADO(         :v_ptipodocumento,
                                                                                                :v_pdocumento,
                                                                                                :v_ptipo_busqueda,
                                                                                                :v_papellido1,
                                                                                                :v_papellido2,
                                                                                                :v_pnombre1,
                                                                                                :v_pnombre2,
                                                                                                :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_ptipo_busqueda', $request->v_ptipo_busqueda);
    oci_bind_by_name($consulta, ':v_papellido1', $request->v_papellido1);
    oci_bind_by_name($consulta, ':v_papellido2', $request->v_papellido2);
    oci_bind_by_name($consulta, ':v_pnombre1', $request->v_pnombre1);
    oci_bind_by_name($consulta, ':v_pnombre2', $request->v_pnombre2);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_INSERTAR_DIR_AVANZADO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_INSERTAR_DIR_AVANZADO(    :v_pjson_in,
                                                                                                :v_pcantidad_afi,
                                                                                                :v_pjson_out); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_in', $request->v_pjson_in);
    oci_bind_by_name($consulta, ':v_pcantidad_afi', $request->v_pcantidad_afi);
    oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_LISTA_DIR_BASICO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_DIR_BASICO( :v_pregimen,
                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_LISTA_DETALLE_DIR_BASICO (){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_DETALLE_DIR_BASICO( :v_pregimen,
                                                                                                :v_pmpio_origen,
                                                                                                :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
    oci_bind_by_name($consulta, ':v_pmpio_origen', $request->v_pmpio_origen);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_LISTA_ESTRATEGIA_DIR_BASICO ()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.p_lista_estrategia_dir_basico( :v_pregimen,
                                                                                                :v_pmpio_origen,
                                                                                                :v_pmpio_destino,
                                                                                                :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
    oci_bind_by_name($consulta, ':v_pmpio_origen', $request->v_pmpio_origen);
    oci_bind_by_name($consulta, ':v_pmpio_destino', $request->v_pmpio_destino);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
