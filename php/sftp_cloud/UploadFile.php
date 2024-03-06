<?php

function Connect_FTP()
{
     $ftp_server = "172.20.0.2";//IP privada oracle tunel - sophos
    //$ftp_server = "152.70.137.27";//IP privada oracle tunel - sophos <---- Usar en servidor
    $ftp_port = "22";
    $ftp_user = "opc"; // <--- SCP

    $pubkeyfile = '/Users/kevin.ariza/.ssh/id_rsa.pub'; // <---- Usar en equipo local
    $privkeyfile = '/Users/kevin.ariza/.ssh/id_rsa'; // <---- Usar en equipo local
    //$pubkeyfile = '../.ssh/id_rsa.pub'; // <---- Usar en servidor
    //$privkeyfile = '../.ssh/id_rsa'; // <---- Usar en servidor
    // $pubkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa.pub';
    // $privkeyfile = 'C:\inetpub\wwwroot\Genesis\php\.ssh\id_rsa';

    if (!$con_id = ssh2_connect($ftp_server, $ftp_port)) die('0 - Error al conectar');
    if (!ssh2_auth_pubkey_file($con_id,$ftp_user,$pubkeyfile,$privkeyfile)) die('0 - Error al conectar pub');

    return $con_id;
}

function UploadFile($dir /*Directorio del proyecto Ejemp: ( carpeta/subcarpeta/... )*/,
$file /*Nombre del archivo y su extension Ejemp: ( archivo.zip )*/)//
{
    $root = $_SERVER['DOCUMENT_ROOT'].'/genesis/';
    // $root = $_SERVER['DOCUMENT_ROOT'].'/'; //<---- Usar en servidor
	$con_id = Connect_FTP();
    $host_path = '/data/sftpuser/cargue_ftp/Digitalizacion/Genesis/';//Ruta Host

    $sftp = ssh2_sftp($con_id); // Abrimos la conexion sftp

    $parts = explode('/',$dir); // Calculamos cuantos directorios existen
    foreach($parts as $part){ // Iniciamos el recorrido para crear los directorios si es que no existen algunos
        $host_path = $host_path.$part.'/'; // Concatenamos la ruta $host_path con la carpeta del proyecto
        if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Usamos la conexion sftp creada para Validar si el directorio existe
            mkdir("ssh2.sftp://$sftp$host_path"); // Crea el directorio
        }
    }

    if(!is_dir("ssh2.sftp://$sftp$host_path")){ // Validamos si se crearon los directorios
        return '0 - Error al subir el archivo, no se crearon los directorios';
    } else {
        $host_path = $host_path.$file; // Concatenamos la ruta del directorio con el nombre del archivo
        $subio = ssh2_scp_send($con_id, $root.'temp/'.$file, $host_path); // Subimos el archivo al servidor
    }

    if((!$subio) || (filesize("ssh2.sftp://$sftp$host_path") == 0 )){ return '0 - Archivo no subido correctamente';} // Validamos que se subio el archivo y que el peso sea diferente de 0
      $ruta =  $host_path; // ruta completa del archivo en la nube
      $pesolocal = filesize($root.'temp/'.$file); // tamaño del archivo en el servidor local de genesis
      $pesonube = filesize("ssh2.sftp://$sftp$host_path"); // tamaño del archivo en el servidor ftp de la nube
      Guardarrutapeso($ruta,$pesolocal,$pesonube);

    ssh2_exec($con_id, 'exit'); // Cerramos la conexion
    return (substr($host_path, 14, strlen($host_path)-1)); // Recortamos la ruta para que solo muestre desde /cargue_ftp/...
}

function Guardarrutapeso($ruta,$pesolocal,$pesonube){
  require($_SERVER['DOCUMENT_ROOT'].'/genesis/php/config/dbcon_prod.php');
  //require_once($_SERVER['DOCUMENT_ROOT'].'/php/config/dbcon_prod.php'); //<---- Usar en servidor

  $cedula = isset($_SESSION['cedula']) ? $_SESSION['cedula'] : $_SESSION['nit'];
  $consulta = oci_parse($c,'BEGIN pq_genesis.p_guarda_cargue_soportes_ftp(:v_pruta,:v_ptamano_local,:v_ptamano_ftp,:v_pcedula,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pruta',$ruta);
  oci_bind_by_name($consulta,':v_ptamano_local',$pesolocal);
  oci_bind_by_name($consulta,':v_ptamano_ftp',$pesonube);
  oci_bind_by_name($consulta,':v_pcedula',$cedula);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  oci_close($c);
}
