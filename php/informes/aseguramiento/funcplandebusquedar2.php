<?php
      require_once('../../config/0_conexion.php');


$fecini=$_GET['s_fechainir2Call'];
$fecfin=$_GET['s_fechafinr2Call'];
$cont=0;


header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=ReporteBusqR2".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
 ?>


<h1>Reporte Solicitados Por Primera Vez R2
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Fecha Proceso</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'PV', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $FecCorte = $rows['FecCorte'];
		  $Subsidiado = $rows['Subsidiado'];
		  $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$FecCorte";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";

		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>



	<h1>Reporte Consolidado Llamadas Realizadas Por Seccional Busqueda R2
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Seccional</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'FU', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $NombreSeccional = $rows['NombreSeccional'];
		  $Subsidiado = $rows['Subsidiado'];
		  $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$NombreSeccional";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";

		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


<h1>Reporte Consolidado Llamadas Realizadas Por Usuario
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Usuario</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'FS', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Usuario'];
		  $Subsidiado = $rows['Subsidiado'];
	      $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";
				
		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>



<h1>Reporte Consolidado Llamadas Realizadas
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Llamada</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'CL', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Llamada'];
		  $Subsidiado = $rows['Subsidiado'];
	      $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";
				
		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


	<h1>Reporte Consolidado Llamadas Respuesta Afiliado
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Respuesta</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'CA', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Respuesta = $rows['Respuesta'];
		  $Subsidiado = $rows['Subsidiado'];
	      $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];

		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Respuesta";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";

		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


</table>


<h1>Reporte Consolidado Llamadas Motivo Confirma Traslado
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Respuesta</th>
	 <th>Subsidiado</th>
	 <th>Contributivo</th>
	 <th>Total</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'DAT', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Motivo = $rows['Motivo'];
		  $Subsidiado = $rows['Subsidiado'];
	      $Contributivo = $rows['Contributivo'];
		  $Total = $rows['Total'];

		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Motivo";
		echo "</td>";
			echo "<td>";
			echo "$Subsidiado";
			echo "</td>";

		echo "<td>";
		echo "$Contributivo";
		echo "</td>";
			echo "<td>";
			echo "$Total";
			echo "</td>";				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


</table>



	<h1>Reporte Detalle Llamadas Realizadas</h1>
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>
	 
	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Llamada</th>
	 <th>Respuesta</th>
	 <th>Conocimiento Traslado</th>
	 <th>Desiste Traslado</th>
	 <th>Actualiza Datos</th>
	 <th>Motivo Traslado</th>
	 <th>Causal Traslado</th>
	 <th>Actividad Eps</th>
	 <th>Eps Solicita</th>
	 <th>Regimen Eps Solicita</th>
	 <th>Documento Afiliado</th>
	 <th>Nombre Afiliado</th>
	 <th>Direccion Afiliado</th>
	 <th>Telefono Afiliado</th>
	 <th>Regimen Oasis</th>
	 <th>Aprobado Traslado</th>
	 <th>Fecha Inicio Upc Traslado</th>
	 <th>Fecha Aprobacion Traslado</th>
	 <th>Codigo Municipio Afiliado</th>
	 <th>Seccional Afiliado</th>
 	 <th>Municipio Afiliado</th>
 	 <th>Seccional Usuario Registra</th>
 	 <th>Usuario Registra</th>
 	 <th>Fecha Registro</th>
 	 <th>Descripcion</th>
 
	 </tr>




	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reporter2callcenter 'DET', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);


	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{

												

	//Contamos las afiliaciones
	$cont=$cont+1;

	      $Llamada = $rows['Llamada'];
		  $Respuesta = $rows['Respuesta'];
		  $ConocimientoTraslado = $rows['ConocimientoTraslado'];
	      $DesisteTraslado = $rows['DesisteTraslado'];
		  $ActualizaDatos = $rows['ActualizaDatos'];
		  $MotivoTraslado = $rows['MotivoTraslado'];
	      $CausalTraslado = $rows['CausalTraslado'];
	      $ActividadEps = $rows['ActividadEps'];
	      $Eps = $rows['Eps'];
	      $RegimenEps = $rows['RegimenEps'];     
		  $DocumentoAfiliado = $rows['DocumentoAfiliado'];
		  $NombreAfiliado = $rows['NombreAfiliado'];
		  $DireccionAfiliado = $rows['DireccionAfiliado'];
		  $TelefonoAfiliado = $rows['TelefonoAfiliado'];
		  $RegimenActualOasis = $rows['RegimenActualOasis'];	  
	      $AprobadoTraslado = $rows['AprobadoTraslado'];
	      $FechaInicipioUpcTraslado = $rows['FechaInicipioUpcTraslado'];
	      $FechaAprobacionTraslado = $rows['FechaAprobacionTraslado'];
		  $CodMuni = $rows['CodMuni'];
		  $SeccionalAfiliado = $rows['SeccionalAfiliado'];
		  $MunicipioAfiliado = $rows['MunicipioAfiliado'];
		  $SeccionalUsuarioRegistra = $rows['SeccionalUsuarioRegistra'];
		  $UsuarioRegistra = $rows['UsuarioRegistra'];
		  $FechaRegistro = $rows['FechaRegistro'];
		  $Descripcion = $rows['Descripcion'];

						

		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Llamada";
		echo "</td>";
			echo "<td>";
			echo "$Respuesta";
			echo "</td>";
				echo "<td>";
				echo "$ConocimientoTraslado";
				echo "</td>";

		echo "<td>";
		echo "$DesisteTraslado";
		echo "</td>";
			echo "<td>";
			echo "$ActualizaDatos";
			echo "</td>";
				echo "<td>";
				echo "$MotivoTraslado";
				echo "</td>";


		echo "<td>";
		echo "$CausalTraslado";
		echo "</td>";


			echo "<td>";
			echo "$ActividadEps";
			echo "</td>";

			echo "<td>";
			echo "$Eps";
			echo "</td>";

			echo "<td>";
			echo "$RegimenEps";
			echo "</td>";

			echo "<td>";
			echo "$DocumentoAfiliado";
			echo "</td>";

			echo "<td>";
			echo "$NombreAfiliado";
			echo "</td>";
			
			echo "<td>";
			echo "$DireccionAfiliado";
			echo "</td>";

			echo "<td>";
			echo "$TelefonoAfiliado";
			echo "</td>";			

			echo "<td>";
			echo "$RegimenActualOasis";
			echo "</td>";			

			echo "<td>";
			echo "$AprobadoTraslado";
			echo "</td>";			

			echo "<td>";
			echo "$FechaInicipioUpcTraslado";
			echo "</td>";			

			echo "<td>";
			echo "$FechaAprobacionTraslado";
			echo "</td>";			

			echo "<td>";
			echo "$CodMuni";
			echo "</td>";

			echo "<td>";
			echo "$SeccionalAfiliado";
			echo "</td>";

			echo "<td>";
			echo "$MunicipioAfiliado";
			echo "</td>";

			echo "<td>";
			echo "$SeccionalUsuarioRegistra";
			echo "</td>";

			echo "<td>";
			echo "$UsuarioRegistra";
			echo "</td>";

			echo "<td>";
			echo "$FechaRegistro";
			echo "</td>";

			echo "<td>";
			echo "$Descripcion";
			echo "</td>";


		echo "</tr>";


	 }

	//Al final imprimimos los registros que fueron generados
	echo "Cantidad de Registros: ".$cont;

	sqlsrv_free_stmt( $stmt);

	?>

	</table>




