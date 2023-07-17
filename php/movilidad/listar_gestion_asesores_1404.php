<?php
	if($_GET["funcion"]==1){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_asesores(:v_pestado,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}else if ($_GET["funcion"]==2){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_asesores_detalle(:v_pnombre,:v_pestado,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnombre',$_GET["nombre"]);
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}else if($_GET["funcion"]==3){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_afiliaciones_asesores(:v_pestado,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}else if ($_GET["funcion"]==4){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_afiliaciones_asesores_detalle(:v_pnombre,:v_pestado,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pnombre',$_GET["nombre"]);
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	} if ($_GET["funcion"]==5){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_empresa_asesores_detalle_descarga(:v_pestado,:v_json_row); end;');
		// $estado = 'A';
		// oci_bind_by_name($consulta,':v_estado',$estado);
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$cursor = oci_new_cursor($c);
		oci_bind_by_name($consulta, ':v_json_row', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} if ($_GET["funcion"]==6){
		require_once('../config/dbcon_empresa.php');
		// $estado = 'A';
		$consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_afiliaciones_asesores_detalle_descarga(:v_pestado,:v_json_row); end;');
		// oci_bind_by_name($consulta,':v_estado',$estado);
		oci_bind_by_name($consulta,':v_pestado',$_GET["estado"]);
		$cursor = oci_new_cursor($c);
		oci_bind_by_name($consulta, ':v_json_row', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	}
?>