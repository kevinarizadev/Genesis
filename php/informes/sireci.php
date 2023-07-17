<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function validar_sireci(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$anno          	 = $request->panno;
		$v_periodo      = $request->v_periodo;
		//if($request->pperiodo){$periodo = $request->pperiodo;} else {$periodo = 0;}

		$resultado			 = 0;
		$consulta = oci_parse($c,'SELECT count(*) cantidad
                              from ocnr_contrato_reporte
                              where cnrn_empresa = :v_pempresa and cnrn_anno = :v_panno and cnrn_periodo = :v_periodo');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_periodo',$v_periodo);
		oci_execute($consulta);

    $rows = array();
    while($row = oci_fetch_assoc($consulta)) {
      $resultado = $row['CANTIDAD'];
    }
    echo $resultado;
    oci_close($c);
  }

  function crea_sireci(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$anno          	 = $request->panno;
		$v_periodo       = $request->v_periodo;
		// if($request->v_periodo){$periodo = $request->v_periodo;} else {$periodo = 0;}

		$consulta = oci_parse($c,'begin p_n_contratos_contraloria(:v_pempresa, :v_panno, :v_pperiodo, :v_presultado); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$v_periodo);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_presultado', $clob,-1,OCI_B_CLOB);
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
