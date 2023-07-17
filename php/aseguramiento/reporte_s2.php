
<?php
require_once('../config/0_conexion.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte S2.txt"');

$myparams['fecha'] = $_GET['fecha'];
$myparams['ubicacion'] = $_SESSION['codmunicipio'];


$procedure_params = array(  array(&$myparams['fecha'], SQLSRV_PARAM_IN), 
                            array(&$myparams['ubicacion'], SQLSRV_PARAM_IN));
$consulta = "EXEC obtener_s2 @fecha=?, @ubicacion =?";
$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);

if (!$stmt) {die(print_r(sqlsrv_errors(), true));}


if (sqlsrv_execute($stmt)) {
    
    echo    'CODIGO_EPS' . ',' .
            'TIPO_DOCUMENTO_BDUA' . ',' .
            'DOCUMENTO_BDUA' . ',' .
            'PRIMER_APELLIDO_BDUA' . ',' .
            'SEGUNDO_APELLIDO_BDUA' . ',' .
            'PRIMER_NOMBRE_BDUA' . ',' .
            'SEGUNDO_NOMBRE_BDUA' . ',' .
            'CODIGO_DEPARTAMENTO' . ',' .
            'CODIGO_MUN' . ',' .
            'FECHA_AFILIACION' . ',' .
            'FECHA_UPC' . ',' .
            'RESPUESTA_TRASLADO' . ',' .
            'CAUSAL_RESPUESTA' . ',' .
            'FECHA_FACTIBLE_APROBACION' . ',' .
            'CODIGO_DEPARTAMENTO_CAJACOPI' . ',' .
            'CODIGO_MUNICIPIO_CAJACOPI' . ',' .
            'DEPARTAMENTO' . ',' .
            'MUNICIPIO' . ',' .
            'NOMBRE_EPS' . ',' .
            'FECHA_PROCESO';
            echo "\n";

            while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                
                echo    $rows['CODIGO_EPS']. ',' .
                        $rows['TIPO_DOCUMENTO_BDUA']. ',' .
                        $rows['DOCUMENTO_BDUA']. ',' .
                        $rows['PRIMER_APELLIDO_BDUA']. ',' .
                        $rows['SEGUNDO_APELLIDO_BDUA']. ',' .
                        $rows['PRIMER_NOMBRE_BDUA']. ',' .
                        $rows['SEGUNDO_NOMBRE_BDUA']. ',' .
                        $rows['CODIGO_DEPARTAMENTO']. ',' .
                        $rows['CODIGO_MUN']. ',' .
                        $rows['FECHA_AFILIACION']. ',' .
                        $rows['FECHA_UPC']. ',' .
                        $rows['RESPUESTA_TRASLADO']. ',' .
                        $rows['CAUSAL_RESPUESTA']. ',' .
                        $rows['FECHA_FACTIBLE_APROBACION']. ',' .
                        $rows['CODIGO_DEPARTAMENTO_CAJACOPI']. ',' .
                        $rows['CODIGO_MUNICIPIO_CAJACOPI']. ',' .
                        $rows['DEPARTAMENTO']. ',' .
                        $rows['MUNICIPIO']. ',' .
                        $rows['NOMBRE_EPS']. ',' .
                        $rows['FECHA_PROCESO']."\n";
            }
        } else {
            die(print_r(sqlsrv_errors(), true));
        }

        
        
        sqlsrv_free_stmt($stmt);
        
        ?>