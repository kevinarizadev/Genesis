<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_OBTENER_DATOS_AFILIADOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_DATOS_AFILIADOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_DATOS_AFILIADOS_APELLIDOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_DATOS_AFILIADOS_APELLIDOS(       :v_papellido1,
                                                                                                                    :v_papellido2,
                                                                                                                    :v_pnombre1,
                                                                                                                    :v_pnombre2,
                                                                                                                    :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_papellido1', $request->v_papellido1);
    oci_bind_by_name($consulta, ':v_papellido2', $request->v_papellido2);
    oci_bind_by_name($consulta, ':v_pnombre1', $request->v_pnombre1);
    oci_bind_by_name($consulta, ':v_pnombre2', $request->v_pnombre2);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_AUTORIZACIONES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_AUTORIZACIONES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_BENEFICIARIOS_GRUPOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_BENEFICIARIOS_GRUPOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_CODIGOS_URGENCIAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_CODIGOS_URGENCIAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_CONTRATOS_PRESTACION()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_CONTRATOS_PRESTACION(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_EMPLEADORES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_EMPLEADORES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_FACTURAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_FACTURAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_GLOSAS_BDUA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_GLOSAS_BDUA(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_INCAPACIDADES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_INCAPACIDADES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_NOVEDADES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_NOVEDADES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_REFERENCIAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_REFERENCIAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}


function P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_TRASLADOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_TRASLADOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_TUTELAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_TUTELAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_PORTABILIDAD()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_PORTABILIDAD(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_PQRS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_PQRS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_LISTA_CENSO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.p_obtener_lista_censo(:v_ptipo_documento,:v_pdocumento,:v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipo_documento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
