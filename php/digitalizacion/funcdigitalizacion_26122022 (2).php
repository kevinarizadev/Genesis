<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenercantidadXdpto(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_departamentos(:v_json_res); end;');
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
function obtenercantidadXmunicpio(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$ubicacion = $request->ubicacion;
	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_municipios(:v_departamento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_departamento',$ubicacion);
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
function obtenerinforevision(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_busqueda = $request->tipo_busqueda;	
	$dpto = $request->dpto;	
	$tipo_documento = $request->tipo_documento;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_sig_revisar (:v_tipo_busqueda,:v_municipio,:v_tipo_documento,:v_archivos,:v_afiliado,:v_mensaje); end;');
	oci_bind_by_name($consulta,':v_tipo_busqueda',$tipo_busqueda);
	oci_bind_by_name($consulta,':v_municipio',$dpto);
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
	$clob_archivos = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_archivos', $clob_archivos,-1,OCI_B_CLOB);
	$clob_info_afiliado = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_afiliado', $clob_info_afiliado,-1,OCI_B_CLOB);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_mensaje', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$mensaje = $clob->read($clob->size());
	$mensaje_respuesta=json_decode($mensaje);
	if ($mensaje_respuesta->codigo == 1) {
		$datos_res = '{"mensaje":'.$mensaje.'}';
		echo($datos_res);
	} else {
		$archivos = $clob_archivos->read($clob_archivos->size());
		$informacion = $clob_info_afiliado->read($clob_info_afiliado->size());
		$datos = '{"archivos":'.$archivos.',"info_afiliado":'.$informacion.',"mensaje":'.$mensaje.'}';
		echo($datos);
	}
	oci_close($c);
}
function obtenertipodocumental(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipos_documental(:v_json_res); end;');
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
function obtenerprocesos(){
	require_once('../config/dbcon_prod.php');

	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_procesos(:v_json_res); end;');
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

function obtenerdptoXtipo(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$tipo = $request->tipo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_departamentos_x_tipo(:v_tipo_documento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo);
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

function obtenerdptoXGrupo(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$grupo = $request->grupo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_departamentos_x_grupo(:v_grupo,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_grupo',$grupo);
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

function obtenermunicipioXtipo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$dpto = $request->dpto;	
	$tipo = $request->tipo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_municipios_x_tipo(:v_departamento,:v_tipo_documento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_departamento',$dpto);
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo);
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

function obtenermunicipioXGrupo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$dpto = $request->dpto;	
	$grupo = $request->grupo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_municipio_x_grupo(:v_departamento,:v_grupo,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_departamento',$dpto);
	oci_bind_by_name($consulta,':v_grupo',$grupo);
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
function obtenerpaquetes(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$proceso = $request->proceso;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_paquetes(:v_proceso,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_proceso',$proceso);
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

function obtenerparametros(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$paquete = $request->paquete;
	$proceso = $request->proceso;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_parametros(:v_paquete,:v_clasificacion,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_paquete',$paquete);
	oci_bind_by_name($consulta,':v_clasificacion',$proceso);
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

function obtenertipodocumentalpendiente(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipos_documental_pendientes(:v_json_res); end;');
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

function obtenergrupopendiente(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_grupos_pendientes(:v_json_res); end;');
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

function actualizaanexos(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$ruta = $request->ruta;
	$estado = $request->estado;	
	$comentario = $request->comentario;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_actualiza_estado(:v_ruta,:v_estado,:v_comentario,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_ruta',$ruta);
	oci_bind_by_name($consulta,':v_estado',$estado);
	oci_bind_by_name($consulta,':v_comentario',$comentario);
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
function FinalizatodaRevisionDoc(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_accion_soporte(:json_doc,:json_resp); end;');
	oci_bind_by_name($consulta,':json_doc',$request->datosenviar);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':json_resp', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
/*
function subirftp_digital(){
	require_once('../config/dbcon_prod.php');
	require_once('../config/sftp_con.php');
	require_once('../upload_file/subir_archivo.php');
	global $request;
	$data = $request->data;
	$info = json_decode($request->data);
	$arrlength=count($request->data);
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$hoy = date('dmY');
	$path = 'Aseguramiento/Digitalizacion/'.$hoy.'/';
	if ($arrlength == 0) {
		$res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
		echo json_encode($res);
	} else {
		$estado = 0;
		for ($i=0; $i < $arrlength ; $i++) {
			$name =$data[$i]->codigo.'_'.$tipo_documento.'_'.$documento.'_'.$hoy;
			if ($data[$i]->extension=='pdf'){
				$ext=$data[$i]->extension;
			} else {
				$ext='tiff';
			}
			$subio = subirDigitalizacionFTP($data[$i]->base,$path,$name,$ext);
			if ($subio != '0 - Error') {
				$rutas[$i]->ruta = $subio;
				$rutas[$i]->tipo = $data[$i]->codigo;
			}else {
				$estado = $estado + 1;
			}
		}
		if($estado == 0){
			echo json_encode($rutas);
		}else{
			echo '0';
		}
	}
}
*/
function subirftp_digital1(){
	require_once('../config/dbcon_prod.php');
	require_once('../config/sftp_con.php');
	include('../upload_file/subir_archivo.php');
	global $request;
	$data = $request->data;
	$info = json_decode($request->data);
	$arrlength=count($request->data);
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$hoy = date('dmY');
	$path = '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'.$hoy.'/';
	if ($arrlength == 0) {
		$res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
		echo json_encode($res);
	} else {
		$estado = 0;
		for ($i=0; $i < $arrlength ; $i++) {
			$name =$data[$i]->codigo.'_'.$tipo_documento.'_'.$documento.'_'.$hoy;
			if ($data[$i]->extension=='pdf'){
				$ext=$data[$i]->extension;
			} else {
				$ext='tiff';
			}
			$subio = subirDigitalizacionFTP($data[$i]->base,$path,$name,$ext);
			if ($subio != '0 - Error') {
				$rutas[$i]->ruta = $subio;
				$rutas[$i]->tipo = $data[$i]->codigo;
			}else {
				$estado = $estado + 1;
			}
		}
		if($estado == 0){
			echo json_encode($rutas);
		}else{
			echo '0';
		}
	}
}

function subirftp_digital(){
	require_once('../config/dbcon_prod.php');
	require_once('../config/sftp_con.php');
	include('../upload_file/subir_archivo.php');
	global $request;
	$data = $request->data;
// $info = json_decode($request->data);
$arrlength=count($request->data);
$tipo_documento = $request->tipo_documento;
$documento = $request->documento;
$hoy = date('dmY');
$path = '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'.$hoy.'/';
if ($arrlength == 0) {
	$res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
	echo json_encode($res);
} else {
	$estado = 0;
$rutas = [];
	for ($i=0; $i < $arrlength ; $i++) {
		$name =$data[$i]->codigo.''.$tipo_documento.''.$documento.'_'.$hoy;
		if ($data[$i]->extension=='pdf'){
			$ext=$data[$i]->extension;
		} else {
			$ext='tiff';
		}
		$subio = subirDigitalizacionFTP($data[$i]->base,$path,$name,$ext);
		if ($subio != '0 - Error') {
	array_push($rutas, (object)[
	  'ruta' => $subio,
	  'tipo' => $data[$i]->codigo
	]);
			// $rutas[$i]->ruta = $subio;
			// $rutas[$i]->tipo = $data[$i]->codigo;
		}else {
			$estado = $estado + 1;
		}
	}
	if($estado == 0){
		echo json_encode($rutas);
	}else{
		echo '0';
	}
}
}
function subirarchivos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;	
	$paquete = $request->paquete;
	$rutas = $request->rutas;
	$cantidad = $request->cantidad;	
	$tipo_ftp = '1';	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_inserta_adjuntos(:v_tipo_documento,:v_documento,:v_paquete,:v_rutas,:v_cantidad,:v_tipo_ftp,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
	oci_bind_by_name($consulta,':v_documento',$documento);
	oci_bind_by_name($consulta,':v_paquete',$paquete);
	oci_bind_by_name($consulta,':v_rutas',$rutas);
	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	oci_bind_by_name($consulta,':v_tipo_ftp',$tipo_ftp);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function obtenerareas(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$cedula = $request->cedula;
	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_area(:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_documento',$cedula);
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

function obtenermodulos(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$codigo_area = $request->codigo_area;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_modulos(:v_codigo_area,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_codigo_area',$codigo_area);
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

function crearprocesos(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$area = $request->area;
	$modulo = $request->modulo;
	$nombre = $request->nombre;
	$regimen = $request->regimen;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_inserta_proceso(:v_codigoarea,:v_nombre,:v_modulo,:v_regimen,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_codigoarea',$area);
	oci_bind_by_name($consulta,':v_nombre',$nombre);
	oci_bind_by_name($consulta,':v_modulo',$modulo);
	oci_bind_by_name($consulta,':v_regimen',$regimen);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function crearpaquete(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$codigo = $request->codigo;
	$nombre = $request->nombre;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_inserta_paquetes(:v_pcodigoproceso,:v_nombre,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_pcodigoproceso',$codigo);
	oci_bind_by_name($consulta,':v_nombre',$nombre);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function creacionparametros(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$parametros = $request->parametros;
	$cantidad = $request->cantidad;
	$responsable = $request->responsable;		
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_inserta_parametro(:v_json_in,:v_cantidad,:v_responsable,:v_respuesta); end;');
	
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($parametros);



	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	oci_bind_by_name($consulta,':v_responsable',$responsable);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function eliminarprocesos(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$codigo = $request->codigo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_eliminar_proceso (:v_codigoproceso,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_codigoproceso',$codigo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function eliminarpaquete(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$codigo = $request->codigo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_eliminar_paquete(:v_codigo_pq,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_codigo_pq',$codigo);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function eliminarparametro(){
	require_once('../config/dbcon_prod.php');
    global $request;
	$codigopaquete = $request->codigopaquete;	
	$codigoparametro = $request->codigoparametro;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_eliminar_parametro(:v_codigo_pq,:v_codigo_sp,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_codigo_pq',$codigopaquete);
	oci_bind_by_name($consulta,':v_codigo_sp',$codigoparametro);	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function tipodocumentalcantidad(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_tipo = $request->v_tipo;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipo_documental_cantidad_pendiente(:v_tipo,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_tipo',$v_tipo);
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

function tipodocumentalcantidadmun(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_tipo = $request->v_tipo;	
	$v_dpto = $request->v_dpto;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipo_documental_cantidad_mun(:v_tipo,:v_dpto,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_tipo',$v_tipo);
	oci_bind_by_name($consulta,':v_dpto',$v_dpto);
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

function tipo_documental_info(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipos_documental_informe(:v_json_res); end;');
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

function cantidad_revision(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_cantidad_revision(:v_json_res); end;');
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

function obtenerinforevision_antiguo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_busqueda = $request->tipo_busqueda;
	$tipo_documental = $request->tipo_documental;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_sig_revisar_antiguo (:v_tipo_busqueda,:v_tipo_documento,:v_archivos,:v_afiliado,:v_mensaje); end;');
	oci_bind_by_name($consulta,':v_tipo_busqueda',$tipo_busqueda);
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documental);
	$clob_archivos = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_archivos', $clob_archivos,-1,OCI_B_CLOB);
	$clob_info_afiliado = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_afiliado', $clob_info_afiliado,-1,OCI_B_CLOB);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_mensaje', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	$mensaje = $clob->read($clob->size());
	$mensaje_respuesta=json_decode($mensaje);
	if ($mensaje_respuesta->codigo == 1) {
		$datos_res = '{"mensaje":'.$mensaje.'}';
		echo($datos_res);
	} else {
		$archivos = $clob_archivos->read($clob_archivos->size());
		$informacion = $clob_info_afiliado->read($clob_info_afiliado->size());
		$datos = '{"archivos":'.$archivos.',"info_afiliado":'.$informacion.',"mensaje":'.$mensaje.'}';
		echo($datos);
	}
	oci_close($c);
}

function listarrechazo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_listado_rechazo(:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_documento',$documento);
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

function BusquedaRevision(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_listar_soporte(:v_pfinicio,:v_pffinal,:v_pestado,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_pfinicio',$request->fechainicio);
	oci_bind_by_name($consulta,':v_pffinal',$request->fechafin);
	oci_bind_by_name($consulta,':v_pestado',$request->fechafin);
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


function busquedaafiliado(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_ptipo_documento = $request->type;
	$v_pdocumento = $request->id;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_busqueda_afiliado(:v_ptipo_documento,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$v_ptipo_documento);
	oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
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
function VerDocumentosRevision(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_listar_soporte_detalle(:v_ptipo_documento,:v_pdocumento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodocumento);
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
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

function descargararchivo (){  
	global $request;
	$fileexists = false;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../config/ftpcon.php'); $fileexists = true;
	  }
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
	  require_once('../config/sftp_con.php'); $fileexists = true;
	}

	if($fileexists) {
	  $file_size = ftp_size($con_id, $request->ruta);
	  if ($file_size != -1) {
		$ruta = $request->ruta;
		$name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name;
		$local_file = '../../temp/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
		  echo $name;
		} else {
		  echo "0 - Error Al descargar el archivo";
		}
		ftp_close($con_id);
		fclose($handle);
	  } else {
		echo "0 - Error Archivo no existe";
	  }
	} else {
	  require('../../sftp_cloud/DownloadFile.php');
	  echo( DownloadFile($request->ruta) );
	  // echo( DownloadFile($request->ruta) );
	}


  }



function generarnovedaddigital(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_ptipo_documento=$request->type;
	$v_pdocumento=$request->id;	
	$v_new_primer_nombre=$request->nombrep;
	$v_new_segundo_nombre=$request->nombres;
	$v_new_primer_apellido=$request->apellidop;
	$v_new_segundo_apellido=$request->apellidos;
	$v_new_tipo_documento=$request->tipo_d;
	$v_new_documento=$request->doc_i;
	$v_new_celular=$request->cel;
	$v_new_barrio =$request->bar;
	$v_new_direccion=$request->dir;
	$v_new_municipio=$request->mun;
	$v_new_escenario=$request->esc;
	$v_new_gpoblacional=$request->gpobla;
	$v_new_ficha_sisben=$request->fic_s;
	$v_new_nivel_sisben=$request->niv_s;
	$v_new_puntaje_sisben=$request->punt_s;
	$v_new_fecha_nacimiento = date('d/m/Y', strtotime($request->fecha_nacimiento));
	$v_new_genero = $request->genero;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_guarda_novedades_digital(	:v_ptipo_documento,
																					:v_pdocumento,
																					:v_new_primer_nombre,
																					:v_new_segundo_nombre,
																					:v_new_primer_apellido,
																					:v_new_segundo_apellido,
																					:v_new_tipo_documento,
																					:v_new_documento,
																					:v_new_celular,
																					:v_new_barrio,
																					:v_new_direccion,
																					:v_new_municipio,
																					:v_new_escenario,
																					:v_new_gpoblacional,
																					:v_new_ficha_sisben,
																					:v_new_nivel_sisben,
																					:v_new_puntaje_sisben,
																					:v_new_fecha_nacimiento,
																					:v_new_genero,
																				  	:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$v_ptipo_documento);
	oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
	oci_bind_by_name($consulta,':v_new_primer_nombre',$v_new_primer_nombre);
	oci_bind_by_name($consulta,':v_new_segundo_nombre',$v_new_segundo_nombre);
	oci_bind_by_name($consulta,':v_new_primer_apellido',$v_new_primer_apellido);
	oci_bind_by_name($consulta,':v_new_segundo_apellido',$v_new_segundo_apellido);
	oci_bind_by_name($consulta,':v_new_tipo_documento',$v_new_tipo_documento);
	oci_bind_by_name($consulta,':v_new_documento',$v_new_documento);
	oci_bind_by_name($consulta,':v_new_celular',$v_new_celular);
	oci_bind_by_name($consulta,':v_new_barrio',$v_new_barrio);
	oci_bind_by_name($consulta,':v_new_direccion',$v_new_direccion);
	oci_bind_by_name($consulta,':v_new_municipio',$v_new_municipio);
	oci_bind_by_name($consulta,':v_new_escenario',$v_new_escenario);
	oci_bind_by_name($consulta,':v_new_gpoblacional',$v_new_gpoblacional);
	oci_bind_by_name($consulta,':v_new_ficha_sisben',$v_new_ficha_sisben);
	oci_bind_by_name($consulta,':v_new_nivel_sisben',$v_new_nivel_sisben);
	oci_bind_by_name($consulta,':v_new_puntaje_sisben',$v_new_puntaje_sisben);
	oci_bind_by_name($consulta,':v_new_fecha_nacimiento',$v_new_fecha_nacimiento);
	oci_bind_by_name($consulta,':v_new_genero',$v_new_genero);
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

function obtenerlistadorechazo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_listado_rechazo(:v_json_res); end;');
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

function informe_cantidad_tipo_documental(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$fecha_inicial = $request->fecha_inicial;
	$fecha_final = $request->fecha_final;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_informe_cantidad_tipo_documental(:fecha_inicial,:fecha_final,:v_json_res); end;');
	oci_bind_by_name($consulta,':fecha_inicial',$fecha_inicial);
	oci_bind_by_name($consulta,':fecha_final',$fecha_final);
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
function informe_cantidad_funcionario(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_informe_cantidad_funcionario(:v_departamento,:v_fecha_inicial,:v_fecha_final,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_departamento',$request->seccional);
	oci_bind_by_name($consulta,':v_fecha_inicial',$request->fecha_inicial);
	oci_bind_by_name($consulta,':v_fecha_final',$request->fecha_final);

	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta,':v_json_res', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	/*$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
	 	$json = $clob->read($clob->size());
		 echo $json;
	}else{
	 	echo 0;
	}
	oci_close($c);*/
}

function informe_cantidad_estado_documental(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$fecha_inicial = $request->fecha_inicial;
	$fecha_final = $request->fecha_final;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_informe_tipo_documento_estado(:v_fecha_inicial,:v_fecha_final,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_fecha_inicial',$fecha_inicial);
	oci_bind_by_name($consulta,':v_fecha_final',$fecha_final);
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

function obtener_seccionales(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_seccionales(:v_json_res); end;');
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


function obtenertipodocumentalpendienteantiguo(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_obtener_tipos_documental_pendientes_antiguo(:v_json_res); end;');
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

function ValidaDeclaracion(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo = $request->tipo;
	$documento = $request->documento;
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_valida_declaracion(:v_tipo_doc,:v_documento,:v_json_res); end;');
	oci_bind_by_name($consulta,':v_tipo_doc',$tipo);
	oci_bind_by_name($consulta,':v_documento',$documento);
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

function subirftp_afiliacion1 (){
	// echo json_encode(array ('codigo' => 0,'rutas' =>  '['.json_encode(array ('rutas' =>  '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Afiliaciones/', 'tipo' => uniqid())).']', 'id' => uniqid()));
	require_once('../config/dbcon_prod.php');
	//require_once('../config/ftpcon.php');
	require_once('../config/sftp_con.php');
	include('../upload_file/subir_archivo.php');
	global $request;
	$data = $request->data;
	$info = json_decode($request->data);
	$arrlength=count($request->data);
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;
	$hoy = date('dmY');
	$id = uniqid();
	$path1 = '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Afiliaciones/'.$hoy.'/';
	
	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/'.$path1) == TRUE) {
		$path = $path1.$id.'/';
		if ($arrlength == 0) {
			echo json_encode(array('codigo' => 1, 'mensaje' => 'No hay documentos cargados para su envio'));
		} else {
			$estado = 0;
			for ($i=0; $i < $arrlength ; $i++) {
				$name = $data[$i]->codigo.'_'.$id;
				if ($data[$i]->extension=='pdf') {
					$ext=$data[$i]->extension;
				} else {
					$ext='tiff';
				}
				$subio = subirFTP3jeff($data[$i]->base,$path,$name,$ext);
				if ($subio != '0 - Error' && $subio.substr(0, 3) != '<br' && $subio.substr(0, 1) != '0' && $subio != '') {
					$rutas[$i]->ruta = $subio;
					$rutas[$i]->tipo = $data[$i]->codigo;
					$rutas[$i]->nombre = $data[$i]->nombre;
				}else {
					$estado = $estado + 1;
				}
			}
			if($estado == 0){		
				echo json_encode(array ('codigo' => 0,'rutas' => $rutas , 'id' => $id));
			}else{
				echo '0';
			}
		}
	} else if (ftp_mkdir($con_id, $path1)) {
		$path = $path1.$id.'/';
		if ($arrlength == 0) {
			echo json_encode(array('codigo' => 1, 'mensaje' => 'No hay documentos cargados para su envio'));
		} else {
			$estado = 0;
			for ($i=0; $i < $arrlength ; $i++) {
				$name = $data[$i]->codigo.'_'.$id;
				if ($data[$i]->extension=='pdf') {
					$ext=$data[$i]->extension;
				} else {
					$ext='tiff';
				}
				$subio = subirFTP3jeff($data[$i]->base,$path,$name,$ext);
				if ($subio != '0 - Error' && $subio.substr(0, 3) != '<br' && $subio.substr(0, 1) != '0' && $subio != '') {
					$rutas[$i]->ruta = $subio;
					$rutas[$i]->tipo = $data[$i]->codigo;
					$rutas[$i]->nombre = $data[$i]->nombre;
				} else {
					$estado = $estado + 1;
				}
			}
			if($estado == 0){
				echo json_encode(array ('codigo' => 0,'rutas' => $rutas , 'id' => $id));
			}else{
				echo '0';
			}
		}
	} else {
		echo json_encode(array('codigo' => 2, 'mensaje' => 'No se pudo crear la carpeta principal'));
	}
}
function subirftp_afiliacion (){
	// echo json_encode(array ('codigo' => 0,'rutas' =>  '['.json_encode(array ('rutas' =>  '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Afiliaciones/', 'tipo' => uniqid())).']', 'id' => uniqid()));
	require_once('../config/dbcon_prod.php');
	//require_once('../config/ftpcon.php');
	require_once('../config/sftp_con.php');
	include('../upload_file/subir_archivo.php');
	global $request;
	$data = $request->data;
	// $info = json_decode($request->data);
	$arrlength=count($request->data);
	// $tipo_documento = $request->tipo_documento;
	// $documento = $request->documento;
	$hoy = date('dmY');
	$id = uniqid();
	$path1 = '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Afiliaciones/'.$hoy.'/';

	if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/'.$path1) == TRUE) {
		$path = $path1.$id.'/';
		if ($arrlength == 0) {
			echo json_encode(array('codigo' => 1, 'mensaje' => 'No hay documentos cargados para su envio'));
		} else {
			$estado = 0;
  $rutas = [];
  			for ($i=0; $i < $arrlength ; $i++) {
				$name = $data[$i]->codigo.'_'.$id;
				if ($data[$i]->extension=='pdf') {
					$ext=$data[$i]->extension;
				} else {
					$ext='tiff';
				}
				$subio = subirFTP3jeff($data[$i]->base,$path,$name,$ext);
				if ($subio != '0 - Error' && $subio.substr(0, 3) != '<br' && $subio.substr(0, 1) != '0' && $subio != '') {
					// $rutas[$i]->ruta = $subio;
					// $rutas[$i]->tipo = $data[$i]->codigo;
					// $rutas[$i]->nombre = $data[$i]->nombre;

					array_push($rutas, (object)[
						'ruta' => $subio,
						'tipo' => $data[$i]->codigo,
						'nombre' => $data[$i]->nombre,
					  ]);
				}else {
					$estado = $estado + 1;
				}
			}
			if($estado == 0){
				echo json_encode(array ('codigo' => 0,'rutas' => $rutas , 'id' => $id));
			}else{
				echo '0';
			}
		}
	} else if (ftp_mkdir($con_id, $path1)) {
		$path = $path1.$id.'/';
		if ($arrlength == 0) {
			echo json_encode(array('codigo' => 1, 'mensaje' => 'No hay documentos cargados para su envio'));
		} else {
			$estado = 0;
			for ($i=0; $i < $arrlength ; $i++) {
				$name = $data[$i]->codigo.'_'.$id;
				if ($data[$i]->extension=='pdf') {
					$ext=$data[$i]->extension;
				} else {
					$ext='tiff';
				}
				$subio = subirFTP3jeff($data[$i]->base,$path,$name,$ext);
				if ($subio != '0 - Error' && $subio.substr(0, 3) != '<br' && $subio.substr(0, 1) != '0' && $subio != '') {
					$rutas[$i]->ruta = $subio;
					$rutas[$i]->tipo = $data[$i]->codigo;
					$rutas[$i]->nombre = $data[$i]->nombre;
				} else {
					$estado = $estado + 1;
				}
			}
			if($estado == 0){
				echo json_encode(array ('codigo' => 0,'rutas' => $rutas , 'id' => $id));
			}else{
				echo '0';
			}
		}
	} else {
		echo json_encode(array('codigo' => 2, 'mensaje' => 'No se pudo crear la carpeta principal'));
	}
}

function subirarchivos_afiliacion (){
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipo_documento = $request->tipo_documento;
	$documento = $request->documento;	
	$paquete = $request->paquete;
	$rutas = $request->rutas;
	$cantidad = $request->cantidad;	
	$consulta = oci_parse($c,'begin pq_genesis_digital.p_inserta_adjuntos(:v_tipo_documento,:v_documento,:v_paquete,:v_rutas,:v_cantidad,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_tipo_documento',$tipo_documento);
	oci_bind_by_name($consulta,':v_documento',$documento);
	oci_bind_by_name($consulta,':v_paquete',$paquete);
	oci_bind_by_name($consulta,':v_rutas',$rutas);
	oci_bind_by_name($consulta,':v_cantidad',$cantidad);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
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
