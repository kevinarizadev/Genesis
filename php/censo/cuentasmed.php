<?php

	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();

	function buscarcenso(){
		// echo "1";
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.P_OBTENER_CENSO(:v_pdocumento , :v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
		oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
	//obtenerperfil
	function obtenerperfil(){
		// echo "1";
		require_once('../config/dbcon_prod.php');
		global $request;
		$cursor = oci_new_cursor($c);

		$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.P_OBTENER_PERFIL(:v_responsable ,:v_response); end;');
		oci_bind_by_name($consulta,':v_responsable',$request->documento);
		oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
		
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = null;
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
	
		echo json_encode($datos) ;		
    }
	//cargar_adj
	function cargar_adj(){
		/* $scope.factura,
                num_cen: $scope.info.numero,
                ubicacion: $scope.info.ubicacion*/
		// echo "1";
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.P_INSERTAR_ADJ(:v_pnofac, :v_presponsable, :v_pnum_cen, :v_pubicacion, :v_json_row); end;');
		
		oci_bind_by_name($consulta,':v_presponsable',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_pnofac',$request->nofac);
		oci_bind_by_name($consulta,':v_pnum_cen',$request->num_cen);
		oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
		
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

	// detallecenso
	function detallecenso(){
		// echo "1";
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_detail_censo(:v_pnocenso , :v_pubicacion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnocenso',$request->censo);
		oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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


	
	
	function ins_auditoria(){
		// echo "1";
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.P_INS_AUDITORIA(:v_usuario , :v_descripcion,:v_pdocumento ,:v_pevento, :v_prespuesta,:v_pcodigo); end;');
		oci_bind_by_name($consulta,':v_usuario',$request->usuario);
		oci_bind_by_name($consulta,':v_descripcion',$request->descripcion);
		oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
		oci_bind_by_name($consulta,':v_pevento',$request->evento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_bind_by_name($consulta, ':v_pcodigo', $clob,-1,OCI_B_CLOB);
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