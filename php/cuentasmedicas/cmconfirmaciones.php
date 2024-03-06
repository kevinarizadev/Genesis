<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function Cargar_Confirma()
{
	require_once('../config/dbcon_prod.php');
	$array = array();
	global $request;
	$datos = $request->archivo;
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
	unset($array[0]);
	$prueba = [];
	foreach ($array as $fila_v) {
		$columnas = explode("|", $fila_v);
		$datos2 = explode("\r\n", $columnas[4]);
		// $fecha_proceso = stripslashes();
		$object = (object) [
			'v_pempresa' => '1',
			'v_pdocumento' => $columnas[0],
			'v_pnumero' => $columnas[1],
			'v_pubicacion' => $columnas[2],
			'v_presponsable' => $columnas[3],
			'v_pestado' => $datos2[0]
		];
		$prueba[] = $object;
	};
	$datos_entrada = json_encode($prueba);
	$datos_entrada1 = stripslashes($datos_entrada);
	$registros = json_decode($datos_entrada1);

	for ($i = 0; $i < count($registros); $i++) {
		$consulta = oci_parse($c, 'BEGIN oasis.pq_espera_confirmacion.p_ins_movimiento_responsable(:v_pempresa,
																				:v_pdocumento,
																				:v_pnumero,
																				:v_pubicacion,
																				:v_presponsable,
																				:v_pestado
																				); end;');
		oci_bind_by_name($consulta, ':v_pempresa', $registros[$i]->v_pempresa);
		oci_bind_by_name($consulta, ':v_pdocumento', $registros[$i]->v_pdocumento);
		oci_bind_by_name($consulta, ':v_pnumero', $registros[$i]->v_pnumero);
		oci_bind_by_name($consulta, ':v_pubicacion', $registros[$i]->v_pubicacion);
		oci_bind_by_name($consulta, ':v_presponsable', $registros[$i]->v_presponsable);
		oci_bind_by_name($consulta, ':v_pestado', $registros[$i]->v_pestado);
		  $clob = oci_new_descriptor($c,OCI_D_LOB);
			// oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
			oci_execute($consulta,OCI_DEFAULT);
			// if (isset($clob)) {
			// 	$json = $clob->read($clob->size());
			// 	echo $json;
			// }else{
			// 	echo 0;
			// }
			oci_close($c);
	}
}
function Cargar_fecha()
{
	require_once('../config/dbcon_prod.php');
	$array = array();
	global $request;
	$datos = $request->archivo;
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
	unset($array[0]);
	$prueba = [];
	foreach ($array as $fila_v) {
		$columnas = explode("|", $fila_v);
		$datos2 = explode("\r\n", $columnas[3]);
		// $fecha_proceso = stripslashes();
		$object = (object) [
			'v_pempresa' => '1',
			'v_pdocumento' => $columnas[0],
			'v_pnumero' => $columnas[1],
			'v_pubicacion' => $columnas[2],
			'v_pfecha' => $datos2[0]
		];
		$prueba[] = $object;
	};
	$datos_entrada = json_encode($prueba);
	$datos_entrada1 = stripslashes($datos_entrada);
	$registros = json_decode($datos_entrada1);

	for ($i = 0; $i < count($registros); $i++) {
		$consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_FACTURACION.P_U_FECHA(:v_pempresa,
																				:v_pdocumento,
																				:v_pnumero,
																				:v_pubicacion,
																				:v_pfecha,
																				:v_json_row
																				); end;');
		oci_bind_by_name($consulta, ':v_pempresa', $registros[$i]->v_pempresa);
		oci_bind_by_name($consulta, ':v_pdocumento', $registros[$i]->v_pdocumento);
		oci_bind_by_name($consulta, ':v_pnumero', $registros[$i]->v_pnumero);
		oci_bind_by_name($consulta, ':v_pubicacion', $registros[$i]->v_pubicacion);
		oci_bind_by_name($consulta, ':v_pfecha', $registros[$i]->v_pfecha);
		  $clob = oci_new_descriptor($c,OCI_D_LOB);
			oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
			oci_execute($consulta,OCI_DEFAULT);
			if (isset($clob)) {
				$json = $clob->read($clob->size());
				echo $json;
			}else{
				echo $i;
			}
			oci_close($c);
	}
}
