<?php
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function(); 

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
    function P_LISTA_CONTRATO(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta =  oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_CONTRATO(  :v_pnumero,
                                                                                    :v_pdocumento,
                                                                                    :v_pdepartamento,
                                                                                    :v_pmunicipio,
                                                                                    :v_pnit,
                                                                                    :v_json_row
                                                                                ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pnumero',$request->codigo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->codigo);
		oci_bind_by_name($consulta,':v_pdepartamento',$request->codigo);
		oci_bind_by_name($consulta,':v_pmunicipio',$request->codigo);
		oci_bind_by_name($consulta,':v_pnit',$request->codigo);
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

function p_lista_bitacora()
{
	require_once('../config/dbcon_prod.php');
	global $param;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_BITACORA( :v_json_row); end;');
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
function p_inserta_bitacora()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_BITACORA(  	:v_pdocumento,
																			:v_pcontrato,
																			:v_pubicacion,
																			:v_pcodigo,
																			:v_presponsable,
																			:v_pobservacion,
																			:v_pjson_out
                                                                        ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->v_pcontrato);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pcodigo', $request->v_pcodigo);
	oci_bind_by_name($consulta, ':v_presponsable', $request->v_presponsable);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
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
function P_LISTA_PRODUCTO_CONTRATO()
{
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_pnumero=$request->v_pnumero;
	$v_pubicacion=$request->v_pubicacion;
	$v_pdocumento=$request->v_pdocumento;
	$v_pcoincidencia=$request->v_pcoincidencia;
	// $v_pnumero = 7398;
	// $v_pubicacion = 13000;
	// $v_pdocumento = 'KS';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_PRODUCTO_CONTRATO(:v_pnumero,
																						:v_pubicacion,
																						:v_pdocumento,
																						:v_pcoincidencia,
																						:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $v_pcoincidencia);
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


function P_BUSCAR_PRODUCTO_CONTRATO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero=$request->v_pnumero;
	$v_pubicacion=$request->v_pubicacion;
	$v_pdocumento=$request->v_pdocumento;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_PRODUCTO_CONTRATO(:v_pnumero,
																						:v_pubicacion,
																						:v_pdocumento,
																						:v_pcoincidencia,
																						:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coincidencia);
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

function P_LISTAR_ARCHIVO_ADICION()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero=$request->v_pnumero;
	$v_pubicacion=$request->v_pubicacion;
	$v_pdocumento=$request->v_pdocumento;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_ARCHIVO_ADICION (:v_pdocumento,
																						:v_pnumero,
																						:v_pubicacion,
																						:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
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
function P_LISTA_SERV_HABILITADOS_VAL_ADICION()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero=$request->v_pnumero;
	$v_pubicacion=$request->v_pubicacion;
	$v_pdocumento=$request->v_pdocumento;
	$v_ptercero=$request->v_ptercero;

																									
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_SERV_HABILITADOS_VAL_ADICION(	:v_ptercero,
																									:v_pnumero,
																									:v_pubicacion,
																									:v_pdocumento,
																									:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
	oci_bind_by_name($consulta, ':v_ptercero', $v_ptercero);
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
function P_UI_PRODUCTOS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$v_pnumero=$request->v_pnumero;
	$v_pubicacion=$request->v_pubicacion;
	$v_pdocumento=$request->v_pdocumento;
	// $v_pnumero = 7398;
	// $v_pubicacion = 13000;
	// $v_pdocumento = 'KS';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_UI_PRODUCTOS(	:v_pjson_productos,
																				:v_cantidad_productos,
																				:v_pobservacion,
																				:v_pdocumento,
																				:v_pnumero,
																				:v_pubicacion,
																				:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_productos', $request->v_pjson_productos);
	oci_bind_by_name($consulta, ':v_cantidad_productos', $request->v_cantidad_productos);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $v_pubicacion);
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
//validacion precontractual
function P_I_INSERTAR_PRODUCTO()
{
	require_once('../config/ftpcon.php');
	include('../movilidad/subir_archivo.php');
	global $request;
	// variables de parametros
	$v_panno =	$request->v_panno;
	$v_pperiodo =	$request->v_pperiodo;
	$v_ptercero=$request->v_ptercero;
	$v_pregimen=$request->v_pregimen;
	$path = '/cargue_ftp/Digitalizacion/Genesis/Contratacion/productos/' . $v_panno . '/' . $v_pperiodo . '/' . $v_ptercero . '/'. $v_pregimen.	'/' . $v_panno.$v_pperiodo.'/' ;

	$archivo_base =	$request->archivo;
	$ext =	'txt';
	$nombre =	$v_panno.$v_pperiodo.$v_ptercero;
	
	$subio = subirFTP($archivo_base, $path, $nombre, $ext);

	if ($subio != '0 - Error') {
		require_once('../config/dbcon_prod.php');
		$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_I_INSERTAR_PRODUCTO( 	:v_panno,
																							:v_pperiodo,
																							:v_ptercero,
																							:v_pubi_prestacion,
																							:v_pcant_ubic_prestacion,
																							:v_pclasificacion,
																							:v_pcant_clasificacion,
																							:v_pregimen,
																							:v_ptarifa,
																							:v_poperador,
																							:v_pporcentaje,
																							:v_paccion,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_pdocumento,
																							:v_json_row
																						); end;');
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_panno', $v_panno);
		oci_bind_by_name($consulta, ':v_pperiodo', $v_pperiodo);
		oci_bind_by_name($consulta, ':v_ptercero', $v_ptercero);
		oci_bind_by_name($consulta, ':v_pubi_prestacion', $request->v_pubi_prestacion);
		oci_bind_by_name($consulta, ':v_pcant_ubic_prestacion', $request->v_pcant_ubic_prestacion );
		oci_bind_by_name($consulta, ':v_pclasificacion', $request->v_pclasificacion);
		oci_bind_by_name($consulta, ':v_pcant_clasificacion', $request->v_pcant_clasificacion );
		oci_bind_by_name($consulta, ':v_pregimen', $request->v_pregimen);
		oci_bind_by_name($consulta, ':v_ptarifa', $request->v_ptarifa);
		oci_bind_by_name($consulta, ':v_poperador', $request->v_poperador);
		oci_bind_by_name($consulta, ':v_pporcentaje', $request->v_pporcentaje);
		oci_bind_by_name($consulta, ':v_paccion', $request->v_pobjeto);
		oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
		oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
		oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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
function P_LISTA_ERRORES_PRODUCTO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_ERRORES_PRODUCTO(:v_pcodigo_proceso,
																					  :v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcodigo_proceso', $request->v_pcodigo_proceso);
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
function P_LISTAR_ARCHIVO_VALIDADO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_ARCHIVO_VALIDADO(	:v_pjson_row ); end;');
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
function P_LISTAR_PRODUC_VALIDADO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTAR_PRODUC_VALIDADO( :v_pnumero,
																			  :v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pcodigo_proceso);
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
function P_OBTENER_UBIC_PRESTACION()
{
require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_UBIC_PRESTACION( :v_ptercero,
																			  :v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptercero', $request->v_ptercero);
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
function p_lista_serv_habilitados_val()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_SERV_HABILITADOS_VAL( :v_ptercero,
																			  :v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptercero', $request->v_ptercero);
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
function P_OBTENER_IPS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_IPS( :v_ptercero,
																	:v_pjson_row ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptercero', $request->codigo);
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
function P_INSERTA_SERVICIO_CONTRATO()
{
	require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_cntn_empresa=1;
	$v_cntn_numero=$request->v_pnumero;
	$v_cntn_ubicacion=$request->v_pubicacion;
	$v_cntc_documento=$request->v_pdocumento;
	


	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_SERVICIO_CONTRATO(:v_cntn_empresa,
																						:v_cntc_documento,
																						:v_cntn_numero,
																						:v_cntn_ubicacion,
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

function P_LISTA_ADM_ACCIONES(){
    require_once('../config/dbcon_prod.php');
	 
	global $request;
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_ADM_ACCIONES(:v_json_row); end;');
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
function P_ADMIN_ACCIONES_CONTRATO()
{
    require_once('../config/dbcon_prod.php');
	 

	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ADMIN_ACCIONES_CONTRATO( :v_pfuncionario,
																						:v_pcrear,
																						:v_pprocesar,
																						:v_panular,
																						:v_pterminar,
																						:v_pliquidar,
																						:v_pprocesar_exp,   
																						:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pfuncionario', $request->v_pfuncionario);
	oci_bind_by_name($consulta, ':v_pcrear', $request->v_pcrear);
	oci_bind_by_name($consulta, ':v_pprocesar', $request->v_pprocesar);
	oci_bind_by_name($consulta, ':v_panular', $request->v_panular);
	oci_bind_by_name($consulta, ':v_pterminar', $request->v_pterminar);
	oci_bind_by_name($consulta, ':v_pliquidar', $request->v_pliquidar);
	oci_bind_by_name($consulta, ':v_pprocesar_exp', $request->v_pprocesar_exp);
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


// nuevoa]]
function P_LISTA_CAUSAL_TERMINACION(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_paccion = $request->v_paccion;
	$v_ptipo_terminacion = $request->v_ptipo_terminacion;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_CAUSAL_TERMINACION(:v_paccion,
																						:v_ptipo_terminacion,
																						:v_json_row); 
																						end;');
	
	oci_bind_by_name($consulta, ':v_paccion', $v_paccion);
	oci_bind_by_name($consulta, ':v_ptipo_terminacion', $v_ptipo_terminacion);
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
// nuevoa]]
function P_MODIFICACION_ESTADO_CONTRATO(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_MODIFICACION_ESTADO_CONTRATO(:v_pempresa,
																							:v_pdocumento,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_pobservacion,
																							:v_paccion,
																							:v_ptipo_terminacion,
																							:v_pfechafin,
																							:v_paccionante,
																							:v_pcausal,
																							:v_json_row); 
																							end;');
	

	oci_bind_by_name($consulta, ':v_pempresa', $request->v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->v_paccion);
	oci_bind_by_name($consulta, ':v_ptipo_terminacion', $request->v_ptipo_terminacion);
	oci_bind_by_name($consulta, ':v_pfechafin', $request->v_pfechafin);
	oci_bind_by_name($consulta, ':v_paccionante', $request->v_paccionante);
	oci_bind_by_name($consulta, ':v_pcausal', $request->v_pcausal);
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
function P_ACTUALIZA_FECHA_CONTRATO(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_pempresa=1;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ACTUALIZA_FECHA_CONTRATO(:v_pempresa,
																							:v_pdocumento,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_pobservacion,
																							:v_pfechainicio,
																							:v_pfechafin,
																							:v_json_row); 
																							end;');
	

	oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
	oci_bind_by_name($consulta, ':v_pfechainicio', $request->v_pfechainicio);
	oci_bind_by_name($consulta, ':v_pfechafin', $request->v_pfechafin);
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
function P_ACTUALIZA_FECHA_SUSCRIPCION(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_pempresa=1;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ACTUALIZA_FECHA_SUSCRIPCION(:v_pempresa,
																							:v_pdocumento,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_pfecha,
																							:v_json_row); 
																							end;');
	

	oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pfecha', $request->v_pfecha);
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
function P_ACTUALIZA_MARCA_PRORROGA(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_pempresa=1;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_ACTUALIZA_MARCA_PRORROGA(:v_pempresa,
																							:v_pdocumento,
																							:v_pnumero,
																							:v_pubicacion,
																							:v_pmarca,
																							:v_pobservacion,
																							:v_json_row); 
																							end;');
	

	oci_bind_by_name($consulta, ':v_pempresa', $v_pempresa);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pmarca', $request->v_pmarca);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
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
function P_UI_PRODUCTOS_VAL(){
    require_once('../config/dbcon_prod.php');
	
	global $request;
	$v_pempresa=1;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_UI_PRODUCTOS_VAL(:v_pnumero,
																				:v_pubicacion,
																				:v_pdocumento,
																				:v_pcodigo_proceso,
																				:v_pobservacion,
																				:v_json_row); 
																				end;');
	



	oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
	oci_bind_by_name($consulta, ':v_pcodigo_proceso', $request->v_pcodigo_proceso);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->v_pobservacion);
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

?>

