<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function eliminarproyecto(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_ELIMINAR_PROYECTO_TIC(:v_pcod,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pcod',$id);
		oci_bind_by_name($consulta, ':v_prespuesta', $respuesta,120);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $respuesta;
		oci_close($c);
	}
?>
