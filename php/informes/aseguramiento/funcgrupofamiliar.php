<?php


require_once('../../config/0_conexion.php');




$fecini=$_GET['s_fechainiGrupoFami'];
$fecfin=$_GET['s_fechafinGrupoFami'];
$cont=0;


header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=ReporteBusqGrupo".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>



<h1>Reporte Consolidado Llamadas Realizadas Por Seccional
	<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

	<table cellspacing="0" cellpadding="0"  border="1" align="center">
		<tr>
			
			<th>Seccional</th>
			<th>Cantidad</th>
			
		</tr>
		
		<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
		$selectConsolPila= "EXEC afiplan_reportegrupofamiliar 'FU', '$fecini', '$fecfin' ";
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
			$cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
			echo "<tr>";
			echo "<td>";
			echo "$NombreSeccional";
			echo "</td>";
			echo "<td>";
			echo "$cantidad";
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
				<th>Cantidad</th>
				
			</tr>
			
			<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
			$selectConsolPila= "EXEC afiplan_reportegrupofamiliar 'FS', '$fecini', '$fecfin' ";
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
				$selectConsolPila= "EXEC afiplan_reportegrupofamiliar 'CL', '$fecini', '$fecfin' ";
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


			<h1>Reporte Consolidado Llamadas Respuesta Afiliado
				<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>

				<table cellspacing="0" cellpadding="0"  border="1" align="center">
					<tr>
						
						<th>Respuesta</th>
						<th>Cantidad</th>
						
					</tr>
					
					<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
					$selectConsolPila= "EXEC afiplan_reportegrupofamiliar 'CA', '$fecini', '$fecfin' ";
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
						$cantidad = $rows['Cantidad'];


		//comienzo a crear las filas con los datos de la BD
						echo "<tr>";
						echo "<td>";
						echo "$Respuesta";
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



			<h1>Reporte Detalle Llamadas Realizadas</h1>
			<h3>Parametros Del Reporte: Rango <?php echo $fecini?> A <?php echo $fecfin?></h3>
			
			<table cellspacing="0" cellpadding="0"  border="1" align="center">
				<tr>
					
					<th>Llamada</th>
					<th>Opcion Usuario</th>
					<th>Conformacion Grupo Familiar</th>
					<th>Gestion Soporte</th>
					<th>UsuarioRegistra</th>
					<th>FechaRegistro</th>
					<th>DocumentoAfiliado</th>
					<th>Validacion Soportes de Afiliacion</th>
					<th>Actualizacion Datos</th>
					<th>Seccional</th>
					<th>Municipio</th>
					<th>Descripcion</th>
					
				</tr>
				

				<?php

	//Hago la consulta SQL, selecciono todos los datos de usuario
				$selectConsolPila= "EXEC afiplan_reportegrupofamiliar 'DET', '$fecini', '$fecfin' ";
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
					$ConocimientoTraslado = $rows['ConocimientoTraslado'];
					$ConocimientoAfiliacion = $rows['ConocimientoAfiliacion'];
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
					echo "$ConocimientoTraslado";
					echo "</td>";

					echo "<td>";
					echo "$ConocimientoAfiliacion";
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




