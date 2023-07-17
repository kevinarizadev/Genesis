
<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function CargarSoportes()
{
	require_once('../config/dbcon.php');
	global $request;
	$archivos = json_decode($request->archivos);
	$tipodocumento = 'CC'; //$request->tipodocumento;
	$documento = $request->numero;
	$hoy = date('dmY');
	$path = 'MesaAyuda/ACAS/' . $hoy;
	$estado = 0;
	$rutas = [];
	for ($i = 0; $i < count($archivos); $i++) {
		$hoy2 = date('dmY_His');
		$name = '132_R' . '_' . $tipodocumento . '_' . $documento . '_' . $hoy2.'.'.$archivos[$i]->extension;
		list(, $archivos[$i]->base64) = explode(';', $archivos[$i]->base64); // Proceso para traer el Base64
		list(, $archivos[$i]->base64) = explode(',', $archivos[$i]->base64); // Proceso para traer el Base64
		$base64 = base64_decode($archivos[$i]->base64); // Proceso para traer el Base64
		file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
		require('../sftp_cloud/UploadFile.php');
		$subio = UploadFile($path, $name);
		// $subio = UploadFile($path, $name);
		if (substr($subio, 0,11) == '/cargue_ftp') {
			array_push($rutas, (object)[
				'ruta' => $subio,
				'codigo' => '0'
			]);
			// $rutas[$i]->ruta = $subio;
			// $rutas[$i]->codigo = '0';
		} else {
			$estado = $estado + 1;
		}
	}
	if ($estado == 0) {
		echo json_encode($rutas);
	} else {
		echo '0';
	}
}

// function UploadFile($dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
// 	$file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
// 	// function UploadFile($base64 /*Base 64*/, $dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/, 
// 	// $file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
// 	{
// 		require_once('../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
// 		// require_once('../../config/scp_oracle_con.php'); // Creamos la conexion con el servidor
// 		$host_path = '/data/sftpuser/cargue_ftp/Digitalizacion/Genesis/';//Ruta Host

// 		// list(, $base64) = explode(';', $base64); // Proceso para traer el Base64
// 		// list(, $base64) = explode(',', $base64); // Proceso para traer el Base64
// 		// $base64 = base64_decode($base64); // Proceso para traer el Base64
// 		// file_put_contents('../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
// 		// file_put_contents('../../../temp/'.$file, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
		
// 		$sftp = ssh2_sftp($con_id); // Abrimos la conexion sftp
		
// 		$parts = explode('/',$dir); // Calculamos cuantos directorios existen
// 		foreach($parts as $part){ // Iniciamos el recorrido para crear los directorios si es que no existen algunos
// 			$host_path = $host_path.$part.'/'; // Concatenamos la ruta $host_path con la carpeta del proyecto
// 			if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Usamos la conexion sftp creada para Validar si el directorio existe
// 				mkdir("ssh2.sftp://$sftp$host_path"); // Crea el directorio
// 			}
// 		}

// 		if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Validamos si se crearon los directorios
// 			return '0 - Error al subir el archivo, no se crearon los directorios';
// 		} else {
// 			$host_path = $host_path.$file; // Concatenamos la ruta del directorio con el nombre del archivo
// 			$subio = ssh2_scp_send($con_id, '../../temp/'.$file, $host_path); // Subimos el archivo al servidor
// 			// $subio = ssh2_scp_send($con_id, '../../../temp/'.$file, $host_path); // Subimos el archivo al servidor
// 		}

// 		if((!$subio) || (filesize("ssh2.sftp://$sftp$host_path") == 0 )){ return '0 - Archivo no subido correctamente';} // Validamos que se subio el archivo y que el peso sea diferente de 0

// 		ssh2_exec($con_id, 'exit'); // Cerramos la conexion
// 		return (substr($host_path, 14, strlen($host_path)-1)); // Recortamos la ruta para que solo muestre desde /cargue_ftp/...
// 	}


?>
