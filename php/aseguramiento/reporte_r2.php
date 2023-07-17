
<?php
require_once('../config/0_conexion.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte R2.txt"');

$myparams['fecha'] = $_GET['fecha'];
$myparams['ubicacion'] = $_SESSION['codmunicipio'];

$procedure_params = array(  array(&$myparams['fecha'], SQLSRV_PARAM_IN), 
                            array(&$myparams['ubicacion'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtener_r2_prueba  @fecha=?,@ubicacion =?";
$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
if (sqlsrv_execute($stmt)) {
    echo   'CODIGO_EPS' . ',' .
           'TIPO_DOCUMENTO_BDUA' . ',' .
           'DOCUMENTO_BDUA' . ',' .
           'PRIMER_APELLIDO_BDUA' . ',' .
           'SEGUNDI_APELLIDO_BDUA' . ',' .
           'PRIMER_NOMBRE_BDUA' . ',' .
           'SEGUNDO_NOMBRE_BDUA' . ',' .
           'FECHA_AFILIACION' . ',' .
           'FECHA_INICIO_UPC' . ',' .
           'RESPUESTA_TRASLADO' . ',' .
           'CAUSAL_DE_RESPUESTA' . ',' .
           'TIPO_DOCUMENTO_COTIZANTE' . ',' .
           'DOCUMENTO_COTIZANTE' . ',' .
           'PARANTESCO' . ',' .
           'CODIGO_DEPARTAMENTO_CAJACOPI' . ',' .
           'CODIGO_MUNICIPIO_CAJACOPI' . ',' .
           'CODIGO_DEPARTAMENTO' . ',' .
           'DEPARTAMENTO' . ',' .
           'MUNICIPIO' . ',' .
           'NOMBRE_EPS' . ',' .
           'FECHA_PROCESOS ' . ',' . "\n";
            
    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        echo    $rows['CODIGO_EPS'] . ',' .
                $rows['TIPO_DOCUMENTO_BDUA'] . ',' .
                $rows['DOCUMENTO_BDUA'] . ',' .
                $rows['PRIMER_APELLIDO_BDUA'] . ',' .
                $rows['SEGUNDI_APELLIDO_BDUA'] . ',' .
                $rows['PRIMER_NOMBRE_BDUA'] . ',' .
                $rows['SEGUNDO_NOMBRE_BDUA'] . ',' .
                $rows['FECHA_AFILIACION'] . ',' .
                $rows['FECHA_INICIO_UPC'] . ',' .
                $rows['RESPUESTA_TRASLADO'] . ',' .
                $rows['CAUSAL_DE_RESPUESTA'] . ',' .
                $rows['TIPO_DOCUMENTO_COTIZANTE'] . ',' .
                $rows['DOCUMENTO_COTIZANTE'] . ',' .
                $rows['PARANTESCO'] . ',' .
                $rows['CODIGO_DEPARTAMENTO_CAJACOPI'] . ',' .
                $rows['CODIGO_MUNICIPIO_CAJACOPI'] . ',' .
                $rows['CODIGO_DEPARTAMENTO'] . ',' .
                $rows['DEPARTAMENTO'] . ',' .
                $rows['MUNICIPIO'] . ',' .
                $rows['NOMBRE_EPS'] . ',' .
                $rows['FECHA_PROCESOS'] . ',' ."\n";
    }
} else {
    die(print_r(sqlsrv_errors(), true));
}

sqlsrv_free_stmt($stmt);

?>