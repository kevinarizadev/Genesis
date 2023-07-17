<?php
// Llamamos la conexion a la base de datos
require_once('../config/dbcon_prod.php');
// Recibimos los parametros enviados desde servicio de consulta
$emisor = $_GET['emisor'];

// Preparamos la consulta para ser ejecutada y enlazamos los parametros
$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AU.P_MOSTRAR_GESTION_PERMISOS(:v_pemisor,:v_json_row,:v_jefeobservacion,:v_validajefe); end;');
// Asignamos los valores a los parametros

oci_bind_by_name($consulta, ':v_pemisor', $emisor);

oci_bind_by_name($consulta, ':v_jefeobservacion', $jefeobservacion, 50);
oci_bind_by_name($consulta, ':v_validajefe', $validajefe, 50);

$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);

oci_execute($consulta, OCI_DEFAULT);
if (isset($clob)) {
    $json = $clob->read($clob->size());
    //echo '{"Permisos":['.$json.'],[{"jefeobservacion":"'.$jefeobservacion.'"},{"validajefe":"'.$validajefe.'"}]';
    //echo '{"Permisos":['.$json.',{"jefeobservacion":"'.$jefeobservacion.'"},{"validajefe":"'.$validajefe.'"}]}';
    $permisos = json_decode($json);
    echo json_encode([
    	"Permisos" => array_reverse($permisos),
    	"Datos" => [
    		[
    			"jefeobservacion" => $jefeobservacion
    		],
    		[
    			"validajefe" => $validajefe
    		]
    	]
    ]);
    // echo '{"Permisos":' . $json . ',"Datos":[{"jefeobservacion":"' . $jefeobservacion . '"},{"validajefe":"' . $validajefe . '"}]}';
} else {
    echo 0;
}
oci_close($c);
