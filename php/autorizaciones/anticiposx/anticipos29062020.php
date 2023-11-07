<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaAdjunto()
{
	require_once('../../config/ftpcon.php');
	global $request;
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
}

function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
}

function Obt_Ubi()
{
	echo ($_SESSION["codmunicipio"]);
}

function Obt_Control()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_USUARIO(:V_PCEDULA,:V_JSON_ROW); end;');
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

function List_Anticipos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	// $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CA.p_mostrar_soporte_doc(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_LISTAR_ANTICIPOS(:V_PUBICACION,:v_json_row); end;');
	oci_bind_by_name($consulta, ':V_PUBICACION', $request->Ubicacion);
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

function Obt_Afiliado()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	// $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CA.p_mostrar_soporte_doc(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_DATOS_BASICOS(:V_PTIPODOCUMENTO,:V_PDOCUMENTO,:V_PNOMBRE,:V_JSON_ROW); END;');
	oci_bind_by_name($consulta, ':V_PTIPODOCUMENTO', $request->TipoDoc);
	oci_bind_by_name($consulta, ':V_PDOCUMENTO', $request->NumeroDoc);
	oci_bind_by_name($consulta, ':V_PNOMBRE', $request->Coincidencia);
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

function Obt_Municipio()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_MUNICIPIO(:VP_PCOINCIDENCIA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_PCOINCIDENCIA', $request->Coinc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obt_Servicios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_SERVICIO(:V_PCOINCIDENCIA,:V_PEDAD,:V_PSEXO,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Coinc);
	oci_bind_by_name($consulta, ':V_PEDAD', $request->Edad);
	oci_bind_by_name($consulta, ':V_PSEXO', $request->Sexo);
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

function Obt_Prods()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_PRODUCTO(:V_PCOINCIDENCIA,:V_PEDAD,:V_PSEXO,:V_PSERV,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Coinc);
	oci_bind_by_name($consulta, ':V_PEDAD', $request->Edad);
	oci_bind_by_name($consulta, ':V_PSEXO', $request->Sexo);
	oci_bind_by_name($consulta, ':V_PSERV', $request->Serv);
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

function Obt_Prods_Subclase()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_MOSTRAR_HIJOS_EPRO(:v_pcodigo_cups,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':v_pcodigo_cups', $request->Prod);
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


function Obt_Diag()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_DIAGNOSTICO(:V_PCOINCIDENCIA,:V_PSEXO,:V_PEDAD,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Coinc);
	oci_bind_by_name($consulta, ':V_PEDAD', $request->Edad);
	oci_bind_by_name($consulta, ':V_PSEXO', $request->Sexo);
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

function Obt_Prest()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_IPS(:V_PCOINCIDENCIA,:v_json_row); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Coinc);
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

function Obt_Contrato()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_CONTRATO(:v_pnitasig,:v_pregimen,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnitasig', $request->Ips);
	oci_bind_by_name($consulta, ':v_pregimen', $request->Regimen);
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

function Base64()
{
	// require_once('../../config/dbcon_prod.php');
	global $request;
	$name = uniqid();
	$base_to_php = explode(',', $request->Base64);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".pdf";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".pdf");
}

function Baseimg()
{
	// require_once('../../config/dbcon_prod.php');
	global $request;
	$name = uniqid();
	$base_to_php = $request->Base64;
	$data = base64_decode($base_to_php);
	$filepath = "../../../temp/" . $name . ".jpeg";
	file_put_contents($filepath, $data);
	echo ("temp/" . $name . ".jpeg");
}

function Antes_De_Inserta_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_VALIDA_ANTICIPO(:V_P_JSON_ANTICIPO,:V_P_JSON_PRODUCTOS,:V_NUMERO,:V_P_CANTIDAD,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_P_JSON_ANTICIPO', $request->xdata);
	oci_bind_by_name($consulta, ':V_P_JSON_PRODUCTOS', $request->xdata_serpro);
	oci_bind_by_name($consulta, ':V_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':V_P_CANTIDAD', $request->cantidad);
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

function Inserta_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	// $request->cantidad
	// $cantidad = '3';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_INSERTA_ANTICIPO(:V_P_JSON_ANTICIPO,:V_P_JSON_PRODUCTOS,:V_P_CANTIDAD,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_P_JSON_ANTICIPO', $request->xdata);
	oci_bind_by_name($consulta, ':V_P_JSON_PRODUCTOS', $request->xdata_serpro);
	oci_bind_by_name($consulta, ':V_P_CANTIDAD', $request->cantidad);
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

function json_validator($data = NULL)
{
	if (!empty($data)) {
		@json_decode($data);
		return (json_last_error() === JSON_ERROR_NONE);
	}
	return false;
}

function Obt_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_ANTICIPO(:V_PNUMERO,:V_PTIPODOC,:V_PNUMERODOC,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':V_PTIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':V_PNUMERODOC', $request->NumeroDoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	// echo 
	// $r=oci_error($consulta);
	// echo oci_execute($consulta, OCI_DEFAULT);;
	// if(!$r){
	// 	$e = oci_error($consulta);  // Para errores de oci_execute, pase el gestor de sentencia
	// 	// print htmlentities($e['message']);
	// 	// print "\n<pre>\n";
	// 	// print htmlentities($e['sqltext']);
	// 	// printf("\n%".($e['offset']+1)."s", "^");
	// 	// print  "\n</pre>\n";
	// }


	if (isset($clob)) {
		$json = $clob->read($clob->size());
		// if(json_validator($json)){
			echo $json;
		// }else{
		// 	echo '[{"ERROR":"1", "JSON": '.$json.'}]';
		// }
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obt_Tutelas()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_TUTELAS(:V_PTIPODOC,:V_PNUMERODOC,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PTIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':V_PNUMERODOC', $request->NumeroDoc);
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

function Obt_Tutelas_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_TUTELAS_ANT(:V_PNUMERO,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $request->Numero);
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

function H1Aprobar_Anticipo_Edita()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GESTION_ANTICIPO_EDITA(:VP_NUMERO,:VP_JSON_ANT,:V_P_JSON_PRODUCTOS,:V_P_CANTIDAD,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
	oci_bind_by_name($consulta, ':V_P_JSON_PRODUCTOS', $request->xdata_serpro);
	oci_bind_by_name($consulta, ':V_P_CANTIDAD', $request->cantidad);
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

function H1Aprobar_Anticipo_Firma_Pert()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$firma = strigToBinary($request->signature);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GESTION_ANTICIPO_PERTINENCIA(:VP_NUMERO,:VP_JSON_ANT,:VP_SIGNATURE,:V_JSON_ROW); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
	oci_bind_by_name($consulta, ':VP_SIGNATURE', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($firma);
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

function H1Aprobar_Anticipo_Firma_Oblig()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$firma = strigToBinary($request->signature);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GESTION_ANTICIPO_OBLIG(:VP_NUMERO,:VP_JSON_ANT,:VP_SIGNATURE,:V_JSON_ROW); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
	oci_bind_by_name($consulta, ':VP_SIGNATURE', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($firma);
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

function strigToBinary($string)
{
	$characters = str_split($string);

	$binary = [];
	foreach ($characters as $character) {
		$data = unpack('H*', $character);
		$binary[] = base_convert($data[1], 16, 2);
	}
	return implode(' ', $binary);
}

function H1Actualizar_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_ACTUALIZAR_ANTICIPO(:VP_NUMERO,:VP_JSON_ANT,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
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


function Ver_Historico_Anticipo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_HISTORIAL(:VP_NUMERO,:VP_TIPODOC,:VP_DOC,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_TIPODOC', $request->TipoDoc);
	oci_bind_by_name($consulta, ':VP_DOC', $request->NumeroDoc);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function H1Aprobar_Anticipo_Pagaduria()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_APROBAR_ANTICIPO_PAGADURIA(:VP_NUMERO,:VP_JSON_ANT,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_NUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
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



function Obtener_Usuarios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_LISTAR_USUARIOS(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function In_Ac_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_ACTIVAR_INACTIVAR_USUARIO(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Modificar_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_MODIFICAR_USUARIO(:VP_CEDULA,:VP_CORREO,:VP_CREAR,:VP_SUBDIRECTOR_UBI,:VP_RESPONSABLE,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	oci_bind_by_name($consulta, ':VP_CORREO', $request->Correo);
	oci_bind_by_name($consulta, ':VP_CREAR', $request->Crear);
	oci_bind_by_name($consulta, ':VP_SUBDIRECTOR_UBI', $request->Subdirector);
	oci_bind_by_name($consulta, ':VP_RESPONSABLE', $request->Responsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Insertar_Usuario()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_INSERTAR_USUARIO(:VP_CEDULA,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->Cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function Grafico_Ips()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GRAFICO_POR_IPS(:V_MES,:V_ANIO,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_MES', $request->mes);
	oci_bind_by_name($consulta, ':V_ANIO', $request->anio);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Grafico_Servicios()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GRAFICO_POR_SERVICIO(:V_MES,:V_ANIO,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_MES', $request->mes);
	oci_bind_by_name($consulta, ':V_ANIO', $request->anio);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function Grafico_Enfermedades()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GRAFICO_POR_ENF(:V_MES,:V_ANIO,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_MES', $request->mes);
	oci_bind_by_name($consulta, ':V_ANIO', $request->anio);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Grafico_Seccionales()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GRAFICO_POR_SECCIONAL(:V_MES,:V_ANIO,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_MES', $request->mes);
	oci_bind_by_name($consulta, ':V_ANIO', $request->anio);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}





function Grafico_Linea_De_Tiempo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GRAFICO_POR_LINEA(:V_JSON_ROW); end;');
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

//////////////////////////CREAR PRODUCTO///////////////////////
function Creacion_Productos()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$documento = 'RE';
	// $ubicacion = ;
	$v_ptipo_doc_apor = 0;
	$concepto = 'SW';
	$motivo = 4;
	$adjunto = '';
	$prioridad = 'A';
	$barrio = '1';
	$asunto = '1227';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_INSERT_ACAS(:v_pdocumento,:v_pubicacion,:v_pconcepto,:v_pmotivo,:v_padjunto,:v_pobservacion,
		:v_pemisor,:v_pasunto,:v_pprioridad,:v_pbarrio,:v_ptipo_doc_apor,:v_pdoc_aportante,:v_prespuesta); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->Ubicacion);
	oci_bind_by_name($consulta, ':v_pconcepto', $concepto);
	oci_bind_by_name($consulta, ':v_pmotivo', $motivo);
	oci_bind_by_name($consulta, ':v_padjunto', $adjunto);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->Observacion);
	oci_bind_by_name($consulta, ':v_pemisor', $request->Emisor);
	oci_bind_by_name($consulta, ':v_pasunto', $asunto);
	oci_bind_by_name($consulta, ':v_pprioridad', $prioridad);
	oci_bind_by_name($consulta, ':v_pbarrio', $barrio);
	oci_bind_by_name($consulta, ':v_ptipo_doc_apor', $v_ptipo_doc_apor);
	oci_bind_by_name($consulta, ':v_pdoc_aportante', $v_ptipo_doc_apor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function Guardar_Firma()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$firma = strigToBinary($request->signature);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GUARDAR_FIRMA(:VP_CEDULA,:VP_SIGNATURE,:V_JSON_ROW); end;');
	$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_CEDULA', $request->ced);
	oci_bind_by_name($consulta, ':VP_SIGNATURE', $json_parametros, -1, OCI_B_CLOB);
	$json_parametros->writeTemporary($firma);
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

function Guardar_Codigo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_GUARDAR_CODIGO(:V_PNUMERO,:VP_JSON_ANT,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PNUMERO', $request->Numero);
	oci_bind_by_name($consulta, ':VP_JSON_ANT', $request->xdata);
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

//////////////////////////////////////////////////////////OBTENER////////////////////////////////////////////////////


function obtenerUbicacionSolicitud()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_UBICACION_SOL(:v_json_row); end;');
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

function obtenerTipoServicio()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_TIPO_SOL(:v_json_row); end;');
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

function obtenerContratoAUT()
{
	require_once('../../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_TIPO_SOL(:v_json_row); end;');
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

function Consultar_Usuario_Nuevo()
{
	require_once('../../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.CONSULTAR_USUARIO_NUEVO(:V_PCED,:VP_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':V_PCED', $request->ced);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':VP_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}






function Otp()
{
	$val = '{"data":{"authenticationId":"ZFCJLCAEF2BEZABCDT2OOAOS4FTNQDCWQLIVEOV37Q2VT4YBZT4D3AUSK6FDXDS6DBK6YQJEBYK2UEEMULAZ36XDS722YI74B7EVSX7IMJ5FLXXIRSVB3K4VLIOKFDACEDLGESOQBA5LWL6S6EJULI6AS3FGXDULEMBOIVJ7ZXYAWT6XSPG2SVZGTS2SAGHZICLKA7G6AJZCI"},"code":200}';
	echo $val;
}

function Ver()
{
	$val = '{"data":true,"code":200}';
	echo $val;
}
