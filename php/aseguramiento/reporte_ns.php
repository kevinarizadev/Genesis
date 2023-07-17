
<?php
require_once('../config/0_conexion.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte NS.txt"');

$myparams['fecha_inicio'] = $_GET['fecha_inicio'];
$myparams['fecha_final'] = $_GET['fecha_final'];
$myparams['ubicacion'] = $_SESSION['codmunicipio'];
$procedure_params = array(array(&$myparams['fecha_inicio'], SQLSRV_PARAM_IN), array(&$myparams['fecha_final'], SQLSRV_PARAM_IN), array(&$myparams['ubicacion'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtener_ns  @fecha_inicio=?, @fecha_final=?, @ubicacion =?";
$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
if (sqlsrv_execute($stmt)) {

    echo    'NS' . ',' .
            'CODIGO_EPS' . ',' .
            'TIPO_DOCUMENTO_BDUA' . ',' .
            'DOCUMENTO_BDUA' . ',' .
            'PRIMER_APELLIDO_BDUA' . ',' .
            'SEGUNDO_APELLIDO_BDUA' . ',' .
            'PRIMER_NOMBRE_BDUA' . ',' .
            'SEGUNDO_NOMBRE_BDUA' . ',' .
            'FECHA_NACIMIENTO_BDUA' . ',' .
            'CODIGO_DEPARTAMENTO_BDUA' . ',' .
            'CODIGO_MUNICIPIO_BDUA' . ',' .
            'FECHA_INICIO_NOVEDAD' . ',' .
            'CODIGO_NOVEDAD' . ',' .
            'VAL1' . ',' .
            'VAL2' . ',' .
            'VAL3' . ',' .
            'VAL4' . ',' .
            'VAL5' . ',' .
            'VAL6' . ',' .
            'VAL7' . ',' .
            'RESPUESTA' . ',' .
            'GLOSA_PRINCIPAL' . ',' .
            'GLOSA_PROCESO' . ',' .
            'FUENTE' . ',' .
            'FECHA_REPORTE' . ',' . "\n";


    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        echo    $rows['NS'] . ',' .
                $rows['CODIGO_EPS'] . ',' .
                $rows['TIPO_DOCUMENTO_BDUA'] . ',' .
                $rows['DOCUMENTO_BDUA'] . ',' .
                $rows['PRIMER_APELLIDO_BDUA'] . ',' .
                $rows['SEGUNDO_APELLIDO_BDUA'] . ',' .
                $rows['PRIMER_NOMBRE_BDUA'] . ',' .
                $rows['SEGUNDO_NOMBRE_BDUA'] . ',' .
                $rows['FECHA_NACIMIENTO_BDUA'] . ',' .
                $rows['CODIGO_DEPARTAMENTO_BDUA'] . ',' .
                $rows['CODIGO_MUNICIPIO_BDUA'] . ',' .
                $rows['FECHA_INICIO_NOVEDAD'] . ',' .
                $rows['CODIGO_NOVEDAD'] . ',' .
                $rows['VAL1'] . ',' .
                $rows['VAL2'] . ',' .
                $rows['VAL3'] . ',' .
                $rows['VAL4'] . ',' .
                $rows['VAL5'] . ',' .
                $rows['VAL6'] . ',' .
                $rows['VAL7'] . ',' .
                $rows['RESPUESTA'] . ',' .
                $rows['GLOSA_PRINCIPAL'] . ',' .
                $rows['GLOSA_PROCESO'] . ',' .
                $rows['FUENTE'] . ',' .
                $rows['FECHA_REPORTE'] . ',' . "\n";
    }
} else {
    die(print_r(sqlsrv_errors(), true));
}

sqlsrv_free_stmt($stmt);

?>


