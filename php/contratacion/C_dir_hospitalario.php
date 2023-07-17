<?php
	
    $postdata = file_get_contents("php://input");
    // error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function obtenerdatoafiliado(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_busqueda_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo_doc);
		oci_bind_by_name($consulta,':v_pdocumento',$request->numero_doc);
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
	function Obtener_Servicios(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_TIPO_SERVICIO(:V_PEDAD,:V_PGENERO,:V_PJSON_OUT); end;');
		oci_bind_by_name($consulta,':V_PEDAD',$request->edad);
		oci_bind_by_name($consulta,':V_PGENERO',$request->genero);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	function obtenerdireccionamiento(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_SERVICIO_BASICO_HOSP(:V_PREGIMEN,:V_PMPIO_ORIGEN,:V_PACCION,:V_PCUPS,:V_PTIPO_SERVICIO,:V_PJSON_ROW); end;');
		oci_bind_by_name($consulta,':V_PREGIMEN',$request->regimen);
		oci_bind_by_name($consulta,':V_PMPIO_ORIGEN',$request->municipio);
		oci_bind_by_name($consulta,':V_PACCION',$request->accion);
		oci_bind_by_name($consulta,':V_PCUPS',$request->cups);
		oci_bind_by_name($consulta,':V_PTIPO_SERVICIO',$request->servicio);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }


    function P_LISTA_ESTRATEGIA_DIR_BASICO ()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_DIRECCIONAMIENTO_SERVICIOS.P_LISTA_ESTRATEGIA_DIR_SERVICIO_HOSP( :V_PREGIMEN,
                                                                                                :V_PSERVICIO,
                                                                                                :V_PCUPS,
                                                                                                :V_PMPIO_ORIGEN,
                                                                                                :V_PMPIO_DESTINO,
                                                                                                :V_PACCION,
                                                                                                :V_PJSON_ROW ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_PREGIMEN', $request->v_pregimen);
    oci_bind_by_name($consulta, ':V_PSERVICIO', $request->v_pservicio);
    oci_bind_by_name($consulta, ':V_PCUPS', $request->v_pcups);
    oci_bind_by_name($consulta, ':V_PMPIO_ORIGEN', $request->v_pmpio_origen);
    oci_bind_by_name($consulta, ':V_PMPIO_DESTINO', $request->v_pmpio_destino);
    oci_bind_by_name($consulta, ':V_PACCION', $request->v_paccion);
    oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
