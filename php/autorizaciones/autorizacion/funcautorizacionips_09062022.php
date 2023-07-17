<?php 
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
  function obtenerOrigenes(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_ORIGEN_ATEN(:v_json_row); end;');
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
  function obtenerUbicacionSolicitud(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_UBICACION_SOL(:v_json_row); end;');
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
  function obtenerTipoServicio(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_TIPO_SOL(:v_json_row); end;');
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
  
  

  function p_obtener_servicio(){
    require_once('../../config/dbcon_prod.php');
    global $request;  
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SERVICIO(:v_pcontrato,:v_pdocumento,:v_pubicacioncontrato,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
    oci_bind_by_name($consulta,':v_pdocumento', $request->documento);
    oci_bind_by_name($consulta,':v_pubicacioncontrato', $request->ubicacion);  
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
  function obtenerContratos(){ 
    require_once('../../config/dbcon_prod.php');
    global $request;
    $nit = $request->nit;
    $regimen = $request->regimen;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_CONTRATO(:v_ptercero,:v_pregimen,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptercero',$nit);
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
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
  function obtenerDiagnostico(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo = $request->codigo;
    $sexo = $request->sexo;
    $edad = $request->edad;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_DIAGNOSTICO(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcie10',$codigo);
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
  function obtenerNombre(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $documento = $request->documento;
    $tipodocumento = $request->tipodocumento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_AFILIADO(:v_ptipo_doc,:v_pdocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_ptipo_doc',$tipodocumento);
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
  function obtenerNombreIps(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $ips = $request->ips;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CD.P_OBTENER_IPS(:v_pips,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pips',$ips);
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
  function obtenerListadoIps(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $ips = $request->coincidencia;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_IPS_ESOA(:v_pnit,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnit',$ips);
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
 function obtenerProducto()
  {
    require_once('../../config/dbcon_prod.php');
    global $request;
    $regimen = $request->regimen;
    $contrato = $request->contrato;
    $producto = $request->word;
    $clasificacion = $request->clasificacion;
    $sexo = $request->sexo;
    $edad = $request->edad;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO(  :v_pcodigo,
                                                                           :v_pclasificacion,
                                                                           :v_pregimen,
                                                                           :v_pcontrato,
                                                                           :edad,
                                                                           :sexo,
                                                                           :v_json_row); end;');

    oci_bind_by_name($consulta, ':v_pcodigo', $producto);
    oci_bind_by_name($consulta, ':v_pclasificacion', $clasificacion);
    oci_bind_by_name($consulta, ':v_pregimen', $regimen);
    oci_bind_by_name($consulta, ':v_pcontrato', $contrato);
    oci_bind_by_name($consulta, ':edad', $edad);
    oci_bind_by_name($consulta, ':sexo', $sexo);
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
  function obtenerResumen(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_RESUMEN(:v_pnumero,:v_pubicacion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
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
	function obtenersolicitudprint(){
		require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $nit=$_SESSION['nit'];
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_INFO_SOLICITUD(:v_pnumero,:v_pprestador,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pprestador',$nit);
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
	function findproducto(){
		require_once('../../config/dbcon_prod.php');
    global $request;
    $word = $request->word;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_PRODUCTO_NOM(:v_pcodigo,:v_pnit,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$word);
    oci_bind_by_name($consulta,':v_pnit',$_SESSION['nit']);
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
  function eliminarProducto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $renglon = $request->renglon;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_ELIMINA_DETALLE(:v_pnumero,:v_pubicacion,:v_prenglon,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_prenglon',$renglon);
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
	function p_obtener_solicitud(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$codigo = $request->codigo;
    $estado = $request->estado;
    $nit = $request->nit;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SOLICITUD(:v_pcodigo,:v_pestado,:v_ptercero,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$codigo);
    oci_bind_by_name($consulta,':v_pestado',$estado);
    oci_bind_by_name($consulta,':v_ptercero',$nit);
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
  function insertarSoplicitud(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $data = json_decode($request->data);
    $v_pnumero = 0;
    $v_pubicacion = 0;
    $v_pfuente = 'W';
    $v_pestado = 'A';
    $v_pactividad = 'I';
    // $fecingreso = date("d/m/Y", strtotime($data->fecsolicitud));
    // $hora_ingreso = date("H:i:s", strtotime($data->fecsolicitud));
    //$fecingreso="12/09/2018 8:13:34";
   // echo "dia".$fecingreso;
    //echo " hora  ".$hora_ingreso ."";
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_UI_ESOA(:v_psolicitudesoa, 
                                                              :v_json_row); end;');
    $jsonsolcitud = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_psolicitudesoa', $jsonsolcitud, -1, OCI_B_CLOB);
    $jsonsolcitud->writeTemporary($request->data);
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
  function actualizarEncabezado(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $tipodocumento = $request->tipodocumento;
    $documento = $request->documento;
    $fecha = $request->fecha;
    // $fecingreso = date("d/m/Y", strtotime($request->fecha));
    //echo $fecingreso;
    // $hora_ingreso = date("H:i:s", strtotime($request->hora));
    //echo $hora_ingreso;
    $servicio = $request->servicio;
    $diagnostico = $request->diagnostico;
    $diagnostico2 = $request->diagnostico2;
    $justificacion = $request->justificacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_U_ESOA(:v_pnumero,
                                                              :v_pubicacion,
                                                              :v_ptipo_doc_afiliado,
                                                              :v_pafiliado,
                                                              :v_pingreso,
                                                              :v_phora,
                                                              :v_pcodigo_servicio,
                                                              :v_pdiagnostico_ppal,
                                                              :v_pdiagnostico_sec,
                                                              :v_pjustificacion_clinica,
                                                              :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodocumento);
    oci_bind_by_name($consulta,':v_pafiliado',$documento);
    oci_bind_by_name($consulta,':v_pingreso', $request->fecha);
    oci_bind_by_name($consulta,':v_phora',$request->fecha);
    oci_bind_by_name($consulta,':v_pcodigo_servicio',$servicio);
    oci_bind_by_name($consulta,':v_pdiagnostico_ppal',$diagnostico);
    oci_bind_by_name($consulta,':v_pdiagnostico_sec',$diagnostico2);
    oci_bind_by_name($consulta,':v_pjustificacion_clinica',$justificacion);
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
  function insertarDetalle(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $producto = $request->producto;
    $cantidad = $request->cantidad;
    $subclas  = $request->subclas;
    $subclasn  = $request->subclasn;
    $subclascod  = $request->subclascod;    
    $actividad = $request->actividad;
    $renglon = 0;
    $estado = 'P';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_UI_ESOA_DETALLE(:v_pnumero,
                                                              :v_pubicacion,
                                                              :v_prenglon,
                                                              :v_pproducto,
                                                              :v_pcantidad,
                                                              :v_pestado,
                                                              :v_pactividad,
                                                              :v_subclas,
                                                              :v_subclasn,
                                                              :v_subclascod, 
                                                              :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_prenglon',$renglon);
    oci_bind_by_name($consulta,':v_pproducto',$producto);
    oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
    oci_bind_by_name($consulta,':v_pestado',$estado);
    oci_bind_by_name($consulta,':v_pactividad',$actividad);
    oci_bind_by_name($consulta,':v_subclas',$subclas);
    oci_bind_by_name($consulta,':v_subclasn',$subclasn);
    oci_bind_by_name($consulta,':v_subclascod',$subclascod);


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

  function  adjuntos_ftp(){
    require_once('../../config/dbcon.php');
    require_once('../../config/ftpcon.php');
    include('../../upload_file/subir_archivo.php');
    global $request;
    // variables de parametros
    // otras variables
    $hoy = date('dmY');
    $hora = date('h_i_s');
    $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/ESOA/'.$hoy.'/';
    $estado = 0;   
   $tipodoc = 'solicitud_autorizacion';
   $cedula=$_SESSION['nit'];
   $name = $tipodoc.'_'.$cedula.'_'.$hora;
     $subio = subirFTP3($request->achivobase,$path,$name,$request->ext); 
     $rutas= $subio;
     echo $rutas;
  }

    function P_CONSULTA_AUTORIZACIONES_AVANZADO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_CONSULTA_AUTORIZACIONES_AVANZADO(  :v_pautorizacion,
                                                                                :v_json_row
                                                                              ); end;');
  oci_bind_by_name($consulta, ':v_pautorizacion', $request->aut);
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

function P_CONSULTA_AUTORIZACIONES_AVANZADO_NOPBS()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_CONSULTA_AUTORIZACIONES_AVANZADO_NOPBS(  :v_pautorizacion,
                                                                                :v_json_row
                                                                              ); end;');
  oci_bind_by_name($consulta, ':v_pautorizacion', $request->autorizacion);
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
function p_obtener_direccion()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_OBTENER_DIRECCION(  :v_ptercero,
                                                                          :v_json_row
                                                                              ); end;');
  oci_bind_by_name($consulta, ':v_ptercero', $request->tercero);
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
function p_obtener_especialidades()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.p_obtener_especialidades(:v_json_row
                                                                              ); end;');  
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

function p_obtener_solicitud_gestionadas_avanzado(){
  require_once('../../config/dbcon.php');
  global $request;

  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_OBTENER_SOLICITUD_GESTIONADAS_AVANZADO(:v_pautorizacion,
                                                                        :v_pjson_row); end;');
  $jsonin = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pautorizacion', $jsonin, -1, OCI_B_CLOB);  
  $jsonin->writeTemporary($request->autorizacion);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo $clob;
  }
  oci_close($c);
}

function p_gestiona_egreso_esoa(){
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_GESTIONA_EGRESO_ESOA(:v_pnumero,:v_pubicacion,:v_pfecha,:v_ptipo_usuario,:v_pusuariogestiona,  :v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnumero', $request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);      
  oci_bind_by_name($consulta,':v_pfecha',$request->fecha);      
  oci_bind_by_name($consulta,':v_ptipo_usuario',$request->tipo_usuario);      
  oci_bind_by_name($consulta,':v_pusuariogestiona',$request->usuario);        
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


function p_gestiona_egreso_esoa_eps(){

  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_ESOA.P_GESTIONA_EGRESO_ESOA_EPS(:v_pnumero,:v_pubicacion,:v_pfecha,:v_ptipo_usuario,:v_pusuariogestiona,:v_ptipo_hospitalizacion,:v_pmotigo_egreso,  :v_json_row); end;');
  oci_bind_by_name($consulta,':v_pnumero', $request->numero);
  oci_bind_by_name($consulta,':v_pubicacion',$request->ubicacion);      
  oci_bind_by_name($consulta,':v_pfecha',$request->fecha);      
  oci_bind_by_name($consulta,':v_ptipo_usuario',$request->tipo_usuario);      
  oci_bind_by_name($consulta,':v_pusuariogestiona',$request->usuario);     
  oci_bind_by_name($consulta,':v_ptipo_hospitalizacion',$request->tipo_hospitalizacion);     
  oci_bind_by_name($consulta,':v_pmotigo_egreso',$request->motivo_egreso);       
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




?>
