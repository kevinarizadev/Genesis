<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
    $function();
    
	function obtener_autorizacion(){
		require_once('../../config/dbcon.php');
		global $request;
		 $nit=$_SESSION['nit'];
		$documento=0;
        $numero=$request->numero; 
        
        $consulta = oci_parse($c,'begin pq_genesis_autpro.p_obtener_aut_ips(:v_pdocumento,
                                                                             :v_pnumero,
                                                                             :v_pnit,
																			 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pnit',$nit);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
    }
    function agendar(){
		require_once('../../config/dbcon.php');
		global $request;
		$numero=$request->numero;
		$fecha=$request->fecha;
        $consulta = oci_parse($c,'begin pq_genesis_autpro.p_gestiona_ips(:v_pnumero,
                                                                            :v_pfecha,
																			:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnumero',$numero);
		oci_bind_by_name($consulta,':v_pfecha',$fecha);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function listar_pendientes(){
		require_once('../../config/dbcon.php');
		global $request;
		 $nit=$_SESSION['nit'];
        
        $consulta = oci_parse($c,'begin pq_genesis_autpro.p_lista_autorizaciones_ips(:v_pnit,
																			 		 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function guardarjson(){
		require_once('../../config/dbcon.php');
		global $request;
		$jsondatos = json_decode($request->data);
		$cantidad=$request->cantidad; 
		$json1=$request->data; 
	
		$consulta = oci_parse($c,'begin pq_genesis_autpro.p_gestiona_ips_arc(:v_pjson_row_in,
																			:v_pcantidad,
																			:v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pjson_row_in',$request->data);
		oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
		
	}
	function listar_realizadas(){
		require_once('../../config/dbcon.php');
		global $request;
		 $nit=$_SESSION['nit'];
		 $palabra=$request->coincidencia; 
        
		$consulta = oci_parse($c,'begin pq_genesis_autpro.p_lista_autorizaciones_generadas(:v_pnit,
																						   :v_pcoincidencia,
																			 :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pnit',$nit);
		oci_bind_by_name($consulta,':v_pcoincidencia',$palabra);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
