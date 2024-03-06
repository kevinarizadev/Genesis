<?php
require_once('../../config/dbcon_prod.php');

$nombre_archivo ="TABLA_RIPS_EPS_US";

$anios = ["2018","2019","2020","2021","2022","2023","2024"];

/* 
$anio
*/

$sql = "


select distinct us.codigo_entidad,

us.tipo_doc Tipo_Identificacion_del_usuario,

us.documento Numero_Identificacion_del_usuario,

us.tipo_usuario,

us.tipo_de_afliado,

us.codigo_de_la_ocupacion,

us.edad,

us.unidad_medida,

us.sexo,

us.coddepartamento,

us.codmunicipio,

us.afic_zona

from oasis.rips_contraloria_us us

where us.anno = 

";





function ejecutar_consulta($anio, $nombre_archivo, $c, $sql){

    $sql = oci_parse ($c, $sql.$anio);
    // Ejecutar la sentencia
    oci_execute($sql);

    if ($sql) {
        // Abrir archivo para escritura
        $file = fopen($anio."/".$nombre_archivo.".txt", "w");

        // Obtener nombres de las columnas
        $ncols = oci_num_fields($sql);
        $column_names = array();
        for ($i = 1; $i <= $ncols; $i++) {
            $column_names[] = oci_field_name($sql, $i);
        }

        // Escribir encabezados al archivo
        fwrite($file, implode("|", $column_names) . "\n");

        // Iterar sobre los resultados y escribir en el archivo
        while (($row = oci_fetch_array($sql, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
            $line = implode("|", $row) . "\n";
            fwrite($file, $line);
        }

        // Cerrar archivo
        fclose($file);
        echo "Resultado exportado correctamente a resultado.txt";
    } else {
        echo "Error al ejecutar la consulta";
    }

    // Cerrar conexión
    oci_free_statement($sql);
    oci_close($c);

}

foreach ($anios as $anio) {
    ejecutar_consulta($anio, $nombre_archivo, $c, $sql);
}

?>
