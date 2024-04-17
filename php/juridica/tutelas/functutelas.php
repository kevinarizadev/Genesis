<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function listaJuzgados()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$keyword = '%' . $request->keyword . '%';
	$consulta =  oci_parse($c, "SELECT j.juzn_codigo codigo, UPPER(j.juzc_nombre)nombre, j.juzn_ubicacion ubicacion,u.ubgc_nombre ubicacionnombre
											FROM bjuz_juzgado j
											INNER JOIN bubg_ubicacion_geografica u ON u.ubgn_codigo = j.juzn_ubicacion
											WHERE (UPPER(juzn_codigo) LIKE UPPER(:keyword) OR UPPER(juzc_nombre) LIKE UPPER(:keyword) OR UPPER(juzn_ubicacion) LIKE UPPER(:keyword))
											AND rownum <= 500");
	oci_bind_by_name($consulta, ':keyword', $keyword);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function nombreAfiliado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_datos_basicos(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
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
function nombreIps()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, "SELECT terc_nombre nombre
											FROM bter_tercero
											WHERE terv_codigo = :v_nit AND rownum = 1");
	oci_bind_by_name($consulta, ':v_nit', $request->nit_empresa);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function listaFestivos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, "SELECT json_arrayagg(to_char(fesf_fecha,'yyyy-mm-dd')) as fechas
											FROM bfes_festivo b
											WHERE b.fesf_fecha LIKE '%/'||to_char(sysdate,'yyyy')");
	oci_execute($consulta);
	$rows = array();
	while (($row = oci_fetch_array($consulta, OCI_ASSOC)) != false) {
		echo $row['FECHAS'] . "<br>\n";
	}
	oci_close($c);
}

function fechaVencimiento()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_fecha_plazo(:v_fecha,:v_plazo,:v_vencimiento); end;');
	oci_bind_by_name($consulta, ':v_fecha', $request->f_recepcion);
	oci_bind_by_name($consulta, ':v_plazo', $request->plazo);
	oci_bind_by_name($consulta, ':v_vencimiento', $vencimiento, 10);
	oci_execute($consulta, OCI_DEFAULT);
	echo $vencimiento;
	oci_close($c);
}
function listaAccionantes()
{
	require_once('../../config/dbcon_prod.php');
	$empresa = 1;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_accionante(:v_empresa,:v_json); end;');
	oci_bind_by_name($consulta, ':v_empresa', $empresa);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function listaCausas()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_causa(:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function listaMotivos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_motivo(:v_causa,:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_causa', $request->causa);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function listaDiagnosticos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_diagnostico(:v_keyword,:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_keyword', $request->keyword);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function buscaTutelas()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_busqueda_tutela(:v_keyword,:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_keyword', $request->keywordtutelas);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function obtenerTutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_tutela(:v_pcoincidencia,:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->numerotutela);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function registraTutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$dataRegistro = json_decode($request->dataRegistro);
	$empresa = 1;
	$documento = 'TS';
	if ($dataRegistro->accionante == "2") {
		$dataaccionante = $dataRegistro->nombreips;
	} else if ($dataRegistro->accionante == "3") {
		$dataaccionante = $dataRegistro->nombreagente;
	} else if ($dataRegistro->accionante == "4") {
		$dataaccionante = $dataRegistro->otroaccionante;
	} else if ($dataRegistro->accionante == "5") {
		$dataaccionante = $dataRegistro->nombreaccionado;
	}
	// else if ($dataRegistro->accionante == "1") {
	// 	$dataaccionante = $dataRegistro->nombreafiliado;
	// }
	if (isset($dataRegistro->medidaprovisional)) {
		if ($dataRegistro->medidaprovisional == true) {
			$medida = 'S';
		} else if ($dataRegistro->medidaprovisional == false) {
			$medida = 'N';
		}
	} else {
		$medida = 'N';
	}
	$ips = 'NI';
	if ($dataRegistro->actividad == 'I') {
		// $ubicacion = $_SESSION['codmunicipio'];
		$ubicacion = $dataRegistro->regionalTutela;
	} else {
		$ubicacion = $dataRegistro->ubicacion;
		$num_tutela = $dataRegistro->codigotutela;
	}

	// Campo Diferente de otra eps
	if (isset($dataRegistro->diferenteepsAdmisionTut)) {
		if ($dataRegistro->diferenteepsAdmisionTut == true) {
			$diferenteepsAdmisionTut = 'S';
		} else if ($dataRegistro->diferenteepsAdmisionTut == false) {
			$diferenteepsAdmisionTut = 'N';
		}
	} else {
		$diferenteepsAdmisionTut = 'N';
	}
	$chkTecnologiasSalud = $dataRegistro->chkTecnologiasSalud == true  ? 'S' : 'N';
	$chkAtencionCohorte = $dataRegistro->chkAtencionCohorte == true  ? 'S' : 'N';
	$chkPrestacionesContinuas = $dataRegistro->chkPrestacionesContinuas == true  ? 'S' : 'N';

	// echo $chkTecnologiasSalud;
	//  $chkAtencionCohorte='S';
	//  $chkPrestacionesContinuas='S';
	// echo $ubicacion;
	$v_pcausa_1='';
	$v_pmotivo_1='';

	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_tutela(:v_pempresa,
																	:v_pdocumento,
																	:v_pnumero,
																	:v_pubicacion,
																	:v_pradicacion,
																	:v_ptipo_documento,
																	:v_pdocumento_identificacion,
																	:v_ptipo_documento2,
																	:v_pdocumento_identificacion2,
																	:v_pdatos_accionante,
																	:v_pdiagnostico,
																	:v_paccionante,
																	:v_pmedida_provisional,
																	:v_pjuzgado,
																	:v_pfecha_recepcion,
																	:v_pplazo,
																	:v_pcausa,
																	:v_pmotivo,
																	:v_presponsable,
																	:v_pactividad,
																	:v_pfecha_fallo,
																	:v_pplazo_fallo,
																	:v_pfecha_plazo_fallo,
																	:v_pfecha_recepcion_medida_prov,
																	:v_pplazo_medida_prov,
																	:v_pfecha_vencimiento_medida_prov,
																	:v_peps_anterior,
																	:v_ptipodoc_agenteoficioso,
																	:v_pnumdoc_agenteoficioso,

																	:v_ptecnologia_salud,
																	:v_pcohorte_gr,
																	:v_pprestaciones_continuas,

																	:v_pcausa_1,
																	:v_pmotivo_1,

																	:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $empresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pnumero', $num_tutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_pradicacion', $dataRegistro->consecutivojuzgado);
	oci_bind_by_name($consulta, ':v_ptipo_documento', $dataRegistro->tipoidafiliado);
	oci_bind_by_name($consulta, ':v_pdocumento_identificacion', $dataRegistro->idafiliado);
	oci_bind_by_name($consulta, ':v_ptipo_documento2', $ips);
	oci_bind_by_name($consulta, ':v_pdocumento_identificacion2', $dataRegistro->nitips);
	oci_bind_by_name($consulta, ':v_pdatos_accionante', $dataaccionante);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $dataRegistro->diagnostico);
	oci_bind_by_name($consulta, ':v_paccionante', $dataRegistro->accionante);
	oci_bind_by_name($consulta, ':v_pmedida_provisional', $medida);
	oci_bind_by_name($consulta, ':v_pjuzgado', $dataRegistro->juzgado);
	oci_bind_by_name($consulta, ':v_pfecha_recepcion', $dataRegistro->f_recepcion);
	oci_bind_by_name($consulta, ':v_pplazo', $dataRegistro->plazo);
	oci_bind_by_name($consulta, ':v_pcausa', $dataRegistro->causa);
	oci_bind_by_name($consulta, ':v_pmotivo', $dataRegistro->motivo);
	oci_bind_by_name($consulta, ':v_presponsable', $dataRegistro->responsable_nac);
	oci_bind_by_name($consulta, ':v_pactividad', $dataRegistro->actividad);
	oci_bind_by_name($consulta, ':v_pfecha_fallo', $dataRegistro->f_falloac);
	oci_bind_by_name($consulta, ':v_pplazo_fallo', $dataRegistro->plazofalloac);
	oci_bind_by_name($consulta, ':v_pfecha_plazo_fallo', $dataRegistro->f_vencimientofalloac);
	oci_bind_by_name($consulta, ':v_pfecha_recepcion_medida_prov', $dataRegistro->f_medida);
	oci_bind_by_name($consulta, ':v_pplazo_medida_prov', $dataRegistro->plazo_medida_prov);
	oci_bind_by_name($consulta, ':v_pfecha_vencimiento_medida_prov', $dataRegistro->f_vencimientomedida);
	oci_bind_by_name($consulta, ':v_peps_anterior', $diferenteepsAdmisionTut);

	oci_bind_by_name($consulta, ':v_ptipodoc_agenteoficioso', $dataRegistro->tipoDocAgenteOficioso);
	oci_bind_by_name($consulta, ':v_pnumdoc_agenteoficioso', $dataRegistro->numDocAgenteOficioso);

	oci_bind_by_name($consulta, ':v_ptecnologia_salud', $chkTecnologiasSalud);
	oci_bind_by_name($consulta, ':v_pcohorte_gr', $chkAtencionCohorte);
	oci_bind_by_name($consulta, ':v_pprestaciones_continuas', $chkPrestacionesContinuas);

	oci_bind_by_name($consulta, ':v_pcausa_1', $v_pcausa_1);
	oci_bind_by_name($consulta, ':v_pmotivo_1', $v_pmotivo_1);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function registraEtapa2()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$dataDetalle = json_decode($request->dataDetalle);
	$fallo = ($dataDetalle->fallotutela == true) ? 'A' : 'C';
	$tratamientointegral = ($dataDetalle->tratamientointegral == true) ? 'S' : 'N';
	$impugnado = ($dataDetalle->impugnado == true) ? 'S' : 'N';
	$seguimiento = ($dataDetalle->seguimiento == true) ? 'S' : 'N';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_etapa2(:v_pnumero,
																								:v_pubicacion,
																								:v_pfallo_tutela,
																								:v_ptratamiento_integral,
																								--:v_pimpugnado,
																								:v_pseguimiento_continuo,
																								:v_presponsable,
																								:v_pfecha_fallo,
																								:v_pplazo_fallo,
																								:v_pfecha_plazo_fallo,
																								:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	//oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion_tutela);
	oci_bind_by_name($consulta, ':v_pfallo_tutela', $fallo);
	oci_bind_by_name($consulta, ':v_ptratamiento_integral', $tratamientointegral);
	oci_bind_by_name($consulta, ':v_pseguimiento_continuo', $seguimiento);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	oci_bind_by_name($consulta, ':v_pfecha_fallo', $dataDetalle->f_fallo);
	oci_bind_by_name($consulta, ':v_pplazo_fallo', $dataDetalle->plazofallo);
	oci_bind_by_name($consulta, ':v_pfecha_plazo_fallo', $dataDetalle->f_vencimientofallo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function registraImpugnacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$impugnado = ($request->impugnado == true) ? 'S' : 'N';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_tutela_impugnacion(:v_pnumero,
																								:v_pubicacion,
																								:v_pimpugnado,
																								:v_presponsable,
																								:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_pimpugnado', $impugnado);
	oci_bind_by_name($consulta, ':v_presponsable', $_SESSION['cedula']);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

function listaAdjuntosCargados()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_adjuntos_tutela (:v_pnumero,
																				:v_pconsecutivo,
																				:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->consnulidad);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

function listaAdjuntosCargadosNew()
{
	require_once('../../config/dbcon_prod.php');
	// require_once('../../config/dbcon_produccion.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_OBTENER_SOPORTES_TUTELA (:v_pnumero,
																				:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function listaAdjuntosCargadosRevisiones()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, "SELECT a.tutc_archivo RUTA,t.nombre, oasis.f_tercero_nombre(a.tutv_responsable,'TERC_NOMBRE') nombre_responsable,
								   a.tutv_responsable responsable, a.tutn_renglon, a.TUTF_FUENTE_FTP,
								   a.turf_fecha fecha, a.tutc_tipo,t.imagen, a.tutc_observacion observacion,
								   case when a.tutn_incidente is null then -1 else a.tutn_incidente end incidente,
								   case when a.tutc_tipo = '40' then 'Archivado' when a.tutc_tipo = '41' then 'Correo Archivado'
								   when a.tutc_tipo = '48' then 'Activo' when a.tutc_tipo = '49' then 'Correo Activo' end estado
								   from tutela_adjunto a
								   inner join tipo_archivo_tutela t on t.codigo = a.tutc_tipo and t.req_aprobacion is null
								   where a.tutn_numero = :v_numero and a.tutc_archivo is not null and a.tutn_nulidad_cons is null
								   and a.tutc_tipo in ('40','41','48','49') and a.tutc_tipo not like '%R%'
								   order by turf_fecha");
	oci_bind_by_name($consulta, ':v_numero', $request->codigotutela);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function descargaAdjunto()
{
	global $request;
	$fileexists = false;

	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../../config/sftp_con.php');
		$fileexists = true;
	}

	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/ftpcon.php');
		$fileexists = true;
	}

	if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/sftp_con_2.php');
		$fileexists = true;
	}

	if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/l_ftpcon.php');
		$fileexists = true;
	}

	if ($fileexists) {
		$file_size = ftp_size($con_id, $request->ruta);
		if ($file_size != -1) {
			$name = uniqid();
			$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
			$name = $name . '.' . $ext;
			$local_file = '../../../temp/' . $name;
			$handle = fopen($local_file, 'w');
			if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
				echo $name;
			} else {
				echo "Error";
			}
			ftp_close($con_id);
			fclose($handle);
		} else {
			echo "Error";
		}
	} else {
		require('../../sftp_cloud/DownloadFile.php');
		echo (DownloadFile($request->ruta));
	}
}

function descargaAdjuntoftp3()
{
	require_once('../../config/sftp_con.php');
	global $request;

	$fileexists = false;

	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../../config/sftp_con.php');
		$fileexists = true;
	}

	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/ftpcon.php');
		$fileexists = true;
	}

	if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/sftp_con_2.php');
		$fileexists = true;
	}

	if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/l_ftpcon.php');
		$fileexists = true;
	}

	if ($fileexists) {
		$name = uniqid();
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../../temp/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
			echo $name;
		} else {
			echo "Error";
		}
		ftp_close($con_id);
		fclose($handle);
	} else {
		require('../../sftp_cloud/DownloadFile.php');
		echo (DownloadFile($request->ruta));
	}
}

function descargaAdjuntoGlobal()
{

	global $request;
	$fileexists = false;

	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../../config/ftpcon.php');
		$fileexists = true;
	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../../config/sftp_con.php');
		$fileexists = true;
	}
	if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE && $fileexists == false) {
		require_once('../../config/sftp_con_2.php');
		$fileexists = true;
	}
	//echo $request->ruta;
	if ($fileexists) {
		$file_size = ftp_size($con_id, $request->ruta);
		if ($file_size != -1) {
			// $ruta = $request->ruta;
			$name = explode("/", $request->ruta)[count(explode("/", $request->ruta)) - 1]; //Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
			// $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
			// $name = $name;
			$local_file = '../../../temp/' . $name;
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
		echo (DownloadFile($request->ruta));
	}
}


function listaArchivosRespuesta()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, "SELECT ti.codigo,substr(ti.nombre,0,1) inicial,initcap(ti.nombre) nombre--,ti.*
											from tipo_archivo_tutela ti
											where req_aprobacion = 'S'");
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function listaConversacion()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_conversacion(:v_pnumero,
																									--:v_pubicacion,
																									:v_ptipo,
																									:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	//oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipoarchivo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}
function apruebaArchivo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_aprueba_archivo(:v_pnumero,
																								--:v_pubicacion,
																								:v_ptipo,
																								:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	//oci_bind_by_name($consulta,':v_pubicacion',$_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipoarchivo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

// function listaAdjuntosCargadosMensual(){
// 	require_once('../../config/dbcon_prod.php');
// 	global $request;
// 	$consulta =  oci_parse($c,"SELECT a.tutc_archivo RUTA,t.nombre,t.imagen,to_char(a.turf_fecha,'dd/mm/yyyy') fecha, a.TUTF_FUENTE_FTP
// 										from tutela_adjunto a
// 										inner join tipo_archivo_tutela t on t.codigo = a.tutc_tipo and t.req_aprobacion is null
// 										where a.tutn_numero = :v_numero and a.tutc_tipo='5' and a.tutc_archivo is not null and a.tutn_nulidad_cons is null
// 										order by turf_fecha");
// 	oci_bind_by_name($consulta,':v_numero',$request->codigotutela);
// 	oci_execute($consulta);
// 	$rows = array();while($row = oci_fetch_assoc($consulta))
// 	{
// 		$rows[] = $row;
// 	}
// 	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
// 	oci_close($c);
// }
function listaAdjuntosCargadosMensual()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	// $impugnado = ($request->impugnado == true) ? 'S' : 'N';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_adjuntos_cumplimiento_tutela(:v_pnumero,
																							:v_pconsecutivo,
																							:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->consnulidad);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

function BuscarOmitirEtapasTut()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_BUSCAR_ETAPAS(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

function OmitirEtapa_SaltarEtapa()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_SALTAR_ETAPAS(:v_pnumero,:v_petapa,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	oci_bind_by_name($consulta, ':v_petapa', $request->etapa);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

// CNVU ELIMINA TUTELA 23/01/2020
function EliminarTutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_ELIMINA_TUTELA(:v_pnumero,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigotutela);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->usucedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$json = $clob->read($clob->size());
	echo $json;
	oci_close($c);
}

function registraNulidad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	//$tipo = '48';
	// echo ($_SESSION['cedula']);
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_insertar_nulidad(:v_pnumero,
																			:v_pubicacion,
																			:v_pstatus,
																			:v_ptipo_nulidad,
																			:v_pdeclaracion_nulidad,
																			:v_presponsable,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_pstatus', $request->status);
	oci_bind_by_name($consulta, ':v_ptipo_nulidad', $request->tipo_nulidad);
	oci_bind_by_name($consulta, ':v_pdeclaracion_nulidad', $request->declaracion_nulidad);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}
function listaNulidades()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_nulidades(:v_pnumero,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
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
function listaAdjuntosCargadosNulidad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_OBTENER_SOPORTES_NOVEDAD(:v_pnumero,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
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
function obtenerNulidad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_nulidad(:v_pcoincidencia,:v_consecutivo,:v_json); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->constutela);
	oci_bind_by_name($consulta, ':v_consecutivo', $request->consnulidad);
	oci_bind_by_name($consulta, ':v_json', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function inserta_etapa_nulidad()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	//$tipo = '48';
	// echo ($_SESSION['cedula']);
	$dataNulidad = $request->dataNulidad;
	// var_dump ($dataNulidad);
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_gestionar_nulidad(:v_pnumero,
																			:v_pubicacion,
																			:v_pconsecutivo,
																			:v_pstatus,
																			:v_json_in,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->constutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $_SESSION['codmunicipio']);
	oci_bind_by_name($consulta, ':v_pconsecutivo', $request->consnulidad);
	oci_bind_by_name($consulta, ':v_pstatus', $request->status);
	$json = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_in', $json, -1, OCI_B_CLOB);
	$json->writeTemporary($dataNulidad);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	$ex = oci_execute($consulta, OCI_DEFAULT);
	if (!$ex) {
		echo oci_error($stid);
	} else {
		$json = $clob->read($clob->size());
		echo $json;
	}
	oci_close($c);
}

function actualizaSoporte()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$oldRuta =  $request->oldruta;
	$responsable = $request->resp;
	$B64 = $request->B64;
	$nombre = $request->nombre;
	$ext = $request->ext;

	$subir = subirAdjunto($B64, $nombre, $ext);
	if (explode("/", $subir)[1] == 'cargue_ftp') {
		$newRuta = $subir;
		$consulta = oci_parse($c, 'begin pq_genesis_tut.P_ACTUALIZAR_ADJUNTO_TUT(:v_pruta_ant, :v_pruta_nueva, :v_presponsable, :v_pjson_row); end;');
		oci_bind_by_name($consulta, ':v_pruta_ant', $oldRuta);
		oci_bind_by_name($consulta, ':v_pruta_nueva', $newRuta);
		oci_bind_by_name($consulta, ':v_presponsable', $responsable);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		$respuesta = $clob->read($clob->size());
		echo $respuesta;
		oci_close($c);
	}
}

function subirAdjunto($B64, $nombre, $ext)
{
	$hoy = date('dmY');
	$hoy2 = uniqid() . '_' . date('dmYHis');
	$path = 'Juridica/Tutelas/' . $hoy;
	// $ext =  $request->ext;
	$name = $hoy2 . '.' . $ext;
	$archivos = $B64;
	list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
	list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
	$base64 = base64_decode($archivos); // Proceso para traer el Base64
	file_put_contents('../../../temp/' . $name, $base64);
	require('../../sftp_cloud/UploadFile.php');
	$subio = UploadFile($path, $name);

	explode('-', $subio);
	if ($subio[0] != '0') {
		return $subio;
	} else {
		return '0';
	}
}

function eliminaSoporte()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin pq_genesis_tut.P_ELIMINAR_ADJUNTO_TUT(:v_pruta,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
	// oci_bind_by_name($consulta, ':v_presponsable', $request->resp);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$respuesta = $clob->read($clob->size());
	echo $respuesta;
	oci_close($c);
}



function p_obtener_tutela_reporte_general()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.P_OBTENER_TUTELA_REPORTE_GENERAL(:v_response); end;');
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}

function p_ver_permisos_funcs()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ver_permisos_funcs(:v_pcedula,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$respuesta = $clob->read($clob->size());
	echo $respuesta;
	oci_close($c);
}

function p_lista_concepto()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_lista_concepto(:v_json_row); end;');
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

function p_listar_motivos()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_lista_motivos(:v_pmotivo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pmotivo', $request->causa);
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

function p_buscar_productos()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_buscar_productos(:v_pcoincidencia,:v_pedad,:v_psexo,:v_pregimen,:v_pubicacion,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coinc);
	oci_bind_by_name($consulta, ':v_pedad', $request->edadDias);
	oci_bind_by_name($consulta, ':v_psexo', $request->sexoCodigo);
	oci_bind_by_name($consulta, ':v_pregimen', $request->regimenAfiliado);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function p_obtener_subcategorias()
{
	global $request;
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_obtener_subcategorias(:v_pcodigo,:v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigo', $request->coinc);
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

function listaDiagnosticos2()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_diagnostico(:v_pcoincidencia,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coinc);
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

function p_obtener_ips()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_ips(:v_pnit,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnit', $request->coinc);
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

function p_ui_servicios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_servicios(:v_pnumero,:v_pubicacion,:v_petapa,:v_pjson_servicio,:v_pcantidad_serv,:v_paccion,:v_pregimen,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_petapa', $request->etapa);
	oci_bind_by_name($consulta, ':v_pjson_servicio', $request->jsonCausas);
	oci_bind_by_name($consulta, ':v_pcantidad_serv', $request->cantidad);
	oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_pregimen', $request->regimenAfiliado);
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

function p_lista_productos_tut()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_productos_tut(:v_pnumero,:v_pubicacion,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function p_ui_bitacora()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_bitacora(:v_pnumero,:v_pubicacion,:v_pobservacion,:v_pplazo,:v_precurrencia,:v_ptiempo,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_pplazo', $request->plazo);
	oci_bind_by_name($consulta, ':v_precurrencia', $request->recurrencia);
	oci_bind_by_name($consulta, ':v_ptiempo', $request->tiempo);
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

function p_lista_bitacoras()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_bitacoras(:v_pnumero,:v_pubicacion,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function p_obtener_area()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_area(:v_json_row); end;');
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
function p_obtener_funcionario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_funcionario(:v_parea,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parea', $request->area);
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

function p_ui_areas_tutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$adjunto = '';
	$estado = '';
	$gestion = '';
	$renglon = '';
	$observacion_gestion='';
	$observacion_nacional='';
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_areas_tutela(:v_pnumero,:v_pubicacion,:v_parea,:v_pfuncionario,:v_pfvencimiento,
	:v_phvencimiento,:v_pobservacion,:v_padjunto,:v_pestado,:v_pgestion,:v_paccion,:v_prenglon,:v_pobservacion_gestion,:v_pobservacion_nacional,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_parea', $request->area);
	oci_bind_by_name($consulta, ':v_pfuncionario', $request->funcionario);
	oci_bind_by_name($consulta, ':v_pfvencimiento', $request->fvencimiento);
	oci_bind_by_name($consulta, ':v_phvencimiento', $request->hvencimiento);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_padjunto', $adjunto);
	oci_bind_by_name($consulta, ':v_pestado', $estado);
	oci_bind_by_name($consulta, ':v_pgestion', $gestion);
	oci_bind_by_name($consulta, ':v_paccion', $request->accion);
	oci_bind_by_name($consulta, ':v_prenglon', $renglon);
	oci_bind_by_name($consulta, ':v_pobservacion_gestion', $observacion_gestion);
	oci_bind_by_name($consulta, ':v_pobservacion_nacional', $observacion_nacional);
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

function p_ui_archiva_tutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_archiva_tutela(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pobservacion,:v_pestado,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

function p_lista_cohortes()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_lista_cohortes(:v_ptipo_documento,:v_pdocumento,:v_ptipo,:v_ptutela,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipoDoc);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->numDoc);
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
	oci_bind_by_name($consulta, ':v_ptutela', $request->tutela);
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

function P_OBTENER_PQRDS_AFILIADO()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.P_OBTENER_PQRDS_AFILIADO(:v_ptipodoc,:v_pnumdoc,:v_pnumerotutela,:v_pubicacion,:v_ptipobusqueda,
  :v_response); end;');
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->tipoDoc);
	oci_bind_by_name($consulta, ':v_pnumdoc', $request->numDoc);
	oci_bind_by_name($consulta, ':v_pnumerotutela', $request->numeroTutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipobusqueda', $request->tipoBusqueda);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}

function p_ins_cohortes_tutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_cohortes_tutela(:v_pnumero,:v_pubicacion,:v_pjson,:v_pcantidad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pjson', $request->datos);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
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

function p_ins_pqrs_tutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_ins_pqrs_tutela(:v_pnumero,:v_pubicacion,:v_pjson,:v_pcantidad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pjson', $request->datos);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
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

function p_lista_tipos_adjuntos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_lista_tipos_adjuntos(:v_response); end;');

	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}

function cargarSoporte()
{
  // require_once('../config/dbcon.php');
  require('../../sftp_cloud/UploadFile.php');
  global $request;
  // $archivos = json_decode($request->archivos);
  $archivo = $request->base64;
  $fecha = date('dmY');
  $path = 'Juridica/Tutelas/'. $fecha;

  $hoy = date('dmY_His');
  $name = $request->tutela .  '_' . $hoy . '.pdf';
	// 123456789_29092023_100326.pdf
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp

  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_cargar_adjunto_tutela()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin pq_genesis_tut.p_cargar_adjunto_tutela(:v_pnumero,:v_pubicacion,:v_ptipo,:v_pincidente,:v_pfecha,:v_pruta,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->tutela);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
	oci_bind_by_name($consulta, ':v_pincidente', $request->incidente);
	oci_bind_by_name($consulta, ':v_pfecha', $request->fecha);
	oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
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

function P_INFORME_SERVICIOS()
{
	require_once('../../config/dbcon_prod.php');
	// global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tut.p_informe_servicios(:v_presponse); end;');
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
}
