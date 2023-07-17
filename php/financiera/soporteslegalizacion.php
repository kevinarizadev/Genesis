        <?php
        $postdata = file_get_contents("php://input");
        error_reporting(0);
        $request = json_decode($postdata);
        $function = $request->function;
        $function();



        function guardarsoportes(){
            require_once('../config/dbcon_prod.php');
            global $request;
            $datos = json_decode($request->datos);
            $type = $datos->type;
            $documento = $datos->documento;
            $pnombre = $datos->pnombre;
            $snombre = $datos->snombre;
            $papellido = $datos->papellido;
            $sapellido = $datos->sapellido;
            $razonsocial = $datos->razonsocial;
            $direccion = $datos->direccion;
            $telefono = $datos->telefono;
            $ubicacion = $datos->ubicacion;
            $sexo = $datos->sexo;
            $email = $datos->email;
            $tipop = $datos->tipop;
            $rut = $datos->rut;
            $crl = $datos->crl;
            $ccc = $datos->ccc;
            $ccb = $datos->ccb;


            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INICIO.P_CREAR_NO_CONTRATADA(:v_ptipo_documento,
                                                                                    :v_pdocumento,
                                                                                    :v_pprimer_nombre,
                                                                                    :v_psegundo_nombre,
                                                                                    :v_pprimer_apellido,
                                                                                    :v_psegundo_apellido,
                                                                                    :v_prazon_social,
                                                                                    :v_pdireccion,
                                                                                    :v_ptelefono,
                                                                                    :v_pubicacion,
                                                                                    :v_psexo,
                                                                                    :v_pemail,
                                                                                    :v_ptipo,
                                                                                    :v_psoporte_1,
                                                                                    :v_psoporte_2,
                                                                                    :v_psoporte_3,
                                                                                    :v_psoporte_4,
                                                                                    :v_pjson_row); end;');
            oci_bind_by_name($consulta,':v_ptipo_documento',$type);
            oci_bind_by_name($consulta,':v_pdocumento',$documento);
            oci_bind_by_name($consulta,':v_pprimer_nombre',$pnombre);
            oci_bind_by_name($consulta,':v_psegundo_nombre',$snombre);
            oci_bind_by_name($consulta,':v_pprimer_apellido',$papellido);
            oci_bind_by_name($consulta,':v_psegundo_apellido',$sapellido);
            oci_bind_by_name($consulta,':v_prazon_social',$razonsocial);
            oci_bind_by_name($consulta,':v_pdireccion',$direccion);
            oci_bind_by_name($consulta,':v_ptelefono',$telefono);
            oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
            oci_bind_by_name($consulta,':v_psexo',$sexo);
            oci_bind_by_name($consulta,':v_pemail',$email);
            oci_bind_by_name($consulta,':v_ptipo',$tipop);
            oci_bind_by_name($consulta,':v_psoporte_1',$rut);
            oci_bind_by_name($consulta,':v_psoporte_2',$crl);
            oci_bind_by_name($consulta,':v_psoporte_3',$ccc);
            oci_bind_by_name($consulta,':v_psoporte_4',$ccb);

        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }

    
    function obtenerdepartamento(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INICIO.P_OBTENER_DEPARTAMENTO(:v_pjson_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }


    function obtenermunicipio(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $departamento = $request->departamento;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INICIO.P_OBTENER_MUNICIPIOS(:v_pdepartamento,
                                                                                :v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_pdepartamento',$departamento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);

        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

    }


function visualizarsoporteslegalizacion(){
  require_once('../config/dbcon_prod.php');
  global $request;  
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_INICIO.p_listar_ips_no_contratada(:v_pestado,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pestado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function VisualizarDetallesLegalizacion(){
  require_once('../config/dbcon_prod.php');
  global $request;  
  $consulta = oci_parse($c, 'begin PQ_GENESIS_INICIO.P_OBTENER_CANTIDADES_GESTION_NO_CONTRATADA (:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function aprobarIPS(){
  require_once('../config/dbcon_prod.php');
  global $request;

  $type = $request->type;
  $documento = $request->documento;
  $especialidad = $request->especialidad;
  $grupodecuenta = $request->grupodecuenta;
  $tipoimpuesto = $request->tipoimpuesto;
  $observacion = $request->observacion;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin PQ_GENESIS_INICIO.P_APROBAR_NO_CONTRATADA(:v_ptipo_documento,
                                                                            :v_pdocumento,
                                                                            :v_ptern_especialidad,
                                                                            :v_ptern_grupo,
                                                                            :v_ptern_tipo_impuesto,
                                                                            :v_pobservacion,
                                                                            :v_pestado,
                                                                            :v_pjson_row ); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $type);
  oci_bind_by_name($consulta, ':v_pdocumento', $documento);
  oci_bind_by_name($consulta, ':v_ptern_especialidad', $especialidad);
  oci_bind_by_name($consulta, ':v_ptern_grupo', $grupodecuenta);
  oci_bind_by_name($consulta, ':v_ptern_tipo_impuesto', $tipoimpuesto);
    oci_bind_by_name($consulta, ':v_pobservacion', $observacion);
  oci_bind_by_name($consulta, ':v_pestado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}



function SubirSoportes(){
    require_once('../config/dbcon_prod.php');
    require_once('../config/ftpcon.php');
    include('../upload_file/subir_adjunto_tercero.php');
    global $request;
    // variables de parametros
    $archivos = json_decode($request->archivos);
    $documento = $request->documento;
    // otras variables
    $hoy = date('dmY');
    $mes = date('m');
    $ano = date('Y');
    $ruta = $ano.'/'.$mes.'/'.$documento.'/Cargue/';
    $path = '/cargue_ftp/Digitalizacion/Genesis/Tercero/'.$ruta;
    $estado = 0;
    for ($i=0; $i < count($archivos) ; $i++) {
        $name = $archivos[$i]->name.'_'.$documento;
        $subio = subirTerceroFtp($archivos[$i]->src,$path,$name,'pdf',$ruta);
        if ($subio != '0 - Error') {
            $rutas[$i]->ruta = $subio;
            $rutas[$i]->archivo = $archivos[$i]->name;
        }else {
            $estado = $estado + 1;
        }
    }
    if($estado == 0){
        echo json_encode($rutas);
    }else{
        echo '0';
    }
}

// function SubirSoportes(){
//     require_once('../config/dbcon_prod.php');
//     require_once('../config/ftpcon.php');
//     include('../upload_file/subir_adjunto_tercero.php');
//     global $request;
//     // variables de parametros
//     $archivos = json_decode($request->archivos);
//     $documento = $request->documento;
//     // otras variables
//     $hoy = date('dmY');
//     $mes = date('m');
//     $ano = date('Y');
//     $ruta = $ano.'/'.$mes.'/'.$documento.'/Cargue/';
//     $path = '/cargue_ftp/Digitalizacion/Genesis/Tercero/'.$ruta;
//     $estado = 0;
//     for ($i=0; $i < count($archivos) ; $i++) {
//         $name = $archivos[$i]->name.'_'.$documento;
//         $subio = subirTerceroFtp($archivos[$i]->src,$path,$name,'pdf',$ruta);
//         if ($subio != '0 - Error') {
//             $rutas[$i]->ruta = $subio;
//             $rutas[$i]->archivo = substr($archivos[$i]->name, 0, 2);
//         }else {
//             $estado = $estado + 1;
//         }
//     }
//     if($estado == 0){
//         echo json_encode($rutas);
//     }else{
//         echo '0';
//     }
// }


function descargaAdjunto()
{
    require_once('../config/ftpcon.php');
    global $request;
    $file_size = ftp_size($con_id, $request->ruta);
    if ($file_size != -1) {
        $name = uniqid();
        $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
        $name = $name . '.' . $ext;
        $local_file = '../../temp/' . $name;
        $handle = fopen($local_file, 'w');
        if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
            echo $name;
        } else {
            echo "Error";
        }
        ftp_close($con_id);
        fclose($handle);
    } else {
        echo "Error";
    }
}


function consultarRips(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $documento = $request->documento;
    $type = $request->type;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_INICIO.P_OBTENER_IPS_NO_CONTRATADA(:v_ptipo_documento,
                                                                                    :v_pdocumento,
                                                                                    :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_ptipo_documento',$type);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);

    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}

function cargarEspecialidad(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_INICIO.P_OBTENER_ESPECIALIDAD(:v_pjson_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}


function cargarGrupodecuenta(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_INICIO.P_OBTENER_GRUPO_CUENTA(:v_pjson_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}

function cargarTipodeimpuestos(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_INICIO.P_OBTENER_IMPUESTO(:v_pjson_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}

// function VisualizarDetallesLegalizacion(){
//     require_once('../config/dbcon_prod.php');
//     global $request;  
//     $consulta = oci_parse($c, 'begin PQ_GENESIS_INICIO.P_OBTENER_CANTIDADES_GESTION_NO_CONTRATADA (:v_pjson_row); end;');
//     $clob = oci_new_descriptor($c, OCI_D_LOB);
//     oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
//     oci_execute($consulta, OCI_DEFAULT);
//     $json = $clob->read($clob->size());
//     echo $json;
//     oci_close($c);
//   }

 ?>