<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function ListarDepartamento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.listar_departamento(:v_json_res); end;');
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

function ListarMunicipio()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$departamento = $request->departamento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.listar_municipio(:v_departamento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_departamento', $departamento);
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


// Mesa De Ayuda Telecobro
function ListarMotivos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_motivos(:v_json_row); end;');
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

function ListarSubMotivos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$motivo = $request->codigo;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_submotivos(:v_motivo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_motivo', $motivo);
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

function ObtenerInfoTelecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informacion_telecobro(:v_json_res); end;');
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

function InsertarGestionTeleCobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_tipo_documento = $request->v_tipo_documento;
	$v_documento = $request->v_documento;
	$v_fecha_registro = $request->v_fecha_registro;
	$v_hora_registro = $request->v_hora_registro;
	$v_duracion_llamada = $request->v_duracion_llamada;
	$v_cod_ciudad = $request->v_cod_ciudad;
	$v_telefono = $request->v_telefono;
	$v_celular = $request->v_celular;
	$v_direccion = $request->v_direccion;
	$v_correo = $request->v_correo;
	$v_motivo = $request->v_motivo;
	$v_submotivo = $request->v_submotivo;
	$v_observacion = $request->v_observacion;
	$v_fec_recordatorio = $request->v_fec_recordatorio;
	$v_responsable = $request->v_responsable;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_inserta_llamada_telecobro(:v_tipo_documento,
																					:v_documento,
																					:v_fecha_registro,
																					:v_hora_registro,
																					:v_duracion_llamada,
																					:v_cod_ciudad,
																					:v_telefono,
																					:v_celular,
																					:v_direccion,
																					:v_correo,
																					:v_motivo,
																					:v_submotivo,
																					:v_observacion,
																					:v_fec_recordatorio,
																					:v_responsable,
																					:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $v_tipo_documento);
	oci_bind_by_name($consulta, ':v_documento', $v_documento);
	oci_bind_by_name($consulta, ':v_fecha_registro', $v_fecha_registro);
	oci_bind_by_name($consulta, ':v_hora_registro', $v_hora_registro);
	oci_bind_by_name($consulta, ':v_duracion_llamada', $v_duracion_llamada);
	oci_bind_by_name($consulta, ':v_cod_ciudad', $v_cod_ciudad);
	oci_bind_by_name($consulta, ':v_telefono', $v_telefono);
	oci_bind_by_name($consulta, ':v_celular', $v_celular);
	oci_bind_by_name($consulta, ':v_direccion', $v_direccion);
	oci_bind_by_name($consulta, ':v_correo', $v_correo);
	oci_bind_by_name($consulta, ':v_motivo', $v_motivo);
	oci_bind_by_name($consulta, ':v_submotivo', $v_submotivo);
	oci_bind_by_name($consulta, ':v_observacion', $v_observacion);
	oci_bind_by_name($consulta, ':v_fec_recordatorio', $v_fec_recordatorio);
	oci_bind_by_name($consulta, ':v_responsable', $v_responsable);
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

// Mesa De Ayuda Cartera
function CargarSoportes()
{
	require_once('../config/dbcon.php');
	require_once('../config/ftpcon.php');
	require_once('../upload_file/subir_archivo.php');
	global $request;
	$archivos = json_decode($request->archivos);
	$tipodocumento = 'CC'; //$request->tipodocumento;
	$documento = $request->numero;
	$hoy = date('dmY');
	$path = '/cargue_ftp/Digitalizacion/Genesis/MesaAyuda/REGIMENCONTRIBUTIVO/' . $hoy . '/';
	$estado = 0;
	for ($i = 0; $i < count($archivos); $i++) {
		$name = '132_R' . '_' . $tipodocumento . '_' . $documento . '_' . $hoy;
		$subio = subirDigitalizacionFTP($archivos[$i]->base64, $path, $name, $archivos[$i]->extension);
		if ($subio != '0 - Error') {
			$rutas[$i]->ruta = $subio;
			$rutas[$i]->codigo = '0';
		} else {
			$estado = $estado + 1;
		}
	}
	if ($estado == 0) {
		echo json_encode($rutas);
	} else {
		echo '0';
	}
}

// Registro Llamadas
function ListarMotivosLLamadas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_motivo_llamada(:v_json_row); end;');
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

function ConsultarSedeAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_consultar_sede(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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

function ConsultarAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_consultar_aportante(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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

function ObtenerInformacionAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$documento = $request->documento;
	$sede = $request->sede;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_datos_aportante(:v_ptipo_documento,:v_pdocumento,:v_sede,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_sede', $sede);	
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

function InsertarRegistroLlamadas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$razon_social = $request->razon_social;
	$fecha_registro = $request->fecha_registro;
	$hora_registro = $request->hora_registro;
	$duracion_llamada = $request->duracion_llamada;
	$cod_dpto = $request->cod_dpto;
	$telefono = $request->telefono;
	$celular = $request->celular;
	$direccion = $request->direccion;
	$correo = $request->correo;
	$motivo = $request->motivo;
	$tipo_llamada = $request->tipo_llamada;
	$persona_contacto = $request->persona_contacto;
	$proceso = $request->proceso;
	$sede = $request->sede;
	$numero = $request->numero;
	$observacion = $request->observacion;
	$responsable = $request->responsable;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_insertar_registro_llamada (:v_tipo_documento,
		:v_documento,
		:v_razon_social,
		:v_fecha_registro,
		:v_hora_registro,
		:v_duracion_llamada,
		:v_cod_ciudad,
		:v_telefono,
		:v_celular,
		:v_direccion,
		:v_correo,
		:v_motivo,
		:v_tipo_llamada,
		:v_persona_contacto,
		:v_observacion,
		:v_proceso,
		:v_tipo_sede,
		:v_numero,
		:v_responsable,
		:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo_documento);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_razon_social', $razon_social);
	oci_bind_by_name($consulta, ':v_fecha_registro', $fecha_registro);
	oci_bind_by_name($consulta, ':v_hora_registro', $hora_registro);
	oci_bind_by_name($consulta, ':v_duracion_llamada', $duracion_llamada);
	oci_bind_by_name($consulta, ':v_cod_ciudad', $cod_dpto);
	oci_bind_by_name($consulta, ':v_telefono', $telefono);
	oci_bind_by_name($consulta, ':v_celular', $celular);
	oci_bind_by_name($consulta, ':v_direccion', $direccion);
	oci_bind_by_name($consulta, ':v_correo', $correo);
	oci_bind_by_name($consulta, ':v_motivo', $motivo);
	oci_bind_by_name($consulta, ':v_tipo_llamada', $tipo_llamada);
	oci_bind_by_name($consulta, ':v_persona_contacto', $persona_contacto);
	oci_bind_by_name($consulta, ':v_observacion', $observacion);
	oci_bind_by_name($consulta, ':v_proceso', $proceso);
	oci_bind_by_name($consulta, ':v_tipo_sede', $sede);
	oci_bind_by_name($consulta, ':v_numero', $numero);		
	oci_bind_by_name($consulta, ':v_responsable', $responsable);
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


// Informe LLamada
function InformeLlamada()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_llamada(:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
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

function InformeCantidadCarta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_cantidad_carta(:v_pfecha_inicio,:v_pfecha_fin,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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


function InformeCarta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_carta(:v_pfecha_inicio,:v_pfecha_fin,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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


function DetalleCarta()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$fecha_inicio = $request->fecha_inicio;
	$fecha_fin = $request->fecha_fin;
	$documento = $request->documento;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_detalle_carta(:v_pfecha_inicio,:v_pfecha_fin,:v_pdocumento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $fecha_inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $fecha_fin);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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
			"codigo" => $record ["CODIGO"],
			"doc_aportante" => $record ["DOC_APORTANTE"],
			"nom_aportante" => $record ["NOM_APORTANTE"],
			"tipo_afiliado" => $record ["TIPO_AFILIADO"],
			"documento_afiliado" => $record ["DOCUMENTO_AFILIADO"],
			"nombre_afliado" => $record ["NOMBRE_AFLIADO"],
			"proceso" => $record ["PROCESO"],
			"tipo_error" => $record ["TIPO_ERROR"],
			"responsable" => $record ["RESPONSABLE"]
		];
	}
	echo json_encode(count($formatted) === 0 ? null : $formatted);
	exit;
}




function InformeMesaAyuda()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_mesa_ayuda_consol(:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
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

function TortaLlamadaRealizada()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_torta_registro_llamada_realizada(:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
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

function TortaLlamadaRecibida()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_torta_registro_llamada_recibida(:v_pfecha_1,:v_pfecha_2,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_1', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_2', $final);
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

function CantidadxPersona()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_cantidad_x_funcionario(:v_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_documento', $documento);
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

function DetalleMesaAyuda()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$doc = $request->doc;
	$numero = $request->numero;
	$ubicacion = $request->ubicacion;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_mesa_ayuda_detalle(:v_ptipo_doc_aportante,:v_pdocumento_aportante,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_historico,:v_empleador); end;');
	oci_bind_by_name($consulta, ':v_ptipo_doc_aportante', $tipo_documento);
	oci_bind_by_name($consulta, ':v_pdocumento_aportante', $documento);
	oci_bind_by_name($consulta, ':v_pdocumento', $doc);
	oci_bind_by_name($consulta, ':v_pnumero', $numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);

	$clob_historico = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_historico', $clob_historico, -1, OCI_B_CLOB);

	$clob_info_empleador = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_empleador', $clob_info_empleador, -1, OCI_B_CLOB);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_execute($consulta, OCI_DEFAULT);

	$historico = $clob_historico->read($clob_historico->size());
	$empleador = $clob_info_empleador->read($clob_info_empleador->size());
	$datos = '{"historico":' . $historico . ',"info_empleador":' . $empleador . '}';
	echo ($datos);
	oci_close($c);
}

// Generacion De Carta
function ConsolidadoAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_consolidado_aportante(:v_json_res); end;');
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

function ObtengoPeriodo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$nit = $request->nit;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_periodo(:v_nit,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_nit', $nit);
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

function ValidaAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_valida_aportante(:v_documento,:v_json_res); end;');
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

function SendMailAportante(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$json_aportante = $request->json_aportante;
	$cantidad = $request->cantidad;
	$responsable = $request->responsable;
	$tipo_proceso = $request->tipo_proceso;	
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_envia_correo_historico(:v_json_in,:v_cantidad,:v_responsable,:v_tipo_proceso,:v_json_res); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($json_aportante);
	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	oci_bind_by_name($consulta,':v_responsable',$responsable);
	oci_bind_by_name($consulta,':v_tipo_proceso',$tipo_proceso);
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


function ConsolidadoAIncumplimiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_incumplimiento_aportante(:v_json_res); end;');
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

function SendMailIncumplimiento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$json_aportante = $request->json_aportante;
	$cantidad = $request->cantidad;
	$responsable = $request->responsable;
	$tipo_proceso = $request->tipo_proceso;	
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_envia_correo_notificacion_mora(:v_json_in,:v_cantidad,:v_responsable,:v_tipo_proceso,:v_json_res); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($json_aportante);
	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	oci_bind_by_name($consulta,':v_responsable',$responsable);
	oci_bind_by_name($consulta,':v_tipo_proceso',$tipo_proceso);	
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

//Consulta Cartera

function ConsultarInfoAportante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_informacion_aportante(:v_tipo,:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_tipo', $tipo);
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

function ObtengoCotizante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_cotizante(:v_documento,:v_json_res); end;');
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

function ObtenerInformacionIncumplimiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_info_incumplimiento(:v_documento,:v_json_res); end;');
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

function ObtenerInformacionAvisoIncumplimiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_info_aviso_incumplimiento(:v_documento,:v_json_res); end;');
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

function DetalleIncumplimientoDetalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_incumplimiento_aportante_detalle(:v_documento,:v_json_res); end;');
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

function ObtenerInformacionFechaNacimiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_info_noti_fecha_limite(:v_documento,:v_json_res); end;');
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


function ObtenerListadoMensual()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_listado_mora_mensual(:v_json_res); end;');
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


function SendMailMoraMensual(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$json_aportante = $request->json_aportante;
	$cantidad = $request->cantidad;
	$responsable = $request->responsable;
	$tipo_proceso = $request->tipo_proceso;	
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_envia_correo_mora_mensual(:v_json_in,:v_cantidad,:v_responsable,:v_tipo_proceso,:v_json_res); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($json_aportante);
	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	oci_bind_by_name($consulta,':v_responsable',$responsable);
	oci_bind_by_name($consulta,':v_tipo_proceso',$tipo_proceso);	
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


function ObtenerHistorico()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_info_historico(:v_documento,:v_json_res); end;');
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

function ObtenerRegistroLlamadas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_obtener_info_llamadas(:v_documento,:v_json_res); end;');
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

function ObtenerCantidadesCarta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.cantidades_generacion_carta(:v_documento,:v_json_res); end;');
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



function ObtenerInformacionXImprimir()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = $request->estado;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$data = $request->data;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.print_carta(:v_estado,:v_tipo,:v_doc,:v_data,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_estado', $estado);
	oci_bind_by_name($consulta, ':v_tipo', $tipo);	
	oci_bind_by_name($consulta, ':v_doc', $documento);
	oci_bind_by_name($consulta, ':v_data', $data);	
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

function ObtenerDetalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_detalle_aportante(:v_documento,:v_json_res); end;');
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

function ActualizarInformacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$nit = $request->nit;
	$direccion = $request->direccion;
	$telefono = $request->telefono;
	$fijo = $request->fijo;
	$correo = $request->correo;
	$ubicacion = $request->ubicacion;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_actualizar_informacion(:v_tipo,:v_nit,:v_direccion,:v_telefono,:v_fijo,:v_correo,:v_ubicacion,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_tipo', $tipo);
	oci_bind_by_name($consulta, ':v_nit', $nit);
	oci_bind_by_name($consulta, ':v_direccion', $direccion);
	oci_bind_by_name($consulta, ':v_telefono', $telefono);
	oci_bind_by_name($consulta, ':v_fijo', $fijo);
	oci_bind_by_name($consulta, ':v_correo', $correo);
	oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
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

function InformeCartera()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.informe_cartera_global(:v_json_res); end;');
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

function MoraMensual()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_mora_mensual(:v_json_res); end;');
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

function MoraMensualCarta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_mora_envio_carta(:v_json_res); end;');
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

function ActualizarCartera()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_inserta_cartera_pend(:v_json_res); end;');
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


// Gestion Cartera FASE 2
function ListarGestionCartera()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_listar_gestion_cartera(:v_documento,:v_json_res); end;');
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


function GenerarAccionCartera()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$accion = $request->accion;
	$codigo = isset($request->codigo) ? $request->codigo : '';
	$estado = isset($request->estado) ? $request->estado : '';
	$responsable = isset($request->responsable) ? $request->responsable : '';	
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_generar_accion(:v_accion,:v_codigo,:v_estado,:v_responsable,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_accion', $accion);
	oci_bind_by_name($consulta, ':v_codigo', $codigo);
	oci_bind_by_name($consulta, ':v_estado', $estado);
	oci_bind_by_name($consulta, ':v_responsable', $responsable);
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



function ListarGestionXSegmento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_segmento = $request->tipo_segmento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_listar_info_segmentado(:v_tipo_segmento,:v_json_mora,:v_json_recuperado); end;');
	oci_bind_by_name($consulta, ':v_tipo_segmento', $tipo_segmento);
	$clob1 = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_mora', $clob1,-1,OCI_B_CLOB);
	$clob2 = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_recuperado', $clob2,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$json1 = $clob1->read($clob1->size());
	$json2 = $clob2->read($clob2->size());
	$resultado = '{"info_mora":'.$json1.',"info_recuperado":'.$json2.'}';
	echo($resultado);
	oci_close($c);
}



function ListarXLlamar()
{
	global $param;
	require_once('../config/dbcon_prod.php');
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_listar_x_llamar(:v_response); end;');
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
			"nom_departamento_aportante" => $record ["NOM_DEPARTAMENTO_APORTANTE"],
			"nom_muncipio_aportante" => $record ["NOM_MUNCIPIO_APORTANTE"],
			"nit" => $record ["NIT"],
			"nombre" => $record ["NOMBRE"],
			"periodos" => $record ["PERIODOS"],
			"valor_cartera" => $record ["VALOR_CARTERA"],
			"tipo_mora" => $record ["TIPO_MORA"],
			"ultima_llamada" => $record ["ULTIMA_LLAMADA"]
		];
	}
	echo json_encode(count($formatted) === 0 ? null : $formatted);
	exit;
}

function ListadoXLlamar()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_listado_x_llamar(:v_documento,:v_json_res); end;');
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

function DetalleAfiliadoLLamada()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_mostrar_detalle_llamada(:v_documento,:v_json_res); end;');
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


function ObtenerGestionLlamada()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$tipo_gestion = $request->tipo_gestion;
	$documento = $request->documento;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_obtener_gestion_llamada(:v_tipo_gestion,:v_documento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_tipo_gestion', $tipo_gestion);
	oci_bind_by_name($consulta, ':v_documento', $documento);
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
			"documento" => $record ["DOCUMENTO"],
			"nombre_funcionario" => $record ["NOMBRE_FUNCIONARIO"],
			"certificado_de_aportes_por_cotizante" => $record ["CERTIFICADO_DE_APORTES_POR_COTIZANTE"],
			"certificado_de_aportes" => $record ["CERTIFICADO_DE_APORTES"],
			"listado_de_usuarios_por_confirmar_afiliacion" => $record ["LISTADO_DE_USUARIOS_POR_CONFIRMAR_AFILIACION"],
			"personal_activo" => $record ["PERSONAL_ACTIVO"],
			"paz_y_salvo" => $record ["PAZ_Y_SALVO"],
			"mora" => $record ["MORA"]
		];
	}
	echo json_encode(count($formatted) === 0 ? null : $formatted);
	exit;
}

function InformeGestionLlamada()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$inicio = $request->inicio;
	$final = $request->final;
	$tipo_gestion = $request->tipo_gestion;
	$documento = $request->documento;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_cartera.p_informe_gestion_llamada(:v_pfecha_inicio,:v_pfecha_fin,:v_tipo_gestion,:v_pdocumento,:v_response); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
	oci_bind_by_name($consulta, ':v_tipo_gestion', $tipo_gestion);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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
			"documento" => $record ["DOCUMENTO"],
			"nombre_funcionario" => $record ["NOMBRE_FUNCIONARIO"],
			"certificado_de_aportes_por_cotizante" => $record ["CERTIFICADO_DE_APORTES_POR_COTIZANTE"],
			"certificado_de_aportes" => $record ["CERTIFICADO_DE_APORTES"],
			"listado_de_usuarios_por_confirmar_afiliacion" => $record ["LISTADO_DE_USUARIOS_POR_CONFIRMAR_AFILIACION"],
			"personal_activo" => $record ["PERSONAL_ACTIVO"],
			"paz_y_salvo" => $record ["PAZ_Y_SALVO"],
			"mora" => $record ["MORA"]
		];
	}
	echo json_encode(count($formatted) === 0 ? null : $formatted);
	exit;
}


function CantidadesCall()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_cantidades_call(:v_pfecha_inicio,:v_pfecha_fin,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
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


function obtenerAreaEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_acas.p_obtener_area_empresa(:v_json_row); end;');
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


function obtenerConceptoEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$area = $request->area;
	$consulta = oci_parse($c, 'begin pq_genesis_acas.p_obtener_concepto_empresa(:v_parea,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_parea',$area);
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

function obtenerMotivoEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$concepto = $request->concepto;
	$consulta = oci_parse($c, 'begin pq_genesis_acas.p_obtener_motivo_empresa(:v_pdocumento,:v_pconcepto,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
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

function obtenerAsuntoEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$concepto = $request->concepto;
	$motivo = $request->motivo;
	$consulta = oci_parse($c, 'begin pq_genesis_acas.p_obtener_asunto_empresa(:v_pdocumento,:v_pconcepto,:v_pmotivo,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
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

function InsertarAcasEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$concepto = $request->concepto;
	$motivo = $request->motivo;
	$observacion = $request->observacion;
	$emisor = $_SESSION["nit"];
	$asunto = $request->asunto;
	$consulta = oci_parse($c, 'begin pq_genesis_acas.p_insert_acas_empresa(:v_pconcepto,:v_pmotivo,:v_pobservacion,:v_pemisor,:v_pasunto,:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pconcepto',$concepto);
	oci_bind_by_name($consulta,':v_pmotivo',$motivo);
	oci_bind_by_name($consulta,':v_pobservacion',$observacion);
	oci_bind_by_name($consulta,':v_pemisor',$emisor);
	oci_bind_by_name($consulta,':v_pasunto',$asunto);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function ListarAcasEmpresa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $_SESSION["nit"];
	$consulta = oci_parse($c, 'begin pq_genesis_acas.p_obtener_lis_empresa(:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
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


function GestionTelecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_gestion_telecobro(:v_pdocumento,:v_json_res); end;');
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


function PendieteTelecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_llamada_pendiente_telecobro(:v_pdocumento,:v_json_res); end;');
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


function CantidadxPersonaTelecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_cantidad_x_telecobro(:v_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_documento', $documento);
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

function LlamadaRecordatorio()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_llamada_recordatorio(:v_documento,:v_json_res); end;');
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

function CantidadesCallTelecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_cantidad_recobro(:v_pfecha_inicio,:v_pfecha_fin,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $inicio);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $final);
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

function ListarInformeRecuperado()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_informe_recuperado (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDepurado()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_informe_depurado (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDepuracionRecuperacion()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_depuracion_recuperacion  (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialRecuperadoMes1()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_recuperado_mes1 (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialRecuperadoMes2()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_recuperado_mes2 (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialDepurado()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_depurado  (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialRecuperado()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_recuperado (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialDepuradoMes1()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_depurado_mes1 (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListarInformeDiferencialDepuradoMes2()
{
    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listar_diferencial_depurado_mes2 (
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

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function ListadoXLlamar2()
{
	global $request;
	$documento = $request->documento;

    require_once('../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listado_x_llamar2 (
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

    echo json_encode(count($datos) === 0 ? null : $datos);
    exit;
}

function ListadoAportante()
{
	global $request;
	$documento = $request->documento;

    require_once('../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_cartera.p_listado_aportante (
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

    echo json_encode(count($datos) === 0 ? null : $datos);
    exit;
}





