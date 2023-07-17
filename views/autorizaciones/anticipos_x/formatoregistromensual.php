<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');

header("Content-Disposition: attachment; filename=Registro Mensual de Anticipos - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];
$estado = $_GET['estado'] . '%';
$seccional = $_GET['seccional'] . '%';
?>


<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>No</th>
        <th>ESTADO</th>
        <th>SECCIONAL</th>
        <th>FECHA DE RECIBIDO EN LA OFICINA NACIONAL</th>
        <th>FECHA DE RECEPCION EN LA SECCIONAL</th>
        <th>FECHA DE ELABORACION DEL ANTICIPO</th>
        <th>NOMBRE DEL USUARIO</th>
        <th>IDENTIFICACION</th>
        <th>TIPO DE SERVICIO</th>
        <th>SERVICIO</th>
        <th>PBS</th>
        <th>PRESTADOR</th>
        <th>NIT DEL PRESTADOR</th>
        <th>SECCIONAL DEL PRESTADOR</th>
        <th>SECCIONAL DEL USUARIO</th>
        <th>VALOR RECURSO</th>
        <th>FECHA DE PAGO</th>
        <th>ANIO DE PAGO</th>
        <th>MES DE PAGO</th>
        <th>MARCA REFERENCIA</th>
        <th>LEGALIZADO</th>
        <th>No DE FACTURA</th>
        <th>FECHA DE LEGALIZACION</th>
        <th>VALOR LEGALIZADO</th>
    </tr>
    <?php
    // CASE WHEN UPPER(S.SERC_TIPO) = 'PRO' THEN 'PROCEDIMIENTO'
    // WHEN UPPER(S.SERC_TIPO) = 'CON' THEN 'CONSULTA'
    // WHEN UPPER(S.SERC_TIPO) = 'TRA' THEN 'TRANSPORTE'
    // WHEN UPPER(S.SERC_TIPO) = 'MED' THEN 'MEDICAMENTO'
    // END TIPO_SERVICIO,

    //     $consulta =  oci_parse($c, "
    //     SELECT
    // A.ANTN_NUMERO CONSECUTIVO,
    // OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_UBICACION_GEO(A.ANTN_UBICACION, 'DEPARTAMENTO') SECCIONAL,
    // TO_CHAR(A.ANTD_PERT_FECHA_ENVIONAC, 'DD/MM/YYYY') FECHA_RECIBIDO_NACIONAL,
    // TO_CHAR(A.ANTD_PERT_FECHA_RECIBIDO, 'DD/MM/YYYY') FECHA_RECIBIDO_SECCIONAL,
    // TO_CHAR(A.ANTD_FECHA_CREACION, 'DD/MM/YYYY') FECHA_CREACION,
    // TRIM(OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_QUITAR_TILDES((AF.AFIC_PRIMER_NOMBRE||' '||AF.AFIC_SEGUNDO_NOMBRE||' '||AF.AFIC_PRIMER_APELLIDO||' '||AF.AFIC_SEGUNDO_APELLIDO))) NOMBRE_USUARIO,
    // A.ANTC_TIPODOC||'-'||A.ANTC_DOCUMENTO DOCUMENTO_USUARIO,

    // OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_QUITAR_TILDES(S.SERC_SERVICIO_GRAF) TIPO_SERVICIO,

    // OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_QUITAR_TILDES(OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_PRODUCTO(S.SERC_COD_PROD)) SERVICIO,
    // CASE WHEN OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_IPS(A.ANTC_PRESTADOR_ELEGIDO) = '0' THEN 'NO DISPONIBLE' ELSE OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_QUITAR_TILDES(OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_IPS(A.ANTC_PRESTADOR_ELEGIDO)) END PRESTADOR,
    // CASE WHEN A.ANTC_PRESTADOR_ELEGIDO IS NULL THEN 'NO DISPONIBLE' ELSE A.ANTC_PRESTADOR_ELEGIDO END NIT_PRESTADOR,
    // OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_UBICACION_GEO(A.ANTN_UBICACION_ATENCION,'MUNICIPIO') SECCIONAL_PRESTADOR,
    // OASIS.PQ_GENESIS_ANTICIPOS_AUT.F_OBTENER_UBICACION_GEO(AF.AFIN_UBICACION_GEOGRAFICA,'DEPARTAMENTO') SECCIONAL_USUARIO,
    // TRANSLATE(TO_CHAR(S.SERV_VALOR,'999,999,999,999,999.99'),'.,' , ',.') VALOR,
    // NVL(TO_CHAR(X.SOPD_FECHA_PAGADURIA, 'DD/MM/YYYY'), 'NO DISPONIBLE') FECHA_PAGO,
    // NVL(TO_CHAR(X.SOPD_FECHA_PAGADURIA, 'YYYY'), 'NO DISPONIBLE') ANIO_PAGO,
    // NVL(TO_CHAR(X.SOPD_FECHA_PAGADURIA, 'MONTH'), 'NO DISPONIBLE') MES_PAGO
    // FROM OASIS.EANT_ANTICIPOS_AUT A
    // INNER JOIN OASIS.ESER_SERV_ANTICIPOS_AUT S ON S.SERN_NUMERO = A.ANTN_NUMERO
    // LEFT JOIN OASIS.EHAN_HISTORICO_ANTICIPOS_AUT H ON H.HANC_TIPODOC = A.ANTC_TIPODOC AND H.HANC_DOCUMENTO = A.ANTC_DOCUMENTO AND H.HANN_STATUS = '8'
    // INNER JOIN OASIS.EANT_ANTICIPOS_AUT_SOPORTES X ON X.SOPN_NUMERO = A.ANTN_NUMERO
    // INNER JOIN OASIS.EAFI_AFILIADO_VIEW_MAT AF ON (AF.AFIC_TIPO_DOCUMENTO=A.ANTC_TIPODOC AND AF.AFIC_DOCUMENTO = A.ANTC_DOCUMENTO)
    // WHERE
    //  TO_DATE(A.ANTD_FECHA_CREACION) >= TO_DATE(:fecha_i,'YYYY/MM/DD') AND TO_DATE(A.ANTD_FECHA_CREACION) <= TO_DATE(:fecha_f,'YYYY/MM/DD')
    //  AND A.ANTC_ESTADO like :estado
    //  AND A.ANTN_UBICACION LIKE :seccional
    //  ORDER BY A.ANTN_NUMERO");

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ANTICIPOS_AUT.P_OBTENER_REGISTRO_MENSUAL(:V_FECHA_I,:V_FECHA_F,:V_ESTADO,:V_SECCIONAL,:V_RESULT); end;');
    oci_bind_by_name($consulta, ':V_FECHA_I', $fecha_i);
    oci_bind_by_name($consulta, ':V_FECHA_F', $fecha_f);
    oci_bind_by_name($consulta, ':V_ESTADO', $estado);
    oci_bind_by_name($consulta, ':V_SECCIONAL', $seccional);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['CONSECUTIVO'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "<td>";
        echo $row['SECCIONAL'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_RECIBIDO_NACIONAL'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_RECIBIDO_SECCIONAL'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_CREACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_USUARIO'];
        echo "</td>";
        echo "<td>";
        echo $row['DOCUMENTO_USUARIO'];
        echo "</td>";
        echo "<td>";
        echo $row['TIPO_SERVICIO'];
        echo "</td>";
        echo "<td>";
        echo $row['SERVICIO'];
        echo "</td>";
        echo "<td>";
        echo $row['PBS'];
        echo "</td>";
        echo "<td>";
        echo $row['PRESTADOR'];
        echo "</td>";
        echo "<td>";
        echo $row['NIT_PRESTADOR'];
        echo "</td>";
        echo "<td>";
        echo $row['SECCIONAL_PRESTADOR'];
        echo "</td>";
        echo "<td>";
        echo $row['SECCIONAL_USUARIO'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_PAGO'];
        echo "</td>";
        echo "<td>";
        echo $row['ANIO_PAGO'];
        echo "</td>";
        echo "<td>";
        echo $row['MES_PAGO'];
        echo "</td>";
        echo "<td>";
        echo $row['ANTC_MARCA_REFERENCIA'];
        echo "</td>";
        echo "<td></td>";
        echo "<td></td>";
        echo "<td></td>";
        echo "<td></td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
