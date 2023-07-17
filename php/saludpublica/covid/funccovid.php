<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function BuscaAfiliado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_busco_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function verHistorico()
{
	global $request;

	$tipo = $request->data->tipo;
	$documento = $request->data->documento;

	require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_ver_historico (
            :v_tipo,
            :v_documento,
            :v_response
        ); end;'
	);

	oci_bind_by_name($consulta, ':v_tipo', $tipo);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);


	$datos = null;

	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode([
		"data" => count($datos) === 0 ? null : $datos
	]);
	exit;
}

function ListarSoportes()
{
	global $request;

	require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

	$documento = $request->data->documento;

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_listar_soporte_covid (
			:v_documento,
          	:v_response
        ); end;'
	);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);


	$datos = null;

	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode([
		"data" => count($datos) === 0 ? null : $datos
	]);
	exit;
}

function BuscaAfiliadoSinDocumento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $_SESSION['cedula'];
	$tipo = $_SESSION['tipo'];
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_busco_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function ListarSoportesSinDocumento()
{
	global $request;

	require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

	$documento = $_SESSION['cedula'];

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_listar_soporte_covid (
			:v_documento,
          	:v_response
        ); end;'
	);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);


	$datos = null;

	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode([
		"data" => count($datos) === 0 ? null : $datos
	]);
	exit;
}


function listaEstado()
{
    global $request;

    require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);
	
	$estado = $request->data->estado;
	$ubicacion = $request->data->ubicacion;

	$consulta = oci_parse(
        $c,
		'begin pq_genesis_salud_publica.p_listado_estado (
			:v_estado_covid,
			:v_ubicacion,
			:v_response
		); end;'
    );

    oci_bind_by_name($consulta, ':v_estado_covid', $estado, -1);
    oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion, -1);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);

    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function listarCantidad()
{
    global $request;

    require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);
	
	$ubicacion = $request->data->ubicacion;

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_listar_cantidad(
			:v_ubicacion,
          :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion, -1);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);

    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // oci_close($c);
    // $data = json_decode($clob->read($clob->size()), true);
    // header('Content-Type: application/json');
    $formatted = $datos;
    // foreach ($datos as $record) {
    //     $formatted[] = [
    //         "codigo" => $record["CODIGO"],
    //         "nombre" => $record["NOMBRE"],
    //         "cantidad" => $record["CANTIDAD"]
    //     ];
    // }
    echo json_encode([
        "data" => count($formatted) === 0 ? null : $formatted
    ]);
    exit;
}



function GeneraNovedad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$direccion = $request->direccion;
	$barrio = $request->barrio;
	$celular = $request->celular;
	$celular2 = $request->celular2;
	$consulta = oci_parse($c, 'begin pq_genesis.p_genera_novedad(:v_tipo_documento,
															 :v_documento,
															 :v_new_direccion,
															 :v_new_barrio,
															 :v_new_celular,
															 :v_new_celular2,
															 :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_new_direccion', $direccion);
	oci_bind_by_name($consulta, ':v_new_barrio', $barrio);
	oci_bind_by_name($consulta, ':v_new_celular', $celular);
	oci_bind_by_name($consulta, ':v_new_celular2', $celular2);
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


function CrearEvolucion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$fecha = $request->fecha;
	$observacion = $request->observacion;
	$usuario = $request->usuario;
	$consulta = oci_parse($c, 'begin pq_genesis.p_registra_seguimiento_covid19(:v_tipo_documento,
															 :v_documento,
															 :v_fecha_seguimiento,
															 :v_observacion,
															 :v_usuario_registro,
															 :v_response); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_fecha_seguimiento', $fecha);
	oci_bind_by_name($consulta, ':v_observacion', $observacion);
	oci_bind_by_name($consulta, ':v_usuario_registro', $usuario);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function VerEvolucion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$consulta = oci_parse($c, 'begin pq_genesis.p_lista_evolucion_covid19(:v_tipo_documento,
															 :v_documento,
															 :v_json_res); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function ListarSelect(){
global $request;
require_once('../../config/dbcon_prod.php');
$campo = $request->campo;
$cursor = oci_new_cursor($c);
$consulta = oci_parse($c,'begin pq_genesis_salud_publica.p_lista_parametros_covid19(:v_campo,:v_response); end;');
oci_bind_by_name($consulta, ':v_campo', $campo);
oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);
$datos = null;
oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
oci_free_statement($consulta);
oci_free_statement($cursor);
$formatted = [];
foreach ($datos as $record) {
$formatted[] = [
"codigo" => trim($record ["CODIGO"]),
"nombre" => trim($record ["NOMBRE"])
];
}
echo json_encode(count($formatted) === 0 ? null : $formatted);
exit;
}

function RegistraEstadoAfiliado(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_gestion_covid19(:v_ptipo_documento,
                             													:v_pdocumento,
                             													:v_pantecedentes,
                             													:v_pdiscapacidad,
                             													:v_pfuente,
                             													:v_pestado,
                             													:v_pf_inicio_sintomas,
                             													:v_pf_consulta_inicial,
                             													:v_pf_toma_muestra,
                             													:v_presultado,
                             													:v_pf_informe_resultado,
                             													:v_pent_reporta_resultado,
                             													:v_pduracion_resultado,
                             													:v_ptipo_caso,
                             													:v_pprocedencia,
                             													:v_ptipo_atencion,
                             													:v_pips_atencion,
                             													:v_ptratamiento,
                             													:v_pestado_vital,
                             													:v_pf_muerte,
                             													:v_ptermina_tratamiento,
                             													:v_pf_terminacion,
                             													:v_presultado_tratamiento,
                             													:v_pcondincion_final,
                             													:v_pusuario_registro,
                             													
															 					:v_response); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $tipo);
	oci_bind_by_name($consulta, ':v_pantecedentes', $tipo);
	oci_bind_by_name($consulta, ':v_pdiscapacidad', $tipo);
	oci_bind_by_name($consulta, ':v_pfuente', $tipo);
	oci_bind_by_name($consulta, ':v_pestado', $tipo);
	oci_bind_by_name($consulta, ':v_pf_inicio_sintomas', $tipo);
	oci_bind_by_name($consulta, ':v_pf_consulta_inicial', $tipo);
	oci_bind_by_name($consulta, ':v_pf_toma_muestra', $tipo);
	oci_bind_by_name($consulta, ':v_presultado', $tipo);
	oci_bind_by_name($consulta, ':v_pf_informe_resultado', $tipo);
	oci_bind_by_name($consulta, ':v_pent_reporta_resultado', $tipo);
	oci_bind_by_name($consulta, ':v_pduracion_resultado', $tipo);
	oci_bind_by_name($consulta, ':v_ptipo_caso', $tipo);
	oci_bind_by_name($consulta, ':v_pprocedencia', $tipo);
	oci_bind_by_name($consulta, ':v_ptipo_atencion', $tipo);
	oci_bind_by_name($consulta, ':v_pips_atencion', $tipo);
	oci_bind_by_name($consulta, ':v_ptratamiento', $tipo);
	oci_bind_by_name($consulta, ':v_pestado_vital', $tipo);
	oci_bind_by_name($consulta, ':v_pf_muerte', $tipo);
	oci_bind_by_name($consulta, ':v_ptermina_tratamiento', $tipo);
	oci_bind_by_name($consulta, ':v_pf_terminacion', $tipo);
	oci_bind_by_name($consulta, ':v_presultado_tratamiento', $tipo);
	oci_bind_by_name($consulta, ':v_pcondincion_final', $tipo);
	oci_bind_by_name($consulta, ':v_pusuario_registro', $tipo);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function RegistraEstado(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$dataRegistro = json_decode($request->dataRegistro);
	if ($dataRegistro->ant_hta == true){
		$dataRegistro->ant_hta = 'S';
	}else{
		$dataRegistro->ant_hta = 'N';
	}
	if ($dataRegistro->ant_dm == true){
		$dataRegistro->ant_dm = 'S';
	}else{
		$dataRegistro->ant_dm = 'N';
	}
	if ($dataRegistro->ant_cancer == true){
		$dataRegistro->ant_cancer = 'S';
	}else{
		$dataRegistro->ant_cancer = 'N';
	}
	if ($dataRegistro->ant_vih == true){
		$dataRegistro->ant_vih = 'S';
	}else{
		$dataRegistro->ant_vih = 'N';
	}
	if ($dataRegistro->ant_erc == true){
		$dataRegistro->ant_erc = 'S';
	}else{
		$dataRegistro->ant_erc = 'N';
	}
	if ($dataRegistro->ant_epoc == true){
		$dataRegistro->ant_epoc = 'S';
	}else{
		$dataRegistro->ant_epoc = 'N';
	}
	if ($dataRegistro->ant_asma == true){
		$dataRegistro->ant_asma = 'S';
	}else{
		$dataRegistro->ant_asma = 'N';
	}
	// $tipo_documento = 'CC';
	// $documento = '1143450658';
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_gestion_covid19(:v_ptipo_documento,
                             													:v_pdocumento,
                             													:v_pfecha_inicial,
																				:v_pantecedentes_hta,
																				:v_pantecedentes_dm,
																				:v_pantecedentes_cancer,
																				:v_pantecedentes_vih,                                  
																				:v_pantecedentes_erc,                                  
																				:v_pantecedentes_epoc,                                  
																				:v_pantecedentes_asma,
                             													:v_pdiscapacidad,
                             													:v_pfuente,
                             													:v_pestado,
                             													:v_pf_inicio_sintomas,
                             													:v_pf_consulta_inicial,
                             													:v_pf_toma_muestra,
                             													:v_presultado,
                             													:v_pf_informe_resultado,
                             													:v_pent_reporta_resultado,
                             													:v_pduracion_resultado,
                             													:v_ptipo_caso,
                             													:v_pprocedencia,
                             													:v_ptipo_atencion,
                             													:v_pips_atencion,
                             													:v_ptratamiento,
                             													:v_pestado_vital,
                             													:v_pf_muerte,
                             													:v_ptermina_tratamiento,
                             													:v_pf_terminacion,
                             													:v_presultado_tratamiento,
                             													:v_pcondincion_final,
                             													:v_pusuario_registro,
                             													:v_zona_afiliado,
                             													:v_laboratorio,
                               													:v_tipo_prueba,
															 					:v_response); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->doc);
	oci_bind_by_name($consulta, ':v_pfecha_inicial', $dataRegistro->fecha_inicial);
	oci_bind_by_name($consulta, ':v_pantecedentes_hta', $dataRegistro->ant_hta);
	oci_bind_by_name($consulta, ':v_pantecedentes_dm', $dataRegistro->ant_dm);
	oci_bind_by_name($consulta, ':v_pantecedentes_cancer', $dataRegistro->ant_cancer);
	oci_bind_by_name($consulta, ':v_pantecedentes_vih', $dataRegistro->ant_vih);
	oci_bind_by_name($consulta, ':v_pantecedentes_erc', $dataRegistro->ant_erc);
	oci_bind_by_name($consulta, ':v_pantecedentes_epoc', $dataRegistro->ant_epoc);
	oci_bind_by_name($consulta, ':v_pantecedentes_asma', $dataRegistro->ant_asma);
	oci_bind_by_name($consulta, ':v_pdiscapacidad', $dataRegistro->discapacidad);
	oci_bind_by_name($consulta, ':v_pfuente', $dataRegistro->fuente);
	oci_bind_by_name($consulta, ':v_pestado', $dataRegistro->estado);
	oci_bind_by_name($consulta, ':v_pf_inicio_sintomas', $dataRegistro->fecha_inicio_sintomas);
	oci_bind_by_name($consulta, ':v_pf_consulta_inicial', $dataRegistro->fecha_consulta_inicial);
	oci_bind_by_name($consulta, ':v_pf_toma_muestra', $dataRegistro->fecha_toma_muestra);
	oci_bind_by_name($consulta, ':v_presultado', $dataRegistro->resultado);
	oci_bind_by_name($consulta, ':v_pf_informe_resultado', $dataRegistro->fecha_informe_resultado);
	oci_bind_by_name($consulta, ':v_pent_reporta_resultado', $dataRegistro->ente_reporta);
	oci_bind_by_name($consulta, ':v_pduracion_resultado', $dataRegistro->periodo);
	oci_bind_by_name($consulta, ':v_ptipo_caso', $dataRegistro->tipo_caso);
	oci_bind_by_name($consulta, ':v_pprocedencia', $request->pais_procedencia);
	oci_bind_by_name($consulta, ':v_ptipo_atencion', $dataRegistro->tipo_atencion);
	oci_bind_by_name($consulta, ':v_pips_atencion', $request->ips_atencion);
	//oci_bind_by_name($consulta, ':v_ptratamiento', $dataRegistro->tratamiento_medico);
	oci_bind_by_name($consulta, ':v_ptratamiento', $request->tratamiento_medico);
	oci_bind_by_name($consulta, ':v_pestado_vital', $dataRegistro->estado_vital);
	oci_bind_by_name($consulta, ':v_pf_muerte', $dataRegistro->fecha_muerte);
	oci_bind_by_name($consulta, ':v_ptermina_tratamiento', $dataRegistro->termina_tratamiento);
	oci_bind_by_name($consulta, ':v_pf_terminacion', $dataRegistro->fecha_terminacion_tratamiento);
	oci_bind_by_name($consulta, ':v_presultado_tratamiento', $dataRegistro->resultado_tratamiento);
	oci_bind_by_name($consulta, ':v_pcondincion_final', $dataRegistro->condicion_final);
	oci_bind_by_name($consulta, ':v_pusuario_registro', $request->cedulalog);
	oci_bind_by_name($consulta, ':v_zona_afiliado', $dataRegistro->zona_afiliado);
		oci_bind_by_name($consulta, ':v_laboratorio', $dataRegistro->laboratorio_cargue);
	oci_bind_by_name($consulta, ':v_tipo_prueba', $dataRegistro->tipo_prueba_cargue);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Consultar_Muestras()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_listado_muestra(:v_documento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_documento', $request->documento);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	$array = array();
	while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
		array_push($array, array(
			'FECHAMUESTRA' => $row['FECHAMUESTRA'],
			'EVENTO' => $row['EVENTO'],
			'TIPODOCUMENTO' => $row['TIPODOCUMENTO'],
			'DOCUMENTO' => $row['DOCUMENTO'],
			'IPS_ENVIA' => $row['IPS_ENVIA'],
			'CONDICION_FINAL' => $row['CONDICION_FINAL'],
			'DIRECCION' => $row['DIRECCION'],
			'RESULTADO' => $row['RESULTADO'],
			'LABORATORIONOTIFICA' => $row['LABORATORIONOTIFICA'],
			'TIPOMUESTRA' => $row['TIPOMUESTRA']
		));
	}
	echo json_encode($array);

	oci_free_statement($consulta);
	oci_free_statement($curs);

	oci_close($c);
}

function ProcesarArchivoINS() {
	require_once('../../config/dbcon_prod.php');

	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_proceso_automatico(); end;');
	oci_execute($consulta, OCI_DEFAULT);
	oci_close($c);
}

function descargaDocumentos()
{
	global $request;

	require_once('../../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

	// $documento = $request->data->documento;

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_descargar_afiliado (
          	:v_response
        ); end;'
	);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);


	$datos = null;

	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

	oci_free_statement($consulta);
	oci_free_statement($cursor);

	if (file_exists("./SISMUESTRAS_DOCUMENTOS.zip")) {
		unlink("./SISMUESTRAS_DOCUMENTOS.zip");
	}

	if (count($datos) > 0) {
		$datos = array_map(function ($item) {
			return $item['DOCUMENTO'];
		}, $datos);

		$zip = new ZipArchive();
		$filename = "./SISMUESTRAS_DOCUMENTOS.zip";


		if ($zip->open($filename, ZipArchive::CREATE) !== TRUE) {
			exit("cannot open <$filename>\n");
		}

		$indice = 1;
		$indice_archivo = 1;
		$indice_count = 0;

		$contenido_archivo = '';

		$archivo_txt = "SIS$indice_archivo.txt";

		foreach ($datos as $documento) {
			if ($indice < 49) {
				if ($indice_count == count($datos) - 1) {
					$contenido_archivo .= $documento;

					$zip->addFromString($archivo_txt, $contenido_archivo);
					$contenido_archivo = '';
				} else {
					$contenido_archivo .= $documento . "\n";
				}
				$indice++;
			} else {
				$contenido_archivo .= $documento;

				$zip->addFromString($archivo_txt, $contenido_archivo);
				$contenido_archivo = '';
				$indice = 0;
				$indice_archivo++;
			}

			$archivo_txt = "SIS$indice_archivo.txt";

			$indice_count++;
		}

		$zip->close();
		header('Content-Type: application/zip');
		readfile($filename);
	} else {
		$zip = new ZipArchive();
		$filename = "./SISMUESTRAS_DOCUMENTOS.zip";


		if ($zip->open($filename, ZipArchive::CREATE) !== TRUE) {
			exit("cannot open <$filename>\n");
		}

		$zip->addFromString('VACIO', '');

		$zip->close();
		header('Content-Type: application/zip');
		ob_end_clean();
		readfile($filename);
	}
}

function obtenerAfiliadosNuevosPorFechaDeCargue()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$fecha = $request->data->fecha;
	$ubicacion = $request->data->ubicacion;

	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_listar_nuevo_seccional (:v_fecha, :v_ubicacion, :v_response); end;');
	oci_bind_by_name($consulta, ':v_fecha', $fecha);
	oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	// $formatted = [];
	// foreach ($datos as $record) {
	// 	$formatted[] = [
	// 		"codigo" => trim($record["CODIGO"]),
	// 		"nombre" => trim($record["NOMBRE"])
	// 	];
	// }
	echo json_encode([
		'data' => count($datos) === 0 ? null : $datos
	]);
	exit;
}

