<?php
	require_once('../config/dbcon_prod.php');
	$idempresa = $_GET['idempresa'];
	$idrol = $_GET['idrol'];
	//0,44,41,42,82,54,24,48,45,43
	if ($idrol == 46 || $idrol == 0 || $idrol ==44 || $idrol ==41 || $idrol ==42 || $idrol ==82 || $idrol ==54 || $idrol ==24 || $idrol ==48 || $idrol ==45 || $idrol ==43){
		$_SESSION['APRDOC'] = 1;
	}
	$cedula = isset($_SESSION['cedula']) ? $_SESSION['cedula'] : '';
	if (isset($_SESSION['tipo_sidebar'])) {
		if ($_SESSION['tipo_sidebar']=="2") {
			$nit = $_SESSION['nit'];
			$usuario = str_replace("NIT","",$_SESSION['usu']);
		} else if($_SESSION['tipo_sidebar']=="1") {
			$nit = $_SESSION['nit'];
			$usuario = $_SESSION['cedula'];
		} else {
			$nit = "890102044";
			$usuario =   $_SESSION['cedula'];
		}
		
		$consulta = oci_parse($c,'begin pq_genesis_login.P_LISTA_MODULOS(:v_pnit,:v_pusuario,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pusuario',$usuario);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	} else {
		$consulta = oci_parse($c,'begin PQ_MODULOS_AL.P_MOSTRAR_MODULO(:v_pempresa,:v_pcodigo_rol,:v_pidentificacion,:v_json_mod); end;');
		oci_bind_by_name($consulta,':v_pempresa',$idempresa);
		oci_bind_by_name($consulta,':v_pcodigo_rol',$idrol);
		oci_bind_by_name($consulta,':v_pidentificacion',$cedula);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_mod', $clob,-1,OCI_B_CLOB);
	}
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		// if(isset($_SESSION['tipo_sidebar'])){
		// 	$json = $clob->read($clob->size());
			// $datos = json_decode($json);
			// $datos->MODULOS = json_decode($datos->MODULOS);
		// 	$json = json_decode($json);
		// }
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
?>





