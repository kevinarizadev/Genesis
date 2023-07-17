<?php
	
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();
function Cargar_Listado_Descargue()
{
	require_once('../config/dbcon_prod.php');
$array = array();
	global $request;
	$datos = $request->archivo;
	$name = uniqid();
	$base_to_php = explode(',', $datos);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../temp/" . $name . ".csv";
	file_put_contents($filepath, $data);
	$ruta = "../../temp/" . $name . ".csv";
	$txt_file = fopen($ruta, 'r');
	$a = 1;
	while ($line = fgets($txt_file)) {
		array_push($array, $line);
		$a++;
	}
	fclose($txt_file);
	unset($array[0]);
	$prueba = [];
	foreach($array as $fila_v) {
		$columnas = explode(",", $fila_v);
		$datos2 = explode("\r\n", $columnas[0]);
		// $fecha_proceso = stripslashes();
		$object=(object) [
			'documento' => $datos2[0]
		];
		$prueba[]=$object;
		
	};
	$datos_entrada = json_encode($prueba);
	$datos_entrada1 = stripslashes($datos_entrada);
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c,'begin oasis.p_descargue_soporte_preliminar(:v_json_in,:v_pdata); end;');
	oci_bind_by_name($consulta,':v_json_in',$datos_entrada1);
	oci_bind_by_name($consulta, ':v_pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	$datosrecibido = json_encode($datos);
	Descarga_Carpeta($datosrecibido);
	// print_r($datosrecibido);
}


function DescargaAdjunto_Recursivo($carpeta, $ruta)
{
	$fileexists = false;

  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $ruta) == TRUE) {
    require('../config/sftp_con.php');
    $fileexists = true;
  }

  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $ruta) == TRUE && $fileexists == false) {
    require('../config/ftpcon.php');
    $fileexists = true;
  }

  if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $ruta) == TRUE && $fileexists == false) {
    require('../config/sftp_con_2.php');
    $fileexists = true;
  }
  if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $ruta) == TRUE && $fileexists == false) {
    require('../config/l_ftpcon.php');
    $fileexists = true;
  }
	
  if($fileexists){
	$file_size = ftp_size($con_id, $ruta);
	if ($file_size != -1) {
		$name = pathinfo($ruta, PATHINFO_FILENAME);
		$ext = pathinfo($ruta, PATHINFO_EXTENSION);
		$name = $name . '.' . $ext;
		$local_file = '../../temp/archivosaltocosto/' . $carpeta . '/' . $name;
		$handle = fopen($local_file, 'w');
		if (ftp_fget($con_id, $handle, $ruta, FTP_ASCII, 0)) {
			return $name;
		} else {
			echo "Error";
		}
		ftp_close($con_id);
		fclose($handle);
	} else {
		echo "Error";
	}
} else {
    require_once('../sftp_cloud/DownloadFile.php');
	$respuestas = DownloadFile($ruta);
	$texto = substr($respuestas,0,1);
	if($texto == 0){
		return 0;
	}else{
		return $respuestas;
	}
  }
}

function delete_files($dir) { 
	foreach(glob($dir . '/*') as $file) { 
	  if(is_dir($file)) delete_files($file); else unlink($file); 
	} rmdir($dir); 
  }

function Descarga_Carpeta($datos)
{
	$ruta = '../../temp/archivosaltocosto/';
	delete_files($ruta);
	if (file_exists($ruta) == 1) {
		array_map('unlink', glob("$ruta/*.*"));
		rmdir($ruta);
		mkdir($ruta);
		if(file_exists($ruta.'.zip')){
			$x=$ruta.'.zip';
			unlink($x);
		}
	} else {
		mkdir($ruta);
	}
	$archivos = array();
	$Array = json_decode($datos);
	$i = 0;
while ($i < count($Array)) {
    $rutaDestino = $ruta . '/' . $Array[$i]->DESTINO;
    crearDirectorioRecursivo($rutaDestino);
    $Array[$i]->RUTA_FINAL = DescargaAdjunto_Recursivo($Array[$i]->DESTINO, $Array[$i]->ORIGEN);
	if($Array[$i]->RUTA_FINAL == 0){

	}else{
		$archivos[] = $Array[$i]->DESTINO.'/'.$Array[$i]->RUTA_FINAL;
	}
    $i++;
}
	$file_names = $archivos;
	$archive_file_name = '../../temp/archivosaltocosto.zip';
	$file_path = '../../temp/archivosaltocosto/';
	$zip = new ZipArchive();
	if ($zip->open($archive_file_name, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE) !== TRUE) {
		die ("Se produjo un error al crear su archivo ZIP.");
	}
	foreach ($file_names as $path) {
		$filepath = $file_path . $path;
		if (file_exists($filepath)) {
			$zip->addFile($filepath, $path) or die ("ERROR: No se pudo agregar el archivo $archive_file_name");
		} 
		// else {
		// 	die("Archivo $filepath no existe");
		// }
	}
	$zip->close();
	echo 'archivosaltocosto.zip';
}
function crearDirectorioRecursivo($ruta)
{
    $directorios = explode('/', $ruta);
    $rutaActual = '';

    foreach ($directorios as $directorio) {
        $rutaActual .= $directorio . '/';
        if (!is_dir($rutaActual)) {
            mkdir($rutaActual);
        }
    }
}
