<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//$function = $request->function;
//$function();
//require_once('../genesis/utils.php');


//echo $request->soporte;
//echo $request->ext;

//require_once('../config/dbcon_prod.php');





//function subirArchivoAut(){    
    require_once('../upload_file/subir_archivo.php');
    $subir="";
    //global $request;  
        if ($request->ext) {
          $file = $request->soporte;
          $ext = $request->ext;         
          $arhivo =  $request->namefile;    
          $path = "/cargue_ftp/Digitalizacion/Genesis/SaludPublica/ProcesoVacunacion/Consentimiento/";  
          $subir = subirFTP3jeff($file,$path,$arhivo,$ext);     
        }else{
         echo 'Extension vacia';
        }
        if ($subir) {
          echo $subir;
        }         
  //}  


// $ruta = "/cargue_ftp/Digitalizacion/Genesis/SaludPublica/ProcesoVacunacion";
// $nombre = $_FILES['soporte']['name'];

// $token = explode('SisMuestras', $nombre);

// $documento = $token[0];

// $nombreEnFTP = sha1($nombre) . '_' . time() . '.pdf';

// subirArchivoFTP($source_file, $ruta . $documento . '/', $nombreEnFTP, true, false, 3);

// echo json_encode([
//     'data' => $ruta . $nombreEnFTP
// ]);



// function insertarDatosPqr() {
// 	require_once('../../config/dbcon_prod.php');
// 	require_once('../../upload_file/subir_archivo.php');
// 	global $request;
// 	$jsonpqr = '['.$request->pqr.']';
// 	$json_data = json_decode($request->pqr);
// 	$type = $request->action;	
// 	$numero = $request->numero;
// 	$pqrFile = $request->pqrFile;
// 	$fileguia = $request->gcorrespFile;


// 	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_UI_PQR(:v_pjson_row_in,:v_pnumero,:v_paccion,:v_pjson_row_out); end;');
// 	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
// 	$jsonin->writeTemporary($jsonpqr);
// 	oci_bind_by_name($consulta,':v_pnumero',$numero);	
// 	oci_bind_by_name($consulta,':v_paccion',$type);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
// 	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
// 	$bd_response = $clob->read($clob->size());
// 	$json_bd_response = json_decode($bd_response);
// 	if ($json_bd_response->Codigo == 0) {
// 		echo $bd_response;
// 	}else{
// 		if ($json_bd_response->RequireFile == 1) {
// 			$file = $pqrFile;
// 			$ext = $json_data->ext;
// 			$subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
// 			if ($subir != 0 && $json_bd_response->Rutaguia==null) {
// 				echo $bd_response;
// 			}
// 			if ($json_bd_response->Rutaguia) {
// 				$fileg = $fileguia;
// 				$gext = $json_data->gext;
// 				$subirad = subirFTP3($fileg,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuia,$gext);
// 				if ($subirad != 0) {
// 					echo $bd_response;
// 				}
// 				//echo $bd_response;
// 			}
// 			echo $bd_response;
// 		}else{
// 			echo $bd_response;
// 		}
// 	}
// 	oci_close($c);
// }

?>
