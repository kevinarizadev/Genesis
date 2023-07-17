<?php

require_once('../../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="POLIZA_LMA_'.$_GET["periodo"].'.txt"');
$consulta = oci_parse($c,"select REGISTRO from eview_poliza_lma where periodo2 = :periodo");
oci_bind_by_name($consulta, ":periodo", $_GET["periodo"]);
oci_execute($consulta);	

$row = array();
while( $rows = oci_fetch_assoc($consulta)) {
	echo $rows['REGISTRO'] . "\n";
}
oci_close($c);

?>