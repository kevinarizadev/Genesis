
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
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$razon_social = $request->razon_social;
	$fecha_registro = $request->fecha_registro;
	$hora_registro = $request->hora_registro;
	$duracion_llamada = $request->duracion_llamada;
	$cod_ciudad = $request->cod_ciudad;
	$telefono = $request->telefono;
	$celular = $request->celular;
	$direccion = $request->direccion;
	$correo = $request->correo;
	$motivo = $request->motivo;
	$submotivo = $request->submotivo;
	$fecha_submotivo = $request->fecha_submotivo;
	$persona_contacto = $request->persona_contacto;
	$observacion = $request->observacion;
	$responsable = $request->responsable;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_insertar_gestion_telecobro(:v_tipo_documento,
		:v_documento,
		:v_razon_social,
		:v_fecha_registro,
		:v_hora_registro,
		:v_duracion_llamada,
		:v_cod_municipio,
		:v_telefono,
		:v_celular,
		:v_direccion,
		:v_correo,
		:v_motivo,
		:v_submotivo,
		:v_fecha_submotivo,
		:v_persona_contacto,
		:v_observacion,
		:v_responsable,
		:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo_documento', $tipo_documento);
	oci_bind_by_name($consulta, ':v_documento', $documento);
	oci_bind_by_name($consulta, ':v_razon_social', $razon_social);
	oci_bind_by_name($consulta, ':v_fecha_registro', $fecha_registro);
	oci_bind_by_name($consulta, ':v_hora_registro', $hora_registro);
	oci_bind_by_name($consulta, ':v_duracion_llamada', $duracion_llamada);
	oci_bind_by_name($consulta, ':v_cod_municipio', $cod_ciudad);
	oci_bind_by_name($consulta, ':v_telefono', $telefono);
	oci_bind_by_name($consulta, ':v_celular', $celular);
	oci_bind_by_name($consulta, ':v_direccion', $direccion);
	oci_bind_by_name($consulta, ':v_correo', $correo);
	oci_bind_by_name($consulta, ':v_motivo', $motivo);
	oci_bind_by_name($consulta, ':v_submotivo', $submotivo);
	oci_bind_by_name($consulta, ':v_fecha_submotivo', $fecha_submotivo);
	oci_bind_by_name($consulta, ':v_persona_contacto', $persona_contacto);
	oci_bind_by_name($consulta, ':v_observacion', $observacion);
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
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_cantidad_carta(:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
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


function InformeCarta()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$inicio = $request->inicio;
	$final = $request->final;
	$consulta = oci_parse($c, 'begin pq_genesis_cartera.p_informe_carta(:v_pfecha_inicio,:v_pfecha_fin,:v_json_row); end;');
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

function BuscaAfiliado()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$consulta = oci_parse($c, 'begin pq_genesis.p_busco_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_res); end;');
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


function MarcarUsuario()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipo = $request->tipo;
	$estado = $request->estado;
	$fuente = $request->fuente;
	$fecha_sospecha = $request->fecha_sospecha;
	$consulta = oci_parse($c, 'begin pq_genesis.p_marcar_user(:v_ptipo_documento,
															 :v_pdocumento,
															 :v_pmarca,:v_afic_covid19_fuente,
															 :v_afif_covid19_fecha_sospecha,
															 :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $tipo);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pmarca', $estado);
	oci_bind_by_name($consulta, ':v_afic_covid19_fuente', $fuente);
	oci_bind_by_name($consulta, ':v_afif_covid19_fecha_sospecha', $fecha_sospecha);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function GeneraNovedad()
{
	require_once('../config/dbcon_prod.php');
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
	require_once('../config/dbcon_prod.php');
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
	require_once('../config/dbcon_prod.php');
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


?>
