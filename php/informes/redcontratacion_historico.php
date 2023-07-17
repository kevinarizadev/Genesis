<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once '../config/dbcon_prod.php';
// Propiedades del documentos para que la tabla sea descargadad

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE CONTRATACION RED SIN SERVICIOS HISTORICO" . "_" . date("dmY") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
//    $fecha_inicio = $_GET['fecha_inicio'];
//    $fecha_final = $_GET['fecha_final'];
//$PERIODO =$MES.'/ '.$ANO;
//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro

// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
//oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
//oci_bind_by_name($consulta,':fecha_final',$fecha_final);

?>

<h1>REPORTE CONTRATACION RED SIN SERVICIOS HISTORICO</h1>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
                    <tr>
                <th> COD_DEPARTAMENTO</th>
                <th> DEPARTAMENTO</th>

                <th> UBICACION</th>
                <th> NOMBRE_UBICACION</th>

                <th> COD_MUNICIPIO</th>
                <th> MUNICIPIO</th>
                <th> NIT</th>
                <th> COD_HABILITACION</th>
                <th> NOMBRE_PRESTADOR</th>
                <th> NUMERO_CONTRATO</th>
                <th> F_ELABORACION</th>
                <th> NATURALEZA</th>
                <th> REGIMEN</th>
                <th> CONCEPTO</th>
                <th> MOTIVO</th>
                <th> ASUNTO</th>
                <th> UPC_AFILIADOS</th>
                <th> NO_AFILIADOS</th>
                <th> VALOR_CONTRATO</th>
                <th> FECHA_INICIAL</th>
                <th> FECHA_FINAL</th>
                <th> NIVEL_ATENCION_CONTRATO</th>

                <th> ESTADO</th>
                <th> TAREA</th>
                <th> OBSERVACION</th>

                    </tr>



<?php

$consulta = oci_parse($c, 'begin P_RED_CONTRATACION_SIN_SERV_HISTORICO(  :v_json_out,
:v_result); end;');
oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":V_RESULT", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);

// Se recorre el array con los resultados obtenidos de la base de datos

while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    echo "<tr>";

    echo "<td>";
    echo $rows['COD_DEPARTAMENTO'];
    echo "</td>";
    echo "<td>";
    echo $rows['DEPARTAMENTO'];
    echo "</td>";

    echo "<td>";
    echo $rows['UBICACION'];
    echo "</td>";
    echo "<td>";
    echo $rows['NOMBRE_UBICACION'];
    echo "</td>";

    echo "<td>";
    echo $rows['COD_MUNICIPIO'];
    echo "</td>";
    echo "<td>";
    echo $rows['NOMBRE_MUNICIPIO'];
    echo "</td>";

    echo "<td>";
    echo $rows['NIT'];
    echo "</td>";
    echo "<td>";
    echo $rows['COD_HABILITACION'];
    echo "</td>";
    echo "<td>";
    echo $rows['NOMBRE_PRESTADOR'];
    echo "</td>";
    echo "<td>";
    echo $rows['NUMERO_CONTRATO'];
    echo "</td>";
    echo "<td>";
    echo $rows['F_ELABORACION'];
    echo "</td>";

    echo "<td>";
    echo $rows['NATURALEZA'];
    echo "</td>";

    echo "<td>";
    echo $rows['REGIMEN'];
    echo "</td>";
    echo "<td>";
    echo $rows['CONCEPTO'];
    echo "</td>";
    echo "<td>";
    echo $rows['MOTIVO'];
    echo "</td>";
    echo "<td>";
    echo $rows['ASUNTO'];
    echo "</td>";

    echo "<td>";
    echo $rows['UPC_AFILIADOS'];
    echo "</td>";
    echo "<td>";
    echo $rows['NO_AFILIADOS'];
    echo "</td>";
    echo "<td>";
    echo $rows['VALOR_CONTRATO'];
    echo "</td>";
    echo "<td>";
    echo $rows['FECHA_INICIAL'];
    echo "</td>";
    echo "<td>";
    echo $rows['FECHA_FINAL'];
    echo "</td>";
    echo "<td>";
    echo $rows['NIVEL_ATENCION_CONTRATO'];
    echo "</td>";

    echo "<td>";
    echo $rows['ESTADO'];
    echo "</td>";
    echo "<td>";
    echo $rows['TAREA'];
    echo "</td>";

       echo "<td>";
    echo $rows['BITC_OBSERVACION'];
    echo "</td>";

    echo "</tr>";
}
// Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
