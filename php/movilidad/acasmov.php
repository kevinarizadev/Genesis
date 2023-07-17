<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function obteneracasenvivo(){
			require_once('../config/dbcon_prod.php');
			global $request;
			$estado = $request->estado;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_ENVIVO(:v_pestado,:v_json_row); end;');
			oci_bind_by_name($consulta,':v_pestado',$estado);
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

	function obteneracasconcepto(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_PORCONCEPTO(:v_json_row); end;');
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
	function obteneracaspropios(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ASEG.P_OBTENER_DPTO_ASEGURAMIENTO(:v_json_row); end;');
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

		function obteneracaspropioshoy(){
			require_once('../config/dbcon_prod.php');
			global $request;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_SOPORTE_HOY(:v_json_row); end;');
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

		function acaspropioshoy(){
			require_once('../config/dbcon_prod.php');
			global $request;
			$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_ACAS_TABLA(:v_json_row); end;');
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

	  function obteneracashistorico(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_HISTORICO(:v_json_row); end;');
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
	//P_OBTENER_ACAS_GENERALES
	  function obteneracasengenerales(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_GENERALES(:v_json_row); end;');
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
	//
	//
	function obteneracastic(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_MCM.P_OBTENER_ACAS_TIC(:v_json_row); end;');
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
	// function obtenerAcas(){
	// 		 require_once('../../config/dbcon_prod.php');
	// 		 global $request;
	// 		 $keyword = '%'.$request->keyword.'%';
	// 		 $keyword2 = $request->keyword;
	// 		 $consulta =  oci_parse($c," select bt.terc_nombre as nombre,
	// 																				bt2.terc_nombre as nombre_autoriza,
	// 										 u.casn_ubicacion UBICACION,
	//                                          u.casn_numero as numero,
	//                                          u.cast_asunto as asunto,
	//                                          to_char(u.cash_hora,'dd/mm/yyyy hh24:mi') as fecha_ingreso,
	//                                          to_char(u.cash_cierre,'dd/mm/yyyy hh24:mi') as fecha_cierre,
	//                                          case when u.casc_estado = 'A' then trunc(to_date(sysdate,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) else trunc(to_date(u.cash_cierre,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) end dias,
	//                                          bu.ubgc_nombre as ciudad,
	//                                          b.carc_nombre as cargo,
	//                                          u.cast_diagnostico as descripcion
	//                                   from acas_caso u
	//                                   inner join bter_tercero bt on bt.terv_codigo = u.casv_tercero
	// 																	left join bter_tercero bt2 on bt2.terv_codigo = u.casv_autoriza
	//                                   inner join bubg_ubicacion_geografica bu on bu.ubgn_codigo = u.casn_ubicacion
	//                                   inner join bcar_cargo b on b.carn_codigo = bt.tern_cargo
	//                                   where u.casc_documento = 'RE' and bt.terc_nombre like UPPER(:keyword) or to_char(u.casn_numero) = :keyword2
	// 																  order by u.casn_numero desc");
	// 		 oci_bind_by_name($consulta,':keyword',$keyword);
	// 		 oci_bind_by_name($consulta,':keyword2',$keyword2);
	// 		 oci_execute($consulta);
	// 		 $rows = array();while($row = oci_fetch_assoc($consulta))
	// 		 {
	// 			 $rows[] = $row;
	// 		 }
	// 		 echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	// 		 oci_close($c);
	// 	 }
	// function obtenerAcasXPersona(){
	// 	 		 require_once('../../config/dbcon_prod.php');
	// 	 		 global $request;
	// 	 		 $cedula = $request->cedula;
	// 			 $estado = $request->estado;
	// 	 		 $consulta =  oci_parse($c," select bt.terc_nombre as nombre,
	// 																					bt2.terc_nombre as nombre_autoriza,
	// 																					u.casn_ubicacion as ubicacion,
	// 	                                        u.casn_numero as numero,
	// 	                                        u.cast_asunto as asunto,
	// 	                                        to_char(u.cash_hora,'dd/mm/yyyy hh24:mi') as fecha_ingreso,
	// 	                                        to_char(u.cash_cierre,'dd/mm/yyyy hh24:mi') as fecha_cierre,
	// 	                                        case when u.casc_estado = 'A' then trunc(to_date(sysdate,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) else trunc(to_date(u.cash_cierre,'DD/MM/YYYY hh24:mi:ss'))-trunc(to_date(u.cash_hora,'DD/MM/YYYY hh24:mi:ss')) end dias,
	// 	                                        bu.ubgc_nombre as ciudad,
	// 	                                        b.carc_nombre as cargo,
	// 	                                        u.cast_diagnostico as descripcion
	// 	                                 from acas_caso u
	// 	                                 inner join bter_tercero bt on bt.terv_codigo = u.casv_tercero
	// 																	 left join bter_tercero bt2 on bt2.terv_codigo = u.casv_autoriza
	// 	                                 inner join bubg_ubicacion_geografica bu on bu.ubgn_codigo = u.casn_ubicacion
	// 	                                 left join bcar_cargo b on b.carn_codigo = bt.tern_cargo
	// 	                                 where u.casc_documento = 'RE' and u.casv_autoriza = :cedula and u.casc_estado = :estado
	// 																	 order by u.casn_numero desc");
	// 	 		 oci_bind_by_name($consulta,':estado',$estado);
	// 	 		 oci_bind_by_name($consulta,':cedula',$cedula);
	// 	 		 oci_execute($consulta);
	// 	 		 $rows = array();while($row = oci_fetch_assoc($consulta))
	// 	 		 {
	// 	 			 $rows[] = $row;
	// 	 		 }
	// 	 		 echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	// 	 		 oci_close($c);
	// 	 	 }
	// function obtenerAcasDetalleXticket(){
	// 		 		require_once('../../config/dbcon_prod.php');
	// 		 		global $request;
	// 		 		$ticket = $request->ticket;
	// 				$ubicacion = $request->ubicacion;
	// 		 		$consulta =  oci_parse($c," select j.csdn_renglon as renglon,
	// 	 		                                     to_char(j.csdh_entrega,'dd/mm/yyyy hh24:mi') as fecha,
	// 	 		                                     j.csdt_descripcion as descripcion
	// 	 		                               from acsd_caso_detalle j
	// 	 		                               where j.csdc_documento = 'RE' and j.csdn_ubicacion = :ubicacion and j.csdn_numero = :ticket
	// 																		 order by j.csdn_renglon desc");
	// 		 		oci_bind_by_name($consulta,':ticket',$ticket);
	// 				oci_bind_by_name($consulta,':ubicacion',$ubicacion);
	// 		 		oci_execute($consulta);
	// 		 		$rows = array();while($row = oci_fetch_assoc($consulta))
	// 		 		{
	// 		 			$rows[] = $row;
	// 		 		}
	// 		 		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	// 		 		oci_close($c);
	// 		 	}
	// function obtenerDptoTic(){
	// 		require_once('../../config/dbcon_prod.php');
	// 		global $request;
	// 		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_DPTO_TIC(:v_json_row); end;');
	// 		$clob = oci_new_descriptor($c,OCI_D_LOB);
	// 		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	// 		oci_execute($consulta,OCI_DEFAULT);
	// 		if (isset($clob)) {
	// 			$json = $clob->read($clob->size());
	// 			echo $json;
	// 		}else{
	// 			echo 0;
	// 		}
	// 		oci_close($c);
	// }
?>
