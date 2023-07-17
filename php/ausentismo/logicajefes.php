<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function guardarjefe(){
    require_once('../config/dbcon_prod.php');
    global $request;
		$jefe = $request->jefe;
		$emisor = $request->emisor;
		$tipo = $request->tipo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AU.P_LOGICA_JEFE(:v_pemisor,:v_pjefe,:v_ptipo,:v_prespuesta); end;');
		oci_bind_by_name($consulta, ':v_pemisor', $emisor);
		oci_bind_by_name($consulta, ':v_pjefe', $jefe);
		oci_bind_by_name($consulta, ':v_ptipo', $tipo);
		oci_bind_by_name($consulta, ':v_prespuesta', $respuesta,40);
  	oci_execute($consulta,OCI_DEFAULT);
		echo $respuesta;
    oci_close($c);
  }

?>
