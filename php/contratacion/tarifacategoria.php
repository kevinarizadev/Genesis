<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function P_BUSCAR_CONTRATOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_CONTRATOS(   :v_pnumero,
                                                                                        :v_pdocumento,
                                                                                        :v_pestado,
                                                                                        :v_pnit,
                                                                                        :v_json_row
                                                                                         ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pnumero', $request->codigo);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->regimen);
    oci_bind_by_name($consulta, ':v_pestado', $request->estado);
    oci_bind_by_name($consulta, ':v_pnit', $request->prestador);
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

function P_OBTENER_SERVICIOS_CONTRATO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_SERVICIOS_CONTRATO( :v_pnumero,
                                                                                            :v_pubicacion,
                                                                                            :v_pdocumento,
                                                                                            :v_json_row
                                                                                            ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pnumero', $request->codigo);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
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

function P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO(   :v_pnumero,
                                                                                                        :v_pubicacion,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pservicio,
                                                                                                        :v_json_row
                                                                                                    ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pnumero', $request->codigo);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pservicio', $request->v_pservicio);
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

function P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO(   :v_pnumero,
                                                                                                                    :v_pubicacion,
                                                                                                                    :v_pdocumento,
                                                                                                                    :v_pservicio,
                                                                                                                    :v_pproducto,
                                                                                                                    :v_json_row
                                                                                                                ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pnumero', $request->codigo);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pservicio', $request->v_pservicio);
    oci_bind_by_name($consulta, ':v_pproducto', $request->v_pproducto);
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

function p_lista_tarifa()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_TARIFA(   :v_pcodigo,
                                                                                  :v_producto,
                                                                                  :v_json_row
                                                                              ); end;');

    oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_producto', $request->producto);
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

function P_INSERTA_CONTRATO_ALTERNO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_INSERTA_CONTRATO_ALTERNO(   :v_pnumero,
                                                                                            :v_pdocumento,
                                                                                            :v_pubicacion,
                                                                                            :v_pnit,
                                                                                            :v_pproducto,
                                                                                            :v_pservicio,
                                                                                            :v_pcodclasificacion,
                                                                                            :v_prenglon,
                                                                                            :v_pcodtarifa,
                                                                                            :v_psuma,
                                                                                            :v_pporcentaje,
                                                                                            :v_pvalor,
                                                                                            :v_json_row
                                                                                        ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
    oci_bind_by_name($consulta, ':v_pnit', $request->v_pnit);
    oci_bind_by_name($consulta, ':v_pproducto', $request->v_pproducto);
    oci_bind_by_name($consulta, ':v_pservicio', $request->v_pservicio);
    oci_bind_by_name($consulta, ':v_pcodclasificacion', $request->v_pcodclasificacion);
    oci_bind_by_name($consulta, ':v_prenglon', $request->v_prenglon);
    oci_bind_by_name($consulta, ':v_pcodtarifa', $request->v_pcodtarifa);
    oci_bind_by_name($consulta, ':v_psuma', $request->v_psuma);
    oci_bind_by_name($consulta, ':v_pporcentaje', $request->v_pporcentaje);
    oci_bind_by_name($consulta, ':v_pvalor', $request->v_pvalor);
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