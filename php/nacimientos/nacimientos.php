<?php
// ini_set('display_errors', 0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function cantidadxseccional()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_cantidadxseccional(:v_anno,
    //                                                                                 :v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_anno',$request->anno);
    // $clob = oci_new_descriptor($c,OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    // oci_execute($consulta,OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    //     oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_cantidadxseccional_new (
            :v_anno,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    echo json_encode($datos);
    exit;
}
function cantidadxseccional_origen()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_cantidadxsecc_ori(:v_anno,
    //                                                                                 :v_json_row); end;');
    // oci_bind_by_name($consulta, ':v_anno', $request->anno);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_cantidadxsecc_ori_new (
            :v_anno,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    echo json_encode($datos);
    exit;
}
function cantidadxmunicipio()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_cantidadxmunicipio(:v_anno,
    //                                                                                 :v_seccional,
    //                                                                                 :v_json_row); end;');
    // oci_bind_by_name($consulta, ':v_anno', $request->anno);
    // oci_bind_by_name($consulta, ':v_seccional', $request->depa);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_cantidadxmunicipio_new (
            :v_anno,
            :v_seccional,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_seccional', $request->depa);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    echo json_encode($datos);
    exit;
}
function totales_anuales()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    //     $consulta = oci_parse($c,'begin pq_genesis_nac.p_obtener_graficaprincipal(:v_anno,
    //                                                                                 :v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_anno',$request->anno);
    // $clob = oci_new_descriptor($c,OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    // oci_execute($consulta,OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    //     oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_graficaprincipal_new (
            :v_anno,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    $formatted = [];

    foreach ($datos as $dato) {
        $formatted[] = [
            "media" => $dato["MEDIA"],
            "cantnacional" => $dato["CANTNACIONAL"],
            "total" => $dato["TOTAL"],
            "porcentajes" => intval($dato["TOTAL"]) > 0 ? (intval($dato["AFILIACIONES"]) / intval($dato["TOTAL"]) * 100) . '%' : '0%',
            "afiliaciones" => $dato["AFILIACIONES"],
        ];
    }

    $errors = oci_error($c);

    if ($errors === false) {
        echo json_encode($formatted);
        exit;
    } else {
        echo json_encode($errors);
        exit;
    }
}
function graficaseccionales()
{
  sleep(10);
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_graficaseccionales_new(:v_anno,
    //                                                                                 :v_seccional,
    //                                                                                 :v_json_row); end;');
    // oci_bind_by_name($consulta, ':v_anno', $request->anno);
    // oci_bind_by_name($consulta, ':v_seccional', $request->seccional);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // $success = oci_execute($consulta, OCI_DEFAULT);

    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_graficaseccionales_new(
          :v_anno,
          :v_seccional,
          :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_seccional', $request->seccional);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    $formatted = [];

    foreach ($datos as $dato) {
        $formatted[] = [
            "media" => $dato["MEDIA"],
            "cantnacional" => $dato["CANTNACIONAL"],
            "total" => $dato["TOTAL"],
            "porcentajes" => intval($dato["TOTAL"]) > 0 ? (intval($dato["AFILIACIONES"]) / intval($dato["TOTAL"]) * 100) . '%' : '0%',
            "afiliaciones" => $dato["AFILIACIONES"],
        ];
    }

    $errors = oci_error($c);

    if ($errors === false) {
        echo json_encode($formatted);
        exit;
    } else {
        echo json_encode($errors);
        exit;
    }
}
function tabla()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_datosseccionales(:v_anno,
    //                                                                                 :v_seccional,
    //                                                                                 :v_json_row); end;');
    // oci_bind_by_name($consulta, ':v_anno', $request->anno);
    // oci_bind_by_name($consulta, ':v_seccional', $request->municipio);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_datosseccionales_new (
            :v_anno,
            :v_seccional,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_seccional', $request->municipio);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    $formatted = [];

    $formatted []= array_map(function ($item) {
      $new = [];
      foreach (array_keys($item) as $key) {
        $new[strtolower($key)] = $item[$key];
      }
      return $new;
    }, $datos);

    echo json_encode($formatted[0]);
    exit;
}
//CNVU - PETICION CAMBIAR DE ESTADO
function cambioestado()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin pq_genesis_nac.p_marca_gestion_nacimiento (
      :v_tipodoc,
      :v_documento,
																	   :v_ano,
																	   :v_estado,
																	   :v_respuesta); end;');

    // echo($request->estado);
    oci_bind_by_name($consulta, ':v_tipodoc', $request->tipo);
    oci_bind_by_name($consulta, ':v_documento', $request->doc);
    oci_bind_by_name($consulta, ':v_ano', $request->ano);
    oci_bind_by_name($consulta, ':v_estado', $request->estado);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}
function modal_datos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_datos_nacimiento(:v_tipodocumento,
    //                                                                                 :v_documento,
    //                                                                                 :v_origen,
    //                                                                                 :v_anno,
    //                                                                                 :v_json_row); end;');
    // oci_bind_by_name($consulta, ':v_tipodocumento', $request->tipoDoc);
    // oci_bind_by_name($consulta, ':v_documento', $request->doc);
    // oci_bind_by_name($consulta, ':v_origen', $request->orig);
    // oci_bind_by_name($consulta, ':v_anno', $request->anno);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_datos_nacimiento_new (
            :v_tipodocumento,
            :v_documento,
            :v_anno,
            :v_response
          ); end;'
    );

    oci_bind_by_name($consulta, ':v_tipodocumento', $request->tipoDoc);
    oci_bind_by_name($consulta, ':v_documento', $request->doc);
    oci_bind_by_name($consulta, ':v_anno', $request->anno);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    echo json_encode($datos);
    exit;
}
function diagnosticos()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    // $consulta = oci_parse($c, 'begin pq_genesis_nac.p_obtener_lista_dx( :v_json_row); end;');
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
    // oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    // oci_execute($consulta, OCI_DEFAULT);
    // $json = $clob->read($clob->size());
    // echo $json;
    // oci_close($c);
    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_nac.p_obtener_lista_dx_new (
            :v_response
          ); end;'
    );
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    oci_close($c);

    echo json_encode($datos);
    exit;
}
