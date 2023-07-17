
<?php
require_once('../config/0_conexion.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte S1.txt"');

$myparams['fecha_inicio'] = $_GET['fecha_inicio'];
$myparams['fecha_final'] = $_GET['fecha_final'];
$myparams['ubicacion'] = $_SESSION['codmunicipio'];
$procedure_params = array(array(&$myparams['fecha_inicio'], SQLSRV_PARAM_IN), array(&$myparams['fecha_final'], SQLSRV_PARAM_IN), array(&$myparams['ubicacion'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtener_s1  @fecha_inicio=?, @fecha_final=?, @ubicacion =?";
$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
if (sqlsrv_execute($stmt)) {
    echo    'CODIGO_EPS_CAJACOPI' . ',' .
            'TIPO_DOCUMENTO_BDUA' . ',' .
            'DDOCUMENTO_BDUA' . ',' .
            'PRIMER_APELLIDO_BDUA' . ',' .
            'SEGUNDO_APELLIDO_BDUA' . ',' .
            'PRIMER_NOMBRE_BDUA' . ',' .
            'SEGUNDO_NOMBRE_BDUA' . ',' .
            'FECHA_NACIMIENTO_BDUA' . ',' .
            'GENERO_BDUA' . ',' .
            'TIPO_DOCUMENTO_AFILIADO' . ',' .
            'NUMERO_AFILIADO' . ',' .
            'PRIMER_APELLIDO_AFILIADO' . ',' .
            'SEGUNDO_APELLIDO_AFILIADO' . ',' .
            'PRIMER_NOMBRE_AFILIADO' . ',' .
            'SEGUNDO_NOMBRE_AFILIADO' . ',' .
            'FECHA_NACIMIENTO_AFILIADO' . ',' .
            'GENERO_AFILIADO' . ',' .
            'CODIGO_DEPARTAMEMNTO' . ',' .
            'CODIGO_MUNICIPIO' . ',' .
            'ZONA_AFILIADO' . ',' .
            'FECHA_AFILIACION' . ',' .
            'TIPO_POBLACION' . ',' .
            'NIVEL_SISBEN' . ',' .
            'TIPO_TRASLADO' . ',' .
            'RESPUESTA' . ',' .
            'RESPUESTA_TRASLADO' . ',' .
            'SUB_RESPUESTA_TRASLADO' . ',' .
            'FECHA_PROCESO' . ',' .
            'GLOSA_PRINCIPAL' . ',' .
            'GLOSA_PROCESOS' . ',' .
            'FUENTE' . ',' .            
            'FECHA_REPORTE' . ',' .
            'NOMBRE_EPS' . ',' .                        
            'CODIGO_EPS' . ',' . "\n";
            
    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        echo    $rows['CODIGO_EPS_CAJACOPI'] . ',' .
                $rows['TIPO_DOCUMENTO_BDUA'] . ',' .
                $rows['DDOCUMENTO_BDUA'] . ',' .
                $rows['PRIMER_APELLIDO_BDUA'] . ',' .
                $rows['SEGUNDO_APELLIDO_BDUA'] . ',' .
                $rows['PRIMER_NOMBRE_BDUA'] . ',' .
                $rows['SEGUNDO_NOMBRE_BDUA'] . ',' .
                $rows['FECHA_NACIMIENTO_BDUA'] . ',' .
                $rows['GENERO_BDUA'] . ',' .
                $rows['TIPO_DOCUMENTO_AFILIADO'] . ',' .
                $rows['NUMERO_AFILIADO'] . ',' .
                $rows['PRIMER_APELLIDO_AFILIADO'] . ',' .
                $rows['SEGUNDO_APELLIDO_AFILIADO'] . ',' .
                $rows['PRIMER_NOMBRE_AFILIADO'] . ',' .
                $rows['SEGUNDO_NOMBRE_AFILIADO'] . ',' .
                $rows['FECHA_NACIMIENTO_AFILIADO'] . ',' .
                $rows['GENERO_AFILIADO'] . ',' .
                $rows['CODIGO_DEPARTAMEMNTO'] . ',' .
                $rows['CODIGO_MUNICIPIO'] . ',' .
                $rows['ZONA_AFILIADO'] . ',' .
                $rows['FECHA_AFILIACION'] . ',' .
                $rows['TIPO_POBLACION'] . ',' .
                $rows['NIVEL_SISBEN'] . ',' .
                $rows['TIPO_TRASLADO'] . ',' .
                $rows['RESPUESTA'] . ',' .
                $rows['RESPUESTA_TRASLADO'] . ',' .
                $rows['SUB_RESPUESTA_TRASLADO'] . ',' .
                $rows['FECHA_PROCESO'] . ',' .
                $rows['GLOSA_PRINCIPAL'] . ',' .
                $rows['GLOSA_PROCESOS'] . ',' .
                $rows['FUENTE'] . ',' .
                $rows['FECHA_REPORTE'] . ',' .
                $rows['NOMBRE_EPS'] . ',' .                                                
                $rows['CODIGO_EPS'] . ',' . "\n";
    }
} else {
    die(print_r(sqlsrv_errors(), true));
}

sqlsrv_free_stmt($stmt);

?>