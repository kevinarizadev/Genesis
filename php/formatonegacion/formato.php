<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

  function p_lista_servicios_exc(){
    require_once('../config/dbcon.php');
    global $request;
		$servicio = $request->servicio;    
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_EXCLUSION_AUT.P_LISTA_SERVICIOS_EXC(:v_pservicio,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pservicio',$servicio);    
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

    function BuscarProducto(){
    require_once('../config/dbcon.php');
    global $request;
    $clasificacion   = $request->clasificacion;
    $codigo   = $request->producto;
    $consulta  = oci_parse($c,'BEGIN PQ_GENESIS_EXCLUSION_AUT.p_obtener_producto(:v_pclasificacion,
                                                                          :v_pcodigo,
                                                                          :v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pclasificacion',$clasificacion);
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
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

function insertarNegacion(){
    require_once('../config/dbcon.php');
    global $request;
    $data = json_decode($request->negacion);
    $documento  = 'NA';
    $valdefecto = 0;    
    $fuente='G';
     if($data->numero==0) {
        $valdefecto = 0;
     }else{
        $valdefecto = $data->numero;
    }

    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_EXCLUSION_AUT.P_UI_CABEZA_AUT_WEB(:v_pdocumento,
                                                               :v_pnumero,
                                                               :v_pubicacion,
                                                               :v_ptipo_doc_afiliado,
                                                               :v_pdocumento_afiliado,
                                                               :v_pclasificacion,
                                                               :v_ptipo,
                                                               :v_palto_costo,                                                 :v_pdiagnostico,
                                                               :v_pdiagnostico1,
                                                               :v_pclase,
                                                               :v_pprograma,   
                                                               :v_pproveedor,                                                  :v_pubicacion_solicitud,                                        :v_psolicitante,                                                :v_ptipo_solicitud,                                             :v_porden,
                                                               :v_paccion,
                                                               :v_presponsable,
                                                               :v_pjson_row); end;');

    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$valdefecto);
    oci_bind_by_name($consulta,':v_pubicacion', $data->ubicacion);    
    oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$data->tipodocumento);
    oci_bind_by_name($consulta,':v_pdocumento_afiliado',$data->documento);
    oci_bind_by_name($consulta,':v_pclasificacion',$data->codservicio);
    oci_bind_by_name($consulta,':v_ptipo',$data->valortipo);
    oci_bind_by_name($consulta,':v_palto_costo',$data->altocosto);          
    oci_bind_by_name($consulta,':v_pdiagnostico',$data->diagcod1);
    oci_bind_by_name($consulta,':v_pdiagnostico1',$data->diagcod2);
    oci_bind_by_name($consulta,':v_pclase',$data->valornopos);
    oci_bind_by_name($consulta,':v_pprograma',$valdefecto);  
    oci_bind_by_name($consulta,':v_pproveedor',$data->ipscodasignada);   
    oci_bind_by_name($consulta,':v_pubicacion_solicitud',$data->ubicacionpaciente);  
    oci_bind_by_name($consulta,':v_psolicitante',$data->ipscodsolicitante);    
    oci_bind_by_name($consulta,':v_ptipo_solicitud',$data->tiposervicio);
    oci_bind_by_name($consulta,':v_porden',$data->fecsolicitudparseada);    
    oci_bind_by_name($consulta,':v_paccion',$data->accion);    
    oci_bind_by_name($consulta,':v_presponsable',$data->responsable);    
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


    function insertarDetalleNeg(){
    require_once('../config/dbcon.php');
    global $request;
    $productos = $request->productos;
    $cantidad = $request->cantidad;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $documento = 'NA';
    $nomservicio = $request->servicio;
    $justificacion = $request->justificacion;
    $fundamento = $request->fundamento;
    $alternativa = $request->alternativa;


    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_EXCLUSION_AUT.P_UI_DETALLE_AUT_WEB(:v_pproductos,
                                                                                :v_pcantidad,
                                                                                :v_pdocumento,
                                                                                :v_pnumero,
                                                                                :v_pubicacion,
                                                                                :v_pjustc_nombre_servicio,
                                                                                :v_pjustc_justificacion,
                                                                                :v_pjustc_fundamento_legal,
                                                                                :v_pjustc_alternativas,
                                                                                :v_pjson_row); end;');
    $jsonproductos = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pproductos', $jsonproductos, -1, OCI_B_CLOB);
    $jsonproductos->writeTemporary($productos);
    oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
    oci_bind_by_name($consulta,':v_pjustc_nombre_servicio',$nomservicio);
    oci_bind_by_name($consulta,':v_pjustc_justificacion',$justificacion);
    oci_bind_by_name($consulta,':v_pjustc_fundamento_legal',$fundamento);
    oci_bind_by_name($consulta,':v_pjustc_alternativas',$alternativa);
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
function p_obtener_negacion_web(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $numero = $request->numero;
    $ubicacion = $request->ubicacion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_EXCLUSION_AUT.p_obtener_negacion_web(:v_pnumero, :v_pubicacion,:v_json_row); end;');
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

function p_lista_negacion_web(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodocumento = $request->tipodocumento;
    $documento = $request->documento;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_EXCLUSION_AUT.P_LISTA_NEGACION_WEB(:v_ptipodoc, :v_pdocumento,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_ptipodoc',$tipodocumento);
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

?>
