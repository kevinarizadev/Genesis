<?php
    require_once('../../config/dbcon.php');
    header('Content-type: application/vnd.ms-excel');
    header("Pragma: no-cache");
    header("Expires: 0");

    if($_GET["funcion"]=='T'){
        header("Content-Disposition: attachment; filename=Informe_Tutelas"."_".date("dmY").".xls");
        $consulta = oci_parse($c,"SELECT CODIGO,UBICACION_TUTELA,RADICACION,FECHA_REGISTRO,TIPODOCUMENTOAFILIADO,
                                        DOCUMENTOAFILIADO,NOMBREAFILIADO,UBICACION_AFILIADO,ACCIONANTE,NOMBRE_ACCIONANTE, 
                                        NOMBRE_ACCIONADO, JUZGADO,RECEPCION,PLAZO,VENCIMIENTO,RESPUESTA,DIFERENCIA_DIAS, MEDIDA_PROVISIONAL, 
                                        CAUSA,MOTIVO,FALLO,ADJUNTO_FALLO,TRATMIENTO,SEGUIMIENTO_CONTINUO,IMPUGNADO, ESTADO, RESPONSABLE, 
                                        TIPO_DOCUMENTO_AGENTE_OFICIOSO, DOCUMENTO_AGENTE_OFICIOSO
                                FROM vw_tutela_informe");
?>
        <table cellspacing="0" cellpadding="0"  border="1" align="center">
            <tr>
                <th>CODIGO</th>
                <th>UBICACION TUTELA</th>
                <th>RADICACIÓN</th>
                <th>FECHA REGISTRO</th>
                <th>TIPO DOCUMENTO AFILIADO</th>
                <th>DOCUMENTO AFILIADO</th>
                <th>NOMBRE AFILIADO</th>
                <th>UBICACION AFILIADO</th>
                <th>ACCIONANTE</th>
                <th>NOMBRE ACCIONANTE</th>
                <th>TIPO DOC AGENTE OFICIOSO</th>
                <th>NUM DOC AGENTE OFICIOSO</th>
                <th>NOMBRE ACCIONADO</th>
                <th>JUZGADO</th>
                <th>RECEPCION</th>
                <th>PLAZO</th>
                <th>VENCIMIENTO</th>
                <th>RESPUESTA</th>
                <th>DIFERENCIA DIAS</th>
                <th>MEDIDA PROVISIONAL</th>
                <th>CAUSA</th>
                <th>MOTIVO</th>
                <th>FALLO</th>
                <th>ADJUNTO FALLO</th>
                <th>TRATAMIENTO</th>
                <th>SEGUIMIENTO CONTINUO</th>
                <th>IMPUGNADO</th>
                <th>ESTADO TUTELA</th>
                <th>RESPONSABLE</th>
            </tr>
    <?php
        oci_execute($consulta);
        // Se recorre el array con los resultados obtenidos de la base de datos
        while( $rows = oci_fetch_assoc($consulta))
        {
            echo "<tr>";
            echo "<td>"; echo$rows['CODIGO']; echo "</td>";
            echo "<td>"; echo$rows['UBICACION_TUTELA']; echo "</td>";
            echo "<td>"; echo$rows['RADICACION']; echo "</td>";
            echo "<td>"; echo$rows['FECHA_REGISTRO']; echo "</td>";
            echo "<td>"; echo$rows['TIPODOCUMENTOAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['DOCUMENTOAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['NOMBREAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['UBICACION_AFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['ACCIONANTE']; echo "</td>";
            echo "<td>"; echo$rows['NOMBRE_ACCIONANTE']; echo "</td>";
            echo "<td>"; echo$rows['TIPO_DOCUMENTO_AGENTE_OFICIOSO']; echo "</td>";
            echo "<td>"; echo$rows['DOCUMENTO_AGENTE_OFICIOSO']; echo "</td>";
            echo "<td>"; echo$rows['NOMBRE_ACCIONADO']; echo "</td>";
            echo "<td>"; echo$rows['JUZGADO']; echo "</td>";
            echo "<td>"; echo$rows['RECEPCION']; echo "</td>";
            echo "<td>"; echo$rows['PLAZO']; echo "</td>";
            echo "<td>"; echo$rows['VENCIMIENTO']; echo "</td>";
            echo "<td>"; echo$rows['RESPUESTA']; echo "</td>";
            echo "<td>"; echo$rows['DIFERENCIA_DIAS']; echo "</td>";
            echo "<td>"; echo$rows['MEDIDA_PROVISIONAL']; echo "</td>";
            echo "<td>"; echo$rows['CAUSA']; echo "</td>";
            echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
            echo "<td>"; echo$rows['FALLO']; echo "</td>";
            echo "<td>"; echo$rows['ADJUNTO_FALLO']; echo "</td>";
            echo "<td>"; echo$rows['TRATMIENTO']; echo "</td>";
            echo "<td>"; echo$rows['SEGUIMIENTO_CONTINUO']; echo "</td>";
            echo "<td>"; echo$rows['IMPUGNADO']; echo "</td>";
            echo "<td>"; echo$rows['ESTADO']; echo "</td>";
            echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
            echo "</tr>";
        }
        // Se cierra la conexion a la base de datos para evitar bloqueos
        oci_close($c);
    } else if ($_GET["funcion"]=='I'){
        header("Content-Disposition: attachment; filename=Informe_Incidentes"."_".date("dmY").".xls");
        $consulta = oci_parse($c,"SELECT * FROM oasis.vw_tutela_informe_incidente");
    ?>
        <table cellspacing="0" cellpadding="0"  border="1" align="center">
            <tr>
                <th>CODIGO</th>
                <th>RADICACION</th>
                <th>TIPO DOCUMENTO AFILIADO</th>
                <th>DOCUMENTO AFILIADO</th>
                <th>NOMBRE AFILIADO</th>
                <th>ACCIONANTE</th>
                <th>NOMBRE ACCIONANTE</th>
                <th>JUZGADO</th>
                <th>CAUSA</th>
                <th>MOTIVO</th>
                <th>NOMBRE ETAPA</th>
                <th>FECHA REGISTRO</th>
            </tr>
    <?php
        oci_execute($consulta);
        // Se recorre el array con los resultados obtenidos de la base de datos
        while( $rows = oci_fetch_assoc($consulta))
        {
            echo "<tr>";
            echo "<td>"; echo$rows['CODIGO']; echo "</td>";
            echo "<td>"; echo$rows['RADICACION']; echo "</td>";
            echo "<td>"; echo$rows['TIPODOCUMENTOAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['DOCUMENTOAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['NOMBREAFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['ACCIONANTE']; echo "</td>";
            echo "<td>"; echo$rows['NOMBRE_ACCIONANTE']; echo "</td>";
            echo "<td>"; echo$rows['JUZGADO']; echo "</td>";
            echo "<td>"; echo$rows['CAUSA']; echo "</td>";
            echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
            echo "<td>"; echo$rows['NOMBRE_ETAPA']; echo "</td>";
            echo "<td>"; echo$rows['FECHA_ETAPA_INCIDENTE']; echo "</td>";
            echo "</tr>";
        }
        // Se cierra la conexion a la base de datos para evitar bloqueos
        oci_close($c);
    }
    ?>