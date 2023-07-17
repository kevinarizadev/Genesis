<?php
$postdata = file_get_contents("php://input");
$param = json_decode($postdata);
global $param;
$datos = json_decode($param->json);
$nit = $datos->nit;
$pass = $datos->pass;
if (!preg_match('/^\w{5,25}$/', $nit)) {
    echo '{"RES":"0","MSJ":"Nit y/o contraseña incorrecto"}';
    return;
}


require_once('../config/dbcon_login.php');
$consulta = oci_parse($c, 'begin pq_genesis.p_login_empresas(:v_nit,:v_clave,:v_respuesta); end;');

oci_bind_by_name($consulta, ':v_nit', $nit);
oci_bind_by_name($consulta, ':v_clave', $pass);
$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
oci_execute($consulta, OCI_DEFAULT);
$json = $clob->read($clob->size());
$noj = json_decode($json);
$res = $noj->{'RES'};
if ($res == "1") {
    echo "1";
    $_SESSION['nombre'] = $noj->{'NOMBRE'};
    $_SESSION['rol'] = 'EMPRESA';
    $_SESSION['nit'] = $nit;
    $_SESSION['correoempresa'] = $noj->{'correoempresa'};
    $_SESSION['tipoaportante'] =  $noj->{'tipo_aportante'};
    $_SESSION['rolcod'] = $noj->{'rolcod'};
    $_SESSION['usu'] = $noj->{'usu'};
    $_SESSION['acc'] = 'KHR]E24ZAg{OvR';
} else {
    echo $res;
}
oci_close($c);
