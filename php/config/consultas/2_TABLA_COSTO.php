<?php
require_once('../../config/dbcon_prod.php');

$nombre_archivo ="TABLA_COSTO";

$anios = ["2018","2019","2020","2021","2022","2023","2024"];

$sql = "
select facv_tercero NIT_IPS, terc_nombre RAZONSOCIAL, doc_factura RAZONSOCIAL, cntc_concepto PAR_CODIGO_TPC, facv_total_proveedor VALOR_IPS_FACTURA,

facc_estado PAR_CODIGO_ESTADO, facc_factura NROFACT, facf_final FECHA_FACTURA, fach_hora FECHARADICA, consaten, fecha_prestacion_inicial FECHA_INI,

fecha_prestacion_final FECHA_FIN, valor VALOR_IPS_ATENCION, facc_tipo_doc_afiliado TID_CODIGO, facc_afiliado IDENTIFIC, nombre NOMBRES,

afic_primer_apellido APELLIDO1, afic_segundo_apellido APELLIDO2, edad, afic_regimen REGIMEN, fcdn_autorizacion AXA_NUMERO_AUTORIZ, autc_mipres RADICADO_MIPRES,

fcdc_diagnostico DX_CODIGO_DIAGNOSTICO, diac_nombre NOMBRE, nombre_prod MAP_MAPIISS, proc_nombre DESCRIPCION_MAPIISS, nombre_cum CUM, map_sser_codigo,

fcdv_cantidad CANTIDAD_IPS, fcdv_precio VALOR_IPS_UNITARIO_PROC, cantidad_paga_ep_procedimiento, cndv_valor VALOREPS, valor_procesado_pago VALOR_PROCESADO_ATEN,

fcdv_copago COPAGO_IPS, audv_copago COPAGO_EPS, cuota_moderadora_ips CMO_IPS, cuota_moderadora_eps CMO_ePS, c.motivo_glosa MOTIVO_DEVOLUCION,

c.valor_fn_serv VLR_NOTACR, c.documento_cr ORD_NUMERO, fecha_pagado ORD_FECHA, valor_fd_serv VALOR_GLOSA_INICIAL, facv_reteica VALOR_ICA,

facv_retefuente VALOR_RETENCION, valor_gl_serv VLR_SOPORTADO, fecha_gl FECHA_CONCIL, valor_gi_serv VLR_ACEPTADO_IPS, null CTM_FECHA,

fecha_pagado FECHA_DE_ULTIMO_PAGO_FACTURA, valor_pagado_serv VALOR_PAGADO_TOTAL_FACTURA, documento_cr ULTIMO_COMPROBANTE_DE_EGRESO,

fecha_pagado ULTIMA_FECHA_DE_COMPROBANTE_DE_EGRESO, afic_regimen REGIMEN_DEL_PAGO,

fecha_contabilizacion FECHA_CONTABLE, doc_factura NUMERO_DE_COMPROBANTE, numero_contrato, valor_gi_serv VALOR_GLOSA_DEFINITIVA,

forma_medicamento PRESENTACION_DEL_MEDICAMENTO_cum, concentracion, fcdv_cantidad Cantidad, precio_medicamento, fecha_prestacion_final Fecha_dispensada

from costos_contraloria c

where to_char(to_date(c.fecha_contabilizacion),'YYYY') = 


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
