<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
	function obtenermunicipio(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_MUNICIPIO");
	  oci_execute($consulta);
    $rows = array();while($row = oci_fetch_assoc($consulta))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
	}
  function obtenerempleados(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $v_municipio = $request->v_municipio; 
  $consulta = oci_parse($c,'begin pq_genesis_no.p_obtener_empleados(:v_municipio,:v_json_res); end;');
  oci_bind_by_name($consulta,':v_municipio',$v_municipio);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}
	function obtenerentidad(){
		require_once('../config/dbcon_prod.php');
			global $request;
			$consulta =  oci_parse($c,"SELECT CODIGO, CODIGO || ' - ' || NOMBRE  AS NOMBRE FROM VW_ENTIDAD");
		  oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
		  $rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
  function obtenergruposisbeniv(){
		require_once ('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN pq_genesis_al.p_mostrar_grupo_sisbeIV(:v_json_out); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }
   oci_close($c);
	}
  function obtenersubgruposisbeniv(){
		require_once ('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN pq_genesis_al.p_mostrar_subgrupo_sisbeIV(:v_PSIC_GRUPO,:v_json_out); end;');
    oci_bind_by_name($consulta, ':v_PSIC_GRUPO', $request->tipo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }
   oci_close($c);
	}
	function obteneragrupoPoblacional(){
		require_once ('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN pq_genesis_al.p_mostrar_GPoblacional(:v_tipo,:v_json_out); end;');
    oci_bind_by_name($consulta, ':v_tipo', $request->metodo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }
   oci_close($c);
	}
	function obteneragrupoPoblacional_old(){
    require_once('../config/dbcon_prod.php');
      global $request;
      $consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_GPOBLACIONAL ORDER BY 1");
      oci_execute($consulta);
    $rows = array();while($row = oci_fetch_assoc($consulta))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
  }
  function obtenerdocumentoanexo(){
    require_once('../config/dbcon_prod.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_DOCUMENTOS");
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
	}
  function obtenerfuardatos(){
    require_once('../config/dbcon_prod.php');
		global $request;
    $empresa         = 1;
		$tipodoc 		     = $request->tipodoc;
		$documento 		   = $request->documento;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_MOSTRAR_FUARN(:v_pempresa,:v_ptipo_documento,:v_pdocumento,:v_json_row,:v_json_heading); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipodoc);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);

    $clob = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    $clob2 = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_heading', $clob2,-1,OCI_B_CLOB);

    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  		$json = $clob->read($clob->size());
      if (isset($clob2)) {
        $json2 = $clob2->read($clob2->size());
      }else{
        $json2 = "{}";
      }
  		echo '['.$json.','.$json2.']';
    oci_close($c);
	}
	function obtenerbeneficiario(){
    require_once('../config/dbcon_prod.php');
		global $request;
    $empresa         = 1;
		$tipodoc 		     = $request->tipodoc;
		$documento 		   = $request->documento;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.p_mostrar_fuarn(:v_pempresa,:v_ptipo_documento,:v_pdocumento,:v_json_row,:v_json_heading); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipodoc);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);

    $clob = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    $clob2 = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_heading', $clob2,-1,OCI_B_CLOB);

    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  		$json = $clob2->read($clob2->size());
  		echo '['.$json.']';
    oci_close($c);
	}
	function obteneranexo(){
    require_once('../config/dbcon_prod.php');
		global $request;
    $empresa         = 1;
		$tipodoc 		     = $request->tipodoc;
		$documento 		   = $request->documento;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_MOSTRAR_SOPORTE_DOC(:v_pempresa,:v_ptipo_documento,:v_pdocumento,:v_json_row,:v_json_heading); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipodoc);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);

    $clob = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    $clob2 = oci_new_descriptor($c,OCI_D_LOB);
  	oci_bind_by_name($consulta, ':v_json_heading', $clob2,-1,OCI_B_CLOB);

    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  		$json = $clob->read($clob->size());
      if (isset($clob2)) {
        $json2 = $clob2->read($clob2->size());
      }else{
        $json2 = "{}";
      }
  		echo '['.$json.']';
    oci_close($c);
	}
  function obtenerescenarios(){
    require_once('../config/dbcon_prod.php');
		global $request;
    $municipio   = $request->municipio;
		$consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_ESCENARIO V WHERE V.Paqn_Ubicacion = :v_ubicacion");
    oci_bind_by_name($consulta,':v_ubicacion',$municipio);

	  oci_execute($consulta);
    $rows = array();while($row = oci_fetch_assoc($consulta))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
	}
  function obtenerescenariosdetalle(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $municipio   = $request->municipio;
    $escenario   = $request->escenario;
    $consulta =  oci_parse($c,"SELECT E.NOMBRE, E.descripcion FROM VW_ESCENARIO_DETALLE E WHERE E.UBICACION = :v_ubicacion AND E.IPS = :v_escenario");
    oci_bind_by_name($consulta,':v_ubicacion',$municipio);
    oci_bind_by_name($consulta,':v_escenario',$escenario);
    oci_execute($consulta);
    $rows = array();while($row = oci_fetch_assoc($consulta))
    {
      $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
  }
  function validarafiliacion(){
    require_once('../config/dbcon_prod.php');
		global $request;
    $empresa         = 1;
		$tipodoc 		     = $request->tipodoc;
		$documento 		   = $request->documento;
		$primernombre    = $request->primernombre;
		$segundonombre   = $request->segundonombre;
    $primerapellido  = $request->primerapellido;
		$segundoapellido = $request->segundoapellido;
    $fecnacimiento   = $request->fecnacimiento;

		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_VALIDA_AFILIACION(:v_pempresa,:v_ptipo_documento,:v_pdocumento,:v_pprimer_apellido,:v_psegundo_apellido,
                                                                         :v_pprimer_nombre,:v_psegundo_nombre,:v_pnacimiento,:v_salida,:v_mensaje); end;');
		oci_bind_by_name($consulta,':v_pempresa',$empresa);
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipodoc);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_pprimer_apellido',$primerapellido);
    oci_bind_by_name($consulta,':v_psegundo_apellido', $segundoapellido);
		oci_bind_by_name($consulta,':v_pprimer_nombre',$primernombre);
    oci_bind_by_name($consulta,':v_psegundo_nombre',$segundonombre);
		oci_bind_by_name($consulta,':v_pnacimiento',$fecnacimiento);
    oci_bind_by_name($consulta,':v_salida',$respuesta2,50);
    oci_bind_by_name($consulta,':v_mensaje',$respuesta,200);

    oci_execute($consulta,OCI_DEFAULT);
  	echo $respuesta2.'-'.$respuesta;

    oci_close($c);
  }
  function validaranexo(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $empresa         = 1;
    $tipodoc 		     = $request->tipodoc;
    $documento 		   = $request->documento;

    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_IS_SOPORTE_DOC(:v_pempresa,:v_pdocumento,:v_ptipo_doc_afiliado,:v_salida,:v_mensaje); end;');
    oci_bind_by_name($consulta,':v_pempresa',$empresa);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodoc);
    oci_bind_by_name($consulta,':v_salida',$respuesta2,50);
    oci_bind_by_name($consulta,':v_mensaje',$respuesta,200);

    oci_execute($consulta,OCI_DEFAULT);
    echo $respuesta.'-'.$respuesta2;
  }
  function obtenerCabezaDatos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$empresa    = 1;
	$tipodoc  	= $request->tipodoc;
	$documento 	= $request->documento;

	$consulta = oci_parse($c,'begin PQ_GENESIS_AL.P_MOSTRAR_DATOS_CABEZA(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$tipodoc);
	oci_bind_by_name($consulta,':v_pdocumento',$documento);

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
  function validarAfiliadoCabeza()
{
   require_once ('../config/dbcon_prod.php');

   global $request;
   $tipodoc = $request->tipodoc;
   $documento = $request->documento;
   $consulta = oci_parse($c, 'BEGIN pq_genesis_al.p_valida_afiliado_cabeza(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
   oci_bind_by_name($consulta, ':v_ptipo_documento', $tipodoc);
   oci_bind_by_name($consulta, ':v_pdocumento', $documento);
   $clob = oci_new_descriptor($c, OCI_D_LOB);
   oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
   oci_execute($consulta, OCI_DEFAULT);
   if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
   }
   oci_close($c);
}
