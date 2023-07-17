<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function P_BUSQUEDA_PRESTACIONES(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $v_valor =$request->v_valor;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_BUSQUEDA_PRESTACIONES(:v_valor, 
                                                                                  :v_json_row
                                                                                  ); end;');
 
  oci_bind_by_name($consulta,':v_valor',$v_valor);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}
function P_LISTAR_ACTIVAS(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $codigo =$_SESSION['cedula'];  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTAR_ACTIVAS( :v_estado,
                                                                            :v_usuario,
                                                                            :v_json_row
                                                                            ); end;');
  oci_bind_by_name($consulta,':v_estado',$request->estado);                                                                        
  oci_bind_by_name($consulta,':v_usuario',$codigo);                                                                        
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;  
  }
  oci_close($c);
}
function P_LISTA_PRESTADORES(){
  require_once('../config/dbcon_prod.php');
  global $request;
  // $codigo =$_SESSION['cedula'];  
  $codigo =$request->codigo;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_PRESTADORES(  :v_valor,
                                                                                :v_json_row
                                                                                ); end;');
  oci_bind_by_name($consulta,':v_valor',$codigo);                                                                        
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;  
  }
  oci_close($c);
}

function P_OBTENER_PERFIL(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $codigo =$_SESSION['cedula'];  
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_PERFIL( :v_usuario,
                                                                            :v_json_row
                                                                            ); end;');
  oci_bind_by_name($consulta,':v_usuario',$codigo);                                                                        
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;  
  }
  oci_close($c);
}
function P_OBTENER_ESPECIALIDADES(){
    require_once('../config/dbcon_prod.php'); 
    global $request;
    $codigo =$request->codigo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_ESPECIALIDADES(    :v_pcodigo,
                                                                                 :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_OBTENER_EMPLEADOR(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento =$request->tipo_documento;
    $documento =$request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_EMPLEADOR( :v_ptipodocumento,
                                                                                 :v_pdocumento,
                                                                                 :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_BUSCAR_APORTANTE(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento =$request->tipo_documento;
    $documento =$request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_BUSCAR_APORTANTE( :v_ptipodocumento,
                                                                                 :v_pdocumento,
                                                                                 :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTA_CONCEPTO(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_CONCEPTO(:v_json_row
                                                                            ); end;');
   
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function p_lista_tipo_licencia(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_TIPO_LICENCIA(:v_json_row
                                                                            ); end;');
   
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTA_CAUSALES(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $codigo =$request->codigo;
    $v_valor =$request->valor;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_CAUSALES(
                                                                             :v_valor,
                                                                             :v_etapa, 
                                                                             :v_json_row
                                                                            ); end;');
   oci_bind_by_name($consulta,':v_valor',$v_valor);
   
    oci_bind_by_name($consulta,':v_etapa',$codigo);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTA_MOTIVO(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $codigo =$request->concepto;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_MOTIVO(    :v_pconcepto,
                                                                                 :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_pconcepto',$codigo);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTAR_GRAPICA_PIE(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $fecha_inicio = date('d/m/Y', strtotime($request->fecha_inicio)); 
    $fecha_fin = date('d/m/Y', strtotime($request->fecha_fin));
    // echo $fecha_fin;
    // $codigo =$request->concepto;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTAR_GRAPICA_PIE( :v_pfecha_inicio,
                                                                                  :v_pfecha_fin,
                                                                                  :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_pfecha_inicio',$fecha_inicio);
    oci_bind_by_name($consulta,':v_pfecha_fin',$fecha_fin);                                                                            
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTA_ARCHIVOS(){
    require_once('../config/dbcon_prod.php');   
    global $request;
    $codigo =$request->concepto;
    $tipo =$request->tipo;
    $codigo= $codigo=='EP'|| $codigo=='LA'?'EG':$codigo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTA_ARCHIVOS(    :v_documento,
                                                                                 :v_pconcepto,
                                                                                 :v_tipo_cot,
                                                                                 :v_numero,
                                                                                 :v_ubicacion, 
                                                                                 :v_json_res,        
                                                                                 :v_json_contable
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_documento',$request->v_documento);
    oci_bind_by_name($consulta,':v_pconcepto',$codigo);
    oci_bind_by_name($consulta,':v_tipo_cot',$tipo);
    oci_bind_by_name($consulta,':v_numero',$request->numero);
    oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
    $clob2 = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_contable', $clob2,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      $json2 = $clob2->read($clob2->size());
      $var = '{"ARCHIVOS_MEDICOS":'.$json.',"ARCHIVOS_CONTABLES":'.$json2.'}';
      echo $var;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_OBTENER_DATOS_BASICOS(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento =$request->tipo_documento;
    $documento =$request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,
                                                                                    :v_pdocumento,
                                                                                    :v_json_row
                                                                                    ); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_OBTENER_TUTELAS(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento =$request->tipo_documento;
    $documento =$request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_TUTELAS(:v_ptipodocumento,
                                                                                    :v_pdocumento,
                                                                                    :v_json_row
                                                                                    ); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    } 
    oci_close($c);
  }
  function p_obtener_historial(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento =$request->tipo_documento;
    $documento =$request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_HISTORIAL(:v_ptipodocumento,
                                                                                    :v_pdocumento,
                                                                                    :v_json_row
                                                                                    ); end;');
    oci_bind_by_name($consulta,':v_ptipodocumento',$tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTAR_CANTIDAD_CONCEPTO(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTAR_CANTIDAD_CONCEPTO(:v_json_row
                                                                                    ); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function P_LISTAR_CANTIDAD_SECCIONAL(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $fecha_inicio = date('d/m/Y', strtotime($request->fecha_inicio)); 
    $fecha_fin = date('d/m/Y', strtotime($request->fecha_fin));
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_LISTAR_CANTIDAD_SECCIONAL(:v_pfecha_inicio,
                                                                                        :v_pfecha_fin,
                                                                                        :v_json_row
                                                                                         ); end;');
                                                                                         
    
    oci_bind_by_name($consulta,':v_pfecha_inicio',$fecha_inicio);
    oci_bind_by_name($consulta,':v_pfecha_fin',$fecha_fin);                                                                                         
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
  function subir_archivos(){
    require_once('../config/dbcon.php');
    require_once('../config/ftpcon.php');
    include('../movilidad/subir_archivo.php');
    global $request;
  
    $ubicacion = $_SESSION['codmunicipio'];
    // variables de parametros
    $archivos = json_decode($request->data);
    
    $rutas = array();
  
    $jsonSalida = [];
  
    $hoy = date('dmY');
    $path = '/cargue_ftp/Digitalizacion/Genesis/ELIP/' . $hoy . '/';
    $hora = date('h_i_s');
  
    for ($i = 0; $i < count($archivos); $i++) {
    
      $name = $request->numero . '_' .  $archivos[$i]->codigo. '_'.$ubicacion;
    //echo $name;
      $resultado = subirFtp( $archivos[$i]->archivo, $path, $name, $archivos[$i]->ext);
  
      if ($resultado === "0 - Error") {
        echo "1";
        exit(0);
      } else {
        $jsonSalida[$i] = [
          "ruta" => $resultado,
          "codigo" =>$archivos[$i]->codigo,
          "tipo" => $archivos[$i]->tipo
        ];
      }
    }
    $v_rutas = json_encode($jsonSalida);
    $contador = count($jsonSalida);
  
  
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_SOPORTES(:v_ubicacion,
                                                                                 :v_numero_documento, 
                                                                                 :v_rutas,
                                                                                 :v_cantidad,
                                                                                 :v_res
                                                                                   ); end;');
    oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
    oci_bind_by_name($consulta, ':v_numero_documento', $request->numero);
    oci_bind_by_name($consulta, ':v_rutas', $v_rutas);
    oci_bind_by_name($consulta, ':v_cantidad', $contador);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_res', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
	
 }
 function subir_archivos_devoluciones()
{
  require_once('../config/dbcon.php');
  require_once('../config/ftpcon.php');
  include('../movilidad/subir_archivo.php');
  global $request;

  $ubicacion = $_SESSION['codmunicipio'];
  // variables de parametros
  $archivos = json_decode($request->data);
  
  $rutas = array();

  $jsonSalida = [];

  $hoy = date('dmY');
  $path = '/cargue_ftp/Digitalizacion/Genesis/ELIP/' . $hoy . '/';
  $hora = date('h_i_s');

  for ($i = 0; $i < count($archivos); $i++) {
  
    $name = $request->numero . '_' .  $archivos[$i]->codigo. '_archivo_actualizado_devolucion_1' . $hora;

    $resultado = subirFtp( $archivos[$i]->archivo, $path, $name, $archivos[$i]->ext);

    if ($resultado === "0 - Error") {
      echo "1";
      exit(0);
    } else {
      $jsonSalida[$i] = [
        "ruta" => $resultado,
        "codigo" =>$archivos[$i]->codigo,
        "tipo" => $archivos[$i]->tipo
      ];
    }
  }
  $v_rutas = json_encode($jsonSalida);
  $contador = count($jsonSalida);
  // echo $v_rutas;

  // var_dump(count($jsonSalida));
  // var_dump(count($v_rutas));


  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_SOPORTES(:v_ubicacion,
                                                                               :v_numero_documento, 
                                                                               :v_rutas,
                                                                               :v_cantidad,
                                                                               :v_res
                                                                                 ); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  oci_bind_by_name($consulta, ':v_numero_documento', $request->numero);
  oci_bind_by_name($consulta, ':v_rutas', $v_rutas);
  oci_bind_by_name($consulta, ':v_cantidad', $contador);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
  // function p_insertar_prestacion(){
  //   require_once('../config/dbcon_prod.php');
  //   global $request;
  //   $responsable=$_SESSION['cedula'];
  //   $ubicacion=$_SESSION['codmunicipio'];
  //   // una vez registrada debe quedar en estado Activa 
  //   $estado='A';
  //   $si=$request->subir_adjunto==true?'S':"N";
  //   $fecha = date('d/m/Y', strtotime($request->fecha_incapacidad));
  //   $fecha_accidente = date('d/m/Y', strtotime($request->fecha_accidente));
		// $fecha_final = date('d/m/Y', strtotime($request->fecha_incapacidad. '+'.$request->duracion.'days'));
   
  
  //   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_PRESTACION(:v_pubicacion,
  //                                                                                 :v_ptipo_doc_afiliado, 
  //                                                                                 :v_pafiliado,
  //                                                                                 :v_pconcepto,
  //                                                                                 :v_pfecha,
  //                                                                                 :v_pmotivo,
  //                                                                                 :v_pincapacidad,
  //                                                                                 :v_pinicio,
  //                                                                                 :v_pfinal,
  //                                                                                 :v_pduracion,
  //                                                                                 :v_ptercero,
  //                                                                                 :v_pdiagnostico,
  //                                                                                 :v_pestado,
  //                                                                                 :v_pmedico,
  //                                                                                 :v_pespecialidad,
  //                                                                                 :v_pnombre_medico,
  //                                                                                 :v_presponsable,
  //                                                                                 :v_pempleador,
  //                                                                                 :v_f_accidente,
  //                                                                                 :v_adjuntos,
  //                                                                                 :v_json_row
  //                                                                                   ); end;');
  //   oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);                                                                               
  //   oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$request->tipo_documento);                                                                               
  //   oci_bind_by_name($consulta,':v_pafiliado',$request->documento);                                                                               
  //   oci_bind_by_name($consulta,':v_pconcepto',$request->concepto);                                                                               
  //   oci_bind_by_name($consulta,':v_pfecha',$request->fecha);                                                                               
  //   oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);                                                                               
  //   oci_bind_by_name($consulta,':v_pincapacidad',$fecha);                                                                               
  //   oci_bind_by_name($consulta,':v_pinicio',$fecha);                                                                               
  //   oci_bind_by_name($consulta,':v_pfinal',$fecha_final);                                                                               
  //   oci_bind_by_name($consulta,':v_pduracion',$request->duracion);                                                                               
  //   oci_bind_by_name($consulta,':v_ptercero',$request->ips);                                                                               
  //   oci_bind_by_name($consulta,':v_pdiagnostico',$request->diagnostico);                                                                               
  //   oci_bind_by_name($consulta,':v_pestado',$estado);                                                                               
  //   oci_bind_by_name($consulta,':v_pmedico',$request->doc_medico);                                                                               
  //   oci_bind_by_name($consulta,':v_pespecialidad',$request->especialidad_medico);                                                                               
  //   oci_bind_by_name($consulta,':v_pnombre_medico',$request->nombre_medico);                                                                               
  //   oci_bind_by_name($consulta,':v_presponsable',$responsable);                                                                               
  //   oci_bind_by_name($consulta,':v_pempleador',$request->empleador);                                                                               
  //   oci_bind_by_name($consulta,':v_adjuntos',$si);                                                                               
  //   oci_bind_by_name($consulta,':v_f_accidente',$fecha_accidente);                                                                               
  //   $clob = oci_new_descriptor($c,OCI_D_LOB);
  //   oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  //   oci_execute($consulta,OCI_DEFAULT);
  //   if (isset($clob)) {
  //     $json = $clob->read($clob->size());
  //     echo $json;
  //   }else{
  //     echo 0;
  //   }
  //   oci_close($c);
  //}
  function p_insertar_prestacion(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $responsable=$_SESSION['cedula'];
    $ubicacion=$_SESSION['codmunicipio'];
    // una vez registrada debe quedar en estado Activa 
    $estado='A';
    $si=$request->subir_adjunto==true?'S':"N";
    $fecha = date('d/m/Y', strtotime($request->fecha_incapacidad));
    $fecha_accidente = date('d/m/Y', strtotime($request->fecha_accidente));
    $fecha_final = date('d/m/Y', strtotime($request->fecha_incapacidad. '+'.$request->duracion.'days'));
   
  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_PRESTACION(:v_pubicacion,
                                                                                  :v_ptipo_doc_afiliado, 
                                                                                  :v_pafiliado,
                                                                                  :v_pconcepto,
                                                                                  :v_pfecha,
                                                                                  :v_pmotivo,
                                                                                  :v_pincapacidad,
                                                                                  :v_pinicio,
                                                                                  :v_pfinal,
                                                                                  :v_pduracion,
                                                                                  :v_ptercero,
                                                                                  :v_pdiagnostico,
                                                                                  :v_pestado,
                                                                                  :v_pmedico,
                                                                                  :v_pespecialidad,
                                                                                  :v_pnombre_medico,
                                                                                  :v_presponsable,
                                                                                  :v_pempleador,
                                                                                  :v_f_accidente,
                                                                                  :v_porigen_rad,
                                                                                  :v_adjuntos,
                                                                                  :v_tipodoc_medico,
                                                                                  :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);                                                                               
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$request->tipo_documento);                                                                               
    oci_bind_by_name($consulta,':v_pafiliado',$request->documento);                                                                               
    oci_bind_by_name($consulta,':v_pconcepto',$request->concepto);                                                                               
    oci_bind_by_name($consulta,':v_pfecha',$request->fecha);                                                                               
    oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);                                                                               
    oci_bind_by_name($consulta,':v_pincapacidad',$fecha);                                                                               
    oci_bind_by_name($consulta,':v_pinicio',$fecha);                                                                               
    oci_bind_by_name($consulta,':v_pfinal',$fecha_final);                                                                               
    oci_bind_by_name($consulta,':v_pduracion',$request->duracion);                                                                               
    oci_bind_by_name($consulta,':v_ptercero',$request->ips);                                                                               
    oci_bind_by_name($consulta,':v_pdiagnostico',$request->diagnostico);                                                                               
    oci_bind_by_name($consulta,':v_pestado',$estado);                                                                               
    oci_bind_by_name($consulta,':v_pmedico',$request->doc_medico);                                                                               
    oci_bind_by_name($consulta,':v_pespecialidad',$request->especialidad_medico);                                                                               
    oci_bind_by_name($consulta,':v_pnombre_medico',$request->nombre_medico);                                                                               
    oci_bind_by_name($consulta,':v_presponsable',$responsable);                                                                               
    oci_bind_by_name($consulta,':v_pempleador',$request->empleador);
    oci_bind_by_name($consulta,':v_porigen_rad',$request->origen_radicacion);
    oci_bind_by_name($consulta,':v_adjuntos',$si);
    oci_bind_by_name($consulta,':v_tipodoc_medico',$request->tipodoc_medico);                                                                               
                                                                               
    oci_bind_by_name($consulta,':v_f_accidente',$fecha_accidente);


    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
  }
	function obtenerdiagnostico(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$coincidencia = $request->coincidencia;
		$sexo = $request->sexo;
		$edad = $request->edad;
	
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_OBTENER_DIAGNOSTICO(:v_pcoincidencia,:v_psexo,:v_pedad,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
		oci_bind_by_name($consulta,':v_psexo',$sexo);
		oci_bind_by_name($consulta,':v_pedad',$edad);
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }

  function P_INSERTA_MESA_AYUDA(){
		require_once('../config/dbcon_prod.php');
		global $request;

        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTA_MESA_AYUDA(:v_ubicacion,
        :v_tipo_doc,
        :v_documento,
        :v_nombre_aportante,
        :v_tipo_doc_afil,
        :v_doc_afil,
        :v_persona,
        :v_telefono,
        :v_correo,
        :v_res
        ); end;');

    oci_bind_by_name($consulta, ':v_ubicacion',$request->v_ubicacion);
    oci_bind_by_name($consulta, ':v_tipo_doc', $request->v_tipo_doc);
    oci_bind_by_name($consulta, ':v_documento', $request->v_documento);
    oci_bind_by_name($consulta, ':v_nombre_aportante', $request->v_nombre_aportante);
    oci_bind_by_name($consulta, ':v_tipo_doc_afil', $request->v_tipo_doc_afil);
    oci_bind_by_name($consulta, ':v_doc_afil', $request->v_doc_afil);
    oci_bind_by_name($consulta, ':v_persona', $request->v_telefono);
    oci_bind_by_name($consulta, ':v_telefono', $request->v_telefono);
    oci_bind_by_name($consulta, ':v_correo', $request->v_correo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_res', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
    } else {
    echo 0;
    }
    oci_close($c);
  }

  
	function p_insertar_val_liquida(){
		require_once('../config/dbcon_prod.php');
		global $request;

    $usuario =$_SESSION['cedula'];
    if (empty($request->v_fecha_termino)) {
      $v_fecha_termino = '';
    }else{
      $v_fecha_termino = date('d/m/Y', strtotime($request->v_fecha_termino));
    }
    //$v_fecha_termino = date('d/m/Y', strtotime($request->v_fecha_termino));
    // $val = isset($request->v_fecha_termino) ? $request->v_fecha_termino : '1';
    // if ($val === '1') {
    //   $v_fecha_termino = '';
    // }else{
    //   $v_fecha_termino = date('d/m/Y', strtotime($val));
    // }
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_VAL_LIQUIDA(:v_ubicacion,
                                                                                  :v_numero,
                                                                                  :v_causal,
                                                                                  :v_ibc,
                                                                                  :v_valor,
                                                                                  :v_dias_pag,
                                                                                  :v_observacion,
                                                                                  :v_usuario,
                                                                                  :v_tipo_lic,
                                                                                  :v_fecha_termino,
                                                                                  :v_tipo_ibc,
                                                                                  :v_tipo_cuenta,
                                                                                  :v_res
                                                                                  ); end;');
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		oci_bind_by_name($consulta,':v_numero',$request->v_numero);
		oci_bind_by_name($consulta,':v_causal',$request->v_causal);
		oci_bind_by_name($consulta,':v_ibc',$request->v_ibc);
		oci_bind_by_name($consulta,':v_valor',$request->v_valor);
		oci_bind_by_name($consulta,':v_dias_pag',$request->v_dias_pag);
    oci_bind_by_name($consulta,':v_observacion',$request->v_observacion);  
    oci_bind_by_name($consulta,':v_usuario',$usuario);
    oci_bind_by_name($consulta,':v_tipo_lic',$request->v_tipo_lic);      
    oci_bind_by_name($consulta,':v_fecha_termino',$v_fecha_termino);
    oci_bind_by_name($consulta,':v_tipo_ibc',$request->v_ibc_variable);           
    oci_bind_by_name($consulta,':v_tipo_cuenta',$request->v_tipo_cuenta);           
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }


	function p_insertar_val_medica(){
		require_once('../config/dbcon_prod.php');
		global $request;

    $usuario =$_SESSION['cedula'];  
    $v_fum = date('d/m/Y', strtotime($request->v_fum));
    $v_fpp = date('d/m/Y', strtotime($request->v_fpp));
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_INSERTAR_VAL_MEDICA(:v_ubicacion,
                                                                                  :v_numero,
                                                                                  :v_aprobada,
                                                                                  :v_prorroga,
                                                                                  :v_num_pro,
                                                                                  :v_ubi_pro,
                                                                                  :v_dias_pro,
                                                                                  :v_fum,
                                                                                  :v_fpp,
                                                                                  :v_semanas,
                                                                                  :v_diaspre,
                                                                                  :v_partomul,
                                                                                  :v_causal,
                                                                                  :v_observacion,
                                                                                  :v_usuario,
                                                                                  :v_pdiagnostico,
                                                                                  :v_pespecilidad,
                                                                                  :v_res
                                                                                  ); end;');
		oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
		oci_bind_by_name($consulta,':v_numero',$request->v_numero);
		oci_bind_by_name($consulta,':v_aprobada',$request->v_aprobada);
		oci_bind_by_name($consulta,':v_prorroga',$request->v_prorroga);
		oci_bind_by_name($consulta,':v_num_pro',$request->v_num_pro);
		oci_bind_by_name($consulta,':v_ubi_pro',$request->v_ubi_pro);
		oci_bind_by_name($consulta,':v_dias_pro',$request->v_dias_pro);
		oci_bind_by_name($consulta,':v_fum',$v_fum);
		oci_bind_by_name($consulta,':v_fpp',$v_fpp);
		oci_bind_by_name($consulta,':v_semanas',$request->v_semanas);
		oci_bind_by_name($consulta,':v_diaspre',$request->v_diaspre);
		oci_bind_by_name($consulta,':v_partomul',$request->v_partomul);
		oci_bind_by_name($consulta,':v_causal',$request->v_causal);
		oci_bind_by_name($consulta,':v_observacion',$request->v_observacion);
		oci_bind_by_name($consulta,':v_usuario',$usuario);
		oci_bind_by_name($consulta,':v_pdiagnostico',$request->v_pdiagnostico);
		oci_bind_by_name($consulta,':v_pespecilidad',$request->v_pespescialidad);
	  $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
  }

function p_mostrar_radicado(){
  require_once('../config/dbcon_prod.php');
  global $request;
  //$request->concepto = 'EG';
  //$request->concepto = 'EG-8001-53297';
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_MOSTRAR_RADICADO(:v_pnumero,
                                                                            :v_pradicado,
                                                                            :v_pubicacion,
                                                                            :v_pconcepto,
                                                                            :v_json_datos,
                                                                            :v_json_tarea,
                                                                            :v_json_adjunto,
                                                                            :v_json_devolucion
                                                                            ); end;');
  oci_bind_by_name($consulta,':v_pnumero',$request->numero);
  oci_bind_by_name($consulta,':v_pradicado',$request->radicado);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
  oci_bind_by_name($consulta,':v_pconcepto',$request->concepto);
  $clob1 = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_datos', $clob1,-1,OCI_B_CLOB);
  $clob2 = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_tarea', $clob2,-1,OCI_B_CLOB);
  $clob3 = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_adjunto', $clob3,-1,OCI_B_CLOB);
  $clob4 = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_devolucion', $clob4,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob1)) {
    $json1 = $clob1->read($clob1->size());
    $json2 = $clob2->read($clob2->size());
    $json3 = $clob3->read($clob3->size());
    $json4 = $clob4->read($clob4->size());
    $var =  '{"datos":'.$json1. 
            ',"tarea":'.$json2.
            ',"adjunto":'.$json3.
            ',"devoluciones":'.$json4.
            '}';
    echo $var;
  }else{
    echo 0;
  }
  oci_close($c);
}

// function p_lista_traza_observaciones(){
//   require_once('../config/dbcon_prod.php');
//   global $request;
//   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.p_lista_causal(:v_documento,
//                                                                          :v_numero,
//                                                                          :v_pubicacion,
//                                                                          :v_response); end;');
//   oci_bind_by_name($consulta,':v_documento',$request->concepto);
//   oci_bind_by_name($consulta,':v_numero',$request->numero);
//   oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
//   $clob1 = oci_new_descriptor($c,OCI_D_LOB);
//   oci_bind_by_name($consulta, ':v_response', $clob1,-1,OCI_B_CLOB);
//   oci_execute($consulta,OCI_DEFAULT);
//   if (isset($clob1)) {
//     $json1 = $clob1->read($clob1->size());
//     $var =  '{"datos":'.$json1.'}';
//     echo $var;
//   }else{
//     echo 0;
//   }
//   oci_close($c);
// }

// function p_lista_traza_observaciones() {
//     require_once('../config/dbcon_prod.php');
//     global $request;
//     $cursor = oci_new_cursor($c);
//     //echo ($request->ubicacion);
//     $consulta = oci_parse($c,'begin PQ_GENESIS_PRESTACIONES.p_lista_causal(:v_documento,
//                                                                            :v_numero,
//                                                                            :v_pubicacion,
//                                                                            :v_response); end;');
//     oci_bind_by_name($consulta,':v_documento',$request->concepto);
//     oci_bind_by_name($consulta,':v_numero',$request->numero);
//     oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
//     oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
//     oci_execute($consulta);
//     oci_execute($cursor, OCI_DEFAULT);
//     $datos = null;
//     oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
//     oci_free_statement($consulta);
//     oci_free_statement($cursor);
//     //$formatted = [];
//     //echo json_encode(count($datos) === 0 ? null : $datos);
//     echo json_encode($datos) ;    
//     exit;
// }

function p_lista_traza_observaciones(){
        // echo "1";
        require_once('../config/dbcon_prod.php');
        global $request;
            
        $cursor = oci_new_cursor($c);
        
        $consulta = oci_parse($c,'begin PQ_GENESIS_PRESTACIONES.p_lista_causal(:v_documento,
                                                                           :v_numero,
                                                                           :v_pubicacion,
                                                                           :v_response); end; ');
        oci_bind_by_name($consulta,':v_documento',$request->concepto);
        oci_bind_by_name($consulta,':v_numero',$request->numero);
        oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);
        
        oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
    
        echo json_encode($datos) ;      
    }
  
function p_actualiza_prestacion(){
  require_once('../config/dbcon_prod.php');
  global $request;


  $v_f_inicio = date('d/m/Y', strtotime($request->v_f_inicio));
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_ACTUALIZA_PRESTACION(:v_numero,
                                                                                :v_ubicacion,
                                                                                :v_f_inicio,
                                                                                :v_duracion,
                                                                                :v_res
                                                                                ); end;');
  oci_bind_by_name($consulta,':v_numero',$request->v_numero);
  oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
  oci_bind_by_name($consulta,':v_f_inicio',$v_f_inicio);
  oci_bind_by_name($consulta,':v_duracion',$request->v_duracion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

function p_reversar() {
  require_once('../config/dbcon_prod.php');
    global $request;
    $usuario =$_SESSION['cedula'];
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PRESTACIONES.P_REVERSAR_PRESTACION(:v_numero,
                                                                                  :v_ubicacion,
                                                                                  :v_usuario,
                                                                                  :v_response
                                                                                  ); end;');
    oci_bind_by_name($consulta,':v_numero',$request->v_numero);
    oci_bind_by_name($consulta,':v_ubicacion',$request->v_ubicacion);
    oci_bind_by_name($consulta,':v_usuario',$usuario);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_response', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
}