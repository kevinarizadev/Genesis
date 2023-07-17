<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Cargue Direccionamiento" . "_" . date("dmY") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$consecutivo = $_GET['consecutivo'];
$consulta = oci_parse($c,"SELECT s.codigo,
                                s.noprescripcion,
                                s.tipotec,
                                s.contec,
                                s.tipoidpaciente,
                                s.noidpaciente,
                                s.noentrega,
                                s.nosubentrega,
                                s.tipoidprov,
                                s.noidprov,
                                s.codmunent,
                                s.fecmaxent,
                                s.canttotaentregar,
                                s.dirpaciente,
                                s.codsertecaentregar,
                                s.noaut,
                                s.fecharegistro,
                                s.responsable,
                                s.estado,
                                s.fechaestado,
                                s.id_direccionamiento,
                                s.id_transaccion,
                                s.consecutivo,
                                s.detalle_error
                                from oasis.mipres_direccionar s
                			where mk.consecutivo = :consecutivo ");
oci_bind_by_name($consulta, ':consecutivo', $consecutivo);

?>

<h1>Reporte Cargue Direccionamiento </h1>
<!--<h3>Parametros Del Reporte: Perido <?php echo $periodo ?></h3>-->

<table cellspacing="0" cellpadding="0" border="1" align="center">
	<tr>
        <TH>CODIGO</TH>
        <TH>NOPRESCRIPCION</TH>       
        <TH>TIPOIDPACIENTE</TH>
        <TH>NOIDPACIENTE</TH>
    </tr>



    <?php

    oci_execute($consulta);
    while ($rows = oci_fetch_assoc($consulta)) {
    	echo "<tr>"; 
            echo"<td>"; echo $rows['CODIGO']; echo "</td>";
            echo"<td>"; echo $rows['NOPRESCRIPCION']; echo "</td>";           
            echo"<td>"; echo $rows['TIPOIDPACIENTE']; echo "</td>";
            echo"<td>"; echo $rows['NOIDPACIENTE']; echo "</td>";
    	echo "</tr>";
    }

    oci_close($c);

    ?>

