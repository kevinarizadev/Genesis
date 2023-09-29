<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
	$function();
	function cargaInicio(){
		require_once('../config/dbcon.php');
		$documento = $_SESSION['cedula'];
		$consulta = oci_parse($c,'begin pq_genesis.p_carga_inicio_genesis(:v_documento_ter, :v_birthday); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_birthday', $clob,-1,OCI_B_CLOB);
		oci_bind_by_name($consulta,':v_documento_ter',$documento);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
	function configurarCuenta(){
		require_once('../config/dbcon_prod.php');
		function subirProyecto($file,$name,$ext){
			$tmpfile = $name.'.'.$ext;
			list(, $file) = explode(';', $file);
			list(, $file) = explode(',', $file);
			$file = base64_decode($file);
			file_put_contents('../../images/perfil/'.$tmpfile, $file);
			return 'images/perfil/'.$tmpfile;
		}
		global $request;
		$dataRegistro = json_decode($request->data);
        if(isset($dataRegistro->img) && $dataRegistro->img != "" && $dataRegistro->img != 'assets/images/users/default-user.png'){
            $nombre_archivo = $_SESSION['cedula'];
            $img_bs64 = $dataRegistro->img;
            $extension = $dataRegistro->ext;
			$url = subirProyecto($img_bs64,$nombre_archivo,$extension);
        } else if($dataRegistro->img == 'assets/images/users/default-user.png') {
            $url = $dataRegistro->img;
		}  else {
            $url = "";
		}
		$consulta = oci_parse($c,'begin pq_genesis.p_actualiza_password(:v_pdocumento,:v_ppassword_anterior,:v_ppassword_nueva,:v_ppassword_verifica,:v_pimagen,:v_json_res); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$_SESSION['cedula']);
        oci_bind_by_name($consulta,':v_ppassword_anterior',$dataRegistro->passwordCurrent);
        oci_bind_by_name($consulta,':v_ppassword_nueva',$dataRegistro->passwordNew);
		oci_bind_by_name($consulta,':v_ppassword_verifica',$dataRegistro->passwordVerify);
		oci_bind_by_name($consulta,':v_pimagen',$url);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

function gestionINS()
{
    // mockGestionINS();

    global $request;

    require_once('../config/dbcon_prod.php');

    $cargue = $request->data->cargue;

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_listado_gestion_covid19 (
          :v_id_cargue,
          :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_id_cargue', $cargue);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);


    $datos = null;

    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    oci_free_statement($consulta);
    oci_free_statement($cursor);

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}


function validarCargue()
{
    // pq_genesis_salud_publica.p_valida_cargue(v_response => :v_response);

    global $request;

    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_valida_cargue (
          :v_response
        ); end;'
    );

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    oci_close($c);
    $data = json_decode($clob->read($clob->size()), true);

    echo json_encode([
        "data" => $data
    ]);
    exit;
}

function procesarArchivoINS()
{
    global $request;

    require_once('../config/dbcon_prod.php');

    set_time_limit(-1);

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_gestion_cargue_covid19 (
          :v_response
        ); end;'
    );

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    oci_close($c);
    $data = json_decode($clob->read($clob->size()), true);

    echo json_encode([
        "data" => $data
    ]);
    exit;
}

function listadoGestionINS()
{

    // mockListadoGestionINS();
    $start = new DateTime();
    global $request;

    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_listado_gestion_covid19 (
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

    $end = new DateTime();

    header('Server-Timing: db;desc="Query time";dur=' . $start->diff($end)->s);

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}

function listaCargueINS()
{
     $start = microtime(true);
    global $request;

    require_once('../config/dbcon_prod.php');

    $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_listado_id_gestion (
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

    $end = microtime(true);

    header('Server-Timing: db;desc="Query time";dur=' . (round($end - $start, 3) * 1000));

    echo json_encode([
        "data" => count($datos) === 0 ? null : $datos
    ]);
    exit;
}


function contadoresINS()
{
    // mockGestionINS();

    global $request;

    require_once('../config/dbcon_prod.php');

    $cargue = $request->data->cargue;

    // $cursor = oci_new_cursor($c);

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_salud_publica.p_mostrar_gestion_covid19 (
          :v_id_cargue,
          :v_response
        ); end;'
    );

    oci_bind_by_name($consulta, ':v_id_cargue', $cargue);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);

    // oci_execute($consulta);
    // oci_execute($cursor, OCI_DEFAULT);


    // $datos = null;

    // oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    // oci_free_statement($consulta);
    // oci_free_statement($cursor);

    // echo json_encode([
    //     "data" => count($datos) === 0 ? null : $datos
    // ]);
    exit;
}

function Carga_Not_Glosa(){
        global $request;
        require_once('../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_glosa.p_obtener_notificacion(:v_nit,:v_texto_out); end;');
        oci_bind_by_name($consulta,':v_nit',$request->nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_texto_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Obtener_Tipos_Documentos(){
        global $request;
        require_once('../config/dbcon_prod.php');
        $cursor = oci_new_cursor($c);
        $consulta = oci_parse($c,'begin pq_genesis.p_obtener_tipo_documento(:v_tipo,:v_response); end;');
        oci_bind_by_name($consulta,':v_tipo',$request->Tipo);
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
    }
