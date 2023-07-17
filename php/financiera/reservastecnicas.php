<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function validareservagen(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen		     = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		//if($request->pperiodo){$periodo = $request->pperiodo;} else {$periodo = 0;}

		//$resultado=0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_valida_reserva(:v_pempresa, :v_panno, :v_pperiodo, :v_pregimen, :v_presultado); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_presultado',$resultado,9);
		oci_execute($consulta);
	//	if ($resultado=="1"){
			//echo "1";
	//	}else{
			echo $resultado;
		//}
	oci_close($c);
  }

	function obtenerlistareserva(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen		     = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_obtener_reserva(:v_pempresa,
																					  :v_panno,
																					  :v_pperiodo,
																					  :v_json_row_base,
																					  :v_json_row_ibnr
																						); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		$clob2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_json_row_base', $clob,-1,OCI_B_CLOB);
		oci_bind_by_name($consulta,':v_json_row_ibnr', $clob2,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json1 = $clob->read($clob->size());
		}else{
			$json1= 0;
		}
		if (isset($clob)) {
			$json2 = $clob2->read($clob2->size());
		}else{
			$json2= 0;
		}
		$var =  '{"base":'.$json1. 
            ',"ibnr":'.$json2.
            	'}';
    echo $var;

		oci_close($c);
	}

	function InsertaReserva(){
	  require_once('../config/dbcon_prod.php');
	  global $request;
	  $empresa         = 1;
		$tercero         = 0;
		$regimen         = 'A';
		$accion					 = 'I';
	  $anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		//if($request->pperiodo){$periodo = $request->pperiodo;} else {$periodo = 0;}
		$responsable 		 = $request->cedula;

	  $consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_registrar_reserva(:v_pempresa, :v_panno, :v_pperiodo, :v_pregimen, :v_ptercero, :v_presponsable, :v_paccion, :v_json_row); end;');
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
	  oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
	  oci_bind_by_name($consulta,':v_ptercero',$tercero);
	  oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_paccion', $accion);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
	  oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

	  if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

	function ActualizaReserva(){
	  require_once('../config/dbcon_prod.php');
	  global $request;
	  $empresa         = 1;
		$tercero         = 0;
		$regimen         = 'A';
		$accion					 = 'U';
	  $anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		//if($request->pperiodo){$periodo = $request->pperiodo;} else {$periodo = 0;}
		$responsable 		 = $request->cedula;

	  $consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_registrar_reserva(:v_pempresa, :v_panno, :v_pperiodo, :v_pregimen, :v_ptercero, :v_presponsable, :v_paccion, :v_json_row); end;');
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
	  oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
	  oci_bind_by_name($consulta,':v_ptercero',$tercero);
	  oci_bind_by_name($consulta,':v_presponsable',$responsable);
		oci_bind_by_name($consulta,':v_paccion', $accion);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
	  oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

	  if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

	function GeneraTriangulo(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		$triangulo 		   = $request->ptriangulo;
		$resultado			 = 0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_reserva_tri(:v_pempresa, :v_pregimen, :v_panno, :v_pperiodo, :v_ptriangulo, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_ptriangulo',$triangulo);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

	function p_obtener_ajuste(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$consecutivo     = $request->consecutivo;
		$codigo          = $request->codigo;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_obtener_ajuste(  :v_pempresa,
																						:v_pconseutivo, 
																						:v_ptriangulo,
																						:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pconseutivo',$consecutivo);
		oci_bind_by_name($consulta,':v_ptriangulo',$codigo);
	  	oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

	function ConsolidaTriangulo(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		$resultado			 = 0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_gen_reserva_tri(:v_pempresa, :v_pregimen, :v_panno, :v_pperiodo, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

	function ComentariosTriangulo(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		$consecutivo		 = $request->pconsecutivo;
		$resultado			 = 0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_reserva_observaciones(:v_pempresa, :v_pregimen, :v_pconsecutivo, :v_panno, :v_pperiodo, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}
	function calcular () {
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		$responsable  	 = $request->pcedula;
		$consecutivo		 = $request->pconsecutivo;
		$resultado			 = 0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_gen_reserva_aju(:v_pempresa, :v_pconsecutivo, :v_pregimen, :v_panno, :v_pperiodo, :v_pusuario, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_pusuario',$responsable);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);

	}


	function ActualizacionBase(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa         = 1;
		$regimen         = 'A';
		$anno          	 = $request->panno;
		$periodo         = $request->pperiodo;
		$base            = $request->pbase;
		$llave           = $request->pllave;
		$valor           = $request->pvalor;
		$responsable  	 = $request->pcedula;
		$consecutivo		 = $request->pconsecutivo;
		$resultado			 = 0;

		$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_registrar_ajuste(:v_pempresa, :v_pconsecutivo, :v_pregimen, :v_panno, :v_pperiodo, :v_pbase, :v_pllave, :v_pvalor, :v_pusuario, :v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
		oci_bind_by_name($consulta,':v_pregimen',$regimen);
		oci_bind_by_name($consulta,':v_panno',$anno);
		oci_bind_by_name($consulta,':v_pperiodo',$periodo);
		oci_bind_by_name($consulta,':v_pbase',$base);
		oci_bind_by_name($consulta,':v_pllave',$llave);
		oci_bind_by_name($consulta,':v_pvalor',$valor);
		oci_bind_by_name($consulta,':v_pusuario',$responsable);
	  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		oci_commit($c);

		if (isset($clob)) {
	    $json = $clob->read($clob->size());
	    echo $json;
	  }else{
	    echo 0;
	  }
	  oci_close($c);
	}

		function restaurarvalores(){
				require_once('../config/dbcon_prod.php');
				global $request;
				$empresa         = 1;
				$regimen         = 'A';
				$anno          	 = $request->panno;
				$periodo         = $request->pperiodo;
				$base            = $request->pbase;
				$llave           = $request->pllave;
				$responsable  	 = $request->pcedula;
				$consecutivo		 = $request->pconsecutivo;
				$resultado			 = 0;

				$consulta = oci_parse($c,'begin pq_genesis_reservas_tecnicas.p_gen_reserva_res(:v_pempresa, :v_pconsecutivo, :v_pregimen, :v_panno, :v_pperiodo, :v_pbase, :v_pllave, :v_pusuario, :v_json_row); end;');
				$clob = oci_new_descriptor($c,OCI_D_LOB);
				oci_bind_by_name($consulta,':v_pempresa',$empresa);
				oci_bind_by_name($consulta,':v_pconsecutivo',$consecutivo);
				oci_bind_by_name($consulta,':v_pregimen',$regimen);
				oci_bind_by_name($consulta,':v_panno',$anno);
				oci_bind_by_name($consulta,':v_pperiodo',$periodo);
				oci_bind_by_name($consulta,':v_pbase',$base);
				oci_bind_by_name($consulta,':v_pllave',$llave);
				oci_bind_by_name($consulta,':v_pusuario',$responsable);
				oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
				oci_execute($consulta,OCI_DEFAULT);
				oci_commit($c);

				if (isset($clob)) {
					$json = $clob->read($clob->size());
					echo $json;
				}else{
					echo 0;
				}
				oci_close($c);
	}



?>
