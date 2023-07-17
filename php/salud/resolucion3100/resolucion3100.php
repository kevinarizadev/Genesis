<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function ConsultaIPS()
{
    global $request;
    require_once('../../config/dbcon_prod.php');
    $nit = $request->nit;

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_IPS(:v_nit, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_nit', $nit);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        //   $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function listaGrupoServicioYservicios()
{
    require_once('../../config/dbcon_prod.php');

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_grupo_servicio(:v_json_out); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function ObtenerAuditores()
{
    require_once('../../config/dbcon_prod.php');

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_auditores(:v_json_out); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function ObtenerEstandar()
{
    require_once('../../config/dbcon_prod.php');

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_estandar(:v_json_out); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function guardar_pre_auditoria()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $json = $request->json;
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_inserta_resolucion_3100(:v_pjson_row_in, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_pjson_row_in', $json);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}


function listar_Pre_Auditoria()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    
    if ($_SESSION['cedula'] == $request->doc || $_SESSION['nit'] ==  $request->doc) {
        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_auditoria(:v_parametro, :v_identificacion, :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_parametro', $request->tipo);
        oci_bind_by_name($consulta, ':v_identificacion', $request->doc);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    } else {
        echo 0;
    }
}

function listar_grupo_servicio()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    if ($_SESSION['cedula'] == $request->doc) {
        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_servicios_por_grupo(:v_auditoria, :v_identificacion, :v_json_out); end;');
        // oci_bind_by_name($consulta, ':v_identificacion', $x);
        oci_bind_by_name($consulta, ':v_auditoria', $request->numAuditoria);
        oci_bind_by_name($consulta, ':v_identificacion', $request->doc);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    } else {
        echo 0;
    }
}

function listar_criterios()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    if ($_SESSION['cedula'] == $request->cedula) {
        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_criterios(:v_auditoria, :v_identificacion, :v_servicio, :v_estandar, :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_auditoria', $request->codAuditoria);
        oci_bind_by_name($consulta, ':v_identificacion', $request->cedula);
        oci_bind_by_name($consulta, ':v_servicio', $request->codServicio);
        oci_bind_by_name($consulta, ':v_estandar', $request->codEstandar);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    } else {
        echo 0;
    }
}

function guardarAvance()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $json = json_encode($request->json);
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_inserta_resultado_auditoria(:v_pjson_row_in, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_pjson_row_in', $json);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function guardarAuditoria()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    if ($_SESSION['cedula'] == $request->cedula) {
        $auditor = $request->cedula;
        $auditoria = $request->auditoria;
        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_finaliza_auditoria(:v_auditor, :v_auditoria, :v_json_out); end;');
        oci_bind_by_name($consulta, ':v_auditor', $auditor);
        oci_bind_by_name($consulta, ':v_auditoria', $auditoria);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    } else {
        echo 0;
    }
}

function tabulacion_resultado()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $auditoria = $request->auditoria;
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_tabulacion_resultado(:v_auditoria, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_auditoria', $auditoria);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function reprograma_auditoria()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $auditoria = $request->auditoria;
    $fecha_reprogramacion = $request->fecha_reprogramacion;
    $auditor = $request->auditor;
    if ($_SESSION['cedula'] == $request->auditor) {
        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_reprograma_auditoria(:v_auditoria, :v_fecha_reprogramacion, :v_auditor, :v_json_row); end;');
        oci_bind_by_name($consulta, ':v_auditoria', $auditoria);
        oci_bind_by_name($consulta, ':v_fecha_reprogramacion', $fecha_reprogramacion);
        oci_bind_by_name($consulta, ':v_auditor', $auditor);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    } else {
        echo 0;
    }
}

function resultado_auditoria()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $auditoria = $request->auditoria;

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_resultado_auditoria(:v_auditoria, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_auditoria', $auditoria);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function listar_hallazgos()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $auditoria = $request->auditoria;

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_hallazgos(:v_auditoria, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_auditoria', $auditoria);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function uploadFiles()
{
    global $request;

    $ruta = '/cargue_ftp/Digitalizacion/Genesis/Salud/Auditoria_Salud/';
    $file = $request->file;
    $tipo_soporte = $request->tipo_soporte;
    $i = 0;
    $nit = $file[0]->NIT;
    $path = 'Salud/Auditoria_Salud/' . $nit;
    $arrRutas = [];
    $arrErrors = [];
    require('../../sftp_cloud/UploadFile.php');
    while ($i <= count($file)) {
        if (isset($file[$i]->B64)) {
            $name = '1' . $file[$i]->CODIGO_AUDITORIA . $file[$i]->CODIGO . '.pdf';
            $archivos = $file[$i]->B64;
            list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
            list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
            $base64 = base64_decode($archivos); // Proceso para traer el Base64
            file_put_contents('../../../temp/' . $name, $base64);
            $subio = UploadFile($path, $name);
            explode('-', $subio);
            if ($subio[0] != '0') {
                array_push(
                    $arrRutas,
                    (object) [
                        'RUTA' => $subio,
                        'CODIGO_AUDITORIA' => $file[$i]->CODIGO_AUDITORIA,
                        'CODIGO_ESTANDAR' => $file[$i]->CODIGO,
                        'TIPO_SOPORTE' => $tipo_soporte
                    ]
                );
            } else {
                return 0;
            }
        }
        $i++;
    }
    echo guardarRutas($arrRutas);
}

function guardarRutas($rutas)
{
    // var_dump($rutas);
    require_once('../../config/dbcon_prod.php');
    if (count($rutas) != 7) return 0;
    $ruta = json_encode($rutas);
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_registro_soporte(:v_pjson_row_in, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_pjson_row_in', $ruta);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function obtenerRutas()
{
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_soporte(:v_auditoria, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_auditoria', $request->auditoria);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
        // for ($i=0; $i < count(json_decode($json)) ; $i++) { 
        //     DownloadFile(json_decode($json)[$i]->ruta);
        //     // echo json_decode($json)[$i]->ruta;
        // }
    } else {
        echo 0;
    }
    oci_close($c);
}

function downloadFiles()
{
    // require_once('../../config/dbcon_prod.php');
    require('../../sftp_cloud/DownloadFile.php');
    global $request;
    echo (DownloadFile($request->ruta));
}
