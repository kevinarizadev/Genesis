<?php
require_once('../../config/dbcon_prod.php');

$nombre_archivo ="TABLA_ANEXOS_TARIFARIOS";

$anios = ["2018","2019","2020","2021","2022","2023","2024"];







function ejecutar_consulta($anio, $nombre_archivo, $c){

    $sql = "
select b.terc_nombre  Nombre_Prestadora_del_Servicio,

       (select lpad(z.habi_codigo_habilitacion,10,'0')||lpad(z.numero_sede,2,'0') from trazabilidad_reps z

        where z.nits_nit = oc.cntv_tercero and lpad(z.numero_sede,2,'0') = '01' and rownum = 1) Codigo_Habilitacion,

       b.terc_tipo_tercero Tipo_Identificacion,

       b.terv_codigo Identificacion_IPS, oc.cntc_documento||'-'||oc.cntn_numero||'-'||oc.cntn_ubicacion numero_contrato,

       case when od.cndn_clasificacion = 714 then 'Medicamento'

            when od.cndn_clasificacion = 799 then 'insumo'

            when od.cndn_clasificacion not in (714,799) then 'Servicio'

       end Tipo_de_Servicio,

       p.proc_nombre Descripcion_del_Servicio,

       case when od.cndn_clasificacion not in (714,799) then 'SI' else 'NO' end Fue_Procedimiento,

       case when od.cndn_clasificacion not in (714,799) then proc_codigo else null end Codigo_CUPS,

       case when od.cndn_clasificacion in (714) then 'SI' else 'NO' end Fue_Medicamento,

       case when od.cndn_clasificacion in (714) then proc_codigo else null end Codigo_CUM, 

       od.cndv_valor Valor_del_Servicio, 

       oc.cntf_inicial Fecha_Incio_Vigencia_de_la_Tarifa,

       oc.cntf_final Fecha_Fin_Vigencia_de_la_Tarifa    

from bter_tercero b

inner join ocnt_contrato oc on (b.terv_codigo = oc.cntv_tercero)

inner join ocnd_contrato_detalle od on (oc.cntn_empresa = od.cndn_empresa and

                                        oc.cntc_documento = od.cndc_documento and

                                        oc.cntn_numero = od.cndn_numero and

                                        oc.cntn_ubicacion = od.cndn_ubicacion)

inner join epro_producto p on (trim(od.cndc_producto) = trim(p.proc_codigo))

where exists (select 1 from rips_contraloria_af af

              where oc.cntv_tercero = af.nit

              and oc.cntn_numero = af.contrato)

and oc.cntf_inicial <= '31/12/".$anio."' and oc.cntf_final >= '01/01/".$anio."';




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
