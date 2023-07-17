
<?php
require_once('../config/0_conexion.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte MS.txt"');

$myparams['fecha_inicio'] = $_GET['fecha_inicio'];
$myparams['fecha_final'] = $_GET['fecha_final'];
$myparams['ubicacion'] = $_SESSION['codmunicipio'];
$procedure_params = array(array(&$myparams['fecha_inicio'], SQLSRV_PARAM_IN), array(&$myparams['fecha_final'], SQLSRV_PARAM_IN), array(&$myparams['ubicacion'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtener_ms  @fecha_inicio=?, @fecha_final=?, @ubicacion =?";
$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
if (sqlsrv_execute($stmt)) {

    echo    'CODIGO_EPS' . ',' .
            'TIPO_DOCUMENTO' . ',' .
            'DOCUMENTO' . ',' .
            'PRIMER_APELLIDO' . ',' .
            'SEGUNDO_APELLIDO' . ',' .
            'PRIMER_NOMBRE' . ',' .
            'SEGUNDO_NOMBRE' . ',' .
            'FECHA_NACIMIENTO' . ',' .
            'GENERO' . ',' .
            'CODIGO_DEPARTAMENTO' . ',' .
            'CODIGO_MUNICIPIO' . ',' .
            'ZONA' . ',' .
            'FECHA_AFILIACION' . ',' .
            'TIPO_POBLACION' . ',' .
            'NIVEL_SISBEN' . ',' .
            'TIPO_SUBSIDIO' . ',' .
            'CODIGO_HABILITACION' . ',' .
            'RESPUESTA' . ',' .
            'GLOSA_PRINCIPAL' . ',' .
            'GLOSA_PROCESO' . ',' .
            'FUENTE' . ',' .
            'FECHA_REPORTE' . ',' . "\n";

    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        echo    $rows['CODIGO_EPS'] . ',' .
                $rows['TIPO_DOCUMENTO'] . ',' .
                $rows['DOCUMENTO'] . ',' .
                $rows['PRIMER_APELLIDO'] . ',' .
                $rows['SEGUNDO_APELLIDO'] . ',' .
                $rows['PRIMER_NOMBRE'] . ',' .
                $rows['SEGUNDO_NOMBRE'] . ',' .
                $rows['FECHA_NACIMIENTO'] . ',' .
                $rows['GENERO'] . ',' .
                $rows['CODIGO_DEPARTAMENTO'] . ',' .
                $rows['CODIGO_MUNICIPIO'] . ',' .
                $rows['ZONA'] . ',' .
                $rows['FECHA_AFILIACION'] . ',' .
                $rows['TIPO_POBLACION'] . ',' .
                $rows['NIVEL_SISBEN'] . ',' .
                $rows['TIPO_SUBSIDIO'] . ',' .
                $rows['CODIGO_HABILITACION'] . ',' .
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

