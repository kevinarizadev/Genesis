<?php
	//error_reporting(0);
	header("Content-Type: text/html;charset=utf-8");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	// function registraUsuario(){
	//    require_once('../../config/dbcon_empresa.php');
	// 	global $request;
	// 	$dataUsuario = json_decode($request->data);
	// 	$usuario = 0;
	// 	$call = mysqli_prepare($con, 'CALL sp_inserta_usuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@s_mensaje)');
	// 	mysqli_stmt_bind_param($call, 'ssssssssssssss',$dataUsuario->tipo_documento,
	// 																$dataUsuario->documento,
	// 																$dataUsuario->primer_nombre,
	// 																$dataUsuario->segundo_nombre,
	// 																$dataUsuario->primer_apellido,
	// 																$dataUsuario->segundo_apellido,
	// 																$dataUsuario->genero,
	// 																$dataUsuario->telefono,
	// 																$dataUsuario->correo,
	// 																$dataUsuario->estado,
	// 																$dataUsuario->perfil,
	// 																$dataUsuario->seccional,
	// 																$_SESSION["NIT"],
	// 																$dataUsuario->json);
	// 	$ex = mysqli_stmt_execute($call);
	// 	$select = mysqli_query($con, 'SELECT @s_mensaje');
	// 	$result = mysqli_fetch_assoc($select);
	// 	echo $result['@s_mensaje'];
	// }
	// function busquedaUsuario(){
	// 	require_once('../../config/dbcon_empresa.php');
	// 	mysqli_set_charset($con, "utf8");
	// 	global $request;
	// 	$call = mysqli_prepare($con, 'CALL sp_lista_usuarios (?,?)');
	// 	mysqli_stmt_bind_param($call, 'ss',$request->keyword,$_SESSION["NIT"]);
	// 	mysqli_stmt_execute($call);
	// 	$result = mysqli_stmt_get_result($call);
	// 	$rows = array();
	// 	while($r = mysqli_fetch_assoc($result)) {
	//       $rows[] = $r;
	//    }
	//    $rows = array_map('encode_all_strings', $rows);
	//    $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
	//    echo $json;//(substr($json,1,-1));
	//    mysqli_close($con);
	// }
	function listaMotivosRechazo(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT motn_codigo Codigo, motc_motivo Nombre from emos_motivo_rechazo where motc_estado = 'A' order by motc_motivo");
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function listaAsesores(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta =  oci_parse($c,"SELECT b.terv_codigo CODIGO,b.terc_nombre NOMBRE, b.terc_email EMAIL
											from bter_tercero b
											where tern_asesor_movilidad = 'S'
											order by b.terc_nombre");
		oci_execute($consulta);
		$rows = array();while($row = oci_fetch_assoc($consulta))
		{
			$rows[] = $row;
		}
		echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		oci_close($c);
	}
	function lista_Asesores(){
		require_once('../config/dbcon_empresa.php');
        $consulta = oci_parse($c,'begin pq_genesis_mov.p_lista_asesores(:v_respuesta); end;');
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
	function obtenerAfiliado(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$tipodocumento = $request->tipodocumento;
		$documento = $request->documento;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_mostrar_afiliado(:v_ptipo_documento,:v_pdocumento,:v_p_f_nacimiento,:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$tipodocumento);
		oci_bind_by_name($consulta,':v_pdocumento',$documento);
		oci_bind_by_name($consulta,':v_p_f_nacimiento',$request->f_nacimiento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	// PHP DE JEFFER
	function actualizaraportante(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_confirma_aportante(:v_tipo,
																			:v_documento,
																			:v_usuario,
																			:v_respuesta); end;');

		oci_bind_by_name($consulta,':v_tipo',$request->tipo);
		oci_bind_by_name($consulta,':v_documento',$request->documento);
		oci_bind_by_name($consulta,':v_usuario',$request->responsable);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function solicitudesPendiente(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_solicitudes_pendientes(:v_usuario,:v_res); end;');
		oci_bind_by_name($consulta,':v_usuario',$_SESSION["cedula"]);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function listaHistorialEmp(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_historial_empresa(:v_nit_empresa,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit_empresa',$_SESSION['nit']);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function actulizarfecha90(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_fecha_Act(:v_nit,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$_SESSION['nit']);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function generaSolicitud(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$dataSolicitud = json_decode($request->data);
		$empresa = $_SESSION['nit'];
		$afiltemp = '';
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_genera_solicitud(:v_empresa,:v_tipo_documento,:v_documento,:v_asesor,:v_asesor_empresa,:v_adjunto,:v_afil_temporal,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_empresa',$empresa);
		oci_bind_by_name($consulta,':v_tipo_documento',$dataSolicitud->tipo_documento);
		oci_bind_by_name($consulta,':v_documento',$dataSolicitud->documento);
		oci_bind_by_name($consulta,':v_asesor',$dataSolicitud->asesor);
		oci_bind_by_name($consulta,':v_asesor_empresa',$dataSolicitud->asesor_empresa);
		oci_bind_by_name($consulta,':v_adjunto',$dataSolicitud->ruta);
		oci_bind_by_name($consulta,':v_afil_temporal',$afiltemp);
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
	function consultaEmpleado(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$empresa = $_SESSION['nit'];
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_personal(:v_nit,:v_tipodoc,:v_documento,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$empresa);
		oci_bind_by_name($consulta,':v_tipodoc',$request->tipodocumento);
		oci_bind_by_name($consulta,':v_documento',$request->documento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function p_anular_registro(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;

		$consulta = oci_parse($c,'begin pq_genesis_mov.p_anula_registro(:v_numero,
																		:v_ubicacion,
																		:v_res); end;');

		oci_bind_by_name($consulta,':v_numero',$request->v_numero);
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function registraEmpleado(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$empresa = $_SESSION['nit'];
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_registrar_personal(:v_nit,:v_tipodoc,:v_documento,:v_nombre,:v_sede,:v_tipo,:v_correo,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$empresa);
		oci_bind_by_name($consulta,':v_tipodoc',$request->tipodocumento);
		oci_bind_by_name($consulta,':v_documento',$request->documento);
		oci_bind_by_name($consulta,':v_nombre',$request->nombre);
		oci_bind_by_name($consulta,':v_sede',$request->sede);
        oci_bind_by_name($consulta,':v_tipo',$request->tipo);
        oci_bind_by_name($consulta,':v_correo',$request->correo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function actualizarinfoEmpresa(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$empresa = $_SESSION['nit'];
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_actualizarinfo_empresa(:v_nit,:v_direccion,:v_barrio,:v_contacto,:v_correo,:v_numerosede,:direv_renglon,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$empresa);
		oci_bind_by_name($consulta,':v_direccion',$request->direccion);
		oci_bind_by_name($consulta,':v_barrio',$request->barrio);
		oci_bind_by_name($consulta,':v_contacto',$request->contacto);
		oci_bind_by_name($consulta,':v_correo',$request->correo);
        oci_bind_by_name($consulta,':v_numerosede',$request->numerosede);
         oci_bind_by_name($consulta,':direv_renglon',$request->renglon);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function listarSedes(){

		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$empresa = $_SESSION['nit'];
		//echo ($empresa);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_sede(:v_nit,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$empresa);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function respondeSolicitud(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$dataGestion = json_decode($request->data);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_procesa_solicitud(:v_solicitud,:v_accion,:v_motivo_rechazo,:v_adjunto_respuesta,:v_comentarios,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_solicitud',$dataGestion->codigo);
		oci_bind_by_name($consulta,':v_accion',$dataGestion->newestado);
		oci_bind_by_name($consulta,':v_motivo_rechazo',$dataGestion->motivorechazo);
		oci_bind_by_name($consulta,':v_adjunto_respuesta',$dataGestion->rutares);
		oci_bind_by_name($consulta,':v_comentarios',$dataGestion->comentarios);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function regimenHistorial(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_regimen_hist(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->numero);
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
	function relacionesHistorial(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_laboral_hist(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->numero);
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
	function tipoAfiliado(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_tipo_afil(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->numero);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->sizeof()());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function certificadoNucleo(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_ca.p_mostrar_certificado_contr_ben(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->type);
		oci_bind_by_name($consulta,':v_pdocumento',$request->id);
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
	function guardaAfilTemporal(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_insertar_afiliado(:v_ptipodocumento,
																								:v_pnumerodocumento,
																								:v_pprimernombre,
																								:v_psegundonombre,
																								:v_pprimerapellido,
																								:v_psegundoapellido,
																								:v_pgenero,
																								:v_pubicacion,
																								:v_pfechanacimiento,
																								:v_ptelefono,
																								:v_pcelular,
																								:v_pcorreo,
																								:v_pdireccion,
																								:v_solicita,
																								:v_presponsable,
																								:v_empresa,
																								:v_adjunto,
																								:v_res); end;');
		oci_bind_by_name($consulta,':v_ptipodocumento',$request->type);
		oci_bind_by_name($consulta,':v_pnumerodocumento',$request->id);
		oci_bind_by_name($consulta,':v_pprimernombre',$request->p_nombre);
		oci_bind_by_name($consulta,':v_psegundonombre',$request->s_nombre);
		oci_bind_by_name($consulta,':v_pprimerapellido',$request->p_apellido);
		oci_bind_by_name($consulta,':v_psegundoapellido',$request->s_apellido);
		oci_bind_by_name($consulta,':v_pgenero',$request->sexo);
		oci_bind_by_name($consulta,':v_pubicacion',$request->municipio);
		oci_bind_by_name($consulta,':v_pfechanacimiento',$request->f_nacimiento);
		oci_bind_by_name($consulta,':v_ptelefono',$request->telefono);
		oci_bind_by_name($consulta,':v_pcelular',$request->celular);
		oci_bind_by_name($consulta,':v_pcorreo',$request->correo);
		oci_bind_by_name($consulta,':v_pdireccion',$request->direccion);
		oci_bind_by_name($consulta,':v_solicita',$request->solicita); //
		oci_bind_by_name($consulta,':v_presponsable',$request->responsable);
		oci_bind_by_name($consulta,':v_empresa',$_SESSION['nit']);
		oci_bind_by_name($consulta,':v_adjunto',$request->rutaadjunto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
//jair molina
	function eliminar_asesor(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//$v_cod_tercero = $request->v_cod_tercero;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_elimina_asesor(:v_cod_tercero,:v_res); end;');
		oci_bind_by_name($consulta,':v_cod_tercero',$request->v_cod_tercero);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function buscar_asesor(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_busqueda_new_asesor(:v_coincidencia,:v_res); end;');
		oci_bind_by_name($consulta,':v_coincidencia',$request->v_coincidencia);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function agregar_asesor(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_agregar_asesor(:v_cod_tercero,:v_res); end;');
		oci_bind_by_name($consulta,':v_cod_tercero',$request->v_cod_tercero);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function agregar_motivo(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_ui_motivo_rechazo(:v_codigo,:v_motivo,:v_accion,:v_res); end;');
		oci_bind_by_name($consulta,':v_codigo',$request->v_codigo);
		oci_bind_by_name($consulta,':v_motivo',$request->v_motivo);
		oci_bind_by_name($consulta,':v_accion',$request->v_accion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function editar_motivo(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_ui_motivo_rechazo(:v_codigo,:v_motivo,:v_accion,:v_res); end;');
		oci_bind_by_name($consulta,':v_codigo',$request->v_codigo);
		oci_bind_by_name($consulta,':v_motivo',$request->v_motivo);
		oci_bind_by_name($consulta,':v_accion',$request->v_accion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtener_empleados_empresa(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_asesores_emp (:v_nit,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$request->v_nit);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function editar_infoba_empleado_emp(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_ui_asesores_emp (:v_accion,:v_nit,:v_tipo_doc,:v_num_doc,:v_nombre,:v_sede,:v_telefono,:v_correo,:v_estado,:v_res); end;');
		oci_bind_by_name($consulta,':v_accion',$request->v_accion);
		oci_bind_by_name($consulta,':v_nit',$request->v_nit);
		oci_bind_by_name($consulta,':v_tipo_doc',$request->v_tipo_doc);
		oci_bind_by_name($consulta,':v_num_doc',$request->v_num_doc);
		oci_bind_by_name($consulta,':v_nombre',$request->v_nombre);
		oci_bind_by_name($consulta,':v_sede',$request->v_sede);
		oci_bind_by_name($consulta,':v_telefono',$request->v_telefono);
		oci_bind_by_name($consulta,':v_correo',$request->v_correo);
		oci_bind_by_name($consulta,':v_estado',$request->v_estado);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function generar_pass(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_password (:v_res); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function actualizar_pass(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_actualiza_password (:v_nit,:v_password,:v_res); end;');
		oci_bind_by_name($consulta,':v_nit',$request->v_nit);
		oci_bind_by_name($consulta,':v_password',$request->v_password);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtener_informacion_empresa_empresas(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$nit="N";
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtiene_empresa (:v_tipo_documento,:v_documento,:v_json_empresa,:v_json_archivos,:v_json_asesores,:v_json_sedes,:v_json_novedades); end;');
		oci_bind_by_name($consulta,':v_tipo_documento',$_SESSION["tipoaportante"]);
		oci_bind_by_name($consulta,':v_documento',$_SESSION["nit"]);
		$clob1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_empresa', $clob1,-1,OCI_B_CLOB);
		$clob2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_archivos', $clob2,-1,OCI_B_CLOB);
		$clob3 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_asesores', $clob3,-1,OCI_B_CLOB);
		$clob4 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_sedes', $clob4,-1,OCI_B_CLOB);
		$clob5 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_novedades', $clob5,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json1 = $clob1->read($clob1->size());
		$json2 = $clob2->read($clob2->size());
		$json3 = $clob3->read($clob3->size());
		$json4 = $clob4->read($clob4->size());
		$json5 = $clob5->read($clob5->size());
		$var = '{"info_empresa":'.$json1.',"lista_archivos":'.$json2.',"lista_responsables":'.$json3.',"lista_sucursales":'.$json4.',"lista_novedades":'.$json5.'}';

		echo($var);
		oci_close($c);
	}
// Shirley del lado de funcionario
	function generarnovedad(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$nacimiento_representante = date('d/m/Y', strtotime($request->nacimiento_representante));
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_genera_novedad_empleador(:v_numero_aportante,
																				:v_ubicacion_aportante,
																				:v_novedad,
																				:v_razon_social,
																				:v_siglas,
																				:v_nombre_representante,
																				:v_tipo_documento_rep,
																				:v_documento_representante,
																				:v_nacimiento_representante,
																				:v_correo_representante,
																				:v_primer_name,
																				:v_segundo_name,
																				:v_primer_apellido,
																				:v_segundo_apellido,
																				:v_responsable,
																				:v_responsable_cedula,
																				:v_adjunto,
																				:v_cantidad_adjuntos,
																				:v_res ); end;');
		oci_bind_by_name($consulta,':v_numero_aportante',$request->numero_aportante);
		oci_bind_by_name($consulta,':v_ubicacion_aportante',$request->ubicacion_aportante);
		oci_bind_by_name($consulta,':v_novedad',$request->novedad);
		oci_bind_by_name($consulta,':v_razon_social',$request->razon_social);
		oci_bind_by_name($consulta,':v_siglas',$request->v_sigla);
		oci_bind_by_name($consulta,':v_nombre_representante',$request->nombre_representante);
		oci_bind_by_name($consulta,':v_tipo_documento_rep',$request->tdrepresentante);
		oci_bind_by_name($consulta,':v_documento_representante',$request->documento_representante);
		oci_bind_by_name($consulta,':v_nacimiento_representante',$nacimiento_representante);
		oci_bind_by_name($consulta,':v_correo_representante',$request->correo_representante);
		oci_bind_by_name($consulta,':v_primer_name',$request->primer_name);
		oci_bind_by_name($consulta,':v_segundo_name',$request->segundo_name);
		oci_bind_by_name($consulta,':v_primer_apellido',$request->primer_apellido);
		oci_bind_by_name($consulta,':v_segundo_apellido',$request->segundo_apellido);
		oci_bind_by_name($consulta,':v_responsable',$request->responsable);
		oci_bind_by_name($consulta,':v_responsable_cedula',$request->responsable_cedula);
		oci_bind_by_name($consulta,':v_adjunto',$request->adjunto);
		oci_bind_by_name($consulta,':v_cantidad_adjuntos',$request->cantidad_adjnto);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function aprobarnovedad(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_gestiona_novedad (:v_numero_novedad,:v_ubicacion,:v_accion,:v_res ); end;');
		oci_bind_by_name($consulta,':v_numero_novedad',$request->v_numero_novedad);
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		oci_bind_by_name($consulta,':v_accion',$request->v_accion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtener_informacion_empresa_asesor(){
			require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_lista_empresas (:v_documento_asesor,:v_estado,:v_json_listado); end;');
		oci_bind_by_name($consulta,':v_documento_asesor',$_SESSION["cedula"]);
		oci_bind_by_name($consulta,':v_estado',$request->v_estado);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_listado', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function aportante_exitente(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_existencia_aportante (:v_documento,:v_tipo_documento,:v_res); end;');
		oci_bind_by_name($consulta,':v_documento',$request->v_nidentificacion);
		oci_bind_by_name($consulta,':v_tipo_documento',$request->v_tidentificacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtener_informacion_empresa(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtiene_empresa (:v_tipo_documento,:v_documento,:v_json_empresa,:v_json_archivos,:v_json_asesores,:v_json_sedes,:v_json_novedades); end;');
		oci_bind_by_name($consulta,':v_tipo_documento',$request->v_documento);
		oci_bind_by_name($consulta,':v_documento',$request->v_nit);
		$clob1 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_empresa', $clob1,-1,OCI_B_CLOB);
		$clob2 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_archivos', $clob2,-1,OCI_B_CLOB);
		$clob3 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_asesores', $clob3,-1,OCI_B_CLOB);
		$clob4 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_sedes', $clob4,-1,OCI_B_CLOB);
		$clob5 = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_novedades', $clob5,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json1 = $clob1->read($clob1->size());
		$json2 = $clob2->read($clob2->size());
		$json3 = $clob3->read($clob3->size());
		$json4 = $clob4->read($clob4->size());
		$json5 = $clob5->read($clob5->size());
		$var = '{"info_empresa":'.$json1.',"lista_archivos":'.$json2.',"lista_responsables":'.$json3.',"lista_sucursales":'.$json4.',"lista_novedades":'.$json5.'}';
		if ($json1 == ''){
			$var = '{"info_empresa":{"resultados":"0"}}';
		}
		echo($var);
		oci_close($c);
	}
	function enviar_respuesta(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_acciona_empresa(:v_numero_empresa,:v_ubicacion,:v_accion,:v_comentario,:v_ruta,:v_tipo_archivo,:v_res); end;');
        oci_bind_by_name($consulta,':v_numero_empresa',$request->v_numero_empresa);
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacio);
		oci_bind_by_name($consulta,':v_accion',$request->v_accion);
		oci_bind_by_name($consulta,':v_comentario',$request->v_comentario);
		oci_bind_by_name($consulta,':v_ruta',$request->v_ruta);
		oci_bind_by_name($consulta,':v_tipo_archivo',$request->v_tipo_archivo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function listaConversacion(){
		require_once('../config/dbcon_empresa.php');
		global $request;

		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtiene_comentarios_registro(:v_tipo_documento,:v_documento,:v_json_chat); end;');
		oci_bind_by_name($consulta,':v_tipo_documento',$request->v_tipo_documento);
		oci_bind_by_name($consulta,':v_documento',$request->v_documento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_chat', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
//shirley
	function obtenerListados(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$key = isset($request->vp_key) ? $request->vp_key : '';
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_listados(:vp_actividad,:vp_key,:v_res); end;');
		oci_bind_by_name($consulta,':vp_actividad',$request->vp_listado);
		oci_bind_by_name($consulta,':vp_key',$key);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function obtenerArchivos(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_lista_archivos_inscripcion(:v_tipo_empresa,:v_clasificacion,:v_json_res ); end;');
        oci_bind_by_name($consulta,':v_tipo_empresa',$request->tipoempresas);
		oci_bind_by_name($consulta,':v_clasificacion',$request->clasificacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function subirruta($tipodoc,$numerodoc,$ruta,$cantidad,$observacion){
		require_once('../config/dbcon_empresa.php');
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_insertar_soportes_empresa (:v_tipo_doc,:v_numero_documento,:v_rutas,:v_cantidad ,:v_observacion,:v_json_res ); end;');
      oci_bind_by_name($consulta,':v_tipo_doc',$tipodoc);
		oci_bind_by_name($consulta,':v_numero_documento',$numerodoc);
		$jsonarchivos = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_rutas', $jsonarchivos, -1, OCI_B_CLOB);
		$jsonarchivos->writeTemporary($ruta);
		oci_bind_by_name($consulta,':v_cantidad',$cantidad);
		oci_bind_by_name($consulta,':v_observacion',$observacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function guardaradjuntosempresasnuevas(){
	   require_once('../config/dbcon_login.php');
	  //  require_once('../config/ftpcon.php');
	  //  include('subir_archivo.php');
	   global $request;
	   // variables de parametros
	   $archivos = json_decode($request->data);
	   
     //
     $hoy = date('dmY');
	   $hora = date('h_i_s');
	   $path = 'Movilidad/Empresas/' . $hoy;
	   $subiofile=0;
     $rutas = [];
     require('../sftp_cloud/UploadFile.php');
     for ($i = 0; $i < count($archivos); $i++) {
     	$tipodoc = $archivos[$i]->tipodoc;
	   $numdoc = $archivos[$i]->numero;
       $name = $archivos[$i]->tipodoc.'_'.$archivos[$i]->numero.'_'.$archivos[$i]->codigo.'_'.$hora.'.'.$archivos[$i]->ext;
       list(, $archivos[$i]->achivobase) = explode(';', $archivos[$i]->achivobase); // Proceso para traer el Base64
       list(, $archivos[$i]->achivobase) = explode(',', $archivos[$i]->achivobase); // Proceso para traer el Base64
       $base64 = base64_decode($archivos[$i]->achivobase); // Proceso para traer el Base64
       file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
       
       $subio = UploadFile($path, $name);
       // $subio = UploadFile($path, $name);
       if (substr($subio, 0,11) == '/cargue_ftp') {
         array_push($rutas, (object)[
           'ruta' => $subio,
           'codigo' => $archivos[$i]->codigo
         ]);
         $subiofile = $subiofile + 1;
       }
     }


	   // otras variables
	  //  $hoy = date('dmY');
	  //  $hora = date('h_i_s');
	  //  $path = '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Empresas/'.$hoy.'/';
	  //  $subiofile=0;
	  //  for ($i=0; $i < count($archivos) ; $i++) {
		// 	$tipodoc = $archivos[$i]->tipodoc;
		// 	$numdoc = $archivos[$i]->numero;
		// 	$name = $archivos[$i]->tipodoc.'_'.$archivos[$i]->numero.'_'.$archivos[$i]->codigo.'_'.$hora;
		// 	$subio = subirFTP($archivos[$i]->achivobase,$path,$name,$archivos[$i]->ext);
		// 	if ($subio != '0 - Error') {
		// 		$rutas[$i]->ruta = $subio;
		// 		$rutas[$i]->codigo = $archivos[$i]->codigo;
		// 		$subiofile = $subiofile + 1;
		// 	}
	  //  }

	   if($subiofile == count($archivos)){
			subirruta($tipodoc,$numdoc,json_encode($rutas),count($archivos),"Archivo cargado desde Genesis");
	   }else{
			echo json_decode('{"mensaje":"Error subiendo los archivos","codigo":1}');
	   }
	}
	function guardaradjuntosempresasnuevas3(){
	   require_once('../config/dbcon_empresa.php');
	   require_once('../config/ftpcon.php');
	   include('subir_archivo.php');
	   global $request;
	   // variables de parametros
	   $archivos = json_decode($request->data);


	   // otras variables
	   $hoy = date('dmY');
	   $hora = date('h_i_s');
	   $path = '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Empresas/'.$hoy.'/';
	   $estado = 0;
	   $rutas = [];
	   for ($i=0; $i < count($archivos) ; $i++) {
			$tipodoc = $archivos[$i]->tipodoc;
			$numdoc = $archivos[$i]->numero;
			$name = $archivos[$i]->tipodoc.'_'.$archivos[$i]->numero.'_'.$archivos[$i]->codigo.'_'.$hora;
			$subio = subirFTP($archivos[$i]->achivobase,$path,$name,$archivos[$i]->ext);
			if ($subio != '0 - Error') {

				array_push($rutas, (object)[
		           'ruta' => $subio,
		           'tipo' => $archivos[$i]->codigo
		         ]);
				//$rutas[$i]->ruta = $subio;
				//$rutas[$i]->tipo = $archivos[$i]->codigo;

			} else {
				$estado = $estado + 1;
			}
	   }
	    if($estado == 0){
            echo json_encode($rutas);
        }else{
            echo '0';
        }


	}
	function guardaradjuntosempresasnuevas1(){
	   require_once('../config/dbcon_empresa.php');
	   require_once('../config/ftpcon.php');
	   include('subir_archivo.php');
	   global $request;
	   // variables de parametros
	   $archivos = json_decode($request->data);
	   // otras variables
	   $hoy = date('dmY');
	   $hora = date('h_i_s');
	   $path = '/cargue_ftp/Digitalizacion/Genesis/Movilidad/Empresas/'.$hoy.'/';
	   $estado = 0;
	   $codigo = isset($archivos[0]->codigo) ? $archivos[0]->codigo : '_';
			$tipodoc = $archivos[0]->tipodoc;
			$numdoc = $archivos[0]->numero;
			$name = $archivos[0]->tipodoc.'_'.$archivos[0]->numero.'_'.$codigo.'_'.$hora;;
			$subio = subirFTP($archivos[0]->achivobase,$path,$name,$archivos[0]->ext);
			$rutas= $subio;

			echo $rutas;
	}
	function guardarsede(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$consulta = oci_parse($c,'begin
			 pq_genesis_mov.p_inserta_sede_empresa(:v_pnumero,:v_pubicacion,:v_ubicacion_apo,:v_pdireccion,:v_pbarrio,:v_telefono,:v_email,:v_nombre_sede,:v_cantidad_empleados,:v_res ); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
		oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
		oci_bind_by_name($consulta,':v_ubicacion_apo',$request->v_ubicacion_apo);
		oci_bind_by_name($consulta,':v_pdireccion',$request->v_pdireccion);
		oci_bind_by_name($consulta,':v_pbarrio',$request->v_pbarrio);
		oci_bind_by_name($consulta,':v_telefono',$request->v_telefono);
		oci_bind_by_name($consulta,':v_email',$request->v_email);
		oci_bind_by_name($consulta,':v_nombre_sede',$request->v_nombre_sede);
		oci_bind_by_name($consulta,':v_cantidad_empleados',$request->v_cantidad_empleados);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function editar_sede_novedad(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		//print_r ($request);
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_novedad_sede (	:v_numero,
																		:v_ubicacion,
																		:v_renglon,
																		:v_new_ubicacion,
																		:v_new_direccion,
																		:v_new_barrio,
																		:v_new_telefono,
																		:v_new_email,
																		:v_new_nombre,
																		:v_responsable,
																		:v_res );
																		end;');
		oci_bind_by_name($consulta,':v_numero',$request->v_numero);
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		oci_bind_by_name($consulta,':v_renglon',$request->v_renglon);
		oci_bind_by_name($consulta,':v_new_ubicacion',$request->v_new_ubicacion);
		oci_bind_by_name($consulta,':v_new_direccion',$request->v_new_direccion);
		oci_bind_by_name($consulta,':v_new_barrio',$request->v_new_barrio);
		oci_bind_by_name($consulta,':v_new_telefono',$request->v_new_telefono);
		oci_bind_by_name($consulta,':v_new_email',$request->v_new_email);
		oci_bind_by_name($consulta,':v_new_nombre',$request->v_new_nombre);
		oci_bind_by_name($consulta,':v_responsable',$request->v_responsable);
		// oci_bind_by_name($consulta,':v_cantidad_empleados',$request->v_cantidad_empleados);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function guardarempresasnuevas(){
		require_once('../config/dbcon_empresa.php');
        global $request;
        $user=3;
        $dataRegistro = json_decode($request->data);
        // print_r ($dataRegistro);
        $consulta = oci_parse($c,'begin pq_genesis_mov.p_insertar_empresa(:vp_ubicacion,:vp_tipo_documento,:vp_tercero,:vp_primer_nombre,:vp_segundo_nombre,:vp_primer_apellido,:vp_segundo_apellido,:vp_clase_empleador,:vp_tipo_persona,:vp_tipo_empleador,:vp_razon_social,:vp_sigla,:vp_actividad,:vp_clasificacion,:vp_tipo_documento_representante,:vp_documento_representante,:vp_representante,:vp_nacimiento_representante,:vp_correo_representante,:vp_forma_pago,:vp_nombre_responsable,:vp_nacimiento_responsable,:vp_cargo_responsable,:vp_telefono_responsable,:vp_celular_responsable,:vp_correo_responsable,:vp_sitio_web,:vp_responsable_registro,:vp_municipio_sp,:vp_direccion_sp,:vp_barrio_sp,:vp_empleados_sp,:vp_telefono_sp,:vp_email_sp,:vp_nombres_sede_sp,:vp_vigencia,:vp_fecha_vigencia,:v_json_mensaje,:v_res); end;');
        oci_bind_by_name($consulta,':vp_ubicacion',$dataRegistro->munprincipal);
        oci_bind_by_name($consulta,':vp_tipo_documento',$dataRegistro->tidentificacion);
        oci_bind_by_name($consulta,':vp_primer_nombre',$dataRegistro->primernombre);
        oci_bind_by_name($consulta,':vp_segundo_nombre',$dataRegistro->segundonombre);
        oci_bind_by_name($consulta,':vp_primer_apellido',$dataRegistro->primerapellido);
        oci_bind_by_name($consulta,':vp_segundo_apellido',$dataRegistro->segundoapellido);
        oci_bind_by_name($consulta,':vp_tercero',$dataRegistro->nidentificacion);
        oci_bind_by_name($consulta,':vp_clase_empleador',$dataRegistro->claseaportante);
        oci_bind_by_name($consulta,':vp_tipo_persona',$dataRegistro->tipoempresas);
        oci_bind_by_name($consulta,':vp_tipo_empleador',$dataRegistro->templador);
        oci_bind_by_name($consulta,':vp_razon_social',$dataRegistro->razonsocial);
        oci_bind_by_name($consulta,':vp_sigla',$dataRegistro->siglas);
        oci_bind_by_name($consulta,':vp_actividad',$dataRegistro->actividad);
        oci_bind_by_name($consulta,':vp_clasificacion',$dataRegistro->clasificacion);
        oci_bind_by_name($consulta,':vp_tipo_documento_representante',$dataRegistro->tdrepresentante);
        oci_bind_by_name($consulta,':vp_documento_representante',$dataRegistro->drepresentante);
        oci_bind_by_name($consulta,':vp_representante',$dataRegistro->nomrepresentante);
        oci_bind_by_name($consulta,':vp_nacimiento_representante',$dataRegistro->fnrepresentante);
        oci_bind_by_name($consulta,':vp_correo_representante',$dataRegistro->correorepresentante);
		oci_bind_by_name($consulta,':vp_forma_pago',$dataRegistro->pago);
		oci_bind_by_name($consulta,':vp_nombre_responsable',$dataRegistro->nomcargo);
        oci_bind_by_name($consulta,':vp_nacimiento_responsable',$dataRegistro->fncargo);
        oci_bind_by_name($consulta,':vp_cargo_responsable',$dataRegistro->cargo);
        oci_bind_by_name($consulta,':vp_telefono_responsable',$dataRegistro->telcargo);
        oci_bind_by_name($consulta,':vp_celular_responsable',$dataRegistro->celcargo);
        oci_bind_by_name($consulta,':vp_correo_responsable',$dataRegistro->emailcargo);
        oci_bind_by_name($consulta,':vp_sitio_web',$dataRegistro->sitioweb);
        oci_bind_by_name($consulta,':vp_responsable_registro', $user);
        oci_bind_by_name($consulta,':vp_municipio_sp',$dataRegistro->munprincipal);
        oci_bind_by_name($consulta,':vp_direccion_sp',$dataRegistro->dirprincipal);
        oci_bind_by_name($consulta,':vp_barrio_sp',$dataRegistro->barprincipal);
        oci_bind_by_name($consulta,':vp_empleados_sp',$dataRegistro->ntrabajadores);
        oci_bind_by_name($consulta,':vp_telefono_sp',$dataRegistro->telprincipal);
        oci_bind_by_name($consulta,':vp_email_sp',$dataRegistro->email);
        oci_bind_by_name($consulta,':vp_vigencia',$dataRegistro->vigencia);
        oci_bind_by_name($consulta,':vp_fecha_vigencia',$dataRegistro->fnvigencia);
        oci_bind_by_name($consulta,':vp_nombres_sede_sp',$dataRegistro->nomsede);
		$mensaje = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_mensaje', $mensaje,-1,OCI_B_CLOB);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        $res = json_decode($json);
        $res_codigo =$res->codigo;
        if($res_codigo==1){
        	 echo $json;
        	}else{
        		$json_mensaje = $mensaje->read($mensaje->size());
				enviarMensajeAlMovil($json_mensaje);
				echo $json;
				oci_close($c);
        	}


	}
	function enviarMensajeAlMovil($json_mensaje){
		$archivos = json_decode($json_mensaje);
		// print_r($archivos);
		// echo $archivos->NOMBRE;
		$movil = '57'.$archivos->TELEFONO;
		//emisor -> el responsable del registro

        $nombre =$archivos->NOMBRE;
        $user =$archivos->USUARIO;
        $pass =$archivos->PASSWORD;
        // $codigo =$archivos->NOMBRE;
        //url de la petición
        $url = 'https://api.infobip.com/sms/1/text/single';
        //inicializamos el objeto CUrl
        $ch = curl_init($url);
        //el json simulamos una petición de un login
        $jsonData = array(
            'from' => 'CajacopiEPS',
            'to' => $movil,
			'text' => 'Sr(es). '.$nombre.', visite nuestro portal en la opcion Empresa. Sus datos de acceso son NIT '.$user.'  CONTRASENA '.$pass
        );
        $header = array(
            'Content-Type: application/json',
            'authorization: Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
            'accept: application/json'
        );
        //creamos el json a partir de nuestro arreglo
        $jsonDataEncoded = json_encode($jsonData);
        //Indicamos que nuestra petición sera Post
        curl_setopt($ch, CURLOPT_POST, 1);
         //para que la peticion no imprima el resultado como un echo comun, y podamos manipularlo
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //Adjuntamos el json a nuestra petición
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
        //Agregamos los encabezados del contenido
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        //ignorar el certificado, servidor de desarrollo
        //utilicen estas dos lineas si su petición es tipo https y estan en servidor de desarrollo
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		//Ejecutamos la petición
		$result = curl_exec($ch);
	}
	function actualiza_aportante(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		$v_fecha_vigencia = date('d/m/Y', strtotime($request->v_fecha_vigencia));
		$v_nacimiento_representante = date('d/m/Y', strtotime($request->v_nacimiento_representante));
		$v_nacimiento_responsable = date('d/m/Y', strtotime($request->v_nacimiento_responsable));
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_actualiza_aportante(:v_numero,
																			 :v_ubicacion,
																			 :v_tipo_documento_aportante,
																			 :v_documento_aportante,
																			 :v_razon_social,
																			 :v_sigla,
																			 :v_tipo_empleador,
																			 :v_tipo_persona,
																			 :v_clase_empleador,
																			 :v_forma_pago,
																			 :v_clasificacion,
																			 :v_actividad,
																			 :v_vigencia,
																			 :v_fecha_vigencia,
																			 :v_representante,
																			 :v_tipo_doc_representante,
																			 :v_doc_representante,
																			 :v_nacimiento_representante,
																			 :v_correo_representante,
																			 :v_nombre_responsable,
																			 :v_telefono_responsable,
																			 :v_celular_responsable,
																			 :v_nacimiento_responsable,
																			 :v_correo_responsable,
																			 :v_respuesta); end;');
		oci_bind_by_name($consulta,':v_numero',$request->v_numero);
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		oci_bind_by_name($consulta,':v_tipo_documento_aportante',$request->v_tipo_documento_aportante);
		oci_bind_by_name($consulta,':v_documento_aportante',$request->v_documento_aportante);
		oci_bind_by_name($consulta,':v_razon_social',$request->v_razon_social);
		oci_bind_by_name($consulta,':v_sigla',$request->v_sigla);
		oci_bind_by_name($consulta,':v_tipo_empleador',$request->v_tipo_empleador);
		oci_bind_by_name($consulta,':v_tipo_persona',$request->v_tipo_persona);
		oci_bind_by_name($consulta,':v_clase_empleador',$request->v_clase_empleador);
		oci_bind_by_name($consulta,':v_forma_pago',$request->v_forma_pago);
		oci_bind_by_name($consulta,':v_clasificacion',$request->v_clasificacion);
		oci_bind_by_name($consulta,':v_actividad',$request->v_actividad);
		oci_bind_by_name($consulta,':v_vigencia',$request->v_vigencia);
		oci_bind_by_name($consulta,':v_fecha_vigencia',$v_fecha_vigencia);
		oci_bind_by_name($consulta,':v_representante',$request->v_representante);
		oci_bind_by_name($consulta,':v_tipo_doc_representante',$request->v_tipo_doc_representante);
		oci_bind_by_name($consulta,':v_doc_representante',$request->v_doc_representante);
		oci_bind_by_name($consulta,':v_nacimiento_representante',$v_nacimiento_representante);
		oci_bind_by_name($consulta,':v_correo_representante',$request->v_correo_representante);
		oci_bind_by_name($consulta,':v_nombre_responsable',$request->v_nombre_responsable);
		oci_bind_by_name($consulta,':v_telefono_responsable',$request->v_telefono_responsable);
		oci_bind_by_name($consulta,':v_celular_responsable',$request->v_celular_responsable);
		oci_bind_by_name($consulta,':v_nacimiento_responsable',$v_nacimiento_responsable);
		oci_bind_by_name($consulta,':v_correo_responsable',$request->v_correo_responsable);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_Gestiones(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_totales(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}

	function Carga_Cantidades_Gestiones_diarias(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_diarias(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_Gestiones_mensual(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_mensual(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_afiliaciones(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_afiliaciones_totales(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_Gestiones_diarias_solicitud(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_diarias_solicitud(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_Gestiones_mensual_solicitud(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_mensual_solicitud(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function Carga_Cantidades_Gestiones_anual_solicitud(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.cantidad_solicitudes_amual_solicitud(:v_prespuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
		function detalle_gestion_afiliaciones(){
		require_once('../config/dbcon_empresa.php');
		global $request;
        $consulta = oci_parse($c,'begin pq_genesis_mov.detalles_solicitud(:v_pdocumento,
																			:v_prespuesta); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$request->v_pdocumento);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);
	}
	function detalle_novedad(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_obtener_detalle_novedad(	:v_pnumero,
																					:v_pubicacion,
																					:v_res); end;');
		oci_bind_by_name($consulta,':v_pnumero',$request->numero);
		oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);

		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function p_elimina_soporte(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_elimina_soporte(	:v_rowid,
																			:v_respuesta); end;');
		oci_bind_by_name($consulta,':v_rowid',$request->v_rowid);
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

	// CNVU - TRANSFERIR SOLICITUDES
	function transferir_solicitudes(){
		require_once('../config/dbcon_empresa.php');
		global $request;
		 //$request->data;
		$consulta = oci_parse($c,'begin pq_genesis_mov.p_reasigna_solicitudes(:v_presponsable,
																			  :v_pnuevo_responsable,
																			  :v_ptipo_sol,
																			  :v_ptipo_asignacion,
																			  :v_respuesta); end;');
		oci_bind_by_name($consulta,':v_presponsable',$request->responsable);
		oci_bind_by_name($consulta,':v_pnuevo_responsable',$request->nuevo_responsable);
		oci_bind_by_name($consulta,':v_ptipo_sol',$request->tipo_solicitud);
		oci_bind_by_name($consulta,':v_ptipo_asignacion',$request->tipo_asignacion);
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
