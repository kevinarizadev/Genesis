<?php
require_once 'vendor/autoload.php';

session_start();

// Capturar las variables de sesión
$nombre = $_SESSION['nombre'];
$rol = $_SESSION['rol'];


// Cargar la plantilla Excel
$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('matriz.xlsx');


use PhpOffice\PhpSpreadsheet\Cell\Coordinate;


// Obtener el payload del request
$payload = file_get_contents('php://input');

// Decodificar el payload si está en formato JSON
$data = json_decode($payload, true);

// Acceder a los datos del payload
$valor1 = $data['parametro'];

// Realizar acciones con los valores recibidos
// ...

// Enviar una respuesta si es necesario
$response = array('mensaje' => $valor1);
// echo json_encode($response);


// echo  $_REQUEST['parametro'];
require_once('../config/dbcon_prod.php');
$consulta = oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_DATA_EXCEL_RIESGO_CONTROL( :P_V_JSON, :v_json_row); end;');
oci_bind_by_name($consulta, ':P_V_JSON', $valor1);
$clob = oci_new_descriptor($c, OCI_D_LOB);
oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
oci_execute($consulta, OCI_DEFAULT);
if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
} else {
    $respuesta = json_encode([]);
}


$data = json_decode($respuesta, true);
// Obtener la hoja activa

// Definir la fila y columna de inicio

$hoja = $spreadsheet->getActiveSheet();
$hoja->freezePane('D9');


$footer = 'Usuario: ' . $nombre. ' - Rol: ' . $rol;



$hoja->getRowDimension(8)->setRowHeight(90);
foreach ($hoja->getRowIterator() as $fila) {
  // Ajustar automáticamente el tamaño de la fila
  $hoja->getRowDimension($fila->getRowIndex())->setRowHeight(-1);
  $hoja->getStyle($fila->getRowIndex())->getAlignment()->setWrapText(true);
}

$encabezado = ["No", "Proceso donde se puede materializar el Riesgo", "RIESGO
(Impacto -Causa inmediata -Causas raíz)", "Tipo de Riesgo", "Número de veces que se ejecuta la actividad por año", "Probabilidad Inherente", "Afectación reputacional", "Afectación Económica", "Afectación en la salud de los afiliados", "Impacto Inherente", "Zona de Riesgo Inherente",];


$hoja->fromArray($encabezado, null, 'A8');


$fila = 9;


function obtenerTipoRiesgo($codigo) {
    $tiposRiesgo = array(
      "1" => "Salud",
      "2" => "Actuarial",
      "3" => "Crédito",
      "4" => "Liquidez",
      "5" => "Mercado de capitales",
      "6" => "Operacional",
      "7" => "Fallas del mercado de salud",
      "8" => "SARLAFT",
      "9" => "SICOF"
    );

    $codigos = explode(",", $codigo); // Divide la cadena en un array de códigos
    $tipos = array(); // Inicializa un arreglo para almacenar las descripciones de los tipos de riesgo correspondientes

    foreach ($codigos as $cod) { // Itera sobre cada código en el array
      if (array_key_exists($cod, $tiposRiesgo)) {
        $tipos[] = $tiposRiesgo[$cod]; // Agrega la descripción del tipo de riesgo correspondiente al arreglo
      }
    }

    if (count($tipos) > 0) { // Si se encontraron descripciones de tipos de riesgo
      return implode(", ", $tipos); // Une las descripciones en una cadena separada por comas
    } else {
      return "Códigos de riesgo no encontrados"; // Si no se encontraron descripciones de tipos de riesgo
    }
  }



foreach ($data as $datas) {
  $columna = 1;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["Codigo"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $altura_en_pixeles = 147;
$altura_en_puntos = $altura_en_pixeles * 0.75;
$hoja->getRowDimension($fila)->setRowHeight($altura_en_puntos);

    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["Proceso"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);

    $hoja->getStyleByColumnAndRow($columna, $fila)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('A9D08E');
    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["Riesgo"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);

    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, obtenerTipoRiesgo($datas["TipoRiesgo"]));

    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);

    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["NumeroVeces"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $columna++;

    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["ProbalidadInherente"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $color4 = $datas["ZonaRiesgoInherenteColor"];
    $colorpi = substr($color4, 1);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB($colorpi);

    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["AfectuacionReputacional"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["AfectuacionEconomica"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $columna++;

    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["AfectuacionSaludAfilidados"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $columna++;

    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["ImpactoInherente"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $color3 = $datas["ColorImpactoInherente"];
    $colorii = substr($color3, 1);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB($colorii);

    $columna++;
    $hoja->setCellValueByColumnAndRow($columna, $fila, $datas["ZonaRiesgoInherente"]);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFont()->setSize(12);
    $color2 = $datas["ZonaRiesgoInherenteColor"];
    $colorzi = substr($color2, 1);
    $hoja->getStyleByColumnAndRow($columna, $fila)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB($colorzi);



    $fila++;
}



$num_records = count($data);
$num_controls = 0;
foreach ($data as $record) {
    $num_controls = max($num_controls, (int) $record['CantidadControles']);
}





$control_col = 'L'; // Empezar en la columna M



for ($i = 1; $i <= $num_controls; $i++) {

    $cell = $control_col . '8';
    $hoja->setCellValue($cell, 'Control' . $i .'(Responsable - Acción -Complemento(frecuencia y evidencia))');
    $hoja->getStyle($cell)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('FF87CEEB');
    $hoja->getStyle($cell)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
    $hoja->getStyle($cell)->getFont()->setBold(true);
    $hoja->getStyle($cell)->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $control_col++;

    $hoja->setCellValue($control_col . '8', 'Responsable de aplicar el control' . $i);
    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $control_col++;

    $hoja->setCellValue($control_col . '8', '¿El control' . $i . 'es preventivo (25), detectivo (15) o correctivo (10) ?');
    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $hoja->getStyle($control_col.'8')->getFont()->setSize(10);
    $hoja->getStyle($control_col.'8')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER)->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
    $control_col++;

    $hoja->setCellValue($control_col . '8', '¿El Control ' . $i . 'es Automático (25) o Manual (15) ?');
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $hoja->getStyle($control_col.'8')->getFont()->setSize(10);
    $hoja->getStyle($control_col.'8')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER)->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
    $control_col++;


    $hoja->setCellValue($control_col . '8', '¿El Control ' . $i . 'esta Documentado (20) o Sin Documentar (0)');
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $hoja->getStyle($control_col.'8')->getFont()->setSize(10);
    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $control_col++;

    $hoja->setCellValue($control_col . '8', '¿La Frecuencia del Control' . $i . ' es Continua (15) o Aleatoria (10) ?' . $i);
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $hoja->getStyle($control_col.'8')->getFont()->setSize(10);
    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $control_col++;

    $hoja->setCellValue($control_col . '8', '¿Se deja evidencia con registro (15) o no (0) de la ejecución del control 3?' . $i);
    $hoja->getColumnDimension($control_col)->setWidth(14);
    $hoja->getStyle($control_col.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
    $hoja->getStyle($control_col.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
    $hoja->getStyle($control_col.'8')->getFont()->setSize(10);
    // Avanzar a la siguiente columna para el siguiente control
    $control_col++;
}
    // combinar celda







// First block of code
$control_col2 = $control_col;





$hoja->setCellValue($control_col2 . '8', 'Probabilidad Residual');
$hoja->getColumnDimension($control_col2)->setWidth(16);
$hoja->getStyle($control_col2.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getStyle($control_col2.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
$control_col2++;
$hoja->setCellValue($control_col2 . '8', 'Impacto Residual');
$hoja->getStyle($control_col2.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getColumnDimension($control_col2)->setWidth(16);
$hoja->getStyle($control_col2.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
$control_col2++;
$hoja->setCellValue($control_col2 . '8', 'Zona de Riesgo Residual');
$hoja->getStyle($control_col2.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getStyle($control_col2.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');
$hoja->getColumnDimension($control_col2)->setWidth(16);


$control_col2++;
$hoja->setCellValue($control_col2 . '8', 'Seguimiento');
$hoja->getStyle($control_col2.'8')->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getStyle($control_col2.'8')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('D9D9D9');

$hoja->getColumnDimension($control_col2)->setWidth(16);

$M = $control_col2;
$hoja->setCellValue('C1', 'MATRIZ DE RIESGOS');
$hoja->getStyle('C1')->getFont()->setSize(26);
$style = $hoja->getStyle("A1:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "1");
$style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
$style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$style->getFont()->setSize(14);
$hoja->mergeCells("C1:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "1");
$hoja->mergeCells("C2:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "2");
$hoja->mergeCells("C3:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "3");
$hoja->mergeCells("C4:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "4");
$hoja->mergeCells("C5:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($M) - 4) . "5");
$Q = $control_col2;
$hoja->setCellValue('F6', 'VALORACION DEL PROYECTO');
$hoja->getStyle('F6')->getFont()->setSize(14);

// Subtract 4 from the column number to move the range 4 columns to the left
$style = $hoja->getStyle("A6:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($Q) - 4) . "6");
$style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
$style->getFill()->getStartColor()->setRGB('0070C0');
$style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$style->getFont()->setSize(14);
// Merge cells in the updated range
$hoja->mergeCells("F6:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($Q) - 4) . "6");




$P = $control_col2;
$hoja->setCellValue('C2', 'MANUAL SISTEMA INTEGRADO DE GESTIÓN DE RIESGOS');
$hoja->getStyle('C2')->getFont()->setSize(26);
$style = $hoja->getStyle("A2:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($P) - 4) . "2");
$style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
$style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$style->getFont()->setSize(14);
// Merge cells in the updated range
$hoja->mergeCells("C2:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($Q) - 4) . "2");



$W = $control_col2;
$hoja->setCellValue('L7', 'CONTROL');
$hoja->getStyle('L7')->getFont()->setSize(10);
$style = $hoja->getStyle("A7:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($W) - 4) . "7");
$style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
$style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$style->getFont()->setSize(10);
$hoja->getStyle('L7')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('0070C0');
// Merge cells in the updated range
$hoja->mergeCells("L7:" . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($W) - 4) . "7");









$R = $control_col2;
$column_index = Coordinate::columnIndexFromString($R);
$new_column_index = $column_index - 3;
$new_column_letter = Coordinate::stringFromColumnIndex($new_column_index);


$row = 9;
foreach ($data as $T) {
    $hoja->setCellValue($new_column_letter . $row, $T['ProbabilidadResidual']);
    $color1 = $T['ProbabilidadResidualColor'];
    $colorf = substr($color1, 1);
    $style = $hoja->getStyle($new_column_letter . $row);
    $style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
    $style->getFill()->getStartColor()->setARGB($colorf);
    $new_column_letter++;
    $hoja->setCellValue($new_column_letter . $row, $T['ImpactoResidual']);
    $color2 = $T['ImpactoResidualColor'];
    $colorfa = substr($color2, 1);
    $style = $hoja->getStyle($new_column_letter . $row);
    $style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
    $style->getFill()->getStartColor()->setARGB($colorfa);
    $new_column_letter++;
    $hoja->setCellValue($new_column_letter . $row, $T['ZonaRiesgoResidual']);
    $color3 = $T['ZonaRiesgoResidualColor'];
    $colorfas = substr($color3, 1);
    $style = $hoja->getStyle($new_column_letter . $row);
    $style->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
    $style->getFill()->getStartColor()->setARGB($colorfas);
    $new_column_letter++;

    $hoja->setCellValue($new_column_letter . $row, $T['TratamientoRiesgo']);
    $new_column_letter++;

    $row++;



$column_letter = Coordinate::stringFromColumnIndex($column_index);
$new_column_index = $column_index - 3;
$new_column_letter = Coordinate::stringFromColumnIndex($new_column_index);


}








// Second block of code



$control_col = 'L';
$row = 9;

foreach ($data as $control) {
    for ($key = 1; $key <= $control['CantidadControles']; $key++) {
        // Establecer los valores de celda para cada columna en la fila de este control
        $hoja->setCellValue($control_col . $row, $control['Control' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['ResponsableControl' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['TipoControl' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['ImplementacionControl' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['DocumentacionControl' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['FrecuendiaControl' . $key]);
        $control_col++;
        $hoja->setCellValue($control_col . $row, $control['EvidenciaControl' . $key]);
        $control_col++;
    }

    // Incrementar la fila para el siguiente control
    $row++;

    // Reiniciar la columna para el siguiente control
    $control_col = 'L';
}




$lastColumn = $hoja->getHighestColumn();
$penultimateColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($lastColumn) - 1;

$penultimateColumn = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($penultimateColumnIndex);

$hoja->setCellValue($penultimateColumn.'3', 'Código: PC-MZ-01');
$hoja->getStyle($penultimateColumn.'3', )->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getStyle($penultimateColumn.'4', )->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
$hoja->getStyle($lastColumn.'5', )->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

$hoja->setCellValue($penultimateColumn.'4', 'Versión:');

$hoja->setCellValue($penultimateColumn.'5', 'Fecha:');

$hoja->setCellValue($lastColumn .'5', date('Y-m-d'));

$hoja->getStyle($lastColumn.'3')->getFont()->setBold(true);
$hoja->getStyle($penultimateColumn.'4')->getFont()->setBold(true);
$hoja->getStyle($penultimateColumn.'4')->getFont()->setBold(true);
$hoja->getStyle($lastColumn.'5')->getFont()->setBold(true);






// Define the title for the merged cell
$title = "RIESGO RESIDUAL Y TRATAMIENTO";

// Get the range of the last four columns
$lastColumn = $hoja->getHighestColumn();
$lastFourColumnsIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($lastColumn) - 3;

// Merge the cell in the first row over the last four columns
$hoja->mergeCellsByColumnAndRow($lastFourColumnsIndex, 6, $lastFourColumnsIndex + 3, 6);
$hoja->mergeCellsByColumnAndRow($lastFourColumnsIndex, 7, $lastFourColumnsIndex + 3, 7);

// Set the value of the merged cell to the title
$hoja->setCellValueByColumnAndRow($lastFourColumnsIndex, 6, $title);

// Get the style of the merged cell
$style = $hoja->getStyleByColumnAndRow($lastFourColumnsIndex, 6);
$style = $hoja->getStyleByColumnAndRow($lastFourColumnsIndex, 7);

// Set the font color to white and bold
$font = $style->getFont();
$font->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE));
$font->setBold(true);

// Set the background fill to blue
$fill = $style->getFill();
$fill->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
$fill->getStartColor()->setARGB('0070C0');


$alignment = $style->getAlignment();
$alignment->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$alignment->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);

// Apply the modified style to the merged cell
$hoja->duplicateStyle($style, \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastFourColumnsIndex) . '6');
$lastColumn = $hoja->getHighestColumn();
$penultimateColumnIndex1 = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($lastColumn) -2;
$penultimateColumn2 = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($penultimateColumnIndex1);
$hoja->setCellValue($penultimateColumn2.'5', $footer);
$hoja->getStyle($penultimateColumn2.'5', )->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

// Descargar el archivo modificado
$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');

// Enviar las cabeceras para descargar el archivo
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="matriz.xlsx"');

// Imprimir el archivo
$writer->save('php://output');
