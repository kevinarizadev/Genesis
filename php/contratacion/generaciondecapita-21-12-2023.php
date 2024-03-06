<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function cargaannos()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo order by 1 desc");
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function cargaperiodos() {
	global $request;
	require_once('../config/dbcon_prod.php');
	$anno = $request->anno;
	$consulta = oci_parse($c, "SELECT pern_numero IDE, perf_inicial, perf_final,
		case when pern_numero = 1 then 'ENERO'
			  when pern_numero = 2 then 'FEBRERO'
			  when pern_numero = 3 then 'MARZO'
			  when pern_numero = 4 then 'ABRIL'
			  when pern_numero = 5 then 'MAYO'
			  when pern_numero = 6 then 'JUNIO'
			  when pern_numero = 7 then 'JULIO'
			  when pern_numero = 8 then 'AGOSTO'
			  when pern_numero = 9 then 'SEPTIEMBRE'
			  when pern_numero = 10 then 'OCTUBRE'
			  when pern_numero = 11 then 'NOVIEMBRE'
			  when pern_numero = 12 then 'DICIEMBRE'
end as NOMBRE
from bper_periodo
where pern_anno = :v_anno
and pern_numero not in (0,99) order by perf_final asc");
	oci_bind_by_name($consulta, ':v_anno', $anno);
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}
function crearperiodo()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $datos = json_decode($request->datos);
    // $periodo_cap = $datos->periodo_cap;
    // $fechainicio = $datos->fechainicio;
    // $fechafinal = $datos->fechafinal;
    // $responsable = $datos->responsable;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_CREA_PERIODO(:v_per_capitacion,
                                                                                    :v_fec_inicio,
                                                                                    :v_fec_final ,
                                                                                    :v_cod_usuario,
                                                                                    :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_per_capitacion', $request->periodo_cap);
    oci_bind_by_name($consulta, ':v_fec_inicio', $request->fechainicio);
    oci_bind_by_name($consulta, ':v_fec_final', $request->fechafinal);
    oci_bind_by_name($consulta, ':v_cod_usuario', $request->responsable);

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
function generarcapita()
{
    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_CREAR_MATRIZ(:v_periodo,
                                                                            :v_usuario,
                                                                            :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_periodo', $request->periodoc);
    oci_bind_by_name($consulta, ':v_usuario', $request->usuarior);


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
function obtenerconcepto()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_OBTENER_CONCEPTO (:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function validarperiodo()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_VALIDA_PERIODO (:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function aperturarCapita()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $estado='C';
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_APERTURA_CAPITA (:v_estado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_estado', $estado);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function validaciondegeneracionCapita()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_VALIDA_PRIMERO(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function cambiarestado()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $departamento = $request->departamento;
    $ciudad = $request->ciudad;
    $estado = $request->estado;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_U_CIUDADES_UNICAS( :v_depa,
                                                                            :v_ciudad,
                                                                            :v_estado,
                                                                            :v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_depa', $departamento);
    oci_bind_by_name($consulta, ':v_ciudad', $ciudad);
    oci_bind_by_name($consulta, ':v_estado', $estado);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function cargarmatriz()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cargue_concepto = $request->cargue_concepto;
    $cargue_json = $request->cargue_json;
    $cargue_cantidad = $request->cargue_cantidad;

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_UI_CONCEPTOS (  :v_concepto,
                                                                            :v_pjson_row_in,
                                                                            :v_cantidad,
                                                                            :v_pjson_row); end;');
    oci_bind_by_name($consulta, ':v_concepto', $cargue_concepto);
    $jsonin = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
    $jsonin->writeTemporary($cargue_json);
    oci_bind_by_name($consulta, ':v_cantidad', $cargue_cantidad);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function estadodelperiodo()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_ESTADO_PERIODO (:v_periodo,:v_json_row); end;');

    oci_bind_by_name($consulta, ':v_periodo', $request->estadoperiodo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}
function estadocapita()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_ESTADO_CAPITA (:v_periodo,
                                                                        :v_json_row); end;');

    oci_bind_by_name($consulta, ':v_periodo', $request->estadocapita);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {

        echo 0;
    }
    oci_close($c);
}





