<?php
	// llenamos el arreglo donde se almacenan los base64
$postdata = file_get_contents("php://input");
error_reporting(0);
$request = json_decode($postdata);
$imagenes = $request->img;
//$longitud=json_decode($request->log);
require_once('../upload_file/subir_archivo.php');
	// variables de parametros
$ext = 'tiff';
$arrlength = count($imagenes);
// otras variables
// se hacen validaciones antes de empezar el proceso
if ($arrlength == 0) {
	$res = array('codigo' => 1, 'mensaje' => 'La cantidad de archivos no es el mismo que el del paquete seleccionado');
	echo json_encode($res);
} else {
	for ($i=0; $i < $arrlength ; $i++) {
		$upl = subirImagen($imagenes[$i],$ext);
		$rutas[$i]->ruta = $upl;
	}
	echo json_encode($rutas);
}


?>