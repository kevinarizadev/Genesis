<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Cargue Suministro" . "_" . date("dmY") . ".xls");
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
        <TH>TIPOTEC</TH>
        <TH>CONTEC</TH>
        <TH>TIPOIDPACIENTE</TH>
        <TH>NOIDPACIENTE</TH>
        <TH>NOENTREGA</TH>
        <TH>NOSUBENTREGA</TH>
        <TH>TIPOIDPROV</TH>
        <TH>NOIDPROV</TH>
        <TH>CODMUNENT</TH>
        <TH>FECMAXENT</TH>
        <TH>CANTTOTAENTREGAR</TH>
        <TH>DIRPACIENTE</TH>
        <TH>CODSERTECAENTREGAR</TH>
        <TH>NOAUT</TH>
        <TH>FECHAREGISTRO</TH>
        <TH>RESPONSABLE</TH>
        <TH>ESTADO</TH>
        <TH>FECHAESTADO</TH>
        <TH>ID_DIRECCIONAMIENTO</TH>
        <TH>ID_TRANSACCION</TH>
        <TH>CONSECUTIVO</TH>
        <TH>DETALLE_ERROR</TH>
    </tr>



    <?php

    oci_execute($consulta);
    while ($rows = oci_fetch_assoc($consulta)) {
    	echo "<tr>"; 
            echo"<td>"; echo $rows['CODIGO']; echo "</td>";
            echo"<td>"; echo $rows['NOPRESCRIPCION']; echo "</td>";
            echo"<td>"; echo $rows['TIPOTEC']; echo "</td>";
            echo"<td>"; echo $rows['CONTEC']; echo "</td>";
            echo"<td>"; echo $rows['TIPOIDPACIENTE']; echo "</td>";
            echo"<td>"; echo $rows['NOIDPACIENTE']; echo "</td>";
            echo"<td>"; echo $rows['NOENTREGA']; echo "</td>";
            echo"<td>"; echo $rows['NOSUBENTREGA']; echo "</td>";
            echo"<td>"; echo $rows['TIPOIDPROV']; echo "</td>";
            echo"<td>"; echo $rows['NOIDPROV']; echo "</td>";
            echo"<td>"; echo $rows['CODMUNENT']; echo "</td>";
            echo"<td>"; echo $rows['FECMAXENT']; echo "</td>";
            echo"<td>"; echo $rows['CANTTOTAENTREGAR']; echo "</td>";
            echo"<td>"; echo $rows['DIRPACIENTE']; echo "</td>";
            echo"<td>"; echo $rows['CODSERTECAENTREGAR']; echo "</td>";
            echo"<td>"; echo $rows['NOAUT']; echo "</td>";
            echo"<td>"; echo $rows['FECHAREGISTRO']; echo "</td>";
            echo"<td>"; echo $rows['RESPONSABLE']; echo "</td>";
            echo"<td>"; echo $rows['ESTADO']; echo "</td>";
            echo"<td>"; echo $rows['FECHAESTADO']; echo "</td>";
            echo"<td>"; echo $rows['ID_DIRECCIONAMIENTO']; echo "</td>";
            echo"<td>"; echo $rows['ID_TRANSACCION']; echo "</td>";
            echo"<td>"; echo $rows['CONSECUTIVO']; echo "</td>";
            echo"<td>"; echo $rows['DETALLE_ERROR']; echo "</td>";
    	echo "</tr>";
    }

    oci_close($c);

    ?>