<?php
require_once('../../config/dbcon.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Listado de Errores"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$archivo = $_GET['archivo'];
$proceso = $_GET['proceso'];
$texto = $_GET['texto'];

$consulta = oci_parse ($c,"SELECT /* +INDEX( r IDX_RIPS_ERROR_01) */ DISTINCT r.codigo_regla REGLA, v.nombre NOMBRE, r.fila FILA, r.codigo_archivo ARCHIVO, r.codigo_recibo RECIBO,
                    case when rp.clase_contrato = 'C' then DECODE(NVL(v.obligatorio,'NO'),'S','SI','NO')
                    else 'SI' end OBLIGATORIO
                            FROM rips_error r
                            INNER JOIN rips_proceso rp on rp.codigo_proceso = r.codigo_proceso
                            INNER JOIN rips_validacion v ON (r.codigo_regla = v.codigo AND r.codigo_archivo = v.archivo)
                           WHERE r.codigo_proceso = :v_proceso
                           AND ((r.codigo_archivo = :v_archivo) OR (:v_archivo = 'NA'))
                           ORDER BY r.fila");

oci_bind_by_name($consulta,':v_archivo',$archivo);
oci_bind_by_name($consulta,':v_proceso',$proceso);

?>

<h3>REPORTE DE ERRORES <?php echo($texto); ?></h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
    <tr>
        <th align='center'>REGLA</th>
        <th align='center'>NOMBRE</th>
        <th align='center'>ARCHIVO</th>
        <th align='center'>FILA</th>       
        <th align='center'>RECIBO</th>
        <th align='center'>OBLIGATORIO</th>
    </tr>

<?php

oci_execute($consulta);

// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) {
    echo "<tr>";
            echo "<td align='center'>"; echo$rows['REGLA']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOMBRE']; echo "</td>";
            echo "<td align='center'>"; echo$rows['ARCHIVO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['FILA']; echo "</td>";
            echo "<td align='center'>"; echo$rows['RECIBO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['OBLIGATORIO']; echo "</td>";
    echo "</tr>";
}

print_r(error_get_last());

oci_close($c);

?>




