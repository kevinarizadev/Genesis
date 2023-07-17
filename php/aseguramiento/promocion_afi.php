<?php
	
    $postdata = file_get_contents("php://input");
    // error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


	function Validar_existe_afiliado()
	{
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.p_valida_estado_afil (:v_ptipo_documento , :v_pdocumento, :v_json_row ); end;');
		oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_doc);
		oci_bind_by_name($consulta, ':v_pdocumento', $request->numero_doc);
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

	function registro_promocion_afi(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.P_eafp_insertar(:json_datos,
																					:v_json_row); end;');
		oci_bind_by_name($consulta,':json_datos',$request->datos);
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
    	
    function Obtener_Afiliados_Registrados()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.p_mostrar_datos_2(:p_tipog,:p_finicio,:p_ffinal,:p_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':p_tipog', $request->tipo_gestion);
	oci_bind_by_name($consulta, ':p_finicio', $request->fehca_inicio);
	oci_bind_by_name($consulta, ':p_ffinal', $request->fecha_fin);
	oci_bind_by_name($consulta, ':p_documento', $request->documento);
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

