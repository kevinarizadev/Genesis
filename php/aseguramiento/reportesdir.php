<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Novedad DIR"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$v_inicial = $_GET['v_inicial'];
$v_final = $_GET['v_final'];
$v_res = $_GET['v_res'];
$v_mun = $_GET['v_mun'];

$consulta = oci_parse ($c,"SELECT N.NOVF_FECHA AS FECHA_NOVEDAD,
                                  T.TERC_NOMBRE AS RESPONSABLE,
                                  E.AFIC_TIPO_DOCUMENTO AS TIPODOCUMENTO,
                                  E.AFIC_DOCUMENTO AS DOCUMENTO_AFILIADO,
                                  E.AFIC_PRIMER_APELLIDO AS PRIMER_APELLIDO,
                                  E.AFIC_SEGUNDO_APELLIDO AS SEGUNDO_APELLIDO,
                                  E.AFIC_PRIMER_NOMBRE AS PRIMER_NOMBRE,
                                  E.AFIC_SEGUNDO_NOMBRE AS SEGUNDO_NOMBRE,
                                  E.AFIF_NACIMIENTO AS NACIMIENTO,
                                  CASE E.AFIC_SEXO WHEN 'F' THEN 'FEMENINO' WHEN 'M' THEN 'MASCULINO' END SEXO,
                                 'DIR' NOVEDAD,
                                  N.NOVC_CAMPO1_ANTERIOR AS DIRECCION_ANTERIOR,
                                  N.NOVC_CAMPO2_ANTERIOR AS LOCALIDAD_ANTERIOR,
                                  N.NOVC_CAMPO3_ANTERIOR AS TELEFONO_ANTERIOR,
                                  N.NOVC_CAMPO4_ANTERIOR AS CELULAR_ANTERIOR,
                                  N.NOVC_CAMPO5_ANTERIOR AS CELULAR2_ANTERIOR,
                                  N.NOVC_CAMPO6_ANTERIOR AS CORREO_ANTERIOR,
                                  N.NOVC_CAMPO1_NUEVO AS DIRECCION_NUEVO,
                                  N.NOVC_CAMPO2_NUEVO AS LOCALIDAD_NUEVO,
                                  N.NOVC_CAMPO3_NUEVO AS TELEFONO_NUEVO,
                                  N.NOVC_CAMPO4_NUEVO AS CELULAR_NUEVO,
                                  N.NOVC_CAMPO5_NUEVO AS CELULAR2_NUEVO,
                                  N.NOVC_CAMPO6_NUEVO AS CORREO_NUEVO,
                                  UB.UBGC_NOMBRE AS UBICACION,
                                  N.NOVT_OBSERVACION AS OBSERVACION
                      FROM ENOV_NOVEDAD N
                      INNER JOIN EAFI_AFILIADO E ON E.AFIC_TIPO_DOCUMENTO = N.NOVC_TIPO_DOC_AFILIADO AND E.AFIC_DOCUMENTO = N.NOVC_AFILIADO
                      INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = N.NOVV_RESPONSABLE
                      INNER JOIN BUBG_UBICACION_GEOGRAFICA UB ON UB.UBGN_CODIGO = N.NOVN_UBICACION
                      WHERE N.NOVN_EMPRESA = 1
                      AND N.NOVC_DOCUMENTO = 'NS'
                      AND N.NOVC_CONCEPTO = 'DIR'
                      AND N.NOVC_ESTADO = 'P'
                      AND ((N.NOVF_FECHA BETWEEN :v_inicial AND :v_final) OR (:v_inicial = '01/01/1500' AND :v_final = '01/01/1500'))
                      AND ((N.NOVV_RESPONSABLE = :v_res) OR (:v_res = '0'))
                      AND ((N.NOVN_UBICACION = :v_mun) OR (:v_mun = '9'))
                      ORDER BY N.NOVF_FECHA,E.AFIC_TIPO_DOCUMENTO,E.AFIC_DOCUMENTO");

oci_bind_by_name($consulta,':v_inicial',$v_inicial);
oci_bind_by_name($consulta,':v_final',$v_final);
oci_bind_by_name($consulta,':v_res',$v_res);
oci_bind_by_name($consulta,':v_mun',$v_mun);


?>

<h3>REPORTE DE NOVEDADES DIR</h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
    <tr>
        <th>FECHA_NOVEDAD</th>
        <th>RESPONSABLE</th>
        <th>TIPODOCUMENTO</th>
        <th>DOCUMENTO_AFILIADO</th>
        <th>PRIMER_APELLIDO</th>
        <th>SEGUNDO_APELLIDO</th>
        <th>PRIMER_NOMBRE</th>
        <th>SEGUNDO_NOMBRE</th>
        <th>NACIMIENTO</th>
        <th>SEXO</th>
        <th>NOVEDAD</th>
        <th>DIRECCION_ANTERIOR</th>
        <th>LOCALIDAD_ANTERIOR</th>
        <th>TELEFONO_ANTERIOR</th>
        <th>CELULAR_ANTERIOR</th>
        <th>CELULAR2_ANTERIOR</th>
        <th>CORREO_ANTERIOR</th>
        <th>DIRECCION_NUEVO</th>
        <th>LOCALIDAD_NUEVO</th>
        <th>TELEFONO_NUEVO</th>
        <th>CELULAR_NUEVO</th>
        <th>CELULAR2_NUEVO</th>
        <th>CORREO_NUEVO</th>
        <th>UBICACION</th>
        <th>OBSERVACION</th>         
    </tr>

<?php

oci_execute($consulta);

// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) {
    echo "<tr>";
            echo "<td>"; echo$rows['FECHA_NOVEDAD']; echo "</td>";
            echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
            echo "<td>"; echo$rows['TIPODOCUMENTO']; echo "</td>";
            echo "<td>"; echo$rows['DOCUMENTO_AFILIADO']; echo "</td>";
            echo "<td>"; echo$rows['PRIMER_APELLIDO']; echo "</td>";
            echo "<td>"; echo$rows['SEGUNDO_APELLIDO']; echo "</td>";
            echo "<td>"; echo$rows['PRIMER_NOMBRE']; echo "</td>";
            echo "<td>"; echo$rows['SEGUNDO_NOMBRE']; echo "</td>";
            echo "<td>"; echo$rows['NACIMIENTO']; echo "</td>";
            echo "<td>"; echo$rows['SEXO']; echo "</td>";
            echo "<td>"; echo$rows['NOVEDAD']; echo "</td>";
            echo "<td>"; echo$rows['DIRECCION_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['LOCALIDAD_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['TELEFONO_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['CELULAR_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['CELULAR2_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['CORREO_ANTERIOR']; echo "</td>";
            echo "<td>"; echo$rows['DIRECCION_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['LOCALIDAD_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['TELEFONO_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['CELULAR_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['CELULAR2_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['CORREO_NUEVO']; echo "</td>";
            echo "<td>"; echo$rows['UBICACION']; echo "</td>";
            echo "<td>"; echo$rows['OBSERVACION']; echo "</td>";
    echo "</tr>";
}

oci_close($c);

?>
















