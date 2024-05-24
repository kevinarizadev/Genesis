<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


	function P_LISTA_IPS_CONTRATO()
{
    require_once('../config/dbcon_prod.php');

	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_SEDE_PRESTACION(:v_pdocumento,
																						:v_pcontrato,
																						:v_pubicacion,
																						:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	} else {
		echo 0;
	}
	oci_close($c);
}
function P_LISTA_IPS_NOCONTRATADA()
{
    require_once('../config/dbcon_prod.php');

	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_SEDE_PRESTACION_CONTRATO(:v_pdocumento,
																						:v_pcontrato,
																						:v_pubicacion,
																						:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	} else {
		echo 0;
	}
	oci_close($c);
}



function P_GUARDAR_IPS_EN_CONTRATADA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_UI_SEDE_PRESTACION(:v_pdocumento,
																						:v_pcontrato,
																						:v_pubicacion,
																						:v_psede,
																						:v_nombre_sede,
																						:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_psede', $request->v_codigo_sede);
	oci_bind_by_name($consulta, ':v_nombre_sede', $request->v_nombre_sede);
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


	function P_OBTENER_IPS_CONTRATADO(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $keyword = $request->codigo;
		$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_IPS_CONTRATADO(:v_pcoincidencia,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcoincidencia',$keyword);
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
    function P_INSERTA_SERVICIO_CONTRATO()
{
	require_once('../config/dbcon_pru.php');
	global $request;
	$v_cntn_empresa=1;
	$v_cntn_numero=$request->v_pnumero;
	$v_cntn_ubicacion=$request->v_pubicacion;
	$v_cntc_documento=$request->v_pdocumento;



	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_SERVICIO_CONTRATO(:v_cntn_empresa,
																						:v_cntc_documento,
																						:v_cntn_numero,
																						:v_cntn_ubicacion,
																						:v_pdocumento,
																						:v_codigo_proceso,
																						:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_cntn_empresa', $v_cntn_empresa);
	oci_bind_by_name($consulta, ':v_cntc_documento', $v_cntc_documento);
	oci_bind_by_name($consulta, ':v_cntn_numero', $v_cntn_numero);
	oci_bind_by_name($consulta, ':v_cntn_ubicacion', $v_cntn_ubicacion);
	oci_bind_by_name($consulta, ':v_codigo_proceso', $request->v_codigo);
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
	function obtenerUbicaciones(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_UBICACIONES(:v_json_row); end;');
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
	function obtenerDocumentos(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_DOCUMENTOS(:v_json_row); end;');
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
	function obtenerConceptos(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_CONCEPTOS(:v_json_row); end;');
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
	function P_LISTA_MOTIVOS(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $v_pdocumento = $request->v_pdocumento;
	    $v_pconcepto = $request->v_pconcepto;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_MOTIVOS(:v_pdocumento,
																				:v_pconcepto,
																				:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
	    oci_bind_by_name($consulta,':v_pconcepto',$v_pconcepto);
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
	function P_LISTA_ASUNTOS(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $v_pdocumento = $request->v_pdocumento;
	    $v_pconcepto = $request->v_pconcepto;
	    $v_pmotivo = $request->v_pmotivo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_ASUNTOS(:v_pdocumento,
																				:v_pconcepto,
																				:v_pmotivo,
																				:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
	    oci_bind_by_name($consulta,':v_pconcepto',$v_pconcepto);
	    oci_bind_by_name($consulta,':v_pmotivo',$v_pmotivo);
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
	function P_LISTAR_ESTANDAR_CONTRATO(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $v_pdocumento = $request->v_pdocumento;
	    $v_pconcepto = $request->v_pconcepto;
	    $v_pmotivo = $request->v_pmotivo;
	    $v_pasunto = $request->v_pasunto;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_ESTANDAR_CONTRATO(:v_pdocumento,
																				:v_pconcepto,
																				:v_pmotivo,
																				:v_pasunto,
																				:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
	    oci_bind_by_name($consulta,':v_pconcepto',$v_pconcepto);
	    oci_bind_by_name($consulta,':v_pmotivo',$v_pmotivo);
	    oci_bind_by_name($consulta,':v_pasunto',$v_pasunto);
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

	function P_U_ESTANDAR_CONTRATO (){
		require_once('../config/dbcon_prod.php');
	    global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_U_ESTANDAR_CONTRATO (:V_PNUMERO,
																				:V_PUBICACION,
																				:V_PDOCUMENTO,
																				:V_PJSON_IN,
																				:V_PJSON_ROW); end;');
	    oci_bind_by_name($consulta,':V_PNUMERO',$request->numero);
	    oci_bind_by_name($consulta,':V_PUBICACION',$request->ubicacion);
	    oci_bind_by_name($consulta,':V_PDOCUMENTO',$request->documento);
	    oci_bind_by_name($consulta,':V_PJSON_IN',$request->datos);
	    $clob = oci_new_descriptor($c,OCI_D_LOB);
	    oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob,-1,OCI_B_CLOB);
	    oci_execute($consulta,OCI_DEFAULT);
	    if (isset($clob)) {
	      $json = $clob->read($clob->size());
	      echo $json;
	    }else{
	      echo 0;
	    }
	    oci_close($c);
	}


	function obtenerClases(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $concepto = $request->concepto;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_CLASES(:v_pconcepto,:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pconcepto',$concepto);
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
	function obtenerFormasPago(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_FORMAPAGO(:v_json_row); end;');
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
	function obtenerTarifas(){
		require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_TARIFAS(:v_json_row); end;');
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

function buscarContratos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	// $codigo = $request->codigo;
	$codigo = '';
	// $regimen = $request->regimen;
	$regimen = 'KS';
	// $estado = $request->estado;
	$estado = 'P';
	// $prestador = $request->prestador;
	$prestador = '900600256';
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_CONTRATOS(   :v_pnumero,
                                                                                        :v_pdocumento,
                                                                                        :v_pestado,
                                                                                        :v_pnit,
                                                                                        :v_json_row
                                                                                         ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $codigo);
	oci_bind_by_name($consulta, ':v_pdocumento', $regimen);
	oci_bind_by_name($consulta, ':v_pestado', $estado);
	oci_bind_by_name($consulta, ':v_pnit', $prestador);
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
	// function buscarContratos(){
	//     require_once('../config/dbcon_prod.php');
	//     global $request;
	//     $numero = $request->numero;
	//     $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_CONTRATOS(:v_pnumero,:v_json_row); end;');
	//     oci_bind_by_name($consulta,':v_pnumero',$numero);
	//     $clob = oci_new_descriptor($c,OCI_D_LOB);
	//     oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	//     oci_execute($consulta,OCI_DEFAULT);
	//     if (isset($clob)) {
	//       $json = $clob->read($clob->size());
	//       echo $json;
	//     }else{
	//       echo 0;
	//     }
	//     oci_close($c);
    // }
    function P_OBTENER_CONTRATO(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
	function p_lista_conceptos_mod()
	{
		require_once('../config/dbcon_prod.php');
		global $request;
		$documento = $request->documento;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_CONCEPTOS_MOD( :v_pdocumento,
																						:v_json_row); end;');
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
function P_LISTA_CLASE_MOD()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_CLASE_MOD( :v_json_row); end;');
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
function P_LISTA_FORMA_PAGO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_FORMA_PAGO( 	:v_json_row); end;');
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
function p_obtener_cobertura()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_COBERTURA( :vp_pcoincidencia,
																						:v_json_row); end;');
	oci_bind_by_name($consulta, ':vp_pcoincidencia', $documento);
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
function p_lista_ips()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_IPS( :vp_pcoincidencia,
																						:v_json_row); end;');
	oci_bind_by_name($consulta, ':vp_pcoincidencia', $documento);
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
function p_lista_servicios_habilitados()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$nit = $request->nit;
	$concepto = $request->concepto;
	$motivo = $request->motivo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.p_lista_servicios_habilitados( :v_ptercero,
																							:v_pconcepto,
																							:v_pmotivo,
																							:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $nit);
	oci_bind_by_name($consulta, ':v_pconcepto', $concepto);
	oci_bind_by_name($consulta, ':v_pmotivo', $motivo);
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
function P_LISTAR_TARIFA_BASE()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_TARIFA_BASE(:v_pjson_row ); end;');
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
function p_lista_tarifa()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_TARIFA( :vp_pcoincidencia,
																						:v_json_row); end;');
	oci_bind_by_name($consulta, ':vp_pcoincidencia', $documento);
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
function P_LISTA_SEDE_PRESTACION()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$ips = $request->ips;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_SEDE_PRESTACION( :v_ptercero,
																						:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $ips);
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
// inicio Control de Cambio Yordis Escorcia 28/02/2023
function P_VALIDARPRODUCTOS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_VALIDA_PRODUCTO(:v_pconcepto,:v_pmotivo,:v_pasunto,:v_pjson_servicio,:v_pcantidad_serv,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pconcepto',$request->v_pconcepto);
	oci_bind_by_name($consulta,':v_pmotivo',$request->v_pmotivo);
	oci_bind_by_name($consulta,':v_pasunto',$request->v_pasunto);
	oci_bind_by_name($consulta,':v_pjson_servicio',$request->v_pservicios);
	oci_bind_by_name($consulta,':v_pcantidad_serv',$request->v_pservicioscantidad);
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
function P_UI_TIPOSERVICIOS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.p_ui_tipo_servicio(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_servicio,:v_pcantidad_serv,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$request->v_pdocumento);
	oci_bind_by_name($consulta,':v_pnumero',$request->v_pnumero);
	oci_bind_by_name($consulta,':v_pubicacion',$request->v_pubicacion);
	oci_bind_by_name($consulta,':v_pjson_servicio',$request->v_pjson_servicio);
	oci_bind_by_name($consulta,':v_pcantidad_serv',$request->v_pcantidad_serv);
	oci_bind_by_name($consulta,':v_paccion',$request->v_paccion);
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
// fin Control de Cambio Yordis Escorcia 28/02/2023
function p_inserta_contrato()
{
	require_once('../config/dbcon_prod.php');
	$array = array();
	global $request;
	$v_pjson_contrato = $request->v_pjson_contrato;
	$v_pjson_servicio = $request->v_pjson_servicio;
	$v_pcantidad_serv = $request->v_pcantidad_serv;
	$v_pjson_sedes = $request->v_pjson_sedes;
	$v_pcantidad_sedes = $request->v_pcantidad_sedes;
	// --------------------------------------------------------------------------------
	if(!empty($request->v_archivo_diagnostico)){
		$datos = $request->v_archivo_diagnostico;
		$name = uniqid();
		$base_to_php = explode(',', $datos);
		$data = base64_decode($base_to_php[1]);
		$filepath = "../../temp/" . $name . ".txt";
		file_put_contents($filepath, $data);
		$ruta = "../../temp/" . $name . ".txt";
		$txt_file = fopen($ruta, 'r');
		$a = 1;
		while ($line = fgets($txt_file)) {
			array_push($array, $line);
			$a++;
		}
		fclose($txt_file);
		// unset($array[0]);
		$prueba = [];
		foreach($array as $fila_v) {
			// $columnas = explode("|", $fila_v);
			$datos2 = explode("\r\n", $fila_v);
			$object=(object) [
				'cod_dx' => $datos2[0],
				// 'nombre_diagnostico' => $columnas[0],
			];
			$prueba[]=$object;
		};
		$datos_entrada = json_encode($prueba);
		$cantidad_diagnosticos = count($prueba);
	} else {
		$datos_entrada = 0;
		$cantidad_diagnosticos = 0;
	}
// --------------------------------------------------------------------------------

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_CONTRATO( :v_pjson_contrato,
																				 :v_pjson_servicio,
																				 :v_pcantidad_serv,
																				 :v_pjson_sedes,
																				 :v_pcantidad_sedes,
																				 :v_pjson_diagnosticos,
																				 :v_pcantidad_dx,
																				 :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pjson_contrato', $v_pjson_contrato);
	oci_bind_by_name($consulta, ':v_pjson_servicio', $v_pjson_servicio);
	oci_bind_by_name($consulta, ':v_pcantidad_serv', $v_pcantidad_serv);
	oci_bind_by_name($consulta, ':v_pjson_sedes', $v_pjson_sedes);
	oci_bind_by_name($consulta, ':v_pcantidad_sedes', $v_pcantidad_sedes);
	oci_bind_by_name($consulta, ':v_pjson_diagnosticos', $datos_entrada);
	oci_bind_by_name($consulta, ':v_pcantidad_dx', $cantidad_diagnosticos);
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
    function P_OBTENER_SERVICIOS_CONTRATO(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_SERVICIOS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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

	// inicio Control de Cambio Yordis Escorcia 28/02/2023
    function P_OBTENER_SERVICIOS_SELECCIONADOS_CONTRATO(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.p_lista_tipo_servicio_contrate(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
        oci_bind_by_name($consulta,':v_pnumero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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
	// fin Control de Cambio Yordis Escorcia 28/02/2023
    function obtenerProductosServicioContrato(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
        $servicio = $request->servicio;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pservicio,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        oci_bind_by_name($consulta,':v_pservicio',$servicio);
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

    function obtenerModificacionesContrato(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_MODIFICACIONES_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
    function obtenerTareasContrato(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$numero = $request->numero;
		$ubicacion = $request->ubicacion;
		$documento = $request->documento;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_TAREA_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
		oci_bind_by_name($consulta, ':v_pnumero', $numero);
		oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
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
	function P_LISTA_POLIZAS(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa = '1';
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_POLIZAS(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pjson_out); end;');
		oci_bind_by_name($consulta, ':v_pempresa', $empresa);
		oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
		oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
		oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
	}
	function P_UI_POLIZA(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$empresa = '1';
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_UI_POLIZA(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ppoliza,:v_pcubrimiento,
		:v_pvalor_poliza,:v_pvalor_asegurado,:v_pexpedicion,:v_pfvencimiento,:v_pnumpoliza,:v_ptercero,:v_paccion,:v_pjson_out); end;');
		oci_bind_by_name($consulta, ':v_pempresa', $empresa);
		oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
		oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
		oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
		oci_bind_by_name($consulta, ':v_ppoliza', $request->Poliza);
		oci_bind_by_name($consulta, ':v_pcubrimiento', $request->Cubrimiento);
		oci_bind_by_name($consulta, ':v_pvalor_poliza', $request->Valor_Poliza);
		oci_bind_by_name($consulta, ':v_pvalor_asegurado', $request->Valor_Asegurado);
		oci_bind_by_name($consulta, ':v_pexpedicion', $request->Fecha_Expedicion);
		oci_bind_by_name($consulta, ':v_pfvencimiento', $request->Fecha_Vencimiento);
		oci_bind_by_name($consulta, ':v_pnumpoliza', $request->Numero_Poliza);
		oci_bind_by_name($consulta, ':v_ptercero', $request->Tercero);
		oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
	}
	function P_OBTENER_IPS(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_IPS(:v_ptercero,:v_pjson_row); end;');
		oci_bind_by_name($consulta, ':v_ptercero', $request->Coinc);
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


	function SP_OBTENER_ESTANDAR_CONTRATO(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_ESTANDAR_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
    function obtenerPolizasContrato(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_POLIZAS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
    function obtenerDatosPgp(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $v_pdocumento = $request->v_pdocumento;
        $v_pcontrato = $request->v_pcontrato;
        $v_pubicacion = $request->v_pubicacion;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_INFORMACON_PGP(:v_pdocumento,:v_pcontrato,:v_pubicacion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pdocumento',$v_pdocumento);
        oci_bind_by_name($consulta,':v_pcontrato',$v_pcontrato);
        oci_bind_by_name($consulta,':v_pubicacion',$v_pubicacion);
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
    function obtenerDepartamentosContrato(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_DEPARTAMENTO_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
    function obtenerMunicipiosContratoDepartamento(){
	    require_once('../config/dbcon_prod.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
        $departamento = $request->departamento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_MUNICIPIOS_CONTRATO_DEPARTAMENTO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pdepartamento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        oci_bind_by_name($consulta,':v_pdepartamento',$departamento);
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

	function P_CONFIRMA_CNC_SAL_GEN(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$empresa = 1;
	$numero = $request->numero;
	$ubicacion = $request->ubicacion;
	$documento = $request->documento;
	$operacion = $request->operacion;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_CONFIRMA_CNC_SAL_GEN(:v_pempresa,
																						:v_pdocumento,
																						:v_pnumero,
																						:v_pubicacion,
																						:v_poperacion,
																						:v_json_row);
																						end;');
	oci_bind_by_name($consulta, ':v_pempresa', $empresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pnumero', $numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_poperacion', $operacion);
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

function subir_adjuntos()
{
	require_once('../config/dbcon.php');
	require_once('../config/ftpcon.php');
	include('../movilidad/subir_archivo.php');
	global $request;
	// variables de parametros
	$path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/contratos/contratos_fisicos/';
	$archivo_base =	$request->achivobase;
	$ext =	$request->ext;
	$nombre =	$request->nombre;
	// otras variables
	$hoy = date('Y_m_d');
	$hora = date('h_i_s');
	$name =  $nombre .'_' . $hoy.'__'.$hora;;
	$subio = subirFTP($archivo_base, $path, $name, $ext);
	$rutas = $subio;
	echo $rutas;
}




function P_ACTUALIZA_SERVICIOS()
{


	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pempresa =intval($request->v_pempresa);
	$v_pdocumento = $request->v_pdocumento;
	$v_pnumero = $request->v_pnumero;
	$v_pubicacion = $request->V_ubicacion;
	$v_prenglon = $request->v_prenglon;
	$v_pservicio = $request->v_pservicio;
	$v_ptarifa = intval ($request->v_ptarifa);
	$v_psuma = $request->v_psuma;
	$v_pporcentaje = $request->v_pporcentaje;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ACTUALIZA_SERVICIOS(:v_pempresa,
																					:v_pdocumento,
																					:v_pnumero,
																					:v_pubicacion,
																					:v_prenglon,
																					:v_pservicio,
																					:v_ptarifa,
																					:v_psuma,
																					:v_pporcentaje,
																					:v_json_row);
																						end;');
	oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_prenglon', $v_prenglon);
	oci_bind_by_name($consulta, ':v_pservicio', $v_pservicio);
	oci_bind_by_name($consulta, ':v_ptarifa', $v_ptarifa);
	oci_bind_by_name($consulta, ':v_psuma', $v_psuma);
	oci_bind_by_name($consulta, ':v_pporcentaje', $v_pporcentaje);
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

function P_ACTUALIZA_PRODUCTOS()
{


	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pempresa = intval($request->v_pempresa);
	$v_pdocumento = $request->v_pdocumento;
	$v_pnumero = $request->v_pnumero;
	$v_pubicacion = $request->V_ubicacion;
	$v_prenglon = $request->v_prenglon;
	$v_pservicio = $request->v_pservicio;
	$v_pproducto = $request->v_pproducto;
	$v_ptarifa = intval($request->v_ptarifa);
	$v_psuma = $request->v_psuma;
	$v_pporcentaje = $request->v_pporcentaje;
	$v_pvalor = $request->v_pvalor;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ACTUALIZA_PRODUCTOS(:v_pempresa,
																					:v_pdocumento,
																					:v_pnumero,
																					:v_pubicacion,
																					:v_prenglon,
																					:v_pproducto,
																					:v_ptarifa,
																					:v_psuma,
																					:v_pporcentaje,
																					:v_pvalor,
																					:v_json_row);
																						end;');
	oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_prenglon', $v_prenglon);
	oci_bind_by_name($consulta, ':v_pproducto', $v_pproducto);
	oci_bind_by_name($consulta, ':v_ptarifa', $v_ptarifa);
	oci_bind_by_name($consulta, ':v_psuma', $v_psuma);
	oci_bind_by_name($consulta, ':v_pporcentaje', $v_pporcentaje);
	oci_bind_by_name($consulta, ':v_pvalor', $v_pvalor);
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

function P_OBTENER_SUBCATEGORIAS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pcodigo  = $request->v_pcodigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_SUBCATEGORIAS(:v_pcodigo ,
																						:v_json_row);
																						end;');
	oci_bind_by_name($consulta, ':v_pcodigo', $v_pcodigo);
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
function P_LISTA_ROL_ONCOLOGICO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_ROL_ONCOLOGICO(:v_json_row);
																						end;');

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
function f_dias360(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pinicial  = $request->f_inicial;
	$v_pfinal  = $request->f_final;
	$v_pregla  = 'F';
	$consulta = oci_parse($c, 'select f_dias360	(:v_pinicial,
													:v_pfinal,
													:v_pregla) as resultado FROM DUAL');
	oci_bind_by_name($consulta, ':v_pinicial', $v_pinicial);
	oci_bind_by_name($consulta, ':v_pfinal', $v_pfinal);
	oci_bind_by_name($consulta, ':v_pregla', $v_pregla);
	// $clob = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta, ':result', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	$rows = array();while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	// if (isset($clob)) {
	// 	$json = $clob->read($clob->size());
	// 	echo $json;
	// } else {
	// 	echo 1;
	// }
	echo json_encode($rows[0], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
// cosa esa nueva
function P_UI_INSERTA_DATOS_NOTIFICACION()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnit  = '900465319';
	$v_pproceso  = $request->v_pproceso;
	$v_pemail  = $request->v_pemail;
	$v_presponsable  = '1143163517';
	$consulta = oci_parse($c, 'BEGIN pq_suficiencia.P_UI_INSERTA_DATOS_NOTIFICACION(:v_pnit,
																						:v_pproceso,
																						:v_pemail,
																						:v_presponsable,
																						:v_pjson_out);
																						end;');
	oci_bind_by_name($consulta, ':v_pnit', $v_pnit);
	oci_bind_by_name($consulta, ':v_pproceso', $v_pproceso);
	oci_bind_by_name($consulta, ':v_pemail', $v_pemail);
	oci_bind_by_name($consulta, ':v_presponsable', $v_presponsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 1;
	}
	oci_close($c);
}

function P_LISTA_NOTIFICACIONES()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnit  = '900465319';
	$consulta = oci_parse($c, 'BEGIN pq_suficiencia.P_LISTA_NOTIFICACIONES(	:v_pnit,
																			:v_pjson_out);
																			end;');
	oci_bind_by_name($consulta, ':v_pnit', $v_pnit);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 1;
	}
	oci_close($c);
}
function p_lista_archivo_insertar()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.p_lista_archivo_insertar( :v_ptercero,
																						:v_pregimen,
																						:v_pconcepto,
																						:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptercero', $request->v_ptercero);
	oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->v_pconcepto);
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
function p_obtener_adjunto_contrato(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$empresa = 1;
	$numero = $request->v_pnumero;
	$ubicacion = $request->v_pubicacion;
	$documento = $request->v_pdocumento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_ADJUNTO_CONTRATO(:v_pempresa,
																						:v_pdocumento,
																						:v_pnumero,
																						:v_pubicacion,
																						:v_json_row);
																						end;');
	oci_bind_by_name($consulta, ':v_pempresa', $empresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pnumero', $numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
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
function P_OBTENER_TIPO_ADJUNTO(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->v_pdocumento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_TIPO_ADJUNTO(:v_pdocumento,
																					:v_json_row);
																						end;');

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

function P_INSERTA_ADJUNTO_CONTRATO()
{
	require_once('../config/ftpcon.php');
	include('../movilidad/subir_archivo.php');
	global $request;
	// variables de parametros

	$path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/contratos/contratos_fisicos/' ;

	$archivo_base =	$request->archivo;
	$ext =	$request->ext;
	$ahora = DateTime::createFromFormat('U.u', number_format(microtime(true), 6, '.', ''));
    $nombre =  $ahora->format("YmdHisu");

	$subio = subirFTP($archivo_base, $path, $nombre, $ext);

	if ($subio != '0 - Error') {
		$adjunto=json_decode($request->v_pjson_adjuntos) ;
		$adjunto[0]->RUTA=$subio;
		$adjunto=json_encode($adjunto);
		// echo $adjunto;
		require_once('../config/dbcon_prod.php');
		$numero=intval($request->v_pnumero);
		$v_pcantidad_serv=1;
		$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_ADJUNTO_CONTRATO(:v_pempresa,
																							:v_pdocumento,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_presponsable,
																							:v_pjson_adjuntos,
																							:v_pcantidad_serv,
																							:v_json_row
																							); end;');
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pempresa', $request->v_pempresa);
		oci_bind_by_name($consulta, ':v_pdocumento',  $request->v_pdocumento);
		oci_bind_by_name($consulta, ':v_pnumero',  $numero);
		oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
		oci_bind_by_name($consulta, ':v_presponsable', $request->v_presponsable);
		oci_bind_by_name($consulta, ':v_pjson_adjuntos', $adjunto);
		oci_bind_by_name($consulta, ':v_pcantidad_serv', $v_pcantidad_serv);
		oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo '[{"Codigo":1,"Nombre":"Error en la peticion"}]';
		}
		oci_close($c);
	}else{
		echo '[{"Codigo":1,"Nombre":"Archivo cargado con Errores, Favor intente nuevamente"}]';
	}
}

function P_OBTENER_ANEXO_3()
{
	require_once('../config/dbcon_prod.php');

	global $request;

	$numero = $request->numero;
	$ubicacion = $request->ubicacion;
	$documento = $request->documento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_ANEXO_3(			:v_pnumero,
																						:v_pubicacion,
																						:v_pdocumento,
																						:v_json_row);
																						end;');

	oci_bind_by_name($consulta, ':v_pnumero', $numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
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

function cambiarsupervisor()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_CONTRATACION.P_U_SUPERVISOR(:v_pdocumento,
																						:v_pcontrato,
																						:v_pubicacion,
																						:v_psupervisor,
																						:v_json_row);
																						end;');

	oci_bind_by_name($consulta, ':v_pdocumento', $request->tipodocumentocontrato);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->numerocontrato);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_psupervisor', $request->numerodocumento);
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




function P_LISTA_TIPOS_ADJUNTOS(){
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_LISTA_TIPOS_ADJUNTOS(:v_pminuta,:v_presponse); end;');
  oci_bind_by_name($consulta,':v_pminuta',$request->minuta);
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

function P_LISTA_SOPORTES_CONTRATOS_EPS(){
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_LISTA_SOPORTES_CONTRATOS_EPS(:v_pnit,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_presponse); end;');
  oci_bind_by_name($consulta,':v_pnit',$request->nit);
  oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
  oci_bind_by_name($consulta,':v_pnumero',$request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
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

function P_LISTA_SOPORTES_CONTRATOS_IPS(){
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_LISTA_SOPORTES_CONTRATOS_IPS(:v_pnit,:v_presponse); end;');
  oci_bind_by_name($consulta,':v_pnit',$request->nit);
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

function P_LISTA_SOPORTES_CONTRATOS_DETALLE(){
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTR.P_LISTA_SOPORTES_CONTRATOS_DETALLE(:v_pnit,:v_prenglon,:v_presponse); end;');
  oci_bind_by_name($consulta,':v_pnit',$request->nit);
  oci_bind_by_name($consulta,':v_prenglon',$request->renglon);
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



function P_INSERTAR_SOPORTE_CONTRATO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTR.P_INSERTAR_SOPORTE_CONTRATO(:v_json_in,:v_cantidad,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_json_in', $request->datos);
  oci_bind_by_name($consulta, ':v_cantidad', $request->cantidad);
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

function cargarSoporteAdjuntoEnv()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Contratacion/Soportes';
  if(isset($request->ruta)){
    $x_ruta = explode('/', $request->ruta);
    $name = $x_ruta[count($x_ruta)-1];
  }else{
    $path = $path.'/'.$request->carpeta;
    $hoy = date('dmY_His');
    $name = $request->name .  '_' . $hoy .'.'.$request->ext;
  }
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function P_U_SOPORTE_CONTRATO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTR.P_U_SOPORTE_CONTRATO(:v_json_in,:v_cantidad,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_json_in', $request->datos);
  oci_bind_by_name($consulta, ':v_cantidad', $request->cantidad);
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

function P_VALIDA_PENDIENTE_SOPORTE()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTR.P_VALIDA_PENDIENTE_SOPORTE(:v_nit,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_nit', $request->nit);
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
