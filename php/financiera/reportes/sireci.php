<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Sireci- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$V_PANNO = $_GET['ann'];
$V_PPERIODO = $_GET['per'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>FORMULARIO_CON_INFORMACION</th>
        <th>JUSTIFICACION</th>
        <th>NUMERO_CONTRATO</th>
        <th>FECHA_SUSCRIPCION_CONTRATO</th>
        <th>ORDENADOR_DEL_GASTO</th>
        <th>CEDULA_ORDENADOR_DEL_GASTO</th>
        <th>CARGO_DEL_ORDENADOR_DEL_GASTO</th>
        <th>CANTIDAD_DE_VECES_REGISTRADO_EN_SIRECI</th>
        <th>CLASE_DE_CONTRATO</th>
        <th>OTRA_CLASE_DE_CONTRATO</th>
        <th>OBJETO_DEL_CONTRATO</th>
        <th>VALOR_INICIAL_DEL_CONTRATO</th>
        <th>RECURSOS_PROVIENEN_DE_CONTRATO_O_CONVENIO_INTERADTIVO</th>
        <th>ENTIDAD_DONDE_PROVIENEN_LOS_RECURSOS_NIT</th>
        <th>ENTIDAD_DE_DONDE_PROVIENEN_LOS_RECURSOS</th>
        <th>CONTRATISTA_NATURALEZA</th>
        <th>CONTRATISTA_TIPO_IDENTIFICACION</th>
        <th>CONTRATISTA_NUM_IDENTIFICACION_CEDULA</th>
        <th>CONTRATISTA_NUM_IDENTIFICACION_NIT</th>
        <th>CONTRATISTA_DIGITO_DE_VERIFICACION</th>
        <th>CONTRATISTA_CEDULA_EXTRANJERIA</th>
        <th>CONTRATISTA_NOMBRE_COMPLETO</th>
        <th>TIPO_DE_SEGUIMIENTO</th>
        <th>INTERVENTOR_TIPO_IDENTIFICACION</th>
        <th>INTERVENTOR_NUMERO_DE_CEDULA_O_RUT</th>
        <th>INTERVENTOR_NUMERO_DEL_NIT</th>
        <th>INTERVENTOR_DIGITO_DE_VERIFICACION</th>
        <th>INTERVENTOR_CEDULA_EXTRANJERIA</th>
        <th>INTERVENTOR_NOMBRE_COMPLETO</th>
        <th>SUPERVISOR_TIPO_IDENTIFICACION</th>
        <th>SUPERVISOR_NUMERO_DE_CEDULA_O_RUT</th>
        <th>SUPERVISOR_NUMERO_DEL_NIT</th>
        <th>SUPERVISOR_DIGITO_DE_VERIFICACION</th>
        <th>SUPERVISOR_CEDULA_EXTRANJERIA</th>
        <th>SUPERVISOR_NOMBRE_COMPLETO</th>
        <th>PLAZO_DEL_CONTRATO</th>
        <th>ANTICIPOS_O_PAGO_ANTICIPADO</th>
        <th>ANTICIPOS_O_PAGO_ANTICIPADO_VALOR_TOTAL</th>
        <th>ADICIONES</th>
        <th>ADICIONES_VALOR_TOTAL</th>
        <th>ADICIONES_NUMERO_DE_DIAS</th>
        <th>FECHA_INICIO_CONTRATO</th>
        <th>FECHA_TERMINACION_CONTRATO</th>
        <th>FECHA_LIQUIDACION_CONTRATO</th>
        <th>PORCENTAJE_DE_AVANCE_FISICO_PROGRAMADO</th>
        <th>PORCENTAJE_DE_AVANCE_FISICO_REAL</th>
        <th>PORCENTAJE_AVANCE_PRESUPUESTAL_PROGRAMADO</th>
        <th>PORCENTAJE_AVANCE_PRESUPUESTAL_REAL</th>
        <th>OBSERVACIONES</th>




    </tr>
    <?php

    $consulta = oci_parse($c, 'begin P_N_CONTRATOS_CONTRALORIA(   :V_PANNO,
                                                                        :V_PPERIODO,
                                                                        :v_json_out,
                                                                        :v_result); end;');
    oci_bind_by_name($consulta, ':V_PANNO', $V_PANNO);
    oci_bind_by_name($consulta, ':V_PPERIODO', $V_PPERIODO);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['FORMULARIO_CON_INFORMACION'];
        echo "</td>";
        echo "<td>";
        echo $row['JUSTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NUMERO_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_SUSCRIPCION_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['ORDENADOR_DEL_GASTO'];
        echo "</td>";
        echo "<td>";
        echo $row['CEDULA_ORDENADOR_DEL_GASTO'];
        echo "</td>";
        echo "<td>";
        echo $row['CARGO_DEL_ORDENADOR_DEL_GASTO'];
        echo "</td>";
        echo "<td>";
        echo $row['CANTIDAD_DE_VECES_REGISTRADO_EN_SIRECI'];
        echo "</td>";
        echo "<td>";
        echo $row['CLASE_DE_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['OTRA_CLASE_DE_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['OBJETO_DEL_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR_INICIAL_DEL_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['RECURSOS_PROVIENEN_DE_CONTRATO_O_CONVENIO_INTERADTIVO'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTIDAD_DONDE_PROVIENEN_LOS_RECURSOS_NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['ENTIDAD_DE_DONDE_PROVIENEN_LOS_RECURSOS'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_NATURALEZA'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_TIPO_IDENTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_NUM_IDENTIFICACION_CEDULA'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_NUM_IDENTIFICACION_NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_DIGITO_DE_VERIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_CEDULA_EXTRANJERIA'];
        echo "</td>";
        echo "<td>";
        echo $row['CONTRATISTA_NOMBRE_COMPLETO'];
        echo "</td>";
        echo "<td>";
        echo $row['TIPO_DE_SEGUIMIENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_TIPO_IDENTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_NUMERO_DE_CEDULA_O_RUT'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_NUMERO_DEL_NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_DIGITO_DE_VERIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_CEDULA_EXTRANJERIA'];
        echo "</td>";
        echo "<td>";
        echo $row['INTERVENTOR_NOMBRE_COMPLETO'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_TIPO_IDENTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_NUMERO_DE_CEDULA_O_RUT'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_NUMERO_DEL_NIT'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_DIGITO_DE_VERIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_CEDULA_EXTRANJERIA'];
        echo "</td>";
        echo "<td>";
        echo $row['SUPERVISOR_NOMBRE_COMPLETO'];
        echo "</td>";
        echo "<td>";
        echo $row['PLAZO_DEL_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['ANTICIPOS_O_PAGO_ANTICIPADO'];
        echo "</td>";
        echo "<td>";
        echo $row['ANTICIPOS_O_PAGO_ANTICIPADO_VALOR_TOTAL'];
        echo "</td>";
        echo "<td>";
        echo $row['ADICIONES'];
        echo "</td>";
        echo "<td>";
        echo $row['ADICIONES_VALOR_TOTAL'];
        echo "</td>";
        echo "<td>";
        echo $row['ADICIONES_NUMERO_DE_DIAS'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_INICIO_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_TERMINACION_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_LIQUIDACION_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['PORCENTAJE_DE_AVANCE_FISICO_PROGRAMADO'];
        echo "</td>";
        echo "<td>";
        echo $row['PORCENTAJE_DE_AVANCE_FISICO_REAL'];
        echo "</td>";
        echo "<td>";
        echo $row['PORCENTAJE_AVANCE_PRESUPUESTAL_PROGRAMADO'];
        echo "</td>";
        echo "<td>";
        echo $row['PORCENTAJE_AVANCE_PRESUPUESTAL_REAL'];
        echo "</td>";
        echo "<td>";
        echo $row['OBSERVACIONES'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>