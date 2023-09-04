<?php



function subirFTP($file, $path, $name, $ext)
{


    // $ftp_server = "129.146.249.11";
    // $ftp_username = "svepslocal";
    // $ftp_password = "Wikode2023!!";
    // $port = '21';
    // $dire = 'ftp://svepslocal:Wikode2023!!@129.146.249.11/';

    //     V_VC_HOST       VARCHAR2(30) := '192.168.50.10';
    // V_VC_PUERTO     VARCHAR2(10) := '21';
    // V_VC_USER_FTP   VARCHAR2(50) := 'ftp_genesis';
    // V_VC_PASS_FTP   VARCHAR2(50) := 'Senador2019!';

    $ftp_server = '192.168.50.36';
    $ftp_username = 'wikode';
    $ftp_password = "Wikode2023!!";
    $port = '21';
    // $dire = 'ftp://' . $ftp_username . ':' . $ftp_password . '@' . $ftp_server . '/';
    $dire='ftp://wikode:Wikode2023!!@192.168.50.36/';
    $con_id = ftp_ssl_connect($ftp_server,$port);
    if ((!$con_id)) {
        echo '{"Codigo":1,"Nombre":"No hubo conexion el FTP"}';
        die;
    }
    $lr = ftp_login($con_id, $ftp_username, $ftp_password);
    ftp_pasv($con_id,true);
    if ((!$con_id) || (!$lr)) {

        echo '{"Codigo":1,"Nombre":"Variables de conexion incorrecta el FTP"}';
        die;
    }
    $db_name = $path . $name . '.' . $ext;
    $tmpfile = $name . '.' . $ext;
    list(, $file) = explode(';', $file);
    list(, $file) = explode(',', $file);
    $file = base64_decode($file);
    file_put_contents($tmpfile, $file);
    if (is_dir($dire . $path) == TRUE) {
        $subio = @ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
        if ($subio) {
            unlink($tmpfile);
            return $db_name;
        } else {
            unlink($tmpfile);
            return 1;
        }
    } else {
        if (ftp_mkdir($con_id, $path)) {
            $subio = ftp_put($con_id, $path . '/' . $tmpfile, $tmpfile, FTP_BINARY);
            if ($subio) {
                unlink($tmpfile);
                return $db_name;
            } else {
                unlink($tmpfile);
                return 1;
            }
        } else {
            return 1;
        }
    }
    ftp_close($con_id);
}
