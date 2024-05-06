<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obtener_reporte(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$fechai1 = date('d/m/Y', strtotime($request->fechai1));
		$fechaf1 = date('d/m/Y', strtotime($request->fechaf1));
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.p_obtener_urgencias_consol(:v_pnit,
																				:v_pfecha_inicial,
																				:v_pfecha_final,
																				:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$request->nitips);
		oci_bind_by_name($consulta,':v_pfecha_inicial',$fechai1);
		oci_bind_by_name($consulta,':v_pfecha_final',$fechaf1);
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

//     function obtener_reporte()
// {
//     require_once('../config/dbcon_prod.php');
//   global $request;
// 		$fechai1 = date('d/m/Y', strtotime($request->fechai1));
// 		$fechaf1 = date('d/m/Y', strtotime($request->fechaf1));
//   $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CD.p_obtener_reporte_urgencia_2(:v_pnit,:v_pfecha_inicial,:v_pfecha_final,:v_response); end;');
//   oci_bind_by_name($consulta, ':v_pnit',$request->nit);
//   oci_bind_by_name($consulta, ':v_pfecha_inicial',$fechai1);
//   oci_bind_by_name($consulta, ':v_pfecha_final',$fechaf1);
//   $cursor = oci_new_cursor($c);
//   oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
//   oci_execute($consulta);
//   oci_execute($cursor, OCI_DEFAULT);
//   $datos = [];
//   oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
//   oci_free_statement($consulta);
//   oci_free_statement($cursor);
//   echo json_encode($datos);
// }
?>
