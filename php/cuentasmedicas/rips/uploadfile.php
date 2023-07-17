<?php
	// llenamos el arreglo donde se almacenan los base64
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$data = json_decode($request->data);
	require_once('php/subir_adjunto.php');
	// variables de parametros
	$paquete = [12,34,14];
	$tipo_documento = 'CC';
	$documento = '1140889298';
	$ext = 'png';
	// otras variables
	$hoy = date('dmY');
	$path = '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'.$hoy.'/';
	// se hacen validaciones antes de empezar el proceso
	$next = (count($paquete) != count($data)) ? 1 : 0;
	if ($next == 1) {
		$res = array('codigo' => 1, 'mensaje' => 'La cantidad de archivos no es el mismo que el del paquete seleccionado');
		echo json_encode($res);
	}
	if ($next == 0) {
		for ($i=0; $i < count($paquete) ; $i++) {
			$name = $paquete[$i].'_'.$tipo_documento.'_'.$documento.'_'.$hoy;
			$subio = subirFTP($data[$i],$path,$name,$ext);
			if ($subio != '0 - Error') {
				echo $subio . '<br>';
			}
		}
	}
?>
