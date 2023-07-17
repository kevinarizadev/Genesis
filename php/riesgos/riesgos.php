<?php
$postdata = file_get_contents("php://input");
//error_reporting(0);
$request = json_decode($postdata);
$function = $request->function;
$function();


//funcion donde trae todos los listados para la creacion de riesgos y controles
function consultar_listado()
{
    require_once('../config/dbcon_prod.php');
    $consulta =  oci_parse($c, 'BEGIN OASIS.pq_genesis.p_gnot_lista_areas( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_procesos = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_procesos = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_PROBABILIDAD_INHERENTE( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_probabilidad_inherente = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_probabilidad_inherente = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_TIPO_RIESGO( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_tipo_riesgo = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_tipo_riesgo = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_AFECTUACION_REPUTACIONAL( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_afectuacion_reputacional = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_afectuacion_reputacional = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_AFECTUACION_ECONOMICA( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_afectuacion_economica = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_afectuacion_economica = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_AFECTUACION_SALUD_AFILIADO( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_afectuacion_salud_afiliado = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_afectuacion_salud_afiliado = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_TH.P_LISTAR_CARGO( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_responsables = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_responsables = json_encode([]);
    }

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ATRIBUTOS_CONTROL_TIPO( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_atributos_control_tipo = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_atributos_control_tipo = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ATRIBUTOS_CONTROL_IMPLEMENTACION( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_atributos_control_implementacion = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_atributos_control_implementacion = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ATRIBUTOS_CONTROL_DOCUMENTACION( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_atributos_control_documentacion = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_atributos_control_documentacion = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ATRIBUTOS_CONTROL_FRECUENCIA( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_atributos_control_frecuencia = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_atributos_control_frecuencia = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ATRIBUTOS_CONTROL_EVIDENCIA( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_atributos_control_evidencias = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_atributos_control_evidencias = json_encode([]);
    }
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_ESTADO_RIESGO( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_estado_riesgo = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_estado_riesgo = json_encode([]);
    }
    oci_close($c);
    $formato = array(
        'procesos' => json_decode($json_sp_rc_get_procesos),
        'probabilidadInherente' => json_decode($json_sp_rc_get_probabilidad_inherente),
        'tipoRiesgo' => json_decode($json_sp_rc_get_tipo_riesgo),
        'afectuacionReputacional' => json_decode($json_sp_rc_get_afectuacion_reputacional),
        'afectuacionEconomica' => json_decode($json_sp_rc_get_afectuacion_economica),
        'afectuacionSaludAfiliado' => json_decode($json_sp_rc_get_afectuacion_salud_afiliado),
        'responsables' => json_decode($json_sp_rc_get_responsables),
        'atributoscontroltipo' => json_decode($json_sp_rc_get_atributos_control_tipo),
        'implementacion' => json_decode($json_sp_rc_get_atributos_control_implementacion),
        'documentacion' => json_decode($json_sp_rc_get_atributos_control_documentacion),
        'frecuencia' => json_decode($json_sp_rc_get_atributos_control_frecuencia),
        'evidencias' => json_decode($json_sp_rc_get_atributos_control_evidencias),
        'estado' => json_decode($json_sp_rc_get_estado_riesgo)
    );
    $respuesta = json_encode($formato);
    echo $respuesta;
}

//funcion de guardado control
function SP_RC_POST_GUARDAR_RIESGO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_GUARDAR_RIESGO(
                                                                                            :P_V_NUMERO_RIESGO,
                                                                                            :P_V_ESTADO,
                                                                                            :P_V_PROCESO,
                                                                                            :P_V_IMPACTO_RIESGO,
                                                                                            :P_V_CAUSA_INMEDIATA,
                                                                                            :P_V_CAUSA_RAIZ,
                                                                                            :P_V_DESCRIPCION_RIESGO,
                                                                                            :P_V_TIPO_RIESGO,
                                                                                            :P_I_PROBALIDAD_INHERENTE_ID,
                                                                                            :P_I_AFECTACION_REPUTACIONAL_ID,
                                                                                            :P_I_AFECTACION_ECONOMICA_ID,
                                                                                            :P_I_AFECTACION_SALUD_AFILIADOS_ID,
                                                                                            :P_V_ZONA_RIESGO_INHERENTE,
                                                                                            :P_V_ESTADO_RIESGO,
                                                                                            :P_V_OBSERVACION_RIESGO,
                                                                                            :P_V_USUARIO_CREACION,
                                                                                            :V_PJSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->P_V_NUMERO_RIESGO);
    oci_bind_by_name($consulta, ':P_V_ESTADO', $request->P_V_ESTADO);
    oci_bind_by_name($consulta, ':P_V_PROCESO', $request->P_V_PROCESO);
    oci_bind_by_name($consulta, ':P_V_IMPACTO_RIESGO', $request->P_V_IMPACTO_RIESGO);
    oci_bind_by_name($consulta, ':P_V_CAUSA_INMEDIATA', $request->P_V_CAUSA_INMEDIATA);
    oci_bind_by_name($consulta, ':P_V_CAUSA_RAIZ', $request->P_V_CAUSA_RAIZ);
    oci_bind_by_name($consulta, ':P_V_DESCRIPCION_RIESGO', $request->P_V_DESCRIPCION_RIESGO);
    oci_bind_by_name($consulta, ':P_V_TIPO_RIESGO', $request->P_V_TIPO_RIESGO);
    oci_bind_by_name($consulta, ':P_I_PROBALIDAD_INHERENTE_ID', $request->P_I_PROBALIDAD_INHERENTE_ID);
    oci_bind_by_name($consulta, ':P_I_AFECTACION_REPUTACIONAL_ID', $request->P_I_AFECTACION_REPUTACIONAL_ID);
    oci_bind_by_name($consulta, ':P_I_AFECTACION_ECONOMICA_ID', $request->P_I_AFECTACION_ECONOMICA_ID);
    oci_bind_by_name($consulta, ':P_I_AFECTACION_SALUD_AFILIADOS_ID', $request->P_I_AFECTACION_SALUD_AFILIADOS_ID);
    oci_bind_by_name($consulta, ':P_V_ZONA_RIESGO_INHERENTE', $request->P_V_ZONA_RIESGO_INHERENTE);
    oci_bind_by_name($consulta, ':P_V_ESTADO_RIESGO', $request->P_V_ESTADO_RIESGO);
    oci_bind_by_name($consulta, ':P_V_OBSERVACION_RIESGO', $request->P_V_OBSERVACION_RIESGO);
    oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//funcion de guardado control
function SP_RC_POST_GUARDAR_CONTROL()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_GUARDAR_CONTROL(
                                                                                          :P_V_NUMERO_RIESGO,
                                                                                          :P_N_NUMERO_CONTROL,
                                                                                          :P_V_ESTADO,
                                                                                          :P_V_DESCRIPCION_CONTROL,
                                                                                          :P_I_RESPONSABLE_ID,
                                                                                          :P_I_AC_TIPO_ID,
                                                                                          :P_I_AC_IMPLEMENTACION_ID,
                                                                                          :P_I_AC_DOCUMENTACION_ID,
                                                                                          :P_I_AC_FRECUENCIA_ID,
                                                                                          :P_I_AC_EVIDENCIA_ID,
                                                                                          :P_I_VALORACION_CONTROL,
                                                                                          :P_V_USUARIO_CREACION,
                                                                                          :V_PJSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->P_V_NUMERO_RIESGO);
    oci_bind_by_name($consulta, ':P_N_NUMERO_CONTROL', $request->P_N_NUMERO_CONTROL);
    oci_bind_by_name($consulta, ':P_V_ESTADO', $request->P_V_ESTADO);
    oci_bind_by_name($consulta, ':P_V_DESCRIPCION_CONTROL', $request->P_V_DESCRIPCION_CONTROL);
    oci_bind_by_name($consulta, ':P_I_RESPONSABLE_ID', $request->P_I_RESPONSABLE_ID);
    oci_bind_by_name($consulta, ':P_I_AC_TIPO_ID', $request->P_I_AC_TIPO_ID);
    oci_bind_by_name($consulta, ':P_I_AC_IMPLEMENTACION_ID', $request->P_I_AC_IMPLEMENTACION_ID);
    oci_bind_by_name($consulta, ':P_I_AC_DOCUMENTACION_ID', $request->P_I_AC_DOCUMENTACION_ID);
    oci_bind_by_name($consulta, ':P_I_AC_FRECUENCIA_ID', $request->P_I_AC_FRECUENCIA_ID);
    oci_bind_by_name($consulta, ':P_I_AC_EVIDENCIA_ID', $request->P_I_AC_EVIDENCIA_ID);
    oci_bind_by_name($consulta, ':P_I_VALORACION_CONTROL', $request->P_I_VALORACION_CONTROL);
    oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

//funcion donde trae todos los listados de riesgos
function SP_RC_GET_RIESGO_CONTROL()
{
    require_once('../config/dbcon_prod.php');
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_RIESGO_CONTROL( :v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}





//funcion excel
function SP_RC_GET_DATA_EXCEL_RIESGO_CONTROL()
{
    global $request;
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_DATA_EXCEL_RIESGO_CONTROL( :P_V_JSON, :v_json_row); end;');
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

//informacion que se pinta la matriz de riesgos
function SP_RC_GET_DATA_MATRIZ_RIESGO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_DATA_MATRIZ_RIESGO(  :P_V_USUARIO,
                                                                            :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_USUARIO', $request->P_V_USUARIO);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}




//funcion donde trae  un  riesgos
function SP_RC_GET_RIESGO_CONTROL_ID()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_RIESGO_CONTROL_ID(   :P_V_NUMERO_RIESGO,
                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->V_NUMERO_RIESGO);
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

//funcion donde trae todos los listados de controles
function SP_RC_GET_CONTROL_DETALLE()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_CONTROL_DETALLE(   :P_V_NUMERO_RIESGO,
                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->V_NUMERO_RIESGO);
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

//funcion donde trae todos la probabilidad residual
function SP_RC_GET_PROBABILIDAD_RESIDUAL()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_PROBABILIDAD_RESIDUAL(   :P_V_NUMERO_RIESGO,
                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->V_NUMERO_RIESGO);
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

//funcion donde trae todos el impacto residual
function SP_RC_GET_IMPACTO_RESIDUAL()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_IMPACTO_RESIDUAL(   :P_V_NUMERO_RIESGO,
                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->V_NUMERO_RIESGO);
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


//funcion guarda estado del riesgo
function SP_RC_POST_GUARDAR_ESTADO()
{

    require_once('../config/dbcon_prod.php');
    global $request;
    // echo  $request->P_V_ESTADO_RIESGO;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_GUARDAR_ESTADO(     :P_V_NUMERO_RIESGO,
                                                                                                :P_V_ESTADO_RIESGO,
                                                                                                :P_V_OBSERVACION_RIESGO,
                                                                                                :P_V_USUARIO_CREACION,
                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->P_V_NUMERO_RIESGO);
    oci_bind_by_name($consulta, ':P_V_ESTADO_RIESGO', $request->P_V_ESTADO_RIESGO);
    oci_bind_by_name($consulta, ':P_V_OBSERVACION_RIESGO', $request->P_V_OBSERVACION_RIESGO);
    oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);
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


//trae los listado de los select en el formulario de eventos materializado
function listado_select_eventos_materializados()
{
    require_once('../config/dbcon_prod.php');

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_MONEDA(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_moneda = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_moneda = json_encode([]);
    }

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_TIPO_PERDIDAS(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_tipo_perdidas = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_tipo_perdidas = json_encode([]);
    }

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_CLASE_EVENTO(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_clase_eventos = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_clase_eventos = json_encode([]);
    }

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_GENESIS.P_GNOT_LISTA_AREAS(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json_sp_rc_get_procesos = $clob->read($clob->size());
    } else {
        $json_sp_rc_get_procesos = json_encode([]);
    }

    oci_close($c);
    $formato = array(
        'divisas' => json_decode($json_sp_rc_get_moneda),
        'tipo_perdidas' => json_decode($json_sp_rc_get_tipo_perdidas),
        'clase_eventos' => json_decode($json_sp_rc_get_clase_eventos),
        'procesos' => json_decode($json_sp_rc_get_procesos)
    );
    $respuesta = json_encode($formato);
    echo $respuesta;
}

//informacion que se pinta en la grilla de eventos materializados
function listado_grilla_eventos_materializado()
{
    require_once('../config/dbcon_prod.php');
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_EVENTOS_MATERIALIZADOS(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

function SP_RC_POST_GUARDAR_EVENTO_MATERIALIZADO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_EVENTOS_MATERIALIZADOS(
                                                                                          :P_V_NUMERO_REFERENCIA,
                                                                                          :P_V_ESTADO,
                                                                                          :P_V_PROCESO,
                                                                                          :P_D_FECHA_DESCUBRIMIENTO,
                                                                                          :P_D_FECHA_INICIO,
                                                                                          :P_D_FECHA_FINALIZACION,
                                                                                          :P_V_DESCRIPCION_EVENTO,
                                                                                          :P_V_PRODUCTO_SERVICIO_AFECTADO,
                                                                                          :P_V_CLASE_EVENTO,
                                                                                          :P_V_TIPO_PERDIDA,
                                                                                          :P_V_DIVISA_ID,
                                                                                          :P_I_CUANTIA,
                                                                                          :P_I_CUANTIA_TOTAL_RECUPERADA,
                                                                                          :P_I_CUANTIA_RECUPERADA_SEGUROS,
                                                                                          :P_V_CUENTAS_PLAN_CUENTAS_AFECTADAS,
                                                                                          :P_D_FECHA_CONTABILIZACION,
                                                                                          :P_V_DATOS_REGISTRO,
                                                                                          :P_V_USUARIO_CREACION,
                                                                                          :V_PJSON_ROW); end;');

    oci_bind_by_name($consulta, ':P_V_NUMERO_REFERENCIA', $request->P_V_NUMERO_REFERENCIA);
    oci_bind_by_name($consulta, ':P_V_ESTADO', $request->P_V_ESTADO);
    oci_bind_by_name($consulta, ':P_V_PROCESO', $request->P_V_PROCESO);
    oci_bind_by_name($consulta, ':P_D_FECHA_DESCUBRIMIENTO', $request->P_D_FECHA_DESCUBRIMIENTO);
    oci_bind_by_name($consulta, ':P_D_FECHA_INICIO', $request->P_D_FECHA_INICIO);
    oci_bind_by_name($consulta, ':P_D_FECHA_FINALIZACION', $request->P_D_FECHA_FINALIZACION);
    oci_bind_by_name($consulta, ':P_V_DESCRIPCION_EVENTO', $request->P_V_DESCRIPCION_EVENTO);
    oci_bind_by_name($consulta, ':P_V_PRODUCTO_SERVICIO_AFECTADO', $request->P_V_PRODUCTO_SERVICIO_AFECTADO);
    oci_bind_by_name($consulta, ':P_V_CLASE_EVENTO', $request->P_V_CLASE_EVENTO);
    oci_bind_by_name($consulta, ':P_V_TIPO_PERDIDA', $request->P_V_TIPO_PERDIDA);
    oci_bind_by_name($consulta, ':P_V_DIVISA_ID', $request->P_V_DIVISA_ID);
    oci_bind_by_name($consulta, ':P_I_CUANTIA', $request->P_I_CUANTIA);
    oci_bind_by_name($consulta, ':P_I_CUANTIA_TOTAL_RECUPERADA', $request->P_I_CUANTIA_TOTAL_RECUPERADA);
    oci_bind_by_name($consulta, ':P_I_CUANTIA_RECUPERADA_SEGUROS', $request->P_I_CUANTIA_RECUPERADA_SEGUROS);
    oci_bind_by_name($consulta, ':P_V_CUENTAS_PLAN_CUENTAS_AFECTADAS', $request->P_V_CUENTAS_PLAN_CUENTAS_AFECTADAS);
    oci_bind_by_name($consulta, ':P_D_FECHA_CONTABILIZACION', $request->P_D_FECHA_CONTABILIZACION);
    oci_bind_by_name($consulta, ':P_V_DATOS_REGISTRO', $request->P_V_DATOS_REGISTRO);
    oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_PJSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function permisos_modulos()
{

    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_MODULOS_PERMISOS_USUARIOS(  :P_V_USUARIO,
                                                                                                        :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_USUARIO', $request->P_V_USUARIO);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

function guardar_permisos()
{
    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_OPCIONES_MODULOS_PERMISO_USUARIOS(:P_V_ESTADO,
                                                                                                              :P_V_USUARIO_PERMISO,
                                                                                                              :P_V_ACCION_ID,
                                                                                                              :P_V_USUARIO_CREACION,
                                                                                                              :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_ESTADO', $request->P_V_ESTADO);
    oci_bind_by_name($consulta, ':P_V_USUARIO_PERMISO', $request->P_V_USUARIO_PERMISO);
    oci_bind_by_name($consulta, ':P_V_ACCION_ID', $request->P_V_ACCION_ID);
    oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}




// function  POST_GUARDAR_RIESGO()
// {
//     require_once('../config/dbcon_prod.php');
//     global $request;
//     $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_POST_GUARDAR_ESTADO(:P_V_NUMERO_RIESGO ,:P_V_ESTADO_RIESGO ,:P_V_OBSERVACION_RIESGO,:P_V_OBSERVACION_RIESGO,:V_JSON_ROW); end;');
//     oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO ', $request->P_V_NUMERO_RIESGO);
//     oci_bind_by_name($consulta, ': P_V_ESTADO_RIESGO,', $request->P_V_ESTADO_RIESGO,);
//     oci_bind_by_name($consulta, ':P_V_OBSERVACION_RIESGO', $request->P_V_OBSERVACION_RIESGO);
//     oci_bind_by_name($consulta, ':P_V_USUARIO_CREACION', $request->P_V_USUARIO_CREACION);

//     $clob = oci_new_descriptor($c, OCI_D_LOB);
//     oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
//     oci_execute($consulta, OCI_DEFAULT);
//     if (isset($clob)) {
//         $respuesta = $clob->read($clob->size());
//     } else {
//         $respuesta = json_encode([]);
//     }
//     echo $respuesta;
// }

function buscar_usuario()
{
    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_GENESIS.P_OBTENER_ROL(:V_PUSUARIO,
                                                                     :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':V_PUSUARIO', $request->V_PUSUARIO);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

function permisos_usuario_modulo()
{
    require_once('../config/dbcon_prod.php');
    global $request;

    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_MODULOS_PERMISOS_USUARIOS(:P_V_CODIGO,
                                                                                                     :P_V_USUARIO,
                                                                                                     :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_CODIGO', $request->P_V_CODIGO);
    oci_bind_by_name($consulta, ':P_V_USUARIO', $request->P_V_USUARIO);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}

//informacion que se pinta la matriz de riesgos
function SP_RC_GET_HIS_OBSERVACION_RIESGO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_RC_RIESGO_CONTROL.SP_RC_GET_HIS_OBSERVACION_RIESGO(  :P_V_NUMERO_RIESGO,
                                                                                                    :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_NUMERO_RIESGO', $request->P_V_NUMERO_RIESGO);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;
}
