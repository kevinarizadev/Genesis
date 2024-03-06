<?php
require_once('../../config/dbcon_produccion.php');

$nombre_archivo ="TABLA_ORDEN_MEDICA";

$anios = ["2018","2019","2020","2021","2022","2023","2024"];

$sql = "

select

a.autc_tipo_doc_afiliado Tipo_Identificacion_Paciente,

a.autc_afiliado Identificacion_Paciente,

af.afic_nombre Nombre_Completo_Paciente,

a.autv_proveedor Nombre_IPS_que_Ordena,

t1.terc_entidad_anterior Codigo_Habilitacion_IPS_que_Ordena,

t1.terc_tipo_tercero Tipo_Identificacion_IPS_que_Ordena,

t1.terv_codigo Identificacion_IPS_que_Ordena,

trim(d1.diac_codigo) Diagnostico_Paciente,

d1.diac_nombre Descripcion_Diagnostico,

'' Fecha_Diagnostico,

'SI' Existe_Orden_Medica,

a.autf_orden Fecha_Orden_Medica,

'' ID_Orden_Medica,

a.autc_clase Pertenece_al_Plan_de_Beneficios,

'SI' Se_Solicito_Autorizacion_Paciente,

'SI' Se_Autorizo_la_Orden_EPS,

a.autn_autorizacion_manual ID_de_Autorizacion,

trunc(a.autf_confirmado) Fecha_de_Autorizacion,

'' Tipo_de_Servicio,

c.clac_nombre Descripcion_del_Servicio,

case when a.autn_clasificacion not in (714) then 'SI' END Fue_Procedimiento,

case when a.autn_clasificacion not in (714) then d.audc_producto end  Codigo_CUPS,

case when a.autn_clasificacion in (714) then 'SI' END Fue_Medicamento,

case when a.autn_clasificacion in (714) then d.audc_producto end Codigo_CUM,

T.TERC_NOMBRE Nombre_IPS_que_Finalmente_Presto_el_Servicio,

T.TERC_ENTIDAD_ANTERIOR Codigo_Habilitacion_IPS_que_Finalmente_Presto_el_Servicio,

T.TERC_TIPO_TERCERO Tipo_Identificacion_IPS_que_Finalmente_Presto_el_Servicio,

T.TERV_CODIGO Identificacion_IPS_que_Finalmente_Presto_el_Servicio,

CASE WHEN A.FECHA_PRESTACION_INICIAL IS NULL THEN 'NO' ELSE 'SI' END  Se_presto_el_Servicio_la_IPS_Prestadora,

A.FECHA_PRESTACION_INICIAL  Fecha_suministro_el_servicio,

(select facc_factura from ofac_factura fs

where fs.facc_documento = 'FS' and fs.facc_estado <> 'X'

and fs.facv_tercero = a.autv_proveedor

and exists (select 1 from ofcd_factura_detalle od

            where fs.facn_empresa = od.fcdn_empresa

            and fs.facc_documento = od.fcdc_documento

            and fs.facn_numero = od.fcdn_numero

            and fs.facn_ubicacion = od.fcdn_ubicacion

            and od.fcdn_autorizacion = a.autn_autorizacion_manual)) ID_de_Factura_IPS,

(select fs.facv_total_proveedor from ofac_factura fs

where fs.facc_documento = 'FS' and fs.facc_estado <> 'X'

and fs.facv_tercero = a.autv_proveedor

and exists (select 1 from ofcd_factura_detalle od

            where fs.facn_empresa = od.fcdn_empresa

            and fs.facc_documento = od.fcdc_documento

            and fs.facn_numero = od.fcdn_numero

            and fs.facn_ubicacion = od.fcdn_ubicacion

            and od.fcdn_autorizacion = a.autn_autorizacion_manual))  Valor_Factura,

'SI' Incluido_Contrato_de_Servicios,

A.AUTN_CONTRATO_PRESTACION numero_contrato,

a.autc_anticipo,

a.autc_estado

from eaut_autorizacion a

inner join ecla_clasificacion c on c.clan_codigo = a.autn_clasificacion

inner join edia_diagnostico d1 on trim(a.autc_diagnostico) = trim(d1.diac_codigo)

inner join bter_tercero t on t.terv_codigo = a.autv_proveedor

inner join bter_tercero t1 on t1.terv_codigo = a.Autv_Tercero

inner join eafi_afiliado af on trim(af.afic_documento) = trim(a.autc_afiliado)

inner join eaud_autorizacion_detalle d on d.audn_empresa = a.autn_empresa and

                                        d.audc_documento = a.autc_documento and

                                        d.audn_numero = a.autn_numero and

                                        d.audn_ubicacion = a.autn_ubicacion

where trim(a.autc_afiliado) in ('1143260183','9312673','22298879','17843827','4020770','26174184','1141330414','7449799','36495882','1143260183','1050630702','1043880327','23521540','49607218','1002430668',

'1137875185','72141558','72173731','7478782','15017066')

and to_char(to_date(a.autf_confirmado),'YYYY') = 


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
