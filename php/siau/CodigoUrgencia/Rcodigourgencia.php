<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenerdiagnostico(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$coincidencia = $request->coincidencia;
		$sexo = $request->sexo;
		$edad = $request->edad;
		$hijo =  $request->hijo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_DIAGNOSTICO(:v_pcoincidencia,:v_psexo,:v_pedad,:v_phijo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
		oci_bind_by_name($consulta,':v_psexo',$sexo);
		oci_bind_by_name($consulta,':v_pedad',$edad);
		oci_bind_by_name($consulta,':v_phijo',$hijo);
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
	// function obtenerhistorico(){
	// 	require_once('../../config/dbcon_prod.php');
	// 	global $request;
	// 	$coincidencia = $request->coincidencia;

	// 	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_HISTORICO(:v_pcoincidencia,:v_json_row); end;');
	// 	oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
	//   $clob = oci_new_descriptor($c,OCI_D_LOB);
	// 	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	// 	oci_execute($consulta,OCI_DEFAULT);
	// 	if (isset($clob)) {
	// 		$json = $clob->read($clob->size());
	// 		echo '['.$json.']';
	// 	}else{
	// 		echo 0;
	// 	}
	// 	oci_close($c);
	// }
	function obtenerhistorico(){
			require_once('../../config/dbcon_prod.php');
			global $request;
			$coincidencia = 	$request->coincidencia;
			if($_SESSION['rol']=='IPS'){
						$nit =$_SESSION['nit'];
						$consulta = 	oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_HISTORICO_IPS(:v_pcoincidencia,:v_pnit,:v_json_row); end;');
						oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
						oci_bind_by_name($consulta,':v_pnit',$nit);
						$clob = 	oci_new_descriptor($c,OCI_D_LOB);
						oci_bind_by_name($consulta,':v_json_row', 	$clob,-1,OCI_B_CLOB);
						oci_execute($consulta,OCI_DEFAULT);
							$json = 	$clob->read($clob->size());
							echo 	'['.$json.']';
										oci_close($c);
	
			}else{
	
						$consulta = 	oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_HISTORICO(:v_pcoincidencia,:v_json_row); end;');
						oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
						$clob = 	oci_new_descriptor($c,OCI_D_LOB);
						oci_bind_by_name($consulta,	':v_json_row', $clob,-1,OCI_B_CLOB);
						oci_execute($consulta,OCI_DEFAULT);
							$json = 	$clob->read($clob->size());
							echo 	'['.$json.']';
										oci_close($c);
	
			}
	}
	
	function obtenerafiliados(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$tipodocumento = $request->tipodocumento;
		$documento= $request->documento;
		$nit= $request->nit;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_pnit,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_pnit',$nit);
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
?>
