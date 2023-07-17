<?php
$datos = json_decode($_GET['json']);
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte validador medicamentos     " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

require_once('../../config/dbcon_prod.php');


$cursor = oci_new_cursor($c);
$consulta = oci_parse($c, 'BEGIN pq_genesis_medicamentos.p_reporte (:v_pnit,:v_panho,:v_pperiodo,:v_pjson_row_out); end;');
oci_bind_by_name($consulta, ':v_pnit', $datos->nit);
oci_bind_by_name($consulta, ':v_panho', $datos->anno);
oci_bind_by_name($consulta, ':v_pperiodo', $datos->periodo);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_pjson_row_out", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
?>

<table border="1" cellpadding="2" cellspacing="0" width="100">
    <caption>NIT: <?php $datos->nit ?></caption>
    <tbody>
        <tr align='center'>
            <h2>Reporte de registros</h2>
        </tr>
        <tr>
            <th align='center'>NOMBRE OPERADOR</th>
            <th align='center'>NIT OPERADOR</th>
            <th align='center'>MODALIDAD (CAPITA/EVENTO)</th>
            <th align='center'>TIPO DE MEDICAMENTO (PBS /NOPBS)</th>
            <th align='center'>NIT IPS ORIGEN DEL PACIENTE</th>
            <th align='center'>NOMBRE IPS ORIGEN DEL PACIENTE</th>
            <th align='center'>NOMBRES Y APELLIDOS</th>
            <th align='center'>TIPO DE IDENTIFICACION</th>
            <th align='center'>NUMERO DE IDENTIFICACION</th>
            <th align='center'>GENERO (F/M)</th>
            <th align='center'>EDAD (EN AÑOS)</th>
            <th align='center'>DIRECCION DEL PACIENTE</th>
            <th align='center'>CIUDAD</th>
            <th align='center'>DEPARTAMENTO</th>
            <th align='center'>TELEFONO</th>
            <th align='center'>NOMBRE DE LA EPS</th>
            <th align='center'>CODIGO EPS</th>
            <th align='center'>CUM (CODIGO UNICO DEL MEDICAMENTO)</th>
            <th align='center'>CODIGO ATC</th>
            <th align='center'>DESCRIPCION MEDICAMENTO (NOMBRE GENERICO DCI, CONCENTRACION Y FORMA FARMACEUTICA)</th>
            <th align='center'>VIA ADMINISTRACION</th>
            <th align='center'>FRECUENCIA</th>
            <th align='center'>DURACION TRATAMIENTO (EN DIAS)</th>
            <th align='center'>LOTE</th>
            <th align='center'>FECHA DE VENCIMIENTO</th>
            <th align='center'>CANTIDAD PRESCRITA TOTAL</th>
            <th align='center'>CANTIDAD SOLICITADA (MES)</th>
            <th align='center'>CANTIDAD ENTREGADA (MES)</th>
            <th align='center'>VALOR UNITARIO DEL MEDICAMENTO ($)</th>
            <th align='center'>CODIGO DIAGNOSTICO PRINCIPAL</th>
            <th align='center'>DESCRIPCION DIAGNOSTICO PRINCIPAL</th>
            <th align='center'>FECHA PRESCRIPCION (FECHA DE LA FORMULA)</th>
            <th align='center'>FECHA AUTORIZACION ENTREGA</th>
            <th align='center'>FECHA SOLICITUD (FECHA SOLICITUD AL SERVICIO FARMACEUTICO)</th>
            <th align='center'>FECHA ENTREGA</th>
            <th align='center'>NUMERO DE AUTORIZACION (SI APLICA)</th>
            <th align='center'>NUMERO FORMULA</th>
            <th align='center'>¿AUTORIZA ENTREGA A DOMICILIO?</th>
            <th align='center'>¿SE ENTREGO EN EL DOMICILIO?</th>
            <th align='center'>¿EL REGISTRO CORRESPONDE A UNA ENTREGA COMPLETA O ENTREGA DE UN PENDIENTE? (E.FORMULA/ E. PENDIENTE)</th>
        </tr>
    </tbody>

    <?php

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {

        echo "<tr>";
        echo "<td>";
        echo $row['nombre_prestador'];
        echo "</td>";
        echo "<td>";
        echo $row['nit'];
        echo "</td>";
        echo "<td>";
        echo $row['modalidad'];
        echo "</td>";
        echo "<td>";
        echo $row['tipo_medicamento'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_NIT_IPS_ORIGEN'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_NOMBRE_IPS_ORIGEN'];
        echo "</td>";
        echo "<td>";
        echo $row['afiliado'];
        echo "</td>";
        echo "<td>";
        echo $row['tipo_identificacion'];
        echo "</td>";
        echo "<td>";
        echo $row['identificacion'];
        echo "</td>";
        echo "<td>";
        echo $row['genero'];
        echo "</td>";
        echo "<td>";
        echo $row['edad_actual'];
        echo "</td>";
        echo "<td>";
        echo $row['direccion'];
        echo "</td>";
        echo "<td>";
        echo $row['ciudad'];
        echo "</td>";
        echo "<td>";
        echo $row['departamento'];
        echo "</td>";
        echo "<td>";
        echo $row['telefono'] != '' ? $row['telefono'] : '9999999999';
        echo "</td>";
        echo "<td>";
        echo "CAJACOPI EPS S.A.S";
        echo "</td>";
        echo "<td>";
        echo 'CCF055';
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_COD_MEDICAMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_CODIGO_ATC'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_DESCRIPCION'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_VIA_ADMINISTRACION'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_FRECUENCIA'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_DURACION_TRATAMIENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_LOTE'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTF_FECHA_VENCIMIENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_CANTIDAD_PRESCRITA'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_CANTIDAD_SOLICITADA'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_CANTIDAD_ENTREGADA'];
        echo "</td>";
        echo "<td>";
        echo '$'.$row['ENTN_VALOR_UNITARIO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_DX_PRINCIPAL'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_NOMBRE_DX'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTF_FECHA_PRESCRIPCION'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTF_FECHA_AUTORIZACION'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTF_FECHA_SOLICITUD'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTF_FECHA_ENTREGA'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_NUMERO_AUTORIZACION'] != '' ? $row['ENTC_NUMERO_AUTORIZACION'] : 'N/A';
        echo "</td>";
        echo "<td>";
        echo $row['ENTN_NUMERO_FORMULA'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_AUTORIZA_DOMICILIO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_ENTREGA_DOMICILIO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTC_TIPO_ENTREGA'];
        echo "</td>";
        echo "</tr>";
    }
    oci_close($c);
    ?>
</table>