<?php
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
//Obtener departamentos
function obtenerDepartamentos()
{
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RD_REGISTRO_DENUNCIA.P_RD_GET_DEPARTAMENTOS(:v_json_row); end;');
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

//Obtener ciudades
function obtenerCiudades()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RD_REGISTRO_DENUNCIA.P_RD_GET_CIUDADES(:v_cod_departamento, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_cod_departamento', $request->departamento);
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

//Obtener denuncias
function obtenerDenuncias()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RD_REGISTRO_DENUNCIA.P_RD_GET_LISTADO_DENUNCIA_DP_CIUDAD_LISTA(:v_cod_departamento, :v_cod_ciudad, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_cod_departamento', $request->departamento);
    oci_bind_by_name($consulta, ':v_cod_ciudad', $request->municipio);
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