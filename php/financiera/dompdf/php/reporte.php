<?php

require_once '..\administrador\libreria\dompdf\autoload.inc.php';

use Dompdf\Dompdf;

class PDF {
    
    public static function savePDF($name, $html, $folder) {
        $mpdf = new Dompdf();
        $mpdf->loadHtml($html);
        $mpdf->setPaper('A4', 'letter');
        $mpdf->render();
        $output = $mpdf->output();  
        
        $file_to_save = $folder . $name;
        
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }
        file_put_contents($file_to_save, $output);
    }

    public static function DescargarZip(){
        $zip = new ZipArchive();
      
        $nombreArchivoZip = __DIR__ . "/Comprimidos/comprimidos.zip";
        $rutaDirectorio = __DIR__ . "\\pdfN\\2023";
        if (!$zip->open($nombreArchivoZip, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
            exit("Error abriendo ZIP $nombreArchivoZip");
        }

        // Crear un iterador recursivo que tendrá un iterador recursivo del directorio
        $archivos = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rutaDirectorio),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($archivos as $archivo) {
            if ($archivo->isDir()) {
                continue;
            }
            $rutaAbsoluta = $archivo->getRealPath();
            $nombreArchivo = substr($rutaAbsoluta, strlen($rutaDirectorio) + 1);
            $nombre = basename($nombreArchivoZip);
            $zip->addFile($rutaAbsoluta, $nombreArchivo);
        }

        $resultado = $zip->close();
        if ($resultado) {
            // Enviar el archivo ZIP al navegador
            header('Content-Type: application/zip');
            header('Content-disposition: attachment; filename=' . $nombre);
            header('Content-Length: ' . filesize($nombreArchivoZip));
            readfile($nombreArchivoZip);
            exit;
        } else {
            echo "Error Creando Archivo";
        }
    }
}

// Manejar el envío del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    PDF::DescargarZip();
    // Puedes agregar más lógica aquí si es necesario
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
<form action="pdf.php" method="post">
    <h1>DESCARGAR ZIP</h1>
    <button type="submit">Download</button>
</form>

</body>
</html>
