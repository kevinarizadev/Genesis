<?php
require_once('../../config/0_conexion.php');


$fecini=$_GET['s_fechainiConCall'];
$fecfin=$_GET['s_fechafinConCall'];
$cont=0;


header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=ReporteBusqContri".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
 ?>



	<h1>Reporte Consolidado Llamadas Realizadas Por Usuario
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Funcionario</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'FU', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['strNombresUsuario'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
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
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CL', '$fecini', '$fecfin' ";
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
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


	<h1>Reporte Consolidado Llamadas Calificacion Servicio
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Calificacion</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CA', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Calificacion'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


</table>


	<h1>Reporte Consolidado Llamadas Malestar con el Servicio
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Causal</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CAP', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Gestion'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>

	<h1>Reporte Consolidado Llamadas Inconformidad con el Servicio Tramites Medicos
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Tipo Causal</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CAS', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Causal'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>

<h1>Reporte Consolidado Llamadas Inconformidad con el Servicio Tramites Prestaciones Economicas
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Tipo Causal</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CAI', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Causal'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>

	<h1>Reporte Consolidado Llamadas Inconformidad con el Servicio Tramites Atencion Al Cliente
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Tipo Causal</th>
	 <th>Cantidad</th>
	 	 
	 </tr>
	 
	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'CAC', '$fecini', '$fecfin' ";
	$stmt=sqlsrv_query($conn,$selectConsolPila);

	//En caso de Error Optiene el error y lo muestra
	if( $stmt === false) {
	    die( print_r( sqlsrv_errors(), true) );
	}

	//con un while recorro toda la tabla capturando los registros y
	//mostrandolo en un html, creado dinamicamente
	while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
	{
	      $Usuario = $rows['Causal'];
		  $cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Usuario";
		echo "</td>";
			echo "<td>";
			echo "$cantidad";
			echo "</td>";
				
		
		echo "</tr>";


	 }

	sqlsrv_free_stmt( $stmt);

	?>

	</table>


	<h1>Reporte Detalle Llamadas Realizadas</h1>
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>
	 
	<table cellspacing="0" cellpadding="0"  border="1" align="center">
	 <tr>
	 
	 <th>Llamada</th>
	 <th>Calificacion</th>
	 <th>Causal</th>
	 <th>TipoCausal</th>
	 <th>UsuarioRegistra</th>
	 <th>FechaRegistro</th>
	 <th>DocumentoAfiliado</th>
	 <th>SolicitaTraslado</th>
	 <th>ConocimientoTraslado</th>
	 <th>ConocimientoAfiliacion</th>
	 <th>CodMuni</th>
	 <th>Seccional</th>
	 <th>Municipio</th>
	 <th>Descripcion</th>
	 
	 </tr>
	 												

	<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
	$selectConsolPila= "EXEC afiplan_reportecontributivocallcenter 'DET', '$fecini', '$fecfin' ";
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
		  $Calificacion = $rows['Calificacion'];
		  $Causal = $rows['Causal'];
	      $TipoCausal = $rows['TipoCausal'];
		  $UsuarioRegistra = $rows['UsuarioRegistra'];
		  $FechaRegistro = $rows['FechaRegistro'];
	      $DocumentoAfiliado = $rows['DocumentoAfiliado'];
	      $SolicitaTraslado = $rows['SolicitaTraslado'];
	      $ConocimientoTraslado = $rows['ConocimientoTraslado'];
	      $ConocimientoAfiliacion = $rows['ConocimientoAfiliacion'];
	      $CodMuni = $rows['CodMuni'];
	      $Seccional = $rows['Seccional'];
		  $Municipio = $rows['Municipio'];
		  $Descripcion = $rows['Descripcion'];
		 


		//comienzo a crear las filas con los datos de la BD
		echo "<tr>";
		echo "<td>";
		echo "$Llamada";
		echo "</td>";
			echo "<td>";
			echo "$Calificacion";
			echo "</td>";
				echo "<td>";
				echo "$Causal";
				echo "</td>";

		echo "<td>";
		echo "$TipoCausal";
		echo "</td>";
			echo "<td>";
			echo "$UsuarioRegistra";
			echo "</td>";
				echo "<td>";
				echo "$FechaRegistro";
				echo "</td>";


		echo "<td>";
		echo "$DocumentoAfiliado";
		echo "</td>";

		echo "<td>";
		echo "$SolicitaTraslado";
		echo "</td>";

			echo "<td>";
			echo "$ConocimientoTraslado";
			echo "</td>";

			echo "<td>";
			echo "$ConocimientoAfiliacion";
			echo "</td>";

			echo "<td>";
			echo "$CodMuni";
			echo "</td>";

			echo "<td>";
			echo "$Seccional";
			echo "</td>";

			echo "<td>";
			echo "$Municipio";
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




