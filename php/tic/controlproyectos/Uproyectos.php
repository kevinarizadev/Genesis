<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function actualizarproyecto(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$responsable = $request->responsable;
		$estado = $request->estado;
		$fecha_inicio = $request->fecha_inicio;
		$fecha_fin = $request->fecha_fin;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PT.P_ACTUALIZAR_PROYECTO_TIC(:v_pcod,:v_presponsable,:v_pestado,:v_pfecha_inicio,:v_pfecha_fin,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pcod',$id);
		oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_pestado',$estado);
		oci_bind_by_name($consulta,':v_pfecha_inicio',$fecha_inicio);
		oci_bind_by_name($consulta,':v_pfecha_fin',$fecha_fin);
		oci_bind_by_name($consulta, ':v_prespuesta', $respuesta,120);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $respuesta;
		oci_close($c);
	}
?>
