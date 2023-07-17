<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
  $emisor =$_GET['cedula'];
  $cursor = oci_new_cursor($c);
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_AU.P_MOSTRAR_HISTORICO_PERMISOS(:v_pemisor,:v_out); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pemisor',$emisor);

	oci_bind_by_name($consulta, ':v_out', $cursor, -1, OCI_B_CURSOR);
	

	oci_execute($consulta,OCI_DEFAULT);
	oci_execute($cursor, OCI_DEFAULT);

	$datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_close($c);

	$datosFormateados = null;

	foreach ($datos as $dato) {
		if ($datosFormateados === null) {
			$datosFormateados = [];
		}

		array_push($datosFormateados, [
			'Radicado' => $dato['CASN_NUMERO'],
			'TipodePermiso' => $dato['MOTC_NOMBRE'],
			'FechaInicio' => $dato['CASF_ENTREGA'],
			'FechaFin' => $dato['CASF_CIERRE'],
			'Estado' => $dato['CASC_STATUS']
		]);
	}

	echo json_encode($datosFormateados);