<?php

function Connect_FTP()
{
	 $ftp_server = "172.20.0.2";//IP privada oracle tunel - sophos
	// $ftp_server = "152.70.137.27";//IP privada oracle tunel - sophos <---- Usar en servidor
	$ftp_port = "22";
	$ftp_user = "opc"; // <--- SCP

	$pubkeyfile = '/Users/kevin.ariza/.ssh/id_rsa.pub'; // <---- Usar en equipo local
	$privkeyfile = '/Users/kevin.ariza/.ssh/id_rsa'; // <---- Usar en equipo local
	/*$pubkeyfile = '../.ssh/id_rsa.pub'; // <---- Usar en servidor
	$privkeyfile = '../.ssh/id_rsa'; // <---- Usar en servidor*/
	// $pubkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa.pub';
	// $privkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa';
	//echo $_SERVER['DOCUMENT_ROOT'];
	if (!$con_id = ssh2_connect($ftp_server, $ftp_port)) die('0 - Error al conectar');
	if (!ssh2_auth_pubkey_file($con_id,$ftp_user,$pubkeyfile,$privkeyfile)) die('0 - Error al conectar');

	return $con_id;
}

// function DownloadFile()
function DownloadFile($ruta /* Ruta del soporte */)
{
  // $ruta = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Pro/PRO-37301-44001.pdf';
  // $ruta = '/cargue_ftp/Digitalizacion/Genesis/PQR/31122023/S370865_1.pdf';
	$root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';
	// $root = $_SERVER['DOCUMENT_ROOT'].'/'; // <---- Usar en servidor
	$con_id = Connect_FTP();
	$name_file = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
	$local_file = $root.'temp/'.$name_file;//Concatenamos la Ruta de la carpeta a donde se descargara con el nombre del archivo
	$sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
	$ruta = '/data/sftpuser'.$ruta; // Concatenamos la ruta raiz del servidor sftp con la ruta del archivo
	if(!file_exists("ssh2.sftp://$sftp$ruta")){ return '0 - Archivo no encontrado2'; } //Validamos si el archivo existe en el servidor Oracle
	ssh2_scp_recv($con_id, $ruta, $local_file);// Traemos el archivo del servidor y lo enviamos a la carpeta temp de Genesis
	$con_id = null; unset($con_id); //Cerrar Conex
	return ($name_file); // Imprimimos el nombre del archivo para que se genere la descarga del mismo
}



// $json_2 = json_decode($json);

$root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';


$file = '11625977.pdf';

// $zip = new ZipArchive();
// $nombre_archivo_zip = 'archivos_comprimidos.zip';

// if ($zip->open($nombre_archivo_zip, ZipArchive::CREATE) === TRUE) {
//     // foreach ($archivos_a_comprimir as $archivo) {
//         $zip->addFile($file);
//     // }
//     $zip->close();
//     echo 'Archivos comprimidos correctamente en ' . $nombre_archivo_zip;
// } else {
//     echo 'No se pudo crear el archivo ZIP';
// }


// $input_pdf = '11625977.pdf';
$input_pdf = 'C:\laragon\www\Genesis\php\sftp_cloud\11625977.pdf';

// $input_pdf = 'archivo_original.pdf';
// Ruta del archivo PDF de salida con calidad reducida
$output_pdf = 'C:\laragon\www\Genesis\php\sftp_cloud\archivo_reducido.pdf';

// Comando Ghostscript para reducir la calidad de las imágenes
$command = "gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=$output_pdf $input_pdf";

// -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=C:/laragon/www/Genesis/php/sftp_cloud/2.pdf C:/laragon/www/Genesis/php/sftp_cloud/1.pdf



// Ejecutar el comando
exec($command, $output, $return_var);

if ($return_var === 0) {
    echo "El archivo PDF con calidad reducida ha sido creado: $output_pdf";
} else {
    echo "Ha ocurrido un error al reducir la calidad del PDF.";
}


$outputFile = 'C:/laragon/www/Genesis/php/sftp_cloud/archivo_de_salida.png';
$command = "gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 -sOutputFile=$outputFile $input_pdf";
exec($command, $output, $return);
if ($return == 0) {
    echo "Ghostscript ejecutado exitosamente";
} else {
    echo "Error al ejecutar Ghostscript";
}


// $output = shell_exec('ls -lart');
// echo "<pre>$output</pre>";

// $info = shell_exec('systeminfo');

// echo $info;


//http://www.localhost/genesis/php\sftp_cloud\comprimir_archivos.php

?>
