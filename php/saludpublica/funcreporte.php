<?php

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$function = $data['function'];

if (isset($function)) {
	$function();
}

function obtenerLista () {
	global $data;
	require_once('../config/dbcon_prod.php');

	$fecha_inicio = $data['fecha_inicio'] ?? null;
	$fecha_fin = $data['fecha_fin'] ?? null;

	$cursor = oci_new_cursor($c);

	$consulta = oci_parse(
	    $c,
	    'begin pq_genesis_salud_publica.p_informe_covid19  (
	    	:v_fecha_inicial,
	    	:v_fecha_final,
	        :v_response
	    ); end;'
	);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_fecha_inicial', $fecha_inicio);
	oci_bind_by_name($consulta, ':v_fecha_final', $fecha_fin);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta, OCI_DEFAULT);
	oci_execute($cursor, OCI_DEFAULT);
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_close($c);

		echo '<table cellspacing="0" cellpadding="0"  border="1" align="center">
    <tr>
        <th>TIPO</th>
        <th>DOCUMENTO</th>
        <th>PRIMER APELLIDO</th>
        <th>SEGUNDO APELLIDO</th>
        <th>PRIMER NOMBRE</th>
        <th>SEGUNDO NOMBRE</th>

        <th>GENERO</th>

        <th>FECHA SEGUIMIENTO</th>
        <th>FECHA TOMA MUESTRA</th>
        <th>FECHA RESULTADO</th>
        <th>ESTADO COVID</th>
        <th>CONDICION FINAL</th>
        <th>TIPO PRUEBA</th>
        <th>LABORATORIO</th>
        <th>IPS ATENCION</th>

        <th>DEPARTAMENTO</th>
        <th>MUNICIPIO</th>
        <th>REGIMEN</th>



    </tr>';

     		foreach ($datos as $row) 
{
	echo "<tr>";
    echo "<td>"; echo$row['TIPO']; echo "</td>";
	echo "<td>"; echo$row['DOCUMENTP']; echo "</td>";
	echo "<td>"; echo$row['PRIMER_APELLIDO']; echo "</td>";
	echo "<td>"; echo$row['SEGUNDO_APELLIDO']; echo "</td>";
	echo "<td>"; echo$row['PRIMER_NOMBRE']; echo "</td>";
	echo "<td>"; echo$row['SEGUNDO_NOMBRE']; echo "</td>";
	echo "<td>"; echo$row['GENERO']; echo "</td>";
	echo "<td>"; echo$row['FECHA_SEGUIMINETO']; echo "</td>";
	echo "<td>"; echo$row['FECHA_TOMA_MUESTRA']; echo "</td>";
	echo "<td>"; echo$row['FECHA_RESULTADO']; echo "</td>";
	echo "<td>"; echo$row['ESTADO_COVID']; echo "</td>";
	echo "<td>"; echo$row['CONDICION_FINAL_COVID']; echo "</td>";
	echo "<td>"; echo$row['TIPO_PRUEBA']; echo "</td>";
	echo "<td>"; echo$row['LABORATORIO']; echo "</td>";
	echo "<td>"; echo$row['IPS_ATENCION']; echo "</td>";
	echo "<td>"; echo$row['DEPARTAMENTO']; echo "</td>";
	echo "<td>"; echo$row['MUNICIPIO']; echo "</td>";
	echo "<td>"; echo$row['REGIMEN']; echo "</td>";
	
	
	echo "</tr>";
 }


	echo '</table>';
}