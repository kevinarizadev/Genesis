<?php
        $postdata = file_get_contents("php://input");
        error_reporting(0);
        $request = json_decode($postdata);
        $function = $request->function;
        $function();

        
function SubirSoportes(){
    require_once('../config/dbcon_prod.php');
    require_once('../config/ftpcon.php');
    // include('../upload_file/subir_adjunto_tercero.php');
    global $request;
    // variables de parametros
    $archivos = json_decode($request->archivos);
    $documento = $request->documento;
    // otras variables
    $hoy = date('dmY');
    $mes = date('m');
    $ano = date('Y');
    $ruta = $ano.'/'.$mes.'/'.$documento.'/Cargue/';
    $path = '/cargue_ftp/Digitalizacion/Genesis/Tercero/'.$ruta;
    $estado = 0;
    for ($i=0; $i < count($archivos) ; $i++) {
        $name = $archivos[$i]->name.'_'.$documento;
        $subio = subirTerceroFtp($archivos[$i]->src,$path,$name,'pdf',$ruta);
        if ($subio != '0 - Error') {
            $rutas[$i]->ruta = $subio;
            $rutas[$i]->archivo = $archivos[$i]->name;
        }else {
            $estado = $estado + 1;
        }
    }
    if($estado == 0){
        echo json_encode($rutas);
    }else{
        echo '0';
    }
}


function ftp_mksubdirs($ftpcon,$ftpbasedir,$ftpath){
    @ftp_chdir($ftpcon, $ftpbasedir); // /var/www/uploads
    $parts = explode('/',$ftpath); // 2013/06/11/username
    foreach($parts as $part){
       if(!@ftp_chdir($ftpcon, $part)){
          ftp_mkdir($ftpcon, $part);
          ftp_chdir($ftpcon, $part);
          //ftp_chmod($ftpcon, 0777, $part);
       }
    }
 }

function subirTerceroFtp($file,$path,$name,$ext,$ruta){
    include('../config/ftpcon.php');
    $db_name = $path.$name.'.'.$ext;
    $tmpfile = $name.'.'.$ext;
    list(, $file) = explode(';', $file);
    list(, $file) = explode(',', $file);
    $file = base64_decode($file);
    file_put_contents($tmpfile, $file);
    ftp_mksubdirs($con_id,'/cargue_ftp/Digitalizacion/Genesis/Tercero/',$ruta);
    if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {
        $subio=@ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
        if ($subio) {
            unlink($tmpfile);
            return $db_name;
        }else{
            unlink($tmpfile);
            return '0 - Error';
        }
    }else{

        if (ftp_mkdir($con_id, $path)) {
            $subio=ftp_put($con_id, $path.'/'.$tmpfile, $tmpfile, FTP_BINARY);
            if ($subio) {
                unlink($tmpfile);
                return $db_name;
            }else{
                unlink($tmpfile);
                return '0 - Error';
            }
        }else{
           return '0';
        }
    }
    ftp_close($con_id);
} 

?>