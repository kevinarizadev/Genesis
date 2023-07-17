<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set ('memory_limit', '256M');
ini_set ('max_execution_time', 0);
ini_set('max_execution_time', 300);
header('Access-Control-Allow-Origin: *');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
global $request,$errores;
$ruta = $request->ruta;
$file = fopen($ruta, "r+");
$errores = array();
$arreglo = array();
$contador = 0;
while (!feof($file))  {
	$getTextLine = fgets($file);
	$explodeLine = explode(",",$getTextLine);
	$contador++;
	$linea = $contador;
	// Valido la estructura del archivo
	if (count($explodeLine) != 3) {
		$errores[] = (object) [
			'linea' => $linea,
			'columna' => 'Revisar Todas las Columnas',			
			'status_cod' => 0,
			'error' => count($explodeLine),
			'name_error' => 'Numero de columnas incorrectas.'
		];
	} else {
		list($novedad,$numero,$ubicacion) = $explodeLine;
		$cadenaValida = $linea.$novedad.$numero.$ubicacion;
		$validar= "/(?=[.,;()_-])/";
		$caracteres = preg_match($validar, $cadenaValida);
		//Valido Caracteres especiales
		if ($caracteres === 1) {
			$errores[] = (object) [
				'linea' => $linea,
				'columna' => 'Revisar Todas las Columnas',
				'status_cod' => 1,
				'error' => trim($cadenaValida),
				'name_error' => 'Revisar Caracteres Especial por favor validar el archivo.'
			];
		}
		$arreglo[] = (object) [
			'linea' => $linea,
			'novedad' => $novedad,
			'numero' => $numero,
			'ubicacion' => trim($ubicacion)
		]; 

	}	
}
fclose($file);


ValidarArchivos($arreglo,$errores,$ruta);

function ValidarArchivos($datos,$error,$file) {
	if (count($error)=== 0) {
		$Validacion = array();
		$expr = "/^[0-9]*$/";
		for ($i=0; $i < count($datos) ; $i++) {
			$linea_arreglo = $datos[$i]->linea;
			$novedad_arreglo = $datos[$i]->novedad;
			$numero_arreglo = $datos[$i]->numero;
			$ubicacion_arreglo = $datos[$i]->ubicacion;
			// $res = array('codigo' => 0, 'status_codigo' => 2, 'mensaje' => 'Archivo Validado Correctamente.');
			// echo json_encode($res);

				//Validacion Longitud Novedad
			if (strlen($novedad_arreglo) != 3) {
				$Validacion[] = (object) [
					'linea' => $linea_arreglo,
					'columna' => '2',
					'status_cod' => 4,
					'error' => $novedad_arreglo,
					'name_error' => 'La longitud de la novedad es incorrecto.'
				]; 
			}

				//Validacion Ubicacion Novedad - Solo Nacional
			if (strlen(trim($ubicacion_arreglo)) === 1){
				if ($ubicacion_arreglo =! 1) {
					$Validacion[] = (object) [
						'linea' => $linea_arreglo,
						'columna' => '4',						
						'status_cod' => 5,
						'error' => 'Ubicacion Erronea: '.$ubicacion_arreglo,
						'name_error' => 'La Ubicacion no cumple con la longitud.'
					]; 
				}
			}

				//Validacion Ubicacion Novedad - Longituid 4 Y Longintud 5
			if (strlen(trim($ubicacion_arreglo)) === 4  ) {
				// Valido que la ubicacion comience con 8
				if (substr(trim($ubicacion_arreglo),0,1) !=8) {
					$Validacion[] = (object) [
						'linea' => $linea_arreglo,
						'columna' => '4',						
						'status_cod' => 6,
						'error' => 'Ubicacion Erronea: '.$ubicacion_arreglo,
						'name_error' => 'La Ubicacion no cumple con la longitud.'
					]; 
				}
			}
				// Valido que la ubicacion comience con los dos digito de la seccionales.
			if (strlen(trim($ubicacion_arreglo)) === 5 ) {
				if (substr(trim($ubicacion_arreglo),0,2) ==='20' || substr(trim($ubicacion_arreglo),0,2) ==='50' || 
					substr(trim($ubicacion_arreglo),0,2) ==='13' || substr(trim($ubicacion_arreglo),0,2) ==='23' || 
					substr(trim($ubicacion_arreglo),0,2) ==='70' || substr(trim($ubicacion_arreglo),0,2) ==='47' ||
					substr(trim($ubicacion_arreglo),0,2) ==='44' || substr(trim($ubicacion_arreglo),0,2) ==='15') {

				} else {
					$Validacion[] = (object) [
						'linea' => $linea_arreglo,
						'columna' => '4',
						'status_cod' => 7,
						'error' => 'Ubicacion Validada: '.$ubicacion_arreglo.' -> Ubicacion: ' .substr(trim($ubicacion_arreglo),0,2),
						'name_error' => 'La Ubicacion no cumple con la longitud.'
					]; 
				}
			}
				// Valido las longitud de la ubicaciones
			if (strlen(trim($ubicacion_arreglo)) === 2 || strlen(trim($ubicacion_arreglo)) === 3 || strlen(trim($ubicacion_arreglo)) > 5 ) {
				$Validacion[] = (object) [
					'linea' => $linea_arreglo,
					'columna' => '4',					
					'status_cod' => 8,
					'error' => 'Ubicacion Erronea: '.$ubicacion_arreglo,
					'name_error' => 'La Ubicacion no cumple con la longitud.'
				]; 
			}

				// Validamos que la ubicacion no contenga letras o caracter especiales
			if (preg_match($expr, $ubicacion_arreglo) === 0) {
				$Validacion[] = (object) [
					'linea' => $linea_arreglo,
					'columna' => '4',					
					'status_cod' => 9,
					'error' => 'Ubicacion: '.$ubicacion_arreglo,
					'name_error' => 'La Ubicacion presenta letras o caracteres especiales.'
				]; 
			}

				// Validamos que la ubicacion no contenga letras o caracter especiales
			if (preg_match($expr, $numero_arreglo) === 0) {
				$Validacion[] = (object) [
					'linea' => $linea_arreglo,
					'columna' => '4',					
					'status_cod' => 10,
					'error' => 'Numero de la Novedad: '.$numero_arreglo,
					'name_error' => 'El Numero de la novedad presenta letras o caracteres especiales.'
				]; 
			}
		}

		if (count($Validacion) === 0){
			ValidacionDeCarga($datos);
		} else {
			$deleteArchivo = EliminarArchivos($file);
			if ($deleteArchivo === 0) {
				$res = array('codigo'=>4,'status_codigo'=> 4,'mensaje'=>'Inconveniente Validando La Informacion del Archivo.','error' => $Validacion);
				echo json_encode($res);	
			} else {
				$res = array('codigo'=>3,'status_codigo'=> 3,'mensaje'=>'Error Intentando depurar el archivo.','error' => $error);
				echo json_encode($res);	
			}
		}
	} else {
		$deleteArchivo = EliminarArchivos($file);
		if ($deleteArchivo === 0) {
			$res = array('codigo'=>2,'status_codigo'=> 2,'mensaje'=>'El archivo presenta errores de estructura.','error' => $error);
			echo json_encode($res);	
		} else {
			$res = array('codigo'=>3,'status_codigo'=> 3,'mensaje'=>'Error Intentando depurar el archivo.','error' => $error);
			echo json_encode($res);	
		}
	}
} 


function ValidacionDeCarga($datos){
	require_once('../../config/dbcon_prod.php');
	global $request;
	$actualizados = array();
	$errores_actualizando = array();
	for ($i=0; $i < count($datos) ; $i++) {
		$linea_arreglo = $datos[$i]->linea;
		$novedad_arreglo = $datos[$i]->novedad;
		$numero_arreglo = $datos[$i]->numero;
		$ubicacion_arreglo = $datos[$i]->ubicacion;
		$consulta = oci_parse($c,"SELECT COUNT(1) FROM ENOV_NOVEDAD WHERE NOVN_UBICACION =:v_ubicacion AND NOVN_NUMERO = :v_numero AND NOVC_CONCEPTO = :v_novedad");
		oci_bind_by_name($consulta,':v_numero',$numero_arreglo);
		oci_bind_by_name($consulta,':v_novedad',$novedad_arreglo);
		oci_bind_by_name($consulta,':v_ubicacion',$ubicacion_arreglo);
		oci_execute($consulta,OCI_DEFAULT);
		oci_execute($consulta);
		while (($row = oci_fetch_array($consulta, OCI_NUM)) != false) {
			$res =$row[0];
			// echo json_encode($res);
			if ($res === "0") {
				$errores_actualizando[] = (object) [
					'linea' => $linea_arreglo,
					'novedad' => $novedad_arreglo,
					'numero' => $numero_arreglo,
					'ubicacion' => $ubicacion_arreglo,
					'error' => 'La novedad no existe en el sistema de informacion'
				];
			}else {
				$stid = oci_parse($c, "UPDATE ENOV_NOVEDAD SET NOVC_REPORTADA = 'S', NOVF_REPORTADA = TRUNC(SYSDATE) 
					WHERE NOVC_CONCEPTO = '$novedad_arreglo' AND NOVN_NUMERO = '$numero_arreglo' AND NOVN_UBICACION = '$ubicacion_arreglo' AND 
					NOVC_REPORTADA <> 'S'");
				$result = oci_execute($stid, OCI_COMMIT_ON_SUCCESS);
				if($result)  {  
					oci_commit($c);
					$actualizados[] = (object) [
						'linea' => $linea_arreglo,
						'novedad' => $novedad_arreglo,
						'numero' => $numero_arreglo,
						'ubicacion' => $ubicacion_arreglo
					];
				}
				else{
					$errores_actualizando[] = (object) [
						'linea' => $linea_arreglo,
						'novedad' => $novedad_arreglo,
						'numero' => $numero_arreglo,
						'ubicacion' => $ubicacion_arreglo,
						'error' => 'Error Actualizado la informacion'
					];
				}
			}

		}
		oci_free_statement($consulta);
		oci_close($c);
	}
	$res = array('codigo'=>1,'mensaje'=>'Novedades Marcada Correctamente.','error' => $errores_actualizando,'update' => $errores_actualizando);
	echo json_encode($res);	

}

function EliminarArchivos($file) {
	if (unlink($file)) {
		return 0;
	} else {
		return 1;
	}
}

?>