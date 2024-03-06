<?php
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function P_BUSCAR_CONTRATOS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_OTROSI.P_BUSCAR_CONTRATOS(   :v_pnumero,
                                                                                        :v_pdocumento,
                                                                                        :v_pestado,
                                                                                        :v_pnit,
                                                                                        :v_json_row
                                                                                         ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->codigo);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->regimen);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
	oci_bind_by_name($consulta, ':v_pnit', $request->prestador);
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
	function P_OBTENER_MODIFICACIONES_CONTRATO(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_OTROSI.P_OBTENER_MODIFICACIONES_CONTRATO(:v_pnumero,
																						:v_pubicacion,
																						:v_pdocumento,
																						:v_json_row
                                                                                         ); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
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

function p_lista_bitacora()
{
	require_once('../config/dbcon_prod.php');
	global $param;
	$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_OTROSI.P_LISTA_BITACORA( :v_json_row); end;');
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

function obtenerTareasContrato(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$numero = $request->numero;
	$ubicacion = $request->ubicacion;
	$documento = $request->documento;
	$otrosi = $request->idotrosi;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_OTROSI.P_LISTAR_TAREA_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_potrosi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $numero);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_potrosi', $otrosi);
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

function p_inserta_bitacora(){
require_once('../config/dbcon_prod.php');
global $request;
$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_OTROSI.P_INSERTA_BITACORA(:V_PDOCUMENTO,
																					:V_PCONTRATO,
																					:V_PUBICACION,
																					:V_POTROSI,
																					:V_PCODIGO,
																					:V_PRESPONSABLE,
																					:V_POBSERVACION,
																					:V_PJSON_OUT
																					 ); end;');
$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':V_PDOCUMENTO', $request->v_pdocumento);
oci_bind_by_name($consulta, ':V_PCONTRATO', $request->v_pcontrato);
oci_bind_by_name($consulta, ':V_PUBICACION', $request->v_pubicacion);
oci_bind_by_name($consulta, ':V_POTROSI', $request->v_otrosi);
oci_bind_by_name($consulta, ':V_PCODIGO', $request->v_pcodigo);
oci_bind_by_name($consulta, ':V_PRESPONSABLE', $request->v_presponsable);
oci_bind_by_name($consulta, ':V_POBSERVACION', $request->v_pobservacion);
oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
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