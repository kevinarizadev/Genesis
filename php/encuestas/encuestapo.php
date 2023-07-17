<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function P_INS_PROBLEMA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ARPR.p_ins_problema(:v_pdescripcion,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdescripcion', $request->Desc);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Resp);
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

function P_INS_CAUSAEFECTO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ARPR.p_ins_causaefecto(:v_pdescripcion,:v_ptitulo,:v_pidproblema,:v_ptipo,:v_pobjetivo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdescripcion', $request->Desc);
	oci_bind_by_name($consulta, ':v_ptitulo', $request->Tit);
	oci_bind_by_name($consulta, ':v_pidproblema', $request->Idprob);
	oci_bind_by_name($consulta, ':v_ptipo', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pobjetivo', $request->Obj);
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

function P_INS_CAUSAEFECTODETA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ARPR.p_ins_causaefectodeta(:v_pdescripcion,:v_ptitulo,:v_pidcausaefecto,:v_pidproblema,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdescripcion', $request->Desc);
	oci_bind_by_name($consulta, ':v_ptitulo', $request->Tit);
	oci_bind_by_name($consulta, ':v_pidcausaefecto', $request->Idcausaefecto);
	oci_bind_by_name($consulta, ':v_pidproblema', $request->Idprob);
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


// PROCEDURE p_ins_problema(v_pdescripcion in varchar2 DEFAULT NULL,
//                          v_presponsable in number DEFAULT NULL,
//                          v_json_row     out clob);
                         
// PROCEDURE p_ins_causaefecto(v_pdescripcion in varchar2 DEFAULT NULL,
//                             v_pidproblema in number,
//                             v_ptipo in varchar2,
//                             v_pobjetivo in number,
//                             v_json_row     out clob);
                            
// PROCEDURE p_ins_causaefectodeta(v_pdescripcion in varchar2 DEFAULT NULL,
//                             v_pidcausaefecto in number,
//                             v_pidproblema in number,
//                             v_json_row     out clob);