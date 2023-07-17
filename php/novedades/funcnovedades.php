<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function buscaafiliado(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_busqueda_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$num);
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
	function cargamunicipios(){
		require_once('../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT mun.UBGN_CODIGO CODIGO,
										       dep.UBGC_NOMBRE || '-' || mun.UBGC_NOMBRE AS NOMBRE
										  	FROM BUBG_UBICACION_GEOGRAFICA mun
										 	INNER JOIN BUBG_UBICACION_GEOGRAFICA dep
										   ON to_number(to_char(mun.ubgn_pais)) || '000' = dep.ubgn_codigo
										 	WHERE mun.ubgn_padre > 1
										 	ORDER BY 2");
		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function cargacausales(){
		require_once('../config/dbcon_prod.php');
		$consulta = oci_parse($c,"SELECT cauc_codigo CODIGO, cauc_causal NOMBRE
										  	FROM eafi_causal_ingreso
										  	WHERE cauc_estado = 'A'
										 	ORDER BY 2");
		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function obtenerescenarios(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$ubicacion = $request->ubicacion;
		//$regimen = $request->regimen;
		$consulta = oci_parse($c,"SELECT codigo, nombre
										FROM vw_escenario_rs
										WHERE ubicacion = :ubicacion");
											//and regimen = :regimen");
		oci_bind_by_name($consulta,':ubicacion',$ubicacion);
		//oci_bind_by_name($consulta,':regimen',$regimen);
		oci_execute($consulta);
		$rows = array();
		while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function validadocs(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$t_documento = $request->t_documento;
		$n_documento = $request->n_documento;
		$p_nombre = $request->p_nombre;
		$s_nombre = $request->s_nombre;
		$p_apellido = $request->p_apellido;
		$s_apellido = $request->s_apellido;
		$municipio = $request->municipio;
		$escenario = $request->escenario;
		$sexo = $request->sexo;
		$f_nacimiento = $request->f_nacimiento;
		$estado = $request->estado;
		$ficha_sisben = $request->ficha_sisben;
		$n_sisben = $request->n_sisben;
		$discapacidad = $request->discapacidad;
		$gpoblacional = $request->gpoblacional;
		$zona = $request->zona;
		$causal = $request->causal;
		$reactiva = $request->reactiva;
		$metodologia_grup_pob = $request->metodologia_grup_pob;
		$grupo_sisbeniv = $request->grupo_sisbeniv;
		$subgrupo_sisbeniv = $request->subgrupo_sisbeniv;
		$causal_oficio_sisbeniv = $request->causal_oficio_sisbeniv;
		$puntajesisben = $request->puntajesisben;
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_valida_documentos(:v_ptipo_documento,
																							  	:v_pdocumento,
																							  	:v_new_tipo_documento,
																							  	:v_new_documento,
																							  	:v_new_primer_nombre,
																							  	:v_new_segundo_nombre,
																							  	:v_new_primer_apellido,
																							  	:v_new_segundo_apellido,
																							  	:v_new_municipio,
																							  	:v_new_escenario,
																							  	:v_new_sexo,
																							  	:v_new_ficha_sisben,
																							  	:v_new_nivel_sisben,
																							  	:v_new_estado_afiliado,
																							  	:v_new_fecha_nacimiento,
																							  	:v_discapacidad,
																							  	:v_gpoblacional,
																							  	:v_zona,
																							  	:v_new_causal,
																							  	:v_reactiva,
																							  	:v_new_metodologia_grup_pob,
																							  	:v_new_grupo_sisbeniv,
																							  	:v_new_subgrupo_sisbeniv,
																							  	:v_new_causal_oficio_sisbeniv,
																							  	:v_new_puntajesisben,
																							  	:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
		oci_bind_by_name($consulta,':v_new_tipo_documento',$t_documento);
		oci_bind_by_name($consulta,':v_new_documento',$n_documento);
		oci_bind_by_name($consulta,':v_new_primer_nombre',$p_nombre);
		oci_bind_by_name($consulta,':v_new_segundo_nombre',$s_nombre);
		oci_bind_by_name($consulta,':v_new_primer_apellido',$p_apellido);
		oci_bind_by_name($consulta,':v_new_segundo_apellido',$s_apellido);
		oci_bind_by_name($consulta,':v_new_municipio',$municipio);
		oci_bind_by_name($consulta,':v_new_escenario',$escenario);
		oci_bind_by_name($consulta,':v_new_sexo',$sexo);
		oci_bind_by_name($consulta,':v_new_ficha_sisben',$ficha_sisben);
		oci_bind_by_name($consulta,':v_new_nivel_sisben',$n_sisben);
		oci_bind_by_name($consulta,':v_new_estado_afiliado',$estado);
		oci_bind_by_name($consulta,':v_new_fecha_nacimiento',$f_nacimiento);
		oci_bind_by_name($consulta,':v_discapacidad',$discapacidad);
		oci_bind_by_name($consulta,':v_gpoblacional',$gpoblacional);
		oci_bind_by_name($consulta,':v_zona',$zona);
		oci_bind_by_name($consulta,':v_new_causal',$causal);
		oci_bind_by_name($consulta,':v_reactiva',$reactiva);
		oci_bind_by_name($consulta,':v_new_metodologia_grup_pob',$metodologia_grup_pob);
		oci_bind_by_name($consulta,':v_new_grupo_sisbeniv',$grupo_sisbeniv);
		oci_bind_by_name($consulta,':v_new_subgrupo_sisbeniv',$subgrupo_sisbeniv);
		oci_bind_by_name($consulta,':v_new_causal_oficio_sisbeniv',$causal_oficio_sisbeniv);
		oci_bind_by_name($consulta,':v_new_puntajesisben',$puntajesisben);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function guardacambiosIA(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$id = $request->id;
		$t_documento = $request->t_documento;
		$n_documento = $request->n_documento;
		$p_nombre = $request->p_nombre;
		$s_nombre = $request->s_nombre;
		$p_apellido = $request->p_apellido;
		$s_apellido = $request->s_apellido;
		$municipio = $request->municipio;
		$escenario = $request->escenario;
		$sexo = $request->sexo;
		$f_nacimiento = $request->f_nacimiento;
		$estado = $request->estado;
		$ficha_sisben = $request->ficha_sisben;
		$n_sisben = $request->n_sisben;
		$discapacidad = $request->discapacidad;
		$gpoblacional = $request->gpoblacional;
		$zona = $request->zona;
		//$direccion = $request->direccion;
		$causal = $request->causal;
		$reactiva = $request->reactiva;
		// if ($reactiva == "S"){
		// if ($reactiva == "S" || $causal == "B" ){
		// 	$f_nacimiento = $request->f_activacion;
		// }
		$f_activacion = isset($request->f_activacion) ? $request->f_activacion : '';
		$metodologia_grup_pob = $request->metodologia_grup_pob;
		$grupo_sisbeniv = $request->grupo_sisbeniv;
		$subgrupo_sisbeniv = $request->subgrupo_sisbeniv;
		$causal_oficio_sisbeniv = $request->causal_oficio_sisbeniv;
		$puntajesisben = $request->puntajesisben;
		$novedad_cbc = isset($request->novedad_cbc) ? $request->novedad_cbc : '';
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_guarda_cambios_ia(:v_ptipo_documento,
																							  	:v_pdocumento,
																							  	:v_new_tipo_documento,
																							  	:v_new_documento,
																							  	:v_new_primer_nombre,
																							  	:v_new_segundo_nombre,
																							  	:v_new_primer_apellido,
																							  	:v_new_segundo_apellido,
																							  	:v_new_municipio,
																							  	:v_new_escenario,
																							  	:v_new_sexo,
																							  	:v_new_ficha_sisben,
																							  	:v_new_nivel_sisben,
																							  	:v_new_estado_afiliado,
																							  	:v_new_fecha_nacimiento,
																							  	:v_new_discapacidad,
																							  	:v_new_gpoblacional,
																							  	:v_new_zona,
																							  	:v_new_causal,
																							  	:v_reactiva,
																							  	:v_new_metodologia_grup_pob,
																							  	:v_new_grupo_sisbeniv,
																							  	:v_new_subgrupo_sisbeniv,
																							  	:v_new_causal_oficio_sisbeniv,
																							  	:v_new_puntajesisben,
																							  	:v_new_fecha_activacion,
																							  	:v_pescbc,
																							  	:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$id);
		oci_bind_by_name($consulta,':v_new_tipo_documento',$t_documento);
		oci_bind_by_name($consulta,':v_new_documento',$n_documento);
		oci_bind_by_name($consulta,':v_new_primer_nombre',$p_nombre);
		oci_bind_by_name($consulta,':v_new_segundo_nombre',$s_nombre);
		oci_bind_by_name($consulta,':v_new_primer_apellido',$p_apellido);
		oci_bind_by_name($consulta,':v_new_segundo_apellido',$s_apellido);
		oci_bind_by_name($consulta,':v_new_municipio',$municipio);
		oci_bind_by_name($consulta,':v_new_escenario',$escenario);
		oci_bind_by_name($consulta,':v_new_sexo',$sexo);
		oci_bind_by_name($consulta,':v_new_ficha_sisben',$ficha_sisben);
		oci_bind_by_name($consulta,':v_new_nivel_sisben',$n_sisben);
		oci_bind_by_name($consulta,':v_new_estado_afiliado',$estado);
		oci_bind_by_name($consulta,':v_new_fecha_nacimiento',$f_nacimiento);
		//oci_bind_by_name($consulta,':v_new_direccion',$direccion);
		oci_bind_by_name($consulta,':v_new_discapacidad',$discapacidad);
		oci_bind_by_name($consulta,':v_new_gpoblacional',$gpoblacional);
		oci_bind_by_name($consulta,':v_new_zona',$zona);
		oci_bind_by_name($consulta,':v_new_causal',$causal);
		oci_bind_by_name($consulta,':v_reactiva',$reactiva);
		oci_bind_by_name($consulta,':v_new_metodologia_grup_pob',$metodologia_grup_pob);
		oci_bind_by_name($consulta,':v_new_grupo_sisbeniv',$grupo_sisbeniv);
		oci_bind_by_name($consulta,':v_new_subgrupo_sisbeniv',$subgrupo_sisbeniv);
		oci_bind_by_name($consulta,':v_new_causal_oficio_sisbeniv',$causal_oficio_sisbeniv);
		oci_bind_by_name($consulta,':v_new_puntajesisben',$puntajesisben);
		oci_bind_by_name($consulta,':v_new_fecha_activacion',$f_activacion);
		oci_bind_by_name($consulta,':v_pescbc',$novedad_cbc);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function retirarafil(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$retiro = $request->retiro;
		$radicado = isset($request->radicado) ? $request->radicado : '';
		$num_tutela = isset($request->num_tutela) ? $request->num_tutela : '';
		$fecha_retiro = $request->fecha_retiro;
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_retiro_afiliado_ge(:v_ptipo_documento,:v_pdocumento,:v_motivo,:v_radicado,:v_numero_tutela,:v_fecha_retiro,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$type);
		oci_bind_by_name($consulta,':v_pdocumento',$num);
		oci_bind_by_name($consulta,':v_motivo',$retiro);
		oci_bind_by_name($consulta,':v_radicado',$radicado);
		oci_bind_by_name($consulta,':v_numero_tutela',$num_tutela);
		oci_bind_by_name($consulta,':v_fecha_retiro',$fecha_retiro);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function guardar_info_temp(){
		require_once('../config/dbcon_prod.php');
		global $request;

		$tipo_documento=$request->tipo_documento;
		$documento=$request->documento;
		$datos = $request->datos;
		$cedula = $_SESSION['cedula'];
		$fecha_nacimiento = date('d/m/Y', strtotime($request->fecha_nacimiento));
		$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_guardar_info_nov_temp (:v_tipo_documento_consultar,:v_documento_consulta,:v_json_in,:v_responsable,:v_fecha_nacimiento,:v_json_row); end;');
		$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta,':v_tipo_documento_consultar',$tipo_documento);
		oci_bind_by_name($consulta,':v_documento_consulta',$documento);
		oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
		$json_parametros->writeTemporary($datos);
		oci_bind_by_name($consulta,':v_responsable',$cedula);
		oci_bind_by_name($consulta,':v_fecha_nacimiento',$fecha_nacimiento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	function obtenerTutelasNovedad() {
		require_once('../config/dbcon_prod.php');
        global $request;
		$municipio = $request->municipio;
		$rol = $request->rol;
		$consulta = oci_parse($c,'begin pq_genesis_tut.p_busqueda_tutela(:v_municipio,:v_rol,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_municipio', $municipio);
		oci_bind_by_name($consulta,':v_rol',$rol);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }



function ValidaSoporteCargado(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_validar_soporte_cargado(:v_tipo_documento,:v_documento,:v_json_valida,:v_json_soporte); end;');
	oci_bind_by_name($consulta,':v_tipo_documento', $tipo_documento);
	oci_bind_by_name($consulta,':v_documento', $documento);
	$json_valida = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_valida', $json_valida,-1,OCI_B_CLOB);
	$json_soporte = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_soporte', $json_soporte,-1,OCI_B_CLOB);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_execute($consulta,OCI_DEFAULT);
	$valida = $json_valida->read($json_valida->size());
	$soporte = $json_soporte->read($json_soporte->size());
	$datos = '{"valida":'.$valida.',"soporte":'.$soporte.'}';
	echo($datos);
	oci_close($c);
}


function p_parentesco_acb(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_parentesco_acb(:v_ptipo_afil,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipo_afil',$request->tipo);
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

function p_mostrar_datos_acb(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'begin PQ_GENESIS_CA.p_mostrar_datos_acb(:v_ptipo_documento,:v_pdocumento,:v_ptipo_documento_cab,:v_pdocumento_cab,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipoDoc);
  oci_bind_by_name($consulta,':v_pdocumento',$request->doc);
  oci_bind_by_name($consulta,':v_ptipo_documento_cab',$request->tipoDocCab);
  oci_bind_by_name($consulta,':v_pdocumento_cab',$request->docCabeza);
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


function p_listar_condicion_dicapacidad(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'begin PQ_GENESIS_CA.p_listar_condicion_dicapacidad(:v_json_row); end;');
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

function p_acb_agrega_ben_acb(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'begin PQ_GENESIS_CA.p_acb_agrega_ben_acb(:v_ptipo_documento,:v_pdocumento,
  :v_ptipo_documento_cab,:v_pdocumento_cab,:v_ptipo_afiliado,:v_parentezco,:v_pdiscapacidad,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo_doc);
  oci_bind_by_name($consulta,':v_pdocumento',$request->numero_doc);
  oci_bind_by_name($consulta,':v_ptipo_documento_cab',$request->tipo_doc_cabeza);
  oci_bind_by_name($consulta,':v_pdocumento_cab',$request->numero_doc_cabeza);
  oci_bind_by_name($consulta,':v_ptipo_afiliado',$request->tipo_afi);
  // oci_bind_by_name($consulta,':v_ptipo',$request->tipo);
  oci_bind_by_name($consulta,':v_parentezco',$request->parentesco);
  oci_bind_by_name($consulta,':v_pdiscapacidad',$request->discapacidad);
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
