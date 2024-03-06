<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function P_IMPRESION_FFAC()
{
  // require_once('../config/dbcon_prod.php');
  require_once('../config/dbcon_produccion.php');
  include('dompdf/php/pdf.php');
	global $request;
	$cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.P_IMPRESION_FFAC(:v_pempresa,:v_pdocumento,:v_pconcepto,:v_pproveedor,:v_pfecha_inicial,:v_pfecha_final,:v_pnumero_inicial,
  :v_pnumero_final,:v_result); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $request->empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pconcepto', $request->concepto);
  oci_bind_by_name($consulta, ':v_pproveedor', $request->proveedor);
  oci_bind_by_name($consulta, ':v_pfecha_inicial', $request->fecha_inicial);
  oci_bind_by_name($consulta, ':v_pfecha_final', $request->fecha_final);
  oci_bind_by_name($consulta, ':v_pnumero_inicial', $request->numero_inicial);
  oci_bind_by_name($consulta, ':v_pnumero_final', $request->numero_final);

  // $curs = oci_new_cursor($c);
	// oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
	// oci_execute($consulta);
  // oci_execute($curs);
  // $count = 0;
  // while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  //   // echo $row['NUMERO'];
  //   $count+=1;
  //   generar($row,$request);
  // }
  // if($count>0){
  //   echo '{"codigo":"0","cantidad":"'.$count.'","ruta":"'.DescargarZip().'"}';
  // }else{
  //   echo '[]';
  // }

  oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);

}


function P_OBTENER_TERCERO()
{
	// require_once('../config/dbcon_prod.php');
	require_once('../config/dbcon_produccion.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_OBTENER_TERCERO(:V_PCOINCIDENCIA,:V_PJSON_OUT); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->proveedor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
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


// function p_insertar_usuario()
// {
//   global $request;
//   require_once('../config/dbcon_prod.php');
//   $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.p_insertar_usuario(:v_pcedula,:v_presponsable,:v_pjson_row); end;');
//   oci_bind_by_name($consulta, ':v_pcedula', $request->codigo);
//   oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
//   $clob = oci_new_descriptor($c, OCI_D_LOB);
//   oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
//   oci_execute($consulta, OCI_DEFAULT);
//   if (isset($clob)) {
//     $json = $clob->read($clob->size());
//     echo $json;
//   } else {
//     echo 0;
//   }
//   oci_close($c);
// }
