<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Cargue Suministro" . "_" . date("dmY") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$consecutivo = $_GET['consecutivo'];
$consulta = oci_parse($c,"SELECT mk.idproceso  idproceso,
                				mk.idsuministro  idsuministro,
                				mk.noprescripcion  noprescripcion,
                				mk.tipotec  tipotec,
                				mk.contec  contec,
                				mk.tipoidpaciente  tipoidpaciente,
                				mk.noidpaciente  noidpaciente,
								mk.noentrega  noentrega,
								mk.ultentrega  ultentrega,
								mk.entregacompleta  entregacompleta,
								mk.causanoentrega  causanoentrega,
								mk.noprescripcionasociada  noprescripcionasociada,
								mk.contecasociada  contecasociada,
								mk.canttotentregada  canttotentregada,
								mk.nolote  nolote,
								mk.valorentregado  valorentregado,
								mk.fecsuministro  fecsuministro,
								mk.estsuministro  estsuministro,
								mk.fecanulacion  fecanulacion,
								case mk.estado when 'R' then 'Error' when 'P' then 'Procesado' end  estado,
								nvl(mk.detalle_error,'Cargado Exitosamente') detalle,
								mk.consecutivo consecutivo
							from oasis.mipres_suministrar mk
                			where mk.consecutivo = :consecutivo ");
oci_bind_by_name($consulta, ':consecutivo', $consecutivo);

?>

<h1>Reporte Cargue Suministro </h1>
<!--<h3>Parametros Del Reporte: Perido <?php echo $periodo ?></h3>-->

<table cellspacing="0" cellpadding="0" border="1" align="center">
	<tr>

		<th>IDPROCESO</th>
		<th>IDSUMINISTRO</th>
		<th>NOPRESCRIPCION</th>
		<th>TIPOTEC</th>
		<th>CONTEC</th>
		<th>TIPOIDPACIENTE</th>
		<th>NOIDPACIENTE</th>
		<th>NOENTREGA</th>
        <th>ULTENTREGA</th>
        <th>ENTREGACOMPLETA</th>
        <th>CAUSANOENTREGA</th>
        <th>NOPRESCRIPCIONASOCIADA</th>
        <th>CONTECASOCIADA</th>
        <th>CANTTOTENTREGADA</th>
        <th>NOLOTE</th>
        <th>VALORENTREGADO</th>
        <th>FECSUMINISTRO</th>
        <th>ESTSUMINISTRO</th>
        <th>FECANULACION</th>
        <th>ESTADO</th>
        <th>Detalle</th>
        <th>CONSECUTIVO</th>
               
    </tr>



    <?php

    oci_execute($consulta);
    while ($rows = oci_fetch_assoc($consulta)) {
    	echo "<tr>"; 
	    	echo "<td>"; echo $rows['IDPROCESO']; echo "</td>";
	    	echo "<td>"; echo $rows['IDSUMINISTRO']; echo "</td>";
	    	echo "<td>"; echo $rows['NOPRESCRIPCION']; echo "</td>";
	    	echo "<td>"; echo $rows['TIPOTEC']; echo "</td>";
	    	echo "<td>"; echo $rows['CONTEC']; echo "</td>";
	    	echo "<td>"; echo $rows['TIPOIDPACIENTE']; echo "</td>";
	    	echo "<td>"; echo $rows['NOIDPACIENTE']; echo "</td>";
	    	echo "<td>"; echo $rows['NOENTREGA']; echo "</td>";
	    	echo "<td>"; echo $rows['ULTENTREGA']; echo "</td>";
	    	echo "<td>"; echo $rows['ENTREGACOMPLETA']; echo "</td>";
	    	echo "<td>"; echo $rows['CAUSANOENTREGA']; echo "</td>";
	    	echo "<td>"; echo $rows['NOPRESCRIPCIONASOCIADA']; echo "</td>";
	    	echo "<td>"; echo $rows['CONTECASOCIADA']; echo "</td>";
	    	echo "<td>"; echo $rows['CANTTOTENTREGADA']; echo "</td>";
	    	echo "<td>"; echo $rows['NOLOTE']; echo "</td>";
	    	echo "<td>"; echo $rows['VALORENTREGADO']; echo "</td>";
	    	echo "<td>"; echo $rows['FECSUMINISTRO']; echo "</td>";
	    	echo "<td>"; echo $rows['ESTSUMINISTRO']; echo "</td>";
	    	echo "<td>"; echo $rows['FECANULACION']; echo "</td>";
	    	echo "<td>"; echo $rows['ESTADO']; echo "</td>";
	    	echo "<td>"; echo $rows['DETALLE']; echo "</td>";
	    	echo "<td>"; echo $rows['CONSECUTIVO']; echo "</td>";
    	echo "</tr>";
    }

    oci_close($c);

    ?>