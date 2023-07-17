<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
  	$function = $request->function;
  	$function();
  	function verificapass(){
  		require_once('../config/dbcon.php');
  		global $request;
  		$consulta = oci_parse($c,'begin pq_genesis.p_recuperar_pass(:v_ptipo_documento,:v_pdocumento,:v_fechaexpedicion,:v_res); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->type);
		oci_bind_by_name($consulta,':v_pdocumento',$request->id);
		oci_bind_by_name($consulta,':v_fechaexpedicion',$request->expedicion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
  	}
  	function verificapassfunc(){
		require_once('../config/dbcon.php');
  		global $request;
  		$consulta = oci_parse($c,'begin pq_genesis.p_recuperar_passfun(:v_pdocumento,:v_res); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$request->id);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
  	function actualizacorreo(){
  		require_once('../config/dbcon.php');
  		global $request;
  		$na = "";
		$consulta = oci_parse($c,'begin pq_genesis_ca.p_actualiza_contacto_afil(:v_ptipo_documento,
																			  :v_pdocumento,
																			  :p_telefono,
																			  :p_celular,
																			  :p_celular2,
																			  :p_correo,
																			  :p_direccion,
																			  :p_localidad,
																			  :p_res); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->type);
		oci_bind_by_name($consulta,':v_pdocumento',$request->id);
		oci_bind_by_name($consulta,':p_telefono',$na);
		oci_bind_by_name($consulta,':p_celular',$na);
		oci_bind_by_name($consulta,':p_celular2',$na);
		oci_bind_by_name($consulta,':p_correo',$request->correo);
		oci_bind_by_name($consulta,':p_direccion',$na);
		oci_bind_by_name($consulta,':p_localidad',$na);
		oci_bind_by_name($consulta,':p_res',$respuesta,100);
		$res = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $respuesta;
		oci_close($c);
  	}
  	function verificapassips(){
  		require_once('../config/dbcon.php');
  		global $request;
  		$consulta = oci_parse($c,'begin pq_genesis.p_recuperar_passips(:v_pnit,:v_pusuario,:v_res); end;');
		oci_bind_by_name($consulta,':v_pnit',$request->nit);
		oci_bind_by_name($consulta,':v_pusuario',$request->usuario);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
  	}
  	function actualizacorreoips(){
  		require_once('../config/dbcon.php');
  		global $request;
		$consulta = oci_parse($c,'begin pq_genesis.p_actualiza_correo_ips(:v_nit,
																							  :v_usuario,
																							  :v_new_correo,
																							  :v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$request->nit);
		oci_bind_by_name($consulta,':v_usuario',$request->usuario);
		oci_bind_by_name($consulta,':v_new_correo',$request->new_correo);
		oci_bind_by_name($consulta,':v_res',$res);
		$cons = oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		echo $res;
		oci_close($c);
  	}
?>