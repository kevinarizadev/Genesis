<?php

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$function = $data['function'];

if (isset($function)) {
	$function();
}

function obtenerTipo () {
	require_once('../config/dbcon_prod.php');

	$cursor = oci_new_cursor($c);

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_tipo_reporte (
		:v_response
	); end;'
);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	$json = $clob->read($clob->size());

	oci_close($c);

	header('Content-Type: application/json');
	echo $json;
}

function obtenerLista () {
	global $data;
	require_once('../config/dbcon_prod.php');

	$fecha_inicio = $data['fecha_inicio'] ?? null;
	$fecha_fin = $data['fecha_fin'] ?? null;
	$reporte = $data['informe'];

	if ($reporte == 'GS') {
		$fecha_inicio = '01/04/2020';

		$dia_semana = date('w');

		$fecha = new DateTime();

		switch ($dia_semana) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			$fecha_fin = $fecha->sub(new DateInterval('P0Y0M' . ($dia_semana + 1) . 'D'))->format('d/m/Y');
			break;			
			case 6:
			$fecha_fin = $fecha->format('Y/m/d');
			break;
			case 7:
			$fecha_fin = $fecha->sub(new DateInterval('P0Y0M1D'))->format('d/m/Y');
			break;
		}
	}

	$cursor = oci_new_cursor($c);

	$consulta = oci_parse(
		$c,
		'begin pq_genesis_salud_publica.p_listar_reporte (
		:v_tipo_informe,
		:v_fecha_inicial,
		:v_fecha_final,
		:v_response
	); end;'
);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_tipo_informe', $reporte);
	oci_bind_by_name($consulta, ':v_fecha_inicial', $fecha_inicio);
	oci_bind_by_name($consulta, ':v_fecha_final', $fecha_fin);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta, OCI_DEFAULT);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = null;
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_close($c);

	//header('Content-Type: application/json');
	// echo json_encode($datos);

	if ($reporte === 'PT017') {
		echo '<table cellspacing="0" cellpadding="0"  border="1" align="center">
		<tr>
		<th>NIT_LAB</th>
		<th>COD_DIVIPOLA</th>
		<th>N_JURIDICA_LAB</th>
		<th>MUESTRAS_LAB</th>
		<th>PRUEBAS_DX_LAB</th>
		<th>RESULTADOS_LAB</th>
		<th>TIEMPO_PROM_LAB</th>
		</tr>';

		foreach ($datos as $row) 
		{
			echo "<tr>";
			echo "<td>"; echo$row['NIT_LAB']; echo "</td>";
			echo "<td>"; echo$row['COD_DIVIPOLA']; echo "</td>";
			echo "<td>"; echo$row['N_JURIDICA_LAB']; echo "</td>";
			echo "<td>"; echo$row['MUESTRAS_LAB']; echo "</td>";
			echo "<td>"; echo$row['PRUEBAS_DX_LAB']; echo "</td>";
			echo "<td>"; echo$row['RESULTADOS_LAB']; echo "</td>";
			echo "<td>"; echo$row['TIEMPO_PROM_LAB']; echo "</td>";
			echo "</tr>";
		}
	}

	if ($reporte === 'PT026') {
		echo '<table cellspacing="0" cellpadding="0"  border="1" align="center">
		<tr>
		<th>REGIMENEAPB</th>
		<th>UBGN_CODIGO</th>
		<th>TOTALPRUEBASRT</th>
		<th>FECHA PRUEBASPOSRT</th>
		<th>TOTALPRUEBASAC</th>
		<th>PRUEBASPOSAC</th>
		<th>TOTALPRUEBASAG</th>
		<th>PRUEBASPOSAG</th>
		</tr>';

		foreach ($datos as $row) 
		{
			echo "<tr>";
			echo "<td>"; echo$row['REGIMENEAPB']; echo "</td>";
			echo "<td>"; echo$row['UBGN_CODIGO']; echo "</td>";
			echo "<td>"; echo$row['TOTALPRUEBASRT']; echo "</td>";
			echo "<td>"; echo$row['PRUEBASPOSRT']; echo "</td>";
			echo "<td>"; echo$row['TOTALPRUEBASAC']; echo "</td>";
			echo "<td>"; echo$row['PRUEBASPOSAC']; echo "</td>";
			echo "<td>"; echo$row['TOTALPRUEBASAG']; echo "</td>";
			echo "<td>"; echo$row['PRUEBASPOSAG']; echo "</td>";
			echo "</tr>";
		}
	}

	if ($reporte === 'PT024') {

		foreach ($datos as $row) {
			echo $row['REGIMENEAPB1']; echo "|";
			echo $row['NUMMUERTES']; echo "|";
			echo $row['MUESTRASMUERTES']; echo "|";
			echo $row['TOTALPRUEBASRT']; echo "|";
			echo $row['TOTALPRUEBASAG']; echo "|";
			echo $row['TOTALPRUEBASAC']; echo "|";
			echo $row['PRUEBASPRIOROZADOS']; echo "|";
			echo $row['PRUEBASPOSPRIOR']; echo "|";
			echo $row['PRUEBASACPRIOR']; echo "|";
			echo $row['PRUEBASACPOSPRIOR']; echo "|";
			echo $row['IPSBAI']; echo "|";
			echo $row['IPSBAISOSP']; echo "|";
			echo $row['PRUEBABAI']; echo "|";
			echo $row['PRUEBASPOSBAI']; echo "|";
			echo $row['PRUEBABAIAC']; echo "|";
			echo $row['PRUEBAPOSBAIAC']; echo "|";
			if (strlen($row['TIEMPOPROMRT']) === 4) {
				echo $row['TIEMPOPROMRT'];
			} else {
				if (strlen($row['TIEMPOPROMRT']) > 4) {
					echo substr($row['TIEMPOPROMRT'], 0, 4);
				} else {
					if (strpos(',', $row['TIEMPOPROMRT']) > -1) {
						echo str_pad($row['TIEMPOPROMRT'], 4, '0');	
					} else {
						echo str_pad($row['TIEMPOPROMRT'] . ',', 4, '0');
					}
					
				}
			}
			
			echo "\r\n";
		}
		exit();
	}

	if ($reporte === 'GS') {
		echo '<table cellspacing="0" cellpadding="0"  border="1" align="center">';
		echo '<tr> 
		<th>  NOMBRE EPS</th>
		<th>  FECHA DE CORTE EPS</th>
		<th>  DESCRIPCION</th>
		<th>  TOTAL PRUEBAS REALIZADAS</th>
		<th>  NUMERO DE PRUEBAS CON REPORTE DE RESULTADOS</th>
		<th> NÚMERO_DE_REPORTE_DE_RESULTADOS_POSITIVO </th>
		</tr>';

		foreach ($datos as $row) {
			echo "<tr>";
			echo "<td>"; echo $row['NOMBRE_EPS']; echo "</td>";
			echo "<td>"; echo $row['CORTE_EPS']; echo "</td>";
			echo "<td>"; echo $row['DESCRIPCION']; echo "</td>";
			echo "<td>"; echo $row['TOTAL_PRUEBAS_REALIZADAS']; echo "</td>";
			echo "<td>"; echo $row['NUMERO_DE_PRUEBAS_CON_REPORTE_DE_RESULTADOS']; echo "</td>";
			echo "<td>"; echo $row['NÚMERO_DE_REPORTE_DE_RESULTADOS_POSITIVO']; echo "</td>";	
			echo "</tr>";
		}
	}


	echo '</table>';
}