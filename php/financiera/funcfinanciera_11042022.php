<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenerdocumento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS.P_OBTENER_DOCUMENTO(:v_pjson_row); end;');
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

function obtenerconcepto()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = $request->documento; 
	// print_r($request);//para ver lo que esta cargando el documento
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS.P_OBTENER_CONCEPTO(:v_pdocumento, :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
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



function cargaannos()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo order by 1 desc");
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function cargaciclos()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT distinct cicc_tipo IDE, case when cicc_tipo = 'M' then 'MENSUAL'
											                                when cicc_tipo = 'T' then 'TRIMESTRAL'
											                                when cicc_tipo = 'S' then 'SEMESTRAL'
											                                when cicc_tipo = 'A' then 'ANUAL' end AS NOMBRE
											from bcic_ciclo
											where cicn_anno = :v_anno");
	//and cicc_tipo = 'M'");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function cargatrimestre()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT distinct cicn_numero
															from bcic_ciclo
															where cicn_anno = :v_anno
															and cicc_tipo = 'T'");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}

function cargaperiodos()
{
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT pern_numero IDE, perf_inicial, perf_final,
		case when pern_numero = 1 then 'ENERO'
			  when pern_numero = 2 then 'FEBRERO'
			  when pern_numero = 3 then 'MARZO'
			  when pern_numero = 4 then 'ABRIL'
			  when pern_numero = 5 then 'MAYO'
			  when pern_numero = 6 then 'JUNIO'
			  when pern_numero = 7 then 'JULIO'
			  when pern_numero = 8 then 'AGOSTO'
			  when pern_numero = 9 then 'SEPTIEMBRE'
			  when pern_numero = 10 then 'OCTUBRE'
			  when pern_numero = 11 then 'NOVIEMBRE'
			  when pern_numero = 12 then 'DICIEMBRE'
end as NOMBRE
from bper_periodo
where pern_anno = :v_anno
and pern_numero not in (0,99) order by perf_final asc");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
