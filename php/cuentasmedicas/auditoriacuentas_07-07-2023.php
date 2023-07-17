<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
	require_once('../config/ftpcon.php');
	global $request;
	$file_size = ftp_size($con_id, $request->ruta);
	if ($file_size != -1) {
		$name = uniqid();
		$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../temp/' . $name;
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
}

function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
}

function Obt_Cargo()
{
	echo ($_SESSION["rolcod"]);
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
}

function Obt_Control()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_USUARIO(:V_PCEDULA,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function List_Ambitos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_AMBITO_FACTURAS(:v_json_row); end;');
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

function List_MotivoRecobro()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_MOTIVO_RECOBRO(:v_json_row); end;');
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

function List_TipoFacturas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_TIPO_FACTURAS(:v_json_row); end;');
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

function List_TipoGlosas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_TIPO_GLOSA(:v_json_row); end;');
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
function List_ConceptoFacturas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_CONCEPTOS_RECOBRO(:v_json_row); end;');
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


function List_Productos_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_FACTURA_PRODUCTOS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->Nit);
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

function Vista2_List_Facturas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_FACTURA(:v_nit,:v_recibo,:v_tipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_nit', $request->Nit);
	oci_bind_by_name($consulta, ':v_recibo', $request->Recibo);
	oci_bind_by_name($consulta, ':v_tipo', $request->Tipo);
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

function Obt_Diagnostico()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcie10', $request->Conc);
	oci_bind_by_name($consulta, ':v_psexo', $request->Sexo);
	oci_bind_by_name($consulta, ':v_pedad', $request->Edad);
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

function Factura_Gestion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$datos = $request->datos;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_U_FACTURAS(:v_pnumero,:v_pubicacion,:v_pfinicial,:v_pffinal,:v_pdocumento,:v_pambito,:v_pdiagnostico,
	:v_pregimen,:v_ptipofact,:v_paltocosto,:v_pcopago,:v_pjson_glosa,:v_pcant_glosa,
	:v_pobservacion_glosa,:v_pconcepto,:v_pfechapss,:v_pno_copago,:v_json_row); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Num);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubi);
	oci_bind_by_name($consulta, ':v_pfinicial', $request->F_Inicio);
	oci_bind_by_name($consulta, ':v_pffinal', $request->F_Final);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pambito', $request->Ambito);
	oci_bind_by_name($consulta, ':v_pdiagnostico', $request->Diag);
	oci_bind_by_name($consulta, ':v_pregimen', $request->Regimen);
	oci_bind_by_name($consulta, ':v_ptipofact', $request->TipoFac);
	oci_bind_by_name($consulta, ':v_paltocosto', $request->Altocosto);
	oci_bind_by_name($consulta, ':v_pcopago', $request->Copago);
	// oci_bind_by_name($consulta, ':v_pvalor_recobro', $request->Valor_Recobro);
	// oci_bind_by_name($consulta, ':v_pmotivo_recobro', $request->Motivo_Recobro); 
	oci_bind_by_name($consulta, ':v_pjson_glosa', $json_parametros, -1, OCI_B_CLOB);
	oci_bind_by_name($consulta, ':v_pcant_glosa', $request->Cant_Glosa);
	oci_bind_by_name($consulta, ':v_pobservacion_glosa', $request->Observacion_Glosa);
	oci_bind_by_name($consulta, ':v_pconcepto', $request->Concepto);
	oci_bind_by_name($consulta, ':v_pfechapss', $request->Fecha_Pres);
	oci_bind_by_name($consulta, ':v_pno_copago', $request->vpnocopago);
	$json_parametros->writeTemporary($datos);
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

function Vista2_List_Facturas_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_FACTURA_DETALLE(:v_numero,:v_ubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->Num);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->Ubi);
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

function Factura_Detalle_Ins_Upd_Del()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_UI_DETALLE_FACTURA(:v_numero,:v_ubicacion,:v_pproducto,:v_pvalor,:v_pautorizacion,:v_prenglon,:v_paccion,:v_ptipodoc,:v_pdocumentoafi,:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->Num);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->Ubi);
	oci_bind_by_name($consulta, ':v_pproducto', $request->Producto);
	oci_bind_by_name($consulta, ':v_pvalor', $request->Valor);
	oci_bind_by_name($consulta, ':v_pautorizacion', $request->Aut);
	oci_bind_by_name($consulta, ':v_prenglon', $request->Renglon);
	oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
	oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pdocumentoafi', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pnit', $request->Nit);
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


function Vista2_List_Glosa_Factura()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_LISTA_GLOSA_FACTURA(:v_numero,:v_ubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_numero', $request->Num);
	oci_bind_by_name($consulta, ':v_ubicacion', $request->Ubi);
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

function Factura_Glosa_Ins_Upd_Del()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_UI_GLOSA(:v_ubicacion,:v_numero,:v_precibo,:v_pfactura,:v_pfactura2,:v_phora,:v_ptipo_doc_afiliado,:v_pafiliado,
	:v_pcontrato_capitado,:v_pcontrato,:v_pubicacion_contrato,:v_pproyecto,:v_pvalor,:v_pproducto,:v_prenglon,:v_ptipoglosa,:v_pobservacion,:v_ptercero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubicacion', $request->Ubi);
	oci_bind_by_name($consulta, ':v_numero', $request->Num);
	oci_bind_by_name($consulta, ':v_precibo', $request->Recibo);
	oci_bind_by_name($consulta, ':v_pfactura', $request->xFact);
	oci_bind_by_name($consulta, ':v_pfactura2', $request->Fact);
	oci_bind_by_name($consulta, ':v_phora', $request->Fact_Rad);
	oci_bind_by_name($consulta, ':v_ptipo_doc_afiliado', $request->Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pafiliado', $request->Num_Doc);
	oci_bind_by_name($consulta, ':v_pcontrato_capitado', $request->Contrato);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->Contrato_Adm);
	oci_bind_by_name($consulta, ':v_pubicacion_contrato', $request->Ubi_Contrato);
	oci_bind_by_name($consulta, ':v_pproyecto', $request->Regimen);

	oci_bind_by_name($consulta, ':v_pvalor', $request->Valor);
	oci_bind_by_name($consulta, ':v_pproducto', $request->Producto);
	oci_bind_by_name($consulta, ':v_prenglon', $request->Renglon);
	oci_bind_by_name($consulta, ':v_ptipoglosa', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Desc);
	oci_bind_by_name($consulta, ':v_ptercero', $request->Nit);

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

function Factura_Glosa_Reversar()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_REVERSAR_GLOSA(:v_pnumero,:v_pubicacion,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->Num);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubi);
	oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
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

function obtenerafiliados()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipodocumento = $request->tipodocumento;
	$documento     = $request->documento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumento);
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

function Obtener_tutelas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipodocumento = $request->tipodocumento;
	$documento     = $request->documento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_TUTELAS_AFI(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumento);
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


function Obtener_Historico_Facturas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$tipodocumento = $request->tipodocumento;
	$documento     = $request->documento;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_HISTORICO_FACTURAS(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumento);
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

// function Consulta_Censos()
// {
// 	require_once('../config/dbcon_prod.php');
// 	global $request;
// 	$tipodocumento = $request->tipodocumento;
// 	$documento     = $request->documento;
// 	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_CENSO_AFI(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
// 	oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumento);
// 	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
// 	$clob = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
// 	oci_execute($consulta, OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	} else {
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function Consulta_Censos(){
	// echo "1";
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	// $documento='27656400';
	// $tipodocumento='CC';
	$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_obtener_censo_documento(:v_tipo_documento,:v_documento,:v_response); end;');
	oci_bind_by_name($consulta,':v_tipo_documento',$request->tipodocumento);
	oci_bind_by_name($consulta,':v_documento',$request->documento);
	// oci_bind_by_name($consulta,':v_tipo_documento',$tipodocumento);
	// oci_bind_by_name($consulta,':v_documento',$documento);

	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);

}

function Consulta_Detalle_Censos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_detail_censo(:v_pnocenso , :v_pubicacion,:v_response); end;');
	oci_bind_by_name($consulta,':v_pnocenso',$request->censo);
	oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);

	echo json_encode($datos);

}

function Obt_Listado_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.p_lista_usuarios_auditoria(:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NOMBRE' => $row['NOMBRE'],
				'ACCION' => $row['ACCION'],
				'PROCESA' => $row['PROCESA'],
				'CODESTADO' => $row['CODESTADO'],
				'VISUALIZACION' => $row['VISUALIZACION'],
				'SECCIONAL' => $row['SECCIONAL'],
			));
		}
		echo json_encode($array);
	} else {
		echo json_encode($json);
	}

	oci_free_statement($consulta);
	oci_free_statement($curs);

	oci_close($c);
}

function Obt_Funcs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_obtener_funcionario(:v_pdato,:v_json_out,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pdato', $request->Coincidencia);
	oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
	$curs = oci_new_cursor($c);
	oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($curs);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$array = array();
		while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
			array_push($array, array(
				'DOCUMENTO' => $row['DOCUMENTO'],
				'NOMBRE' => $row['NOMBRE'],
			));
		}
		echo json_encode($array);
	} else {
		echo json_encode($json);
	}
	oci_free_statement($consulta);
	oci_free_statement($curs);
	oci_close($c);
}

function Guardar_Func()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.p_actualiza_usuario(:v_pdocumento,:v_prango,:v_pestado,:v_pprocesa,:v_paccion,:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_prango', $request->Visualizacion);
	oci_bind_by_name($consulta, ':v_pestado', $request->Estado);
	oci_bind_by_name($consulta, ':v_pprocesa', $request->Procesa);
	oci_bind_by_name($consulta, ':v_paccion', $request->Accion);
	oci_bind_by_name($consulta, ':v_presponsable', $request->Ced);
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

/////////////////////////////////
function Obt_Errores()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$Emp = '1';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.p_obtener_errores_fac(:v_pempresa,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pempresa', $Emp);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->Doc);
	oci_bind_by_name($consulta, ':v_pnumero', $request->Num);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubi);
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