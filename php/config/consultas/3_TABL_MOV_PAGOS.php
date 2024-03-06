<?php
require_once('../../config/dbcon_prod.php');

$nombre_archivo ="TABL_MOV_PAGOS";

$anios = ["2018","2019","2020","2021","2022","2023","2024"];







function ejecutar_consulta($anio, $nombre_archivo, $c){

    $sql = "



select tp.movf_fecha FECHA_DE_PAGO_FACTURA, tp.mvdv_valor VALOR_PAGADO, tp.documento_cr||'-'||tp.numero_cr||'-'||tp.ubicacion_cr COMPROBANTE_DE_EGRESO,

       tp.movf_fecha FECHA_DE_COMPROBANTE_DE_EGRESO, case when fs.facn_proyecto = 1 then 'RC' else 'RS' end REGIMEN_DEL_PAGO,

       b.terv_codigo NIT, b.terc_nombre PRESTADOR, fs.facc_factura NROFACT

from ofac_factura fs

inner join bter_tercero b on (fs.facv_tercero = b.terv_codigo)

inner join traza_historia_pago tp on (tp.terv_codigo = fs.facv_tercero and

                                      trim(tp.facc_factura) = trim(fs.facc_factura))

where fs.facc_documento = 'FS' and fs.facc_estado <> 'X'

and to_char(to_date(tp.movf_fecha),'YYYY') = '".$anio."'

and exists (select 1 from efcd_factura_detalle ed

            inner join nel_tempo n on (trim(ed.fcdc_tipo_doc_afiliado) = trim(n.doc) and

                                       trim(ed.fcdc_afiliado) = trim(n.afiliado))

            where fs.facv_tercero = ed.fcdv_proveedor

            and trim(fs.facc_factura) = trim(ed.fcdc_factura))



";

    $sql = oci_parse ($c, $sql);
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
