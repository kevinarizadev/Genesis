<?php
	// llenamos el arreglo donde se almacenan los base64
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$data = json_decode($request->data);
	$codigo = ($request->codigo);

	require_once('../upload_file/subir_archivo.php');
	
	// variables de parametros
	//$paquete = [12];
	
	$tipo_documento = 'CC';
	$documento = '1143450658';
	$ext = 'tiff';
	
	// otras variables
	
	$hoy = date('dmY');
	$path = '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'.$hoy.'/';
	// se hacen validaciones antes de empezar el proceso
	$next = (count($codigo) != count($data)) ? 1 : 0;
	if ($next == 1) {
		$res = array('codigo' => 1, 'mensaje' => 'La cantidad de archivos no es el mismo que el del paquete seleccionado');
		echo json_encode($res);
	}
	if ($next == 0) {
		for ($i=0; $i < count($codigo) ; $i++) {
			$name = $codigo[$i].'_'.$tipo_documento.'_'.$documento.'_'.$hoy;
			$subio = subirFTP($data[$i],$path,$name,$ext);
			if ($subio != '0 - Error') {
				echo $subio . '<br>';
			}
		}
	}
?>
