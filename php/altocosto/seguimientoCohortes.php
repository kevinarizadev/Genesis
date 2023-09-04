<?php

Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Style\Font;


function generateExcelFile()
{
    require_once 'vendor/autoload.php';
    require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_INFORMACION_REPORTE(  :P_V_NUMERO_SINIESTRO,
	:V_JSON_ROW); end;');
oci_bind_by_name($consulta, ':P_V_NUMERO_SINIESTRO', $request->P_V_NUMERO_SINIESTRO);
$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
oci_execute($consulta, OCI_DEFAULT);
if (isset($clob)) {
$respuesta = $clob->read($clob->size());
} else {
$respuesta = json_encode([]);
}



$data = json_decode($respuesta, true);

if (empty($data)) {
    $mensaje_error = "Error: Respuesta del servidor vacía.";
    http_response_code(400);
    echo $mensaje_error;
    return;
}


$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('response2.xlsx');
$hoja = $spreadsheet->getActiveSheet();




$headers = array_keys($data[0]);
$column = 2;

$hoja->getColumnDimension('B')->setWidth(25);
foreach (range('B', $hoja->getHighestColumn()) as $columnID) {
    $hoja->getColumnDimension($columnID)->setAutoSize(true);
}



foreach ($headers as $header) {
    $hoja->setCellValueByColumnAndRow($column, 4, $header);
    $column++;
}




$hoja->freezePane('C5');


$row = 5;
foreach ($data as $record) {
    $column = 2;
    foreach ($record as $value) {
        $hoja->setCellValueByColumnAndRow($column, $row, $value);
        $column++;
    }
    $row++;
}

// Draw borders around the cells
$lastRow = $row - 1;
$lastColumn = $column - 1;

$styleArray = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN,
            'color' => ['argb' => '000000'],
        ],
    ],
];

// Set the style for the range of cells
$cellRange = "B5:" . $hoja->getCellByColumnAndRow($lastColumn, $lastRow)->getCoordinate();
$hoja->getStyle($cellRange)->applyFromArray($styleArray);









    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');

    // Enviar las cabeceras para descargar el archivo
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="response2.xlsx"');

	$writer->save('php://output');


}

function P_SC_GET_CONFIG_PREGUNTAS_TIPOS()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_CONFIG_PREGUNTAS_TIPOS(  :P_NU_NUMERO,
                                                                                                		:P_NU_TIPO,
                                                                                                		:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
	oci_bind_by_name($consulta, ':P_NU_TIPO', $request->P_NU_TIPO);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}

function P_SC_GET_DETALLE_CAC_SEGUIMIENTO()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_DETALLE_CAC_SEGUIMIENTO_V2( :P_V_COHORTE, :P_V_TDOCUMENTO,
                                                                                                		 :P_V_DOCUMENTO,
                                                                                                		 :V_JSON_ROW,
                                                                                                		 :V_JSON_ROW2); end;');
	oci_bind_by_name($consulta, ':P_V_COHORTE', $request->P_V_COHORTE);
	oci_bind_by_name($consulta, ':P_V_TDOCUMENTO', $request->P_V_TDOCUMENTO);
	oci_bind_by_name($consulta, ':P_V_DOCUMENTO', $request->P_V_DOCUMENTO);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	$clob2 = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW2', $clob2, -1, OCI_B_CLOB);
	// oci_bind_by_name($consulta, ':V_JSON_ROW2', $clob2, 4000);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		// $respuesta = $clob2;
		$respuesta = $clob->read($clob->size());
		$respuesta2 = $clob2->read($clob2->size());
		echo '{"json1":'.$respuesta.', "json2":'.$respuesta2.'}';
		// echo '{"json1":'.$respuesta.', "json2":'.$clob2.'}';
		// echo $respuesta;
	} else {
		echo json_encode([]);
	}
	// echo $respuesta;
}

function P_SC_POST_RESPUESTA_PREGUNTA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_POST_RESPUESTA_PREGUNTA(:P_V_JSON,:V_JSON_ROW); end;');;
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());

    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}


function obtenerSeccionales() {
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_SECCIONALES(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob -> read($clob -> size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


function P_SC_GET_INFO_ARCHIVOS_COHORTES_CARGADOS() {
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c,'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_INFO_ARCHIVOS_COHORTE_CARGADOS(:P_N_PROCESO,:V_JSON_ROW); end;');;
	oci_bind_by_name($consulta, ':P_N_PROCESO', $request->P_N_PROCESO);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);

	if (isset($clob)) {
		$json = $clob -> read($clob -> size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}



function P_SC_GET_ARCHIVOS_COHORTE_CARGADOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_ARCHIVOS_COHORTE_CARGADOS(:P_V_JSON,:V_JSON_ROW); end;');;
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());

    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

function P_SC_GET_SEGUIMIENTO_USUARIOS_FILTROS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_SEGUIMIENTO_USUARIOS_FILTROS(    :P_V_JSON,
                                                         	                                       				:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}


function ListarCohortes()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta = oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_LISTADO_TIPOS_COHORTE(:V_JSON_ROW); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);



}

function P_SC_GET_VALIDA_COHORTE()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_VALIDA_COHORTE(  		:P_V_USER,
                                                                                                		:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':P_V_USER', $request->P_V_USER);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;



}


function P_SC_LEER_ARCHIVO_COHORTE()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_LEER_ARCHIVO_COHORTE(); end;');

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}




}


function P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE()
{


	require_once('../config/dbcon_prod.php');
	global $request;



	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE(:P_N_NUM_CARGUE,
	                                                                                                          :P_N_TIPO_CARGUE,
	                                                                                                            :V_JSON_ROW); END;');
	oci_bind_by_name($consulta,':P_N_NUM_CARGUE', $request->P_N_NUM_CARGUE);
	oci_bind_by_name($consulta,':P_N_TIPO_CARGUE', $request->P_N_TIPO_CARGUE);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}


function P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_OBSERV()
{


	require_once('../config/dbcon_prod.php');
	global $request;



	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_OBSERV(:P_N_NUM_DET_CARGUE,
	                                                                                                   		         :V_JSON_ROW); END;');
	oci_bind_by_name($consulta,':P_N_NUM_DET_CARGUE', $request->P_N_NUM_DET_CARGUE);

	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}








//informacion nombre
function P_SC_GET_NAME_ARCHIVO_COHORTE()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_NAME_ARCHIVO_COHORTE(  	:P_N_TIPO_CARGUE,
                                                                                                		:P_V_PERIODO,
                                                                                                		:P_V_USER,
                                                                                                		:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':P_N_TIPO_CARGUE', $request->P_N_TIPO_CARGUE);
	oci_bind_by_name($consulta, ':P_V_PERIODO', $request->P_V_PERIODO);
	oci_bind_by_name($consulta, ':P_V_USER', $request->P_V_USER);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}

function P_SC_GET_LISTA_CARGUE_OBSERVACIONES()
{

	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta =  oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_LISTA_CARGUE_OBSERVACIONES(:P_N_ID_CARGUE,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':P_N_ID_CARGUE', $request->P_N_ID_CARGUE);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$respuesta = $clob->read($clob->size());
	} else {
		$respuesta = json_encode([]);
	}
	echo $respuesta;
}

function P_SC_POST_GUARDAR_ARCHIVO_COHORTE()
{

	include('subir_archivo.php');
	global $request;

	$path = '/Digitalizacion/Genesis/cohortes/';
	$file =	$request->archivo;
	$ext =	'txt';
	$nombre =	$request->nombreArchivo;

	$subio = subirFTP($file, $path, $nombre, $ext);
// echo $subio;
	switch ($subio) {
		case 1:
			echo '{"Codigo":1,"Nombre":"Archivo cargado al FTP con errores, por favor inténtelo nuevamente"}';
			break;
		default:
			require_once('../config/dbcon_prod.php');
			$consulta = oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_POST_GUARDAR_ARCHIVO_COHORTE( :P_N_TIPO_CARGE,
																												:P_N_PROCESO,
																												:P_V_RUTA,
																												:P_V_USER,
																												:V_JSON_ROW); END;');
			$clob = oci_new_descriptor($c, OCI_D_LOB);
			oci_bind_by_name($consulta, ':P_N_TIPO_CARGE', $request->P_N_TIPO_CARGE);
			oci_bind_by_name($consulta, ':P_N_PROCESO', $request->P_N_PROCESO);
			oci_bind_by_name($consulta, ':P_V_RUTA', $subio);
			oci_bind_by_name($consulta, ':P_V_USER', $request->P_V_USER);
			oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);

			oci_execute($consulta, OCI_DEFAULT);

			if ($clob !== false) {
				$json = $clob->read($clob->size());
				echo $json;
				$clob->free();
			} else {
				echo '{"Codigo":1,"Nombre":"Error en la peticion"}';
			}

			oci_free_statement($consulta);
			oci_close($c);
			break;
	}
}



function P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_EXCEL() {
    require_once 'vendor/autoload.php';
    require_once('../config/dbcon_prod.php');
    global $request;

    // Crear una instancia de una hoja de cálculo
    $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
    $hoja = $spreadsheet->getActiveSheet();

    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_SC_SEGUIMIENTOCOHORTES.P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE(:P_N_NUM_CARGUE, :P_N_TIPO_CARGUE, :V_JSON_ROW); END;');
    oci_bind_by_name($consulta, ':P_N_NUM_CARGUE', $request->P_N_NUM_CARGUE);
    oci_bind_by_name($consulta, ':P_N_TIPO_CARGUE', $request->P_N_TIPO_CARGUE);

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);

    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }


$data = json_decode($respuesta, true);

if (empty($data)) {
    $mensaje_error = "Error: Respuesta del servidor vacía.";
    http_response_code(400);
    echo $mensaje_error;
    return;
}


$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('response3.xlsx');
$hoja = $spreadsheet->getActiveSheet();




$headers = array_keys($data[0]);
$column = 2;

$hoja->getColumnDimension('B')->setWidth(25);
foreach (range('B', $hoja->getHighestColumn()) as $columnID) {
    $hoja->getColumnDimension($columnID)->setAutoSize(true);
}



foreach ($headers as $header) {
	$hoja->getColumnDimensionByColumn($column)->setWidth(30);
	$hoja->getStyleByColumnAndRow($column, 4)->getFont()->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE)); // Texto con letras blancas
	$hoja->getStyleByColumnAndRow($column, 4)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('002060'); // Establecer el color de fondo gris
    $hoja->setCellValueByColumnAndRow($column, 4, $header);
    $column++;
}


$arial12 = new Font();
$arial12->setName('Arial')->setSize(12); // Fuente Arial 12
$hoja->getStyle('A1:' . $hoja->getHighestColumn() . $hoja->getHighestRow())->getFont()->setName($arial12->getName())->setSize($arial12->getSize());


$hoja->freezePane('C5');


$row = 5;
foreach ($data as $record) {
    $column = 2;
    foreach ($record as $value) {
        $hoja->setCellValueByColumnAndRow($column, $row, $value);
        $column++;
    }
    $row++;
}

// Draw borders around the cells
$lastRow = $row - 1;
$lastColumn = $column - 1;

$styleArray = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN,
            'color' => ['argb' => '000000'],
        ],
    ],
];

// Set the style for the range of cells
$cellRange = "B5:" . $hoja->getCellByColumnAndRow($lastColumn, $lastRow)->getCoordinate();
$hoja->getStyle($cellRange)->applyFromArray($styleArray);









    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');

    // Enviar las cabeceras para descargar el archivo
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="response3.xlsx"');

	$writer->save('php://output');
}



