<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de Actividades PGP " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$Bter = $_GET['Bter'];
$F_Inicio = $_GET['F_Inicio'];
$F_Fin = $_GET['F_Fin'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>TIPO</th>
        <th>DOCUMENTO</th>
        <th>NOMBRE AFILIADO</th>
        <th>UBICACION</th>
        <th>PRODUCTO</th>
        <th>CANTIDAD</th>
        <th>VALOR PRODUCTO</th>
        <th>REGIMEN</th>
        <th>CONTRATO</th>
        <th>FECHA DE PRESTACION</th>
        <th>FECHA DE REGISTRO</th>
    </tr>
    <?php

    $consulta = oci_parse($c, 'begin PQ_GENESIS_CONTRATACION.P_LISTA_REGISTRO_PGP(:v_ptercero,:v_fecha_inicio,:v_fecha_fin,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $Bter);
	oci_bind_by_name($consulta, ':v_fecha_inicio', $F_Inicio);
	oci_bind_by_name($consulta, ':v_fecha_fin', $F_Fin);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);

    
    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";
        echo $row->tipo_documento;
        echo "</td>";
        echo "<td>";
        echo $row->num_documento;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_completo;
        echo "</td>";
        echo "<td>";
        echo $row->municipio;
        echo "</td>";
        echo "<td>";
        echo $row->producto." - ".$row->nombre_producto;
        echo "</td>";
        echo "<td>";
        echo $row->cantidad;
        echo "</td>";
        echo "<td>";
        echo $row->valor_producto;
        echo "</td>";        
        echo "<td>";
        echo $row->nombre_regimen;
        echo "</td>";
        echo "<td>";
        echo $row->numero_contrato;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_prestacion;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_registro." ".$row->hora_registro;
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>