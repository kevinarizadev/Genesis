<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function logicamedidas(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$sueter = $request->sueter;
	$camisa = $request->camisa;
	$pantalon = $request->pantalon;
	$zapato = $request->zapato;
	$id = $request->id;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_MEDIDAS(:v_psueter,:v_pcamisa,:v_ppantalon,:v_pzapato,:v_pid,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_psueter',$sueter);
	oci_bind_by_name($consulta,':v_pcamisa', $camisa);
	oci_bind_by_name($consulta,':v_ppantalon', $pantalon);
	oci_bind_by_name($consulta,':v_pzapato',$zapato);
	oci_bind_by_name($consulta,':v_pid',$id);
	oci_bind_by_name($consulta,':v_respuesta',$respuesta,200);
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	oci_close($c);
}
function logicabeneficiario(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$tipodoc = $request->tipodoc;
	$documento = $request->documento;
	$nombre = $request->nombre;
	$parentezco = $request->parentezco;
	$sexo = $request->sexo;
	$nacimiento = $request->nacimiento;
	$id = $request->id;
	$renglon = $request->renglon;
	$tipo = $request->tipo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_BENEFICIARIO(:v_pid,:v_ptipodoc,:v_pdocumento,:v_pnombre,:v_pparentezco,:v_psexo,:v_pnacimiento,:v_prenglon,:v_ptipo,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_pid',$id);
	oci_bind_by_name($consulta,':v_ptipodoc', $tipodoc);
	oci_bind_by_name($consulta,':v_pdocumento', $documento);
	oci_bind_by_name($consulta,':v_pnombre',$nombre);
	oci_bind_by_name($consulta,':v_pparentezco',$parentezco);
	oci_bind_by_name($consulta,':v_psexo', $sexo);
	oci_bind_by_name($consulta,':v_pnacimiento', $nacimiento);
	oci_bind_by_name($consulta,':v_prenglon',$renglon);
	oci_bind_by_name($consulta,':v_ptipo',$tipo);
	oci_bind_by_name($consulta,':v_respuesta',$respuesta,200);
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	oci_close($c);
}
function logicaestudio(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$institucion = $request->institucion;
	$titulo = $request->titulo;
	$programa = $request->programa;
	$nivel = $request->nivel;
	$tipoperiodo = $request->tipoperiodo;
	$periodo = $request->periodo;
	$ubicacion = $request->ubicacion;
	$fechafinal = $request->fechafinal;
	$documento = $request->id;
	$renglon = $request->renglon;
	$tipo = $request->tipo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_ESTUDIO(:v_pid,:v_pinstitucion,:v_ptitulo,:v_pprograma,:v_pnivel,:v_ptipoperiodo,:v_pperiodo,:v_pubicacion,:v_prenglon,:v_ptipo,:v_panofinal,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_pid',$documento);
	oci_bind_by_name($consulta,':v_pinstitucion', $institucion);
	oci_bind_by_name($consulta,':v_ptitulo', $titulo);
	oci_bind_by_name($consulta,':v_pprograma',$programa);
	oci_bind_by_name($consulta,':v_pnivel',$nivel);
	oci_bind_by_name($consulta,':v_ptipoperiodo', $tipoperiodo);
	oci_bind_by_name($consulta,':v_pperiodo', $periodo);
	oci_bind_by_name($consulta,':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta,':v_prenglon',$renglon);
	oci_bind_by_name($consulta,':v_ptipo',$tipo);
	oci_bind_by_name($consulta,':v_panofinal', $fechafinal);
	oci_bind_by_name($consulta,':v_respuesta',$respuesta,200);
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	oci_close($c);
}
function logicaentidad(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$tipoentidad = $request->tipoentidad;
	$entidad = $request->entidad;
	$finicial = $request->finicial;
	$ffinal = $request->ffinal;
	$id = $request->id;
	$tipo = $request->tipo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_ENTIDAD(:v_ptipoentidad,:v_pentidad,:v_pfechainicial,:v_pfechafinal,:v_pid,:v_ptipo,:v_respuesta); end;');
	oci_bind_by_name($consulta,':v_ptipoentidad',$tipoentidad);
	oci_bind_by_name($consulta,':v_pentidad', $entidad);
	oci_bind_by_name($consulta,':v_pfechainicial', $finicial);
	oci_bind_by_name($consulta,':v_pfechafinal',$ffinal);
	oci_bind_by_name($consulta,':v_pid',$id);
	oci_bind_by_name($consulta,':v_ptipo',$tipo);
	oci_bind_by_name($consulta,':v_respuesta',$respuesta,200);
	oci_execute($consulta,OCI_DEFAULT);
	echo $respuesta;
	oci_close($c);
}
function registrardatos(){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento;
	$tipodoc = $request->tipodoc;	
	$pnombre = $request->pnombre;
	$snombre = $request->snombre;
	$papellido = $request->papellido;
	$sapellido = $request->sapellido;
	$nacimiento = $request->nacimiento;
	$sexo = $request->sexo;
	$estadocivil = $request->estadocivil;
	$gruposanguineo = $request->gruposanguineo;
	$peso = $request->peso;
	$estatura = $request->estatura;
	$telefono = $request->telefono;
	$celular = $request->celular;
	$correo = $request->correo;
	$direccion = $request->direccion;
	$rethus = $request->rethus;
	$barrio = $request->barrio;
	$municipio = $request->municipio;
	$municipioe = $request->municipioe;
	$tipocontrato = $request->tipocontrato;
	$empleador = $request->empleador;
	$unidadestrategica = $request->unidadestrategica;
	$unidadfuncional = $request->unidadfuncional;
	$cargo = $request->cargo;
	$gruposalario = $request->gruposalario;
	$salario = $request->salario;
	$tiporemuneracion = $request->tiporemuneracion;
	$estado = $request->estado;
	$numerocuenta = $request->numerocuenta;
	$tipocuenta = $request->tipocuenta;
	$banco = $request->banco;
	$tipo = $request->tipo;
	$fechaingreso = $request->fechaingreso;
	$fechaegreso = $request->fechaegreso;
	$teletrabajo = 'N';
	$puestotrabajo=$request->puestotrabajo;
	$causalingreso=$request->causalingreso;
	$causalegreso=$request->causalegreso;
	$observacion=$request->observacion;
	$jefe=(isset($request->jefe)) ? $request->jefe : '';
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_TH.P_LOGICA_DATOS_BASICOS(:v_pcedula,
																		:v_ptipo,:v_ppapellido,
																		:v_psapellido,
																		:v_ppnombre,
																		:v_psnombre,
																		:v_pnacimiento,
																		:v_psexo,
																		:v_prh,
																		:v_pestado_civil,
																		:v_ppeso,
																		:v_pestatura,
																		:v_ptelefono,
																		:v_pcelular,
																		:v_pmun,
																		:v_prethus,
																		:v_pbarrio,
																		:v_pdireccion,
																		:v_pemail_personal,
																		:v_pmune,
																		:v_ptipo_contrato,
																		:v_pempleador,
																		:v_punidad_estrategica,
																		:v_punidad_funcional,
																		:v_pcargo,
																		:v_premuneracion,
																		:v_psalario,
																		:v_pgrupo_salarial,
																		:v_pfecha_ingreso,
																		:v_pterf_egreso,
																		:v_ptipo_cuenta,
																		:v_pnumero_cuenta,
																		:v_pbanco,
																		:v_pestado_empleado,
																		:v_ptipo_dato,
																		:v_pteletrabajo,
																		:v_ppuesto_trabajo,
																		:v_pcausal_ingreso,
																		:v_pcausal_egreso,
																		:v_pobservacion,
																		:v_pjefe,
																		:v_prespuesta); end;');
	oci_bind_by_name($consulta,':v_pcedula',$documento);
	oci_bind_by_name($consulta,':v_ptipo',$tipodoc);
	oci_bind_by_name($consulta,':v_ppapellido', $papellido);
	oci_bind_by_name($consulta,':v_psapellido',$sapellido);
	oci_bind_by_name($consulta,':v_ppnombre',$pnombre);
	oci_bind_by_name($consulta,':v_psnombre',$snombre);
	oci_bind_by_name($consulta,':v_pnacimiento',$nacimiento);
	oci_bind_by_name($consulta,':v_psexo', $sexo);
	oci_bind_by_name($consulta,':v_prh', $gruposanguineo);
	oci_bind_by_name($consulta,':v_pestado_civil',$estadocivil);
	oci_bind_by_name($consulta,':v_ppeso',$peso);
	oci_bind_by_name($consulta,':v_pestatura',$estatura);
	oci_bind_by_name($consulta,':v_ptelefono',$telefono);
	oci_bind_by_name($consulta,':v_pcelular',$celular);
	oci_bind_by_name($consulta,':v_pmun',$municipio);
	oci_bind_by_name($consulta,':v_pbarrio',$barrio);
	oci_bind_by_name($consulta,':v_prethus',$rethus);
	oci_bind_by_name($consulta,':v_pdireccion',$direccion);
	oci_bind_by_name($consulta,':v_pemail_personal',$correo);
	oci_bind_by_name($consulta,':v_pmune',$municipioe);
	oci_bind_by_name($consulta,':v_ptipo_contrato', $tipocontrato);
	oci_bind_by_name($consulta,':v_pempleador', $empleador);
	oci_bind_by_name($consulta,':v_punidad_estrategica',$unidadestrategica);
	oci_bind_by_name($consulta,':v_punidad_funcional',$unidadfuncional);
	oci_bind_by_name($consulta,':v_pcargo',$cargo);
	oci_bind_by_name($consulta,':v_premuneracion',$tiporemuneracion);
	oci_bind_by_name($consulta,':v_psalario', $salario);
	oci_bind_by_name($consulta,':v_pgrupo_salarial', $gruposalario);
	oci_bind_by_name($consulta,':v_pfecha_ingreso',$fechaingreso);
	oci_bind_by_name($consulta,':v_pterf_egreso',$fechaegreso);
	oci_bind_by_name($consulta,':v_ptipo_cuenta',$tipocuenta);
	oci_bind_by_name($consulta,':v_pnumero_cuenta',$numerocuenta);
	oci_bind_by_name($consulta,':v_pbanco',$banco);
	oci_bind_by_name($consulta,':v_pestado_empleado',$estado);
	oci_bind_by_name($consulta,':v_ptipo_dato',$tipo);
	oci_bind_by_name($consulta,':v_pteletrabajo',$teletrabajo);
	oci_bind_by_name($consulta,':v_ppuesto_trabajo',$puestotrabajo);
	oci_bind_by_name($consulta,':v_pcausal_ingreso',$causalingreso);
	oci_bind_by_name($consulta,':v_pcausal_egreso',$causalegreso);
	oci_bind_by_name($consulta,':v_pobservacion',$observacion);
	oci_bind_by_name($consulta,':v_pjefe',$jefe);
	oci_bind_by_name($consulta,':v_prespuesta',$respuesta,1000);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	echo $respuesta;
	oci_close($c);
}

	function cargarAdjunto(){
		require_once('anexoth.php');
		global $request;
		$path  = '/cargue_ftp/Digitalizacion/Genesis/TalentoHumano/DatosFuncionario/Beneficiario/';
		$rutat = subirFTP($request->file,$path,$request->name,$request->ext);
		if ($rutat != '0 - Error'){
			$res = registradb($rutat,$request->documento,$request->tipodoc,$request->doc,$request->obs);
		}else{
			echo "asdasdasd";
		}
	}
	function registradb($rutat,$documentot,$tipodocumentot,$cedulat,$obst){
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'begin pq_genesis_no.p_ins_doc_novedad(:v_pdocumento,
																																		:v_ptipo_doc_afiliado,
																																		:v_pafiliado,
																																		:v_pruta,
																																		:v_pobservacion); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$documentot);
		oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodocumentot);
		oci_bind_by_name($consulta,':v_pafiliado',$cedulat);
		oci_bind_by_name($consulta,':v_pruta',$rutat);
		oci_bind_by_name($consulta,':v_pobservacion',$obst);
		oci_execute($consulta,OCI_DEFAULT);
		echo 1;
		oci_close($c);
	}
?>
